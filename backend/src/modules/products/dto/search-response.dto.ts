import { Product } from '../entities/product.entity';

export interface ProductWithDiscount extends Omit<Product, 'price'> {
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  discountAmount: number;
}

export class SearchResponseDto {
  products: ProductWithDiscount[];
  isPalindrome: boolean;
  discountApplied: number;
  totalResults: number;
  searchTerm: string;
}
