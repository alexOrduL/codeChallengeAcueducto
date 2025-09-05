#!/bin/bash

# 🚀 Script de configuración completa para Palindrome Ecommerce
# Este script configura y ejecuta todo el proyecto desde cero

set -e  # Salir si algún comando falla

echo "🔄 Palindrome Ecommerce - Setup Completo"
echo "========================================"

# Función para mostrar mensajes con colores
print_step() {
    echo -e "\n\033[1;34m🔹 $1\033[0m"
}

print_success() {
    echo -e "\033[1;32m✅ $1\033[0m"
}

print_error() {
    echo -e "\033[1;31m❌ $1\033[0m"
}

# Verificar si Docker está corriendo
if ! docker info > /dev/null 2>&1; then
    print_error "Docker no está corriendo. Por favor inicia Docker Desktop."
    exit 1
fi

print_step "1. Limpiando contenedores anteriores..."
docker compose down --volumes --remove-orphans 2>/dev/null || true

print_step "2. Construyendo imágenes Docker..."
docker compose build --no-cache

print_step "3. Iniciando base de datos PostgreSQL..."
docker compose up -d postgres

print_step "4. Esperando que PostgreSQL esté listo..."
sleep 10

# Verificar que PostgreSQL está listo
until docker compose exec postgres pg_isready -U palindrome_user -d palindrome_db > /dev/null 2>&1; do
    echo "Esperando PostgreSQL..."
    sleep 2
done

print_success "PostgreSQL está listo!"

print_step "5. Iniciando backend (con migraciones automáticas)..."
docker compose up -d backend

print_step "6. Esperando que el backend esté listo..."
sleep 15

# Verificar que el backend está respondiendo
until curl -s http://localhost:3001/api/products > /dev/null 2>&1; do
    echo "Esperando backend..."
    sleep 2
done

print_success "Backend está listo!"

print_step "7. Poblando base de datos con datos de prueba..."
# Ejecutar seed directamente en el contenedor de PostgreSQL
docker compose exec -T postgres psql -U palindrome_user -d palindrome_db << 'EOF'
-- Script SQL para poblar la base de datos con datos de prueba
-- Incluye productos con "abba" y otros palíndromos para testing

INSERT INTO products (title, brand, description, price, image_url) VALUES
-- Productos con "abba" en brand o description para testing de palíndromos
('Auriculares ABBA Pro', 'ABBA', 'Auriculares inalámbricos de alta calidad con cancelación de ruido', 199.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'),
('Smartphone Premium', 'TechABBA', 'Teléfono inteligente con cámara profesional y batería de larga duración', 899.99, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'),
('Laptop Gaming', 'GamerPro', 'Laptop para gaming con procesador ABBA-X y tarjeta gráfica dedicada', 1299.99, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'),

-- Productos regulares para búsquedas normales
('Teclado Mecánico', 'KeyMaster', 'Teclado mecánico RGB para gaming y productividad', 149.99, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'),
('Monitor 4K', 'DisplayTech', 'Monitor 4K de 27 pulgadas con tecnología HDR', 399.99, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400'),
('Ratón Inalámbrico', 'ClickMaster', 'Ratón inalámbrico ergonómico con sensor de precisión', 79.99, 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400'),
('Webcam HD', 'StreamPro', 'Cámara web HD para videoconferencias y streaming', 129.99, 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400'),
('Altavoces Bluetooth', 'SoundWave', 'Altavoces Bluetooth portátiles con sonido estéreo', 89.99, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400'),

-- Productos adicionales para testing de palíndromos
('level', 'TestBrand', 'Producto para testing de palíndromos con título level', 49.99, 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'),
('Tablet Pro', 'TabletCorp', 'Tablet profesional con stylus incluido y pantalla racecar ultra sensible', 599.99, 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400'),
('Smartwatch', 'WatchTech', 'Reloj inteligente con monitor de salud y GPS integrado deed', 299.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'),
('Cargador Inalámbrico', 'ChargePlus', 'Base de carga inalámbrica rápida madam compatible con todos los dispositivos', 39.99, 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400')
ON CONFLICT DO NOTHING;
EOF

print_success "Base de datos poblada con 12 productos de prueba!"

print_step "8. Iniciando frontend..."
docker compose up -d frontend

print_step "9. Verificación final de servicios..."
sleep 10

# Verificar que todos los servicios están corriendo
if docker compose ps | grep -q "Up"; then
    print_success "¡Todos los servicios están corriendo!"
else
    print_error "Algunos servicios no se iniciaron correctamente"
    docker compose ps
    exit 1
fi

echo ""
echo "🎉 ¡SETUP COMPLETO! 🎉"
echo "===================="
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:3001"
echo "📊 Base de datos: PostgreSQL en puerto 5432"
echo ""
echo "🧪 Prueba estos palíndromos para obtener 50% OFF:"
echo "   • abba"
echo "   • level" 
echo "   • racecar"
echo "   • A man a plan a canal Panama"
echo ""
echo "📋 Comandos útiles:"
echo "   • Ver logs: docker compose logs -f"
echo "   • Parar todo: docker compose down"
echo "   • Reiniciar: docker compose restart"
echo "   • Tests backend: docker compose exec backend npm test"
echo "   • Tests frontend: docker compose exec frontend npm test"
echo ""
print_success "¡Listo para usar! 🚀"
