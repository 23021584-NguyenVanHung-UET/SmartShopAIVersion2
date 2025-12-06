package com.smartshopai.smartshopbackend.repository;

import com.smartshopai.smartshopbackend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
}
