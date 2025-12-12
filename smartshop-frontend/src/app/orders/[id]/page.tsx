"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/shared/Footer";
import { Order } from "@/features/orders/type";
import { getOrderById, requestVnPayPayment } from "@/features/orders/services/orderService";
import { useRouter, useParams } from "next/navigation";
import { ShieldCheck, Truck } from "lucide-react";

export default function OrderDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [paying, setPaying] = useState(false);
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
        <div className="bg-background min-h-screen">
            <Navbar />
            <main className="max-w-5xl mx-auto px-6 pt-[calc(var(--header-height)+12px)] lg:pt-[calc(var(--header-height)+16px)] pb-16">
                <div className="flex flex-col gap-2 mb-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Đơn hàng</p>
                    <h1 className="text-3xl font-semibold text-foreground">Chi tiết hoá đơn</h1>
                    <p className="text-sm text-muted-foreground">Xem thông tin giao hàng và thanh toán.</p>
                </div>

                <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    {loading && <p className="text-sm text-muted-foreground">Đang tải hoá đơn...</p>}
                    {error && <p className="text-sm text-destructive mb-3">{error}</p>}

                    {!loading && !order ? (
                        <div className="text-muted-foreground text-sm">
                            <p>Không tìm thấy hoá đơn.</p>
                            <button
                                onClick={() => router.push("/homepage")}
                                className="mt-3 text-primary underline"
                            >
                                Quay lại mua sắm
                            </button>
                        </div>
                    ) : null}

                    {order && (
                        <div className="space-y-4 text-sm text-foreground">
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="rounded-xl border border-border/70 bg-muted/50 p-3 space-y-1">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Mã đơn</p>
                                    <p className="text-lg font-semibold">#{order.id}</p>
                                    <p className="text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="rounded-xl border border-border/70 bg-muted/50 p-3 space-y-1">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Thanh toán</p>
                                    <p className="font-semibold">
                                        {order.paymentMethod === "VNPAY"
                                            ? "VNPAY"
                                            : order.paymentMethod === "BANK_TRANSFER"
                                                ? "Chuyển khoản"
                                                : "COD"} ({order.paymentStatus})
                                    </p>
                                    <p className="text-muted-foreground">Trạng thái: {order.status}</p>
                                </div>
                            </div>

                            <div className="rounded-xl border border-border/70 bg-background p-3 space-y-1">
                                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tổng tiền</p>
                                <p className="text-xl font-bold text-foreground">{order.totalAmount.toLocaleString("vi-VN")}đ</p>
                            </div>

                            {(order.shippingName || order.shippingAddress) && (
                                <div className="rounded-xl border border-border/70 bg-background p-4 space-y-1">
                                    <div className="flex items-center gap-2 text-foreground">
                                        <Truck size={16} />
                                        <p className="text-sm font-semibold">Giao tới</p>
                                    </div>
                                    <p className="font-semibold">{order.shippingName}</p>
                                    <p>{order.shippingPhone}</p>
                                    <p className="text-muted-foreground">
                                        {order.shippingAddress}
                                        {order.shippingWard ? `, ${order.shippingWard}` : ""}
                                        {order.shippingDistrict ? `, ${order.shippingDistrict}` : ""}
                                        {order.shippingCity ? `, ${order.shippingCity}` : ""}
                                    </p>
                                    {order.shippingNote && <p className="text-muted-foreground text-xs">Ghi chú: {order.shippingNote}</p>}
                                </div>
                            )}

                            <div className="rounded-xl border border-border/70 bg-background p-4 space-y-2">
                                <div className="flex items-center gap-2 text-foreground">
                                    <ShieldCheck size={16} />
                                    <p className="text-sm font-semibold">Sản phẩm</p>
                                </div>
                                <div className="space-y-1">
                                    {order.items.map(it => (
                                        <div key={it.productId} className="flex justify-between">
                                            <span>{it.productName} x{it.quantity}</span>
                                            <span>{it.unitPrice.toLocaleString("vi-VN")}đ</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 flex-wrap pt-2">
                                {order.paymentMethod === "VNPAY" && order.paymentStatus === "PENDING" && (
                                    <button
                                        onClick={async () => {
                                            setPaying(true);
                                            try {
                                                const payment = await requestVnPayPayment(order.id);
                                                window.location.href = payment.paymentUrl;
                                            } catch {
                                                setError("Không tạo được liên kết thanh toán. Đăng nhập và thử lại.");
                                            } finally {
                                                setPaying(false);
                                            }
                                        }}
                                        className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-foreground/90 disabled:opacity-60"
                                        disabled={paying}
                                    >
                                        {paying ? "Đang mở VNPAY..." : "Thanh toán ngay"}
                                    </button>
                                )}
                                <button
                                    onClick={() => router.push("/orders")}
                                    className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:border-foreground"
                                >
                                    Xem lịch sử đơn
                                </button>
                                <button
                                    onClick={() => router.push("/homepage")}
                                    className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:border-foreground"
                                >
                                    Tiếp tục mua sắm
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}
