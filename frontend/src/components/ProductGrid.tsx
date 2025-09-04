'use client';

import React from 'react';
import { ProductCard } from './ProductCard';
import { LoadingSkeleton } from './LoadingSkeleton';
import { EmptyState } from './EmptyState';
import { ProductWithDiscount } from '@/types/product';

interface ProductGridProps {
  products: ProductWithDiscount[];
  isLoading?: boolean;
  isEmpty?: boolean;
  isPalindrome?: boolean;
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
  searchTerm = '',
  onReset,
  onSuggestionClick,
  onAddToCart,
  onToggleFavorite,
  className = '',
}) => {
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
            {isPalindrome && (
              <div className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-green-700">
                  ¡50% OFF aplicado por palíndromo!
                </span>
              </div>
            )}
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
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

      {/* Load More Button (if needed) */}
      {products.length >= 12 && (
        <div className="text-center mt-12 animate-slide-up">
          <button className="glass-effect px-8 py-3 rounded-full text-brand-600 font-medium hover:bg-white/50 transition-all duration-300 hover:scale-105">
            Ver más productos
          </button>
        </div>
      )}
    </div>
  );
};