export interface Product {
  id: number;
  title: string;
  brand: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface ProductWithDiscount extends Omit<Product, 'price'> {
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  discountAmount: number;
}

export interface SearchResponse {
  products: ProductWithDiscount[];
  isPalindrome: boolean;
  discountApplied: number;
  totalResults: number;
  searchTerm: string;
}
