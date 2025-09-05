import { Product } from '../entities/product.entity';

export interface ProductWithDiscount extends Omit<Product, 'price'> {
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  discountAmount: number;
}

export interface SearchResponseMeta {
  searchTime?: number;
  timestamp: string;
  version: string;
}

export class SearchResponseDto {
  products: ProductWithDiscount[];
  isPalindrome: boolean;
  discountApplied: number;
  totalResults: number;
  searchTerm: string;
  meta?: SearchResponseMeta;
}
