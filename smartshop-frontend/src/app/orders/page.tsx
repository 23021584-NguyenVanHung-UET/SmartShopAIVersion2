"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/features/orders/services/orderService";
import { Order } from "@/features/orders/type";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/shared/Footer";
import { requestVnPayPayment } from "@/features/orders/services/orderService";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [paying, setPaying] = useState<number | null>(null);
    const router = useRouter();

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
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-blue-600">{order.status}</p>
                                            <p className="text-[12px] text-gray-500">
                                                {order.paymentMethod === "VNPAY"
                                                    ? "VNPAY"
                                                    : order.paymentMethod === "BANK_TRANSFER"
                                                        ? "Chuyển khoản"
                                                        : "COD"}
                                            </p>
                                            <p className="text-[12px] text-gray-500">Thanh toán: {order.paymentStatus}</p>
                                        </div>
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
                                    {order.paymentMethod === "VNPAY" && order.paymentStatus === "PENDING" && (
                                        <div className="pt-2">
                                            <button
                                                onClick={async () => {
                                                    setPaying(order.id);
                                                    try {
                                                        const payment = await requestVnPayPayment(order.id);
                                                        window.location.href = payment.paymentUrl;
                                                    } catch {
                                                        setError("Không tạo được liên kết thanh toán. Đăng nhập và thử lại.");
                                                    } finally {
                                                        setPaying(null);
                                                    }
                                                }}
                                                className="mt-2 w-full text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2 text-sm disabled:opacity-60"
                                                disabled={paying === order.id}
                                            >
                                                {paying === order.id ? "Đang mở VNPAY..." : "Thanh toán ngay"}
                                            </button>
                                        </div>
                                    )}
                                    {order.paymentMethod !== "VNPAY" && (
                                        <div className="pt-2">
                                            <button
                                                onClick={() => router.push(`/orders/${order.id}`)}
                                                className="w-full text-center text-blue-600 underline text-sm"
                                            >
                                                Xem chi tiết
                                            </button>
                                        </div>
                                    )}
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
