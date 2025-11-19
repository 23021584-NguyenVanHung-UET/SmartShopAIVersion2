"use client";

const categories = [
    { name: "Điện thoại", icon: "📱" },
    { name: "Laptop", icon: "💻" },
    { name: "Thời trang", icon: "👗" },
    { name: "Mỹ phẩm", icon: "💄" },
    { name: "Đồ gia dụng", icon: "🏠" },
    { name: "Thú cưng", icon: "🐶" },
    { name: "Đồng hồ", icon: "⌚" },
    { name: "Balo", icon: "🎒" },
    { name: "Giày dép", icon: "👟" },
    { name: "Sức khỏe", icon: "💊" },
    { name: "Thể thao", icon: "🏀" },
    { name: "Khác", icon: "✨" },
];

export default function Categories() {
    return (
        <section className="max-w-7xl mx-auto px-6 mt-10">
            <h2 className="text-xl font-bold mb-4">Danh mục</h2>

            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {categories.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col items-center bg-white p-3 rounded-xl shadow hover:scale-105 transition cursor-pointer"
                    >
                        <div className="text-3xl">{item.icon}</div>
                        <p className="text-sm mt-2">{item.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
