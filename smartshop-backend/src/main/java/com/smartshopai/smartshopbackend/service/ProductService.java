package com.smartshopai.smartshopbackend.service;

import com.smartshopai.smartshopbackend.entity.Product;
import com.smartshopai.smartshopbackend.exception.NotFoundException;
import com.smartshopai.smartshopbackend.repository.ProductRepository;
import com.smartshopai.smartshopbackend.repository.spec.ProductSpecifications;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@org.springframework.transaction.annotation.Transactional
public class ProductService {

    private final ProductRepository repo;

    private final com.smartshopai.smartshopbackend.repository.CategoryRepository categoryRepository;

    private final CategoryService categoryService;

    public ProductService(ProductRepository repo,
            com.smartshopai.smartshopbackend.repository.CategoryRepository categoryRepository,
            CategoryService categoryService) {
        this.repo = repo;
        this.categoryRepository = categoryRepository;
        this.categoryService = categoryService;
    }

    public List<Product> getAll() {
        return repo.findAll();
    }

    public Product getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new NotFoundException("Product not found"));
    }

    public List<Product> getLatest(int limit) {
        return repo.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .limit(limit)
                .toList();
    }

    public Page<Product> search(String q, String categorySlug, Double minPrice, Double maxPrice, Pageable pageable) {
        Specification<Product> spec = Specification.where(ProductSpecifications.withCategoryFetch())
                .and(ProductSpecifications.search(q))
                .and(ProductSpecifications.byCategorySlug(categorySlug))
                .and(ProductSpecifications.minPrice(minPrice))
                .and(ProductSpecifications.maxPrice(maxPrice));

        return repo.findAll(spec, pageable);
    }

    // Admin search with filters (by name, category name, and status)
    public Page<Product> searchWithFilters(String query, String categoryName, String status, Pageable pageable) {
        Specification<Product> spec = Specification.where(ProductSpecifications.withCategoryFetch());

        if (query != null && !query.trim().isEmpty()) {
            spec = spec.and(ProductSpecifications.search(query));
        }

        if (categoryName != null && !categoryName.equals("all")) {
            spec = spec.and(ProductSpecifications.byCategoryName(categoryName));
        }

        if (status != null && !status.equals("all")) {
            spec = spec.and(ProductSpecifications.byStatus(status));
        }

        return repo.findAll(spec, pageable);
    }

    public Product save(Product product) {
        return repo.save(product);
    }

    // New update method using DTO
    public Product update(Long id, com.smartshopai.smartshopbackend.dto.ProductRequest request) {
        Product product = getById(id);

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setDescription(request.getDescription());
        product.setImageUrl(request.getImageUrl());
        product.setStatus(request.getStatus());

        if (request.getCategory() != null) {
            com.smartshopai.smartshopbackend.entity.Category category = categoryRepository
                    .findByName(request.getCategory())
                    .orElseGet(() -> {
                        com.smartshopai.smartshopbackend.entity.Category newCat = new com.smartshopai.smartshopbackend.entity.Category();
                        newCat.setName(request.getCategory());
                        newCat.setSlug(request.getCategory().toLowerCase().replaceAll("[^a-z0-9]", "-"));
                        return categoryRepository.save(newCat);
                    });
            product.setCategory(category);
        }

        return repo.save(product);
    }

    public Product create(com.smartshopai.smartshopbackend.dto.ProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setDescription(request.getDescription());
        product.setImageUrl(request.getImageUrl());
        product.setStatus(request.getStatus() != null ? request.getStatus() : "active");

        if (request.getCategory() != null) {
            com.smartshopai.smartshopbackend.entity.Category category = categoryRepository
                    .findByName(request.getCategory())
                    .orElseGet(() -> {
                        com.smartshopai.smartshopbackend.entity.Category newCat = new com.smartshopai.smartshopbackend.entity.Category();
                        newCat.setName(request.getCategory());
                        // Generate simplified slug
                        newCat.setSlug(request.getCategory().toLowerCase().replaceAll("[^a-z0-9]", "-"));
                        return categoryRepository.save(newCat);
                    });
            product.setCategory(category);
        }

        return repo.save(product);
    }

    public void delete(Long id) {
        repo.deleteById(id);
        // Automatically clean up unused categories after product deletion
        categoryService.deleteUnusedCategories();
    }

    // Admin convenience methods
    public Page<Product> findAll(Pageable pageable) {
        return repo.findAll(pageable);
    }

    public java.util.Optional<Product> findById(Long id) {
        return repo.findById(id);
    }
}
