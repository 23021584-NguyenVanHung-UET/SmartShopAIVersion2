"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getProducts } from "@/features/products/services/productService";
import { Product } from "@/features/products/type";
import { useCart } from "@/features/cart/hooks/useCart";

export default function ProductGrid() {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        getProducts().then(res => setProducts(res));
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 mt-10">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Sản phẩm nổi bật</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {products.map((p) => (
                    <div key={p.id} className="bg-white shadow rounded-lg p-4 hover:shadow-md transition">
                        <Image
                            src={p.imageUrl}
                            width={200}
                            height={200}
                            alt={p.name}
                            className="rounded-lg object-cover w-full h-40"
                        />

                        <h3 className="font-medium mt-3 line-clamp-2">{p.name}</h3>

                        <p className="text-blue-600 font-bold mt-2">
                            {p.price.toLocaleString()}đ
                        </p>

                        <button
                            onClick={() => addToCart(p)}
                            className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Thêm vào giỏ
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
