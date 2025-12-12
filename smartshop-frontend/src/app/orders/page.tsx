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

    const paymentLabel = (method: string) => {
        if (method === "VNPAY") return "VNPAY";
        if (method === "BANK_TRANSFER") return "Chuyển khoản";
        return "COD";
    };

    const statusPill = (status: string) => {
        const map: Record<string, string> = {
            PENDING: "bg-amber-100 text-amber-800",
            PROCESSING: "bg-blue-100 text-blue-800",
            SHIPPED: "bg-sky-100 text-sky-800",
            DELIVERED: "bg-emerald-100 text-emerald-800",
            CANCELLED: "bg-rose-100 text-rose-800",
        };
        return map[status] || "bg-muted text-foreground";
    };

    return (
        <div className="bg-background min-h-screen">
            <Navbar />
            <main className="max-w-6xl mx-auto px-6 pt-[calc(var(--header-height)+12px)] lg:pt-[calc(var(--header-height)+16px)] pb-16">
                <div className="flex flex-col gap-2 mb-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Đơn hàng</p>
                    <h1 className="text-3xl font-semibold text-foreground">Lịch sử mua hàng</h1>
                    <p className="text-sm text-muted-foreground">Theo dõi trạng thái và thanh toán VNPAY nếu còn chờ.</p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                    {loading && <p className="text-muted-foreground text-sm">Đang tải...</p>}
                    {error && <p className="text-destructive text-sm">{error}</p>}
                    {!loading && !error && orders.length === 0 && (
                        <p className="text-muted-foreground text-sm">Bạn chưa có đơn hàng nào.</p>
                    )}

                    {!loading && !error && orders.length > 0 && (
                        <div className="space-y-4">
                            {orders.map(order => (
                                <div key={order.id} className="rounded-xl border border-border/70 bg-background p-4">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Mã đơn #{order.id}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(order.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusPill(order.status)}`}>
                                                {order.status}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {paymentLabel(order.paymentMethod)} • {order.paymentStatus}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-3 space-y-1 text-sm text-foreground">
                                        {order.items.map(it => (
                                            <div key={it.productId} className="flex justify-between">
                                                <span>{it.productName} x{it.quantity}</span>
                                                <span>{it.unitPrice.toLocaleString("vi-VN")}đ</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between mt-3 font-semibold text-foreground">
                                        <span>Tổng</span>
                                        <span>{order.totalAmount.toLocaleString("vi-VN")}đ</span>
                                    </div>

                                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
                                        {order.paymentMethod === "VNPAY" && order.paymentStatus === "PENDING" && (
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
                                                className="inline-flex justify-center rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-foreground/90 disabled:opacity-60"
                                                disabled={paying === order.id}
                                            >
                                                {paying === order.id ? "Đang mở VNPAY..." : "Thanh toán ngay"}
                                            </button>
                                        )}
                                        <button
                                            onClick={() => router.push(`/orders/${order.id}`)}
                                            className="inline-flex justify-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:border-foreground"
                                        >
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
