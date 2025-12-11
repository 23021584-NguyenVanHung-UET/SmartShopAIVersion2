package com.smartshopai.smartshopbackend.controller.publicapi;

import com.smartshopai.smartshopbackend.dto.request.CreateOrderRequest;
import com.smartshopai.smartshopbackend.dto.response.OrderResponse;
import com.smartshopai.smartshopbackend.entity.Order;
import com.smartshopai.smartshopbackend.entity.User;
import com.smartshopai.smartshopbackend.mapper.OrderMapper;
import com.smartshopai.smartshopbackend.service.OrderService;
import com.smartshopai.smartshopbackend.service.UserService;
import java.security.Principal;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/orders")
@Validated
public class OrderPublicController {

    private final OrderService orderService;
    private final UserService userService;

    public OrderPublicController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @GetMapping
    public List<OrderResponse> myOrders(Principal principal) {
        User user = userService.getByEmailOrThrow(principal.getName());
        return orderService.getOrdersForUser(user.getId()).stream()
                .map(OrderMapper::toResponse)
                .toList();
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@Validated @RequestBody CreateOrderRequest request, Principal principal) {
        User user = userService.getByEmailOrThrow(principal.getName());
        Order created = orderService.createOrderFromDto(request, user);
        return ResponseEntity.ok(OrderMapper.toResponse(created));
    }

    @GetMapping("/{id}")
    public OrderResponse getOrder(@PathVariable Long id, Principal principal) {
        User user = userService.getByEmailOrThrow(principal.getName());
        Order order = orderService.getOrderForUser(id, user.getId());
        return OrderMapper.toResponse(order);
    }
}
