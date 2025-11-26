"use client";

import { CartItem as ItemType } from "@/features/cart/type";
import { Trash2 } from "lucide-react";

interface Props {
    item: ItemType;
    updateQty: (id: number, amount: number) => void;
    removeItem: (id: number) => void;
}

export default function CartItem({ item, updateQty, removeItem }: Props) {
    return (
        <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-blue-600 font-bold">
                        {item.price.toLocaleString()}đ
                    </p>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button
                    aria-label="Giảm số lượng"
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                    onClick={() => updateQty(item.id, -1)}
                >
                    -
                </button>

                <button
                    aria-label="Tăng số lượng"
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                    onClick={() => updateQty(item.id, 1)}
                >
                    +
                </button>

                <button
                    aria-label="Xóa sản phẩm khỏi giỏ hàng"
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
                    onClick={() => removeItem(item.id)}
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
}
