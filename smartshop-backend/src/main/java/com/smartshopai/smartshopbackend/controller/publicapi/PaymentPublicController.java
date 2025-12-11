package com.smartshopai.smartshopbackend.controller.publicapi;

import com.smartshopai.smartshopbackend.dto.response.OrderResponse;
import com.smartshopai.smartshopbackend.entity.Order;
import com.smartshopai.smartshopbackend.mapper.OrderMapper;
import com.smartshopai.smartshopbackend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/payments")
public class PaymentPublicController {

    private final OrderService orderService;

    public PaymentPublicController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/confirm")
    public ResponseEntity<OrderResponse> confirmBankTransfer(
            @RequestParam Long orderId,
            @RequestParam String code
    ) {
        Order updated = orderService.confirmBankTransfer(orderId, code);
        return ResponseEntity.ok(OrderMapper.toResponse(updated));
    }
}
