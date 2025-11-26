"use client";

interface PaginationProps {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
    return (
        <div className="flex justify-center mt-6 gap-2">
            <button
                disabled={page === 1}
                onClick={() => onChange(page - 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
            >
                Prev
            </button>

            <span className="px-4 py-2 bg-blue-600 text-white rounded">
                {page} / {totalPages}
            </span>

            <button
                disabled={page === totalPages}
                onClick={() => onChange(page + 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
            >
                Next
            </button>
        </div>
    );
}
