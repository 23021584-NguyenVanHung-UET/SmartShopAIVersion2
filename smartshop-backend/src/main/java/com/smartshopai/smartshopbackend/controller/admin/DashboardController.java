package com.smartshopai.smartshopbackend.controller.admin;

import com.smartshopai.smartshopbackend.dto.response.DashboardStatsResponse;
import com.smartshopai.smartshopbackend.dto.response.ProductStatsResponse;
import com.smartshopai.smartshopbackend.dto.response.RevenueDataResponse;
import com.smartshopai.smartshopbackend.repository.OrderRepository;
import com.smartshopai.smartshopbackend.repository.ProductRepository;
import com.smartshopai.smartshopbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @GetMapping("/stats")
    public DashboardStatsResponse getStats() {
        Long totalOrders = orderRepository.count();
        Long totalUsers = userRepository.count();
        Long totalProducts = productRepository.count();

        // Calculate total revenue from all orders
        Long totalRevenue = orderRepository.findAll().stream()
                .mapToLong(order -> order.getTotalAmount().longValue())
                .sum();

        // For growth calculations, we'll use simple mock data
        // In production, you'd compare with previous period
        return DashboardStatsResponse.builder()
                .totalRevenue(totalRevenue)
                .totalOrders(totalOrders)
                .totalUsers(totalUsers)
                .totalProducts(totalProducts)
                .revenueGrowth(12.5)
                .orderGrowth(8.3)
                .userGrowth(15.7)
                .productGrowth(5.2)
                .build();
    }

    @GetMapping("/revenue")
    public List<RevenueDataResponse> getRevenueData(@RequestParam(defaultValue = "7") int days) {
        List<RevenueDataResponse> revenueData = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // Get orders from the last N days
        LocalDateTime startDate = LocalDateTime.now().minusDays(days);

        for (int i = days - 1; i >= 0; i--) {
            LocalDateTime date = LocalDateTime.now().minusDays(i);
            String dateStr = date.format(formatter);

            // In production, you'd query orders by date
            // For now, returning mock data structure
            revenueData.add(RevenueDataResponse.builder()
                    .date(dateStr)
                    .revenue(0.0)
                    .orders(0L)
                    .build());
        }

        return revenueData;
    }

    @GetMapping("/top-products")
    public List<ProductStatsResponse> getTopProducts(@RequestParam(defaultValue = "5") int limit) {
        List<ProductStatsResponse> topProducts = new ArrayList<>();

        // In production, you'd query order_items grouped by product
        // with SUM(quantity) and SUM(unit_price * quantity)
        // For now, returning empty list as structure

        return topProducts;
    }
}
