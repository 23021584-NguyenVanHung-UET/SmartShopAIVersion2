package com.smartshopai.smartshopbackend.controller;

import com.smartshopai.smartshopbackend.entity.Product;
import com.smartshopai.smartshopbackend.service.ProductService;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    // Lấy danh sách sản phẩm
    @GetMapping
    public List<Product> getAllProducts() {
        return service.getAll();
    }

    // Lấy 1 sản phẩm
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return service.getById(id);
    }

    // Tạo sản phẩm mới (với URL ảnh)
    @PostMapping("/create")
    public Product createProduct(@RequestBody Product product) {
        return service.save(product);
    }

    // Upload ảnh file
    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws Exception {

        String uploadDir = "uploads/";
        File uploadPath = new File(uploadDir);

        if (!uploadPath.exists())
            uploadPath.mkdirs();

        String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
        File dest = new File(uploadDir + fileName);

        file.transferTo(dest);

        return "http://localhost:8080/uploads/" + fileName;
    }

    // Xóa sản phẩm
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        service.delete(id);
        return "Deleted!";
    }

    // API Trending
    @GetMapping("/trending")
    public List<Product> trending() {
        return service.getAll()
                .stream()
                .limit(5)
                .toList();
    }
}
