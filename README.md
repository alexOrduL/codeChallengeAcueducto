# 🎾 Za-🦆🦆🦆 Tennis

> **Ecommerce de tenis con descuentos automáticos del 50% al buscar palíndromos**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)](https://postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://docker.com/)

---

## 🚀 **Inicio Rápido**

### **1. Clonar y Ejecutar (Todo en uno)**

```bash
# Clonar repositorio
git clone <repository-url>
cd codeChallengeAcueducto

# Levantar todo el proyecto (incluye BD, migraciones y datos)
docker compose down --volumes --remove-orphans && \
docker compose build --no-cache && \
docker compose up -d postgres && \
sleep 15 && \
docker compose up -d backend && \
sleep 20 && \
docker compose up -d frontend

# Verificar que todo funciona
curl http://localhost:3001/api/products | head -1
echo "✅ Proyecto listo! Frontend: http://localhost:3000"
```

### **2. Comandos NPM (Alternativa)**

```bash
# Setup completo
npm run setup

# Desarrollo con hot reload
npm run dev

# Parar servicios
npm run stop

# Limpiar todo
npm run clean
```

---

## 🎯 **Comandos Específicos por Tarea**

### **🐳 Docker - Comandos Exactos**

```bash
# Ver estado de servicios
docker compose ps

# Ver logs de un servicio específico
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f postgres

# Reiniciar un servicio
docker compose restart backend
docker compose restart frontend

# Parar todo
docker compose down

# Limpiar todo (incluye volúmenes y datos)
docker compose down --volumes --remove-orphans
```

### **🗄️ Base de Datos - Comandos Exactos**

```bash
# Conectar a PostgreSQL
docker compose exec postgres psql -U palindrome_user -d palindrome_db

# Ver todos los productos
docker compose exec postgres psql -U palindrome_user -d palindrome_db -c "SELECT id, title, brand, price FROM products;"

# Contar productos
docker compose exec postgres psql -U palindrome_user -d palindrome_db -c "SELECT COUNT(*) as total_products FROM products;"

# Ver estructura de tabla
docker compose exec postgres psql -U palindrome_user -d palindrome_db -c "\d products"

# Resetear datos (eliminar todos los productos)
docker compose exec postgres psql -U palindrome_user -d palindrome_db -c "DELETE FROM products;"

# Verificar conexión
docker compose exec postgres pg_isready -U palindrome_user -d palindrome_db
```

### **🔧 Backend - Comandos Exactos**

```bash
# Ver logs del backend
docker compose logs -f backend

# Entrar al contenedor del backend
docker compose exec backend sh

# Ejecutar tests del backend
docker compose exec backend npm test

# Ejecutar tests E2E del backend
docker compose exec backend npm run test:e2e

# Verificar API
curl http://localhost:3001/api/products
curl "http://localhost:3001/api/products/search?q=abba"
```

### **🎨 Frontend - Comandos Exactos**

```bash
# Ver logs del frontend
docker compose logs -f frontend

# Entrar al contenedor del frontend
docker compose exec frontend sh

# Ejecutar tests del frontend
docker compose exec frontend npm test

# Ejecutar tests E2E del frontend
docker compose exec frontend npm run test:e2e

# Verificar frontend
curl http://localhost:3000
```

---

## 🧪 **Testing - Comandos Exactos**

### **Ejecutar Todos los Tests**

```bash
# Levantar servicios de desarrollo
docker compose -f docker-compose.dev.yml up -d

# Esperar que estén listos
sleep 20

# Tests del backend
docker compose -f docker-compose.dev.yml exec backend-dev npm test
docker compose -f docker-compose.dev.yml exec backend-dev npm run test:e2e

# Tests del frontend
docker compose -f docker-compose.dev.yml exec frontend-dev npm test -- --watchAll=false
docker compose -f docker-compose.dev.yml exec frontend-dev npm run test:e2e

# Test funcional de API
curl -s "http://localhost:3001/api/products/search?q=abba" | grep -q "isPalindrome.*true" && echo "✅ Palíndromo test: PASSED" || echo "❌ Palíndromo test: FAILED"
```

---

## 🎮 **Cómo Usar la Aplicación**

### **URLs de Acceso**

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Base de Datos**: localhost:5432

### **Búsquedas con Descuento (50% OFF)**

Prueba estos palíndromos:
- `abba` - Encuentra productos con "abba" en marca/descripción (>3 chars)
- `level` - Busca productos con título exacto "level"
- `racecar` - Busca productos con "racecar" en marca/descripción (>3 chars)
- `A man a plan a canal Panama` - Palíndromo complejo

### **Búsquedas Regulares**

- `raqueta` - Búsqueda exacta en título: "Raqueta ABBA Pro"
- `wilson` - Búsqueda LIKE en marca/desc (>3 chars): "Raqueta Wilson Pro Staff", "Pelotas Wilson US Open", "Cinta de Grip Wilson Pro"
- `nike` - Búsqueda LIKE en marca/desc (>3 chars): "Zapatillas Nike Air Zoom", "Muñequera Nike Dri-FIT"
- `tennis` - Búsqueda LIKE en marca/desc (>3 chars): "Zapatillas Tennis Premium"
- `abba` - Búsqueda LIKE en marca/desc (>3 chars): "Raqueta ABBA Pro", "Zapatillas TechABBA"
- *(vacío)* - Muestra todos los productos (42 productos)

---

## 📊 **API Endpoints**

### **Productos**

```bash
# Obtener todos los productos
curl http://localhost:3001/api/products

# Buscar productos
curl "http://localhost:3001/api/products/search?q=abba"

# Obtener producto por ID
curl http://localhost:3001/api/products/1
```

### **Ejemplo de Respuesta**

```json
{
  "products": [
    {
      "id": 1,
      "title": "Raqueta ABBA Pro",
      "brand": "ABBA",
      "description": "Raqueta de tenis profesional con tecnología ABBA avanzada...",
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

## 🚨 **Troubleshooting**

### **Problemas Comunes**

| Problema | Solución |
|----------|----------|
| **Docker no inicia** | `docker --version` y verificar Docker Desktop |
| **Puerto ocupado** | `lsof -i :3000` o `lsof -i :3001` |
| **BD sin datos** | `docker compose exec postgres psql -U palindrome_user -d palindrome_db -c "SELECT COUNT(*) FROM products;"` |
| **API no responde** | `curl http://localhost:3001/api/products` |
| **Frontend no carga** | `curl http://localhost:3000` |

### **Comandos de Diagnóstico**

```bash
# Verificar estado de servicios
docker compose ps

# Ver logs de errores
docker compose logs backend | tail -20
docker compose logs frontend | tail -20
docker compose logs postgres | tail -20

# Verificar conectividad
docker compose exec postgres pg_isready -U palindrome_user
curl -I http://localhost:3001/api/products
curl -I http://localhost:3000

# Verificar recursos del sistema
docker stats
```

---

## 🔧 **Configuración**

### **Variables de Entorno**

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

### **Desarrollo con Hot Reload**

```bash
# Usar docker-compose.dev.yml para desarrollo
docker compose -f docker-compose.dev.yml up -d

# Ver logs de desarrollo
docker compose -f docker-compose.dev.yml logs -f

# Parar desarrollo
docker compose -f docker-compose.dev.yml down
```

---

## 📋 **Stack Tecnológico**

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 14.0.4 | Frontend con App Router |
| **NestJS** | 10.2.10 | Backend API REST |
| **PostgreSQL** | 15 | Base de datos |
| **TypeORM** | 0.3.17 | ORM y migraciones |
| **TypeScript** | 5.3+ | Lenguaje principal |
| **Docker** | Latest | Containerización |

---

## 🎉 **¡Listo para Usar!**

```bash
# Un solo comando para tener todo funcionando
docker compose down --volumes --remove-orphans && \
docker compose build --no-cache && \
docker compose up -d postgres && \
sleep 15 && \
docker compose up -d backend && \
sleep 20 && \
docker compose up -d frontend

# Abrir en el navegador
open http://localhost:3000

# ¡Busca "abba" y disfruta el 50% OFF! 🎯
```

---

**Desarrollado con ❤️ usando Next.js, NestJS y mucho amor por el tenis y los palíndromos.**