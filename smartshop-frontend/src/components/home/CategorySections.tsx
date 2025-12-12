"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/features/categories/type";
import { Product } from "@/features/products/type";
import { getCategories } from "@/features/categories/services/categoryService";
import { getProducts } from "@/features/products/services/productService";

type Section = {
    category: Category;
    products: Product[];
};

export default function CategorySections() {
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cats = await getCategories();
                const preferredOrder = ["dien-thoai", "laptop", "giay-dep", "thoi-trang", "do-gia-dung", "my-pham", "dong-ho", "khac"];
                const sorted = [...cats].sort((a, b) => {
                    const aIdx = preferredOrder.indexOf(a.slug);
                    const bIdx = preferredOrder.indexOf(b.slug);
                    const aScore = aIdx === -1 ? Number.MAX_SAFE_INTEGER : aIdx;
                    const bScore = bIdx === -1 ? Number.MAX_SAFE_INTEGER : bIdx;
                    return aScore - bScore;
                });

                const picks = sorted.slice(0, 3);
                const productLists = await Promise.all(
                    picks.map((cat) =>
                        getProducts({ category: cat.slug, size: 4 }).catch(() => [])
                    )
                );
                const mapped = picks
                    .map((cat, idx) => ({
                        category: cat,
                        products: productLists[idx],
                    }))
                    .filter((section) => section.products.length > 0);

                // Fallback: if none returned products, keep the raw picks so layout still shows.
                setSections(mapped.length > 0 ? mapped : picks.map((cat) => ({ category: cat, products: [] })));
            } catch {
                setSections([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading || sections.length === 0) return null;

    return (
        <section className="max-w-screen-2xl mx-auto px-6 mt-12">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Bộ sưu tập</p>
                    <h2 className="text-2xl font-semibold text-foreground">Gợi ý theo ngành hàng</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Điện thoại, thời trang, gia dụng... chọn nhanh theo nhu cầu.
                    </p>
                </div>
                <Link href="/category/all" className="text-sm font-semibold text-primary hover:underline">
                    Xem tất cả danh mục
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {sections.map((section) => (
                    <div
                        key={section.category.id}
                        className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm hover:-translate-y-1 transition"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Danh mục</p>
                                <h3 className="text-lg font-semibold text-foreground">{section.category.name}</h3>
                            </div>
                            <Link
                                href={`/category/${section.category.slug}`}
                                className="text-xs font-semibold text-primary hover:underline"
                            >
                                Xem tất cả
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {section.products.map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/product/${p.id}`}
                                    className="flex items-center gap-3 rounded-xl border border-border/70 bg-background px-3 py-2 hover:border-foreground"
                                >
                                    <div className="h-16 w-16 overflow-hidden rounded-lg bg-muted">
                                        <Image
                                            src={p.imageUrl}
                                            alt={p.name}
                                            width={64}
                                            height={64}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-foreground line-clamp-2">{p.name}</p>
                                        <p className="text-sm text-muted-foreground">{p.price.toLocaleString("vi-VN")}đ</p>
                                    </div>
                                </Link>
                            ))}

                            {section.products.length === 0 && (
                                <p className="text-sm text-muted-foreground">Chưa có sản phẩm.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
