 # 🤖 Prompts Específicos Utilizados - Challenge Acueducto

## 📋 CONTEXTO INICIAL

### Prompt de Configuración del Proyecto
```
Necesito crear un challenge técnico completo para una posición de Fullstack Developer Senior. 

REQUERIMIENTOS EXACTOS:
- Ecommerce de tenis con descuento automático del 50% para búsquedas con palíndromos
- Backend: NestJS + TypeORM + PostgreSQL  
- Frontend: Next.js 14 + TypeScript + Tailwind + Shadcn/ui
- Docker completo con hot reload
- Tests comprehensivos (unitarios, integración, E2E)
- Documentación detallada

LÓGICA ESPECÍFICA DE BÚSQUEDA:
1. Título: búsqueda EXACTA (case-insensitive)
2. Marca/Descripción: LIKE parcial solo si > 3 caracteres
3. Palíndromos: ignorar espacios, puntuación, aplicar 50% descuento automático

Crear estructura completa de proyecto con calidad enterprise.
```

---

## 🏗️ PROMPTS DE ARQUITECTURA

### Backend Structure
```
Crear backend NestJS con:
- Módulo Products con Controller, Service, Entity
- DTOs con validación (class-validator)
- Utilidad de palíndromos con tests exhaustivos
- Configuración TypeORM + PostgreSQL
- Seed service con datos de tenis (42+ productos)
- Tests unitarios y de integración
- Dockerfile optimizado

Implementar lógica exacta:
- isPalindrome(): ignorar espacios/puntuación, soportar Unicode
- searchProducts(): título exacto, marca/desc LIKE si >3 chars
- calculateDiscountedPrice(): 50% automático para palíndromos
```

### Frontend Structure  
```
Crear frontend Next.js 14 con:
- App Router y TypeScript estricto
- Componentes Shadcn/ui personalizados
- Hook useSearchDebounce con estados UX
- ProductGrid con paginación y animaciones
- SearchBox con feedback visual
- Estados de carga con skeletons
- Diseño moderno con glassmorphism
- Responsive mobile-first

UX Requirements:
- Búsqueda en tiempo real (debounce 1s)
- Indicadores visuales de descuento
- Animaciones fluidas CSS
- Error handling completo
```

---

## 🧪 PROMPTS DE TESTING

### Test Strategy
```
Implementar testing comprehensivo:

BACKEND:
- palindrome.util.spec.ts: 20+ casos edge, Unicode, espacios
- products.service.spec.ts: lógica de búsqueda, mocks TypeORM
- products.controller.spec.ts: endpoints, validación, errores

FRONTEND:  
- useSearchDebounce.test.ts: debounce, states, cleanup
- ProductCard.test.tsx: props, descuentos, formatting
- ProductGrid.test.tsx: loading, empty states, paginación

E2E:
- Playwright: flujo completo búsqueda + descuento
- API integration: endpoints funcionando

Usar Jest, Testing Library, mocks apropiados.
```

---

## 🐳 PROMPTS DE DEVOPS

### Docker Configuration
```
Configurar Docker profesional:

DESARROLLO:
- docker-compose.dev.yml con hot reload
- Volúmenes para src/ y node_modules separados
- PostgreSQL con healthcheck
- Puertos debug (9229 backend)
- Variables entorno desarrollo

PRODUCCIÓN:
- Multi-stage builds optimizados
- Imágenes Alpine ligeras  
- docker-compose.yml para deploy
- Secrets y configuración segura

SCRIPTS:
- npm run dev: un comando para todo
- npm run test:all: todos los tests
- npm run clean: limpieza completa
```

---

## 🎨 PROMPTS DE UI/UX

### Modern Design System
```
Crear diseño moderno profesional:

THEME:
- Glassmorphism con backdrop-blur
- Paleta brand: indigo/blue moderna
- Animaciones fluidas (scale-in, slide-up)
- Shadows y glows sutiles

COMPONENTS:
- ProductCard: hover effects, discount badges
- SearchBox: typing indicators, clear button  
- LoadingSkeleton: shimmer animation
- EmptyState: friendly messaging

INTERACTIONS:
- Micro-animations en hover/focus
- Loading states profesionales
- Success/error feedback visual
- Responsive breakpoints mobile-first
```

---

## 📚 PROMPTS DE DOCUMENTACIÓN

### Comprehensive Documentation
```
Crear documentación enterprise-level:

README.md:
- Instrucciones paso a paso para evaluadores
- Comandos exactos docker-compose
- Ejemplos API con curl
- Troubleshooting común
- URLs de acceso inmediato

ARCHITECTURE.md:
- Diagramas de estructura
- Patrones implementados
- Decisiones técnicas justificadas
- Roadmap futuro

Estilo:
- Emojis para navegación visual
- Código formateado con syntax highlighting
- Tablas para información estructurada
- Secciones colapsables
```

---

## 🔧 PROMPTS DE OPTIMIZACIÓN

### Performance & Quality
```
Optimizar para producción:

PERFORMANCE:
- Debounce en búsqueda (evitar spam API)
- Image optimization Next.js
- Bundle splitting automático
- Database indexing en campos búsqueda

QUALITY:
- TypeScript strict en todo
- ESLint + Prettier configurado
- Error boundaries React
- Input validation completa
- CORS configurado apropiadamente

MONITORING:
- Health checks Docker
- Logging estructurado
- Error handling consistente
```

---

## 🎯 PROMPTS DE REFINAMIENTO

### Final Polish
```
Revisar y pulir detalles:

CONSISTENCY:
- Naming conventions uniformes
- Comentarios en español para lógica negocio
- Error messages user-friendly
- Loading states coherentes

EDGE CASES:
- Búsquedas vacías
- Caracteres especiales
- Conexión API fallida
- Productos sin imagen

PROFESSIONAL TOUCHES:
- Favicon personalizado
- Meta tags apropiados
- Console logs limpios
- Scripts npm organizados
```

---

## 📊 RESULTADO DE LOS PROMPTS

### Métricas de Efectividad
- **Código Generado:** ~85% por IA
- **Intervención Humana:** ~15% (lógica negocio específica)
- **Tiempo de Desarrollo:** <8 horas vs 40+ horas manual
- **Calidad de Código:** Enterprise-level desde primera iteración
- **Test Coverage:** 85%+ desde el inicio
- **Documentación:** Completa y profesional

### Técnicas de Prompt Engineering Aplicadas
1. **Context Setting:** Establecer requerimientos exactos upfront
2. **Iterative Refinement:** Mejoras incrementales específicas
3. **Domain Expertise:** Incluir conocimiento técnico en prompts
4. **Quality Gates:** Especificar estándares de calidad esperados
5. **Edge Case Thinking:** Solicitar manejo de casos límite

---

**Conclusión:** Los prompts estructurados y específicos permitieron generar un proyecto completo de calidad enterprise en una fracción del tiempo tradicional, manteniendo control sobre decisiones arquitectónicas críticas.
