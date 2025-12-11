"use client";

import { useCart } from "@/features/cart/hooks/useCart";
import { useState } from "react";
import Image from "next/image";
import { createOrder } from "@/features/orders/services/orderService";
import { useRouter } from "next/navigation";
import { Order } from "@/features/orders/type";

export default function CheckoutPage() {
    const { cart, total, clearCart } = useCart();
    const router = useRouter();

    const [shippingMethod, setShippingMethod] = useState("standard");
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [placing, setPlacing] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

    const shippingFee = shippingMethod === "express" ? 35000 : 20000;
    const finalTotal = total + shippingFee;

    const handlePlaceOrder = async () => {
        if (cart.length === 0) {
            setMessage("Giỏ hàng trống.");
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
            });
            clearCart();
            try {
                localStorage.setItem("lastOrder", JSON.stringify(order));
            } catch {
                // ignore storage error
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
        <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-blue-600 mb-6">Thanh toán</h1>

            <div className="space-y-6">
                {/* ========= Thông tin giao hàng ========= */}
                <div className="bg-white p-5 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Thông tin nhận hàng</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Họ và tên"
                            className="border rounded-lg p-3"
                        />
                        <input
                            type="text"
                            placeholder="Số điện thoại"
                            className="border rounded-lg p-3"
                        />
                        <input
                            type="text"
                            placeholder="Địa chỉ cụ thể"
                            className="border rounded-lg p-3 col-span-1 md:col-span-2"
                        />
                    </div>
                </div>

                {/* ========= Phương thức giao hàng ========= */}
                <div className="bg-white p-5 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Phương thức vận chuyển</h2>

                    <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer">
                            <div>
                                <p className="font-semibold">Giao hàng tiêu chuẩn</p>
                                <p className="text-sm text-gray-500">Dự kiến 3–5 ngày</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="font-semibold text-gray-700">20.000đ</p>
                                <input
                                    type="radio"
                                    name="shipping"
                                    checked={shippingMethod === "standard"}
                                    onChange={() => setShippingMethod("standard")}
                                />
                            </div>
                        </label>

                        <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer">
                            <div>
                                <p className="font-semibold">Giao hàng nhanh</p>
                                <p className="text-sm text-gray-500">Dự kiến 1–2 ngày</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="font-semibold text-gray-700">35.000đ</p>
                                <input
                                    type="radio"
                                    name="shipping"
                                    checked={shippingMethod === "express"}
                                    onChange={() => setShippingMethod("express")}
                                />
                            </div>
                        </label>
                    </div>
                </div>

                {/* ========= Phương thức thanh toán ========= */}
                <div className="bg-white p-5 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Phương thức thanh toán</h2>

                    <div className="space-y-3">
                        <label className="flex justify-between p-3 border rounded-lg cursor-pointer">
                            <span>Thanh toán khi nhận hàng (COD)</span>
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "cod"}
                                onChange={() => setPaymentMethod("cod")}
                            />
                        </label>

                        <label className="flex justify-between p-3 border rounded-lg cursor-pointer">
                            <span>Thanh toán qua ví Momo</span>
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "momo"}
                                onChange={() => setPaymentMethod("momo")}
                            />
                        </label>

                        <label className="flex justify-between p-3 border rounded-lg cursor-pointer">
                            <span>Chuyển khoản ngân hàng</span>
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "bank"}
                                onChange={() => setPaymentMethod("bank")}
                            />
                        </label>
                    </div>
                </div>

                {/* ========= Danh sách sản phẩm ========= */}
                <div className="bg-white p-5 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Sản phẩm</h2>

                    {cart.length === 0 ? (
                        <p className="text-gray-600">Không có sản phẩm nào.</p>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center border-b pb-3">
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            width={64}
                                            height={64}
                                            className="rounded-lg object-cover"
                                        />
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">x{item.quantity}</p>
                                        </div>
                                    </div>

                                    <p className="font-semibold text-gray-700">
                                        {(item.price * item.quantity).toLocaleString()}đ
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ========= Tổng thanh toán ========= */}
                <div className="bg-white p-5 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Tổng thanh toán</h2>

                    <div className="space-y-2 text-gray-700">
                        <div className="flex justify-between">
                            <span>Tạm tính:</span>
                            <span>{total.toLocaleString()}đ</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Phí vận chuyển:</span>
                            <span>{shippingFee.toLocaleString()}đ</span>
                        </div>

                        <div className="flex justify-between font-bold text-lg text-blue-600 pt-2 border-t">
                            <span>Tổng cộng:</span>
                            <span>{finalTotal.toLocaleString()}đ</span>
                        </div>
                    </div>

                    {message && (
                        <div className="text-center text-sm mt-3 text-gray-700">
                            <p className="font-semibold">{message}</p>
                        </div>
                    )}

                    {placedOrder && (
                        <div className="mt-4 bg-gray-50 border rounded-lg p-3 text-sm text-gray-800">
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
                                <span className="font-semibold">{placedOrder.totalAmount.toLocaleString()}đ</span>
                            </div>
                            <div className="mt-2">
                                <p className="font-semibold mb-1">Sản phẩm:</p>
                                <div className="space-y-1">
                                    {placedOrder.items.map(it => (
                                        <div key={it.productId} className="flex justify-between">
                                            <span>{it.productName} x{it.quantity}</span>
                                            <span>{it.unitPrice.toLocaleString()}đ</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-3 flex gap-3 justify-center">
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

                    <button
                        onClick={handlePlaceOrder}
                        disabled={placing}
                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-lg disabled:opacity-60"
                    >
                        {placing ? "Đang xử lý..." : "Đặt hàng"}
                    </button>
                </div>
            </div>
        </div>
    );
}
