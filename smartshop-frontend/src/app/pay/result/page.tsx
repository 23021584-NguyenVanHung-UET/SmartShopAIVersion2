"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Clock3, ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/shared/Footer";

type PayStatus = "success" | "pending" | "failed";

const responseMessages: Record<string, string> = {
    "00": "Thanh toán đã được ngân hàng xác nhận",
    "07": "Giao dịch được ghi nhận, đang chờ xác thực",
    "09": "Giao dịch bị từ chối, vui lòng thử lại",
};

export default function PayResultPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<PayStatus>("pending");

    const success = searchParams.get("success") === "true";
    const orderId = searchParams.get("orderId");
    const responseCode = searchParams.get("responseCode") || "";
    const transactionStatus = searchParams.get("transactionStatus");
    const amount = searchParams.get("amount");
    const bankCode = searchParams.get("bankCode");
    const payDate = searchParams.get("payDate");

    useEffect(() => {
        if (success) setStatus("success");
        else if (transactionStatus?.toLowerCase() === "pending") setStatus("pending");
        else setStatus("failed");
    }, [success, transactionStatus]);

    const detailLink = useMemo(() => {
        if (orderId) return `/orders/${orderId}`;
        return "/orders";
    }, [orderId]);

    const statusCopy = useMemo(() => {
        if (status === "success") return "Thanh toán thành công";
        if (status === "pending") return "Thanh toán đang xử lý";
        return "Thanh toán chưa hoàn tất";
    }, [status]);

    const icon = status === "success" ? (
        <CheckCircle2 className="h-14 w-14 text-emerald-500" />
    ) : status === "pending" ? (
        <Clock3 className="h-14 w-14 text-amber-500" />
    ) : (
        <XCircle className="h-14 w-14 text-destructive" />
    );

    return (
        <div className="bg-background min-h-screen">
            <Navbar />
            <main className="pt-[calc(var(--header-height)+20px)] lg:pt-[calc(var(--header-height)+28px)] pb-12">
                <section className="max-w-screen-md mx-auto px-6">
                    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)]">
                        <div className="bg-gradient-to-r from-primary/10 via-background to-secondary px-6 py-5 border-b border-border">
                            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Kết quả thanh toán</p>
                            <h1 className="text-2xl font-semibold text-foreground mt-1">{statusCopy}</h1>
                            <p className="text-sm text-muted-foreground">Mã đơn: {orderId ? `#${orderId}` : "Không xác định"}</p>
                        </div>

                        <div className="p-6 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                {icon}
                                <div>
                                    <p className="text-lg font-semibold text-foreground">{statusCopy}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {responseMessages[responseCode] || transactionStatus || "Vui lòng kiểm tra lại đơn hàng hoặc thử thanh toán lại."}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                {amount && (
                                    <div className="rounded-xl border border-border bg-secondary/60 px-4 py-3">
                                        <p className="text-muted-foreground">Số tiền</p>
                                        <p className="text-base font-semibold text-foreground">{Number(amount).toLocaleString("vi-VN")}đ</p>
                                    </div>
                                )}
                                {bankCode && (
                                    <div className="rounded-xl border border-border bg-secondary/60 px-4 py-3">
                                        <p className="text-muted-foreground">Ngân hàng</p>
                                        <p className="text-base font-semibold text-foreground">{bankCode}</p>
                                    </div>
                                )}
                                {payDate && (
                                    <div className="rounded-xl border border-border bg-secondary/60 px-4 py-3">
                                        <p className="text-muted-foreground">Thời gian</p>
                                        <p className="text-base font-semibold text-foreground">{payDate}</p>
                                    </div>
                                )}
                            </div>

                            {responseCode && status !== "success" && (
                                <p className="text-xs text-muted-foreground">
                                    Chi tiết ngân hàng: {responseMessages[responseCode] || "Giao dịch chưa được xác nhận. Vui lòng thử lại hoặc liên hệ hỗ trợ."}
                                </p>
                            )}

                            <div className="mt-2 flex flex-wrap gap-3">
                                <button
                                    onClick={() => router.push(detailLink)}
                                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-foreground/90"
                                >
                                    <ArrowRight className="h-4 w-4" />
                                    Xem đơn
                                </button>
                                <button
                                    onClick={() => router.push("/homepage")}
                                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:border-foreground"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Tiếp tục mua sắm
                                </button>
                            </div>

                            {status !== "success" && (
                                <p className="text-xs text-muted-foreground">
                                    Nếu khoản thanh toán đã trừ tiền nhưng chưa hiển thị, vui lòng chờ vài phút hoặc liên hệ hỗ trợ với mã phản hồi để được kiểm tra.
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
