package com.smartshopai.smartshopbackend.controller.publicapi;

import com.smartshopai.smartshopbackend.dto.response.ProductResponse;
import com.smartshopai.smartshopbackend.entity.Product;
import com.smartshopai.smartshopbackend.mapper.ProductMapper;
import com.smartshopai.smartshopbackend.service.ProductService;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/products")
@CrossOrigin(origins = "*")
public class ProductPublicController {

    private final ProductService service;

    public ProductPublicController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public Page<ProductResponse> getProducts(
            @RequestParam(value = "q", required = false) String q,
            @RequestParam(value = "category", required = false) String categorySlug,
            @RequestParam(value = "minPrice", required = false) Double minPrice,
            @RequestParam(value = "maxPrice", required = false) Double maxPrice,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "12") int size,
            @RequestParam(value = "sort", defaultValue = "newest") String sort) {

        Sort sortBy = switch (sort) {
            case "priceAsc" -> Sort.by("price").ascending();
            case "priceDesc" -> Sort.by("price").descending();
            default -> Sort.by("createdAt").descending();
        };
        Pageable pageable = PageRequest.of(page, size, sortBy);
        return service.search(q, categorySlug, minPrice, maxPrice, pageable)
                .map(ProductMapper::toResponse);
    }

    @GetMapping("/{id}")
    public ProductResponse getProduct(@PathVariable Long id) {
        Product product = service.getById(id);
        return ProductMapper.toResponse(product);
    }

    @GetMapping("/trending")
    public List<ProductResponse> trending() {
        return service.getLatest(5).stream()
                .map(ProductMapper::toResponse)
                .toList();
    }
}
