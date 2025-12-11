export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryName?: string;
    categorySlug?: string;
    createdAt?: string;
}
