"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { ShieldCheck, Sparkles, Truck } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/shared/Footer";
import ProductGrid from "@/components/home/ProductGrid";
import { getCategories } from "@/features/categories/services/categoryService";
import { Category } from "@/features/categories/type";

export default function CategoryPage() {
    const params = useParams();
    const slugParam = params?.slug;
    const rawSlug = typeof slugParam === "string" ? slugParam : Array.isArray(slugParam) ? slugParam[0] : "all";
    const slugAlias: Record<string, string> = {
        giay: "giay-dep",
        "phu-kien": "khac",
        "dien-tu": "dien-thoai",
    };
    const slug = slugAlias[rawSlug] ?? rawSlug;

    const [categories, setCategories] = useState<Category[]>([]);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        getCategories()
            .then(setCategories)
            .catch(() => setCategories([]));
    }, []);

    const categoryName = useMemo(() => {
        const found = categories.find((c) => c.slug === slug);
        if (found) return found.name;
        const aliasKey = Object.keys(slugAlias).find((k) => slugAlias[k] === slug);
        if (aliasKey) {
            const aliasCat = categories.find((c) => c.slug === aliasKey);
            return aliasCat?.name;
        }
        return undefined;
    }, [categories, slug]);

    return (
        <div className="bg-background min-h-screen">
            <Navbar onSearch={(text) => setSearchKeyword(text)} />
            <main className="pt-[calc(var(--header-height)+20px)] lg:pt-[calc(var(--header-height)+28px)] pb-12">
                <section className="max-w-screen-2xl mx-auto px-6">
                    <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-r from-primary/8 via-background to-secondary p-8 md:p-10 shadow-[0_28px_70px_-50px_rgba(15,23,42,0.45)]">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-3">
                                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Danh mục</p>
                                <h1 className="text-3xl font-semibold text-foreground">
                                    {categoryName || "Tất cả sản phẩm"}
                                </h1>
                                <p className="max-w-2xl text-muted-foreground">
                                    Bộ sưu tập được gợi ý riêng cho bạn. Chọn sản phẩm, thêm vào giỏ và nhận giao nhanh 2H nội thành.
                                </p>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-3 md:max-w-lg">
                                {[
                                    { icon: Truck, label: "Giao nhanh", desc: "2H nội thành, 2-3 ngày toàn quốc" },
                                    { icon: ShieldCheck, label: "Bảo vệ đơn", desc: "Đổi trả 7 ngày nếu lỗi" },
                                    { icon: Sparkles, label: "Gợi ý thông minh", desc: "AI lọc sản phẩm phù hợp" },
                                ].map((item) => (
                                    <div key={item.label} className="flex gap-3 rounded-2xl border border-border/70 bg-card/60 px-4 py-3">
                                        <item.icon className="h-5 w-5 text-foreground" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-semibold text-foreground">{item.label}</p>
                                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="max-w-screen-2xl mx-auto px-6 mt-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Danh sách</p>
                            <h2 className="text-2xl font-semibold text-foreground">
                                {categoryName || "Tất cả sản phẩm"}
                            </h2>
                        </div>
                        <div className="hidden sm:flex gap-2 text-xs text-muted-foreground">
                            <span className="rounded-full border border-border px-3 py-1">Mới cập nhật</span>
                            <span className="rounded-full border border-border px-3 py-1">Giá tốt</span>
                        </div>
                    </div>
                </div>

                <ProductGrid
                    selectedCategorySlug={slug}
                    selectedCategoryName={categoryName}
                    searchKeyword={searchKeyword}
                />
            </main>
            <Footer />
        </div>
    );
}
