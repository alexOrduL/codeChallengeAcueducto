import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ProductsModule } from './modules/products/products.module';
import { Product } from './modules/products/entities/product.entity';
import { SeedService } from './database/seed.service';
// Configuración temporal simplificada
// import { 
//   validateConfig, 
//   databaseConfig, 
//   throttleConfig, 
//   securityConfig 
// } from './config/configuration';

@Module({
  imports: [
    // 🔒 Configuración global simplificada (temporal)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // 🔒 Rate Limiting global
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
          name: 'default',
          ttl: parseInt(configService.get('THROTTLE_TTL'), 10) || 60000, // 60 segundos en ms
          limit: parseInt(configService.get('THROTTLE_LIMIT'), 10) || 100,
        },
      ],
      inject: [ConfigService],
    }),
    
    // 🗄️ Base de datos con configuración segura
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT'), 10),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Product],
        synchronize: process.env.NODE_ENV === 'development',
        logging: process.env.NODE_ENV === 'development',
        // 🔒 Configuraciones de seguridad adicionales
        extra: {
          connectionTimeoutMillis: 30000,
          idleTimeoutMillis: 30000,
          max: 10, // máximo 10 conexiones concurrentes
        },
      }),
      inject: [ConfigService],
    }),
    
    ProductsModule,
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [
    SeedService,
    // 🔒 Rate limiting global guard
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
