import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductGrid } from '../ProductGrid';
import { ProductWithDiscount } from '@/types/product';

const mockProducts: ProductWithDiscount[] = [
  {
    id: 1,
    title: 'Product 1',
    brand: 'Brand 1',
    description: 'Description 1',
    imageUrl: 'https://example.com/image1.jpg',
    createdAt: '2024-01-01T00:00:00Z',
    originalPrice: 100,
    finalPrice: 50,
    discountPercentage: 50,
    discountAmount: 50,
  },
  {
    id: 2,
    title: 'Product 2',
    brand: 'Brand 2',
    description: 'Description 2',
    imageUrl: 'https://example.com/image2.jpg',
    createdAt: '2024-01-02T00:00:00Z',
    originalPrice: 200,
    finalPrice: 200,
    discountPercentage: 0,
    discountAmount: 0,
  },
];

describe('ProductGrid', () => {
  it('renders products correctly', () => {
    render(<ProductGrid products={mockProducts} />);
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('shows loading skeletons when isLoading is true', () => {
    render(<ProductGrid products={[]} isLoading={true} />);
    
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('shows empty state when no products and not loading', () => {
    render(<ProductGrid products={[]} isEmpty={true} />);
    
    expect(screen.getByText('No se encontraron productos')).toBeInTheDocument();
    expect(screen.getByText('🔍')).toBeInTheDocument();
  });

  it('shows search-specific empty state with search term', () => {
    render(<ProductGrid products={[]} isEmpty={true} searchTerm="test search" />);
    
    expect(screen.getByText('No se encontraron productos')).toBeInTheDocument();
    expect(screen.getByText(/No encontramos productos que coincidan con "test search"/)).toBeInTheDocument();
  });

  it('shows general empty state without search term', () => {
    render(<ProductGrid products={[]} isEmpty={true} />);
    
    expect(screen.getByText(/Utiliza el buscador para encontrar productos específicos/)).toBeInTheDocument();
  });

  it('renders products in grid layout', () => {
    const { container } = render(<ProductGrid products={mockProducts} />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');
  });

  it('renders correct number of products', () => {
    render(<ProductGrid products={mockProducts} />);
    
    const productCards = screen.getAllByRole('img');
    expect(productCards).toHaveLength(mockProducts.length);
  });

  it('does not render products when loading', () => {
    render(<ProductGrid products={mockProducts} isLoading={true} />);
    
    expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  });

  it('renders 8 skeleton items when loading', () => {
    render(<ProductGrid products={[]} isLoading={true} />);
    
    const skeletonContainers = document.querySelectorAll('.space-y-4');
    expect(skeletonContainers).toHaveLength(8);
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <ProductGrid products={mockProducts} className="custom-class" />
    );
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('custom-class');
  });

  it('shows empty state when products array is empty but isEmpty is not explicitly set', () => {
    render(<ProductGrid products={[]} />);
    
    expect(screen.getByText('No se encontraron productos')).toBeInTheDocument();
  });

  it('handles single product correctly', () => {
    const singleProduct = [mockProducts[0]];
    render(<ProductGrid products={singleProduct} />);
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  });

  it('maintains responsive grid classes', () => {
    const { container } = render(<ProductGrid products={mockProducts} />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass(
      'grid-cols-1',
      'md:grid-cols-2', 
      'lg:grid-cols-3',
      'xl:grid-cols-4'
    );
  });
});
