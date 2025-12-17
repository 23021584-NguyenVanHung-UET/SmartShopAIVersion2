package com.smartshopai.smartshopbackend.dto;

import com.smartshopai.smartshopbackend.entity.OrderStatus;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class UpdateOrderRequest {
    private String customerName;
    private String customerEmail;
    private BigDecimal totalAmount;
    private OrderStatus status; // Enum
}
