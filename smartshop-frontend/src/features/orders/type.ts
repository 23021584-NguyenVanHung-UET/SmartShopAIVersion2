export interface OrderItem {
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
}

export interface Order {
    id: number;
    status: string;
    paymentMethod: "COD" | "BANK_TRANSFER" | "VNPAY";
    paymentStatus: "PENDING" | "PAID";
    paymentCode?: string;
    totalAmount: number;
    createdAt: string;
    shippingName?: string;
    shippingPhone?: string;
    shippingAddress?: string;
    shippingWard?: string;
    shippingDistrict?: string;
    shippingCity?: string;
    shippingNote?: string;
    items: OrderItem[];
}

export interface CreateOrderPayload {
    items: {
        productId: number;
        quantity: number;
    }[];

    paymentMethod: "COD" | "VNPAY";
    shippingName: string;
    shippingPhone: string;
    shippingAddress: string;
    shippingWard: string;
    shippingDistrict: string;
    shippingCity: string;
    note?: string;
}
