"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/features/products/type";
import { getProductById, getProducts } from "@/features/products/services/productService";
import { useCart } from "@/features/cart/hooks/useCart";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/shared/Footer";
import { Truck, RefreshCcw, ShieldCheck, MessageCircle } from "lucide-react";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [related, setRelated] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const id = Number(params?.id);
        if (!id) return;
        setLoading(true);
        getProductById(id)
            .then((p) => {
                setProduct(p);
                if (p.categorySlug) {
                    getProducts({ category: p.categorySlug, size: 4 })
                        .then((items) => setRelated(items.filter((item) => item.id !== p.id)))
                        .catch(() => setRelated([]));
                }
            })
            .catch(() => setError("Không tìm thấy sản phẩm"))
            .finally(() => setLoading(false));
    }, [params?.id]);

    return (
        <div className="bg-background min-h-screen">
            <Navbar />

            <main className="max-w-screen-2xl mx-auto px-6 pt-[calc(var(--header-height)+16px)] lg:pt-[calc(var(--header-height)+22px)] pb-16">
                {loading ? (
                    <p className="p-6 text-muted-foreground">Đang tải...</p>
                ) : error || !product ? (
                    <div className="p-6">
                        <p className="text-destructive mb-4">{error || "Không tìm thấy sản phẩm"}</p>
                        <button
                            onClick={() => router.push("/homepage")}
                            className="text-primary underline"
                        >
                            Quay lại trang chủ
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-[1.1fr,0.9fr] gap-10">
                            <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
                                <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        width={800}
                                        height={800}
                                        className="h-full w-full object-cover"
                                        priority
                                    />
                                </div>
                            </div>

                            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
                                <p className="text-sm text-muted-foreground">{product.categoryName}</p>
                                <h1 className="text-3xl font-semibold text-foreground">{product.name}</h1>
                                <p className="text-2xl font-bold text-foreground">
                                    {product.price.toLocaleString("vi-VN")}đ
                                </p>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {product.description || "Sản phẩm đang được cập nhật mô tả."}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                                    <div className="rounded-xl border border-border bg-muted/60 p-3">
                                        <p className="font-semibold text-foreground">Vận chuyển</p>
                                        <p className="text-muted-foreground">Freeship đơn từ 499k</p>
                                    </div>
                                    <div className="rounded-xl border border-border bg-muted/60 p-3">
                                        <p className="font-semibold text-foreground">Đổi trả</p>
                                        <p className="text-muted-foreground">Trong 7 ngày nếu lỗi</p>
                                    </div>
                                    <div className="rounded-xl border border-border bg-muted/60 p-3">
                                        <p className="font-semibold text-foreground">Thanh toán</p>
                                        <p className="text-muted-foreground">VNPay / COD</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        addToCart(product);
                                        setAdded(true);
                                        setTimeout(() => setAdded(false), 900);
                                    }}
                                    className="w-full rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90"
                                >
                                    {added ? "Đã thêm!" : "Thêm vào giỏ"}
                                </button>
                            </div>
                        </div>

                        <section className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {[
                                    { icon: Truck, title: "Giao nhanh 2H", desc: "Ưu tiên nội thành, chọn giờ giao." },
                                    { icon: RefreshCcw, title: "Đổi trả 7 ngày", desc: "Miễn phí nếu sản phẩm lỗi." },
                                    { icon: ShieldCheck, title: "Bảo hành chính hãng", desc: "Cam kết hàng chuẩn, đủ tem." },
                                    { icon: MessageCircle, title: "Hỗ trợ 24/7", desc: "Chat ngay với SmartShop Care." },
                                ].map((item) => (
                                    <div key={item.title} className="flex gap-3 rounded-2xl border border-border/70 bg-muted/50 p-3">
                                        <div className="rounded-xl bg-background p-2 border border-border/70">
                                            <item.icon size={20} className="text-foreground" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-semibold text-foreground">{item.title}</p>
                                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {related.length > 0 && (
                            <div className="mt-12">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Gợi ý thêm</p>
                                        <h2 className="text-xl font-semibold text-foreground">Sản phẩm liên quan</h2>
                                    </div>
                                    <button
                                        onClick={() => router.push("/homepage#grid")}
                                        className="text-sm font-semibold text-primary hover:underline"
                                    >
                                        Xem thêm
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {related.map((item) => (
                                        <div
                                            key={item.id}
                                            className="group rounded-2xl border border-border bg-card p-3 shadow-sm hover:-translate-y-1 hover:shadow-lg transition cursor-pointer"
                                            onClick={() => router.push(`/product/${item.id}`)}
                                        >
                                            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    width={300}
                                                    height={300}
                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                            <p className="font-semibold mt-3 line-clamp-2 text-foreground">{item.name}</p>
                                            <p className="text-base font-bold text-foreground">
                                                {item.price.toLocaleString("vi-VN")}đ
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}
