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

    const field = (
        key: keyof UpdateProfilePayload,
        label: string,
        type = "text",
        className = ""
    ) => (
        <div className={className}>
            <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
            <input
                type={type}
                value={(form as any)[key] ?? ""}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full rounded-lg border border-border bg-background p-3 text-sm focus:border-foreground"
                required={key === "name" || key === "email" || key === "phone" || key === "address"}
            />
        </div>
    );

    return (
        <div className="bg-background min-h-screen">
            <Navbar />
            <main className="max-w-6xl mx-auto px-6 pt-[calc(var(--header-height)+12px)] lg:pt-[calc(var(--header-height)+16px)] pb-16">
                <div className="flex flex-col gap-2 mb-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Hồ sơ</p>
                    <h1 className="text-3xl font-semibold text-foreground">Thông tin cá nhân</h1>
                    <p className="text-sm text-muted-foreground">Cập nhật thông tin và địa chỉ giao hàng mặc định.</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr] items-start">
                    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
                        {loading ? (
                            <p className="text-muted-foreground text-sm">Đang tải...</p>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {field("name", "Họ tên")}
                                    {field("email", "Email", "email")}
                                    {field("phone", "Số điện thoại")}
                                    {field("postalCode", "Mã bưu chính")}
                                    {field("address", "Địa chỉ", "text", "md:col-span-2")}
                                    {field("ward", "Phường/Xã")}
                                    {field("district", "Quận/Huyện")}
                                    {field("city", "Tỉnh/Thành phố")}
                                </div>

                                {message && (
                                    <div className={`text-sm ${message.includes("Đã lưu") ? "text-foreground" : "text-destructive"}`}>
                                        {message}
                                    </div>
                                )}

                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="w-full rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background hover:bg-foreground/90 disabled:opacity-60"
                                >
                                    {saving ? "Đang lưu..." : "Lưu thay đổi"}
                                </button>
                            </>
                        )}
                    </section>

                    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
                        <h2 className="text-lg font-semibold text-foreground">Tóm tắt tài khoản</h2>
                        <div className="space-y-3 text-sm text-muted-foreground">
                            <div className="flex justify-between">
                                <span>Họ tên</span>
                                <span className="font-semibold text-foreground">{profile?.name || "—"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Email</span>
                                <span className="font-semibold text-foreground">{profile?.email || "—"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Điện thoại</span>
                                <span className="font-semibold text-foreground">{profile?.phone || "—"}</span>
                            </div>
                        </div>
                        <div className="rounded-xl border border-border/70 bg-muted/50 p-4 text-sm">
                            <p className="text-foreground font-semibold mb-1">Địa chỉ giao hàng mặc định</p>
                            <p className="text-muted-foreground">
                                {profile?.address || "Chưa cập nhật"}, {profile?.ward} {profile?.district} {profile?.city}
                            </p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Lưu ý: Địa chỉ này sẽ tự động điền trong bước thanh toán. Bạn có thể thay đổi khi đặt đơn.
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
