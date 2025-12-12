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
        <div className="rounded-lg border border-border/60 bg-card p-3">
            <div className="flex flex-row gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-sm border border-border/70 bg-muted shrink-0">
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="flex flex-col flex-1 gap-1">
                    <p className="font-semibold text-foreground line-clamp-2">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Đổi trả 7 ngày nếu lỗi</p>
                    <p className="text-base font-semibold text-foreground">
                        {item.price.toLocaleString("vi-VN")}đ
                    </p>
                    <div className="flex justify-between items-end mt-auto">
                        <div className="flex h-9 items-center rounded-md border border-border/80">
                            <button
                                aria-label="Giảm số lượng"
                                className="px-3 h-full text-foreground hover:bg-muted/80"
                                onClick={() => updateQty(item.id, -1)}
                            >
                                -
                            </button>
                            <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                            <button
                                aria-label="Tăng số lượng"
                                className="px-3 h-full text-foreground hover:bg-muted/80"
                                onClick={() => updateQty(item.id, 1)}
                            >
                                +
                            </button>
                        </div>

                        <button
                            aria-label="Xóa sản phẩm khỏi giỏ hàng"
                            className="inline-flex items-center gap-2 text-sm font-medium text-destructive hover:underline"
                            onClick={() => removeItem(item.id)}
                        >
                            <Trash2 size={16} />
                            Xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
