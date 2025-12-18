"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Search, Plus, Edit, Trash2, Eye, Package, ToggleLeft, ToggleRight, Filter, Image as ImageIcon, ChevronDown, XCircle } from "lucide-react";
import { productsApi, categoriesApi } from "@/lib/api";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState(""); // Local state for typing
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<string[]>(["all"]);
  const itemsPerPage = 6;

  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Product>>({});

  // Category creation states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryCreating, setCategoryCreating] = useState(false);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const cats = await categoriesApi.getAll() as any;
      const categoryNames = cats.map((c: any) => c.name);
      setCategories(["all", ...categoryNames]);
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Keep default categories if fetch fails
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products with search and filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use search endpoint with all filters
        const response = await productsApi.search(
          searchTerm,
          currentPage - 1,
          itemsPerPage,
          filterCategory,
          filterStatus
        ) as any;

        // Map backend response to frontend format
        const mappedProducts = response.content.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          category: p.category?.name || "Uncategorized",
          stock: p.stock,
          status: p.stock === 0 ? "out_of_stock" : p.status?.toLowerCase() || "active",
          image: p.imageUrl,
          createdAt: p.createdAt,
        }));

        setProducts(mappedProducts);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, searchTerm, filterCategory, filterStatus]);

  // Products are already filtered server-side, no need for client-side filtering
  const paginatedProducts = products;

  // Filter change handlers that reset pagination
  const handleCategoryChange = (value: string) => {
    setFilterCategory(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setFilterStatus(value);
    setCurrentPage(1);
  };

  const toggleStatus = async (id: number) => {
    try {
      const product = products.find(p => p.id === id);
      if (!product) return;

      const newStatus = product.status === "active" ? "inactive" : "active";
      await productsApi.update(id, { ...product, status: newStatus });

      // Optimistically update UI
      setProducts(products.map(p =>
        p.id === id ? { ...p, status: newStatus } : p
      ));
    } catch (err) {
      console.error('Error toggling product status:', err);
      alert('Failed to update product status');
    }
  };

  const deleteProduct = async (id: number) => {
    if (confirm("Xóa sản phẩm này? Hành động không thể hoàn tác!")) {
      try {
        await productsApi.delete(id);
        const updatedProducts = products.filter(p => p.id !== id);
        setProducts(updatedProducts);
        setTotalElements(totalElements - 1);

        // Refresh categories after deletion (in case unused categories were auto-deleted)
        await fetchCategories();

        alert('Product deleted successfully!');
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('Failed to delete product');
      }
    }
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setViewModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditFormData(product);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (selectedProduct && editFormData) {
      try {
        await productsApi.update(selectedProduct.id, editFormData);
        setProducts(products.map(p =>
          p.id === selectedProduct.id ? { ...p, ...editFormData } : p
        ));
        setEditModalOpen(false);
        setSelectedProduct(null);
        setEditFormData({});
      } catch (err) {
        console.error('Error updating product:', err);
        alert('Failed to update product');
      }
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      alert("Vui lòng nhập tên danh mục!");
      return;
    }

    try {
      setCategoryCreating(true);
      const newCategory = await categoriesApi.create(newCategoryName) as any;

      // Add to categories list
      setCategories([...categories, newCategory.name]);

      // Set as selected in form
      setEditFormData({ ...editFormData, category: newCategory.name });

      // Close modal and reset
      setShowCategoryModal(false);
      setNewCategoryName("");

      // Refresh categories list in case new category was created
      await fetchCategories();

      alert("Tạo danh mục thành công!");
    } catch (err: any) {
      console.error('Error creating category:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Không thể tạo danh mục';
      alert(`Lỗi: ${errorMessage}`);
    } finally {
      setCategoryCreating(false);
    }
  };

  const handleCreateProduct = async () => {
    console.log("handleCreateProduct triggered");
    console.log("Current Form Data:", editFormData);

    try {
      if (!editFormData.name) {
        alert("Vui lòng nhập tên sản phẩm!");
        return;
      }
      if (editFormData.price === undefined || editFormData.price === null) {
        alert("Vui lòng nhập giá sản phẩm!");
        return;
      }
      if (!editFormData.category) {
        alert("Vui lòng chọn danh mục!");
        return;
      }
      if (editFormData.stock === undefined || editFormData.stock === null) {
        // Default stock to 0 if not set, or alert. Let's default or just warn.
        // currently strict.
        alert("Vui lòng nhập số lượng tồn kho!");
        return;
      }

      console.log("Validation passed. Sending API request...");
      await productsApi.create(editFormData);
      console.log("API request success");

      alert("Thêm sản phẩm thành công!");

      // Refresh list
      const response = await productsApi.getAll(0, itemsPerPage) as any;
      setTotalElements(response.totalElements);
      window.location.reload();

    } catch (err: any) {
      console.error('Error creating product:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Unknown error';
      alert(`Failed to create product: ${errorMessage}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Đang tải sản phẩm...</p>
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Quản lý sản phẩm
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Tổng <span className="font-bold text-blue-600">{totalElements}</span> sản phẩm •{" "}
            <span className="text-emerald-600 font-medium">{products.filter(p => p.status === "active").length} đang bán</span>
          </p>
        </div>

        <button
          onClick={() => {
            setEditFormData({}); // Clear previous data
            setShowAddModal(true);
          }}
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
            placeholder="Tìm tên sản phẩm... (Nhấn Enter để tìm)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setSearchTerm(searchInput);
                setCurrentPage(1);
              }
            }}
            onBlur={() => {
              if (searchInput !== searchTerm) {
                setSearchTerm(searchInput);
                setCurrentPage(1);
              }
            }}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
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
          onChange={(e) => handleStatusChange(e.target.value)}
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
                        onClick={() => handleViewProduct(product)}
                        className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 transition"
                        title="Xem chi tiết"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEditProduct(product)}
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
              Hiển thị {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalElements)} / {totalElements}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
                Trước
              </button>

              {/* Smart pagination with ellipsis */}
              {(() => {
                const pages = [];
                const showEllipsisStart = currentPage > 3;
                const showEllipsisEnd = currentPage < totalPages - 2;

                // Always show first page
                pages.push(
                  <button
                    key={1}
                    onClick={() => setCurrentPage(1)}
                    className={`px-4 py-2 rounded-lg transition ${currentPage === 1
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}>
                    1
                  </button>
                );

                // Ellipsis after first page
                if (showEllipsisStart) {
                  pages.push(
                    <span key="ellipsis-start" className="px-2 text-gray-500">...</span>
                  );
                }

                // Show pages around current page
                const startPage = Math.max(2, currentPage - 1);
                const endPage = Math.min(totalPages - 1, currentPage + 1);

                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`px-4 py-2 rounded-lg transition ${currentPage === i
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}>
                      {i}
                    </button>
                  );
                }

                // Ellipsis before last page
                if (showEllipsisEnd) {
                  pages.push(
                    <span key="ellipsis-end" className="px-2 text-gray-500">...</span>
                  );
                }

                // Always show last page (if more than 1 page)
                if (totalPages > 1) {
                  pages.push(
                    <button
                      key={totalPages}
                      onClick={() => setCurrentPage(totalPages)}
                      className={`px-4 py-2 rounded-lg transition ${currentPage === totalPages
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}>
                      {totalPages}
                    </button>
                  );
                }

                return pages;
              })()}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Product Modal */}
      {viewModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setViewModalOpen(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Chi tiết sản phẩm</h2>
              <button onClick={() => setViewModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                <XCircle size={24} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tên sản phẩm</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">{selectedProduct.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Danh mục</p>
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mt-1">
                    {selectedProduct.category}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Trạng thái</p>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold mt-1 ${selectedProduct.status === "active"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                    : selectedProduct.status === "inactive"
                      ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }`}>
                    {selectedProduct.status === "active" ? "Đang bán" : selectedProduct.status === "inactive" ? "Tạm ẩn" : "Hết hàng"}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Giá bán</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedProduct.price.toLocaleString()} ₫</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tồn kho</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedProduct.stock} sản phẩm</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ngày tạo</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{new Date(selectedProduct.createdAt).toLocaleDateString("vi-VN")}</p>
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

      {/* Edit Product Modal */}
      {editModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setEditModalOpen(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Chỉnh sửa sản phẩm</h2>
              <button onClick={() => setEditModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                <XCircle size={24} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tên sản phẩm</label>
                  <input
                    type="text"
                    value={editFormData.name || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Giá (VND)</label>
                  <input
                    type="number"
                    value={editFormData.price || 0}
                    onChange={(e) => setEditFormData({ ...editFormData, price: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tồn kho</label>
                  <input
                    type="number"
                    value={editFormData.stock || 0}
                    onChange={(e) => setEditFormData({ ...editFormData, stock: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Danh mục</label>
                  <div className="flex gap-2">
                    <select
                      value={editFormData.category || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.filter(c => c !== "all").map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowCategoryModal(true)}
                      className="px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition flex items-center gap-2"
                      title="Tạo danh mục mới"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trạng thái</label>
                  <select
                    value={editFormData.status || 'active'}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  >
                    <option value="active">Đang bán</option>
                    <option value="inactive">Tạm ẩn</option>
                    <option value="out_of_stock">Hết hàng</option>
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

      {/* Modal Thêm sản phẩm */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Thêm sản phẩm mới</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tên sản phẩm <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="Nhập tên sản phẩm"
                    value={editFormData.name || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Giá (VND) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    placeholder="0"
                    value={editFormData.price || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, price: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tồn kho <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    placeholder="0"
                    value={editFormData.stock || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, stock: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Danh mục <span className="text-red-500">*</span></label>
                  <div className="flex gap-2">
                    <select
                      value={editFormData.category || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.filter(c => c !== "all").map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowCategoryModal(true)}
                      className="px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition flex items-center gap-2 shrink-0"
                      title="Tạo danh mục mới"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trạng thái</label>
                  <select
                    value={editFormData.status || 'active'}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  >
                    <option value="active">Đang bán</option>
                    <option value="inactive">Tạm ẩn</option>
                    <option value="out_of_stock">Hết hàng</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mô tả</label>
                  <textarea
                    rows={3}
                    placeholder="Mô tả sản phẩm..."
                    // Note: Product interface in this file doesn't have description, but backend does. 
                    // Use a temporary cast or just ignore for strict typing if needed, but best to add to interface.
                    // For now, let's assume mapping might ignore it if we don't fix the interface, but let's try.
                    // Actually, let's stick to core fields or add description to Product interface first?
                    // The backend DTO has description. Let's add it to the state.
                    // casting to any to avoid TS error quickly, or we update interface in next step.
                    value={(editFormData as any).description || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value } as any)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditFormData({});
                  }}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleCreateProduct}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition"
                >
                  Thêm sản phẩm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Creation Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setShowCategoryModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Tạo danh mục mới</h3>
              <button onClick={() => setShowCategoryModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                <XCircle size={24} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tên danh mục <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Ví dụ: Điện thoại, Laptop, Phụ kiện..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !categoryCreating) {
                      handleCreateCategory();
                    }
                  }}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Tên danh mục sẽ tự động tạo slug (đường dẫn thân thiện)
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowCategoryModal(false);
                  setNewCategoryName("");
                }}
                disabled={categoryCreating}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Hủy
              </button>
              <button
                onClick={handleCreateCategory}
                disabled={categoryCreating || !newCategoryName.trim()}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {categoryCreating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang tạo...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Tạo danh mục
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}