package com.smartshopai.smartshopbackend.repository;

import com.smartshopai.smartshopbackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
