package com.smartshopai.smartshopbackend.service;

import com.smartshopai.smartshopbackend.config.VnPayProperties;
import com.smartshopai.smartshopbackend.dto.response.VnPayPaymentResponse;
import com.smartshopai.smartshopbackend.dto.response.VnPayReturnResponse;
import com.smartshopai.smartshopbackend.entity.Order;
import com.smartshopai.smartshopbackend.entity.OrderStatus;
import com.smartshopai.smartshopbackend.entity.PaymentMethod;
import com.smartshopai.smartshopbackend.entity.PaymentStatus;
import com.smartshopai.smartshopbackend.repository.OrderRepository;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class VnPayService {

    private static final String HMAC_SHA512 = "HmacSHA512";
    private static final DateTimeFormatter VNPAY_FORMATTER = DateTimeFormatter.ofPattern("yyyyMMddHHmmss")
            .withZone(ZoneId.of("Asia/Ho_Chi_Minh"));

    private final VnPayProperties properties;
    private final OrderRepository orderRepository;

    public VnPayService(VnPayProperties properties, OrderRepository orderRepository) {
        this.properties = properties;
        this.orderRepository = orderRepository;
    }

    public VnPayPaymentResponse buildPaymentUrl(Order order, String bankCode, String clientIp) {
        if (order.getPaymentMethod() != PaymentMethod.VNPAY) {
            throw new IllegalArgumentException("Đơn hàng không sử dụng VNPAY");
        }
        if (order.getPaymentStatus() == PaymentStatus.PAID) {
            throw new IllegalStateException("Đơn hàng đã được thanh toán");
        }
        ensureConfig();

        Instant now = Instant.now();
        Instant expireAt = now.plusSeconds(properties.getExpireMinutes() * 60L);

        Map<String, String> params = new HashMap<>();
        params.put("vnp_Version", "2.1.0");
        params.put("vnp_Command", "pay");
        params.put("vnp_TmnCode", properties.getTmnCode());
        params.put("vnp_Amount", toVnPayAmount(order.getTotalAmount()));
        params.put("vnp_CurrCode", "VND");
        params.put("vnp_TxnRef", order.getPaymentCode());
        params.put("vnp_OrderInfo", "Thanh toan don hang #" + order.getId());
        params.put("vnp_OrderType", properties.getOrderType());
        params.put("vnp_ReturnUrl", properties.getReturnUrl());
        params.put("vnp_IpAddr", clientIp);
        params.put("vnp_Locale", properties.getLocale());
        params.put("vnp_CreateDate", VNPAY_FORMATTER.format(now));
        params.put("vnp_ExpireDate", VNPAY_FORMATTER.format(expireAt));
        if (StringUtils.hasText(bankCode)) {
            params.put("vnp_BankCode", bankCode);
        }

        String paymentUrl = UriComponentsBuilder.fromHttpUrl(properties.getPayUrl())
                .query(buildSignedQuery(params))
                .build(true)
                .toUriString();
        return new VnPayPaymentResponse(paymentUrl, order.getPaymentCode(), expireAt);
    }

    @Transactional
    public Map<String, String> handleIpn(Map<String, String> rawParams) {
        String secureHash = rawParams.get("vnp_SecureHash");
        Map<String, String> params = sanitizeParams(rawParams);
        if (!isValidSignature(params, secureHash)) {
            return Map.of("RspCode", "97", "Message", "Invalid checksum");
        }

        if (!properties.getTmnCode().equals(params.get("vnp_TmnCode"))) {
            return Map.of("RspCode", "01", "Message", "Merchant not found");
        }

        String txnRef = params.get("vnp_TxnRef");
        if (!StringUtils.hasText(txnRef)) {
            return Map.of("RspCode", "01", "Message", "Order not found");
        }

        Order order = orderRepository.findByPaymentCode(txnRef).orElse(null);
        if (order == null) {
            return Map.of("RspCode", "01", "Message", "Order not found");
        }

        if (order.getPaymentMethod() != PaymentMethod.VNPAY) {
            return Map.of("RspCode", "07", "Message", "Payment method mismatch");
        }

        long expectedAmount = parseAmount(order.getTotalAmount());
        long receivedAmount = parseAmount(params.get("vnp_Amount"));
        if (expectedAmount != receivedAmount) {
            return Map.of("RspCode", "04", "Message", "Invalid amount");
        }

        if (order.getPaymentStatus() == PaymentStatus.PAID) {
            return Map.of("RspCode", "02", "Message", "Order already confirmed");
        }

        String responseCode = params.get("vnp_ResponseCode");
        String transactionStatus = params.get("vnp_TransactionStatus");
        boolean success = "00".equals(responseCode) && "00".equals(transactionStatus);

        if (success) {
            order.setPaymentStatus(PaymentStatus.PAID);
            order.setStatus(OrderStatus.PAID);
            order.setPaymentTransactionNo(params.get("vnp_TransactionNo"));
            order.setPaymentBankCode(params.get("vnp_BankCode"));
            order.setPaymentPayDate(parsePayDate(params.get("vnp_PayDate")));
            orderRepository.save(order);
            return Map.of("RspCode", "00", "Message", "Success");
        }

        return Map.of("RspCode", "00", "Message", "Payment not successful");
    }

    public VnPayReturnResponse handleReturn(Map<String, String> rawParams) {
        String secureHash = rawParams.get("vnp_SecureHash");
        Map<String, String> params = sanitizeParams(rawParams);

        boolean checksumValid = isValidSignature(params, secureHash);
        String txnRef = params.get("vnp_TxnRef");
        Order order = StringUtils.hasText(txnRef) ? orderRepository.findByPaymentCode(txnRef).orElse(null) : null;

        if (!checksumValid) {
            return new VnPayReturnResponse(false, "Chữ ký không hợp lệ", order != null ? order.getId() : null,
                    txnRef, params.get("vnp_ResponseCode"), params.get("vnp_TransactionStatus"));
        }

        if (StringUtils.hasText(properties.getTmnCode()) && !properties.getTmnCode().equals(params.get("vnp_TmnCode"))) {
            return new VnPayReturnResponse(false, "Mã merchant không hợp lệ", order != null ? order.getId() : null,
                    txnRef, params.get("vnp_ResponseCode"), params.get("vnp_TransactionStatus"));
        }

        boolean success = "00".equals(params.get("vnp_ResponseCode")) && "00".equals(params.get("vnp_TransactionStatus"));
        String message = success ? "Thanh toán thành công" : "Thanh toán không thành công";

        if (success && order != null && order.getPaymentMethod() == PaymentMethod.VNPAY) {
            long expected = parseAmount(order.getTotalAmount());
            long received = parseAmount(params.get("vnp_Amount"));
            if (expected == received) {
                if (order.getPaymentStatus() != PaymentStatus.PAID) {
                    order.setPaymentStatus(PaymentStatus.PAID);
                    order.setStatus(OrderStatus.PAID);
                    order.setPaymentTransactionNo(params.get("vnp_TransactionNo"));
                    order.setPaymentBankCode(params.get("vnp_BankCode"));
                    order.setPaymentPayDate(parsePayDate(params.get("vnp_PayDate")));
                    orderRepository.save(order);
                }
            } else {
                success = false;
                message = "Số tiền không khớp";
            }
        }

        return new VnPayReturnResponse(success, message, order != null ? order.getId() : null,
                txnRef, params.get("vnp_ResponseCode"), params.get("vnp_TransactionStatus"));
    }

    public String resolveClientIp(String forwardedFor, String remoteAddr) {
        if (StringUtils.hasText(forwardedFor)) {
            return forwardedFor.split(",")[0].trim();
        }
        return remoteAddr;
    }

    private Map<String, String> sanitizeParams(Map<String, String> rawParams) {
        Map<String, String> cleaned = new HashMap<>(rawParams);
        cleaned.remove("vnp_SecureHash");
        cleaned.remove("vnp_SecureHashType");
        return cleaned;
    }

    private String buildSignedQuery(Map<String, String> params) {
        Map<String, String> sorted = new HashMap<>(params);
        List<String> fieldNames = new ArrayList<>(sorted.keySet());
        Collections.sort(fieldNames);

        StringBuilder query = new StringBuilder();
        StringBuilder data = new StringBuilder();
        boolean first = true;

        for (String fieldName : fieldNames) {
            String value = sorted.get(fieldName);
            if (!StringUtils.hasText(value)) {
                continue;
            }
            if (!first) {
                query.append('&');
                data.append('&');
            }
            query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
            query.append('=');
            query.append(URLEncoder.encode(value, StandardCharsets.US_ASCII));

            data.append(fieldName).append('=').append(URLEncoder.encode(value, StandardCharsets.US_ASCII));
            first = false;
        }

        String secureHash = hmacSHA512(data.toString());
        query.append("&vnp_SecureHash=").append(secureHash);
        return query.toString();
    }

    private boolean isValidSignature(Map<String, String> params, String secureHash) {
        if (!StringUtils.hasText(secureHash)) {
            return false;
        }
        String calculated = hmacSHA512(buildHashData(params));
        return secureHash.equalsIgnoreCase(calculated);
    }

    private String buildHashData(Map<String, String> params) {
        List<String> fieldNames = new ArrayList<>(params.keySet());
        Collections.sort(fieldNames);
        StringBuilder data = new StringBuilder();
        boolean first = true;

        for (String fieldName : fieldNames) {
            String value = params.get(fieldName);
            if (!StringUtils.hasText(value)) {
                continue;
            }
            if (!first) {
                data.append('&');
            }
            data.append(fieldName).append('=').append(URLEncoder.encode(value, StandardCharsets.US_ASCII));
            first = false;
        }
        return data.toString();
    }

    private String hmacSHA512(String data) {
        try {
            Mac hmac = Mac.getInstance(HMAC_SHA512);
            SecretKeySpec secretKey = new SecretKeySpec(properties.getHashSecret().getBytes(StandardCharsets.UTF_8), HMAC_SHA512);
            hmac.init(secretKey);
            byte[] bytes = hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder(bytes.length * 2);
            for (byte b : bytes) {
                sb.append(String.format(Locale.ROOT, "%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new IllegalStateException("Không thể ký dữ liệu VNPAY", e);
        }
    }

    private void ensureConfig() {
        if (!StringUtils.hasText(properties.getTmnCode())
                || !StringUtils.hasText(properties.getHashSecret())
                || !StringUtils.hasText(properties.getPayUrl())
                || !StringUtils.hasText(properties.getReturnUrl())) {
            throw new IllegalStateException("Thiếu cấu hình VNPAY");
        }
    }

    private String toVnPayAmount(BigDecimal total) {
        return total.multiply(BigDecimal.valueOf(100))
                .setScale(0, RoundingMode.HALF_UP)
                .toBigInteger()
                .toString();
    }

    private long parseAmount(BigDecimal total) {
        return total.multiply(BigDecimal.valueOf(100))
                .setScale(0, RoundingMode.HALF_UP)
                .longValue();
    }

    private long parseAmount(String amount) {
        if (!StringUtils.hasText(amount)) {
            return -1;
        }
        try {
            return Long.parseLong(amount);
        } catch (NumberFormatException ex) {
            return -1;
        }
    }

    private Instant parsePayDate(String payDate) {
        if (!StringUtils.hasText(payDate)) {
            return null;
        }
        try {
            return Instant.from(VNPAY_FORMATTER.parse(payDate));
        } catch (Exception ex) {
            return null;
        }
    }
}
