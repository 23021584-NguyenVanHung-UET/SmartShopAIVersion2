"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/shared/Footer";
import Categories from "@/components/home/Categories";
import ProductGrid from "@/components/home/ProductGrid";
import { getCategories } from "@/features/categories/services/categoryService";
import { Category } from "@/features/categories/type";

export default function CategoryPage() {
    const params = useParams();
    const slugParam = params?.slug;
    const slug = typeof slugParam === "string" ? slugParam : Array.isArray(slugParam) ? slugParam[0] : "all";

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories()
            .then(setCategories)
            .catch(() => setCategories([]));
    }, []);

    const categoryName = useMemo(
        () => categories.find((c) => c.slug === slug)?.name,
        [categories, slug]
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <main className="pt-24">
                <section className="max-w-7xl mx-auto px-6">
                    <h1 className="text-3xl font-bold mb-2">
                        {categoryName || "Danh mục"}
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Khám phá các sản phẩm trong danh mục {categoryName || slug}.
                    </p>
                </section>

                <Categories
                    categories={categories}
                    selectedSlug={slug}
                    linkToPage
                />

                <ProductGrid
                    selectedCategorySlug={slug}
                    selectedCategoryName={categoryName}
                />
            </main>
            <Footer />
        </div>
    );
}
