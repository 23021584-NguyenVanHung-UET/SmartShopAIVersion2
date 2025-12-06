package com.smartshopai.smartshopbackend.controller.admin;

import com.smartshopai.smartshopbackend.entity.Order;
import com.smartshopai.smartshopbackend.entity.OrderStatus;
import com.smartshopai.smartshopbackend.service.OrderService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/orders")
public class OrderAdminController {

    private final OrderService orderService;

    public OrderAdminController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<Order> all() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> get(@PathVariable Long id) {
        Order order = orderService.getById(id);
        return order == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(order);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateStatus(@PathVariable Long id, @RequestParam("status") OrderStatus status) {
        return ResponseEntity.ok(orderService.updateStatus(id, status));
    }
}
