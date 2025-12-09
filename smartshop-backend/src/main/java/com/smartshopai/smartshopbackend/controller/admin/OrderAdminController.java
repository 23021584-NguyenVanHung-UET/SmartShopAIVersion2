package com.smartshopai.smartshopbackend.controller.admin;

import com.smartshopai.smartshopbackend.entity.Order;
import com.smartshopai.smartshopbackend.entity.OrderStatus;
import com.smartshopai.smartshopbackend.repository.OrderRepository;
import com.smartshopai.smartshopbackend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
public class OrderAdminController {

    private final OrderService orderService;
    private final OrderRepository orderRepository;

    @GetMapping
    public Page<Order> all(Pageable pageable) {
        return orderRepository.findAll(pageable);
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!orderRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        orderRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public Page<Order> search(
            @RequestParam(required = false) OrderStatus status,
            Pageable pageable) {
        if (status == null) {
            return orderRepository.findAll(pageable);
        }
        // In production, implement: orderRepository.findByStatus(status, pageable);
        return orderRepository.findAll(pageable);
    }

    @GetMapping("/stats")
    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalOrders", orderRepository.count());
        stats.put("pendingOrders", 0L); // In production: orderRepository.countByStatus(OrderStatus.PENDING)
        stats.put("completedOrders", 0L); // In production: orderRepository.countByStatus(OrderStatus.DELIVERED)
        stats.put("totalRevenue", orderRepository.findAll().stream()
                .mapToLong(order -> order.getTotalAmount().longValue())
                .sum());
        return stats;
    }
}
