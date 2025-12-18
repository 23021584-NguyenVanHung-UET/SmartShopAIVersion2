// app/admin/dashboard/settings/page.tsx
"use client";

import { useState } from "react";
import {
  Settings,
  Bell,
  Lock,
  Globe,
  Database,
  Mail,
  Save,
  RefreshCw,
  Shield,
  Zap,
  Moon,
  Sun,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState("sk_live_************");

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      orders: true,
      promotions: false,
    },
    security: {
      twoFactor: true,
      sessionTimeout: 30,
      requirePasswordChange: false,
    },
    preferences: {
      language: "vi",
      timezone: "Asia/Ho_Chi_Minh",
      currency: "VND",
      darkMode: false,
    },
    system: {
      cacheEnabled: true,
      logRetention: 90,
      backupFrequency: "daily",
      maintenanceMode: false,
    },
  });

  const handleSave = () => {
    alert("Settings saved!");
  };

  const handleReset = () => {
    if (confirm("Bạn có chắc muốn reset về mặc định?")) {
      setSettings({
        notifications: {
          email: true,
          push: true,
          orders: true,
          promotions: false,
        },
        security: {
          twoFactor: true,
          sessionTimeout: 30,
          requirePasswordChange: false,
        },
        preferences: {
          language: "vi",
          timezone: "Asia/Ho_Chi_Minh",
          currency: "VND",
          darkMode: false,
        },
        system: {
          cacheEnabled: true,
          logRetention: 90,
          backupFrequency: "daily",
          maintenanceMode: false,
        },
      });
    }
  };

  const generateApiKey = () => {
    const newKey = `sk_live_${Math.random().toString(36).substr(2, 32)}`;
    setApiKey(newKey);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Cài đặt hệ thống
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Quản lý cài đặt ứng dụng và tùy chỉnh hệ thống
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Reset mặc định
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Save size={18} />
            Lưu thay đổi
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notifications Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Thông báo</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Quản lý thông báo hệ thống</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Email notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Nhận thông báo qua email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, email: e.target.checked }
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Push notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Thông báo trên trình duyệt</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, push: e.target.checked }
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Order updates</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cập nhật trạng thái đơn hàng</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.orders}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, orders: e.target.checked }
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
              <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Bảo mật</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Cài đặt bảo mật tài khoản</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Xác thực 2 yếu tố</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tăng cường bảo mật đăng nhập</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactor}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    security: { ...prev.security, twoFactor: e.target.checked }
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Thời gian hết phiên (phút)
              </label>
              <input
                type="range"
                min="5"
                max="120"
                value={settings.security.sessionTimeout}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
                }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span>5 phút</span>
                <span className="font-medium">{settings.security.sessionTimeout} phút</span>
                <span>120 phút</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Tùy chọn</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Cá nhân hóa trải nghiệm</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ngôn ngữ
              </label>
              <select
                value={settings.preferences.language}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, language: e.target.value }
                }))}
                className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
                <option value="jp">日本語</option>
                <option value="cn">中文</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Múi giờ
              </label>
              <select
                value={settings.preferences.timezone}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, timezone: e.target.value }
                }))}
                className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
              >
                <option value="Asia/Ho_Chi_Minh">Hồ Chí Minh (GMT+7)</option>
                <option value="Asia/Hanoi">Hà Nội (GMT+7)</option>
                <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                <option value="America/New_York">New York (GMT-5)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Đơn vị tiền tệ
              </label>
              <select
                value={settings.preferences.currency}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, currency: e.target.value }
                }))}
                className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
              >
                <option value="VND">🇻🇳 VND (₫)</option>
                <option value="USD">🇺🇸 USD ($)</option>
                <option value="EUR">🇪🇺 EUR (€)</option>
                <option value="JPY">🇯🇵 JPY (¥)</option>
              </select>
            </div>

            {/* Development Notice */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                    Đang phát triển
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Các tùy chọn này hiện chỉ mang tính chất hiển thị. Chức năng lưu trữ và áp dụng sẽ được bổ sung trong phiên bản tới.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* System Settings */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
              <Database className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Hệ thống</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Cấu hình hệ thống</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Bật cache</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cải thiện hiệu suất</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.system.cacheEnabled}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    system: { ...prev.system, cacheEnabled: e.target.checked }
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Lưu trữ log (ngày)
              </label>
              <select
                value={settings.system.logRetention}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  system: { ...prev.system, logRetention: parseInt(e.target.value) }
                }))}
                className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
              >
                <option value={30}>30 ngày</option>
                <option value={90}>90 ngày</option>
                <option value={180}>180 ngày</option>
                <option value={365}>1 năm</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tần suất backup
              </label>
              <select
                value={settings.system.backupFrequency}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  system: { ...prev.system, backupFrequency: e.target.value }
                }))}
                className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl"
              >
                <option value="daily">Hàng ngày</option>
                <option value="weekly">Hàng tuần</option>
                <option value="monthly">Hàng tháng</option>
              </select>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <p className="font-medium text-yellow-800 dark:text-yellow-300">Chế độ bảo trì</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  Tạm ngưng hệ thống để bảo trì
                </p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.system.maintenanceMode}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      system: { ...prev.system, maintenanceMode: e.target.checked }
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center text-sm text-gray-500 dark:text-gray-400 pt-8 border-t border-gray-200 dark:border-gray-700"
      >
        <p>Lưu ý: Các thay đổi có thể cần reload trang để có hiệu lực.</p>
      </motion.div>
    </div>
  );
}