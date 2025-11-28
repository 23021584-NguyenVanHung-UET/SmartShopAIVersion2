// components/dashboard/Sidebar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, Home, Users, Package, ShoppingBag, Brain, Settings, LogOut, 
  Sun, Moon, ChevronRight 
} from "lucide-react";

const menuItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/profile", icon: Users, label: "Hồ sơ" },
  { href: "/dashboard/products", icon: Package, label: "Sản phẩm" },
  { href: "/dashboard/orders", icon: ShoppingBag, label: "Đơn hàng" },
  { href: "/dashboard/users", icon: Users, label: "Người dùng" },
  { href: "/dashboard/ai-logs", icon: Brain, label: "AI Logs" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <aside className={`${open ? "w-72" : "w-20"} fixed left-0 top-0 z-50 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-2xl transition-all duration-500 flex flex-col`}>
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <div className={`flex items-center gap-3 ${!open && "justify-center"}`}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          {open && (
            <div>
              <h1 className="text-2xl font-bold gradient-text">SmartShopAI</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Quản trị thông minh</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-110"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-300
                ${isActive 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-105" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105"
                }`}
            >
              <div className={`p-2.5 rounded-xl ${isActive ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"} group-hover:scale-110 transition-all`}>
                <item.icon size={20} className={isActive ? "text-white" : "text-blue-600 dark:text-blue-400"} />
              </div>
              {open && <span className={`font-medium ${isActive ? "text-white" : "text-gray-700 dark:text-gray-300"}`}>{item.label}</span>}
              
              {!open && (
                <div className="tooltip">{item.label}</div>
              )}
              {isActive && open && <ChevronRight className="ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center justify-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-blue-600" />}
          {open && <span className="text-sm font-medium">Chế độ {darkMode ? "sáng" : "tối"}</span>}
        </button>
        <button className="w-full flex items-center justify-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 transition-all">
          <LogOut size={20} />
          {open && <span className="text-sm font-medium">Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
}