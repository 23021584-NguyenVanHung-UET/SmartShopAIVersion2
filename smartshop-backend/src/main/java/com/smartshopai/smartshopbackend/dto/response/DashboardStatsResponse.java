package com.smartshopai.smartshopbackend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {
    private Long totalRevenue;
    private Long totalOrders;
    private Long totalUsers;
    private Long totalProducts;
    private Double revenueGrowth;
    private Double orderGrowth;
    private Double userGrowth;
    private Double productGrowth;
}
