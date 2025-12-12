"use client";

import { ReactNode } from "react";
import { Sparkles, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { motion } from "framer-motion";

type AuthLayoutProps = {
    title: string;
    subtitle: string;
    children: ReactNode;
    footer?: ReactNode;
};

const benefits = [
    {
        title: "Cá nhân hóa bởi AI",
        description: "Gợi ý sản phẩm bám sát nhu cầu, không cần lục tìm.",
        icon: Sparkles,
    },
    {
        title: "Giao nhanh toàn quốc",
        description: "Kết nối đối tác vận chuyển để giao trong 2H nội thành.",
        icon: Truck,
    },
    {
        title: "Thanh toán an toàn",
        description: "Bảo vệ thông tin và đơn hàng của bạn 24/7.",
        icon: ShieldCheck,
    },
];

export default function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 lg:px-8">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground/70">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background text-base">
                        SS
                    </div>
                    <span>SmartShop · Trải nghiệm mua sắm hiện đại</span>
                </div>

                <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] lg:grid-cols-[1.05fr,0.95fr]">
                    <div className="relative hidden overflow-hidden bg-foreground text-primary-foreground lg:flex">
                        <div className="absolute inset-0 opacity-[0.15]">
                            <div className="absolute -left-10 -top-10 h-60 w-60 rounded-full bg-white/20 blur-3xl" />
                            <div className="absolute -bottom-8 right-4 h-64 w-64 rounded-full bg-primary/40 blur-3xl" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.1),transparent_28%)]" />
                        </div>

                        <div className="relative flex flex-col justify-between p-12">
                            <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em]">
                                <ShoppingBag className="h-5 w-5" />
                                <span>SmartShop</span>
                            </div>

                            <div className="space-y-4">
                                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur">
                                    <Sparkles className="h-4 w-4" />
                                    Giao diện mới, trải nghiệm mượt mà
                                </p>
                                <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                                    Mua sắm đa ngành, tối ưu cho mọi thiết bị.
                                </h2>
                                <p className="text-base text-primary-foreground/80">
                                    Lấy cảm hứng từ Shopify, SmartShop giúp bạn quản lý giỏ hàng, thanh toán, theo dõi đơn và hồ sơ cá nhân trong một giao diện thống nhất.
                                </p>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                                {benefits.map((item) => (
                                    <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                                        <div className="flex items-center gap-3">
                                            <item.icon className="h-5 w-5" />
                                            <h3 className="text-base font-semibold">{item.title}</h3>
                                        </div>
                                        <p className="mt-2 text-sm text-primary-foreground/75">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col justify-center bg-card px-6 py-8 md:px-10 md:py-12"
                    >
                        <div className="space-y-2">
                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">SmartShop</p>
                            <h1 className="text-3xl font-semibold text-foreground">{title}</h1>
                            <p className="text-muted-foreground">{subtitle}</p>
                        </div>

                        <div className="mt-6">{children}</div>

                        {footer && <div className="mt-6 text-sm text-muted-foreground">{footer}</div>}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
