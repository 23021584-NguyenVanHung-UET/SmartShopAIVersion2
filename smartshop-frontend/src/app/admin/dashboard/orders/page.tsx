"use client";
import { useState, useEffect, useMemo } from "react";
import { Search, Filter, MoreVertical, Edit, Trash2, Eye, UserCheck, UserX, Loader2 } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  active: boolean;
  createdAt: string;
  avatar?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Nguyễn Văn A", email: "admin@example.com", role: "ADMIN", active: true, createdAt: "2025-01-15" },
    { id: 2, name: "Trần Thị B", email: "b@example.com", role: "USER", active: true, createdAt: "2025-02-20" },
    { id: 3, name: "Lê Văn C", email: "c@example.com", role: "USER", active: false, createdAt: "2025-03-10" },
    { id: 4, name: "Phạm Thị D", email: "d@example.com", role: "USER", active: true, createdAt: "2025-04-05" },
    { id: 5, name: "Hoàng Văn E", email: "e@example.com", role: "USER", active: false, createdAt: "2025-05-12" },
    { id: 6, name: "Vũ Thị F", email: "f@example.com", role: "USER", active: true, createdAt: "2025-06-18" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Tìm kiếm + lọc
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || 
                          (filterStatus === "active" && user.active) || 
                          (filterStatus === "inactive" && !user.active);
      return matchesSearch && matchesStatus;
    });
  }, [users, searchTerm, filterStatus]);

  // Phân trang
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleActive = (id: number) => {
    setLoading(true);
    setTimeout(() => {
      setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
      setLoading(false);
    }, 500);
  };

  const deleteUser = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa người dùng này?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Quản lý người dùng
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Tổng cộng <span className="font-bold text-blue-600">{users.length}</span> người dùng •{" "}
          <span className="text-green-600 font-medium">{users.filter(u => u.active).length} hoạt động</span>
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Bị khóa</option>
          </select>

          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2">
            <UserCheck size={18} />
            Thêm người dùng
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Người dùng</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Vai trò</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Ngày tạo</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
                  </td>
                </tr>
              ) : paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    Không tìm thấy người dùng nào
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "ADMIN" 
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" 
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      }`}>
                        {user.role === "ADMIN" ? "Quản trị viên" : "Người dùng"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit ${
                        user.active 
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" 
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      }`}>
                        {user.active ? <UserCheck size={14} /> : <UserX size={14} />}
                        {user.active ? "Hoạt động" : "Bị khóa"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 transition">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 transition">
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => toggleActive(user.id)}
                          className={`p-2 rounded-lg transition ${
                            user.active 
                              ? "hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600" 
                              : "hover:bg-green-50 dark:hover:bg-green-900/30 text-green-600"
                          }`}
                        >
                          {user.active ? <UserX size={18} /> : <UserCheck size={18} />}
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hiển thị {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredUsers.length)} trong tổng {filteredUsers.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Trước
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}