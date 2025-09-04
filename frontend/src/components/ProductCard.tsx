'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductWithDiscount } from '@/types/product';
import { Heart, ShoppingCart, Zap, Star } from 'lucide-react';

interface ProductCardProps {
  product: ProductWithDiscount;
  hasDiscount?: boolean;
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hasDiscount: propHasDiscount,
  onAddToCart,
  onToggleFavorite,
  className = '',
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hasDiscount = propHasDiscount ?? product.discountPercentage > 0;

  const handleAddToCart = () => {
    onAddToCart?.(product.id.toString());
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(product.id.toString());
  };

  return (
    <Card 
      className={`product-card bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group animate-scale-in ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div className="relative h-48 bg-gray-50">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="product-image w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Gradient Overlay on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        </div>

        {/* Discount Badge */}
        {hasDiscount && (
          <Badge 
            className="absolute top-3 left-3 bg-red-500 text-white animate-pulse-slow shadow-lg"
            data-testid="discount-badge"
          >
            <Zap className="w-3 h-3 mr-1" />
            {product.discountPercentage}% OFF
          </Badge>
        )}

        {/* Favorite Button */}
        <Button 
          variant="ghost" 
          size="icon"
          className={`absolute top-3 right-3 w-8 h-8 glass-effect backdrop-blur rounded-full hover:bg-white/90 transition-all duration-200 ${isHovered ? 'scale-100 opacity-100' : 'scale-90 opacity-70'}`}
          onClick={handleToggleFavorite}
        >
          <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
        </Button>

        {/* Quick Add Button (appears on hover) */}
        <Button 
          className={`add-button absolute bottom-3 right-3 bg-brand-500 hover:bg-brand-600 text-white shadow-lg transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
          size="sm"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4 mr-1" />
          Agregar
        </Button>
      </div>
      
      <CardContent className="p-5">
        {/* Brand and Rating */}
        <div className="flex items-center justify-between mb-2">
          <Badge 
            variant="outline" 
            className="text-xs bg-gray-50 text-gray-600 border-gray-200"
            data-testid="product-brand"
          >
            {product.brand}
          </Badge>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-xs text-gray-500 ml-1">4.8</span>
          </div>
        </div>

        {/* Title */}
        <h4 
          className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors"
          data-testid="product-title"
        >
          {product.title}
        </h4>

        {/* Description */}
        <p 
          className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed"
          data-testid="product-description"
        >
          {product.description}
        </p>
        
        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {hasDiscount ? (
              <>
                <span 
                  className="text-2xl font-bold text-gray-900"
                  data-testid="final-price"
                >
                  ${product.finalPrice.toFixed(2)}
                </span>
                <span 
                  className="text-sm text-gray-500 line-through"
                  data-testid="original-price"
                >
                  ${product.originalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span 
                className="text-2xl font-bold text-gray-900"
                data-testid="price"
              >
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Savings Indicator */}
        {hasDiscount && (
          <div className="mt-2 flex items-center space-x-2">
            <Badge 
              className="bg-green-50 text-green-700 border-green-200 text-xs"
              data-testid="savings"
            >
              <Zap className="w-3 h-3 mr-1" />
              Ahorras ${product.discountAmount.toFixed(2)}
            </Badge>
            <Badge variant="success" className="text-xs">
              🎉 Descuento por palíndromo
            </Badge>
          </div>
        )}
      </CardContent>

      {/* Bottom Gradient Border */}
      <div className={`h-1 bg-gradient-to-r transition-all duration-300 ${hasDiscount ? 'from-red-500 via-pink-500 to-red-500' : 'from-brand-500 via-brand-600 to-brand-500'} ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
    </Card>
  );
};