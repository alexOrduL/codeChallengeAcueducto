import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
import { Product } from '../src/modules/products/entities/product.entity';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Product],
          synchronize: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    
    await app.init();

    // Seed test data
    const productRepository = app.get('ProductRepository');
    await productRepository.save([
      {
        title: 'Test ABBA Product',
        brand: 'ABBA',
        description: 'Test product with ABBA brand',
        price: 100,
        imageUrl: 'test.jpg',
      },
      {
        title: 'level',
        brand: 'TestBrand',
        description: 'Product with palindrome title',
        price: 200,
        imageUrl: 'test2.jpg',
      },
      {
        title: 'Regular Product',
        brand: 'RegularBrand',
        description: 'Regular product description',
        price: 150,
        imageUrl: 'test3.jpg',
      },
    ]);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/api/products/search (GET)', () => {
    it('should return products with 50% discount for palindrome search', () => {
      return request(app.getHttpServer())
        .get('/api/products/search?q=abba')
        .expect(200)
        .expect((res) => {
          expect(res.body.isPalindrome).toBe(true);
          expect(res.body.discountApplied).toBe(50);
          expect(res.body.products).toBeInstanceOf(Array);
          if (res.body.products.length > 0) {
            expect(res.body.products[0].discountPercentage).toBe(50);
          }
        });
    });

    it('should return products without discount for non-palindrome search', () => {
      return request(app.getHttpServer())
        .get('/api/products/search?q=regular')
        .expect(200)
        .expect((res) => {
          expect(res.body.isPalindrome).toBe(false);
          expect(res.body.discountApplied).toBe(0);
          expect(res.body.products).toBeInstanceOf(Array);
          if (res.body.products.length > 0) {
            expect(res.body.products[0].discountPercentage).toBe(0);
          }
        });
    });

    it('should return 400 for missing search query', () => {
      return request(app.getHttpServer())
        .get('/api/products/search')
        .expect(400);
    });

    it('should handle case-insensitive palindrome detection', () => {
      return request(app.getHttpServer())
        .get('/api/products/search?q=Level')
        .expect(200)
        .expect((res) => {
          expect(res.body.isPalindrome).toBe(true);
          expect(res.body.discountApplied).toBe(50);
        });
    });

    it('should find products by exact title match', () => {
      return request(app.getHttpServer())
        .get('/api/products/search?q=level')
        .expect(200)
        .expect((res) => {
          expect(res.body.products.length).toBeGreaterThan(0);
          expect(res.body.products.some(p => p.title.toLowerCase() === 'level')).toBe(true);
        });
    });
  });

  describe('/api/products (GET)', () => {
    it('should return all products', () => {
      return request(app.getHttpServer())
        .get('/api/products')
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('title');
          expect(res.body[0]).toHaveProperty('brand');
          expect(res.body[0]).toHaveProperty('price');
        });
    });
  });
});
