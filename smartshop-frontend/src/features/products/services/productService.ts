import axios from "@/lib/axios";
import { Product } from "../type";

export const getProducts = async (): Promise<Product[]> => {
    const res = await axios.get<Product[]>("/public/products");
    return res.data;
};

export const getTrendingProducts = async (): Promise<Product[]> => {
    const res = await axios.get<Product[]>("/public/products/trending");
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
