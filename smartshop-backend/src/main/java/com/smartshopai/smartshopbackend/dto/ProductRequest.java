package com.smartshopai.smartshopbackend.dto;

import lombok.Data;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    private String name;
    private Double price;
    private Integer stock;
    private String category; // Accepts category name
    private String status;
    private String description;
    private String imageUrl;
}
