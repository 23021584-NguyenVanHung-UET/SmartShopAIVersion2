"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Package, ShoppingCart, Users, TrendingUp, Loader2, Eye, Clock, DollarSign } from "lucide-react";

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    // Giả lập loading
    setTimeout(() => setLoading(false), 1200);

    // Doanh thu 7 ngày gần nhất
    const revenueData = [
      { day: "T2", revenue: 850000, orders: 24 },
      { day: "T3", revenue: 1200000, orders: 38 },
      { day: "T4", revenue: 980000, orders: 31 },
      { day: "T5", revenue: 1450000, orders: 45 },
      { day: "T6", revenue: 1680000, orders: 52 },
      { day: "T7", revenue: 2100000, orders: 68 },
      { day: "CN", revenue: 1950000, orders: 61 },
    ];
    setChartData(revenueData);

    // Top 5 sản phẩm bán chạy
    const topProducts = [
      { name: "Áo thun Premium", value: 320, sales: "32tr" },
      { name: "Giày Sneaker Pro", value: 250, sales: "47tr" },
      { name: "Tai nghe Bluetooth", value: 180, sales: "28tr" },
      { name: "Đồng hồ thông minh", value: 140, sales: "35tr" },
      { name: "Túi xách da cao cấp", value: 110, sales: "22tr" },
    ];
    setPieData(topProducts);

    // Đơn hàng gần đây
    setRecentOrders([
      { id: "#DH001", customer: "Nguyễn Văn A", amount: "2,450,000", status: "Đã giao", time: "5 phút trước" },
      { id: "#DH002", customer: "Trần Thị B", amount: "890,000", status: "Đang xử lý", time: "12 phút trước" },
      { id: "#DH003", customer: "Lê Văn C", amount: "3,200,000", status: "Đã giao", time: "1 giờ trước" },
      { id: "#DH004", customer: "Phạm Thị D", amount: "567,000", status: "Hoàn tiền", time: "2 giờ trước" },
      { id: "#DH005", customer: "Hoàng Văn E", amount: "1,890,000", status: "Đang giao", time: "3 giờ trước" },
    ]);
  }, []);

  const stats = [
    { title: "Tổng sản phẩm", value: "128", icon: Package, color: "from-blue-500 to-cyan-500", change: "+12%" },
    { title: "Doanh thu hôm nay", value: "2,100,000", icon: DollarSign, color: "from-emerald-500 to-teal-500", change: "+28%" },
    { title: "Đơn hàng mới", value: "68", icon: ShoppingCart, color: "from-purple-500 to-pink-500", change: "+18%" },
    { title: "Người dùng mới", value: "24", icon: Users, color: "from-orange-500 to-red-500", change: "+42%" },
  ];

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Tiêu đề chào mừng */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Chào mừng trở lại, Admin! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Hôm nay là một ngày tuyệt vời để tăng trưởng doanh thu!</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">Thứ Hai</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">28 Tháng 11, 2025</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`} />
            <div className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                {stat.value.startsWith("2") || stat.value.includes("tr") ? stat.value : stat.value}
                {stat.value.includes("000") && !stat.value.includes("tr") && " ₫"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Doanh thu 7 ngày */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Doanh thu 7 ngày gần nhất</h3>
            <TrendingUp className="w-6 h-6 text-emerald-500" />
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
                formatter={(value: any) => `${Number(value).toLocaleString()} ₫`}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="url(#colorGradient)"
                strokeWidth={4}
                dot={{ fill: "#3b82f6", r: 6 }}
                activeDot={{ r: 8 }}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top sản phẩm */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Top sản phẩm bán chạy</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {pieData.slice(0, 5).map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-800 dark:text-white">{item.sales}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Đơn hàng gần đây */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Đơn hàng gần đây</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Mã đơn</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Khách hàng</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Giá trị</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Thời gian</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 font-medium text-blue-600">{order.id}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{order.customer}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800 dark:text-white">{order.amount} ₫</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${order.status === "Đã giao" ? "bg-emerald-100 text-emerald-800" :
                        order.status === "Đang xử lý" ? "bg-blue-100 text-blue-800" :
                        order.status === "Đang giao" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Clock size={14} />
                    {order.time}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 p-2 rounded-lg transition">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

// Skeleton Loading Component
function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl w-96" />
      <div className="grid grid-cols-4 gap-6">
        {[1,2,3,4].map((i) => (
          <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl col-span-2" />
        <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
      </div>
    </div>
  );
}