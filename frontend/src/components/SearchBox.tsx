'use client';

import React, { useCallback, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useSearchDebounce } from '@/hooks/useSearchDebounce';

interface SearchBoxProps {
  onSearch: (query: string, isTyping?: boolean) => void;
  isPalindrome?: boolean;
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  isPalindrome = false,
  className = '',
}) => {
  const {
    searchTerm,
    debouncedTerm,
    isTyping,
    isLoading,
    setSearchTerm,
    setIsLoading,
    clearSearch,
  } = useSearchDebounce({ 
    delay: 1000, // 1 segundo de debounce
    minLength: 0 // Sin longitud mínima
  });

  // Efecto para ejecutar búsqueda cuando cambie el término debounced
  useEffect(() => {
    // Siempre ejecutar la búsqueda, incluso con término vacío
    onSearch(debouncedTerm, isTyping);
  }, [debouncedTerm, onSearch, isTyping]);

  // Notificar cuando el usuario está escribiendo
  useEffect(() => {
    if (isTyping) {
      onSearch(searchTerm, true);
    }
  }, [isTyping, searchTerm, onSearch]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Forzar búsqueda inmediata al enviar el formulario
    onSearch(searchTerm, false);
  }, [searchTerm, onSearch]);

  const handleClear = useCallback(() => {
    clearSearch();
  }, [clearSearch]);

  // Determinar el estado visual actual
  const getSearchState = () => {
    if (isLoading) return 'loading';
    if (isTyping) return 'typing';
    if (searchTerm.length === 0) return 'initial';
    return 'results';
  };

  const searchState = getSearchState();

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar productos... (ej: phone, abba, level)"
            value={searchTerm}
            onChange={handleInputChange}
            className={`pl-10 pr-12 py-2 w-full transition-all duration-200 ${
              searchState === 'typing' ? 'ring-2 ring-blue-200' : ''
            } ${searchState === 'loading' ? 'ring-2 ring-blue-400' : ''}`}
            data-testid="search-input"
          />
          
          {/* Botón de limpiar */}
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="clear-button"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          {/* Indicadores de estado */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {searchState === 'loading' && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" data-testid="loading-spinner" />
            )}
            {searchState === 'typing' && (
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              </div>
            )}
          </div>
        </div>
      </form>
      
      {/* Estado y feedback al usuario */}
      <div className="mt-2 min-h-[24px] flex justify-center">
        {searchState === 'initial' && (
          <p className="text-sm text-muted-foreground text-center">
            Prueba con "phone" o palíndromos como "abba", "level" para descuentos especiales
          </p>
        )}
        
        {searchState === 'typing' && (
          <p className="text-sm text-blue-600 text-center">
            Escribiendo... (búsqueda en {Math.ceil((1000) / 1000)}s)
          </p>
        )}
        
        {searchState === 'loading' && (
          <p className="text-sm text-blue-600 text-center">
            Buscando productos...
          </p>
        )}
        
        {searchState === 'results' && searchTerm && isPalindrome && (
          <Badge variant="success" data-testid="palindrome-badge">
            🎉 ¡Palíndromo detectado! 50% de descuento aplicado
          </Badge>
        )}
      </div>
    </div>
  );
};
