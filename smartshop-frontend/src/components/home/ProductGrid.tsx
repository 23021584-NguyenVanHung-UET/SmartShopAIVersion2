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
};

export default function ProductGrid({ selectedCategorySlug, selectedCategoryName }: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [addedId, setAddedId] = useState<number | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        setLoading(true);
        getProducts(
            selectedCategorySlug === "all" || !selectedCategorySlug
                ? {}
                : { category: selectedCategorySlug }
        )
            .then(res => setProducts(res))
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, [selectedCategorySlug]);

    return (
        <div className="max-w-7xl mx-auto px-6 mt-10">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-blue-600">Sản phẩm nổi bật</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {selectedCategorySlug === "all"
                            ? "Hiển thị tất cả danh mục"
                            : `Danh mục: ${selectedCategoryName ?? "Đang tải..."}`}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {loading ? (
                    <p className="col-span-full text-center text-gray-500">Đang tải...</p>
                ) : products.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">Không có sản phẩm.</p>
                ) : (
                    products.map((p) => (
                        <div key={p.id} className="bg-white shadow rounded-lg p-4 hover:shadow-md transition">
                            <Link href={`/product/${p.id}`}>
                                <Image
                                    src={p.imageUrl}
                                    width={200}
                                    height={200}
                                    alt={p.name}
                                    className="rounded-lg object-cover w-full h-40"
                                />
                            </Link>

                            <Link href={`/product/${p.id}`}>
                                <h3 className="font-medium mt-3 line-clamp-2 hover:text-blue-600">{p.name}</h3>
                            </Link>

                            <p className="text-blue-600 font-bold mt-2">
                                {p.price.toLocaleString()}đ
                            </p>

                            <button
                                onClick={() => {
                                    addToCart(p);
                                    setAddedId(p.id);
                                    setTimeout(() => setAddedId(null), 900);
                                }}
                                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
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
