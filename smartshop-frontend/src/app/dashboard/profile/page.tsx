"use client";

export default function ProfilePage() {
    const profile = {
        name: typeof window !== "undefined" ? localStorage.getItem("username") ?? "User" : "",
        email: typeof window !== "undefined" ? localStorage.getItem("email") ?? "example@gmail.com" : "",
        role: typeof window !== "undefined" ? localStorage.getItem("role") ?? "USER" : "",
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Thông tin cá nhân</h1>

            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 max-w-2xl">
                {/* Avatar + info */}
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gray-300 border"></div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
                        <p className="text-gray-500">{profile.email}</p>

                        <span className="mt-2 inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                            {profile.role}
                        </span>
                    </div>
                </div>

                {/* Form */}
                <div className="mt-8 space-y-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="displayName" className="text-gray-600 text-sm">
                            Tên hiển thị
                        </label>
                        <input
                            id="displayName"
                            type="text"
                            defaultValue={profile.name}
                            placeholder="Nhập tên hiển thị..."
                            className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="text-gray-600 text-sm">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            defaultValue={profile.email}
                            placeholder="Nhập email..."
                            className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Update buttons */}
                    <button className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                        Cập nhật thông tin
                    </button>

                    <button className="w-full py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition">
                        Đổi mật khẩu
                    </button>
                </div>
            </div>
        </div>
    );
}
