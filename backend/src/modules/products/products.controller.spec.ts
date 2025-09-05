import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SearchResponseDto } from './dto/search-response.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
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
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
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
