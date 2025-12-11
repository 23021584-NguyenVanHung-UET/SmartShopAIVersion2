package com.smartshopai.smartshopbackend.mapper;

import com.smartshopai.smartshopbackend.dto.response.OrderItemResponse;
import com.smartshopai.smartshopbackend.dto.response.OrderResponse;
import com.smartshopai.smartshopbackend.entity.Order;
import com.smartshopai.smartshopbackend.entity.OrderItem;
import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {

    private OrderMapper() {}

    public static OrderResponse toResponse(Order order) {
        List<OrderItemResponse> items = order.getItems().stream()
                .map(OrderMapper::toItemResponse)
                .collect(Collectors.toList());

        return new OrderResponse(
                order.getId(),
                order.getStatus(),
                order.getTotalAmount(),
                order.getCreatedAt(),
                order.getShippingName(),
                order.getShippingPhone(),
                order.getShippingAddress(),
                order.getShippingWard(),
                order.getShippingDistrict(),
                order.getShippingCity(),
                order.getShippingNote(),
                items);
    }

    private static OrderItemResponse toItemResponse(OrderItem item) {
        return new OrderItemResponse(
                item.getProduct().getId(),
                item.getProduct().getName(),
                item.getQuantity(),
                item.getUnitPrice());
    }
}
