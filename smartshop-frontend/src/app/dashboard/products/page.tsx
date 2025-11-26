"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getProducts } from "@/features/products/services/productService";
import { Product } from "@/features/products/type";
import { useCart } from "@/features/cart/hooks/useCart";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        getProducts().then((data) => setProducts(data));
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6 mt-10">
            <h1 className="text-2xl font-bold text-blue-600 mb-6">Sản phẩm</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition"
                    >
                        <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={300}
                            height={300}
                            className="w-full h-40 object-cover rounded-lg"
                        />

                        <h2 className="text-md font-semibold mt-3">{item.name}</h2>
                        <p className="text-blue-600 font-bold mt-1">
                            {item.price.toLocaleString()}đ
                        </p>

                        <button
                            onClick={() => addToCart(item)}
                            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
