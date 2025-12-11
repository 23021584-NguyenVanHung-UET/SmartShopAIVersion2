import axios from "@/lib/axios";
import { Category } from "../type";

export const getCategories = async (): Promise<Category[]> => {
    const res = await axios.get<Category[]>("/public/categories");
    return res.data;
};
