"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/features/categories/services/categoryService";
import { Category } from "@/features/categories/type";

// Basic icon mapping for the known categories; fallback sparkle for unknowns.
const icons: Record<string, string> = {
    "Điện thoại": "📱",
    "Laptop": "💻",
    "Thời trang": "👗",
    "Mỹ phẩm": "💄",
    "Đồ gia dụng": "🏠",
    "Thú cưng": "🐶",
    "Đồng hồ": "⌚",
    "Balo": "🎒",
    "Giày dép": "👟",
    "Sức khỏe": "💊",
    "Thể thao": "🏀",
    "Khác": "✨",
};

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories()
            .then(setCategories)
            .catch(() => setCategories([]));
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-6 mt-10">
            <h2 className="text-xl font-bold mb-4">Danh mục</h2>

            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {categories.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col items-center bg-white p-3 rounded-xl shadow hover:scale-105 transition cursor-pointer"
                    >
                        <div className="text-3xl">{icons[item.name] || "✨"}</div>
                        <p className="text-sm mt-2">{item.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
