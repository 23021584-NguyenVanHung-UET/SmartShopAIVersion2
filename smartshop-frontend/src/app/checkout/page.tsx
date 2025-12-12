"use client";

import { useCart } from "@/features/cart/hooks/useCart";
import { useEffect, useState } from "react";
import Image from "next/image";
import { createOrder, requestVnPayPayment } from "@/features/orders/services/orderService";
import { useRouter } from "next/navigation";
import { Order } from "@/features/orders/type";
import { getProfile } from "@/features/profile/services/profileService";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/shared/Footer";

export default function CheckoutPage() {
    const { cart, total, clearCart } = useCart();
    const router = useRouter();

    const [shippingMethod, setShippingMethod] = useState("standard");
    const [paymentMethod, setPaymentMethod] = useState<"COD" | "VNPAY">("COD");
    const [placing, setPlacing] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [prefillLoaded, setPrefillLoaded] = useState(false);
    const [shipping, setShipping] = useState({
        name: "",
        phone: "",
        address: "",
        ward: "",
        district: "",
        city: "",
        note: "",
    });

    const shippingFee = shippingMethod === "express" ? 35000 : 20000;
    const finalTotal = total + shippingFee;
    const shippingMissing =
        !shipping.name.trim() ||
        !shipping.phone.trim() ||
        !shipping.address.trim() ||
        !shipping.ward.trim() ||
        !shipping.district.trim() ||
        !shipping.city.trim();
    const canSubmit = cart.length > 0 && !shippingMissing && !placing && isAuthenticated;

    useEffect(() => {
        const stored = localStorage.getItem("checkoutShipping");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setShipping((prev) => ({ ...prev, ...parsed }));
            } catch {
                // ignore corrupted data
            }
        }
        setPrefillLoaded(true);

        getProfile()
            .then((p) => {
                setIsAuthenticated(true);
                setShipping((prev) => ({
                    ...prev,
                    name: p.name || prev.name,
                    phone: p.phone || prev.phone,
                    address: p.address || prev.address,
                    ward: p.ward || prev.ward,
                    district: p.district || prev.district,
                    city: p.city || prev.city,
                }));
            })
            .catch(() => {
                setIsAuthenticated(false);
                setMessage("Vui lòng đăng nhập để tiếp tục thanh toán.");
            });
    }, []);

    useEffect(() => {
        if (!prefillLoaded) return;
        try {
            localStorage.setItem("checkoutShipping", JSON.stringify(shipping));
        } catch {
            // ignore storage error
        }
    }, [shipping, prefillLoaded]);

    const handlePlaceOrder = async () => {
        if (!isAuthenticated) {
            setMessage("Vui lòng đăng nhập để tiếp tục thanh toán.");
            router.push("/auth/login");
            return;
        }

        if (cart.length === 0) {
            setMessage("Giỏ hàng trống.");
            return;
        }

        if (!shipping.name || !shipping.phone || !shipping.address || !shipping.ward || !shipping.district || !shipping.city) {
            setMessage("Vui lòng nhập đầy đủ thông tin giao hàng.");
            return;
        }

        setPlacing(true);
        setMessage(null);
        setPlacedOrder(null);

        try {
            const order = await createOrder({
                items: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                })),
                paymentMethod,
                shippingName: shipping.name,
                shippingPhone: shipping.phone,
                shippingAddress: shipping.address,
                shippingWard: shipping.ward,
                shippingDistrict: shipping.district,
                shippingCity: shipping.city,
                note: shipping.note,
            });
            clearCart();
            try {
                localStorage.setItem("lastOrder", JSON.stringify(order));
            } catch {
                // ignore storage error
            }
            if (order.paymentMethod === "VNPAY") {
                const payment = await requestVnPayPayment(order.id);
                window.location.href = payment.paymentUrl;
                return;
            }
            router.push(`/orders/${order.id}`);
        } catch (err: any) {
            const msg = err?.response?.data?.message || "Đặt hàng thất bại. Vui lòng đăng nhập và thử lại.";
            setMessage(msg);
        } finally {
            setPlacing(false);
        }
    };

    return (
        <div className="bg-background min-h-screen">
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 md:px-6 pt-[calc(var(--header-height)+12px)] lg:pt-[calc(var(--header-height)+16px)] pb-16">
                <div className="flex flex-col gap-2 mb-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Thanh toán</p>
                    <h1 className="text-3xl font-semibold text-foreground">Hoàn tất đơn hàng</h1>
                    <p className="text-sm text-muted-foreground">Kiểm tra thông tin giao hàng và phương thức thanh toán.</p>
                    {!isAuthenticated && (
                        <div className="mt-2 inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2 text-sm text-foreground">
                            <span>⚠️</span>
                            <span>Bạn cần đăng nhập trước khi đặt hàng.</span>
                            <button
                                className="rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background hover:bg-foreground/90"
                                onClick={() => router.push("/auth/login")}
                            >
                                Đăng nhập
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr] items-start">
                    <div className="space-y-6">
                        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                            <h2 className="text-lg font-semibold text-foreground mb-4">Thông tin nhận hàng</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { key: "name", placeholder: "Họ và tên" },
                                    { key: "phone", placeholder: "Số điện thoại" },
                                    { key: "address", placeholder: "Địa chỉ (số nhà, tên đường)", span: true },
                                    { key: "ward", placeholder: "Phường/Xã" },
                                    { key: "district", placeholder: "Quận/Huyện" },
                                    { key: "city", placeholder: "Tỉnh/Thành phố" },
                                ].map((field) => (
                                    <input
                                        key={field.key}
                                        type="text"
                                        placeholder={field.placeholder}
                                        className={`border border-border rounded-lg bg-background p-3 text-sm ${field.span ? "md:col-span-2" : ""}`}
                                        value={(shipping as any)[field.key]}
                                        onChange={(e) => setShipping({ ...shipping, [field.key]: e.target.value })}
                                        required
                                    />
                                ))}
                                <textarea
                                    placeholder="Ghi chú giao hàng (tuỳ chọn)"
                                    className="border border-border rounded-lg bg-background p-3 text-sm md:col-span-2"
                                    value={shipping.note}
                                    onChange={(e) => setShipping({ ...shipping, note: e.target.value })}
                                />
                            </div>
                        </section>

                        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                            <h2 className="text-lg font-semibold text-foreground mb-4">Phương thức vận chuyển</h2>
                            <div className="space-y-3">
                                {[
                                    { key: "standard", title: "Giao hàng tiêu chuẩn", desc: "Dự kiến 3–5 ngày", fee: 20000 },
                                    { key: "express", title: "Giao hàng nhanh", desc: "Dự kiến 1–2 ngày", fee: 35000 },
                                ].map((opt) => (
                                    <label
                                        key={opt.key}
                                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer ${
                                            shippingMethod === opt.key ? "border-foreground" : "border-border"
                                        }`}
                                    >
                                        <div>
                                            <p className="font-semibold text-foreground">{opt.title}</p>
                                            <p className="text-sm text-muted-foreground">{opt.desc}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <p className="font-semibold text-foreground">{opt.fee.toLocaleString("vi-VN")}đ</p>
                                            <input
                                                type="radio"
                                                name="shipping"
                                                checked={shippingMethod === opt.key}
                                                onChange={() => setShippingMethod(opt.key)}
                                            />
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                            <h2 className="text-lg font-semibold text-foreground mb-4">Phương thức thanh toán</h2>
                            <div className="space-y-3">
                                {[
                                    { key: "COD", label: "Thanh toán khi nhận hàng (COD)" },
                                    { key: "VNPAY", label: "Thanh toán qua ngân hàng (VNPAY)" },
                                ].map((opt) => (
                                    <label
                                        key={opt.key}
                                        className={`flex justify-between p-3 rounded-lg border cursor-pointer ${
                                            paymentMethod === opt.key ? "border-foreground" : "border-border"
                                        }`}
                                    >
                                        <span className="text-foreground">{opt.label}</span>
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === opt.key}
                                            onChange={() => setPaymentMethod(opt.key as "COD" | "VNPAY")}
                                        />
                                    </label>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-6">
                        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                            <h2 className="text-lg font-semibold text-foreground mb-4">Sản phẩm</h2>
                            {cart.length === 0 ? (
                                <p className="text-muted-foreground text-sm">Không có sản phẩm nào.</p>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center border-b border-border/70 pb-3">
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    width={64}
                                                    height={64}
                                                    className="rounded-lg object-cover"
                                                />
                                                <div>
                                                    <p className="font-medium text-foreground">{item.name}</p>
                                                    <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                                                </div>
                                            </div>

                                            <p className="font-semibold text-foreground">
                                                {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-3">
                            <h2 className="text-lg font-semibold text-foreground">Tổng thanh toán</h2>
                            <div className="space-y-2 text-foreground text-sm">
                                <div className="flex justify-between">
                                    <span>Tạm tính:</span>
                                    <span>{total.toLocaleString("vi-VN")}đ</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Phí vận chuyển:</span>
                                    <span>{shippingFee.toLocaleString("vi-VN")}đ</span>
                                </div>

                                <div className="flex justify-between font-semibold text-lg text-foreground pt-2 border-t border-border">
                                    <span>Tổng cộng:</span>
                                    <span>{finalTotal.toLocaleString("vi-VN")}đ</span>
                                </div>
                            </div>

                            {message && (
                                <div className="text-center text-sm mt-2 text-destructive">
                                    <p className="font-semibold">{message}</p>
                                </div>
                            )}

                            {placedOrder && (
                                <div className="mt-2 bg-muted border border-border rounded-lg p-3 text-sm text-foreground">
                                    <div className="flex justify-between mb-2">
                                        <span>Mã đơn:</span>
                                        <span className="font-semibold">#{placedOrder.id}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Trạng thái:</span>
                                        <span className="font-semibold">{placedOrder.status}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Tổng tiền:</span>
                                        <span className="font-semibold">{placedOrder.totalAmount.toLocaleString("vi-VN")}đ</span>
                                    </div>
                                    <div className="mt-2">
                                        <p className="font-semibold mb-1">Sản phẩm:</p>
                                        <div className="space-y-1">
                                            {placedOrder.items.map(it => (
                                                <div key={it.productId} className="flex justify-between">
                                                    <span>{it.productName} x{it.quantity}</span>
                                                    <span>{it.unitPrice.toLocaleString("vi-VN")}đ</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-3 flex gap-3 justify-center">
                                        <button
                                            onClick={() => router.push("/orders")}
                                            className="text-primary underline"
                                        >
                                            Xem lịch sử đơn hàng
                                        </button>
                                        <button
                                            onClick={() => router.push("/homepage")}
                                            className="text-primary underline"
                                        >
                                            Tiếp tục mua sắm
                                        </button>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handlePlaceOrder}
                                disabled={!canSubmit}
                                className="w-full rounded-md bg-foreground text-background py-3 text-sm font-semibold hover:bg-foreground/90 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {placing ? "Đang xử lý..." : "Đặt hàng"}
                            </button>
                        </section>
                    </aside>
                </div>
            </main>
            <Footer />
        </div>
    );
}
