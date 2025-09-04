'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface LoadingSkeletonProps {
  count?: number;
  className?: string;
}

export const ProductSkeleton: React.FC = () => (
  <Card className="overflow-hidden bg-white rounded-2xl shadow-lg animate-scale-in">
    <div className="relative">
      <div className="skeleton h-48 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
    </div>
    
    <CardContent className="p-5 space-y-3">
      <div className="space-y-2">
        <div className="skeleton h-5 w-3/4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"></div>
        <div className="skeleton h-4 w-1/2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"></div>
      </div>
      
      <div className="skeleton h-3 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"></div>
      <div className="skeleton h-3 w-4/5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"></div>
      
      <div className="flex justify-between items-center pt-2">
        <div className="skeleton h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"></div>
        <div className="skeleton h-9 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg"></div>
      </div>
    </CardContent>
  </Card>
);

export const SearchSkeleton: React.FC = () => (
  <div className="w-full max-w-md mx-auto">
    <div className="skeleton h-12 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-2xl relative overflow-hidden">
      <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
    </div>
    <div className="mt-2 skeleton h-4 w-3/4 mx-auto bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"></div>
  </div>
);

export const HeaderSkeleton: React.FC = () => (
  <div className="bg-gray-100 py-4 px-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="skeleton w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full"></div>
        <div className="space-y-2">
          <div className="skeleton h-6 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"></div>
          <div className="skeleton h-3 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"></div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="skeleton h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full"></div>
        <div className="skeleton w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full"></div>
      </div>
    </div>
  </div>
);

export const GridSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  count = 8, 
  className = '' 
}) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <ProductSkeleton />
      </div>
    ))}
  </div>
);

export const StatsSkeleton: React.FC = () => (
  <div className="flex flex-wrap justify-center gap-8">
    {Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="flex items-center space-x-2"
        style={{ animationDelay: `${index * 0.2}s` }}
      >
        <div className="skeleton w-2 h-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full"></div>
        <div className="skeleton h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

export const HeroSkeleton: React.FC = () => (
  <div className="bg-gray-100 py-16">
    <div className="max-w-4xl mx-auto text-center px-4 space-y-8">
      {/* Title skeleton */}
      <div className="space-y-4">
        <div className="skeleton h-12 w-3/4 mx-auto bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"></div>
        <div className="skeleton h-6 w-1/2 mx-auto bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"></div>
        <div className="skeleton h-4 w-1/3 mx-auto bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"></div>
      </div>

      {/* Search container skeleton */}
      <div className="bg-white/50 rounded-3xl p-8 max-w-2xl mx-auto">
        <SearchSkeleton />
      </div>

      {/* Example pills skeleton */}
      <div className="flex flex-wrap justify-center gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="skeleton h-8 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full"
            style={{ animationDelay: `${index * 0.1}s` }}
          ></div>
        ))}
      </div>

      {/* Stats skeleton */}
      <StatsSkeleton />
    </div>
  </div>
);

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  count = 8, 
  className = '' 
}) => (
  <div className={`animate-pulse ${className}`}>
    <GridSkeleton count={count} />
  </div>
);
