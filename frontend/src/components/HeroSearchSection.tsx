'use client';

import React from 'react';
import { SearchBox } from './SearchBox';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, TrendingUp } from 'lucide-react';

interface HeroSearchSectionProps {
  onSearch: (query: string, isTyping?: boolean) => void;
  isPalindrome?: boolean;
  resultCount?: number;
  searchTerm?: string;
  className?: string;
}

interface SearchStatusProps {
  isPalindrome: boolean;
  resultCount: number;
  searchTerm?: string;
}

const SearchStatus: React.FC<SearchStatusProps> = ({ isPalindrome, resultCount, searchTerm }) => {
  if (!searchTerm) return null;

  return (
    <div className="mt-4 flex flex-col items-center space-y-2">
      {isPalindrome && (
        <div className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-full animate-scale-in">
          <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
          <span className="text-white font-medium">
            ¡Palíndromo detectado! 50% OFF aplicado
          </span>
          <Badge variant="secondary" className="bg-yellow-300/20 text-yellow-100 border-yellow-300/30">
            "{searchTerm}"
          </Badge>
        </div>
      )}
      
      {resultCount > 0 && (
        <div className="flex items-center space-x-2 text-white/80">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">
            {resultCount} producto{resultCount !== 1 ? 's' : ''} encontrado{resultCount !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );
};

export const HeroSearchSection: React.FC<HeroSearchSectionProps> = ({
  onSearch,
  isPalindrome = false,
  resultCount = 0,
  searchTerm,
  className = '',
}) => {
  return (
    <section className={`gradient-brand text-white py-16 -mt-1 relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-8 h-8 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
        {/* Hero Title */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 float-animation">
            Encuentra tu equipo{' '}
            <span className="text-gradient-brand bg-white bg-clip-text text-transparent">
              perfecto
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-2 text-white/90">
            Busca con palíndromos y obtén{' '}
            <span className="font-bold text-yellow-300 animate-pulse">50% OFF</span>
            <Sparkles className="inline-block w-6 h-6 ml-2 text-yellow-300 animate-pulse" />
          </p>
          <p className="text-sm md:text-base text-white/70">
            Tecnología premium con descuentos únicos por palindromes
          </p>
        </div>

        {/* Search Container */}
        <div className="glass-effect rounded-3xl p-6 md:p-8 max-w-2xl mx-auto shadow-2xl">
          <SearchBox
            onSearch={onSearch}
            isPalindrome={isPalindrome}
            className="search-glow"
          />
          
          <SearchStatus 
            isPalindrome={isPalindrome}
            resultCount={resultCount}
            searchTerm={searchTerm}
          />
        </div>

        {/* Examples Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {['phone', 'abba', 'level', 'racecar'].map((example, index) => (
            <button
              key={example}
              onClick={() => onSearch(example)}
              className="glass-effect px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-white/90">Prueba: </span>
              <span className="text-white font-medium">"{example}"</span>
            </button>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-8 flex flex-wrap justify-center gap-8">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-white font-medium">Búsqueda en tiempo real</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span className="text-sm text-white font-medium">Descuentos automáticos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <span className="text-sm text-white font-medium">12+ productos disponibles</span>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="w-full h-16 text-gray-50"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  );
};
