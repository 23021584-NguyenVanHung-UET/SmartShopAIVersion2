"use client";

export default function UsersPage() {
    const users = [
        { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", role: "USER" },
        { id: 2, name: "Trần Thị B", email: "b@gmail.com", role: "ADMIN" },
        { id: 3, name: "Lê Văn C", email: "c@gmail.com", role: "USER" },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản lý người dùng</h1>

            <div className="bg-white p-6 shadow rounded-xl border border-gray-200">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b text-gray-600">
                            <th className="pb-3">ID</th>
                            <th className="pb-3">Tên</th>
                            <th className="pb-3">Email</th>
                            <th className="pb-3">Vai trò</th>
                            <th className="pb-3">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr
                                key={u.id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="py-3">{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                                        {u.role}
                                    </span>
                                </td>
                                <td>
                                    <button className="text-blue-600 hover:underline">
                                        Xem chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
