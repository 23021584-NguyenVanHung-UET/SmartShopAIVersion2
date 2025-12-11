"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/shared/Footer";
import { Order } from "@/features/orders/type";
import { confirmBankTransfer, getOrderById } from "@/features/orders/services/orderService";
import { useParams, useRouter } from "next/navigation";

export default function OrderPaymentPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const orderId = Number(id);
        if (!orderId) {
            setError("Mã đơn không hợp lệ.");
            return;
        }
        setLoading(true);
        getOrderById(orderId)
            .then((o) => {
                if (o.paymentMethod !== "BANK_TRANSFER") {
                    router.replace(`/orders/${orderId}`);
                    return;
                }
                setOrder(o);
            })
            .catch(() => setError("Không tải được thông tin thanh toán. Vui lòng đăng nhập."))
            .finally(() => setLoading(false));
    }, [id, router]);

    const [confirming, setConfirming] = useState(false);
    const [confirmError, setConfirmError] = useState<string | null>(null);

    const qrUrl = useMemo(() => {
        if (!order) return "";
        const origin = typeof window !== "undefined" ? window.location.origin : "https://demo.smartshop.local";
        const data = encodeURIComponent(`${origin}/pay?orderId=${order.id}&code=${order.paymentCode || "DEMO"}`);
        return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${data}`;
    }, [order]);

    const bankInfo = {
        accountName: "SMARTSHOP AI DEMO",
        accountNumber: "1234 5678 9999",
        bankName: "VCB - Vietcombank (Demo)",
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="pt-20 max-w-4xl mx-auto p-6">
                <div className="bg-white shadow rounded-xl p-6">
                    <h1 className="text-2xl font-bold text-blue-600 mb-4">Hướng dẫn chuyển khoản</h1>
                    {loading && <p>Đang tải...</p>}
                    {error && <p className="text-red-600">{error}</p>}

                    {order && (
                        <div className="space-y-6 text-gray-800">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <p className="font-semibold text-lg">Thông tin đơn hàng</p>
                                    <p>Mã đơn: <span className="font-semibold">#{order.id}</span></p>
                                    <p>Tổng tiền: <span className="font-semibold text-blue-600">{order.totalAmount.toLocaleString()}đ</span></p>
                                    <p>Trạng thái đơn: <span className="font-semibold">{order.status}</span></p>
                                    <p>Trạng thái thanh toán: <span className="font-semibold">{order.paymentStatus}</span></p>
                                    <p>Mã tham chiếu: <span className="font-semibold">{order.paymentCode}</span></p>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-semibold text-lg">Tài khoản nhận</p>
                                    <p>Ngân hàng: <span className="font-semibold">{bankInfo.bankName}</span></p>
                                    <p>Số tài khoản: <span className="font-semibold">{bankInfo.accountNumber}</span></p>
                                    <p>Chủ tài khoản: <span className="font-semibold">{bankInfo.accountName}</span></p>
                                    <p>Nội dung chuyển khoản: <span className="font-semibold">PAY {order.paymentCode}</span></p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 items-center">
                                <div className="bg-gray-100 border rounded-xl p-4 text-center">
                                    <p className="font-semibold mb-3">Quét mã để chuyển khoản (demo)</p>
                                    {qrUrl && (
                                        <img
                                            src={qrUrl}
                                            alt="QR chuyển khoản demo"
                                            className="mx-auto w-56 h-56 object-contain"
                                        />
                                    )}
                                    <p className="text-xs text-gray-500 mt-2">
                                        Mã QR dùng cho demo, dẫn tới đơn hàng đã được đánh dấu PAID.
                                    </p>
                                </div>
                                <div className="space-y-3 text-sm text-gray-700">
                                    <p className="font-semibold text-base">Cách xử lý (demo)</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Quét mã hoặc chuyển khoản thủ công theo thông tin bên cạnh.</li>
                                        <li>Hệ thống chỉ đánh dấu PAID khi bạn mở link /pay kèm mã tham chiếu.</li>
                                        <li>Bạn có thể xem hoá đơn đầy đủ sau khi thanh toán.</li>
                                    </ul>
                                </div>
                            </div>

                            {confirmError && <p className="text-red-600 text-sm">{confirmError}</p>}

                            <div className="flex gap-3 pt-2 flex-wrap">
                                <button
                                    onClick={async () => {
                                        if (!order) return;
                                        setConfirming(true);
                                        setConfirmError(null);
                                        try {
                                            const updated = await confirmBankTransfer(order.id, order.paymentCode || "");
                                            setOrder(updated);
                                        } catch (err: any) {
                                            const msg = err?.response?.data?.error || "Xác nhận thất bại.";
                                            setConfirmError(msg);
                                        } finally {
                                            setConfirming(false);
                                        }
                                    }}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-60"
                                    disabled={confirming}
                                >
                                    {confirming ? "Đang xác nhận..." : "Đã chuyển khoản"}
                                </button>
                                <button
                                    onClick={() => router.push(`/orders/${order.id}`)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                >
                                    Xem hoá đơn
                                </button>
                                <button
                                    onClick={() => router.push("/homepage")}
                                    className="px-4 py-2 bg-gray-200 rounded-lg"
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
