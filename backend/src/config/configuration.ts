import { registerAs } from '@nestjs/config';
import { IsString, IsNumber, IsOptional, validateSync } from 'class-validator';
import { plainToClass, Transform } from 'class-transformer';

/**
 * Clase de validación para variables de entorno
 * Garantiza que todas las variables críticas estén presentes y sean válidas
 */
class EnvironmentVariables {
  @IsString()
  NODE_ENV: string = 'development';

  @IsString()
  DB_HOST: string = 'localhost';

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  DB_PORT: number = 5432;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_DATABASE: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  PORT: number = 3001;

  @IsString()
  @IsOptional()
  FRONTEND_URL: string = 'http://localhost:3000';

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  THROTTLE_TTL: number = 60;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  THROTTLE_LIMIT: number = 100;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  THROTTLE_SEARCH_LIMIT: number = 30;
}

/**
 * Función de validación de configuración
 * Se ejecuta al iniciar la aplicación para garantizar configuración válida
 */
export function validateConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const errorMessages = errors.map(error => {
      const constraints = error.constraints ? Object.values(error.constraints) : [];
      return `${error.property}: ${constraints.join(', ')}`;
    });
    
    console.error('❌ Error de configuración:', errorMessages);
    throw new Error(`Configuration validation error: ${errorMessages.join('; ')}`);
  }

  return validatedConfig;
}

/**
 * Configuración de base de datos
 */
export const databaseConfig = registerAs('database', () => ({
  type: 'postgres' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
}));

/**
 * Configuración de throttling/rate limiting
 */
export const throttleConfig = registerAs('throttle', () => ({
  ttl: parseInt(process.env.THROTTLE_TTL, 10) || 60, // 60 segundos
  limit: parseInt(process.env.THROTTLE_LIMIT, 10) || 100, // 100 requests por TTL
  searchLimit: parseInt(process.env.THROTTLE_SEARCH_LIMIT, 10) || 30, // 30 búsquedas por TTL
}));

/**
 * Configuración de seguridad
 */
export const securityConfig = registerAs('security', () => ({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  },
  helmet: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    hsts: {
      maxAge: 31536000, // 1 año
      includeSubDomains: true,
      preload: true,
    },
  },
}));
