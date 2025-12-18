"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Menu, X, Home, User, Package, Receipt, Users,
  LogOut, Moon, Sun, ShoppingBag, Settings, ChevronDown
} from "lucide-react";
import { ToastProvider } from "@/components/common/Toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const basePath = "/admin/dashboard";

  /* -----------------------------------
     Khởi tạo sau khi client hydrate
  ------------------------------------ */
  useEffect(() => {
    setMounted(true);

    // Load role từ localStorage
    const storedRole = localStorage.getItem("role");
    setRole(storedRole || "ADMIN"); // Mặc định là ADMIN

    // Load theme
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/auth/login");
  };

  const menuItems = [
    { href: basePath, icon: Home, label: "Dashboard", color: "text-blue-600" },
    { href: `${basePath}/profile`, icon: User, label: "Trang cá nhân", color: "text-pink-600" },
  ];

  const adminItems = [
    { href: `${basePath}/products`, icon: Package, label: "Sản phẩm", color: "text-emerald-600" },
    { href: `${basePath}/orders`, icon: Receipt, label: "Đơn hàng", color: "text-amber-600" },
    { href: `${basePath}/users`, icon: Users, label: "Người dùng", color: "text-purple-600" },
    { href: `${basePath}/settings`, icon: Settings, label: "Cài đặt", color: "text-gray-600" },
  ];

  // Nếu chưa mount, hiển thị loading
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        {/* ----------------- SIDEBAR ----------------- */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 ${sidebarOpen ? "w-72" : "w-20"
            } bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 
          shadow-xl transition-all duration-300 flex flex-col`}
        >
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <div className={`flex items-center gap-3 ${!sidebarOpen && "justify-center w-full"}`}>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    SmartShopAI
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Quản trị thông minh</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <SidebarLink
                key={item.href}
                {...item}
                open={sidebarOpen}
                active={pathname === item.href || pathname.startsWith(item.href + "/")}
              />
            ))}

            {/* Admin Menu */}
            {role === "ADMIN" && (
              <>
                {sidebarOpen && (
                  <div className="mt-6 mb-2 px-4">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Quản trị viên
                    </span>
                  </div>
                )}
                {adminItems.map((item) => (
                  <SidebarLink
                    key={item.href}
                    {...item}
                    open={sidebarOpen}
                    active={pathname === item.href || pathname.startsWith(item.href + "/")}
                  />
                ))}
              </>
            )}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-500 flex-shrink-0" />
              ) : (
                <Moon size={20} className="text-blue-600 flex-shrink-0" />
              )}
              {sidebarOpen && (
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {darkMode ? "Chế độ sáng" : "Chế độ tối"}
                </span>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
            >
              <LogOut size={20} className="flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">Đăng xuất</span>}
            </button>
          </div>
        </aside>

        {/* ----------------- MAIN CONTENT ----------------- */}
        <div
          className={`transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-20"
            } min-h-screen bg-gray-50 dark:bg-gray-950`}
        >
          {/* Header */}
          <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between px-6 lg:px-8 py-4">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {getPageTitle(pathname)}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                  {getPageDescription(pathname)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="text-right hidden sm:block">
                      <p className="font-semibold text-gray-800 dark:text-white text-sm">
                        Admin User
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {role === "ADMIN" ? "Quản trị viên" : "Người dùng"}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-gray-500 transition-transform ${profileMenuOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {profileMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setProfileMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                        <Link
                          href={`${basePath}/profile`}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <User size={18} className="text-gray-600 dark:text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">Hồ sơ cá nhân</span>
                        </Link>
                        <Link
                          href={`${basePath}/settings`}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <Settings size={18} className="text-gray-600 dark:text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">Cài đặt</span>
                        </Link>
                        <div className="border-t border-gray-200 dark:border-gray-700">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <LogOut size={18} />
                            <span>Đăng xuất</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Nội dung chính */}
          <main className="p-4 lg:p-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 mt-auto">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <p>© 2024 SmartShopAI. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
                <span>v1.0.0</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ToastProvider>
  );
}

/* -----------------------------------
   COMPONENT SIDEBAR LINK
------------------------------------ */
function SidebarLink({
  href,
  icon: Icon,
  label,
  open,
  active,
  color = "text-blue-600",
}: {
  href: string;
  icon: any;
  label: string;
  open: boolean;
  active: boolean;
  color?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${active
        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
        }`}
    >
      <div
        className={`p-2 rounded-lg transition-all ${active
          ? "bg-white/20"
          : "bg-gray-100 dark:bg-gray-800 group-hover:scale-110"
          }`}
      >
        <Icon size={20} className={active ? "text-white" : color} />
      </div>

      {open && (
        <span
          className={`font-medium ${active ? "text-white" : "text-gray-700 dark:text-gray-300"
            }`}
        >
          {label}
        </span>
      )}

      {!open && (
        <div
          className="absolute left-full ml-3 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg 
          opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none 
          shadow-lg before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:border-4 
          before:border-transparent before:border-r-gray-900 dark:before:border-r-gray-800"
        >
          {label}
        </div>
      )}
    </Link>
  );
}

/* -----------------------------------
   Hàm lấy title theo route
------------------------------------ */
function getPageTitle(pathname: string): string {
  const titles: Record<string, string> = {
    "/admin/dashboard": "Dashboard",
    "/admin/dashboard/profile": "Hồ sơ cá nhân",
    "/admin/dashboard/products": "Quản lý sản phẩm",
    "/admin/dashboard/orders": "Quản lý đơn hàng",
    "/admin/dashboard/users": "Quản lý người dùng",
    "/admin/dashboard/settings": "Cài đặt hệ thống",
  };

  return titles[pathname] || "SmartShopAI Dashboard";
}

function getPageDescription(pathname: string): string {
  const descriptions: Record<string, string> = {
    "/admin/dashboard": "Tổng quan hệ thống và thống kê",
    "/admin/dashboard/profile": "Quản lý thông tin cá nhân",
    "/admin/dashboard/products": "Thêm, sửa, xóa sản phẩm",
    "/admin/dashboard/orders": "Theo dõi và xử lý đơn hàng",
    "/admin/dashboard/users": "Quản lý tài khoản người dùng",
    "/admin/dashboard/settings": "Cấu hình hệ thống",
  };

  return descriptions[pathname] || "Chào mừng trở lại!";
}