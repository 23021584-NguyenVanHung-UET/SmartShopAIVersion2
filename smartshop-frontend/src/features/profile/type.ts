export type UserProfile = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    ward?: string;
    district?: string;
    city?: string;
    postalCode?: string;
};

export type UpdateProfilePayload = {
    name: string;
    email: string;
    phone: string;
    address: string;
    ward?: string;
    district?: string;
    city?: string;
    postalCode?: string;
};
