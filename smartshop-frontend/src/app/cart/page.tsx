"use client";

import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/features/cart/hooks/useCart";

export default function CartPage() {
    const { cart, updateQty, removeItem, total } = useCart();
    const hasItems = cart.length > 0;

    return (
        <div className="bg-background min-h-screen">
            <div className="max-w-6xl mx-auto px-4 md:px-6 pt-[calc(var(--header-height)+12px)] lg:pt-[calc(var(--header-height)+16px)] pb-16">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-foreground">Giỏ hàng</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Kiểm tra sản phẩm trước khi thanh toán. Đơn từ 499.000đ được freeship.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.6fr,1fr] items-start">
                    <div className="space-y-3 rounded-2xl border border-border bg-muted/50 p-4 shadow-sm">
                        {!hasItems ? (
                            <div className="text-center text-muted-foreground py-10 rounded-lg border border-dashed border-border bg-card">
                                <p className="text-lg font-medium text-foreground mb-2">Giỏ hàng trống</p>
                                <p className="text-sm">Thêm sản phẩm để tiếp tục mua sắm.</p>
                            </div>
                        ) : (
                            cart.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    updateQty={updateQty}
                                    removeItem={removeItem}
                                />
                            ))
                        )}
                    </div>

                    <CartSummary total={total} hasItems={hasItems} />
                </div>
            </div>
        </div>
    );
}
