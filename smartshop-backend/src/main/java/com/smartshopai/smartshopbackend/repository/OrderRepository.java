package com.smartshopai.smartshopbackend.repository;

import com.smartshopai.smartshopbackend.entity.Order;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @EntityGraph(attributePaths = {"items", "items.product"})
    List<Order> findByUserId(Long userId);

    @EntityGraph(attributePaths = {"items", "items.product"})
    java.util.Optional<Order> findByIdAndUserId(Long id, Long userId);

    @EntityGraph(attributePaths = {"items", "items.product"})
    java.util.Optional<Order> findByIdAndPaymentCode(Long id, String paymentCode);

    @EntityGraph(attributePaths = {"items", "items.product"})
    java.util.Optional<Order> findByPaymentCode(String paymentCode);

    @Query("SELECT o FROM Order o LEFT JOIN FETCH o.user LEFT JOIN FETCH o.items")
    List<Order> findAllWithUserAndItems();

    @Query("SELECT o FROM Order o LEFT JOIN FETCH o.user LEFT JOIN FETCH o.items")
    Page<Order> findAllWithUserAndItems(Pageable pageable);
}
