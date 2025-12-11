package com.smartshopai.smartshopbackend.controller.admin;

import com.smartshopai.smartshopbackend.dto.response.DashboardStatsResponse;
import com.smartshopai.smartshopbackend.dto.response.ProductStatsResponse;
import com.smartshopai.smartshopbackend.dto.response.RevenueDataResponse;
import com.smartshopai.smartshopbackend.entity.OrderItem;
import com.smartshopai.smartshopbackend.repository.OrderItemRepository;
import com.smartshopai.smartshopbackend.repository.OrderRepository;
import com.smartshopai.smartshopbackend.repository.ProductRepository;
import com.smartshopai.smartshopbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;

    @GetMapping("/stats")
    public DashboardStatsResponse getStats() {
        Long totalOrders = orderRepository.count();
        Long totalUsers = userRepository.count();
        Long totalProducts = productRepository.count();

        // Calculate total revenue from all orders
        Long totalRevenue = orderRepository.findAll().stream()
                .mapToLong(order -> order.getTotalAmount().longValue())
                .sum();

        // For growth calculations, we'd need to compare with previous period
        // Setting to 0.0 until historical data tracking is implemented
        return DashboardStatsResponse.builder()
                .totalRevenue(totalRevenue)
                .totalOrders(totalOrders)
                .totalUsers(totalUsers)
                .totalProducts(totalProducts)
                .revenueGrowth(0.0)
                .orderGrowth(0.0)
                .userGrowth(0.0)
                .productGrowth(0.0)
                .build();
    }

    @GetMapping("/revenue")
    public List<RevenueDataResponse> getRevenueData(@RequestParam(defaultValue = "7") int days) {
        List<RevenueDataResponse> revenueData = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // Get orders from the last N days
        LocalDateTime startDate = LocalDateTime.now().minusDays(days).withHour(0).withMinute(0).withSecond(0);

        // Fetch all orders from the database
        List<com.smartshopai.smartshopbackend.entity.Order> allOrders = orderRepository.findAll();

        for (int i = days - 1; i >= 0; i--) {
            LocalDateTime dayStart = LocalDateTime.now().minusDays(i).withHour(0).withMinute(0).withSecond(0);
            LocalDateTime dayEnd = dayStart.plusDays(1);
            String dateStr = dayStart.format(formatter);

            // Filter orders for this specific day
            double dailyRevenue = allOrders.stream()
                    .filter(order -> {
                        if (order.getCreatedAt() == null)
                            return false;
                        LocalDateTime orderDate = LocalDateTime.ofInstant(order.getCreatedAt(),
                                java.time.ZoneId.systemDefault());
                        return !orderDate.isBefore(dayStart) && orderDate.isBefore(dayEnd);
                    })
                    .mapToDouble(order -> order.getTotalAmount().doubleValue())
                    .sum();

            long dailyOrderCount = allOrders.stream()
                    .filter(order -> {
                        if (order.getCreatedAt() == null)
                            return false;
                        LocalDateTime orderDate = LocalDateTime.ofInstant(order.getCreatedAt(),
                                java.time.ZoneId.systemDefault());
                        return !orderDate.isBefore(dayStart) && orderDate.isBefore(dayEnd);
                    })
                    .count();

            revenueData.add(RevenueDataResponse.builder()
                    .date(dateStr)
                    .revenue(dailyRevenue)
                    .orders(dailyOrderCount)
                    .build());
        }

        return revenueData;
    }

    @GetMapping("/top-products")
    public List<ProductStatsResponse> getTopProducts(@RequestParam(defaultValue = "5") int limit) {
        // Fetch all order items
        List<OrderItem> allOrderItems = orderItemRepository.findAll();

        // Group by product and calculate statistics
        Map<Long, ProductStatsResponse> productStatsMap = allOrderItems.stream()
                .collect(Collectors.groupingBy(
                        item -> item.getProduct().getId(),
                        Collectors.collectingAndThen(
                                Collectors.toList(),
                                items -> {
                                    Long totalSold = items.stream()
                                            .mapToLong(OrderItem::getQuantity)
                                            .sum();
                                    Double totalRevenue = items.stream()
                                            .mapToDouble(item -> item.getUnitPrice().doubleValue() * item.getQuantity())
                                            .sum();
                                    OrderItem firstItem = items.get(0);
                                    return ProductStatsResponse.builder()
                                            .productId(firstItem.getProduct().getId())
                                            .productName(firstItem.getProduct().getName())
                                            .totalSold(totalSold)
                                            .totalRevenue(totalRevenue)
                                            .build();
                                })));

        // Sort by total revenue and limit
        return productStatsMap.values().stream()
                .sorted(Comparator.comparing(ProductStatsResponse::getTotalRevenue).reversed())
                .limit(limit)
                .collect(Collectors.toList());
    }
}
