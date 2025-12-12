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

export const confirmBankTransfer = async (orderId: number, code: string): Promise<Order> => {
    const res = await axios.get<Order>(`/public/payments/confirm`, {
        params: { orderId, code },
    });
    return res.data;
};

export const requestVnPayPayment = async (orderId: number, bankCode?: string) => {
    const res = await axios.post<{ paymentUrl: string; paymentCode: string; expireAt: string }>(
        "/public/payments/vnpay",
        { orderId, bankCode: bankCode || "" }
    );
    return res.data;
};
