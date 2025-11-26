"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/features/products/type";
import { getProducts } from "@/features/products/services/productService";

export default function TrendingProducts() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    return (
        <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">🔥 Sản phẩm nổi bật</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.slice(0, 4).map((item) => (
                    <Link
                        key={item.id}
                        href={`/product/${item.id}`}
                        className="border p-3 rounded hover:shadow"
                    >
                        <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={300}
                            height={300}
                            className="object-cover rounded"
                        />

                        <p className="font-semibold mt-2">{item.name}</p>
                        <p className="text-blue-600 font-bold">
                            {item.price.toLocaleString()}đ
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
