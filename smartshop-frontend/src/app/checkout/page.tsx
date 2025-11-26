"use client";

import { useCart } from "@/features/cart/hooks/useCart";
import { useState } from "react";
import Image from "next/image";

export default function CheckoutPage() {
    const { cart, total } = useCart();

    const [shippingMethod, setShippingMethod] = useState("standard");
    const [paymentMethod, setPaymentMethod] = useState("cod");

    const shippingFee = shippingMethod === "express" ? 35000 : 20000;
    const finalTotal = total + shippingFee;

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

                    <button
                        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-lg"
                    >
                        Đặt hàng
                    </button>
                </div>
            </div>
        </div>
    );
}
