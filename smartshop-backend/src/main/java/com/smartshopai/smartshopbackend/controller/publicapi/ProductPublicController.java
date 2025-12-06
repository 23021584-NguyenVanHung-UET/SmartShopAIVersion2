package com.smartshopai.smartshopbackend.controller.publicapi;

import com.smartshopai.smartshopbackend.entity.Product;
import com.smartshopai.smartshopbackend.service.ProductService;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public List<Product> getAllProducts() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/trending")
    public List<Product> trending() {
        return service.getAll()
                .stream()
                .limit(5)
                .toList();
    }
}
