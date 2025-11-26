"use client";

type Props = {
    onFilter: (min: number, max: number) => void;
};

export default function Filters({ onFilter }: Props) {
    return (
        <div className="flex gap-4 mt-6 items-center">

            {/* 🌟 Sorting */}
            <div>
                <label
                    htmlFor="price-sort"
                    className="sr-only"
                >
                    Sắp xếp giá
                </label>

                <select
                    id="price-sort"
                    className="border px-3 py-2 rounded"
                    onChange={(e) => {
                        const value = e.target.value;

                        if (value === "asc") onFilter(0, 999999999); // bạn chỉnh logic lại nếu cần
                        if (value === "desc") onFilter(0, 999999999);
                    }}
                >
                    <option value="">Mặc định</option>
                    <option value="asc">Giá tăng dần</option>
                    <option value="desc">Giá giảm dần</option>
                </select>
            </div>

            {/* 🌟 Search by price */}
            <div className="flex items-center gap-2">
                <label htmlFor="min-price" className="sr-only">
                    Giá thấp nhất
                </label>
                <input
                    id="min-price"
                    type="number"
                    placeholder="Giá min"
                    className="border px-3 py-2 rounded w-24"
                    onChange={() => { }}
                />

                <label htmlFor="max-price" className="sr-only">
                    Giá cao nhất
                </label>
                <input
                    id="max-price"
                    type="number"
                    placeholder="Giá max"
                    className="border px-3 py-2 rounded w-24"
                    onChange={() => { }}
                />
            </div>

        </div>
    );
}
