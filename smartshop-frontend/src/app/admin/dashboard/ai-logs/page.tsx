"use client";
import { useState } from "react";

export default function AILogsPage() {
  const [logs] = useState([
    { id: 1, type: "Chat", user: "Nguyễn Văn A", time: "2025-11-28 10:00" },
    { id: 2, type: "Mô tả sản phẩm", user: "Trần Thị B", time: "2025-11-28 11:00" },
    { id: 3, type: "Gợi ý sản phẩm", user: "Nguyễn Văn A", time: "2025-11-28 12:00" },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Lịch sử truy vấn AI</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Loại</th>
              <th className="p-3 text-left">Người dùng</th>
              <th className="p-3 text-left">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(l => (
              <tr key={l.id} className="border-t">
                <td className="p-3">{l.id}</td>
                <td className="p-3">{l.type}</td>
                <td className="p-3">{l.user}</td>
                <td className="p-3">{l.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
