// smartshop-frontend/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cấu hình hiện đại (Next.js 14/15+)
  reactCompiler: true,

  // Redirect admin đẹp như SaaS thật
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/admin/dashboard",
        permanent: true,
      },
      {
        source: "/dashboard/:path*",
        destination: "/admin/dashboard/:path*",
        permanent: true,
      },
    ];
  },

  // Hình ảnh từ backend hoặc bên ngoài
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

// BẮT BUỘC PHẢI CÓ DÒNG NÀY – KHÔNG ĐƯỢC DÙNG module.exports!
export default nextConfig;