"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/features/products/type";
import { getTrendingProducts } from "@/features/products/services/productService";

export default function TrendingProducts() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getTrendingProducts().then(setProducts).catch(() => setProducts([]));
    }, []);

    return (
        <div className="mt-12">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Hot nhất tuần</p>
                    <h2 className="text-2xl font-semibold text-foreground">Sản phẩm nổi bật</h2>
                </div>
                <Link href="/homepage#grid" className="text-sm font-semibold text-primary hover:underline">
                    Xem tất cả
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.slice(0, 4).map((item) => (
                    <Link
                        key={item.id}
                        href={`/product/${item.id}`}
                        className="group rounded-2xl border border-border bg-card p-3 shadow-sm hover:-translate-y-1 hover:shadow-lg transition"
                    >
                        <div className="aspect-square overflow-hidden rounded-xl bg-muted">
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                width={300}
                                height={300}
                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                        </div>

                        <p className="font-semibold mt-3 text-foreground line-clamp-2">{item.name}</p>
                        <p className="text-base font-bold text-foreground mt-1">
                            {item.price.toLocaleString("vi-VN")}đ
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
