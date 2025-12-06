package com.smartshopai.smartshopbackend.controller.publicapi;

import com.smartshopai.smartshopbackend.entity.Order;
import com.smartshopai.smartshopbackend.entity.User;
import com.smartshopai.smartshopbackend.repository.UserRepository;
import com.smartshopai.smartshopbackend.service.OrderService;
import java.security.Principal;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/orders")
public class OrderPublicController {

    private final OrderService orderService;
    private final UserRepository userRepository;

    public OrderPublicController(OrderService orderService, UserRepository userRepository) {
        this.orderService = orderService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Order> myOrders(Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return orderService.getOrdersForUser(user.getId());
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order, Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Order created = orderService.createOrderForUser(order, user);
        return ResponseEntity.ok(created);
    }
}
