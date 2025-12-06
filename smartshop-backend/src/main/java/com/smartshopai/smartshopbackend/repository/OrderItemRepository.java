package com.smartshopai.smartshopbackend.repository;

import com.smartshopai.smartshopbackend.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
