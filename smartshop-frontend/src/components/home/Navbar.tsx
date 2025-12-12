"use client";

import { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, Menu, User2, LogOut, Sparkles } from "lucide-react";
import { useCart } from "@/features/cart/hooks/useCart";
import { getCategories } from "@/features/categories/services/categoryService";
import { Category } from "@/features/categories/type";

type User = {
    name: string;
    email: string;
};

type NavbarProps = {
    onSearch?: (keyword: string) => void; // 👈 FIX
};

export default function Navbar({ onSearch }: NavbarProps) {
    const { cart } = useCart();
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const [user, setUser] = useState<User | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchText, setSearchText] = useState("");
    const router = useRouter();

    // 🔥 Load user từ JWT: GET /auth/me
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/auth/me", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    // Token expired or invalid - silently clear
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    return;
                }

                const data = await res.json();

                startTransition(() => {
                    setUser({
                        name: data.name,
                        email: data.email,
                    });
                });

                localStorage.setItem("user", JSON.stringify(data));
            } catch (error) {
                // Silently handle fetch errors (e.g., network issues, CORS)
                // Don't log to console to avoid cluttering
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        getCategories()
            .then((cats) => {
                const preferredOrder = ["dien-thoai", "laptop", "giay-dep", "thoi-trang", "my-pham", "do-gia-dung", "dong-ho", "khac"];
                const sorted = [...cats].sort((a, b) => {
                    const aIdx = preferredOrder.indexOf(a.slug);
                    const bIdx = preferredOrder.indexOf(b.slug);
                    const aScore = aIdx === -1 ? Number.MAX_SAFE_INTEGER : aIdx;
                    const bScore = bIdx === -1 ? Number.MAX_SAFE_INTEGER : bIdx;
                    return aScore - bScore;
                });
                // Avoid showing legacy slugs that have ít/no product by de-duping aliases.
                const aliasMap: Record<string, string> = { giay: "giay-dep", "phu-kien": "khac", "dien-tu": "dien-thoai" };
                const unique: Category[] = [];
                const seen = new Set<string>();
                for (const cat of sorted) {
                    const normalized = aliasMap[cat.slug] ?? cat.slug;
                    if (seen.has(normalized)) continue;
                    seen.add(normalized);
                    unique.push({ ...cat, slug: normalized });
                }
                setCategories(unique);
            })
            .catch(() => setCategories([]));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/auth/login";
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const keyword = searchText.trim();
        if (onSearch) {
            onSearch(keyword);
        }
        router.push(`/search?q=${encodeURIComponent(keyword)}`);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 border-b border-border/60 bg-white/80 backdrop-blur">
            <div className="bg-primary text-primary-foreground text-sm">
                <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 py-2">
                    <div className="flex items-center gap-2">
                        <Sparkles size={16} />
                        <span>Freeship toàn quốc cho đơn từ 499.000đ</span>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/homepage" className="hover:underline">Ưu đãi hôm nay</Link>
                        <Link href="/orders" className="hover:underline">Đơn của tôi</Link>
                    </div>
                </div>
            </div>

            <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center gap-4">
                <button className="md:hidden p-2 rounded-lg border border-border text-foreground">
                    <Menu size={20} />
                </button>

                <Link href="/homepage" className="text-2xl font-semibold tracking-tight text-foreground">
                    SmartShop
                </Link>

                <form className="flex-1 hidden md:flex" onSubmit={handleSearchSubmit}>
                    <div className="flex w-full items-center gap-3 rounded-full border border-border bg-muted/70 px-4 py-2 focus-within:ring-2 focus-within:ring-primary/40">
                        <Search size={18} className="text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm, danh mục hoặc thương hiệu..."
                            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="hidden md:inline-flex items-center justify-center rounded-full bg-foreground p-2 text-background hover:bg-foreground/90"
                            aria-label="Tìm kiếm"
                        >
                            <Search size={16} />
                        </button>
                    </div>
                </form>

                <div className="flex items-center gap-3">
                    {!user ? (
                        <div className="hidden md:flex items-center gap-2">
                            <Link
                                href="/auth/login"
                                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-foreground"
                            >
                                <User2 size={16} />
                                Đăng nhập
                            </Link>
                            <Link
                                href="/auth/register"
                                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-foreground/90"
                            >
                                Bắt đầu
                            </Link>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center gap-3 rounded-full border border-border px-3 py-1.5">
                            <div className="text-sm leading-tight">
                                <p className="text-muted-foreground">Xin chào</p>
                                <p className="font-semibold text-foreground">{user.name}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/profile"
                                    className="text-sm font-medium text-primary hover:underline"
                                >
                                    Hồ sơ
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center gap-1 text-sm text-destructive hover:underline"
                                >
                                    <LogOut size={14} />
                                    Thoát
                                </button>
                            </div>
                        </div>
                    )}

                    <Link
                        href="/cart"
                        className="relative inline-flex items-center justify-center rounded-full border border-border p-2 hover:border-foreground"
                    >
                        <ShoppingCart size={22} className="text-foreground" />
                        <span className="absolute -top-2 -right-2 min-w-[22px] rounded-full bg-destructive px-2 py-0.5 text-center text-xs font-semibold text-white">
                            {cartCount}
                        </span>
                    </Link>
                </div>
            </div>

            <div className="hidden md:block border-t border-border/60">
                <div className="max-w-screen-2xl mx-auto px-6 py-3 flex items-center gap-4 text-sm text-muted-foreground overflow-x-auto no-scrollbar">
                    <Link href="/homepage" className="hover:text-foreground">Trang chủ</Link>
                    {categories.slice(0, 6).map((c) => (
                        <Link key={c.id} href={`/category/${c.slug}`} className="hover:text-foreground">
                            {c.name}
                        </Link>
                    ))}
                    {categories.length > 6 && (
                        <Link href="/category/all" className="hover:text-foreground">Xem tất cả</Link>
                    )}
                </div>
            </div>
        </header>
    );
}
