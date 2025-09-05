import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBox } from '../SearchBox';

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
    expect(searchInput).toHaveAttribute('placeholder', 'Buscar equipamiento de tenis... (ej: raqueta, wilson, abba, level)');
  });

  it('shows search input with correct attributes', () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toHaveAttribute('type', 'text');
    expect(searchInput).not.toBeDisabled();
  });

  it('renders correctly with different props', () => {
    const { rerender } = render(<SearchBox onSearch={mockOnSearch} />);
    
    // Test basic rendering
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    
    // Test with different props
    rerender(<SearchBox onSearch={mockOnSearch} isPalindrome={true} />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('shows help text when search input is empty', () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    
    const helpText = screen.getByText(/Prueba con "raqueta", "wilson" o palíndromos como/);
    expect(helpText).toBeInTheDocument();
  });

  it('updates input value when user types', () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'level' } });
    
    expect(searchInput.value).toBe('level');
  });

  it('should show clear button when there is text', () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'phone' } });
    
    const clearButton = screen.getByTestId('clear-button');
    expect(clearButton).toBeInTheDocument();
  });

  it('should clear input when clear button is clicked', () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'phone' } });
    
    const clearButton = screen.getByTestId('clear-button');
    fireEvent.click(clearButton);
    
    expect(searchInput.value).toBe('');
  });

  it('🎯 should not show any palindrome badge in SearchBox (simplified UX)', () => {
    const { rerender } = render(<SearchBox onSearch={mockOnSearch} />);
    
    // SearchBox no longer shows palindrome badges to avoid UI saturation
    expect(screen.queryByTestId('palindrome-badge')).not.toBeInTheDocument();
    
    // Even with palindrome prop
    rerender(<SearchBox onSearch={mockOnSearch} isPalindrome={true} />);
    expect(screen.queryByTestId('palindrome-badge')).not.toBeInTheDocument();
    expect(screen.queryByText(/Palíndromo detectado/)).not.toBeInTheDocument();
  });
});