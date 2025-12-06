package com.smartshopai.smartshopbackend.dto.response;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String imageUrl;
    private String categoryName;
    private String categorySlug;
    private Instant createdAt;
}
