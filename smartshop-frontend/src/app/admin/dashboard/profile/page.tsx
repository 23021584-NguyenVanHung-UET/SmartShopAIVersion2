// app/dashboard/profile/page.tsx
"use client";
import { useState } from "react";
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
  Shield
} from "lucide-react";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [user] = useState({
    name: "Nguyễn Văn An",
    email: "an@example.com",
    phone: "+84 987 654 321",
    address: "123 Đường ABC, Quận 1, TP. HCM",
    birthDate: "1990-05-15",
    role: "ADMIN" as const,
    avatar: "",
    bio: "Chuyên gia quản lý bán hàng với 10+ năm kinh nghiệm. Đam mê AI và automation."
  });

  const handleSave = () => {
    setEditing(false);
    // API call here
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Hồ sơ cá nhân</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Quản lý thông tin tài khoản của bạn</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>
            <Edit size={18} className="mr-2" />
            {editing ? "Hủy" : "Chỉnh sửa"}
          </Button>
          {editing && (
            <Button onClick={handleSave}>
              <Save size={18} className="mr-2" />
              Lưu thay đổi
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <div className="text-center pb-6">
            <div className="relative mx-auto mb-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 mx-auto">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                  <User className="w-20 h-20 text-blue-600" />
                </div>
              </div>
              {editing && (
                <button className="absolute -bottom-2 -right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <Camera size={20} className="text-gray-600" />
                </button>
              )}
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{user.name}</h2>
            <Badge variant={user.role === "ADMIN" ? "purple" : "success"} className="mb-4">
              {user.role === "ADMIN" ? "Quản trị viên" : "Người dùng"}
            </Badge>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">{user.bio}</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">{user.address}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Shield size={20} />
              Thông tin tài khoản
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Họ và tên</label>
                <input
                  type="text"
                  value={user.name}
                  disabled={!editing}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    editing ? "border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500" : "bg-gray-50 dark:bg-gray-800"
                  }`}
                />
                
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled={!editing}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    editing ? "border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500" : "bg-gray-50 dark:bg-gray-800"
                  }`}
                />
                
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Số điện thoại</label>
                <input
                  type="tel"
                  value={user.phone}
                  disabled={!editing}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    editing ? "border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500" : "bg-gray-50 dark:bg-gray-800"
                  }`}
                />
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Địa chỉ</label>
                <textarea
                  value={user.address}
                  disabled={!editing}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border resize-none ${
                    editing ? "border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500" : "bg-gray-50 dark:bg-gray-800"
                  }`}
                />
                
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ngày sinh</label>
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-gray-500" />
                  <input
                    type="date"
                    value={user.birthDate}
                    disabled={!editing}
                    className={`px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 ${
                      editing ? "border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500" : "bg-gray-50"
                    }`}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Activity & Security */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Hoạt động gần đây</h3>
              <div className="space-y-4">
                {[
                  { action: "Cập nhật sản phẩm", time: "2 giờ trước", icon: "📦" },
                  { action: "Thêm đơn hàng mới", time: "5 giờ trước", icon: "🛒" },
                  { action: "Đăng nhập", time: "Hôm qua", icon: "🔐" },
                  { action: "Cập nhật profile", time: "2 ngày trước", icon: "👤" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{item.action}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Bảo mật tài khoản</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Mật khẩu hiện tại</span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Đổi mật khẩu
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400">2FA (Xác thực 2 yếu tố)</span>
                  <Badge variant="success">Đã kích hoạt</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Phiên đăng nhập</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">1 thiết bị</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Delete Account */}
          <Card className="p-6 border-red-200 dark:border-red-800">
            <div className="flex items-center gap-3 mb-4">
              <Trash2 size={20} className="text-red-600" />
              <h3 className="text-xl font-bold text-red-800 dark:text-red-400">Xóa tài khoản</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Xóa tài khoản sẽ xóa toàn bộ dữ liệu của bạn. Hành động này không thể hoàn tác.
            </p>
            <Button variant="destructive" className="w-full">
              Xóa tài khoản vĩnh viễn
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}