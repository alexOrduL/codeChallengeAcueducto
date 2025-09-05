import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../modules/products/entities/product.entity';

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
      console.log(`✅ Base de datos ya contiene ${existingProducts} productos. Saltando seed.`);
      return;
    }

    console.log('🌱 Insertando datos de prueba...');

    const products = [
      {
        title: 'Raqueta ABBA Pro',
        brand: 'ABBA',
        description: 'Raqueta de tenis profesional con tecnología ABBA avanzada y balance perfecto',
        price: 199.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Zapatillas Tennis Premium',
        brand: 'TechABBA',
        description: 'Zapatillas de tenis con tecnología ABBA y suela antideslizante profesional',
        price: 149.99,
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      },
      {
        title: 'Pelotas de Tenis',
        brand: 'TennisPro',
        description: 'Pelotas de tenis profesionales con núcleo ABBA-X y fieltro premium',
        price: 24.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Overgrip Premium',
        brand: 'GripMaster',
        description: 'Overgrip absorbente para mejor agarre y control en la raqueta',
        price: 8.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Cordaje de Tenis',
        brand: 'StringTech',
        description: 'Cordaje de tenis profesional con tecnología HDR y durabilidad extrema',
        price: 39.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Muñequera Deportiva',
        brand: 'WristPro',
        description: 'Muñequera ergonómica con soporte y absorción de sudor',
        price: 12.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Bolsa de Raquetas',
        brand: 'BagPro',
        description: 'Bolsa para raquetas con compartimentos múltiples y correas ajustables',
        price: 79.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Toalla Deportiva',
        brand: 'TowelWave',
        description: 'Toalla deportiva absorbente con tecnología de secado rápido',
        price: 19.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'level',
        brand: 'TestBrand',
        description: 'Producto para testing de palíndromos con título level',
        price: 49.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Protector de Raqueta',
        brand: 'ProtectPro',
        description: 'Protector de raqueta resistente con tecnología racecar ultra resistente',
        price: 15.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Cinta de Grip',
        brand: 'TapeTech',
        description: 'Cinta de grip adhesiva para mejor agarre en la empuñadura',
        price: 6.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Gorra de Tenis',
        brand: 'CapPro',
        description: 'Gorra de tenis con protección UV y tecnología de secado rápido',
        price: 29.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Raqueta Wilson Pro Staff',
        brand: 'Wilson',
        description: 'Raqueta profesional Wilson Pro Staff con tecnología avanzada y balance perfecto',
        price: 249.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Zapatillas Nike Air Zoom',
        brand: 'Nike',
        description: 'Zapatillas Nike Air Zoom con tecnología de amortiguación y suela antideslizante',
        price: 179.99,
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      },
      {
        title: 'Pelotas Wilson US Open',
        brand: 'Wilson',
        description: 'Pelotas oficiales Wilson US Open con núcleo de caucho premium',
        price: 19.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Overgrip Yonex Super Grap',
        brand: 'Yonex',
        description: 'Overgrip Yonex Super Grap con excelente absorción y agarre',
        price: 7.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Cordaje Luxilon Alu Power',
        brand: 'Luxilon',
        description: 'Cordaje Luxilon Alu Power con tecnología de polímero avanzado',
        price: 45.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Muñequera Adidas ClimaLite',
        brand: 'Adidas',
        description: 'Muñequera Adidas ClimaLite con tecnología de secado rápido',
        price: 15.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Bolsa Head Tour Team',
        brand: 'Head',
        description: 'Bolsa Head Tour Team con compartimentos múltiples y correas ajustables',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Toalla Microfiber Pro',
        brand: 'TowelPro',
        description: 'Toalla Microfiber Pro con tecnología de absorción ultra rápida',
        price: 24.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Protector de Raqueta Head',
        brand: 'Head',
        description: 'Protector de raqueta Head con tecnología de absorción de impactos',
        price: 18.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Cinta de Grip Wilson Pro',
        brand: 'Wilson',
        description: 'Cinta de grip Wilson Pro con adhesivo de larga duración',
        price: 8.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Gorra Under Armour',
        brand: 'Under Armour',
        description: 'Gorra Under Armour con tecnología de secado rápido y protección UV',
        price: 34.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Raqueta Babolat Pure Drive',
        brand: 'Babolat',
        description: 'Raqueta Babolat Pure Drive con tecnología de potencia y control',
        price: 229.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Zapatillas Adidas Barricade',
        brand: 'Adidas',
        description: 'Zapatillas Adidas Barricade con tecnología de estabilidad y durabilidad',
        price: 159.99,
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      },
      {
        title: 'Pelotas Dunlop Fort',
        brand: 'Dunlop',
        description: 'Pelotas Dunlop Fort con núcleo de caucho natural y fieltro premium',
        price: 22.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Overgrip Tourna Grip',
        brand: 'Tourna',
        description: 'Overgrip Tourna Grip con excelente absorción de sudor',
        price: 6.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Cordaje Tecnifibre X-One',
        brand: 'Tecnifibre',
        description: 'Cordaje Tecnifibre X-One con tecnología de multifilamento',
        price: 52.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Muñequera Nike Dri-FIT',
        brand: 'Nike',
        description: 'Muñequera Nike Dri-FIT con tecnología de secado rápido',
        price: 12.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Bolsa Yonex Pro Series',
        brand: 'Yonex',
        description: 'Bolsa Yonex Pro Series con compartimentos organizados y correas ergonómicas',
        price: 95.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Toalla Yonex Super Absorb',
        brand: 'Yonex',
        description: 'Toalla Yonex Super Absorb con tecnología de absorción ultra rápida',
        price: 27.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Protector de Raqueta Wilson',
        brand: 'Wilson',
        description: 'Protector de raqueta Wilson con tecnología de absorción de impactos',
        price: 16.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Cinta de Grip Babolat',
        brand: 'Babolat',
        description: 'Cinta de grip Babolat con adhesivo de larga duración',
        price: 9.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Gorra New Balance',
        brand: 'New Balance',
        description: 'Gorra New Balance con tecnología de secado rápido y protección UV',
        price: 31.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Raqueta Prince Textreme',
        brand: 'Prince',
        description: 'Raqueta Prince Textreme con tecnología de fibra de carbono',
        price: 199.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Zapatillas Asics Gel Resolution',
        brand: 'Asics',
        description: 'Zapatillas Asics Gel Resolution con tecnología de amortiguación GEL',
        price: 169.99,
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      },
      {
        title: 'Pelotas Head ATP',
        brand: 'Head',
        description: 'Pelotas Head ATP con núcleo de caucho natural y fieltro premium',
        price: 21.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Overgrip Gamma Supreme',
        brand: 'Gamma',
        description: 'Overgrip Gamma Supreme con excelente absorción y agarre',
        price: 7.49,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Cordaje Solinco Hyper-G',
        brand: 'Solinco',
        description: 'Cordaje Solinco Hyper-G con tecnología de polímero avanzado',
        price: 48.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Muñequera Head Prestige',
        brand: 'Head',
        description: 'Muñequera Head Prestige con tecnología de secado rápido',
        price: 14.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Bolsa Tecnifibre T-Fight',
        brand: 'Tecnifibre',
        description: 'Bolsa Tecnifibre T-Fight con compartimentos múltiples y correas ajustables',
        price: 79.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Toalla Tecnifibre Pro',
        brand: 'Tecnifibre',
        description: 'Toalla Tecnifibre Pro con tecnología de absorción ultra rápida',
        price: 26.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Protector de Raqueta Babolat',
        brand: 'Babolat',
        description: 'Protector de raqueta Babolat con tecnología de absorción de impactos',
        price: 17.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Cinta de Grip Yonex',
        brand: 'Yonex',
        description: 'Cinta de grip Yonex con adhesivo de larga duración',
        price: 8.49,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
      {
        title: 'Gorra Tecnifibre',
        brand: 'Tecnifibre',
        description: 'Gorra Tecnifibre con tecnología de secado rápido y protección UV',
        price: 33.99,
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      },
    ];

    try {
      await this.productRepository.save(products);
      console.log(`✅ ${products.length} productos insertados exitosamente!`);
    } catch (error) {
      console.error('❌ Error insertando productos:', error);
    }
  }
}
