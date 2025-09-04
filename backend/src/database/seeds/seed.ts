import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Product } from '../../modules/products/entities/product.entity';
import { seedProducts } from './products.seed';

async function runSeed() {
  const configService = new ConfigService();
  
  const dataSource = new DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST', 'localhost'),
    port: configService.get('DB_PORT', 5432),
    username: configService.get('DB_USERNAME', 'postgres'),
    password: configService.get('DB_PASSWORD', 'password'),
    database: configService.get('DB_NAME', 'palindrome_ecommerce'),
    entities: [Product],
    synchronize: true,
  });

  try {
    await dataSource.initialize();
    console.log('🔌 Conectado a la base de datos');

    await seedProducts(dataSource);
    
    console.log('🌱 Seed completado exitosamente');
  } catch (error) {
    console.error('❌ Error durante el seed:', error);
  } finally {
    await dataSource.destroy();
  }
}

if (require.main === module) {
  runSeed();
}
