import axios from "@/lib/axios";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    token?: string;
    name?: string;
    email?: string;
    role?: string;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface ResetPasswordPayload {
    token: string;
    newPassword: string;
}

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
    const res = await axios.post<AuthResponse>("/auth/login", payload);
    return res.data;
};

export const register = async (payload: RegisterPayload): Promise<{ message: string }> => {
    const res = await axios.post<{ message: string }>("/auth/register", payload);
    return res.data;
};

export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<{ token?: string; message?: string }> => {
    const res = await axios.post<{ token?: string; message?: string }>("/auth/forgot-password", payload);
    return res.data;
};

export const resetPassword = async (payload: ResetPasswordPayload): Promise<{ message: string }> => {
    const res = await axios.post<{ message: string }>("/auth/reset-password", payload);
    return res.data;
};

export interface UpdateProfilePayload {
    name?: string;
    phone?: string;
    address?: string;
    city?: string;
    district?: string;
    ward?: string;
    bio?: string;
}

export const updateProfile = async (payload: UpdateProfilePayload): Promise<UserProfileResponse> => {
    const res = await axios.put<UserProfileResponse>("/auth/profile", payload);
    return res.data;
};

export interface UserProfileResponse {
    name: string;
    email: string;
    role: string;
    phone?: string;
    address?: string;
    city?: string;
    district?: string;
    ward?: string;
}

export const getCurrentUser = async (): Promise<UserProfileResponse> => {
    const res = await axios.get<UserProfileResponse>("/auth/me");
    return res.data;
};
