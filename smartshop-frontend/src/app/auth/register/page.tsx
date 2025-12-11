"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/features/auth/services/authService";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    // Validate email regex
    const isValidEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Frontend Validate
        if (!name.trim()) {
            setSuccess(false);
            setMessage("Tên không được bỏ trống!");
            return;
        }

        if (!isValidEmail(email)) {
            setSuccess(false);
            setMessage("Email không hợp lệ!");
            return;
        }

        if (password.length < 6) {
            setSuccess(false);
            setMessage("Mật khẩu phải có ít nhất 6 ký tự!");
            return;
        }

        if (password !== confirmPassword) {
            setSuccess(false);
            setMessage("Mật khẩu nhập lại không khớp!");
            return;
        }

        setLoading(true);

        try {
            const res = await register({ name, email, password });
            setSuccess(true);
            setMessage(res.message || "🎉 Đăng ký thành công! Đang chuyển sang đăng nhập...");
            setLoading(false);
            setTimeout(() => router.push("/auth/login"), 2000);
        } catch (err: any) {
            const msg = err?.response?.data?.message || "Đăng ký thất bại!";
            setSuccess(false);
            setMessage(msg);
            setLoading(false);
        }
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
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto w-20 h-20 drop-shadow-lg"
                    />

                    <h1 className="text-3xl font-extrabold text-gray-900 mt-4">
                        Tạo tài khoản
                    </h1>
                    <p className="text-gray-600 mt-1">Tham gia SmartShopAI ngay hôm nay</p>
                </div>

                {/* Alert */}
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3 mb-4 text-center rounded-xl text-sm font-medium ${success
                                ? "bg-green-100 text-green-700 border border-green-300"
                                : "bg-red-100 text-red-700 border border-red-300"
                            }`}
                    >
                        {message}
                    </motion.div>
                )}

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1">Họ và tên</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nguyễn Văn A"
                            className="px-4 py-3 rounded-xl bg-gray-100 focus:bg-white border border-gray-300 focus:ring-2 ring-blue-400 outline-none transition"
                        />
                    </div>

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
                    <div className="flex flex-col relative">
                        <label className="text-gray-700 font-medium mb-1">Mật khẩu</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="px-4 py-3 rounded-xl bg-gray-100 focus:bg-white border border-gray-300 focus:ring-2 ring-blue-400 outline-none transition"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-11 text-gray-500 cursor-pointer"
                        >
                            {showPassword ? "👁️" : "👁️‍🗨️"}
                        </span>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col relative">
                        <label className="text-gray-700 font-medium mb-1">Nhập lại mật khẩu</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="px-4 py-3 rounded-xl bg-gray-100 focus:bg-white border border-gray-300 focus:ring-2 ring-blue-400 outline-none transition"
                        />
                        <span
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-11 text-gray-500 cursor-pointer"
                        >
                            {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                        </span>
                    </div>

                    {/* Button with loading */}
                    <motion.button
                        whileHover={{ scale: loading ? 1 : 1.03 }}
                        whileTap={{ scale: loading ? 1 : 0.97 }}
                        disabled={loading}
                        type="submit"
                        className={`w-full py-3 rounded-xl text-white font-bold shadow-md transition 
                            ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
                        `}
                    >
                        {loading ? (
                            <div className="flex justify-center items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Đang xử lý...
                            </div>
                        ) : (
                            "Đăng ký"
                        )}
                    </motion.button>
                </form>

                {/* Link */}
                <p className="text-gray-600 text-center mt-6 text-sm">
                    Đã có tài khoản?{" "}
                    <Link
                        href="/auth/login"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Đăng nhập ngay
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
