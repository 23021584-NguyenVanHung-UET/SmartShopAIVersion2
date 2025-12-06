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
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
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

    public Product save(Product product) {
        return repo.save(product);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
