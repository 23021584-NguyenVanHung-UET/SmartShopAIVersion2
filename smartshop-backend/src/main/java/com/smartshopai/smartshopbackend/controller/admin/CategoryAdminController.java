package com.smartshopai.smartshopbackend.controller.admin;

import com.smartshopai.smartshopbackend.dto.CategoryRequest;
import com.smartshopai.smartshopbackend.entity.Category;
import com.smartshopai.smartshopbackend.service.CategoryService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/categories")
@RequiredArgsConstructor
public class CategoryAdminController {

    private final CategoryService categoryService;

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.findAll();
    }

    @PostMapping
    public Category createCategory(@Valid @RequestBody CategoryRequest request) {
        return categoryService.create(request);
    }

    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable Long id, @Valid @RequestBody CategoryRequest request) {
        return categoryService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/cleanup/unused")
    public ResponseEntity<java.util.Map<String, Object>> deleteUnusedCategories() {
        int deletedCount = categoryService.deleteUnusedCategories();
        return ResponseEntity.ok(java.util.Map.of(
                "message", "Deleted unused categories successfully",
                "deletedCount", deletedCount));
    }
}
