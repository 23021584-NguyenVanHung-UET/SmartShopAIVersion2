"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
    total: number;
    hasItems: boolean;
}

export default function CartSummary({ total, hasItems }: Props) {
    return (
        <aside className="rounded-2xl border border-border bg-card p-6 shadow-sm sticky top-28 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Tóm tắt đơn hàng</h2>

            <div className="space-y-3 text-sm text-foreground">
                <div className="flex justify-between items-center pb-2 border-b border-border/70">
                    <span>Tạm tính</span>
                    <span className="font-semibold">{total.toLocaleString("vi-VN")}đ</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/70">
                    <span>Thuế</span>
                    <span className="text-muted-foreground">Tính khi thanh toán</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/70">
                    <span>Phí vận chuyển</span>
                    <span className="text-muted-foreground">Tính khi thanh toán</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                    <span className="font-semibold">Tổng cộng</span>
                    <span className="text-xl font-bold text-foreground">
                        {total.toLocaleString("vi-VN")}đ
                    </span>
                </div>
            </div>

            <div className="space-y-3">
                <Link
                    href={hasItems ? "/checkout" : "/homepage"}
                    className={`inline-flex items-center justify-between gap-3 rounded-md px-4 py-3 text-sm font-semibold ${
                        hasItems
                            ? "bg-foreground text-background hover:bg-foreground/90"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                    aria-disabled={!hasItems}
                >
                    <span>Tiến hành thanh toán</span>
                    <ArrowRight size={18} />
                </Link>
                <Link
                    href="/homepage"
                    className="inline-flex items-center justify-center rounded-md border border-border px-4 py-3 text-sm font-medium text-foreground hover:border-foreground"
                >
                    Tiếp tục mua sắm
                </Link>
                <p className="text-xs text-muted-foreground text-center">
                    Freeship đơn từ 499.000đ. Đổi trả trong 7 ngày nếu sản phẩm lỗi.
                </p>
            </div>
        </aside>
    );
}
