# 🔒 Actualización de Seguridad - API v1

## 📋 RESUMEN DE CAMBIOS

Esta actualización implementa mejoras críticas de seguridad y migra la API a la versión 1.

---

## 🔄 CAMBIOS EN URLS

### **Antes (v0)**
```
GET /api/products/search?q=abba
GET /api/products
GET /api/products/:id
```

### **Después (v1)**
```
GET /api/v1/products/search?q=abba
GET /api/v1/products  
GET /api/v1/products/:id
```

---

## 🔒 NUEVAS CARACTERÍSTICAS DE SEGURIDAD

### **1. Rate Limiting**
- ✅ **Global**: 100 requests por minuto
- ✅ **Búsquedas**: 30 requests por minuto (más estricto)
- ✅ **Headers informativos**: `X-RateLimit-*`

### **2. Security Headers (Helmet.js)**
- ✅ **Content Security Policy (CSP)**
- ✅ **HSTS (HTTP Strict Transport Security)**
- ✅ **X-Frame-Options: DENY**
- ✅ **X-Content-Type-Options: nosniff**
- ✅ **XSS Protection**

### **3. Input Sanitization**
- ✅ **Validación estricta** en DTOs
- ✅ **MaxLength**: 100 caracteres en búsquedas
- ✅ **Sanitización automática** con `class-sanitizer`
- ✅ **Transform decorators** para limpieza de datos

### **4. Secrets Management**
- ✅ **Validación de variables de entorno** al inicio
- ✅ **ConfigService** con validación estricta
- ✅ **Configuración por environments**

### **5. API Improvements**
- ✅ **Response format consistente** con metadatos
- ✅ **Logging estructurado** de todas las requests
- ✅ **Error handling mejorado** con códigos específicos
- ✅ **Request timeouts** (30 segundos)

---

## 📦 NUEVAS DEPENDENCIAS

```json
{
  "@nestjs/throttler": "5.0.1",
  "helmet": "7.1.0",
  "class-sanitizer": "1.0.1"
}
```

---

## 🔧 ARCHIVOS MODIFICADOS

### **Backend**
- ✅ `package.json` - Nuevas dependencias
- ✅ `src/config/configuration.ts` - **NUEVO** - Validación de configuración
- ✅ `src/main.ts` - Helmet y configuración de seguridad
- ✅ `src/app.module.ts` - Rate limiting y configuración
- ✅ `src/modules/products/products.controller.ts` - API v1 y logging
- ✅ `src/modules/products/dto/search-products.dto.ts` - Sanitización
- ✅ `src/modules/products/dto/search-response.dto.ts` - Metadatos
- ✅ `env.example` - Variables de entorno actualizadas
- ✅ `test/products.e2e-spec.ts` - URLs v1

### **Frontend**
- ✅ `src/lib/api.ts` - Cliente API v1 con manejo de rate limiting
- ✅ `src/app/page.tsx` - Manejo de errores mejorado

### **Documentación**
- ✅ `README.md` - URLs actualizadas
- ✅ `.cursorrules` - Reglas de seguridad añadidas

---

## 🚀 CÓMO MIGRAR

### **1. Instalar Dependencias**
```bash
cd backend
npm install
```

### **2. Actualizar Variables de Entorno**
```bash
# Copiar el nuevo .env.example
cp env.example .env

# Configurar variables específicas:
THROTTLE_TTL=60
THROTTLE_LIMIT=100
THROTTLE_SEARCH_LIMIT=30
API_VERSION=v1
```

### **3. Actualizar Clientes API**
Si tienes otros clientes consumiendo la API, actualiza las URLs:

```diff
- const response = await fetch('/api/products/search?q=abba');
+ const response = await fetch('/api/v1/products/search?q=abba');
```

### **4. Verificar Funcionamiento**
```bash
# Levantar el proyecto
npm run dev

# Verificar API v1
curl "http://localhost:3001/api/v1/products/search?q=abba"

# Verificar rate limiting (hacer 31 requests rápidas)
for i in {1..31}; do curl "http://localhost:3001/api/v1/products/search?q=test"; done
```

---

## 🔍 TESTING DE SEGURIDAD

### **Rate Limiting**
```bash
# Test básico de rate limiting
for i in {1..101}; do 
  curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3001/api/v1/products"
done | tail -1
# Debería retornar 429 (Too Many Requests)
```

### **Security Headers**
```bash
# Verificar headers de seguridad
curl -I "http://localhost:3001/api/v1/products" | grep -E "(X-Frame-Options|X-Content-Type-Options|Strict-Transport-Security)"
```

### **Input Validation**
```bash
# Test de validación de input (debería fallar)
curl "http://localhost:3001/api/v1/products/search?q=$(python3 -c 'print("a"*101)')"
```

---

## 📊 BENEFICIOS DE LA MIGRACIÓN

### **Seguridad**
- 🔒 **Rate limiting** previene ataques DDoS
- 🔒 **Security headers** protegen contra XSS, clickjacking
- 🔒 **Input sanitization** previene inyección de código
- 🔒 **Secrets management** evita exposición de credenciales

### **Observabilidad**
- 📊 **Logging estructurado** para debugging
- 📊 **Request tracking** con IDs únicos
- 📊 **Performance metrics** (tiempo de respuesta)
- 📊 **Error categorization** con códigos específicos

### **Mantenibilidad**
- 🔧 **API versioning** permite evolución sin breaking changes
- 🔧 **Response format consistente** facilita integración
- 🔧 **Configuration validation** previene errores de deploy
- 🔧 **Better error messages** mejoran developer experience

---

## ⚠️ BREAKING CHANGES

### **URLs de API**
- Todas las URLs cambian de `/api/*` a `/api/v1/*`
- Los clientes deben actualizarse

### **Response Format**
- Algunos endpoints ahora retornan `{ data: ..., meta: ... }`
- El cliente frontend ya está adaptado para compatibilidad

### **Error Responses**
- Formato de error más estructurado con códigos específicos
- Mejor información para debugging

---

## 🎯 PRÓXIMOS PASOS

### **Inmediato**
1. ✅ Instalar dependencias
2. ✅ Actualizar variables de entorno
3. ✅ Verificar funcionamiento

### **Futuro (Opcional)**
- 🔄 Implementar API v2 con autenticación JWT
- 🔄 Añadir OpenAPI/Swagger documentation
- 🔄 Implementar caching con Redis
- 🔄 Añadir monitoring con Prometheus

---

**✅ La migración está completa y el sistema es significativamente más seguro.**
