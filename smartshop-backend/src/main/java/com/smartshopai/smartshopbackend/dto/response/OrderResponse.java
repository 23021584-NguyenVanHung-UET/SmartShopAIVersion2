package com.smartshopai.smartshopbackend.dto.response;

import com.smartshopai.smartshopbackend.entity.OrderStatus;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private OrderStatus status;
    private BigDecimal totalAmount;
    private Instant createdAt;
    private String shippingName;
    private String shippingPhone;
    private String shippingAddress;
    private String shippingWard;
    private String shippingDistrict;
    private String shippingCity;
    private String shippingNote;
    private List<OrderItemResponse> items;
}
