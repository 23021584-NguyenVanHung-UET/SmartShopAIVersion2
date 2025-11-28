export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Chào mừng trở lại 👋
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card title="Tổng sản phẩm" value="128" />
                <Card title="Đơn hàng mới" value="32" />
                <Card title="Người dùng mới" value="12" />
            </div>
        </div>
    );
}

function Card({ title, value }: { title: string; value: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer">
            <p className="text-gray-500 text-sm">{title}</p>
            <h3 className="text-4xl font-bold text-blue-600 mt-2">{value}</h3>
        </div>
    );
}