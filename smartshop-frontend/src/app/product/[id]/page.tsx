"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/features/products/type";
import { getProductById, getProducts } from "@/features/products/services/productService";
import { useCart } from "@/features/cart/hooks/useCart";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/shared/Footer";

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
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <main className="max-w-6xl mx-auto p-6 pt-24">
                {loading ? (
                    <p className="p-6">Đang tải...</p>
                ) : error || !product ? (
                    <div className="p-6">
                        <p className="text-red-500 mb-4">{error || "Không tìm thấy sản phẩm"}</p>
                        <button
                            onClick={() => router.push("/homepage")}
                            className="text-blue-600 underline"
                        >
                            Quay lại trang chủ
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-4 rounded-xl shadow">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    width={600}
                                    height={600}
                                    className="object-cover rounded-lg w-full h-full"
                                    priority
                                />
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow">
                                <p className="text-sm text-gray-500 mb-2">{product.categoryName}</p>
                                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                                <p className="text-blue-600 text-2xl font-semibold mb-4">
                                    {product.price.toLocaleString()}đ
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                                    {product.description || "Sản phẩm đang được cập nhật mô tả."}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm mb-6">
                                    <div className="bg-gray-50 rounded-lg p-3 border">
                                        <p className="font-semibold">Vận chuyển</p>
                                        <p className="text-gray-600">Miễn phí đơn từ 500k</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3 border">
                                        <p className="font-semibold">Đổi trả</p>
                                        <p className="text-gray-600">Trong 7 ngày nếu lỗi</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3 border">
                                        <p className="font-semibold">Thanh toán</p>
                                        <p className="text-gray-600">VNPay / Momo / COD</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        addToCart(product);
                                        setAdded(true);
                                        setTimeout(() => setAdded(false), 900);
                                    }}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                                >
                                    {added ? "Đã thêm!" : "Thêm vào giỏ"}
                                </button>
                            </div>
                        </div>

                        {related.length > 0 && (
                            <div className="mt-12">
                                <h2 className="text-xl font-bold mb-4">Sản phẩm liên quan</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {related.map((item) => (
                                        <div
                                            key={item.id}
                                            className="bg-white p-3 rounded-lg shadow hover:shadow-md transition cursor-pointer"
                                            onClick={() => router.push(`/product/${item.id}`)}
                                        >
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                width={300}
                                                height={300}
                                                className="object-cover rounded w-full h-40"
                                            />
                                            <p className="font-semibold mt-2 line-clamp-2">{item.name}</p>
                                            <p className="text-blue-600 font-bold">
                                                {item.price.toLocaleString()}đ
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
