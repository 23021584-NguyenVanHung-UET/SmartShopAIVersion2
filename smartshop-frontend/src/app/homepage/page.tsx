"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/home/Navbar";
import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import FlashSale from "@/components/home/FlashSale";
import ProductGrid from "@/components/home/ProductGrid";
import Footer from "@/components/shared/Footer";
import { getCategories } from "@/features/categories/services/categoryService";
import { Category } from "@/features/categories/type";

export default function HomePageShop() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    useEffect(() => {
        getCategories()
            .then(setCategories)
            .catch(() => setCategories([]));
    }, []);

    const selectedCategoryName =
        selectedCategory === "all"
            ? "Tất cả"
            : categories.find((c) => c.slug === selectedCategory)?.name;

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="pt-20">
                <Banner />
                <Categories
                    categories={categories}
                    selectedSlug={selectedCategory}
                    onSelect={(slug) => setSelectedCategory(slug)}
                    linkToPage
                />
                <FlashSale />
                <ProductGrid
                    selectedCategorySlug={selectedCategory}
                    selectedCategoryName={selectedCategoryName}
                />
            </div>
            <Footer />
        </div>
    );
}
