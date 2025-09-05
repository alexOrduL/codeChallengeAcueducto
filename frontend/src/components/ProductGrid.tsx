'use client';

import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { LoadingSkeleton } from './LoadingSkeleton';
import { EmptyState } from './EmptyState';
import { ProductWithDiscount } from '@/types/product';

interface ProductGridProps {
  products: ProductWithDiscount[];
  isLoading?: boolean;
  isEmpty?: boolean;
  isPalindrome?: boolean;
  discountApplied?: number;
  searchTerm?: string;
  onReset?: () => void;
  onSuggestionClick?: (suggestion: string) => void;
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  isEmpty = false,
  isPalindrome = false,
  discountApplied = 0,
  searchTerm = '',
  onReset,
  onSuggestionClick,
  onAddToCart,
  onToggleFavorite,
  className = '',
}) => {
  // Estado para la paginación
  const [visibleCount, setVisibleCount] = useState(12);
  
  // Calcular productos visibles
  const visibleProducts = useMemo(() => {
    return products.slice(0, visibleCount);
  }, [products, visibleCount]);
  
  // Función para cargar más productos
  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 8, products.length));
  };
  
  // Resetear paginación cuando cambian los productos
  React.useEffect(() => {
    setVisibleCount(12);
  }, [products]);
  // Loading State
  if (isLoading) {
    return (
      <div className={`animate-slide-up ${className}`}>
        <LoadingSkeleton count={8} />
      </div>
    );
  }

  // Empty State
  if (isEmpty || products.length === 0) {
    return (
      <div className={`animate-slide-up ${className}`}>
        <EmptyState
          searchTerm={searchTerm}
          isPalindrome={isPalindrome}
          discountApplied={discountApplied}
          onReset={onReset}
          onSuggestionClick={onSuggestionClick}
        />
      </div>
    );
  }

  // Results Grid
  return (
    <div className={className}>
      {/* Results Header */}
      {searchTerm && products.length > 0 && (
        <div className="mb-8 text-center animate-slide-up">
          <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {products.length} producto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
            </h3>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleProducts.map((product, index) => (
          <div
            key={product.id}
            className="animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            data-testid={`product-${product.id}`}
          >
            <ProductCard
              product={product}
              hasDiscount={isPalindrome || product.discountPercentage > 0}
              onAddToCart={onAddToCart}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < products.length && (
        <div className="text-center mt-12 animate-slide-up">
          <button 
            onClick={handleLoadMore}
            className="glass-effect px-8 py-3 rounded-full text-brand-600 font-medium hover:bg-white/50 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            Ver más productos ({products.length - visibleCount} restantes)
          </button>
        </div>
      )}

      {/* Pagination Info */}
      {products.length > 12 && (
        <div className="text-center mt-6 animate-slide-up">
          <div className="glass-effect inline-block px-4 py-2 rounded-full">
            <p className="text-sm text-gray-600">
              Mostrando <span className="font-semibold text-brand-600">{visibleCount}</span> de{' '}
              <span className="font-semibold text-brand-600">{products.length}</span> productos
            </p>
          </div>
        </div>
      )}
    </div>
  );
};