package com.smartshopai.smartshopbackend.dto;

import lombok.Data;

@Data
public class ProductRequest {
    private String name;
    private Double price;
    private Integer stock;
    private String category; // Accepts category name
    private String status;
    private String description;
    private String imageUrl;
}
