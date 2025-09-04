import axios from 'axios';
import { SearchResponse } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const productsApi = {
  search: async (query: string): Promise<SearchResponse> => {
    const response = await api.get(`/api/products/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/api/products');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  },
};

export default api;
