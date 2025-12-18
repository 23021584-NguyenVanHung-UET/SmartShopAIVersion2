"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { login } from "@/features/auth/services/authService";

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
            setError("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        setLoading(true);

        try {
            const data = await login({ email, password });

            if (!data.token) {
                setError("Sai email hoặc mật khẩu.");
                setLoading(false);
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: data.name,
                    email: data.email,
                    role: data.role,
                })
            );

            setSuccess(true);
            setLoading(false);

            // Redirect based on role
            const redirectPath = data.role === "ADMIN" ? "/admin/dashboard" : "/homepage";
            setTimeout(() => router.push(redirectPath), 1200);
        } catch (err: any) {
            const message = err?.response?.data?.error || err?.response?.data?.message || "Sai email hoặc mật khẩu.";
            setError(message);
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Chào mừng trở lại"
            subtitle="Đăng nhập để tiếp tục mua sắm, theo dõi đơn và nhận ưu đãi dành riêng cho bạn."
            footer={
                <p className="text-center">
                    Chưa có tài khoản?{" "}
                    <Link href="/auth/register" className="font-semibold text-foreground underline-offset-4 hover:underline">
                        Đăng ký ngay
                    </Link>
                </p>
            }
        >
            <div className="space-y-5">
                {success && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        🎉 Đăng nhập thành công! Đang chuyển hướng...
                    </div>
                )}

                {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        {error}
                    </div>
                )}

                <form className="space-y-5" onSubmit={handleLogin}>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user@smartshop.local"
                            className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: loading ? 1 : 1.01 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        type="submit"
                        className="flex w-full items-center justify-center rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-[0_10px_30px_-15px_rgba(15,23,42,0.55)] transition hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-75"
                        disabled={loading}
                    >
                        {loading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                                className="h-5 w-5 rounded-full border-2 border-background border-t-transparent"
                            />
                        ) : (
                            "Đăng nhập"
                        )}
                    </motion.button>
                </form>

                <p className="text-xs text-muted-foreground">
                    Bằng việc tiếp tục, bạn đồng ý với Chính sách bảo mật và Điều khoản sử dụng SmartShop.
                </p>
            </div>
        </AuthLayout>
    );
}
