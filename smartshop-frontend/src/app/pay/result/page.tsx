"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PayResultPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [message, setMessage] = useState("Đang kiểm tra kết quả thanh toán...");

    const success = searchParams.get("success") === "true";
    const orderId = searchParams.get("orderId");
    const responseCode = searchParams.get("responseCode");
    const transactionStatus = searchParams.get("transactionStatus");

    useEffect(() => {
        if (success) {
            setMessage("Thanh toán thành công.");
        } else {
            setMessage("Thanh toán chưa thành công.");
        }
    }, [success]);

    const detailLink = useMemo(() => {
        if (orderId) {
            return `/orders/${orderId}`;
        }
        return "/orders";
    }, [orderId]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white shadow rounded-xl p-6 max-w-md text-center space-y-3">
                <p className="text-lg font-semibold text-blue-600">SmartShop</p>
                <p className="text-gray-800">{message}</p>
                <div className="text-sm text-gray-600 space-y-1">
                    {responseCode && <p>Mã phản hồi: {responseCode}</p>}
                    {transactionStatus && <p>Trạng thái giao dịch: {transactionStatus}</p>}
                    {orderId && <p>Mã đơn: #{orderId}</p>}
                </div>
                <div className="flex gap-3 justify-center pt-2">
                    <button
                        onClick={() => router.push(detailLink)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Xem đơn
                    </button>
                    <button
                        onClick={() => router.push("/homepage")}
                        className="px-4 py-2 bg-gray-200 rounded-lg"
                    >
                        Tiếp tục mua sắm
                    </button>
                </div>
            </div>
        </div>
    );
}
