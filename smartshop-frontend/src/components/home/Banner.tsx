"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Banner() {
    const thumbnails = [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    ];

    return (
        <section className="max-w-screen-2xl mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-r from-primary/10 via-background to-primary/5 px-8 py-10 md:px-12 md:py-14 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.3)]"
            >
                <div className="grid gap-8 md:grid-cols-[1.2fr,1fr] items-center">
                    <div className="space-y-4">
                        <p className="text-sm uppercase tracking-[0.28em] text-primary">SmartShop AI</p>
                        <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-foreground">
                            Mua sắm thông minh, nhận gợi ý AI, giao nhanh trong ngày.
                        </h1>
                        <p className="text-base md:text-lg text-muted-foreground">
                            Khám phá bộ sưu tập mới, ưu đãi độc quyền và trải nghiệm mua sắm được cá nhân hóa.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/homepage#grid"
                                className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background hover:bg-foreground/90"
                            >
                                Mua ngay
                            </Link>
                            <Link
                                href="/homepage#flash-sale"
                                className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground hover:border-foreground"
                            >
                                Xem ưu đãi hôm nay
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 blur-3xl bg-primary/20" />
                        <div className="relative rounded-2xl border border-border bg-white/60 backdrop-blur p-6 flex flex-col gap-4 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Bộ sưu tập mới</p>
                                    <p className="text-lg font-semibold text-foreground">New Arrival 2024</p>
                                </div>
                                <span className="rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold">
                                    -25%
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {thumbnails.map((src) => (
                                    <div
                                        key={src}
                                        className="aspect-square overflow-hidden rounded-xl border border-border bg-muted/70"
                                        aria-hidden
                                        style={{
                                            backgroundImage: `url(${src})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Giao nhanh 2H nội thành • Đổi trả trong 7 ngày nếu lỗi.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
