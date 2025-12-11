export interface OrderItem {
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
}

export interface Order {
    id: number;
    status: string;
    totalAmount: number;
    createdAt: string;
    items: OrderItem[];
}

export interface CreateOrderPayload {
    items: {
        productId: number;
        quantity: number;
    }[];
}
