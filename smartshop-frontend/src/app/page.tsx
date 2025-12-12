"use client";

import Link from "next/link";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/shared/Footer";

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main className="pt-[calc(var(--header-height)+16px)] lg:pt-[calc(var(--header-height)+22px)]">
        <section className="max-w-screen-2xl mx-auto px-6 py-16">
          <div className="grid gap-10 md:grid-cols-[1.1fr,0.9fr] items-center">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">SmartShop AI</p>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-foreground">
                Trợ lý AI cho người bán hàng hiện đại.
              </h1>
              <p className="text-lg text-muted-foreground">
                Tự động tư vấn, quản lý sản phẩm, viết nội dung. Tăng chuyển đổi và tiết kiệm thời gian cho cửa hàng của bạn.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/homepage"
                  className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-foreground/90"
                >
                  Bắt đầu mua sắm
                </Link>
                <Link
                  href="/solution"
                  className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-foreground"
                >
                  Xem giải pháp AI
                </Link>
              </div>
            </div>
            <div className="relative rounded-3xl border border-border bg-card p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.3)]">
              <div className="grid grid-cols-2 gap-4">
                {["Bán lẻ thời trang", "Điện tử gia dụng", "Mỹ phẩm làm đẹp", "Sản phẩm số"].map((label) => (
                  <div key={label} className="rounded-2xl border border-border/70 bg-muted/60 p-4 text-foreground">
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-xs text-muted-foreground mt-1">Gợi ý AI theo ngành hàng</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-foreground text-background p-5">
                <p className="text-sm uppercase tracking-[0.2em]">Ưu đãi</p>
                <p className="text-2xl font-semibold mt-2">Giảm đến 25% cho bộ sưu tập mới</p>
                <p className="text-sm text-background/80 mt-2">Giao nhanh 2H nội thành • Đổi trả 7 ngày nếu lỗi</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-screen-2xl mx-auto px-6 pb-16">
          <h2 className="text-3xl font-semibold text-foreground text-center">Tính năng nổi bật</h2>
          <p className="text-muted-foreground text-center mt-2">Mang trải nghiệm Shopify template vào SmartShop</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[
              { title: "Tư vấn AI", desc: "Phản hồi khách hàng tức thì, tăng tỷ lệ chốt đơn." },
              { title: "Quản lý sản phẩm", desc: "Đồng bộ tồn kho, giá và danh mục linh hoạt." },
              { title: "Nội dung bán hàng", desc: "Sinh mô tả, tiêu đề, banner quảng bá tự động." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <p className="text-lg font-semibold text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
