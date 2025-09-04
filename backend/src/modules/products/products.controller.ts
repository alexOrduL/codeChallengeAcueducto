import { Controller, Get, Query, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { SearchProductsDto } from './dto/search-products.dto';
import { SearchResponseDto } from './dto/search-response.dto';
import { Product } from './entities/product.entity';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('search')
  async searchProducts(
    @Query(ValidationPipe) searchDto: SearchProductsDto,
  ): Promise<SearchResponseDto> {
    try {
      const result = await this.productsService.searchProducts(searchDto.q);
      return result;
    } catch (error) {
      throw new HttpException(
        'Error al buscar productos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<Product[]> {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error al obtener productos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Query('id') id: string): Promise<Product> {
    try {
      const product = await this.productsService.findOne(+id);
      if (!product) {
        throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error al obtener el producto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
