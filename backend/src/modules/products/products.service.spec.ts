import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  const mockRepository = {
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
    })),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Test Product',
      brand: 'ABBA',
      description: 'Test description',
      price: 100,
      imageUrl: 'test.jpg',
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Another Product',
      brand: 'TestBrand',
      description: 'Another description with abba',
      price: 200,
      imageUrl: 'test2.jpg',
      createdAt: new Date(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchProducts', () => {
    it('should return all products when search term is empty', async () => {
      mockRepository.find.mockResolvedValue(mockProducts);

      const result = await service.searchProducts('');

      expect(result.isPalindrome).toBe(false);
      expect(result.discountApplied).toBe(0);
      expect(result.products).toHaveLength(2);
      expect(result.products[0].discountPercentage).toBe(0);
      expect(result.products[0].finalPrice).toBe(100);
      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
      });
    });

    it('should return all products when search term is only whitespace', async () => {
      mockRepository.find.mockResolvedValue(mockProducts);

      const result = await service.searchProducts('   ');

      expect(result.isPalindrome).toBe(false);
      expect(result.discountApplied).toBe(0);
      expect(result.products).toHaveLength(2);
      expect(result.searchTerm).toBe('   ');
    });

    it('should perform exact title search and LIKE search for brand/description when > 3 chars', async () => {
      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockProducts),
      };
      mockRepository.createQueryBuilder.mockReturnValue(queryBuilder);

      const result = await service.searchProducts('raqueta');

      expect(queryBuilder.where).toHaveBeenCalledWith(
        '(LOWER(product.title) = :exactTitle OR LOWER(product.brand) ILIKE :substring OR LOWER(product.description) ILIKE :substring)',
        { exactTitle: 'raqueta', substring: '%raqueta%' }
      );
      expect(result.products).toHaveLength(2);
    });

    it('should only search exact title when search term is <= 3 characters', async () => {
      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockProducts),
      };
      mockRepository.createQueryBuilder.mockReturnValue(queryBuilder);

      const result = await service.searchProducts('ab');

      expect(queryBuilder.where).toHaveBeenCalledWith(
        '(LOWER(product.title) = :exactTitle)',
        { exactTitle: 'ab' }
      );
      expect(result.products).toHaveLength(2);
    });

    it('should return products with discount when search term is palindrome', async () => {
      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockProducts),
      };
      mockRepository.createQueryBuilder.mockReturnValue(queryBuilder);

      const result = await service.searchProducts('abba');

      expect(result.isPalindrome).toBe(true);
      expect(result.discountApplied).toBe(50);
      expect(result.products).toHaveLength(2);
      expect(result.products[0].discountPercentage).toBe(50);
      expect(result.products[0].finalPrice).toBe(50);
    });

    it('should return products without discount when search term is not palindrome', async () => {
      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockProducts),
      };
      mockRepository.createQueryBuilder.mockReturnValue(queryBuilder);

      const result = await service.searchProducts('test');

      expect(result.isPalindrome).toBe(false);
      expect(result.discountApplied).toBe(0);
      expect(result.products).toHaveLength(2);
      expect(result.products[0].discountPercentage).toBe(0);
      expect(result.products[0].finalPrice).toBe(100);
    });

    it('should handle short search terms (less than 3 characters)', async () => {
      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      };
      mockRepository.createQueryBuilder.mockReturnValue(queryBuilder);

      await service.searchProducts('ab');

      expect(queryBuilder.where).toHaveBeenCalledWith(
        '(LOWER(product.title) = :exactTitle)',
        { exactTitle: 'ab' }
      );
    });

    it('should handle single character search with exact title only', async () => {
      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      };
      mockRepository.createQueryBuilder.mockReturnValue(queryBuilder);

      await service.searchProducts('p');

      expect(queryBuilder.where).toHaveBeenCalledWith(
        '(LOWER(product.title) = :exactTitle)',
        { exactTitle: 'p' }
      );
    });

    it('should handle partial matches correctly - raqueta finds tennis products', async () => {
      const tennisProduct = {
        id: 3,
        title: 'Raqueta ABBA Pro',
        brand: 'ABBA',
        description: 'Raqueta de tenis profesional con tecnología ABBA avanzada',
        price: 199.99,
        imageUrl: 'raqueta.jpg',
        createdAt: new Date(),
      };

      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([tennisProduct]),
      };
      mockRepository.createQueryBuilder.mockReturnValue(queryBuilder);

      const result = await service.searchProducts('raqueta');

      expect(queryBuilder.where).toHaveBeenCalledWith(
        '(LOWER(product.title) = :exactTitle OR LOWER(product.brand) ILIKE :substring OR LOWER(product.description) ILIKE :substring)',
        { exactTitle: 'raqueta', substring: '%raqueta%' }
      );
      expect(result.products).toHaveLength(1);
      expect(result.products[0].title).toBe('Raqueta ABBA Pro');
    });

    it('should handle case insensitive search', async () => {
      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      };
      mockRepository.createQueryBuilder.mockReturnValue(queryBuilder);

      await service.searchProducts('PHONE');

      expect(queryBuilder.where).toHaveBeenCalledWith(
        '(LOWER(product.title) = :exactTitle OR LOWER(product.brand) ILIKE :substring OR LOWER(product.description) ILIKE :substring)',
        { exactTitle: 'phone', substring: '%phone%' }
      );
    });
  });

  describe('findAll', () => {
    it('should return all products ordered by creation date', async () => {
      mockRepository.find.mockResolvedValue(mockProducts);

      const result = await service.findAll();

      expect(result).toEqual(mockProducts);
      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single product by id', async () => {
      const mockProduct = mockProducts[0];
      mockRepository.findOne.mockResolvedValue(mockProduct);

      const result = await service.findOne(1);

      expect(result).toEqual(mockProduct);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
