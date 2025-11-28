// components/dashboard/Header.tsx
"use client";
import { Bell, Search, User } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-12 pr-6 py-3 w-80 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-gray-800 dark:text-white">Admin Pro</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">admin@smartshop.ai</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}