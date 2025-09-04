'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { ModernHeader } from '@/components/ModernHeader';
import { HeroSearchSection } from '@/components/HeroSearchSection';
import { ProductGrid } from '@/components/ProductGrid';
import { productsApi } from '@/lib/api';
import { SearchResponse } from '@/types/product';

export default function HomePage() {
  const [searchResult, setSearchResult] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchState, setSearchState] = useState<'initial' | 'typing' | 'loading' | 'results' | 'empty' | 'error'>('initial');
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');

  // Cargar todos los productos al inicio
  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        setIsLoading(true);
        setSearchState('loading');
        
        const result = await productsApi.search('');
        setSearchResult(result);
        setSearchState('results');
      } catch (err) {
        console.error('Error loading initial products:', err);
        setError('Error al cargar los productos');
        setSearchState('error');
      } finally {
        setIsLoading(false);
      }
    };

    loadAllProducts();
  }, []);

  const handleSearch = useCallback(async (query: string, isTyping = false) => {
    setCurrentSearchTerm(query);
    setError(null);
    
    // Si está escribiendo, solo actualizar el estado visual
    if (isTyping) {
      setSearchState('typing');
      return;
    }

    try {
      setIsLoading(true);
      setSearchState('loading');
      
      const result = await productsApi.search(query);
      setSearchResult(result);
      
      // Determinar el estado final
      if (result.totalResults === 0 && query.trim().length > 0) {
        setSearchState('empty');
      } else {
        setSearchState('results');
      }
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.response?.data?.message || 'Error al buscar productos');
      setSearchState('error');
      setSearchResult({
        products: [],
        isPalindrome: false,
        discountApplied: 0,
        totalResults: 0,
        searchTerm: query,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setCurrentSearchTerm('');
    handleSearch('');
  }, [handleSearch]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setCurrentSearchTerm(suggestion);
    handleSearch(suggestion);
  }, [handleSearch]);

  const handleAddToCart = useCallback((productId: string) => {
    console.log('Add to cart:', productId);
    // TODO: Implementar lógica del carrito
  }, []);

  const handleToggleFavorite = useCallback((productId: string) => {
    console.log('Toggle favorite:', productId);
    // TODO: Implementar lógica de favoritos
  }, []);

  const productsToShow = searchResult?.products || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <ModernHeader />
      
      {/* Hero Search Section */}
      <HeroSearchSection
        onSearch={handleSearch}
        isPalindrome={searchResult?.isPalindrome}
        resultCount={productsToShow.length}
        searchTerm={currentSearchTerm}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Error State */}
        {searchState === 'error' && error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-6 text-center animate-slide-up">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <p className="text-red-700 font-medium text-lg mb-2">{error}</p>
            <p className="text-red-600 text-sm">
              Verifica tu conexión e intenta nuevamente
            </p>
          </div>
        )}

        {/* Products Section */}
        <ProductGrid
          products={productsToShow}
          isLoading={searchState === 'loading'}
          isEmpty={searchState === 'empty'}
          isPalindrome={searchResult?.isPalindrome}
          searchTerm={currentSearchTerm}
          onReset={handleReset}
          onSuggestionClick={handleSuggestionClick}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Results Summary */}
        {searchState === 'results' && productsToShow.length > 0 && (
          <div className="text-center mt-12 animate-slide-up">
            <div className="glass-effect inline-block px-6 py-3 rounded-full">
              <p className="text-gray-700">
                Mostrando <span className="font-bold">{productsToShow.length}</span> de{' '}
                <span className="font-bold">{searchResult?.totalResults}</span> productos
                {currentSearchTerm && (
                  <span> para "<span className="font-medium">{currentSearchTerm}</span>"</span>
                )}
                {searchResult?.isPalindrome && (
                  <span className="text-green-600 font-medium ml-2">
                    🎉 ¡Descuento aplicado!
                  </span>
                )}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Modern Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="w-8 h-8 glass-effect rounded-full flex items-center justify-center">
                <span className="text-lg">🔄</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Palindrome Store</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              © 2024 Palindrome Ecommerce. Desarrollado con Next.js, NestJS y mucho amor por los palíndromos.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="glass-effect px-4 py-2 rounded-full">
                🎯 Busca palíndromos como "abba", "level", "racecar"
              </span>
              <span className="glass-effect px-4 py-2 rounded-full">
                💫 50% de descuento automático
              </span>
              <span className="glass-effect px-4 py-2 rounded-full">
                ⚡ Búsqueda en tiempo real
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}