"use client";

const flashProducts = [
    { name: "iPhone 14 Pro", price: "18,990,000₫", sale: "-20%" },
    { name: "AirPods Pro 2", price: "4,290,000₫", sale: "-15%" },
    { name: "Dép Adidas", price: "299,000₫", sale: "-50%" },
];

export default function FlashSale() {
    return (
        <section className="max-w-7xl mx-auto px-6 mt-10">
            <h2 className="text-xl font-bold mb-4 text-red-500">Flash Sale ⚡</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {flashProducts.map((p, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-4 rounded-xl shadow hover:scale-105 transition cursor-pointer"
                    >
                        <div className="h-32 bg-gray-200 rounded-xl"></div>
                        <p className="mt-2 font-semibold">{p.name}</p>
                        <p className="text-blue-600">{p.price}</p>
                        <span className="text-red-500 text-sm">{p.sale}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
