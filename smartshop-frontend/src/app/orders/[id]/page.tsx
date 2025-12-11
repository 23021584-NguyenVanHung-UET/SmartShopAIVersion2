"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/shared/Footer";
import { Order } from "@/features/orders/type";
import { getOrderById } from "@/features/orders/services/orderService";
import { useRouter, useParams } from "next/navigation";

export default function OrderDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const orderId = Number(id);
        if (!orderId) {
            setError("Hoá đơn không hợp lệ.");
            return;
        }
        setLoading(true);
        getOrderById(orderId)
            .then(o => setOrder(o))
            .catch(() => setError("Không lấy được hoá đơn. Vui lòng đăng nhập và thử lại."))
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="pt-20 max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-blue-600 mb-4">Hoá đơn của bạn</h1>

                <div className="bg-white rounded-xl shadow p-5">
                    {loading && <p>Đang tải hoá đơn...</p>}
                    {error && <p className="text-red-500 mb-3">{error}</p>}

                    {!loading && !order ? (
                        <div className="text-gray-600">
                            <p>Không tìm thấy hoá đơn.</p>
                            <button
                                onClick={() => router.push("/homepage")}
                                className="mt-3 text-blue-600 underline"
                            >
                                Quay lại mua sắm
                            </button>
                        </div>
                    ) : null}

                    {order && (
                        <div className="space-y-3 text-gray-800">
                            <div className="flex justify-between">
                                <span>Mã đơn:</span>
                                <span className="font-semibold">#{order.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Trạng thái:</span>
                                <span className="font-semibold">{order.status}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tổng tiền:</span>
                                <span className="font-semibold">{order.totalAmount.toLocaleString()}đ</span>
                            </div>
                            {(order.shippingName || order.shippingAddress) && (
                                <div className="pt-2 border-t">
                                    <p className="font-semibold mb-1">Giao tới:</p>
                                    <p>{order.shippingName}</p>
                                    <p>{order.shippingPhone}</p>
                                    <p>
                                        {order.shippingAddress}
                                        {order.shippingWard ? `, ${order.shippingWard}` : ""}
                                        {order.shippingDistrict ? `, ${order.shippingDistrict}` : ""}
                                        {order.shippingCity ? `, ${order.shippingCity}` : ""}
                                    </p>
                                    {order.shippingNote && <p className="text-sm text-gray-600">Ghi chú: {order.shippingNote}</p>}
                                </div>
                            )}
                            <div>
                                <p className="font-semibold mb-1">Sản phẩm:</p>
                                <div className="space-y-1 text-sm">
                                    {order.items.map(it => (
                                        <div key={it.productId} className="flex justify-between">
                                            <span>{it.productName} x{it.quantity}</span>
                                            <span>{it.unitPrice.toLocaleString()}đ</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-4 pt-2">
                                <button
                                    onClick={() => router.push("/orders")}
                                    className="text-blue-600 underline"
                                >
                                    Xem lịch sử đơn hàng
                                </button>
                                <button
                                    onClick={() => router.push("/homepage")}
                                    className="text-blue-600 underline"
                                >
                                    Tiếp tục mua sắm
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
