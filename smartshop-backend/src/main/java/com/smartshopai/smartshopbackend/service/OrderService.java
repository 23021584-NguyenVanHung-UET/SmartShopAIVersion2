package com.smartshopai.smartshopbackend.service;

import com.smartshopai.smartshopbackend.dto.request.CreateOrderItemRequest;
import com.smartshopai.smartshopbackend.dto.request.CreateOrderRequest;
import com.smartshopai.smartshopbackend.entity.Order;
import com.smartshopai.smartshopbackend.entity.OrderItem;
import com.smartshopai.smartshopbackend.entity.OrderStatus;
import com.smartshopai.smartshopbackend.entity.PaymentMethod;
import com.smartshopai.smartshopbackend.entity.PaymentStatus;
import com.smartshopai.smartshopbackend.entity.User;
import com.smartshopai.smartshopbackend.exception.NotFoundException;
import com.smartshopai.smartshopbackend.repository.OrderItemRepository;
import com.smartshopai.smartshopbackend.repository.OrderRepository;
import com.smartshopai.smartshopbackend.repository.ProductRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository, OrderItemRepository orderItemRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
    }

    @Transactional(readOnly = true)
    public List<Order> getOrdersForUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Transactional(readOnly = true)
    public Order getOrderForUser(Long orderId, Long userId) {
        return orderRepository.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new NotFoundException("Order not found: " + orderId));
    }

    @Transactional(readOnly = true)
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Order getById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Transactional
    public Order createOrderFromDto(CreateOrderRequest request, User user) {
        Order order = new Order();
        order.setUser(user);
        List<OrderItem> items = request.getItems().stream()
                .map(this::toOrderItem)
                .collect(Collectors.toList());
        order.setItems(items);
        order.getItems().forEach(i -> i.setOrder(order));
        order.setTotalAmount(calculateTotal(order.getItems()));

        order.setShippingName(defaultIfBlank(request.getShippingName(), user.getName()));
        order.setShippingPhone(defaultIfBlank(request.getShippingPhone(), user.getPhone()));
        order.setShippingAddress(defaultIfBlank(request.getShippingAddress(), user.getAddress()));
        order.setShippingWard(defaultIfBlank(request.getShippingWard(), user.getWard()));
        order.setShippingDistrict(defaultIfBlank(request.getShippingDistrict(), user.getDistrict()));
        order.setShippingCity(defaultIfBlank(request.getShippingCity(), user.getCity()));
        order.setShippingNote(request.getNote());

        PaymentMethod method = request.getPaymentMethod() != null ? request.getPaymentMethod() : PaymentMethod.COD;
        order.setPaymentMethod(method);
        order.setPaymentStatus(PaymentStatus.PENDING);
        order.setStatus(OrderStatus.PENDING);

        return orderRepository.save(order);
    }

    @Transactional
    public Order confirmBankTransfer(Long orderId, String code) {
        Order order = orderRepository.findByIdAndPaymentCode(orderId, code)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy đơn hoặc mã không hợp lệ"));
        if (order.getPaymentMethod() != PaymentMethod.BANK_TRANSFER) {
            throw new IllegalArgumentException("Đơn hàng không dùng chuyển khoản");
        }
        if (order.getPaymentStatus() == PaymentStatus.PAID) {
            return order;
        }
        order.setPaymentStatus(PaymentStatus.PAID);
        order.setStatus(OrderStatus.PAID);
        return orderRepository.save(order);
    }

    @Transactional
    public Order updateStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order not found: " + orderId));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    private BigDecimal calculateTotal(List<OrderItem> items) {
        return items.stream()
                .map(i -> i.getUnitPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private OrderItem toOrderItem(CreateOrderItemRequest dto) {
        var product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new NotFoundException("Product not found: " + dto.getProductId()));
        OrderItem item = new OrderItem();
        item.setProduct(product);
        item.setQuantity(dto.getQuantity());
        item.setUnitPrice(BigDecimal.valueOf(product.getPrice()));
        return item;
    }

    private String defaultIfBlank(String candidate, String fallback) {
        if (candidate != null && !candidate.isBlank()) {
            return candidate;
        }
        return fallback;
    }
}
