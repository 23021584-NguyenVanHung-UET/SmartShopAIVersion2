"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.includes("@")) {
            setError("Email không hợp lệ!");
            return;
        }
        if (password.length < 6) {
            setError("Mật khẩu phải ít nhất 6 ký tự!");
            return;
        }

        setError("");
        console.log("Login...", { email, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white shadow-xl rounded-3xl p-10 border border-gray-200"
            >
                {/* Logo */}
                <div className="text-center mb-6">
                    <motion.img
                        src="/images/Logo_HUET.svg.png"
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto w-20 h-20 drop-shadow-md"
                    />

                    <h1 className="text-3xl font-extrabold text-gray-900 mt-4">
                        SmartShopAI
                    </h1>
                    <p className="text-gray-600 mt-1">Đăng nhập để tiếp tục</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="px-4 py-3 rounded-xl bg-gray-100 focus:bg-white border border-gray-300 focus:ring-2 ring-blue-400 outline-none transition"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="px-4 py-3 rounded-xl bg-gray-100 focus:bg-white border border-gray-300 focus:ring-2 ring-blue-400 outline-none transition"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 font-medium text-sm text-center">
                            {error}
                        </p>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold shadow-md hover:bg-blue-700 transition"
                    >
                        Đăng nhập
                    </motion.button>
                </form>

                <p className="text-gray-600 text-center mt-6 text-sm">
                    Chưa có tài khoản?{" "}
                    <Link href="/register" className="font-semibold text-blue-600 hover:underline">
                        Đăng ký ngay
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
