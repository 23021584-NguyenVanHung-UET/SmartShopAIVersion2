"use client";

import { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";

type User = {
    name: string;
    email: string;
};

export default function Navbar() {
    const [cartCount] = useState(0);
    const [user, setUser] = useState<User | null>(null);

    // 🔥 Load user từ JWT thông qua API /auth/me
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

                // Đồng bộ localStorage
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        name: data.name,
                        email: data.email,
                    })
                );
            } catch (error) {
                console.error("Lỗi khi fetch user:", error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);

        // Optional redirect
        window.location.href = "/auth/login";
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
                        className="bg-transparent ml-2 w-full outline-none text-sm md:text-base"
                    />
                </div>

                {/* Right section */}
                <div className="flex items-center gap-3">

                    {/* Nếu chưa login → Hiện Đăng nhập / Đăng ký */}
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

                    {/* Nếu đã login → hiện tên user + Logout */}
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

                    {/* Cart icon */}
                    <Link href="/cart" className="relative cursor-pointer">
                        <ShoppingCart size={26} className="text-gray-800" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
