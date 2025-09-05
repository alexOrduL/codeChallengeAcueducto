import axios, { AxiosError } from 'axios';
import { SearchResponse } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const API_VERSION = 'v1';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
  timeout: 30000, // 30 segundos para coincidir con el backend
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// 🔒 Interceptor para manejo de errores mejorado
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // 🔒 Manejo específico de rate limiting
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      
      return Promise.reject({
        ...error,
        message: `Demasiadas peticiones. Intenta nuevamente en ${retryAfter || '60'} segundos.`,
        isRateLimit: true,
      });
    }

    // 🔒 Manejo de errores de seguridad
    if (error.response?.status === 403) {
      return Promise.reject({
        ...error,
        message: 'Acceso denegado. Verifica tus permisos.',
        isSecurityError: true,
      });
    }

    return Promise.reject(error);
  }
);

// 🔒 Interceptor para añadir headers de seguridad en requests
api.interceptors.request.use(
  (config) => {
    // Añadir timestamp para tracking
    config.headers['X-Request-ID'] = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const productsApi = {
  /**
   * 🔍 Buscar productos con manejo de rate limiting
   */
  search: async (query: string): Promise<SearchResponse> => {
    try {
      const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
      
      
      return response.data;
    } catch (error: any) {
      // Re-throw con información adicional para rate limiting
      if (error.isRateLimit) {
        throw new Error(`Rate limit: ${error.message}`);
      }
      throw error;
    }
  },

  /**
   * 📋 Obtener todos los productos
   */
  getAll: async () => {
    try {
      const response = await api.get('/products');
      
      // El backend ahora retorna { data: Product[], meta: {...} }
      if (response.data.data) {
        return response.data.data; // Extraer solo los productos para compatibilidad
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * 🎯 Obtener producto por ID
   */
  getById: async (id: number) => {
    try {
      const response = await api.get(`/products/${id}`);
      
      // El backend ahora retorna { data: Product, meta: {...} }
      if (response.data.data) {
        return response.data.data; // Extraer solo el producto para compatibilidad
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// 🔒 Función helper para manejar errores de API
export const handleApiError = (error: any): string => {
  if (error.isRateLimit) {
    return 'Demasiadas peticiones. Por favor, espera un momento antes de intentar nuevamente.';
  }
  
  if (error.isSecurityError) {
    return 'Error de seguridad. Verifica tu conexión e intenta nuevamente.';
  }
  
  if (error.response?.status === 404) {
    return 'Recurso no encontrado.';
  }
  
  if (error.response?.status >= 500) {
    return 'Error del servidor. Por favor, intenta nuevamente más tarde.';
  }
  
  return error.response?.data?.message || error.message || 'Error desconocido';
};

export default api;
