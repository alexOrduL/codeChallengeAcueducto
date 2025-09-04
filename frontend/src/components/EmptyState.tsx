'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Sparkles, RefreshCw, Lightbulb } from 'lucide-react';

interface EmptyStateProps {
  onReset?: () => void;
  onSuggestionClick?: (suggestion: string) => void;
  searchTerm?: string;
  className?: string;
}

interface EmptyStateVariant {
  icon: React.ElementType;
  title: string;
  description: string;
  suggestions: string[];
  buttonText: string;
  iconColor: string;
  bgColor: string;
}

const getEmptyStateVariant = (searchTerm?: string): EmptyStateVariant => {
  if (!searchTerm || searchTerm.trim() === '') {
    return {
      icon: Search,
      title: '¡Bienvenido a Palindrome Store!',
      description: 'Explora nuestro catálogo completo o busca productos específicos. Los palíndromos tienen descuentos especiales.',
      suggestions: ['phone', 'abba', 'level', 'racecar'],
      buttonText: 'Ver todos los productos',
      iconColor: 'text-brand-500',
      bgColor: 'bg-brand-50'
    };
  }

  return {
    icon: Search,
    title: 'No encontramos productos',
    description: `No hay resultados para "${searchTerm}". Intenta con otros términos o prueba nuestras sugerencias.`,
    suggestions: ['smartphone', 'tablet', 'laptop', 'abba'],
    buttonText: 'Limpiar búsqueda',
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-50'
  };
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  onReset,
  onSuggestionClick,
  searchTerm,
  className = ''
}) => {
  const variant = getEmptyStateVariant(searchTerm);
  const IconComponent = variant.icon;

  return (
    <div className={`text-center py-16 px-4 ${className}`}>
      <div className="max-w-md mx-auto">
        {/* Animated Icon Container */}
        <div className={`w-24 h-24 mx-auto mb-6 ${variant.bgColor} rounded-full flex items-center justify-center animate-scale-in`}>
          <IconComponent className={`w-12 h-12 ${variant.iconColor} animate-pulse`} />
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 animate-slide-up">
          {variant.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {variant.description}
        </p>

        {/* Suggestions */}
        {variant.suggestions.length > 0 && (
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-center mb-4">
              <Lightbulb className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Prueba estas búsquedas:</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {variant.suggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  onClick={() => onSuggestionClick?.(suggestion)}
                  className="group"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <Badge 
                    variant="outline" 
                    className="hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition-all duration-200 cursor-pointer animate-slide-up group-hover:scale-105"
                  >
                    {suggestion === 'abba' || suggestion === 'level' || suggestion === 'racecar' ? (
                      <>
                        <Sparkles className="w-3 h-3 mr-1 text-yellow-500" />
                        {suggestion}
                      </>
                    ) : (
                      suggestion
                    )}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        {onReset && (
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button 
              onClick={onReset} 
              className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {variant.buttonText}
            </Button>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center space-x-8 opacity-30">
          <div className="w-2 h-2 bg-brand-300 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-gray-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-gray-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-gray-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export const WelcomeState: React.FC<EmptyStateProps> = (props) => (
  <EmptyState {...props} searchTerm="" />
);

export const NoResultsState: React.FC<EmptyStateProps> = (props) => (
  <EmptyState {...props} />
);
