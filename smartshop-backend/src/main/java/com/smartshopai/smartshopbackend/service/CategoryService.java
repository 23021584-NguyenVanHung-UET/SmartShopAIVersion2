package com.smartshopai.smartshopbackend.service;

import com.smartshopai.smartshopbackend.entity.Category;
import com.smartshopai.smartshopbackend.repository.CategoryRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category create(com.smartshopai.smartshopbackend.dto.CategoryRequest request) {
        // Check if category already exists
        if (categoryRepository.findByName(request.getName()).isPresent()) {
            throw new IllegalArgumentException("Category '" + request.getName() + "' already exists");
        }

        Category category = new Category();
        category.setName(request.getName());
        category.setSlug(generateSlug(request.getName()));
        return categoryRepository.save(category);
    }

    public Category update(Long id, com.smartshopai.smartshopbackend.dto.CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(
                        () -> new com.smartshopai.smartshopbackend.exception.NotFoundException("Category not found"));

        category.setName(request.getName());
        category.setSlug(generateSlug(request.getName()));
        return categoryRepository.save(category);
    }

    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }

    public int deleteUnusedCategories() {
        // Find all categories
        List<Category> allCategories = categoryRepository.findAll();
        int deletedCount = 0;

        for (Category category : allCategories) {
            // Count products in this category
            long productCount = categoryRepository.countProductsByCategory(category.getId());

            if (productCount == 0) {
                categoryRepository.deleteById(category.getId());
                deletedCount++;
            }
        }

        return deletedCount;
    }

    private String generateSlug(String name) {
        return name.toLowerCase()
                // Vietnamese characters to ASCII
                .replaceAll("[àáạảãâầấậẩẫăằắặẳẵ]", "a")
                .replaceAll("[èéẹẻẽêềếệểễ]", "e")
                .replaceAll("[ìíịỉĩ]", "i")
                .replaceAll("[òóọỏõôồốộổỗơờớợởỡ]", "o")
                .replaceAll("[ùúụủũưừứựửữ]", "u")
                .replaceAll("[ỳýỵỷỹ]", "y")
                .replaceAll("[đ]", "d")
                // Remove special characters and replace with dash
                .replaceAll("[^a-z0-9]+", "-")
                // Remove leading/trailing dashes
                .replaceAll("^-+|-+$", "");
    }
}
