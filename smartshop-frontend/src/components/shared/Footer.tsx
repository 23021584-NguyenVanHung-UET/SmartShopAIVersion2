"use client";

export default function Footer() {
    return (
        <footer className="mt-16 bg-gray-900 text-gray-200 py-8">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">
                <div>
                    <h3 className="text-lg font-semibold">SmartShopAI</h3>
                    <p className="text-sm text-gray-400 mt-2">
                        Mua sắm thông minh, giao hàng nhanh chóng.
                    </p>
                </div>
                <div className="flex gap-8 text-sm">
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold text-white">Hỗ trợ</span>
                        <span>Trung tâm trợ giúp</span>
                        <span>Chính sách bảo hành</span>
                        <span>Liên hệ</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold text-white">Thông tin</span>
                        <span>Về chúng tôi</span>
                        <span>Blog</span>
                        <span>Điều khoản</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
