"use client";
import { useState, useMemo } from "react";
import { Search, Plus, Edit, Trash2, Eye, Package, ToggleLeft, ToggleRight, Filter, Image as ImageIcon, ChevronDown } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  status: "active" | "inactive" | "out_of_stock";
  image?: string;
  createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Áo thun Premium Cotton", price: 299000, category: "Áo", stock: 156, status: "active", createdAt: "2025-03-15" },
    { id: 2, name: "Quần jeans Slim Fit", price: 799000, category: "Quần", stock: 0, status: "out_of_stock", createdAt: "2025-03-20" },
    { id: 3, name: "Giày Sneaker Pro 2025", price: 1599000, category: "Giày", stock: 42, status: "active", createdAt: "2025-04-01" },
    { id: 4, name: "Túi xách da thật", price: 2499000, category: "Phụ kiện", stock: 28, status: "active", createdAt: "2025-04-10" },
    { id: 5, name: "Đồng hồ thông minh X9", price: 5499000, category: "Điện tử", stock: 3, status: "active", createdAt: "2025-05-05" },
    { id: 6, name: "Mũ lưỡi trai cao cấp", price: 199000, category: "Phụ kiện", stock: 89, status: "inactive", createdAt: "2025-05-12" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Dữ liệu lọc
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "all" || p.category === filterCategory;
      const matchesStatus = filterStatus === "all" || p.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchTerm, filterCategory, filterStatus]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories = ["all", "Áo", "Quần", "Giày", "Phụ kiện", "Điện tử"];

  const toggleStatus = (id: number) => {
    setProducts(products.map(p =>
      p.id === id
        ? { ...p, status: p.status === "active" ? "inactive" : "active" }
        : p
    ));
  };

  const deleteProduct = (id: number) => {
    if (confirm("Xóa sản phẩm này? Hành động không thể hoàn tác!")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Quản lý sản phẩm
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Tổng <span className="font-bold text-blue-600">{products.length}</span> sản phẩm •{" "}
            <span className="text-emerald-600 font-medium">{products.filter(p => p.status === "active").length} đang bán</span>
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
        >
          <Plus size={20} />
          Thêm sản phẩm
        </button>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm tên sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none flex items-center gap-2"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === "all" ? "Tất cả danh mục" : cat}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Đang bán</option>
          <option value="inactive">Tạm ẩn</option>
          <option value="out_of_stock">Hết hàng</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Sản phẩm</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Danh mục</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Giá</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Tồn kho</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 flex items-center justify-center">
                        <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{product.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">ID: #{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800 dark:text-white">
                    {product.price.toLocaleString()} ₫
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${product.stock === 0 ? "text-red-600" : product.stock < 10 ? "text-yellow-600" : "text-gray-700 dark:text-gray-300"}`}>
                      {product.stock} sản phẩm
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit ${product.status === "active"
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                        : product.status === "inactive"
                          ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      }`}>
                      {product.status === "active" ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                      {product.status === "active" ? "Đang bán" : product.status === "inactive" ? "Tạm ẩn" : "Hết hàng"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => alert(`Xem chi tiết sản phẩm: ${product.name}`)}
                        className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 transition"
                        title="Xem chi tiết"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => alert(`Chỉnh sửa sản phẩm: ${product.name}`)}
                        className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 transition"
                        title="Chỉnh sửa"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => {
                          toggleStatus(product.id);
                          console.log(`Toggled status for product ${product.id}`);
                        }}
                        className={`p-2 rounded-lg transition ${product.status === "active"
                            ? "hover:bg-orange-50 dark:hover:bg-orange-900/30 text-orange-600"
                            : "hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-emerald-600"
                          }`}
                        title={product.status === "active" ? "Ẩn sản phẩm" : "Hiển thị sản phẩm"}
                      >
                        {product.status === "active" ? <ToggleLeft size={18} /> : <ToggleRight size={18} />}
                      </button>
                      <button
                        onClick={() => {
                          console.log(`Attempting to delete product ${product.id}`);
                          deleteProduct(product.id);
                        }}
                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 transition"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hiển thị {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredProducts.length)} / {filteredProducts.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Trước
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg transition ${currentPage === i + 1 ? "bg-blue-600 text-white" : "border hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Thêm sản phẩm (đơn giản) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Thêm sản phẩm mới</h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Form đơn giản */}
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Tên sản phẩm" className="px-4 py-3 rounded-xl border" />
                <input placeholder="Giá (VND)" type="number" className="px-4 py-3 rounded-xl border" />
                <select className="px-4 py-3 rounded-xl border">
                  <option>Chọn danh mục</option>
                  <option>Áo</option>
                  <option>Quần</option>
                </select>
                <input placeholder="Tồn kho" type="number" className="px-4 py-3 rounded-xl border" />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Hủy
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition"
                >
                  Thêm sản phẩm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}