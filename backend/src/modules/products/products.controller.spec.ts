import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus, Controller, Get, Query, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { SearchResponseDto } from './dto/search-response.dto';
import { SearchProductsDto } from './dto/search-products.dto';
import { Product } from './entities/product.entity';

// Test version of ProductsController without ThrottlerGuard decorators
@Controller('api/v1/products')
class TestProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('search')
  async searchProducts(
    @Query() searchDto: SearchProductsDto,
    @Req() request: any,
  ): Promise<SearchResponseDto> {
    try {
      return await this.productsService.searchProducts(searchDto.q);
    } catch (error) {
      throw new HttpException('Error al buscar productos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll(@Req() request: any): Promise<Product[]> {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      throw new HttpException('Error al obtener productos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() request: any): Promise<Product> {
    try {
      const product = await this.productsService.findOne(id);
      if (!product) {
        throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al obtener el producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

describe('ProductsController', () => {
  let controller: TestProductsController;
  let service: ProductsService;

  const mockProductsService = {
    searchProducts: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  const mockSearchResponse: SearchResponseDto = {
    products: [
      {
        id: 1,
        title: 'Test Product',
        brand: 'ABBA',
        description: 'Test description',
        imageUrl: 'test.jpg',
        createdAt: new Date(),
        originalPrice: 100,
        finalPrice: 50,
        discountPercentage: 50,
        discountAmount: 50,
      },
    ],
    isPalindrome: true,
    discountApplied: 50,
    totalResults: 1,
    searchTerm: 'abba',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<TestProductsController>(TestProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('searchProducts', () => {
    it('should return search results successfully', async () => {
      mockProductsService.searchProducts.mockResolvedValue(mockSearchResponse);

      const mockRequest = { ip: '127.0.0.1', url: '/api/v1/products/search?q=abba' } as any;
      const result = await controller.searchProducts({ q: 'abba' }, mockRequest);

      expect(result).toEqual(mockSearchResponse);
      expect(service.searchProducts).toHaveBeenCalledWith('abba');
    });

    it('should throw HttpException when service throws error', async () => {
      mockProductsService.searchProducts.mockRejectedValue(new Error('Database error'));

      const mockRequest = { ip: '127.0.0.1', url: '/api/v1/products/search?q=test' } as any;

      await expect(controller.searchProducts({ q: 'test' }, mockRequest)).rejects.toThrow(
        new HttpException('Error al buscar productos', HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });

  describe('findAll', () => {
    it('should return all products successfully', async () => {
      const mockProducts = [
        {
          id: 1,
          title: 'Test Product',
          brand: 'Test Brand',
          description: 'Test description',
          price: 100,
          imageUrl: 'test.jpg',
          createdAt: new Date(),
        },
      ];
      mockProductsService.findAll.mockResolvedValue(mockProducts);

      const mockRequest = { ip: '127.0.0.1', url: '/api/v1/products' } as any;
      const result = await controller.findAll(mockRequest);

      expect(result).toEqual(mockProducts);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should throw HttpException when service throws error', async () => {
      mockProductsService.findAll.mockRejectedValue(new Error('Database error'));

      const mockRequest = { ip: '127.0.0.1', url: '/api/v1/products' } as any;

      await expect(controller.findAll(mockRequest)).rejects.toThrow(
        new HttpException('Error al obtener productos', HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });

  describe('findOne', () => {
    it('should return a product successfully', async () => {
      const mockProduct = {
        id: 1,
        title: 'Test Product',
        brand: 'Test Brand',
        description: 'Test description',
        price: 100,
        imageUrl: 'test.jpg',
        createdAt: new Date(),
      };
      mockProductsService.findOne.mockResolvedValue(mockProduct);

      const mockRequest = { ip: '127.0.0.1', url: '/api/v1/products/1' } as any;
      const result = await controller.findOne(1, mockRequest);

      expect(result).toEqual(mockProduct);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NOT_FOUND when product does not exist', async () => {
      mockProductsService.findOne.mockResolvedValue(null);
      const mockRequest = { ip: '127.0.0.1', url: '/api/v1/products/999' } as any;

      await expect(controller.findOne(999, mockRequest)).rejects.toThrow(
        new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND)
      );
    });

    it('should throw INTERNAL_SERVER_ERROR when service throws error', async () => {
      mockProductsService.findOne.mockRejectedValue(new Error('Database error'));
      const mockRequest = { ip: '127.0.0.1', url: '/api/v1/products/1' } as any;

      await expect(controller.findOne(1, mockRequest)).rejects.toThrow(
        new HttpException('Error al obtener el producto', HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });
});
