"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-900"
        >
          SmartShopAI – Trợ lý AI cho Người bán hàng
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-gray-600 text-lg md:text-xl max-w-2xl mt-4"
        >
          Tự động hóa tư vấn khách hàng, quản lý sản phẩm và viết nội dung bán hàng bằng AI.
          Nhanh hơn – Chính xác hơn – Tiết kiệm hơn.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-10 flex gap-4"
        >
          <Link
            href="/homepage"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"
          >
            Bắt đầu ngay
          </Link>

          <Link
            href="/dashboard"
            className="px-6 py-3 bg-white text-blue-600 border border-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition"
          >
            Xem Dashboard
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Tính năng nổi bật
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          <FeatureCard
            title="Tư vấn khách hàng bằng AI"
            desc="AI tự động trả lời nhanh chóng, tăng tỷ lệ chuyển đổi và giữ khách ở lại."
          />
          <FeatureCard
            title="Quản lý sản phẩm thông minh"
            desc="Theo dõi tồn kho, cập nhật giá, đồng bộ sản phẩm giữa các nền tảng."
          />
          <FeatureCard
            title="Viết nội dung bán hàng"
            desc="Sinh mô tả sản phẩm, bài viết và tiêu đề hấp dẫn bằng AI."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 border-t">
        © {new Date().getFullYear()} SmartShopAI – All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white p-6 rounded-2xl shadow border border-gray-200"
    >
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-3">{desc}</p>
    </motion.div>
  );
}
