import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { SearchResponseDto, ProductWithDiscount } from './dto/search-response.dto';
import { isPalindrome, calculateDiscountedPrice } from '../../common/utils/palindrome.util';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async searchProducts(searchTerm: string): Promise<SearchResponseDto> {
    const cleanSearchTerm = searchTerm.trim().toLowerCase();
    
    // Si el término está vacío, devolver todos los productos
    if (cleanSearchTerm.length === 0) {
      const allProducts = await this.findAll();
      const productsWithDiscount: ProductWithDiscount[] = allProducts.map(product => ({
        id: product.id,
        title: product.title,
        brand: product.brand,
        description: product.description,
        imageUrl: product.imageUrl,
        createdAt: product.createdAt,
        originalPrice: Number(product.price),
        finalPrice: Number(product.price),
        discountPercentage: 0,
        discountAmount: 0,
      }));

      return {
        products: productsWithDiscount,
        isPalindrome: false,
        discountApplied: 0,
        totalResults: allProducts.length,
        searchTerm: searchTerm,
      };
    }
    
    // Crear query builder para búsqueda compleja
    const queryBuilder = this.productRepository.createQueryBuilder('product');
    
    // Lógica de búsqueda LIKE parcial desde el primer carácter:
    // 1. Título que contenga el término (LIKE parcial)
    // 2. Marca que contenga el término (LIKE parcial)
    // 3. Descripción que contenga el término (LIKE parcial)
    queryBuilder.where(
      'LOWER(product.title) ILIKE :substring OR LOWER(product.brand) ILIKE :substring OR LOWER(product.description) ILIKE :substring',
      {
        substring: `%${cleanSearchTerm}%`,
      }
    );

    const products = await queryBuilder.getMany();
    
    // Verificar si el término de búsqueda es palíndromo
    const isSearchPalindrome = isPalindrome(searchTerm);
    
    // Aplicar descuentos si corresponde
    const productsWithDiscount: ProductWithDiscount[] = products.map(product => {
      const priceInfo = calculateDiscountedPrice(Number(product.price), searchTerm);
      
      return {
        id: product.id,
        title: product.title,
        brand: product.brand,
        description: product.description,
        imageUrl: product.imageUrl,
        createdAt: product.createdAt,
        originalPrice: priceInfo.originalPrice,
        finalPrice: priceInfo.finalPrice,
        discountPercentage: priceInfo.discountPercentage,
        discountAmount: priceInfo.discountAmount,
      };
    });

    return {
      products: productsWithDiscount,
      isPalindrome: isSearchPalindrome,
      discountApplied: isSearchPalindrome ? 50 : 0,
      totalResults: products.length,
      searchTerm: searchTerm,
    };
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
    });
  }
}
