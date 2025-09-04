'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { SearchResponse } from '@/types/product';

interface SearchResultsProps {
  searchResult: SearchResponse | null;
  isLoading?: boolean;
  className?: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  searchResult,
  isLoading = false,
  className = '',
}) => {
  if (isLoading || !searchResult) {
    return null;
  }

  const { totalResults, searchTerm, isPalindrome, discountApplied } = searchResult;

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <h2 className="text-lg font-medium" data-testid="results-count">
          {totalResults} {totalResults === 1 ? 'resultado' : 'resultados'} para "{searchTerm}"
        </h2>
        
        {isPalindrome && (
          <Badge variant="success" data-testid="palindrome-result-badge">
            🎉 Palíndromo detectado
          </Badge>
        )}
      </div>

      {discountApplied > 0 && (
        <div className="flex items-center gap-2">
          <Badge variant="discount" data-testid="discount-applied-badge">
            {discountApplied}% de descuento aplicado
          </Badge>
        </div>
      )}
    </div>
  );
};
