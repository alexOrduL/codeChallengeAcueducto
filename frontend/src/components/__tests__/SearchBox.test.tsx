import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBox } from '../SearchBox';

// No need to mock the hook since it exists

// Mock timers
jest.useFakeTimers();

describe('SearchBox', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input correctly', () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Buscar productos... (ej: abba, level, racecar)');
  });

  it('shows loading state when isLoading is true', () => {
    render(<SearchBox onSearch={mockOnSearch} isLoading={true} />);
    
    const loadingSpinner = document.querySelector('.animate-spin');
    expect(loadingSpinner).toBeInTheDocument();
    
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeDisabled();
  });

  it('shows palindrome badge when isPalindrome is true', () => {
    render(<SearchBox onSearch={mockOnSearch} isPalindrome={true} />);
    
    // First type something to trigger the palindrome badge
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'abba' } });
    
    const palindromeBadge = screen.getByTestId('palindrome-badge');
    expect(palindromeBadge).toBeInTheDocument();
    expect(palindromeBadge).toHaveTextContent('🎉 ¡Palíndromo detectado! 50% de descuento aplicado');
  });

  it('calls onSearch when form is submitted', async () => {
    const user = userEvent.setup();
    render(<SearchBox onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByTestId('search-input');
    const form = searchInput.closest('form');
    
    await user.type(searchInput, 'test search');
    fireEvent.submit(form!);
    
    expect(mockOnSearch).toHaveBeenCalledWith('test search');
  });

  it('calls onSearch with debounced value when typing', async () => {
    const user = userEvent.setup();
    render(<SearchBox onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByTestId('search-input');
    
    await user.type(searchInput, 'abba');
    
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('abba');
    });
  });

  it('does not call onSearch for empty strings', async () => {
    const user = userEvent.setup();
    render(<SearchBox onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByTestId('search-input');
    const form = searchInput.closest('form');
    
    await user.type(searchInput, '   ');
    fireEvent.submit(form!);
    
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('shows help text when search input is empty', () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    
    const helpText = screen.getByText(/Prueba con palíndromos como/);
    expect(helpText).toBeInTheDocument();
  });

  it('hides help text when user types something', async () => {
    const user = userEvent.setup();
    render(<SearchBox onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'test');
    
    const helpText = screen.queryByText(/Prueba con palíndromos como/);
    expect(helpText).not.toBeInTheDocument();
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    render(<SearchBox onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
    await user.type(searchInput, 'level');
    
    expect(searchInput.value).toBe('level');
  });

  describe('Edge Cases y Estados UX Mejorados', () => {
    const mockUseSearchDebounce = require('@/hooks/useSearchDebounce').useSearchDebounce;

    beforeEach(() => {
      mockUseSearchDebounce.mockReturnValue({
        searchTerm: '',
        debouncedTerm: '',
        isTyping: false,
        isLoading: false,
        setSearchTerm: jest.fn(),
        setIsLoading: jest.fn(),
        clearSearch: jest.fn(),
      });
    });

    it('should show typing state with visual indicators', () => {
      mockUseSearchDebounce.mockReturnValue({
        searchTerm: 'phone',
        debouncedTerm: '',
        isTyping: true,
        isLoading: false,
        setSearchTerm: jest.fn(),
        setIsLoading: jest.fn(),
        clearSearch: jest.fn(),
      });

      render(<SearchBox onSearch={mockOnSearch} />);
      
      expect(screen.getByText('Escribiendo... (búsqueda en 1s)')).toBeInTheDocument();
      expect(screen.getByTestId('search-input')).toHaveClass('ring-2', 'ring-blue-200');
    });

    it('should show loading state with spinner', () => {
      mockUseSearchDebounce.mockReturnValue({
        searchTerm: 'phone',
        debouncedTerm: 'phone',
        isTyping: false,
        isLoading: true,
        setSearchTerm: jest.fn(),
        setIsLoading: jest.fn(),
        clearSearch: jest.fn(),
      });

      render(<SearchBox onSearch={mockOnSearch} />);
      
      expect(screen.getByText('Buscando productos...')).toBeInTheDocument();
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
      expect(screen.getByTestId('search-input')).toHaveClass('ring-2', 'ring-blue-400');
    });

    it('should show clear button when there is text', () => {
      mockUseSearchDebounce.mockReturnValue({
        searchTerm: 'phone',
        debouncedTerm: '',
        isTyping: false,
        isLoading: false,
        setSearchTerm: jest.fn(),
        setIsLoading: jest.fn(),
        clearSearch: jest.fn(),
      });

      render(<SearchBox onSearch={mockOnSearch} />);
      
      expect(screen.getByTestId('clear-button')).toBeInTheDocument();
    });

    it('should call clearSearch when clear button is clicked', () => {
      const mockClearSearch = jest.fn();
      mockUseSearchDebounce.mockReturnValue({
        searchTerm: 'phone',
        debouncedTerm: '',
        isTyping: false,
        isLoading: false,
        setSearchTerm: jest.fn(),
        setIsLoading: jest.fn(),
        clearSearch: mockClearSearch,
      });

      render(<SearchBox onSearch={mockOnSearch} />);
      
      const clearButton = screen.getByTestId('clear-button');
      fireEvent.click(clearButton);
      
      expect(mockClearSearch).toHaveBeenCalled();
    });

    it('should handle empty field state correctly', () => {
      mockUseSearchDebounce.mockReturnValue({
        searchTerm: '',
        debouncedTerm: '',
        isTyping: false,
        isLoading: false,
        setSearchTerm: jest.fn(),
        setIsLoading: jest.fn(),
        clearSearch: jest.fn(),
      });

      render(<SearchBox onSearch={mockOnSearch} />);
      
      expect(screen.getByText(/Prueba con "phone" o palíndromos/)).toBeInTheDocument();
      expect(screen.queryByTestId('clear-button')).not.toBeInTheDocument();
    });

    it('should call onSearch with isTyping=true when user is typing', () => {
      const mockSetSearchTerm = jest.fn();
      mockUseSearchDebounce.mockReturnValue({
        searchTerm: 'p',
        debouncedTerm: '',
        isTyping: true,
        isLoading: false,
        setSearchTerm: mockSetSearchTerm,
        setIsLoading: jest.fn(),
        clearSearch: jest.fn(),
      });

      render(<SearchBox onSearch={mockOnSearch} />);
      
      // Simular que el efecto se ejecuta cuando isTyping cambia
      expect(mockOnSearch).toHaveBeenCalledWith('p', true);
    });

    it('should call onSearch with isTyping=false when debounce completes', () => {
      mockUseSearchDebounce.mockReturnValue({
        searchTerm: 'phone',
        debouncedTerm: 'phone',
        isTyping: false,
        isLoading: false,
        setSearchTerm: jest.fn(),
        setIsLoading: jest.fn(),
        clearSearch: jest.fn(),
      });

      render(<SearchBox onSearch={mockOnSearch} />);
      
      // Simular que el efecto se ejecuta cuando debouncedTerm cambia
      expect(mockOnSearch).toHaveBeenCalledWith('phone', false);
    });

    it('should handle rapid typing without multiple API calls', () => {
      let currentState = {
        searchTerm: '',
        debouncedTerm: '',
        isTyping: false,
        isLoading: false,
        setSearchTerm: jest.fn(),
        setIsLoading: jest.fn(),
        clearSearch: jest.fn(),
      };

      mockUseSearchDebounce.mockImplementation(() => currentState);

      const { rerender } = render(<SearchBox onSearch={mockOnSearch} />);

      // Simular escritura rápida
      currentState = { ...currentState, searchTerm: 'p', isTyping: true };
      rerender(<SearchBox onSearch={mockOnSearch} />);

      currentState = { ...currentState, searchTerm: 'ph', isTyping: true };
      rerender(<SearchBox onSearch={mockOnSearch} />);

      currentState = { ...currentState, searchTerm: 'pho', isTyping: true };
      rerender(<SearchBox onSearch={mockOnSearch} />);

      currentState = { ...currentState, searchTerm: 'phon', isTyping: true };
      rerender(<SearchBox onSearch={mockOnSearch} />);

      currentState = { ...currentState, searchTerm: 'phone', isTyping: true };
      rerender(<SearchBox onSearch={mockOnSearch} />);

      // Solo después del debounce debe cambiar debouncedTerm
      currentState = { ...currentState, debouncedTerm: 'phone', isTyping: false };
      rerender(<SearchBox onSearch={mockOnSearch} />);

      // Verificar que solo se llama con el término final
      expect(mockOnSearch).toHaveBeenLastCalledWith('phone', false);
    });

    it('should show palindrome badge only when results are shown and is palindrome', () => {
      mockUseSearchDebounce.mockReturnValue({
        searchTerm: 'abba',
        debouncedTerm: 'abba',
        isTyping: false,
        isLoading: false,
        setSearchTerm: jest.fn(),
        setIsLoading: jest.fn(),
        clearSearch: jest.fn(),
      });

      render(<SearchBox onSearch={mockOnSearch} isPalindrome={true} />);
      
      expect(screen.getByTestId('palindrome-badge')).toBeInTheDocument();
      expect(screen.getByTestId('palindrome-badge')).toHaveTextContent('¡Palíndromo detectado! 50% de descuento aplicado');
    });
  });
});
