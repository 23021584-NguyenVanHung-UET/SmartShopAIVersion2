"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/shared/Footer";
import { getProfile, updateProfile } from "@/features/profile/services/profileService";
import { UpdateProfilePayload, UserProfile } from "@/features/profile/type";

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [form, setForm] = useState<UpdateProfilePayload>({
        name: "",
        email: "",
        phone: "",
        address: "",
        ward: "",
        district: "",
        city: "",
        postalCode: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        getProfile()
            .then((data) => {
                setProfile(data);
                setForm({
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    address: data.address || "",
                    ward: data.ward || "",
                    district: data.district || "",
                    city: data.city || "",
                    postalCode: data.postalCode || "",
                });
            })
            .catch(() => setMessage("Không tải được hồ sơ. Vui lòng đăng nhập."))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (key: keyof UpdateProfilePayload, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const updated = await updateProfile(form);
            setProfile(updated);
            setMessage("Đã lưu thông tin.");
        } catch (err: any) {
            const msg = err?.response?.data?.message || "Cập nhật thất bại.";
            setMessage(msg);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <main className="max-w-5xl mx-auto px-6 pt-24 pb-10">
                <h1 className="text-3xl font-bold mb-2">Hồ sơ cá nhân</h1>
                <p className="text-gray-600 mb-6">Cập nhật thông tin và địa chỉ giao hàng mặc định.</p>

                <div className="bg-white rounded-xl shadow p-6 space-y-4">
                    {loading ? (
                        <p>Đang tải...</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Họ tên</label>
                                    <input
                                        value={form.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        className="w-full border rounded-lg p-3"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        className="w-full border rounded-lg p-3"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                                    <input
                                        value={form.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                        className="w-full border rounded-lg p-3"
                                        required
                                        pattern="^[0-9+\\-\\s]{6,20}$"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Mã bưu chính</label>
                                    <input
                                        value={form.postalCode ?? ""}
                                        onChange={(e) => handleChange("postalCode", e.target.value)}
                                        className="w-full border rounded-lg p-3"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Địa chỉ</label>
                                    <input
                                        value={form.address}
                                        onChange={(e) => handleChange("address", e.target.value)}
                                        className="w-full border rounded-lg p-3"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phường/Xã</label>
                                    <input
                                        value={form.ward ?? ""}
                                        onChange={(e) => handleChange("ward", e.target.value)}
                                        className="w-full border rounded-lg p-3"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Quận/Huyện</label>
                                    <input
                                        value={form.district ?? ""}
                                        onChange={(e) => handleChange("district", e.target.value)}
                                        className="w-full border rounded-lg p-3"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tỉnh/Thành phố</label>
                                    <input
                                        value={form.city ?? ""}
                                        onChange={(e) => handleChange("city", e.target.value)}
                                        className="w-full border rounded-lg p-3"
                                    />
                                </div>
                            </div>

                            {message && (
                                <div className="text-sm text-green-600">{message}</div>
                            )}

                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
                            >
                                {saving ? "Đang lưu..." : "Lưu thay đổi"}
                            </button>
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
