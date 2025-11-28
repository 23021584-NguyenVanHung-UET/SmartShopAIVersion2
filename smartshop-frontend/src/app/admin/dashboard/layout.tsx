"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu, X, Home, User, Package, Receipt, Users, Brain,
  LogOut, Moon, Sun, ShoppingBag, Bell
} from "lucide-react";
import { ToastProvider } from "@/components/common/Toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // ← quan trọng: mặc định false
  const pathname = usePathname();
  const basePath = "/admin/dashboard";

  // CHỈ CHẠY 1 LẦN KHI MỞ TRANG – FIX HOÀN TOÀN LỖI LIGHT MODE BỊ TỐI
  useEffect(() => {
    const saved = localStorage.getItem("admin-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = saved === "dark" || (!saved && prefersDark);

    setIsDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("admin-theme", newMode ? "dark" : "light");
  };

  const menuItems = [
    { href: basePath, icon: Home, label: "Dashboard" },
    { href: `${basePath}/profile`, icon: User, label: "Trang cá nhân" },
  ];

  const adminItems = [
    { href: `${basePath}/products`, icon: Package, label: "Sản phẩm", color: "text-emerald-600" },
    { href: `${basePath}/orders`,   icon: Receipt, label: "Đơn hàng",   color: "text-amber-600" },
    { href: `${basePath}/users`,    icon: Users,   label: "Người dùng", color: "text-purple-600" },
    { href: `${basePath}/ai-logs`,  icon: Brain,   label: "Log AI",     color: "text-cyan-600" },
  ];

  return (
    <ToastProvider>
      {/* LIGHT MODE TRẮNG TINH – DARK MODE ĐEN TUYỀN */}
      <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
        <div className="min-h-screen bg-white dark:bg-gray-950">

          {/* SIDEBAR */}
          <aside className={`fixed inset-y-0 left-0 z-50 ${sidebarOpen ? "w-72" : "w-20"}
            bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-2xl transition-all duration-500 flex flex-col`}>

            {/* Logo */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <div className={`flex items-center gap-3 ${!sidebarOpen && "justify-center"}`}>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">
                  <ShoppingBag className="w-7 h-7 text-white" />
                </div>
                {sidebarOpen && (
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      SmartShopAI
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Quản trị thông minh</p>
                  </div>
                )}
              </div>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map(item => (
                <SidebarLink key={item.href} {...item} open={sidebarOpen} active={pathname === item.href} />
              ))}
              {localStorage.getItem("role") === "ADMIN" && (
                <>
                  <div className={`mt-6 mb-2 px-4 ${sidebarOpen ? "block" : "hidden"}`}>
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quản trị viên</span>
                  </div>
                  {adminItems.map(item => (
                    <SidebarLink key={item.href} {...item} open={sidebarOpen} active={pathname === item.href} />
                  ))}
                </>
              )}
            </nav>

            {/* Bottom */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
              <button onClick={toggleDarkMode} className="w-full flex items-center justify-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-blue-600" />}
                {sidebarOpen && <span className="text-sm font-medium">Chế độ {isDarkMode ? "sáng" : "tối"}</span>}
              </button>
              <button className="w-full flex items-center justify-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 transition">
                <LogOut size={20} />
                {sidebarOpen && <span className="text-sm font-medium">Đăng xuất</span>}
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className={`transition-all duration-500 ${sidebarOpen ? "ml-72" : "ml-20"} min-h-screen bg-white dark:bg-gray-950`}>
            <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="flex items-center justify-between px-8 py-6">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Chào mừng trở lại!
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Hôm nay bạn đã sẵn sàng chinh phục chưa?</p>
                </div>
                <div className="flex items-center gap-6">
                  <button className="relative p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  </button>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <main className="p-6 lg:p-10">
              {children}
            </main>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}

function SidebarLink({ href, icon: Icon, label, open, active, color = "text-blue-600" }: any) {
  return (
    <Link href={href} className={`group relative flex items-center gap-4 p-4 rounded-2xl transition-all ${active ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-105" : "hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105"}`}>
      <div className={`p-2.5 rounded-xl ${active ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"} group-hover:scale-110`}>
        <Icon size={20} className={active ? "text-white" : color} />
      </div>
      {open && <span className={`font-medium ${active ? "text-white" : "text-gray-700 dark:text-gray-300"}`}>{label}</span>}
      {!open && <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 pointer-events-none">{label}</div>}
    </Link>
  );
}