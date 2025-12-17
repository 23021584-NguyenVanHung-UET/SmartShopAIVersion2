"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Search, Filter, Eye, Edit, Trash2, Package, Clock, CheckCircle, XCircle, TruckIcon } from "lucide-react";
import { ordersApi } from "@/lib/api";

interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: "PENDING" | "PROCESSING" | "SHIPPING" | "DELIVERED" | "CANCELLED";
  items: number;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Order>>({});

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = filterStatus !== "all"
          ? await ordersApi.search(filterStatus, currentPage - 1, itemsPerPage)
          : await ordersApi.getAll(currentPage - 1, itemsPerPage);

        const apiResponse = response as any;

        // Map backend response to frontend format
        const mappedOrders = apiResponse.content.map((o: any) => ({
          id: o.id,
          customerName: o.user?.name || "Unknown",
          customerEmail: o.user?.email || "N/A",
          totalAmount: o.totalAmount,
          status: o.status,
          items: o.orderItems?.length || 0,
          createdAt: o.createdAt,
        }));

        setOrders(mappedOrders);
        setTotalPages(apiResponse.totalPages);
        setTotalElements(apiResponse.totalElements);
      } catch (err: any) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage, filterStatus]);

  // Client-side search filtering
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm);
      return matchesSearch;
    });
  }, [orders, searchTerm]);

  const paginatedOrders = filteredOrders;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PENDING":
        return { bg: "bg-gray-100 dark:bg-gray-700", text: "text-gray-800 dark:text-gray-300", icon: Clock, label: "Chờ xử lý" };
      case "PROCESSING":
        return { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-800 dark:text-blue-300", icon: Package, label: "Đang xử lý" };
      case "SHIPPING":
        return { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-800 dark:text-yellow-300", icon: TruckIcon, label: "Đang giao" };
      case "DELIVERED":
        return { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-800 dark:text-emerald-300", icon: CheckCircle, label: "Đã giao" };
      case "CANCELLED":
        return { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-800 dark:text-red-300", icon: XCircle, label: "Đã hủy" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800", icon: Clock, label: status };
    }
  };

  const deleteOrder = async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
      try {
        await ordersApi.delete(id);
        setOrders(orders.filter(o => o.id !== id));
      } catch (err) {
        console.error('Error deleting order:', err);
        alert('Failed to delete order');
      }
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setViewModalOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setEditFormData(order);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (selectedOrder && editFormData) {
      try {
        // Update order status if changed
        // if (editFormData.status && editFormData.status !== selectedOrder.status) {
        //   await ordersApi.updateStatus(selectedOrder.id, editFormData.status);
        // }
        // Switch to generic update that handles all fields including status
        await ordersApi.update(selectedOrder.id, editFormData);

        setOrders(orders.map(o =>
          o.id === selectedOrder.id ? { ...o, ...editFormData } : o
        ));
        setEditModalOpen(false);
        setSelectedOrder(null);
        setEditFormData({});
      } catch (err) {
        console.error('Error updating order:', err);
        alert('Failed to update order');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Đang tải đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Quản lý đơn hàng
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Tổng cộng <span className="font-bold text-blue-600">{totalElements}</span> đơn hàng •{" "}
          <span className="text-green-600 font-medium">{orders.filter(o => o.status === "DELIVERED").length} đã giao</span>
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email, hoặc mã đơn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="PENDING">Chờ xử lý</option>
          <option value="PROCESSING">Đang xử lý</option>
          <option value="SHIPPING">Đang giao</option>
          <option value="DELIVERED">Đã giao</option>
          <option value="CANCELLED">Đã hủy</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Mã đơn</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Khách hàng</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Tổng tiền</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Sản phẩm</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Ngày đặt</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    Không tìm thấy đơn hàng nào
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => {
                  const statusConfig = getStatusConfig(order.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          #ORD{String(order.id).padStart(3, '0')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{order.customerName}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{order.customerEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800 dark:text-white">
                        {order.totalAmount.toLocaleString()} ₫
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {order.items} sản phẩm
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit ${statusConfig.bg} ${statusConfig.text}`}>
                          <StatusIcon size={14} />
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewOrder(order)}
                            className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 transition"
                            title="Xem chi tiết"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleEditOrder(order)}
                            className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 transition"
                            title="Chỉnh sửa"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 transition"
                            title="Xóa đơn hàng"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hiển thị {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredOrders.length)} trong tổng {filteredOrders.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Trước
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition ${currentPage === page
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

      {/* View Order Modal */}
      {viewModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setViewModalOpen(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Chi tiết đơn hàng #{String(selectedOrder.id).padStart(3, '0')}</h2>
              <button onClick={() => setViewModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                <XCircle size={24} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Khách hàng</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedOrder.customerName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedOrder.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Trạng thái</p>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusConfig(selectedOrder.status).bg} ${getStatusConfig(selectedOrder.status).text}`}>
                    {React.createElement(getStatusConfig(selectedOrder.status).icon, { size: 14 })}
                    {getStatusConfig(selectedOrder.status).label}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tổng tiền</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedOrder.totalAmount.toLocaleString()} ₫</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Số sản phẩm</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedOrder.items} sản phẩm</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ngày đặt</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{new Date(selectedOrder.createdAt).toLocaleDateString("vi-VN")}</p>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button onClick={() => setViewModalOpen(false)} className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {editModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setEditModalOpen(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Chỉnh sửa đơn hàng #{String(selectedOrder.id).padStart(3, '0')}</h2>
              <button onClick={() => setEditModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                <XCircle size={24} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tên khách hàng</label>
                  <input
                    type="text"
                    value={editFormData.customerName || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, customerName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={editFormData.customerEmail || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, customerEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tổng tiền (VND)</label>
                  <input
                    type="number"
                    value={editFormData.totalAmount || 0}
                    onChange={(e) => setEditFormData({ ...editFormData, totalAmount: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Số sản phẩm</label>
                  <input
                    type="number"
                    value={editFormData.items || 0}
                    onChange={(e) => setEditFormData({ ...editFormData, items: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trạng thái</label>
                  <select
                    value={editFormData.status || 'PENDING'}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  >
                    <option value="PENDING">Chờ xử lý</option>
                    <option value="PROCESSING">Đang xử lý</option>
                    <option value="SHIPPING">Đang giao</option>
                    <option value="DELIVERED">Đã giao</option>
                    <option value="CANCELLED">Đã hủy</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button onClick={() => setEditModalOpen(false)} className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  Hủy
                </button>
                <button onClick={handleSaveEdit} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition">
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}