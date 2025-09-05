import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log'],
    });
    
    const configService = app.get(ConfigService);
    
    // 🔒 Configurar Helmet (simplificado para desarrollo)
    if (process.env.NODE_ENV === 'production') {
      app.use(helmet());
    } else {
      // En desarrollo, solo usar configuración básica
      app.use(helmet({
        contentSecurityPolicy: false,
        hsts: false,
      }));
    }

    // 🔒 Configurar CORS
    app.enableCors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
      credentials: true,
    });

    // 🔒 Configurar validación global
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    const port = configService.get('PORT') || 3001;
    
    await app.listen(port);
    
    logger.log(`🚀 Servidor ejecutándose en http://localhost:${port}`);
    logger.log(`📊 API v1 disponible en http://localhost:${port}/api/v1`);
    logger.log(`🔒 Seguridad: Helmet, CORS, Rate Limiting habilitados`);
    
  } catch (error) {
    logger.error('❌ Error al iniciar la aplicación:', error);
    logger.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  console.error('💥 Error crítico al iniciar:', error);
  process.exit(1);
});
