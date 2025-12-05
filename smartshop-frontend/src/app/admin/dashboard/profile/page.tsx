// app/dashboard/profile/page.tsx
"use client";
import { useState, useRef } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Edit, 
  Save, 
  Trash2,
  Calendar,
  Shield,
  Upload,
  X,
  Check,
  LogOut,
  Key,
  Lock,
  Eye,
  EyeOff,
  CreditCard,
  Globe,
  Bell,
  Moon,
  Sun
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [avatar, setAvatar] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [user, setUser] = useState({
    name: "Nguyễn Văn An",
    email: "an.nguyen@example.com",
    phone: "+84 987 654 321",
    address: "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
    birthDate: "1990-05-15",
    role: "ADMIN" as const,
    bio: "Chuyên gia quản lý bán hàng với 10+ năm kinh nghiệm. Đam mê công nghệ và automation.",
    company: "TechCorp Vietnam",
    position: "Head of Sales & Marketing",
    joinDate: "2018-03-01"
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    sessions: [
      { device: "MacBook Pro", location: "HCMC, Vietnam", active: true, lastActive: "Just now" },
      { device: "iPhone 13", location: "HCMC, Vietnam", active: false, lastActive: "2 hours ago" },
    ]
  });

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    setEditing(false);
    // API call here
  };

  const handleInputChange = (field: string, value: string) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const stats = [
    { label: "Tổng đơn hàng", value: "1,284", change: "+12.3%" },
    { label: "Doanh thu", value: "₫45.2M", change: "+28.5%" },
    { label: "Khách hàng", value: "842", change: "+8.7%" },
    { label: "Tỉ lệ hoàn thành", value: "98.2%", change: "+2.1%" },
  ];

  const activities = [
    { action: "Cập nhật thông tin sản phẩm", time: "2 giờ trước", icon: "📦", color: "from-blue-500 to-cyan-500" },
    { action: "Xử lý đơn hàng mới", time: "5 giờ trước", icon: "🛒", color: "from-emerald-500 to-teal-500" },
    { action: "Đăng nhập thành công", time: "Hôm qua", icon: "🔐", color: "from-purple-500 to-pink-500" },
    { action: "Cập nhật thông tin profile", time: "2 ngày trước", icon: "👤", color: "from-orange-500 to-red-500" },
    { action: "Xuất báo cáo doanh thu", time: "3 ngày trước", icon: "📊", color: "from-indigo-500 to-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Hồ sơ cá nhân
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Quản lý thông tin tài khoản và cài đặt của bạn
          </p>
        </motion.div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setEditing(!editing)}
            className={`px-5 py-3 rounded-xl font-medium transition-all ${
              editing 
                ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25"
            }`}
          >
            <div className="flex items-center gap-2">
              <Edit size={18} />
              {editing ? "Hủy chỉnh sửa" : "Chỉnh sửa profile"}
            </div>
          </button>
          {editing && (
            <button
              onClick={handleSave}
              className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2"
            >
              <Save size={18} />
              Lưu thay đổi
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 space-y-8"
        >
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="relative p-8 text-center">
              {/* Avatar Section */}
              <div className="relative inline-block group">
                <div 
                  className="w-40 h-40 rounded-2xl overflow-hidden cursor-pointer mx-auto border-4 border-white dark:border-gray-800 shadow-2xl"
                  onClick={editing ? triggerFileInput : undefined}
                >
                  {avatar ? (
                    <img 
                      src={avatar} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 flex items-center justify-center">
                      <User className="w-20 h-20 text-white" />
                    </div>
                  )}
                </div>
                
                {editing && (
                  <>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                      <Camera className="w-10 h-10 text-white" />
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <div className="absolute -bottom-2 -right-2">
                      <button
                        onClick={triggerFileInput}
                        className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        <Upload className="w-5 h-5" />
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* User Info */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{user.name}</h2>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                  <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="font-semibold text-purple-700 dark:text-purple-300">
                    {user.role === "ADMIN" ? "Quản trị viên" : "Người dùng"}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mt-4 mb-2">{user.bio}</p>
                
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  Tham gia từ {new Date(user.joinDate).toLocaleDateString('vi-VN')}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-800 dark:text-white">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                  <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Điện thoại</p>
                  <p className="font-medium text-gray-800 dark:text-white">{user.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                  <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Địa chỉ</p>
                  <p className="font-medium text-gray-800 dark:text-white">{user.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Thống kê hoạt động</h3>
            <div className="space-y-4">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                  <span className="text-gray-600 dark:text-gray-400">{stat.label}</span>
                  <div className="text-right">
                    <p className="font-bold text-gray-800 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">{stat.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column - Forms & Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Personal Information Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-8 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Thông tin cá nhân</h3>
              <p className="text-gray-600 dark:text-gray-400">Cập nhật thông tin cá nhân của bạn</p>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!editing}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all ${
                        editing 
                          ? "border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800"
                          : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!editing}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all ${
                        editing 
                          ? "border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800"
                          : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Công ty
                    </label>
                    <input
                      type="text"
                      value={user.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      disabled={!editing}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all ${
                        editing 
                          ? "border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800"
                          : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
                      }`}
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={user.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!editing}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all ${
                        editing 
                          ? "border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800"
                          : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Ngày sinh
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        value={user.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        disabled={!editing}
                        className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all ${
                          editing 
                            ? "border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800"
                            : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Chức vụ
                    </label>
                    <input
                      type="text"
                      value={user.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      disabled={!editing}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all ${
                        editing 
                          ? "border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800"
                          : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
                      }`}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Địa chỉ
                </label>
                <textarea
                  value={user.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!editing}
                  rows={3}
                  className={`w-full px-4 py-4 rounded-xl border-2 transition-all resize-none ${
                    editing 
                      ? "border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800"
                      : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
                  }`}
                />
              </div>
              
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Giới thiệu bản thân
                </label>
                <textarea
                  value={user.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!editing}
                  rows={4}
                  className={`w-full px-4 py-4 rounded-xl border-2 transition-all resize-none ${
                    editing 
                      ? "border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800"
                      : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
                  }`}
                  placeholder="Giới thiệu ngắn gọn về bản thân..."
                />
              </div>
            </div>
          </div>

          {/* Two Column Grid for Activities & Security */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activities */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Hoạt động gần đây</h3>
              </div>
              <div className="p-6 space-y-4">
                {activities.map((activity, i) => (
                  <div 
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${activity.color} text-white shadow-lg`}>
                      <span className="text-xl">{activity.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-3"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Bảo mật & Đăng nhập</h3>
              </div>
              <div className="p-6 space-y-6">
                {/* Change Password */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Đổi mật khẩu
                  </h4>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Mật khẩu hiện tại"
                      disabled={!editing}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <input
                    type="password"
                    placeholder="Mật khẩu mới"
                    disabled={!editing}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
                  />
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                    Cập nhật mật khẩu
                  </button>
                </div>

                {/* 2FA */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">Xác thực 2 yếu tố</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Tăng cường bảo mật đăng nhập</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={security.twoFactor}
                      onChange={(e) => setSecurity(prev => ({ ...prev, twoFactor: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                {/* Active Sessions */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Phiên đăng nhập hiện tại</h4>
                  {security.sessions.map((session, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${session.active ? 'bg-emerald-50 dark:bg-emerald-900/30' : 'bg-gray-50 dark:bg-gray-700/50'}`}>
                          <div className={`w-2 h-2 rounded-full ${session.active ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">{session.device}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{session.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm ${session.active ? 'text-emerald-600' : 'text-gray-500'}`}>
                          {session.active ? 'Đang hoạt động' : session.lastActive}
                        </p>
                        {!session.active && (
                          <button className="text-sm text-red-600 hover:text-red-700 mt-1">
                            Đăng xuất
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl shadow-xl border border-red-200 dark:border-red-800 overflow-hidden">
            <div className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-800 dark:text-red-400">Vùng nguy hiểm</h3>
                  <p className="text-red-600 dark:text-red-300 mt-2">
                    Xóa tài khoản sẽ xóa vĩnh viễn tất cả dữ liệu của bạn. Hành động này không thể hoàn tác.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="flex-1 px-6 py-4 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-3">
                  <Trash2 className="w-5 h-5" />
                  Xóa tài khoản vĩnh viễn
                </button>
                <button className="px-6 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  Đăng xuất tất cả thiết bị
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}