import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../modules/products/entities/product.entity';
// Función para obtener imagen específica por ID
function getImageByProductId(id: number): string {
  const images = [
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1588186939549-c087e0796efd?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&auto=format'
  ];
  
  return images[id - 1] || images[0]; // Fallback al primer elemento si el ID no existe
}

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedProducts();
  }

  private async seedProducts() {
    // Verificar si ya hay productos
    const existingProducts = await this.productRepository.count();
    if (existingProducts > 0) {
      console.log(`✅ Base de datos ya contiene ${existingProducts} productos. Actualizando imágenes...`);
      await this.updateProductImages();
      return;
    }

    console.log('🌱 Insertando datos de prueba...');

    const products = [
      {
        title: 'Raqueta ABBA Pro',
        brand: 'ABBA',
        description: 'Raqueta de tenis profesional con tecnología ABBA avanzada y balance perfecto',
        price: 199.99,
        imageUrl: getImageByProductId(1),
      },
      {
        title: 'Zapatillas Tennis Premium',
        brand: 'TechABBA',
        description: 'Zapatillas de tenis con tecnología ABBA y suela antideslizante profesional',
        price: 149.99,
        imageUrl: getImageByProductId(2),
      },
      {
        title: 'Pelotas de Tenis',
        brand: 'TennisPro',
        description: 'Pelotas de tenis profesionales con núcleo ABBA-X y fieltro premium',
        price: 24.99,
        imageUrl: getImageByProductId(3),
      },
      {
        title: 'Overgrip Premium',
        brand: 'GripMaster',
        description: 'Overgrip absorbente para mejor agarre y control en la raqueta',
        price: 8.99,
        imageUrl: getImageByProductId(4),
      },
      {
        title: 'Cordaje de Tenis',
        brand: 'StringTech',
        description: 'Cordaje de tenis profesional con tecnología HDR y durabilidad extrema',
        price: 39.99,
        imageUrl: getImageByProductId(5),
      },
      {
        title: 'Muñequera Deportiva',
        brand: 'WristPro',
        description: 'Muñequera ergonómica con soporte y absorción de sudor',
        price: 12.99,
        imageUrl: getImageByProductId(6),
      },
      {
        title: 'Bolsa de Raquetas',
        brand: 'BagPro',
        description: 'Bolsa para raquetas con compartimentos múltiples y correas ajustables',
        price: 79.99,
        imageUrl: getImageByProductId(7),
      },
      {
        title: 'Toalla Deportiva',
        brand: 'TowelWave',
        description: 'Toalla deportiva absorbente con tecnología de secado rápido',
        price: 19.99,
        imageUrl: getImageByProductId(8),
      },
      {
        title: 'level',
        brand: 'TestBrand',
        description: 'Producto para testing de palíndromos con título level',
        price: 49.99,
        imageUrl: getImageByProductId(9),
      },
      {
        title: 'Protector de Raqueta',
        brand: 'ProtectPro',
        description: 'Protector de raqueta resistente con tecnología racecar ultra resistente',
        price: 15.99,
        imageUrl: getImageByProductId(10),
      },
      {
        title: 'Cinta de Grip',
        brand: 'TapeTech',
        description: 'Cinta de grip adhesiva para mejor agarre en la empuñadura',
        price: 6.99,
        imageUrl: getImageByProductId(11),
      },
      {
        title: 'Gorra de Tenis',
        brand: 'CapPro',
        description: 'Gorra de tenis con protección UV y tecnología de secado rápido',
        price: 29.99,
        imageUrl: getImageByProductId(12),
      },
      {
        title: 'Raqueta Wilson Pro Staff',
        brand: 'Wilson',
        description: 'Raqueta profesional Wilson Pro Staff con tecnología avanzada y balance perfecto',
        price: 249.99,
        imageUrl: getImageByProductId(13),
      },
      {
        title: 'Zapatillas Nike Air Zoom',
        brand: 'Nike',
        description: 'Zapatillas Nike Air Zoom con tecnología de amortiguación y suela antideslizante',
        price: 179.99,
        imageUrl: getImageByProductId(14),
      },
      {
        title: 'Pelotas Wilson US Open',
        brand: 'Wilson',
        description: 'Pelotas oficiales Wilson US Open con núcleo de caucho premium',
        price: 19.99,
        imageUrl: getImageByProductId(15),
      },
      {
        title: 'Overgrip Yonex Super Grap',
        brand: 'Yonex',
        description: 'Overgrip Yonex Super Grap con excelente absorción y agarre',
        price: 7.99,
        imageUrl: getImageByProductId(16),
      },
      {
        title: 'Cordaje Luxilon Alu Power',
        brand: 'Luxilon',
        description: 'Cordaje Luxilon Alu Power con tecnología de polímero avanzado',
        price: 45.99,
        imageUrl: getImageByProductId(17),
      },
      {
        title: 'Muñequera Adidas ClimaLite',
        brand: 'Adidas',
        description: 'Muñequera Adidas ClimaLite con tecnología de secado rápido',
        price: 15.99,
        imageUrl: getImageByProductId(18),
      },
      {
        title: 'Bolsa Head Tour Team',
        brand: 'Head',
        description: 'Bolsa Head Tour Team con compartimentos múltiples y correas ajustables',
        price: 89.99,
        imageUrl: getImageByProductId(19),
      },
      {
        title: 'Toalla Microfiber Pro',
        brand: 'TowelPro',
        description: 'Toalla Microfiber Pro con tecnología de absorción ultra rápida',
        price: 24.99,
        imageUrl: getImageByProductId(20),
      },
      {
        title: 'Protector de Raqueta Head',
        brand: 'Head',
        description: 'Protector de raqueta Head con tecnología de absorción de impactos',
        price: 18.99,
        imageUrl: getImageByProductId(21),
      },
      {
        title: 'Cinta de Grip Wilson Pro',
        brand: 'Wilson',
        description: 'Cinta de grip Wilson Pro con adhesivo de larga duración',
        price: 8.99,
        imageUrl: getImageByProductId(22),
      },
      {
        title: 'Gorra Under Armour',
        brand: 'Under Armour',
        description: 'Gorra Under Armour con tecnología de secado rápido y protección UV',
        price: 34.99,
        imageUrl: getImageByProductId(23),
      },
      {
        title: 'Raqueta Babolat Pure Drive',
        brand: 'Babolat',
        description: 'Raqueta Babolat Pure Drive con tecnología de potencia y control',
        price: 229.99,
        imageUrl: getImageByProductId(24),
      },
      {
        title: 'Zapatillas Adidas Barricade',
        brand: 'Adidas',
        description: 'Zapatillas Adidas Barricade con tecnología de estabilidad y durabilidad',
        price: 159.99,
        imageUrl: getImageByProductId(25),
      },
      {
        title: 'Pelotas Dunlop Fort',
        brand: 'Dunlop',
        description: 'Pelotas Dunlop Fort con núcleo de caucho natural y fieltro premium',
        price: 22.99,
        imageUrl: getImageByProductId(26),
      },
      {
        title: 'Overgrip Tourna Grip',
        brand: 'Tourna',
        description: 'Overgrip Tourna Grip con excelente absorción de sudor',
        price: 6.99,
        imageUrl: getImageByProductId(27),
      },
      {
        title: 'Cordaje Tecnifibre X-One',
        brand: 'Tecnifibre',
        description: 'Cordaje Tecnifibre X-One con tecnología de multifilamento',
        price: 52.99,
        imageUrl: getImageByProductId(28),
      },
      {
        title: 'Muñequera Nike Dri-FIT',
        brand: 'Nike',
        description: 'Muñequera Nike Dri-FIT con tecnología de secado rápido',
        price: 12.99,
        imageUrl: getImageByProductId(29),
      },
      {
        title: 'Bolsa Yonex Pro Series',
        brand: 'Yonex',
        description: 'Bolsa Yonex Pro Series con compartimentos organizados y correas ergonómicas',
        price: 95.99,
        imageUrl: getImageByProductId(30),
      },
      {
        title: 'Toalla Yonex Super Absorb',
        brand: 'Yonex',
        description: 'Toalla Yonex Super Absorb con tecnología de absorción ultra rápida',
        price: 27.99,
        imageUrl: getImageByProductId(31),
      },
      {
        title: 'Protector de Raqueta Wilson',
        brand: 'Wilson',
        description: 'Protector de raqueta Wilson con tecnología de absorción de impactos',
        price: 16.99,
        imageUrl: getImageByProductId(32),
      },
      {
        title: 'Cinta de Grip Babolat',
        brand: 'Babolat',
        description: 'Cinta de grip Babolat con adhesivo de larga duración',
        price: 9.99,
        imageUrl: getImageByProductId(33),
      },
      {
        title: 'Gorra New Balance',
        brand: 'New Balance',
        description: 'Gorra New Balance con tecnología de secado rápido y protección UV',
        price: 31.99,
        imageUrl: getImageByProductId(34),
      },
      {
        title: 'Raqueta Prince Textreme',
        brand: 'Prince',
        description: 'Raqueta Prince Textreme con tecnología de fibra de carbono',
        price: 199.99,
        imageUrl: getImageByProductId(35),
      },
      {
        title: 'Zapatillas Asics Gel Resolution',
        brand: 'Asics',
        description: 'Zapatillas Asics Gel Resolution con tecnología de amortiguación GEL',
        price: 169.99,
        imageUrl: getImageByProductId(36),
      },
      {
        title: 'Pelotas Head ATP',
        brand: 'Head',
        description: 'Pelotas Head ATP con núcleo de caucho natural y fieltro premium',
        price: 21.99,
        imageUrl: getImageByProductId(37),
      },
      {
        title: 'Overgrip Gamma Supreme',
        brand: 'Gamma',
        description: 'Overgrip Gamma Supreme con excelente absorción y agarre',
        price: 7.49,
        imageUrl: getImageByProductId(38),
      },
      {
        title: 'Cordaje Solinco Hyper-G',
        brand: 'Solinco',
        description: 'Cordaje Solinco Hyper-G con tecnología de polímero avanzado',
        price: 48.99,
        imageUrl: getImageByProductId(39),
      },
      {
        title: 'Muñequera Head Prestige',
        brand: 'Head',
        description: 'Muñequera Head Prestige con tecnología de secado rápido',
        price: 14.99,
        imageUrl: getImageByProductId(40),
      },
      {
        title: 'Bolsa Tecnifibre T-Fight',
        brand: 'Tecnifibre',
        description: 'Bolsa Tecnifibre T-Fight con compartimentos múltiples y correas ajustables',
        price: 79.99,
        imageUrl: getImageByProductId(41),
      },
      {
        title: 'Toalla Tecnifibre Pro',
        brand: 'Tecnifibre',
        description: 'Toalla Tecnifibre Pro con tecnología de absorción ultra rápida',
        price: 26.99,
        imageUrl: getImageByProductId(42),
      },
      {
        title: 'Protector de Raqueta Babolat',
        brand: 'Babolat',
        description: 'Protector de raqueta Babolat con tecnología de absorción de impactos',
        price: 17.99,
        imageUrl: getImageByProductId(43),
      },
      {
        title: 'Cinta de Grip Yonex',
        brand: 'Yonex',
        description: 'Cinta de grip Yonex con adhesivo de larga duración',
        price: 8.49,
        imageUrl: getImageByProductId(44),
      },
      {
        title: 'Gorra Tecnifibre',
        brand: 'Tecnifibre',
        description: 'Gorra Tecnifibre con tecnología de secado rápido y protección UV',
        price: 33.99,
        imageUrl: getImageByProductId(45),
      },
    ];

    try {
      await this.productRepository.save(products);
      console.log(`✅ ${products.length} productos insertados exitosamente!`);
    } catch (error) {
      console.error('❌ Error insertando productos:', error);
    }
  }

  private async updateProductImages() {
    try {
      const products = await this.productRepository.find();
      let updatedCount = 0;

      for (const product of products) {
        const newImageUrl = getImageByProductId(product.id);
        if (newImageUrl !== product.imageUrl) {
          product.imageUrl = newImageUrl;
          await this.productRepository.save(product);
          updatedCount++;
        }
      }

      console.log(`✅ ${updatedCount} imágenes de productos actualizadas!`);
    } catch (error) {
      console.error('❌ Error actualizando imágenes:', error);
    }
  }
}
