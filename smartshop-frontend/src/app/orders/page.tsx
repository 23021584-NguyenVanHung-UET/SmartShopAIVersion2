"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/features/orders/services/orderService";
import { Order } from "@/features/orders/type";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/shared/Footer";

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getOrders()
            .then(setOrders)
            .catch(() => setError("Không lấy được danh sách đơn hàng. Vui lòng đăng nhập."))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="pt-20 max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-blue-600 mb-4">Đơn hàng của bạn</h1>

                <div className="bg-white rounded-xl shadow p-4">
                    {loading && <p>Đang tải...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!loading && !error && orders.length === 0 && (
                        <p className="text-gray-600">Bạn chưa có đơn hàng nào.</p>
                    )}

                    {!loading && !error && orders.length > 0 && (
                        <div className="space-y-4">
                            {orders.map(order => (
                                <div key={order.id} className="border rounded-lg p-3">
                                    <div className="flex justify-between items-center mb-2">
                                        <div>
                                            <p className="text-sm text-gray-500">Mã đơn #{order.id}</p>
                                            <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                                        </div>
                                        <span className="text-sm font-semibold text-blue-600">{order.status}</span>
                                    </div>
                                    <div className="space-y-1 text-sm text-gray-700">
                                        {order.items.map(it => (
                                            <div key={it.productId} className="flex justify-between">
                                                <span>{it.productName} x{it.quantity}</span>
                                                <span>{it.unitPrice.toLocaleString()}đ</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-3 font-semibold">
                                        <span>Tổng</span>
                                        <span>{order.totalAmount.toLocaleString()}đ</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
