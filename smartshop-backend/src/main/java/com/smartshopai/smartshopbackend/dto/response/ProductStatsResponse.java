package com.smartshopai.smartshopbackend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductStatsResponse {
    private Long productId;
    private String productName;
    private Long totalSold;
    private Double totalRevenue;
}
