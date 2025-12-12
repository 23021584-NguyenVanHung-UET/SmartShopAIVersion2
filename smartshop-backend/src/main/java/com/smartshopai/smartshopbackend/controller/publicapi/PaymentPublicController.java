package com.smartshopai.smartshopbackend.controller.publicapi;

import com.smartshopai.smartshopbackend.config.VnPayProperties;
import com.smartshopai.smartshopbackend.dto.request.VnPayPaymentRequest;
import com.smartshopai.smartshopbackend.dto.response.OrderResponse;
import com.smartshopai.smartshopbackend.dto.response.VnPayPaymentResponse;
import com.smartshopai.smartshopbackend.dto.response.VnPayReturnResponse;
import com.smartshopai.smartshopbackend.entity.Order;
import com.smartshopai.smartshopbackend.mapper.OrderMapper;
import com.smartshopai.smartshopbackend.service.OrderService;
import com.smartshopai.smartshopbackend.service.UserService;
import com.smartshopai.smartshopbackend.service.VnPayService;
import jakarta.servlet.http.HttpServletRequest;
import java.net.URI;
import java.security.Principal;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/public/payments")
@Validated
public class PaymentPublicController {

    private final OrderService orderService;
    private final UserService userService;
    private final VnPayService vnPayService;
    private final VnPayProperties vnPayProperties;

    public PaymentPublicController(OrderService orderService, UserService userService, VnPayService vnPayService,
            VnPayProperties vnPayProperties) {
        this.orderService = orderService;
        this.userService = userService;
        this.vnPayService = vnPayService;
        this.vnPayProperties = vnPayProperties;
    }

    @GetMapping("/confirm")
    public ResponseEntity<OrderResponse> confirmBankTransfer(
            @RequestParam Long orderId,
            @RequestParam String code
    ) {
        Order updated = orderService.confirmBankTransfer(orderId, code);
        return ResponseEntity.ok(OrderMapper.toResponse(updated));
    }

    @PostMapping("/vnpay")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<VnPayPaymentResponse> createVnPayPayment(
            @Validated @RequestBody VnPayPaymentRequest request,
            Principal principal,
            HttpServletRequest httpRequest
    ) {
        var user = userService.getByEmailOrThrow(principal.getName());
        Order order = orderService.getOrderForUser(request.getOrderId(), user.getId());
        String clientIp = vnPayService.resolveClientIp(httpRequest.getHeader("X-Forwarded-For"),
                httpRequest.getRemoteAddr());
        VnPayPaymentResponse response = vnPayService.buildPaymentUrl(order, request.getBankCode(), clientIp);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/vnpay/ipn")
    public ResponseEntity<Map<String, String>> handleVnPayIpn(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(vnPayService.handleIpn(params));
    }

    @GetMapping("/vnpay/return")
    public ResponseEntity<?> handleVnPayReturn(@RequestParam Map<String, String> params) {
        VnPayReturnResponse result = vnPayService.handleReturn(params);
        if (StringUtils.hasText(vnPayProperties.getFrontendRedirectUrl())) {
            URI redirect = UriComponentsBuilder.fromUriString(vnPayProperties.getFrontendRedirectUrl())
                    .queryParam("orderId", result.getOrderId())
                    .queryParam("paymentCode", result.getPaymentCode())
                    .queryParam("success", result.isSuccess())
                    .queryParam("responseCode", result.getResponseCode())
                    .queryParam("transactionStatus", result.getTransactionStatus())
                    .build()
                    .toUri();
            return ResponseEntity.status(HttpStatus.FOUND).location(redirect).build();
        }
        return ResponseEntity.ok(result);
    }
}
