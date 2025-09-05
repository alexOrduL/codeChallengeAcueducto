import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductCard } from '../ProductCard';
import { ProductWithDiscount } from '@/types/product';

const mockProduct: ProductWithDiscount = {
  id: 1,
  title: 'Test Product',
  brand: 'Test Brand',
  description: 'Test product description',
  imageUrl: 'https://example.com/image.jpg',
  createdAt: '2024-01-01T00:00:00Z',
  originalPrice: 100,
  finalPrice: 100,
  discountPercentage: 0,
  discountAmount: 0,
};

const mockProductWithDiscount: ProductWithDiscount = {
  ...mockProduct,
  finalPrice: 50,
  discountPercentage: 50,
  discountAmount: 50,
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByTestId('product-title')).toHaveTextContent('Test Product');
    expect(screen.getByTestId('product-brand')).toHaveTextContent('Test Brand');
    expect(screen.getByTestId('product-description')).toHaveTextContent('Test product description');
    expect(screen.getByTestId('price')).toHaveTextContent('$100.00');
  });

  it('renders product image with correct attributes', () => {
    render(<ProductCard product={mockProduct} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Test Product');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('shows discount badge when product has discount', () => {
    render(<ProductCard product={mockProductWithDiscount} />);
    
    const discountBadge = screen.getByTestId('discount-badge');
    expect(discountBadge).toBeInTheDocument();
    expect(discountBadge).toHaveTextContent('50% OFF');
  });

  it('does not show discount badge when product has no discount', () => {
    render(<ProductCard product={mockProduct} />);
    
    const discountBadge = screen.queryByTestId('discount-badge');
    expect(discountBadge).not.toBeInTheDocument();
  });

  it('shows original and final prices when product has discount', () => {
    render(<ProductCard product={mockProductWithDiscount} />);
    
    expect(screen.getByTestId('final-price')).toHaveTextContent('$50.00');
    expect(screen.getByTestId('original-price')).toHaveTextContent('$100.00');
    expect(screen.getByTestId('savings')).toHaveTextContent('Ahorras $50.00');
  });

  it('shows only regular price when product has no discount', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByTestId('price')).toHaveTextContent('$100.00');
    expect(screen.queryByTestId('final-price')).not.toBeInTheDocument();
    expect(screen.queryByTestId('original-price')).not.toBeInTheDocument();
    expect(screen.queryByTestId('savings')).not.toBeInTheDocument();
  });

  it('shows palindrome discount badge when product has discount', () => {
    render(<ProductCard product={mockProductWithDiscount} />);
    
    const palindromeBadge = screen.getByText('🎉 Descuento por palíndromo');
    expect(palindromeBadge).toBeInTheDocument();
  });

  it('does not show palindrome badge when product has no discount', () => {
    render(<ProductCard product={mockProduct} />);
    
    const palindromeBadge = screen.queryByText('🎉 Descuento por palíndromo');
    expect(palindromeBadge).not.toBeInTheDocument();
  });

  it('handles products without description', () => {
    const productWithoutDescription = { ...mockProduct, description: '' };
    render(<ProductCard product={productWithoutDescription} />);
    
    expect(screen.getByTestId('product-title')).toBeInTheDocument();
    expect(screen.getByTestId('product-brand')).toBeInTheDocument();
  });

  it('applies hover effects with correct classes', () => {
    const { container } = render(<ProductCard product={mockProduct} />);
    
    const card = container.querySelector('.product-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('hover:shadow-2xl');
  });

  it('formats prices correctly with decimals', () => {
    const productWithDecimals = {
      ...mockProduct,
      originalPrice: 99.99,
      finalPrice: 49.995,
      discountPercentage: 50,
      discountAmount: 49.995,
    };
    
    render(<ProductCard product={productWithDecimals} />);
    
    expect(screen.getByTestId('final-price')).toHaveTextContent('$49.99');
    expect(screen.getByTestId('original-price')).toHaveTextContent('$99.99');
    expect(screen.getByTestId('savings')).toHaveTextContent('Ahorras $49.99');
  });
});
