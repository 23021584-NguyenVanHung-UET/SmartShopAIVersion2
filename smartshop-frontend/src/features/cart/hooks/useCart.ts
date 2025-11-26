"use client";

import { useEffect, useState } from "react";
import { CartItem } from "../type";
import { Product } from "@/features/products/type";

// Tải cart 1 lần duy nhất (lazy init)
function loadCartFromLocalStorage(): CartItem[] {
    if (typeof window === "undefined") return [];
    try {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>(() => loadCartFromLocalStorage());

    // Lưu khi cart thay đổi
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // ❗ Sửa: Nhận Product chứ không phải CartItem
    const addToCart = (product: Product) => {
        setCart(prev => {
            const exists = prev.find(item => item.id === product.id);

            if (exists) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            const newItem: CartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: 1
            };

            return [...prev, newItem];
        });
    };

    const updateQty = (id: number, amount: number) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return { cart, updateQty, removeItem, addToCart, total };
}
