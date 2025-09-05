import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EmptyState } from '../EmptyState';

describe('EmptyState', () => {
  const mockOnReset = jest.fn();
  const mockOnSuggestionClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Estado inicial (sin búsqueda)', () => {
    it('should render welcome state when no search term', () => {
      render(
        <EmptyState
          onReset={mockOnReset}
          onSuggestionClick={mockOnSuggestionClick}
        />
      );

      expect(screen.getByText('¡Bienvenido a Palindrome Store!')).toBeInTheDocument();
      expect(screen.getByText(/Explora nuestro catálogo completo/)).toBeInTheDocument();
      expect(screen.getByText('Ver todos los productos')).toBeInTheDocument();
    });

    it('should show palindrome suggestions in welcome state', () => {
      render(
        <EmptyState
          onReset={mockOnReset}
          onSuggestionClick={mockOnSuggestionClick}
        />
      );

      // Verificar que hay sugerencias de palíndromos
      expect(screen.getByText('abba')).toBeInTheDocument();
      expect(screen.getByText('level')).toBeInTheDocument();
      expect(screen.getByText('racecar')).toBeInTheDocument();
    });
  });

  describe('Estado de búsqueda normal sin resultados', () => {
    it('should render no results state for normal search', () => {
      render(
        <EmptyState
          searchTerm="smartphone"
          onReset={mockOnReset}
          onSuggestionClick={mockOnSuggestionClick}
        />
      );

      expect(screen.getByText('No encontramos productos')).toBeInTheDocument();
      expect(screen.getByText(/No hay resultados para "smartphone"/)).toBeInTheDocument();
      expect(screen.getByText('Limpiar búsqueda')).toBeInTheDocument();
    });

    it('should call onSuggestionClick when suggestion is clicked', () => {
      render(
        <EmptyState
          searchTerm="smartphone"
          onReset={mockOnReset}
          onSuggestionClick={mockOnSuggestionClick}
        />
      );

      const suggestion = screen.getByText('abba');
      fireEvent.click(suggestion);

      expect(mockOnSuggestionClick).toHaveBeenCalledWith('abba');
    });
  });

  describe('🎯 Estado especial: Palíndromo sin productos', () => {
    it('should render palindrome detected state when palindrome has no results', () => {
      render(
        <EmptyState
          searchTerm="qwq"
          isPalindrome={true}
          discountApplied={50}
          onReset={mockOnReset}
          onSuggestionClick={mockOnSuggestionClick}
        />
      );

      // Verificar título especial para palíndromos
      expect(screen.getByText('¡Palíndromo detectado!')).toBeInTheDocument();
      
      // Verificar descripción específica que menciona el descuento
      expect(screen.getByText(/es un palíndromo válido con 50% de descuento/)).toBeInTheDocument();
      expect(screen.getByText(/pero no encontramos productos que coincidan/)).toBeInTheDocument();
      
      // Verificar botón específico para palíndromos
      expect(screen.getByText('Buscar otros palíndromos')).toBeInTheDocument();
    });

    it('should show palindrome-specific suggestions when palindrome has no results', () => {
      render(
        <EmptyState
          searchTerm="qwq"
          isPalindrome={true}
          discountApplied={50}
          onReset={mockOnReset}
          onSuggestionClick={mockOnSuggestionClick}
        />
      );

      // Verificar sugerencias específicas de palíndromos
      expect(screen.getByText('abba')).toBeInTheDocument();
      expect(screen.getByText('level')).toBeInTheDocument();
      expect(screen.getByText('noon')).toBeInTheDocument();
      expect(screen.getByText('racecar')).toBeInTheDocument();
      expect(screen.getByText('madam')).toBeInTheDocument();
    });

    it('should use green styling for palindrome state', () => {
      render(
        <EmptyState
          searchTerm="qwq"
          isPalindrome={true}
          discountApplied={50}
          onReset={mockOnReset}
          onSuggestionClick={mockOnSuggestionClick}
        />
      );

      // Verificar que usa el ícono Sparkles (indicativo de palíndromo)
      const iconContainer = screen.getByTestId ? screen.queryByTestId('palindrome-icon') : null;
      // Nota: Podríamos agregar data-testid al ícono si necesitamos testear estilos específicos
    });

    it('should call onSuggestionClick with palindrome suggestions', () => {
      render(
        <EmptyState
          searchTerm="qwq"
          isPalindrome={true}
          discountApplied={50}
          onReset={mockOnReset}
          onSuggestionClick={mockOnSuggestionClick}
        />
      );

      const palindromeSuggestion = screen.getByText('noon');
      fireEvent.click(palindromeSuggestion);

      expect(mockOnSuggestionClick).toHaveBeenCalledWith('noon');
    });

    it('should handle different discount percentages', () => {
      render(
        <EmptyState
          searchTerm="aba"
          isPalindrome={true}
          discountApplied={25}
          onReset={mockOnReset}
          onSuggestionClick={mockOnSuggestionClick}
        />
      );

      expect(screen.getByText(/con 25% de descuento/)).toBeInTheDocument();
    });
  });

  describe('Casos edge', () => {
    it('should not show palindrome state if isPalindrome is true but discountApplied is 0', () => {
      render(
        <EmptyState
          searchTerm="test"
          isPalindrome={true}
          discountApplied={0}
          onReset={mockOnReset}
          onSuggestionClick={mockOnSuggestionClick}
        />
      );

      // Debería mostrar el estado normal, no el de palíndromo
      expect(screen.getByText('No encontramos productos')).toBeInTheDocument();
      expect(screen.queryByText('¡Palíndromo detectado!')).not.toBeInTheDocument();
    });

    it('should not show palindrome state if discountApplied > 0 but isPalindrome is false', () => {
      render(
        <EmptyState
          searchTerm="test"
          isPalindrome={false}
          discountApplied={50}
          onReset={mockOnReset}
          onSuggestionClick={mockOnSuggestionClick}
        />
      );

      // Debería mostrar el estado normal, no el de palíndromo
      expect(screen.getByText('No encontramos productos')).toBeInTheDocument();
      expect(screen.queryByText('¡Palíndromo detectado!')).not.toBeInTheDocument();
    });

    it('should handle empty search term with palindrome props gracefully', () => {
      render(
        <EmptyState
          searchTerm=""
          isPalindrome={true}
          discountApplied={50}
          onReset={mockOnReset}
          onSuggestionClick={mockOnSuggestionClick}
        />
      );

      // Con término vacío, debería mostrar el estado de bienvenida
      expect(screen.getByText('¡Bienvenido a Palindrome Store!')).toBeInTheDocument();
      expect(screen.queryByText('¡Palíndromo detectado!')).not.toBeInTheDocument();
    });
  });

  describe('Interacciones', () => {
    it('should call onReset when reset button is clicked', () => {
      render(
        <EmptyState
          searchTerm="test"
          onReset={mockOnReset}
          onSuggestionClick={mockOnSuggestionClick}
        />
      );

      const resetButton = screen.getByText('Limpiar búsqueda');
      fireEvent.click(resetButton);

      expect(mockOnReset).toHaveBeenCalledTimes(1);
    });

    it('should call onReset when palindrome reset button is clicked', () => {
      render(
        <EmptyState
          searchTerm="qwq"
          isPalindrome={true}
          discountApplied={50}
          onReset={mockOnReset}
          onSuggestionClick={mockOnSuggestionClick}
        />
      );

      const resetButton = screen.getByText('Buscar otros palíndromos');
      fireEvent.click(resetButton);

      expect(mockOnReset).toHaveBeenCalledTimes(1);
    });
  });
});
