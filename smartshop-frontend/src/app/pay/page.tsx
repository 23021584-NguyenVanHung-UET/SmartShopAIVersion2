"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmBankTransfer } from "@/features/orders/services/orderService";

export default function PayRedirectPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [message, setMessage] = useState("Đang xử lý thanh toán...");

    useEffect(() => {
        const orderId = Number(searchParams.get("orderId"));
        const code = searchParams.get("code") || "";
        if (!orderId || !code) {
            setMessage("Thiếu thông tin đơn hàng.");
            return;
        }

        confirmBankTransfer(orderId, code)
            .then(() => {
                setMessage("Đã xác nhận thanh toán. Đang chuyển tới hoá đơn...");
                setTimeout(() => router.replace(`/orders/${orderId}`), 800);
            })
            .catch(() => {
                setMessage("Xác nhận thất bại. Vui lòng thử lại hoặc liên hệ hỗ trợ.");
            });
    }, [router, searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white shadow rounded-xl p-6 max-w-md text-center">
                <p className="text-lg font-semibold text-blue-600 mb-2">SmartShop Demo</p>
                <p className="text-gray-800">{message}</p>
            </div>
        </div>
    );
}
