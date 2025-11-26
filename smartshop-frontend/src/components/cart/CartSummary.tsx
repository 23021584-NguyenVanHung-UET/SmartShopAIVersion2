"use client";

import Link from "next/link";

interface Props {
    total: number;
}

export default function CartSummary({ total }: Props) {
    return (
        <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-bold">
                Tổng tiền:{" "}
                <span className="text-blue-600">
                    {total.toLocaleString()}đ
                </span>
            </p>

            <Link
                href="/checkout"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
                Tiến hành thanh toán
            </Link>
        </div>
    );
}
