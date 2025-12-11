"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
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

type Props = {
    categories: Category[];
    selectedSlug: string;
    onSelect?: (slug: string) => void;
    linkToPage?: boolean;
};

export default function Categories({ categories, selectedSlug, onSelect, linkToPage = false }: Props) {
    const router = useRouter();

    useEffect(() => {
        if (selectedSlug || categories.length === 0) return;
        // Default to "all" when nothing is selected and we have categories.
        onSelect?.("all");
    }, [categories.length, onSelect, selectedSlug]);

    return (
        <section className="max-w-7xl mx-auto px-6 mt-10">
            <h2 className="text-xl font-bold mb-4">Danh mục</h2>

            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {categories.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => {
                            onSelect?.(item.slug);
                            if (linkToPage) router.push(`/category/${item.slug}`);
                        }}
                        className={`flex flex-col items-center bg-white p-3 rounded-xl shadow hover:scale-105 transition cursor-pointer border ${selectedSlug === item.slug ? "border-blue-500 ring-2 ring-blue-100" : "border-transparent"}`}
                    >
                        <div className="text-3xl">{icons[item.name] || "✨"}</div>
                        <p className="text-sm mt-2">{item.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
