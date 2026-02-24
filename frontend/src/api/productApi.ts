import axios from 'axios';
import type { Product } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api/products';

export const productApi = {
    getAll: () => axios.get<Product[]>(API_URL),
    getById: (id: number) => axios.get<Product>(`${API_URL}/${id}`),
    create: (product: Product) => axios.post<Product>(API_URL, product),
    update: (id: number, product: Product) => axios.put<Product>(`${API_URL}/${id}`, product),
    delete: (id: number) => axios.delete(`${API_URL}/${id}`),
};
