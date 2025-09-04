# 🏗️ Arquitectura del Proyecto - Palindrome Ecommerce

## 📁 Estructura de Carpetas (Buenas Prácticas)

```
palindrome-ecommerce/
├── 📁 docs/                          # Documentación técnica
│   ├── ARCHITECTURE.md               # Este archivo - arquitectura
│   ├── API.md                        # Documentación de API (futuro)
│   └── DEPLOYMENT.md                 # Guía de despliegue (futuro)
│
├── 📁 backend/                       # Aplicación NestJS
│   ├── 📁 src/
│   │   ├── 📁 common/                # Utilidades compartidas
│   │   │   └── 📁 utils/             # Funciones utilitarias
│   │   ├── 📁 modules/               # Módulos de negocio
│   │   │   └── 📁 products/          # Módulo de productos
│   │   │       ├── 📁 dto/           # Data Transfer Objects
│   │   │       ├── 📁 entities/      # Entidades TypeORM
│   │   │       ├── products.controller.ts
│   │   │       ├── products.service.ts
│   │   │       └── products.module.ts
│   │   └── 📁 database/              # Configuración BD
│   │       └── 📁 seeds/             # Datos de prueba
│   ├── 📁 test/                      # Tests E2E
│   ├── Dockerfile                    # Imagen producción
│   ├── Dockerfile.dev                # Imagen desarrollo
│   └── package.json
│
├── 📁 frontend/                      # Aplicación Next.js
│   ├── 📁 src/
│   │   ├── 📁 app/                   # App Router (Next.js 14)
│   │   │   ├── globals.css           # Estilos globales
│   │   │   ├── layout.tsx            # Layout principal
│   │   │   └── page.tsx              # Página principal
│   │   ├── 📁 components/            # Componentes React
│   │   │   ├── 📁 ui/                # Componentes UI base
│   │   │   ├── 📁 __tests__/         # Tests unitarios
│   │   │   ├── ModernHeader.tsx      # Header moderno
│   │   │   ├── HeroSearchSection.tsx # Hero con búsqueda
│   │   │   ├── ProductCard.tsx       # Tarjeta de producto
│   │   │   ├── ProductGrid.tsx       # Grid de productos
│   │   │   ├── SearchBox.tsx         # Caja de búsqueda
│   │   │   ├── LoadingSkeleton.tsx   # Skeletons de carga
│   │   │   └── EmptyState.tsx        # Estados vacíos
│   │   ├── 📁 hooks/                 # Hooks personalizados
│   │   │   ├── 📁 __tests__/         # Tests de hooks
│   │   │   └── useSearchDebounce.ts  # Hook de debounce
│   │   ├── 📁 lib/                   # Utilidades y APIs
│   │   │   ├── api.ts                # Cliente API
│   │   │   └── utils.ts              # Utilidades
│   │   └── 📁 types/                 # Definiciones TypeScript
│   │       └── product.ts            # Tipos de productos
│   ├── 📁 tests/e2e/                 # Tests E2E Playwright
│   ├── 📁 public/                    # Assets estáticos
│   ├── Dockerfile                    # Imagen producción
│   ├── Dockerfile.dev                # Imagen desarrollo
│   └── package.json
│
├── 📁 .github/                       # CI/CD (futuro)
│   └── 📁 workflows/
│
├── docker-compose.yml                # Orquestación producción
├── docker-compose.dev.yml            # Orquestación desarrollo
├── package.json                      # Workspace raíz
└── README.md                         # Documentación principal
```

## 🎯 Principios de Arquitectura Aplicados

### 1. **Separación de Responsabilidades**
- **Backend**: API REST, lógica de negocio, base de datos
- **Frontend**: UI/UX, estado local, interacciones
- **Database**: Persistencia de datos con PostgreSQL

### 2. **Modularidad**
- **Backend**: Módulos NestJS independientes
- **Frontend**: Componentes reutilizables y hooks personalizados
- **Shared**: Tipos TypeScript compartidos

### 3. **Escalabilidad**
- Arquitectura por capas
- Inyección de dependencias
- Componentes desacoplados
- APIs RESTful bien definidas

### 4. **Mantenibilidad**
- Código autodocumentado
- Tests exhaustivos (unitarios, integración, E2E)
- Convenciones de naming consistentes
- Estructura de carpetas intuitiva

## 🔧 Patrones de Diseño Implementados

### Backend (NestJS)
- **Module Pattern**: Organización en módulos
- **Dependency Injection**: Inyección de dependencias
- **Repository Pattern**: Acceso a datos con TypeORM
- **DTO Pattern**: Validación y transformación de datos

### Frontend (Next.js)
- **Component Pattern**: Componentes reutilizables
- **Custom Hooks Pattern**: Lógica compartida
- **Compound Components**: Componentes compuestos
- **State Management**: Estado local optimizado

## 🧪 Estrategia de Testing

### Pirámide de Testing Implementada
```
                    /\
                   /  \
              E2E /____\ (Playwright)
                 /      \
        Integration /____\ (Supertest)
                   /        \
             Unit /__________\ (Jest + RTL)
```

### Tipos de Tests
1. **Unit Tests**: Funciones puras, hooks, utilidades
2. **Integration Tests**: APIs, componentes con estado
3. **E2E Tests**: Flujos completos de usuario

## 🚀 Flujo de Desarrollo

### 1. Desarrollo Local
```bash
# Modo desarrollo con hot reload
npm run dev:setup
npm run dev:start
```

### 2. Testing
```bash
# Todos los tests
npm run test:all

# Tests específicos
npm run test:backend
npm run test:frontend
npm run test:e2e
```

### 3. Producción
```bash
# Build y deploy
npm run build
npm run start:prod
```

## 📊 Métricas de Calidad

### Code Quality
- **TypeScript Strict**: ✅ Habilitado
- **ESLint**: ✅ Configurado
- **Prettier**: ✅ Formateo automático
- **Husky**: 🔄 Pendiente (Git hooks)

### Performance
- **Next.js Optimizations**: ✅ Image optimization, bundle splitting
- **Database Indexing**: ✅ Índices en campos de búsqueda
- **Caching Strategy**: 🔄 Pendiente (Redis)

### Security
- **Input Validation**: ✅ class-validator
- **SQL Injection Protection**: ✅ TypeORM
- **CORS Configuration**: ✅ Configurado
- **Rate Limiting**: 🔄 Pendiente

## 🔮 Roadmap Técnico

### Próximas Mejoras
1. **CI/CD Pipeline** con GitHub Actions
2. **Monitoring** con Prometheus + Grafana
3. **Caching Layer** con Redis
4. **Rate Limiting** y Security Headers
5. **Database Migrations** automatizadas
6. **Performance Monitoring** con Sentry
