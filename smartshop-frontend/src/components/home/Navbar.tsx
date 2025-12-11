"use client";

import { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "@/features/cart/hooks/useCart";

type User = {
    name: string;
    email: string;
};

type NavbarProps = {
    onSearch?: (keyword: string) => void; // 👈 FIX
};

export default function Navbar({ onSearch }: NavbarProps) {
    const { cart } = useCart();
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const [user, setUser] = useState<User | null>(null);

    // 🔥 Load user từ JWT: GET /auth/me
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/auth/me", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    console.warn("Token hết hạn hoặc không hợp lệ.");
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    return;
                }

                const data = await res.json();

                startTransition(() => {
                    setUser({
                        name: data.name,
                        email: data.email,
                    });
                });

                localStorage.setItem("user", JSON.stringify(data));
            } catch (error) {
                console.error("Lỗi khi lấy thông tin user:", error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/auth/login";
    };

    // ⭐ Function Search Local
    const handleSearchChange = (text: string) => {
        onSearch?.(text); // gọi props nếu có
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 gap-4">

                {/* Logo */}
                <Link href="/homepage" className="text-2xl font-bold text-blue-600">
                    SmartShop
                </Link>

                {/* Search Bar */}
                <div className="flex-1 flex items-center bg-gray-100 px-4 py-2 rounded-full max-w-xl">
                    <Search size={20} className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        className="w-full px-4 py-2 bg-transparent outline-none"
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-4">

                    {/* Chưa login → Login + Register */}
                    {!user && (
                        <div className="hidden md:flex gap-2">
                            <Link
                                href="/auth/login"
                                className="px-4 py-1.5 rounded-full border border-blue-600 text-blue-600 text-sm font-semibold hover:bg-blue-50"
                            >
                                Đăng nhập
                            </Link>

                            <Link
                                href="/auth/register"
                                className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
                            >
                                Đăng ký
                            </Link>
                        </div>
                    )}

                    {/* Đã login */}
                    {user && (
                        <div className="hidden md:flex items-center gap-3">
                            <span className="text-gray-700 font-medium">
                                👋 Xin chào, <b>{user.name}</b>
                            </span>

                            <button
                                onClick={handleLogout}
                                className="px-4 py-1.5 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    )}

                    {/* Cart */}
                    <Link href="/cart" className="relative cursor-pointer">
                        <ShoppingCart size={26} className="text-gray-800" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[22px] text-center">
                            {cartCount}
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
