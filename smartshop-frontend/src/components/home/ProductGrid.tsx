"use client";

const products = [
    { name: "Áo Hoodie Nam", price: "199,000₫" },
    { name: "Giày Thể Thao", price: "499,000₫" },
    { name: "Tai nghe gaming", price: "350,000₫" },
    { name: "Kem dưỡng da", price: "129,000₫" },
];

export default function ProductGrid() {
    return (
        <section className="max-w-7xl mx-auto px-6 mt-10 mb-20">
            <h2 className="text-xl font-bold mb-4">Sản phẩm nổi bật</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((p, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-4 rounded-xl shadow hover:scale-105 transition cursor-pointer"
                    >
                        <div className="h-36 bg-gray-200 rounded-xl"></div>
                        <p className="mt-3 font-semibold">{p.name}</p>
                        <p className="text-blue-600">{p.price}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
