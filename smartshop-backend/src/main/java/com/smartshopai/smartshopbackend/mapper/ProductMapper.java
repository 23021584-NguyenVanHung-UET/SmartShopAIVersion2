package com.smartshopai.smartshopbackend.mapper;

import com.smartshopai.smartshopbackend.dto.response.ProductResponse;
import com.smartshopai.smartshopbackend.entity.Product;

public class ProductMapper {

    private ProductMapper() {}

    public static ProductResponse toResponse(Product product) {
        if (product == null) {
            return null;
        }
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getImageUrl(),
                product.getCategory() != null ? product.getCategory().getName() : null,
                product.getCategory() != null ? product.getCategory().getSlug() : null,
                product.getCreatedAt());
    }
}
