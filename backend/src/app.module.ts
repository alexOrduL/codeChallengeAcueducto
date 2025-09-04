import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';
import { Product } from './modules/products/entities/product.entity';
import { SeedService } from './database/seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'palindrome_user'),
        password: configService.get('DB_PASSWORD', 'palindrome_password'),
        database: configService.get('DB_NAME', 'palindrome_db'),
        entities: [Product],
        synchronize: true, // Habilitado para demo
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    ProductsModule,
    TypeOrmModule.forFeature([Product]), // Para que SeedService pueda inyectar el repositorio
  ],
  providers: [SeedService],
})
export class AppModule {}
