"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/features/products/services/productService";
import { Product } from "@/features/products/type";
import { useCart } from "@/features/cart/hooks/useCart";

type Props = {
    selectedCategorySlug: string;
    selectedCategoryName?: string;
    searchKeyword?: string;
    hideMeta?: boolean;
};

export default function ProductGrid({ selectedCategorySlug, selectedCategoryName, searchKeyword, hideMeta = false }: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [addedId, setAddedId] = useState<number | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        setLoading(true);
        getProducts({
            ...(selectedCategorySlug === "all" || !selectedCategorySlug ? {} : { category: selectedCategorySlug }),
            ...(searchKeyword ? { q: searchKeyword } : {}),
        })
            .then(res => setProducts(res))
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, [selectedCategorySlug, searchKeyword]);

    return (
        <div className="max-w-screen-2xl mx-auto px-6 mt-12" id="grid">
            {!hideMeta && (
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Danh mục chọn</p>
                        <h2 className="text-2xl font-semibold text-foreground">Sản phẩm nổi bật</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {searchKeyword
                                ? `Kết quả cho “${searchKeyword}” ${selectedCategorySlug !== "all" ? `· ${selectedCategoryName ?? ""}` : ""}`
                                : selectedCategorySlug === "all"
                                    ? "Hiển thị tất cả danh mục"
                                    : `Danh mục: ${selectedCategoryName ?? "Đang tải..."}`}
                        </p>
                    </div>
                    <Link href="/homepage#flash-sale" className="text-sm font-semibold text-primary hover:underline">
                        Ưu đãi hôm nay
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {loading ? (
                    <p className="col-span-full text-center text-muted-foreground">Đang tải sản phẩm...</p>
                ) : products.length === 0 ? (
                    <p className="col-span-full text-center text-muted-foreground">Không có sản phẩm.</p>
                ) : (
                    products.map((p) => (
                        <div
                            key={p.id}
                            className="group rounded-2xl border border-border bg-card p-3 shadow-sm hover:-translate-y-1 hover:shadow-lg transition"
                        >
                            <Link href={`/product/${p.id}`}>
                                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                                    <Image
                                        src={p.imageUrl}
                                        width={400}
                                        height={500}
                                        alt={p.name}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                </div>
                            </Link>

                            <Link href={`/product/${p.id}`}>
                                <h3 className="font-semibold mt-3 line-clamp-2 text-foreground hover:text-primary">
                                    {p.name}
                                </h3>
                            </Link>

                            <p className="text-base font-bold text-foreground mt-2">
                                {p.price.toLocaleString("vi-VN")}đ
                            </p>

                            <button
                                onClick={() => {
                                    addToCart(p);
                                    setAddedId(p.id);
                                    setTimeout(() => setAddedId(null), 900);
                                }}
                                className="mt-3 w-full rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:bg-foreground/90"
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
