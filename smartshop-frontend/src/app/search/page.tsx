"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/shared/Footer";
import ProductGrid from "@/components/home/ProductGrid";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const queryParam = searchParams.get("q") || searchParams.get("query") || "";
    const [keyword, setKeyword] = useState(queryParam);

    useEffect(() => {
        setKeyword(queryParam);
    }, [queryParam]);

    const title = useMemo(() => {
        if (!keyword) return "Tìm kiếm sản phẩm";
        return `Kết quả cho “${keyword}”`;
    }, [keyword]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const next = keyword.trim();
        router.push(`/search?q=${encodeURIComponent(next)}`);
    };

    return (
        <div className="bg-background min-h-screen">
            <Navbar />
            <main className="pt-[calc(var(--header-height)+20px)] lg:pt-[calc(var(--header-height)+28px)] pb-12">
                <section className="max-w-screen-2xl mx-auto px-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tìm kiếm</p>
                        <h1 className="text-3xl font-semibold text-foreground">{title}</h1>
                        <p className="text-sm text-muted-foreground">Nhập từ khóa hoặc danh mục để tìm nhanh.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full max-w-xl">
                        <div className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2">
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Từ khóa, tên sản phẩm, thương hiệu..."
                                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
                            />
                            <button
                                type="submit"
                                className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:bg-foreground/90"
                            >
                                Tìm
                            </button>
                        </div>
                    </form>
                </section>

                <ProductGrid
                    selectedCategorySlug="all"
                    selectedCategoryName="Tất cả"
                    searchKeyword={keyword}
                    hideMeta
                />
            </main>
            <Footer />
        </div>
    );
}
