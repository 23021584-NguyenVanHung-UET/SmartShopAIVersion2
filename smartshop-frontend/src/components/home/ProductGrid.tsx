"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getProducts } from "@/features/products/services/productService";
import { Product } from "@/features/products/type";
import { useCart } from "@/features/cart/hooks/useCart";
import { getCategories } from "@/features/categories/services/categoryService";
import { Category } from "@/features/categories/type";

export default function ProductGrid() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [loading, setLoading] = useState(false);
    const [addedId, setAddedId] = useState<number | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        getCategories()
            .then(setCategories)
            .catch(() => setCategories([]));
    }, []);

    useEffect(() => {
        setLoading(true);
        getProducts(
            selectedCategory === "all"
                ? {}
                : { category: selectedCategory }
        )
            .then(res => setProducts(res))
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, [selectedCategory]);

    return (
        <div className="max-w-7xl mx-auto px-6 mt-10">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Sản phẩm nổi bật</h2>

            <div className="flex flex-wrap items-center gap-2 mb-4">
                <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-3 py-1 rounded-full border ${selectedCategory === "all" ? "bg-blue-600 text-white" : "bg-white"}`}
                >
                    Tất cả
                </button>
                {categories.map((c) => (
                    <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.slug)}
                        className={`px-3 py-1 rounded-full border ${selectedCategory === c.slug ? "bg-blue-600 text-white" : "bg-white"}`}
                    >
                        {c.name}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {loading ? (
                    <p className="col-span-full text-center text-gray-500">Đang tải...</p>
                ) : products.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">Không có sản phẩm.</p>
                ) : (
                    products.map((p) => (
                        <div key={p.id} className="bg-white shadow rounded-lg p-4 hover:shadow-md transition">
                            <Image
                                src={p.imageUrl}
                                width={200}
                                height={200}
                                alt={p.name}
                                className="rounded-lg object-cover w-full h-40"
                            />

                            <h3 className="font-medium mt-3 line-clamp-2">{p.name}</h3>

                            <p className="text-blue-600 font-bold mt-2">
                                {p.price.toLocaleString()}đ
                            </p>

                            <button
                                onClick={() => {
                                    addToCart(p);
                                    setAddedId(p.id);
                                    setTimeout(() => setAddedId(null), 900);
                                }}
                                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                {addedId === p.id ? "Đã thêm!" : "Thêm vào giỏ"}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
