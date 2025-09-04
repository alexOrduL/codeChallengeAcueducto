import { useState, useEffect, useCallback } from 'react';

export interface SearchState {
  searchTerm: string;
  debouncedTerm: string;
  isTyping: boolean;
  isLoading: boolean;
}

export interface UseSearchDebounceProps {
  delay?: number;
  minLength?: number;
}

export interface UseSearchDebounceReturn extends SearchState {
  setSearchTerm: (term: string) => void;
  setIsLoading: (loading: boolean) => void;
  clearSearch: () => void;
}

/**
 * Hook personalizado para manejar debounce en búsquedas
 * Implementa estados UX mejorados y lógica de debounce optimizada
 */
export const useSearchDebounce = ({
  delay = 1000, // 1 segundo por defecto
  minLength = 0,
}: UseSearchDebounceProps = {}): UseSearchDebounceReturn => {
  const [searchTerm, setSearchTermState] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Función para actualizar el término de búsqueda
  const setSearchTerm = useCallback((term: string) => {
    setSearchTermState(term);
    
    // Si el usuario está escribiendo (y no está vacío), marcar como typing
    if (term.length > 0) {
      setIsTyping(true);
    } else {
      // Si está vacío, no está typing y debe ejecutarse inmediatamente
      setIsTyping(false);
      setDebouncedTerm('');
    }
  }, []);

  // Función para limpiar la búsqueda
  const clearSearch = useCallback(() => {
    setSearchTermState('');
    setDebouncedTerm('');
    setIsTyping(false);
    setIsLoading(false);
  }, []);

  // Efecto para manejar el debounce
  useEffect(() => {
    // Si el campo está vacío, ejecutar inmediatamente
    if (searchTerm.length === 0) {
      setDebouncedTerm('');
      setIsTyping(false);
      return;
    }

    // Si es menor que la longitud mínima, no hacer nada
    if (searchTerm.length < minLength) {
      setIsTyping(true);
      return;
    }

    // Configurar el timer de debounce
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      setIsTyping(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, delay, minLength]);

  return {
    searchTerm,
    debouncedTerm,
    isTyping,
    isLoading,
    setSearchTerm,
    setIsLoading,
    clearSearch,
  };
};
