import axios from "@/lib/axios";
import { CreateOrderPayload, Order } from "../type";

export const createOrder = async (payload: CreateOrderPayload): Promise<Order> => {
    const res = await axios.post<Order>("/public/orders", payload);
    return res.data;
};

export const getOrders = async (): Promise<Order[]> => {
    const res = await axios.get<Order[]>("/public/orders");
    return res.data;
};

export const getOrderById = async (id: number): Promise<Order> => {
    const res = await axios.get<Order>(`/public/orders/${id}`);
    return res.data;
};
