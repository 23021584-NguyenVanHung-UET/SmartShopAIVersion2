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

export const getCurrentUser = async (): Promise<{ name: string; email: string; role: string }> => {
    const res = await axios.get<{ name: string; email: string; role: string }>("/auth/me");
    return res.data;
};
