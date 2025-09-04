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
('Cargador Inalámbrico', 'ChargePlus', 'Base de carga inalámbrica rápida madam compatible con todos los dispositivos', 39.99, 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400');

-- Verificar que los datos se insertaron correctamente
SELECT COUNT(*) as total_products FROM products;
SELECT title, brand FROM products WHERE LOWER(brand) LIKE '%abba%' OR LOWER(description) LIKE '%abba%';
