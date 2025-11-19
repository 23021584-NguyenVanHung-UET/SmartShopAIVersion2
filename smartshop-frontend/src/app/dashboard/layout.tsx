"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, Users, Package, Settings } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`${open ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 p-4 flex flex-col`}
            >
                <div className="flex items-center justify-between mb-6">
                    {open && <h1 className="text-xl font-bold text-blue-600">SmartShopAI</h1>}
                    <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-gray-200">
                        {open ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Menu */}
                <nav className="space-y-3">
                    <SidebarItem open={open} href="/dashboard" icon={<Home size={20} />} label="Trang chủ" />
                    <SidebarItem open={open} href="/dashboard/products" icon={<Package size={20} />} label="Sản phẩm" />
                    <SidebarItem open={open} href="/dashboard/users" icon={<Users size={20} />} label="Người dùng" />
                    <SidebarItem open={open} href="/dashboard/settings" icon={<Settings size={20} />} label="Cài đặt" />
                </nav>
            </aside>

            {/* Content */}
            <main className="flex-1 p-6">
                <Header />
                <div className="mt-6">{children}</div>
            </main>
        </div>
    );
}

type SidebarItemProps = {
    open: boolean;
    href: string;
    icon: React.ReactNode;
    label: string;
};

function SidebarItem({ open, href, icon, label }: SidebarItemProps) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-gray-700 font-medium"
        >
            {icon}
            {open && <span>{label}</span>}
        </Link>
    );
}

function Header() {
    return (
        <div className="flex items-center justify-between bg-white p-4 shadow rounded-xl">
            <h2 className="text-lg font-bold text-gray-800">Dashboard</h2>
            <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-gray-300" />
            </div>
        </div>
    );
}
