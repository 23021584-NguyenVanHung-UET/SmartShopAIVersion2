package com.smartshopai.smartshopbackend.service;

import com.smartshopai.smartshopbackend.entity.Order;
import com.smartshopai.smartshopbackend.entity.OrderItem;
import com.smartshopai.smartshopbackend.entity.OrderStatus;
import com.smartshopai.smartshopbackend.entity.User;
import com.smartshopai.smartshopbackend.repository.OrderRepository;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getOrdersForUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Transactional
    public Order createOrder(Order order) {
        if (order.getItems() != null) {
            order.getItems().forEach(item -> item.setOrder(order));
            order.setTotalAmount(calculateTotal(order.getItems()));
        }
        return orderRepository.save(order);
    }

    @Transactional
    public Order createOrderForUser(Order order, User user) {
        order.setUser(user);
        return createOrder(order);
    }

    @Transactional
    public Order updateStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found: " + orderId));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    private BigDecimal calculateTotal(List<OrderItem> items) {
        return items.stream()
                .map(i -> i.getUnitPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
