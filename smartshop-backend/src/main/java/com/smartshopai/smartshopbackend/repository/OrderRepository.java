package com.smartshopai.smartshopbackend.repository;

import com.smartshopai.smartshopbackend.entity.Order;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @EntityGraph(attributePaths = {"items", "items.product"})
    List<Order> findByUserId(Long userId);

    @EntityGraph(attributePaths = {"items", "items.product"})
    java.util.Optional<Order> findByIdAndUserId(Long id, Long userId);
}
