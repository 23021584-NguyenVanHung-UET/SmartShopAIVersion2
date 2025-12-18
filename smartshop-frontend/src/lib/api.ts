import axios from './axios';

// Type definitions for API responses
export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

// Dashboard API
export const dashboardApi = {
    getStats: async () => {
        const response = await axios.get('/admin/dashboard/stats');
        return response.data;
    },

    getRevenue: async (days: number = 7) => {
        const response = await axios.get(`/admin/dashboard/revenue?days=${days}`);
        return response.data;
    },

    getTopProducts: async (limit: number = 5) => {
        const response = await axios.get(`/admin/dashboard/top-products?limit=${limit}`);
        return response.data;
    },
};

// Users API
export const usersApi = {
    getAll: async (page: number = 0, size: number = 10) => {
        const response = await axios.get(`/admin/users?page=${page}&size=${size}`);
        return response.data;
    },

    getById: async (id: number) => {
        const response = await axios.get(`/admin/users/${id}`);
        return response.data;
    },

    create: async (user: any) => {
        const response = await axios.post('/admin/users', user);
        return response.data;
    },

    update: async (id: number, user: any) => {
        const response = await axios.put(`/admin/users/${id}`, user);
        return response.data;
    },

    delete: async (id: number) => {
        await axios.delete(`/admin/users/${id}`);
    },

    updateRole: async (id: number, role: string) => {
        const response = await axios.put(`/admin/users/${id}/role?role=${role}`);
        return response.data;
    },

    search: async (query: string, page: number = 0, size: number = 10) => {
        const response = await axios.get(`/admin/users/search?query=${query}&page=${page}&size=${size}`);
        return response.data;
    },
};

// Products API
export const productsApi = {
    getAll: async (page: number = 0, size: number = 10) => {
        const response = await axios.get(`/admin/products?page=${page}&size=${size}`);
        return response.data;
    },

    getById: async (id: number) => {
        const response = await axios.get(`/admin/products/${id}`);
        return response.data;
    },

    create: async (product: any) => {
        const response = await axios.post('/admin/products', product);
        return response.data;
    },

    update: async (id: number, product: any) => {
        const response = await axios.put(`/admin/products/${id}`, product);
        return response.data;
    },

    delete: async (id: number) => {
        await axios.delete(`/admin/products/${id}`);
    },

    search: async (query: string, page: number = 0, size: number = 10) => {
        const response = await axios.get(`/admin/products/search?query=${query}&page=${page}&size=${size}`);
        return response.data;
    },

    uploadImage: async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post('/admin/products/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};

// Orders API
export const ordersApi = {
    getAll: async (page: number = 0, size: number = 10) => {
        const response = await axios.get(`/admin/orders?page=${page}&size=${size}`);
        return response.data;
    },

    getById: async (id: number) => {
        const response = await axios.get(`/admin/orders/${id}`);
        return response.data;
    },

    updateStatus: async (id: number, status: string) => {
        const response = await axios.put(`/admin/orders/${id}/status?status=${status}`);
        return response.data;
    },

    update: async (id: number, order: any) => {
        const response = await axios.put(`/admin/orders/${id}`, order);
        return response.data;
    },

    delete: async (id: number) => {
        await axios.delete(`/admin/orders/${id}`);
    },

    search: async (status: string | null, page: number = 0, size: number = 10) => {
        const url = status
            ? `/admin/orders/search?status=${status}&page=${page}&size=${size}`
            : `/admin/orders/search?page=${page}&size=${size}`;
        const response = await axios.get(url);
        return response.data;
    },

    getStats: async () => {
        const response = await axios.get('/admin/orders/stats');
        return response.data;
    },
};

// Categories API
export const categoriesApi = {
    getAll: async () => {
        const response = await axios.get('/public/categories');
        return response.data;
    },
};
