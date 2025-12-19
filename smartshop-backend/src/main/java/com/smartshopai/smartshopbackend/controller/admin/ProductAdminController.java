package com.smartshopai.smartshopbackend.controller.admin;

import com.smartshopai.smartshopbackend.entity.Product;
import com.smartshopai.smartshopbackend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
public class ProductAdminController {

    private final ProductService service;

    @GetMapping
    public Page<Product> getAllProducts(Pageable pageable) {
        return service.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public Page<Product> searchProducts(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status,
            Pageable pageable) {
        return service.searchWithFilters(query, category, status, pageable);
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return service.save(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        product.setId(id);
        return ResponseEntity.ok(service.save(product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws Exception {
        // Use absolute path in the project directory
        String projectDir = System.getProperty("user.dir");
        String uploadDir = projectDir + File.separator + "uploads" + File.separator;
        File uploadPath = new File(uploadDir);

        if (!uploadPath.exists()) {
            uploadPath.mkdirs();
        }

        String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
        File dest = new File(uploadDir + fileName);

        file.transferTo(dest);

        return "http://localhost:8080/uploads/" + fileName;
    }
}
