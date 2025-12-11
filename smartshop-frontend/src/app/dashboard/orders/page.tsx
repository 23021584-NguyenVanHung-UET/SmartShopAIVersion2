"use client";

import { Fragment, useEffect, useState } from "react";
import { getOrders } from "@/features/orders/services/orderService";
import { Order } from "@/features/orders/type";

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState<Set<number>>(new Set());

    const statusColor = (status: string) => {
        switch (status) {
            case "PAID":
            case "COMPLETED":
                return "bg-green-100 text-green-600";
            case "CANCELLED":
                return "bg-red-100 text-red-600";
            default:
                return "bg-yellow-100 text-yellow-600";
        }
    };

    useEffect(() => {
        setLoading(true);
        getOrders()
            .then(setOrders)
            .catch(() => setOrders([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Đơn hàng của bạn</h1>

            <div className="bg-white p-6 rounded-xl border shadow-sm">
                {loading ? (
                    <p className="text-gray-600">Đang tải...</p>
                ) : orders.length === 0 ? (
                    <p className="text-gray-600">Chưa có đơn hàng.</p>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b text-gray-600">
                                <th className="pb-3">ID Đơn</th>
                                <th className="pb-3">Tổng tiền</th>
                                <th className="pb-3">Trạng thái</th>
                                <th className="pb-3">Ngày tạo</th>
                                <th className="pb-3">Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o) => (
                                <Fragment key={o.id}>
                                    <tr className="border-b hover:bg-gray-50 transition">
                                        <td className="py-3">{o.id}</td>
                                        <td>{o.totalAmount.toLocaleString()} đ</td>
                                        <td>
                                            <span className={`px-3 py-1 rounded-full text-sm ${statusColor(o.status)}`}>
                                                {o.status}
                                            </span>
                                        </td>
                                        <td>{new Date(o.createdAt).toLocaleString()}</td>
                                        <td>
                                            <button
                                                className="text-blue-600 underline"
                                                onClick={() =>
                                                    setExpanded((prev) => {
                                                        const next = new Set(prev);
                                                        if (next.has(o.id)) next.delete(o.id);
                                                        else next.add(o.id);
                                                        return next;
                                                    })
                                                }
                                            >
                                                {expanded.has(o.id) ? "Ẩn" : "Xem"}
                                            </button>
                                        </td>
                                    </tr>
                                    {expanded.has(o.id) && (
                                        <tr>
                                            <td colSpan={5} className="bg-gray-50 p-3">
                                                <div className="flex flex-col gap-2">
                                                    {o.items.map((it) => (
                                                        <div key={it.productId} className="flex justify-between text-sm">
                                                            <span>{it.productName} x{it.quantity}</span>
                                                            <span>{it.unitPrice.toLocaleString()} đ</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
