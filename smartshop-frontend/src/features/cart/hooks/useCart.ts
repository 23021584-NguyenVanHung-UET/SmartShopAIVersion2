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
    const [cart, setCart] = useState<CartItem[]>([]);
    const [mounted, setMounted] = useState(false);

    // Sync across components via custom event + storage event
    useEffect(() => {
        setMounted(true);
        const sync = () => {
            if (!mounted) return;
            setCart(loadCartFromLocalStorage());
        };
        // Initial load after mount to avoid SSR hydration mismatch
        sync();
        window.addEventListener("cart-updated", sync as EventListener);
        window.addEventListener("storage", sync);
        return () => {
            window.removeEventListener("cart-updated", sync as EventListener);
            window.removeEventListener("storage", sync);
            setMounted(false);
        };
    }, [mounted]);

    const persist = (updater: (prev: CartItem[]) => CartItem[]) => {
        setCart(prev => {
            const next = updater(prev);
            try {
                localStorage.setItem("cart", JSON.stringify(next));
                setTimeout(() => window.dispatchEvent(new Event("cart-updated")), 0);
            } catch {
                // ignore
            }
            return next;
        });
    };

    // Nhận Product, không phải CartItem
    const addToCart = (product: Product) => {
        persist(prev => {
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
        persist(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        persist(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => persist(() => []);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return { cart, updateQty, removeItem, addToCart, clearCart, total };
}
