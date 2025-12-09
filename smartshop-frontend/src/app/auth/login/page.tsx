"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            // ❌ Nếu lỗi server / sai mật khẩu / sai email
            if (!res.ok) {
                setError(data.error || data.message || "Sai email hoặc mật khẩu!");
                setLoading(false);
                return;
            }

            // ⭐ Lưu JWT token + user info
            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: data.name,
                    email: data.email,
                    role: data.role,
                })
            );

            // Hiệu ứng réussite
            setSuccess(true);
            setLoading(false);

            // Redirect based on role
            setTimeout(() => {
                if (data.role === "ADMIN") {
                    router.push("/admin/dashboard");
                } else {
                    router.push("/homepage");
                }
            }, 1500);

        } catch (err) {
            setError("Không thể kết nối tới server!");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-6 relative">

            {/* Popup đăng nhập thành công */}
            <AnimatePresence>
                {success && (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute top-10 bg-green-500 text-white font-semibold px-6 py-3 rounded-xl shadow-xl"
                    >
                        🎉 Đăng nhập thành công!
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white shadow-xl rounded-3xl p-10 border border-gray-200"
            >
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

                <form className="space-y-5" onSubmit={handleLogin}>
                    {/* Email */}
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

                    {/* Password */}
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

                    {/* Error message */}
                    {error && (
                        <p className="text-red-500 font-medium text-sm text-center">{error}</p>
                    )}

                    {/* Submit button */}
                    <motion.button
                        whileHover={{ scale: loading ? 1 : 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold shadow-md hover:bg-blue-700 transition flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                                className="w-6 h-6 border-4 border-white border-t-transparent rounded-full"
                            />
                        ) : (
                            "Đăng nhập"
                        )}
                    </motion.button>
                </form>

                <p className="text-gray-600 text-center mt-6 text-sm">
                    Chưa có tài khoản?{" "}
                    <Link href="/auth/register" className="font-semibold text-blue-600 hover:underline">
                        Đăng ký ngay
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
