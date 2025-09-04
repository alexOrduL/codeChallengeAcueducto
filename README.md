# 🔄 Palindrome Ecommerce

> **Ecommerce moderno con descuentos automáticos del 50% al buscar palíndromos**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)](https://postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://docker.com/)
[![Tests](https://img.shields.io/badge/Tests-Passing-green?logo=jest)](https://jestjs.io/)

---

## 🎯 **Características Principales**

- ✨ **Detección automática de palíndromos** con 50% de descuento
- 🔍 **Búsqueda inteligente** LIKE parcial desde el primer carácter
- 🎨 **UI moderna** con Glass Morphism y animaciones premium
- ⚡ **Debouncing inteligente** de 1 segundo para optimizar API calls
- 🧪 **Testing exhaustivo** (unitarios, integración y E2E)
- 🐳 **Docker ready** con hot reload para desarrollo
- 📱 **Responsive design** mobile-first optimizado
- 🚀 **Performance optimizada** con lazy loading y memoización

---

## 🏗️ **Arquitectura del Proyecto**

```
palindrome-ecommerce/
├── 📁 backend/           # API NestJS con TypeORM + PostgreSQL
├── 📁 frontend/          # UI Next.js 14 con Tailwind + Shadcn/ui  
├── 📁 docs/              # Documentación técnica
├── 📁 scripts/           # Scripts de automatización
├── 🐳 docker-compose.yml # Orquestación producción
└── 🐳 docker-compose.dev.yml # Desarrollo con hot reload
```

### **Stack Tecnológico**

| Capa | Tecnología | Versión | Propósito |
|------|------------|---------|-----------|
| **Frontend** | Next.js | 14.0.4 | App Router, SSR, Optimizaciones |
| **UI/UX** | Tailwind CSS | 3.4.0 | Styling, Responsive, Animations |
| **Components** | Shadcn/ui | Latest | Design System, Accessibility |
| **Backend** | NestJS | 10.2.10 | API REST, Decorators, DI |
| **Database** | PostgreSQL | 15 | Datos persistentes, ACID |
| **ORM** | TypeORM | 0.3.17 | Migrations, Relations, Queries |
| **Language** | TypeScript | 5.3+ | Type Safety, Developer Experience |
| **Testing** | Jest + Playwright | Latest | Unit, Integration, E2E |
| **Containerization** | Docker | Latest | Desarrollo y Producción |

---

## 🚀 **Inicio Rápido**

### **Opción 1: Setup Completo (Recomendado)**

```bash
# Clonar repositorio
git clone <repository-url>
cd codeChallengeAcueducto

# Setup completo con un solo comando
docker compose down --volumes --remove-orphans && \
docker compose build --no-cache && \
docker compose up -d postgres && \
sleep 15 && \
docker compose up -d backend && \
sleep 20 && \
docker compose up -d frontend && \
echo "✅ Setup completo! Frontend: http://localhost:3000"
```

**¿Qué hace este comando?**
1. ✅ Limpia contenedores anteriores y volúmenes
2. ✅ Construye imágenes optimizadas sin cache
3. ✅ Inicia PostgreSQL y espera que esté listo
4. ✅ Ejecuta migraciones automáticas (TypeORM sync)
5. ✅ Pobla la BD con 12 productos automáticamente
6. ✅ Inicia backend y frontend
7. ✅ Confirma que todo esté funcionando

### **Opción 2: Desarrollo con Hot Reload**

```bash
# Setup para desarrollo (cambios en vivo)
docker compose -f docker-compose.dev.yml down --volumes && \
docker compose -f docker-compose.dev.yml build --no-cache && \
docker compose -f docker-compose.dev.yml up -d && \
echo "🔥 Desarrollo activo! Hot reload habilitado"
```

**Características del modo desarrollo:**
- 🔥 **Hot reload** automático en cambios de código
- 🐛 **Debug mode** habilitado (puerto 9229)
- 📁 **Volúmenes montados** para carpetas src/
- ⚡ **Recarga instantánea** sin rebuilds

### **Opción 3: Paso a Paso (Manual)**

```bash
# 1. Limpiar y construir
docker compose down --volumes --remove-orphans
docker compose build

# 2. Iniciar solo PostgreSQL
docker compose up -d postgres

# 3. Esperar y verificar PostgreSQL
sleep 15
docker compose exec postgres pg_isready -U palindrome_user -d palindrome_db

# 4. Iniciar backend (con migraciones automáticas)
docker compose up -d backend

# 5. Esperar backend y verificar
sleep 20
curl -s http://localhost:3001/api/products | head -1

# 6. Iniciar frontend
docker compose up -d frontend

# 7. Verificar todo funciona
docker compose ps
```

---

## 🌐 **URLs de Acceso**

Una vez iniciado el proyecto:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **🎨 Frontend** | http://localhost:3000 | UI moderna con Glass Morphism |
| **🔧 Backend API** | http://localhost:3001 | API REST con documentación |
| **📊 Base de Datos** | localhost:5432 | PostgreSQL (user: palindrome_user) |
| **🐛 Debug Port** | localhost:9229 | Para debugging con VS Code |

---

## 🎮 **Cómo Usar la Aplicación**

### **🔍 Búsquedas con Palíndromos (50% OFF)**

Prueba estos términos para obtener **descuento automático**:

| Palíndromo | Productos Encontrados | Descuento |
|------------|----------------------|-----------|
| `abba` | Auriculares ABBA Pro, TechABBA, etc. | 50% OFF |
| `level` | Producto con título "level" | 50% OFF |
| `racecar` | Tablet con "racecar" en descripción | 50% OFF |
| `A man a plan a canal Panama` | Todos los productos | 50% OFF |

### **🔍 Búsquedas Regulares**

| Término | Funcionalidad | Productos |
|---------|---------------|-----------|
| `phone` | Búsqueda LIKE parcial | "Smartphone Premium" |
| `gaming` | Busca en descripción | "Laptop Gaming" |
| `tech` | Busca en marca | "TechABBA", "DisplayTech" |
| *(vacío)* | Muestra todos | 12 productos |

### **✨ Características UX Modernas**

- **🎯 Debouncing**: Espera 1 segundo después de escribir
- **⚡ Estados visuales**: Loading, typing, results, empty, error
- **🎨 Animaciones**: Float, shimmer, scale-in, slide-up
- **📱 Responsive**: Perfecto en móvil, tablet y desktop
- **🔄 Hot reload**: Cambios instantáneos en desarrollo

---

## 🧪 **Testing Completo**

### **Ejecutar Todos los Tests**

```bash
# Suite completa de testing (un solo comando)
echo "🧪 Ejecutando todos los tests..." && \
docker compose -f docker-compose.dev.yml up -d && \
sleep 20 && \
echo "📋 Backend Unit Tests:" && \
docker compose -f docker-compose.dev.yml exec backend-dev npm test && \
echo "📋 Backend E2E Tests:" && \
docker compose -f docker-compose.dev.yml exec backend-dev npm run test:e2e && \
echo "📋 Frontend Unit Tests:" && \
docker compose -f docker-compose.dev.yml exec frontend-dev npm test -- --watchAll=false && \
echo "📋 API Functional Tests:" && \
curl -s http://localhost:3001/api/products/search?q=abba | grep -q "isPalindrome.*true" && echo "✅ Palíndromo test: PASSED" || echo "❌ Palíndromo test: FAILED" && \
echo "🎉 Tests completados!"
```

**¿Qué tests incluye?**
- ✅ **Backend Unit Tests**: Utilidades, servicios, controladores
- ✅ **Backend E2E Tests**: API endpoints, integración con BD
- ✅ **Frontend Unit Tests**: Componentes, hooks, utilidades  
- ✅ **API Functional Tests**: Verificación de endpoints reales

### **Tests Específicos**

```bash
# Backend
docker compose exec backend npm test                    # Tests unitarios
docker compose exec backend npm run test:cov            # Con coverage
docker compose exec backend npm run test:e2e            # End-to-end

# Frontend  
docker compose exec frontend npm test                   # Tests unitarios
docker compose exec frontend npm run test:coverage      # Con coverage
docker compose exec frontend npm run test:e2e           # Playwright E2E
```

### **📊 Cobertura de Tests**

| Módulo | Unit Tests | Integration Tests | E2E Tests | Coverage |
|--------|------------|-------------------|-----------|----------|
| **Palindrome Utils** | ✅ 25+ casos | ✅ API integration | ✅ UI flows | >95% |
| **Products Service** | ✅ CRUD + Search | ✅ Database queries | ✅ Search flows | >90% |
| **Search Components** | ✅ States + Hooks | ✅ API calls | ✅ User interactions | >90% |
| **UI Components** | ✅ Render + Props | ✅ User events | ✅ Visual testing | >85% |

---

## 📋 **Comandos Útiles**

### **🐳 Docker**

```bash
# Ver estado de servicios
docker compose ps

# Ver logs en tiempo real
docker compose logs -f [service]

# Reiniciar servicio específico
docker compose restart [backend|frontend|postgres]

# Limpiar todo (incluye volúmenes)
docker compose down --volumes --remove-orphans

# Entrar a un contenedor
docker compose exec [service] sh
```

### **🛠️ Desarrollo**

```bash
# Modo desarrollo (hot reload)
./scripts/dev-setup.sh

# Ver logs de desarrollo
docker compose -f docker-compose.dev.yml logs -f

# Parar desarrollo
docker compose -f docker-compose.dev.yml down

# Rebuild sin cache
docker compose build --no-cache [service]
```

### **🗄️ Base de Datos**

```bash
# Conectar a PostgreSQL
docker compose exec postgres psql -U palindrome_user -d palindrome_db

# Ver productos
docker compose exec postgres psql -U palindrome_user -d palindrome_db -c "SELECT title, brand, price FROM products;"

# Resetear datos
docker compose exec postgres psql -U palindrome_user -d palindrome_db -c "DELETE FROM products;"

# Re-poblar datos
./scripts/setup-complete.sh  # (solo ejecutará el seed si es necesario)
```

---

## 🧪 **Ejemplos de Testing**

### **🔍 Test de Palíndromos**

```typescript
// Casos que DEBEN pasar
describe('isPalindrome', () => {
  it('✅ Debe detectar palíndromos complejos', () => {
    expect(isPalindrome('A man a plan a canal Panama')).toBe(true);
    expect(isPalindrome('Was it a car or a cat I saw?')).toBe(true);
  });

  it('❌ Debe rechazar no-palíndromos', () => {
    expect(isPalindrome('race a car')).toBe(false);
    expect(isPalindrome('hello world')).toBe(false);
  });
});
```

### **🔍 Test de API**

```typescript
// Tests E2E de la API
describe('Products Search API', () => {
  it('🎯 Debe aplicar 50% descuento para palíndromos', async () => {
    const response = await request(app)
      .get('/api/products/search?q=abba')
      .expect(200);
      
    expect(response.body.isPalindrome).toBe(true);
    expect(response.body.discountApplied).toBe(50);
  });
});
```

### **🔍 Test de UI**

```typescript
// Tests de componentes
describe('SearchBox Component', () => {
  it('⚡ Debe mostrar loading durante debounce', async () => {
    render(<SearchBox onSearch={mockSearch} />);
    
    fireEvent.change(screen.getByTestId('search-input'), { 
      target: { value: 'abba' } 
    });
    
    expect(screen.getByText('Escribiendo... (búsqueda en 1s)')).toBeInTheDocument();
  });
});
```

---

## 📊 **API Endpoints**

### **🛍️ Productos**

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| `GET` | `/api/products` | Obtener todos los productos | - |
| `GET` | `/api/products/search` | Buscar productos | `q`: término de búsqueda |
| `GET` | `/api/products/:id` | Obtener producto por ID | `id`: ID del producto |

### **🔍 Ejemplo de Respuesta de Búsqueda**

```json
{
  "products": [
    {
      "id": 1,
      "title": "Auriculares ABBA Pro",
      "brand": "ABBA", 
      "description": "Auriculares inalámbricos...",
      "originalPrice": 199.99,
      "finalPrice": 99.99,
      "discountPercentage": 50,
      "discountAmount": 100.00,
      "imageUrl": "https://images.unsplash.com/...",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "isPalindrome": true,
  "discountApplied": 50,
  "totalResults": 3,
  "searchTerm": "abba"
}
```

---

## 🎨 **Características de UI/UX**

### **✨ Efectos Visuales Modernos**

- **🌟 Glass Morphism**: Efectos de cristal con backdrop-blur
- **🎨 Gradientes Dinámicos**: Backgrounds animados y mesh patterns
- **⚡ Micro-animaciones**: 15+ animaciones CSS personalizadas
- **🎯 Hover Effects**: Elevación, scale, glow effects
- **📱 Mobile-First**: Responsive perfecto en todos los dispositivos

### **🔄 Estados UX Implementados**

| Estado | Descripción | Elementos Visuales |
|--------|-------------|-------------------|
| **Initial** | Bienvenida | Mensaje + sugerencias clickeables |
| **Typing** | Usuario escribiendo | Indicador con puntos animados |
| **Loading** | Cargando resultados | Skeletons con shimmer effect |
| **Results** | Productos encontrados | Grid con animaciones escalonadas |
| **Empty** | Sin resultados | Ilustración + sugerencias |
| **Error** | Error en API | Mensaje claro + botón reintentar |

### **🎯 Performance UX**

- **⚡ Debounce 1000ms**: Evita llamadas excesivas a API
- **🔄 Hot Reload**: Desarrollo sin rebuilds
- **📱 Touch Targets**: Botones mínimo 44px para móvil
- **🖼️ Lazy Loading**: Imágenes optimizadas con Next.js Image
- **💾 Memoización**: Componentes y cálculos costosos optimizados

---

## 🔧 **Configuración Avanzada**

### **🌍 Variables de Entorno**

```bash
# Backend (.env)
NODE_ENV=development
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=palindrome_user
DB_PASSWORD=palindrome_password
DB_DATABASE=palindrome_db
PORT=3001

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### **🐳 Docker Compose Profiles**

```bash
# Producción (optimizada)
docker compose up --build

# Desarrollo (hot reload)
docker compose -f docker-compose.dev.yml up --build

# Solo base de datos
docker compose up postgres

# Con debugging
docker compose -f docker-compose.dev.yml up backend-dev
# Debug disponible en puerto 9229
```

---

## 🚨 **Troubleshooting**

### **❓ Problemas Comunes**

| Problema | Solución |
|----------|----------|
| **Docker no inicia** | Verificar que Docker Desktop esté corriendo |
| **Puerto ocupado** | Cambiar puertos en docker-compose.yml |
| **BD sin datos** | Ejecutar `./scripts/setup-complete.sh` |
| **Tests fallan** | Verificar que servicios estén corriendo |
| **Hot reload no funciona** | Usar `docker-compose.dev.yml` |

### **🔍 Comandos de Diagnóstico**

```bash
# Verificar estado de servicios
docker compose ps

# Ver logs de errores
docker compose logs [service]

# Verificar conectividad BD
docker compose exec postgres pg_isready -U palindrome_user

# Verificar API backend
curl http://localhost:3001/api/products

# Verificar frontend
curl http://localhost:3000
```

---

## 🤝 **Contribución**

### **📋 Checklist para PRs**

- [ ] ✅ Tests pasan: `./scripts/test-all.sh`
- [ ] 🎨 Linting OK: `npm run lint`
- [ ] 📝 Documentación actualizada
- [ ] 🧪 Tests añadidos para nuevas funcionalidades
- [ ] 🐳 Docker builds correctamente
- [ ] 📱 UI responsive verificada

### **🏗️ Estructura de Commits**

```
feat: ✨ nueva funcionalidad
fix: 🐛 corrección de bug  
docs: 📝 actualización documentación
style: 🎨 cambios de estilo/formato
refactor: ♻️ refactoring de código
test: 🧪 añadir/actualizar tests
chore: 🔧 tareas de mantenimiento
```

---

## 📄 **Licencia**

MIT License - ver [LICENSE](LICENSE) para más detalles.

---

## 🎉 **¡Listo para Usar!**

```bash
# Un solo comando para tener todo funcionando
./scripts/setup-complete.sh

# Abrir en el navegador
open http://localhost:3000

# ¡Busca "abba" y disfruta el 50% OFF! 🎯
```

---

**Desarrollado con ❤️ usando Next.js, NestJS y mucho amor por los palíndromos.**

> 💡 **Tip**: Prueba buscar "A man a plan a canal Panama" para ver la magia de los palíndromos complejos.