"use client";

export default function OrdersPage() {
    const orders = [
        { id: 101, customer: "Nguyễn Văn A", total: 350000, status: "Đang xử lý" },
        { id: 102, customer: "Trần Thị B", total: 790000, status: "Hoàn thành" },
        { id: 103, customer: "Lê Văn C", total: 120000, status: "Đã huỷ" },
    ];

    const statusColor = (status: string) => {
        switch (status) {
            case "Hoàn thành":
                return "bg-green-100 text-green-600";
            case "Đã huỷ":
                return "bg-red-100 text-red-600";
            default:
                return "bg-yellow-100 text-yellow-600";
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản lý đơn hàng</h1>

            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b text-gray-600">
                            <th className="pb-3">ID Đơn</th>
                            <th className="pb-3">Khách hàng</th>
                            <th className="pb-3">Tổng tiền</th>
                            <th className="pb-3">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o) => (
                            <tr key={o.id} className="border-b hover:bg-gray-50 transition">
                                <td className="py-3">{o.id}</td>
                                <td>{o.customer}</td>
                                <td>{o.total} đ</td>
                                <td>
                                    <span className={`px-3 py-1 rounded-full text-sm ${statusColor(o.status)}`}>
                                        {o.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
