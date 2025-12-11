import axios from "@/lib/axios";
import { Product } from "../type";

type ProductSort = "newest" | "priceAsc" | "priceDesc";

export interface ProductQuery {
    q?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    size?: number;
    sort?: ProductSort;
}

interface PagedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}

// Fetch products from public endpoint; return only the content array to keep old callers working.
export const getProducts = async (
    params: ProductQuery = {}
): Promise<Product[]> => {
    const res = await axios.get<PagedResponse<Product> | Product[]>("/public/products", { params });
    const data = res.data as any;
    return Array.isArray(data) ? data : data?.content ?? [];
};

export const getTrendingProducts = async (): Promise<Product[]> => {
    const res = await axios.get<Product[]>("/public/products/trending");
    return res.data;
};

export const getProductById = async (id: number): Promise<Product> => {
    const res = await axios.get<Product>(`/public/products/${id}`);
    return res.data;
};

export const createProduct = async (data: Product) => {
    const res = await axios.post("/admin/products", data);
    return res.data;
};

export const uploadImage = async (file: File) => {
    const form = new FormData();
    form.append("file", file);

    const res = await axios.post("/admin/products/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
};
