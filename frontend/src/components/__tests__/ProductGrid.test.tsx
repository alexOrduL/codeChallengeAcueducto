import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductGrid } from '../ProductGrid';
import { ProductWithDiscount } from '@/types/product';

// Mock data
const mockProducts: ProductWithDiscount[] = Array.from({ length: 20 }, (_, i) => ({
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

describe('ProductGrid', () => {
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
    expect(loadMoreButton).toHaveTextContent('Ver más productos (8 restantes)');
  });

  test('should load 8 more products when "Ver más productos" is clicked', async () => {
    render(<ProductGrid {...defaultProps} />);
    
    const loadMoreButton = screen.getByText(/Ver más productos/);
    fireEvent.click(loadMoreButton);
    
    await waitFor(() => {
      // Should now show product 13
      expect(screen.getByText('Product 13')).toBeInTheDocument();
      expect(screen.getByText('Product 20')).toBeInTheDocument();
    });
    
    // Button should show remaining products (20 - 20 = 0)
    // Después de mostrar 12 + 8 = 20, no debe haber botón "Ver más"
    expect(screen.queryByText(/Ver más productos/)).not.toBeInTheDocument();
  });

  test('should hide "Ver más productos" button when all products are shown', async () => {
    render(<ProductGrid {...defaultProps} />);
    
    const loadMoreButton = screen.getByText(/Ver más productos/);
    fireEvent.click(loadMoreButton);
    
    await waitFor(() => {
      expect(screen.queryByText(/Ver más productos/)).not.toBeInTheDocument();
    });
  });

  test('should show search results header when there is a search term', () => {
    render(<ProductGrid {...defaultProps} searchTerm="test" />);
    
    // Should show the results header with product count
    expect(screen.getByText(/20.*productos.*encontrados/)).toBeInTheDocument();
    
    // Should show the first 12 products
    expect(screen.getByTestId('product-product-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-product-12')).toBeInTheDocument();
  });

  test('should reset pagination when products change', () => {
    const { rerender } = render(<ProductGrid {...defaultProps} />);
    
    // Click load more to show more products
    const loadMoreButton = screen.getByText(/Ver más productos/);
    fireEvent.click(loadMoreButton);
    
    // Verify more products are shown
    expect(screen.getByText('Product 13')).toBeInTheDocument();
    
    // Change products (simulate new search)
    const newProducts = mockProducts.slice(0, 15);
    rerender(<ProductGrid {...defaultProps} products={newProducts} />);
    
    // Should reset to showing first 12 products
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 12')).toBeInTheDocument();
    expect(screen.queryByText('Product 13')).not.toBeInTheDocument();
  });

  test('should not show pagination info when there are 12 or fewer products', () => {
    const fewProducts = mockProducts.slice(0, 10);
    render(<ProductGrid {...defaultProps} products={fewProducts} />);
    
    expect(screen.queryByText(/Mostrando.*productos/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Ver más productos/)).not.toBeInTheDocument();
  });

  test('should show loading skeleton when isLoading is true', () => {
    render(<ProductGrid {...defaultProps} isLoading={true} />);
    
    // Should show loading skeletons instead of products
    expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
    // Check for skeleton elements instead of actual products
    const skeletonElements = screen.getAllByRole('generic', { hidden: true });
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  test('should show empty state when isEmpty is true', () => {
    render(<ProductGrid {...defaultProps} isEmpty={true} />);
    
    // Check for welcome message since empty state shows welcome when no search term
    expect(screen.getByText(/¡Bienvenido a Palindrome Store!/)).toBeInTheDocument();
    expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
  });
});