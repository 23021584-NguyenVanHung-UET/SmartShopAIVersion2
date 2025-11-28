// src/app/api/admin/dashboard/stats/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Dữ liệu giả – frontend sẽ hiển thị đẹp y như thật
  return NextResponse.json({
    totalProducts: 128,
    todayRevenue: "2,100,000 ₫",
    newOrders: 68,
    newUsers: 24,
    productsChange: "+12%",
    revenueChange: "+28%",
    ordersChange: "+18%",
    usersChange: "+42%",
  });
}