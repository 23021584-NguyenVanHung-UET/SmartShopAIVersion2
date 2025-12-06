package com.smartshopai.smartshopbackend.controller.admin;

import com.smartshopai.smartshopbackend.entity.Product;
import com.smartshopai.smartshopbackend.service.ProductService;
import java.io.File;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin(origins = "*")
public class ProductAdminController {

    private final ProductService service;

    public ProductAdminController(ProductService service) {
        this.service = service;
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
        String uploadDir = "uploads/";
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
