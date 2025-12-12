"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/features/categories/type";
import { Sparkles } from "lucide-react";

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
        <section className="max-w-screen-2xl mx-auto px-6 mt-10">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Danh mục</p>
                    <h2 className="text-2xl font-semibold text-foreground">Khám phá sản phẩm theo nhóm</h2>
                </div>
                <span className="hidden md:inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    <Sparkles size={14} />
                    Gợi ý thông minh
                </span>
            </div>

            <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
                {categories.map((item) => {
                    const isActive = selectedSlug === item.slug;
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                onSelect?.(item.slug);
                                if (linkToPage) router.push(`/category/${item.slug}`);
                            }}
                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                                isActive
                                    ? "border-foreground bg-foreground text-background"
                                    : "border-border bg-card text-foreground hover:border-foreground"
                            }`}
                        >
                            <span className="text-base">✨</span>
                            <span className="whitespace-nowrap">{item.name}</span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
