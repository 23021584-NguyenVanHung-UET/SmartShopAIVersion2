"use client";

import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/features/cart/hooks/useCart";

export default function CartPage() {
    const { cart, updateQty, removeItem, total } = useCart();
    const hasItems = cart.length > 0;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-blue-600 mb-6">Giỏ hàng</h1>

            <div className="bg-white rounded-xl shadow-md p-5">
                {!hasItems ? (
                    <p className="text-gray-500 text-center py-10">
                        Giỏ hàng của bạn đang trống.
                    </p>
                ) : (
                    <div className="space-y-5">
                        {cart.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                updateQty={updateQty}
                                removeItem={removeItem}
                            />
                        ))}
                    </div>
                )}

                {hasItems && <CartSummary total={total} />}
            </div>
        </div>
    );
}
