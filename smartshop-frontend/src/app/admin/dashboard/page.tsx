"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Eye,
  Clock,
  DollarSign,
  Upload,
  Camera,
  Settings,
  Bell,
  Search,
  ChevronDown,
  Calendar,
  Download,
  Filter,
  MoreVertical,
  LogOut
} from "lucide-react";
import { dashboardApi, ordersApi } from "@/lib/api";
const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#ef4444"];

// Helper function to convert ISO date to relative time
function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch dashboard statistics
        const statsData = await dashboardApi.getStats();

        // Fetch revenue data for last 7 days
        const revenueData = await dashboardApi.getRevenue(7) as any[];
        setChartData(revenueData.length > 0 ? revenueData : [
          { date: "Mon", revenue: 0, orders: 0 },
          { date: "Tue", revenue: 0, orders: 0 },
          { date: "Wed", revenue: 0, orders: 0 },
          { date: "Thu", revenue: 0, orders: 0 },
          { date: "Fri", revenue: 0, orders: 0 },
          { date: "Sat", revenue: 0, orders: 0 },
          { date: "Sun", revenue: 0, orders: 0 },
        ]);
        // Fetch top products
        const topProducts = await dashboardApi.getTopProducts(6) as any[];
        setPieData(topProducts.length > 0 ? topProducts : []);
        // Fetch recent orders (first page, 7 items)
        const ordersResponse = await ordersApi.getAll(0, 7) as any;
        const orders = ordersResponse.content || [];

        // Transform orders to match UI format
        const transformedOrders = orders.map((order: any) => ({
          id: `#ORD${String(order.id).padStart(3, '0')}`,
          customer: order.user?.name || 'Unknown',
          amount: order.totalAmount?.toLocaleString() || '0',
          status: order.status?.toLowerCase() || 'pending',
          time: getRelativeTime(order.createdAt),
          items: order.orderItems?.length || 0
        }));

        setRecentOrders(transformedOrders);
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        // Fallback to mock data on error
        setTimeout(() => setLoading(false), 1200);
        // Keep existing mock data
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const getRelativeTime = (dateString: string) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    return `${diffDays} ngày trước`;
  };

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

  const stats = [
    {
      title: "Total Revenue",
      value: "45.2M",
      icon: DollarSign,
      color: "from-emerald-500 to-teal-500",
      change: "+28.5%",
      trend: "up"
    },
    {
      title: "Total Orders",
      value: "1,284",
      icon: ShoppingCart,
      color: "from-blue-500 to-cyan-500",
      change: "+12.3%",
      trend: "up"
    },
    {
      title: "Active Users",
      value: "5,842",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      change: "+18.7%",
      trend: "up"
    },
    {
      title: "Products",
      value: "128",
      icon: Package,
      color: "from-orange-500 to-red-500",
      change: "+8.2%",
      trend: "up"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" };
      case "processing": return { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" };
      case "shipping": return { bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" };
      case "refunded": return { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" };
      case "pending": return { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-500" };
      default: return { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-500" };
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders, customers, products..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-6">
          <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <Settings className="w-6 h-6" />
          </button>

          {/* User Profile with Avatar Upload */}
          <div className="relative">
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="relative group">
                <div className="w-12 h-12 rounded-2xl overflow-hidden cursor-pointer" onClick={triggerFileInput}>
                  {avatar ? (
                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      A
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarUpload}
                  accept="image/*"
                  className="hidden"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="hidden md:block">
                <p className="font-semibold text-gray-800 dark:text-white">Admin User</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">admin@example.com</p>
              </div>

              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center gap-3"
                >
                  <LogOut size={16} />
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Welcome Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome back, Admin! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Here's what's happening with your store today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">This Week</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
              <Download className="w-5 h-5" />
              <span className="font-medium">Export</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
            <div className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${stat.trend === 'up'
                  ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400'
                  : 'text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                  <TrendingUp className={`w-4 h-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Revenue Overview</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Last 7 days performance</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    padding: '16px',
                  }}
                  formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, 'Revenue']}
                  labelFormatter={(label) => `Day: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="url(#colorRevenue)"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 4, strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="url(#colorOrders)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Top Products</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Best selling items</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View all
            </button>
          </div>

          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                      stroke="#fff"
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} units`, name]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {pieData.slice(0, 4).map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800 dark:text-white">{item.sales}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.value} units</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Recent Orders</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Latest customer orders</p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2">
            <Eye className="w-4 h-4" />
            View all orders
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentOrders.map((order) => {
                const statusColor = getStatusColor(order.status);
                return (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                          {order.customer.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{order.items} items</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-800 dark:text-white">{order.amount} ₫</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${statusColor.bg} ${statusColor.text}`}>
                        <div className={`w-2 h-2 rounded-full ${statusColor.dot}`}></div>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        {order.time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Showing <span className="font-semibold">7</span> of <span className="font-semibold">284</span> orders
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              1
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              2
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              3
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Skeleton Loading Component
function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl w-96"></div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
        </div>
      </div>

      <div className="mb-8">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-2xl w-64 mb-2"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-2xl w-96"></div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl col-span-2"></div>
        <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
      </div>

      <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
    </div>
  );
}