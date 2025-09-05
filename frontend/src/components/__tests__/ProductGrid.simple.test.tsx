import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductGrid } from '../ProductGrid';
import { ProductWithDiscount } from '@/types/product';

// Mock data - 15 products to test pagination (12 initial + 3 more)
const mockProducts: ProductWithDiscount[] = Array.from({ length: 15 }, (_, i) => ({
  id: `product-${i + 1}`,
  title: `Product ${i + 1}`,
  brand: `Brand ${i + 1}`,
  description: `Description for product ${i + 1}`,
  price: 100 + i * 10,
  originalPrice: 100 + i * 10,
  finalPrice: 100 + i * 10,
  imageUrl: `https://example.com/image-${i + 1}.jpg`,
  discountPercentage: 0,
}));

describe('ProductGrid - Pagination', () => {
  const defaultProps = {
    products: mockProducts,
    isLoading: false,
    isEmpty: false,
    isPalindrome: false,
    onAddToCart: jest.fn(),
    onToggleFavorite: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render first 12 products initially', () => {
    render(<ProductGrid {...defaultProps} />);
    
    // Should show first 12 products
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 12')).toBeInTheDocument();
    
    // Should not show product 13 initially
    expect(screen.queryByText('Product 13')).not.toBeInTheDocument();
  });

  test('should show "Ver más productos" button when there are more than 12 products', () => {
    render(<ProductGrid {...defaultProps} />);
    
    const loadMoreButton = screen.getByText(/Ver más productos/);
    expect(loadMoreButton).toBeInTheDocument();
  });

  test('should load more products when "Ver más productos" is clicked', () => {
    render(<ProductGrid {...defaultProps} />);
    
    const loadMoreButton = screen.getByText(/Ver más productos/);
    fireEvent.click(loadMoreButton);
    
    // Should now show product 13
    expect(screen.getByText('Product 13')).toBeInTheDocument();
  });

  test('should hide "Ver más productos" button when all products are shown', () => {
    render(<ProductGrid {...defaultProps} />);
    
    const loadMoreButton = screen.getByText(/Ver más productos/);
    fireEvent.click(loadMoreButton);
    
    // After clicking, all 15 products should be visible, so button should disappear
    expect(screen.queryByText(/Ver más productos/)).not.toBeInTheDocument();
  });

  test('should show loading state', () => {
    render(<ProductGrid {...defaultProps} isLoading={true} />);
    
    // Should show loading skeletons instead of products
    expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
    
    // Should show skeleton elements
    const skeletons = screen.getAllByText('', { selector: '.skeleton' });
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test('should show empty state', () => {
    render(<ProductGrid {...defaultProps} isEmpty={true} />);
    
    // Check for welcome message since empty state shows welcome when no search term
    expect(screen.getByText(/¡Bienvenido a Palindrome Store!/)).toBeInTheDocument();
    expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
  });

  test('should reset pagination when products change', () => {
    const { rerender } = render(<ProductGrid {...defaultProps} />);
    
    // Click load more to show more products
    const loadMoreButton = screen.getByText(/Ver más productos/);
    fireEvent.click(loadMoreButton);
    
    // Verify more products are shown
    expect(screen.getByText('Product 13')).toBeInTheDocument();
    
    // Change products (simulate new search)
    const newProducts = mockProducts.slice(0, 10);
    rerender(<ProductGrid {...defaultProps} products={newProducts} />);
    
    // Should reset to showing first products only
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 13')).not.toBeInTheDocument();
  });
});
