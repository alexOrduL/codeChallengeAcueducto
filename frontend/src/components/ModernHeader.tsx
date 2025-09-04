'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ModernHeaderProps {
  className?: string;
}

export const ModernHeader: React.FC<ModernHeaderProps> = ({ className = '' }) => {
  return (
    <header className={`gradient-brand text-white sticky top-0 z-50 shadow-xl ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 glass-effect rounded-full flex items-center justify-center backdrop-blur">
              <span className="text-2xl animate-pulse">🔄</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold tracking-tight">Palindrome Store</h1>
              <span className="text-xs text-white/70 hidden sm:block">
                Descuentos especiales para palíndromos
              </span>
            </div>
          </div>

          {/* Badges y Status */}
          <div className="flex items-center space-x-4">
            <Badge 
              variant="secondary" 
              className="glass-effect text-white border-white/20 hidden md:flex animate-pulse-slow"
            >
              🎯 50% OFF con Palíndromos
            </Badge>
            
            {/* Avatar/Profile */}
            <div className="w-8 h-8 glass-effect rounded-full flex items-center justify-center backdrop-blur hover:scale-105 transition-transform cursor-pointer">
              <span className="text-sm">👤</span>
            </div>
          </div>
        </div>

        {/* Indicadores de ejemplos móvil */}
        <div className="mt-2 flex justify-center md:hidden">
          <div className="glass-effect px-3 py-1 rounded-full">
            <span className="text-xs text-white/80">
              Prueba: abba, level, racecar
            </span>
          </div>
        </div>
      </div>

      {/* Gradient Border Bottom */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
    </header>
  );
};
