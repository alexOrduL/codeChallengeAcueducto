import { 
  Controller, 
  Get, 
  Query, 
  ValidationPipe, 
  HttpException, 
  HttpStatus,
  Logger,
  UseGuards,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { ProductsService } from './products.service';
import { SearchProductsDto } from './dto/search-products.dto';
import { SearchResponseDto } from './dto/search-response.dto';
import { Product } from './entities/product.entity';

@Controller('api/v1/products')
@UseGuards(ThrottlerGuard)
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(
    private readonly productsService: ProductsService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 🔍 Endpoint de búsqueda con rate limiting específico
   * Rate limit más estricto para búsquedas (30 por minuto)
   */
  @Get('search')
  @Throttle({ default: { limit: 100, ttl: 60000 } }) // 100 requests por 60 segundos para desarrollo
  async searchProducts(
    @Query(ValidationPipe) searchDto: SearchProductsDto,
    @Req() request: Request,
  ): Promise<SearchResponseDto> {
    const startTime = Date.now();
    const clientIp = request.ip || 'unknown';
    
    try {
      this.logger.log(`🔍 Búsqueda iniciada: "${searchDto.q}" desde IP: ${clientIp}`);
      
      const result = await this.productsService.searchProducts(searchDto.q);
      
      const duration = Date.now() - startTime;
      this.logger.log(`✅ Búsqueda completada en ${duration}ms - ${result.totalResults} resultados`);
      
      return {
        ...result,
        meta: {
          searchTime: duration,
          timestamp: new Date().toISOString(),
          version: 'v1',
        },
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(`❌ Error en búsqueda después de ${duration}ms:`, error.stack);
      
      throw new HttpException(
        {
          message: 'Error al buscar productos',
          error: 'SEARCH_ERROR',
          timestamp: new Date().toISOString(),
          path: request.url,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 📋 Obtener todos los productos
   * Rate limit estándar (100 por minuto)
   */
  @Get()
  async findAll(@Req() request: Request): Promise<{
    data: Product[];
    meta: { count: number; timestamp: string; version: string };
  }> {
    const startTime = Date.now();
    
    try {
      this.logger.log('📋 Obteniendo todos los productos');
      
      const products = await this.productsService.findAll();
      const duration = Date.now() - startTime;
      
      this.logger.log(`✅ ${products.length} productos obtenidos en ${duration}ms`);
      
      return {
        data: products,
        meta: {
          count: products.length,
          timestamp: new Date().toISOString(),
          version: 'v1',
        },
      };
    } catch (error) {
      this.logger.error('❌ Error obteniendo productos:', error.stack);
      
      throw new HttpException(
        {
          message: 'Error al obtener productos',
          error: 'FETCH_ERROR',
          timestamp: new Date().toISOString(),
          path: request.url,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 🎯 Obtener producto específico por ID
   * Rate limit estándar (100 por minuto)
   */
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: Request,
  ): Promise<{
    data: Product;
    meta: { timestamp: string; version: string };
  }> {
    const startTime = Date.now();
    
    try {
      this.logger.log(`🎯 Obteniendo producto ID: ${id}`);
      
      const product = await this.productsService.findOne(id);
      
      if (!product) {
        this.logger.warn(`⚠️ Producto no encontrado - ID: ${id}`);
        throw new HttpException(
          {
            message: 'Producto no encontrado',
            error: 'NOT_FOUND',
            timestamp: new Date().toISOString(),
            path: request.url,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      
      const duration = Date.now() - startTime;
      this.logger.log(`✅ Producto obtenido en ${duration}ms`);
      
      return {
        data: product,
        meta: {
          timestamp: new Date().toISOString(),
          version: 'v1',
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      this.logger.error(`❌ Error obteniendo producto ID ${id}:`, error.stack);
      
      throw new HttpException(
        {
          message: 'Error al obtener el producto',
          error: 'FETCH_ERROR',
          timestamp: new Date().toISOString(),
          path: request.url,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
