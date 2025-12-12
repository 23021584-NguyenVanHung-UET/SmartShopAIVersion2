"use client";

export default function Footer() {
    return (
        <footer className="mt-16 border-t border-border/60 bg-foreground text-background">
            <div className="max-w-screen-2xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
                <div className="space-y-3">
                    <h3 className="text-xl font-semibold">SmartShop</h3>
                    <p className="text-sm text-background/80">
                        Mua sắm thông minh, giao hàng nhanh, giá tốt mỗi ngày.
                    </p>
                </div>
                <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-wide">Hỗ trợ</p>
                    <ul className="space-y-2 text-sm text-background/80">
                        <li>Trung tâm trợ giúp</li>
                        <li>Chính sách bảo hành</li>
                        <li>Liên hệ trực tuyến</li>
                    </ul>
                </div>
                <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-wide">Thông tin</p>
                    <ul className="space-y-2 text-sm text-background/80">
                        <li>Về SmartShop</li>
                        <li>Blog cảm hứng</li>
                        <li>Điều khoản & bảo mật</li>
                    </ul>
                </div>
                <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-wide">Đăng ký nhận tin</p>
                    <p className="text-sm text-background/80">
                        Nhận thông báo ưu đãi và gợi ý sản phẩm mỗi tuần.
                    </p>
                    <div className="flex items-center gap-2 rounded-full bg-background px-3 py-2 text-foreground">
                        <input
                            type="email"
                            placeholder="Nhập email của bạn"
                            className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/50"
                        />
                        <button className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-foreground/90">
                            Đăng ký
                        </button>
                    </div>
                </div>
            </div>
            <div className="border-t border-border/40 bg-foreground">
                <div className="max-w-screen-2xl mx-auto px-6 py-4 text-xs text-background/70 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p>© {new Date().getFullYear()} SmartShop. Tất cả quyền được bảo lưu.</p>
                    <p>Thanh toán an toàn • Giao nhanh 2H nội thành</p>
                </div>
            </div>
        </footer>
    );
}
