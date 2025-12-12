"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
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

    const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            setSuccess(false);
            setMessage("Họ tên không được bỏ trống.");
            return;
        }

        if (!isValidEmail(email)) {
            setSuccess(false);
            setMessage("Email không hợp lệ.");
            return;
        }

        if (password.length < 6) {
            setSuccess(false);
            setMessage("Mật khẩu cần tối thiểu 6 ký tự.");
            return;
        }

        if (password !== confirmPassword) {
            setSuccess(false);
            setMessage("Mật khẩu nhập lại chưa khớp.");
            return;
        }

        setLoading(true);

        try {
            const res = await register({ name, email, password });
            setSuccess(true);
            setMessage(res.message || "🎉 Tạo tài khoản thành công! Đang chuyển sang đăng nhập...");
            setLoading(false);
            setTimeout(() => router.push("/auth/login"), 1500);
        } catch (err: any) {
            const msg = err?.response?.data?.message || "Đăng ký thất bại, thử lại sau.";
            setSuccess(false);
            setMessage(msg);
            setLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none focus:ring-2 focus:ring-primary/20";

    return (
        <AuthLayout
            title="Tạo tài khoản SmartShop"
            subtitle="Lưu giỏ hàng, theo dõi đơn và nhận ưu đãi cá nhân hóa cho mọi ngành hàng."
            footer={
                <p className="text-center">
                    Đã có tài khoản?{" "}
                    <Link href="/auth/login" className="font-semibold text-foreground underline-offset-4 hover:underline">
                        Đăng nhập
                    </Link>
                </p>
            }
        >
            <div className="space-y-5">
                {message && (
                    <div
                        className={`rounded-xl border px-4 py-3 text-sm font-medium ${
                            success
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                : "border-red-200 bg-red-50 text-red-700"
                        }`}
                    >
                        {message}
                    </div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Họ và tên</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nguyễn Văn A"
                            className={inputClass}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user@smartshop.local"
                            className={inputClass}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Mật khẩu</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Tối thiểu 6 ký tự"
                                className={inputClass}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Nhập lại mật khẩu</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Nhập lại để xác nhận"
                                className={inputClass}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-muted-foreground hover:text-foreground"
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: loading ? 1 : 1.01 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        disabled={loading}
                        type="submit"
                        className="flex w-full items-center justify-center rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-[0_10px_30px_-15px_rgba(15,23,42,0.55)] transition hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-75"
                    >
                        {loading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                                className="h-5 w-5 rounded-full border-2 border-background border-t-transparent"
                            />
                        ) : (
                            "Đăng ký"
                        )}
                    </motion.button>
                </form>

                <p className="text-xs text-muted-foreground">
                    Bằng việc tạo tài khoản, bạn đồng ý nhận thông tin ưu đãi từ SmartShop và có thể hủy bất kỳ lúc nào.
                </p>
            </div>
        </AuthLayout>
    );
}
