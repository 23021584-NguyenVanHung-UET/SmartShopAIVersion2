package com.smartshopai.smartshopbackend.repository.spec;

import com.smartshopai.smartshopbackend.entity.Category;
import com.smartshopai.smartshopbackend.entity.Product;
import jakarta.persistence.criteria.JoinType;
import java.util.Optional;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class ProductSpecifications {

    public static Specification<Product> search(String q) {
        return (root, query, cb) -> {
            if (!StringUtils.hasText(q)) {
                return cb.conjunction();
            }
            String like = "%" + q.toLowerCase().trim() + "%";
            return cb.or(
                    cb.like(cb.lower(root.get("name")), like),
                    cb.like(cb.lower(root.get("description")), like));
        };
    }

    public static Specification<Product> byCategorySlug(String slug) {
        return (root, query, cb) -> {
            if (!StringUtils.hasText(slug)) {
                return cb.conjunction();
            }
            root.fetch("category", JoinType.LEFT);
            return cb.equal(cb.lower(root.join("category", JoinType.LEFT).get("slug")), slug.toLowerCase());
        };
    }

    public static Specification<Product> minPrice(Double min) {
        return (root, query, cb) -> Optional.ofNullable(min)
                .map(value -> cb.greaterThanOrEqualTo(root.get("price"), value))
                .orElse(cb.conjunction());
    }

    public static Specification<Product> maxPrice(Double max) {
        return (root, query, cb) -> Optional.ofNullable(max)
                .map(value -> cb.lessThanOrEqualTo(root.get("price"), value))
                .orElse(cb.conjunction());
    }

    public static Specification<Product> withCategoryFetch() {
        return (root, query, cb) -> {
            if (query.getResultType() != Long.class && query.getResultType() != long.class) {
                root.fetch("category", JoinType.LEFT);
            }
            return cb.conjunction();
        };
    }
}
