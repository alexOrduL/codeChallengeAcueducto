import { DataSource } from 'typeorm';
import { Product } from '../../modules/products/entities/product.entity';

export const seedProducts = async (dataSource: DataSource) => {
  const productRepository = dataSource.getRepository(Product);

  // Verificar si ya existen productos
  const existingProducts = await productRepository.count();
  if (existingProducts > 0) {
    console.log('Los productos ya existen, saltando seed...');
    return;
  }

  const products = [
    // Productos con "abba" en brand o description para testing de palíndromos
    {
      title: 'Auriculares ABBA Pro',
      brand: 'ABBA',
      description: 'Auriculares inalámbricos de alta calidad con cancelación de ruido',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    },
    {
      title: 'Smartphone Premium',
      brand: 'TechABBA',
      description: 'Teléfono inteligente con cámara profesional y batería de larga duración',
      price: 899.99,
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    },
    {
      title: 'Laptop Gaming',
      brand: 'GamerPro',
      description: 'Laptop para gaming con procesador ABBA-X y tarjeta gráfica dedicada',
      price: 1299.99,
      imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    },
    
    // Productos regulares para búsquedas normales
    {
      title: 'Teclado Mecánico',
      brand: 'KeyMaster',
      description: 'Teclado mecánico RGB para gaming y productividad',
      price: 149.99,
      imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
    },
    {
      title: 'Monitor 4K',
      brand: 'DisplayTech',
      description: 'Monitor 4K de 27 pulgadas con tecnología HDR',
      price: 399.99,
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
    },
    {
      title: 'Ratón Inalámbrico',
      brand: 'ClickMaster',
      description: 'Ratón inalámbrico ergonómico con sensor de precisión',
      price: 79.99,
      imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
    },
    {
      title: 'Webcam HD',
      brand: 'StreamPro',
      description: 'Cámara web HD para videoconferencias y streaming',
      price: 129.99,
      imageUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400',
    },
    {
      title: 'Altavoces Bluetooth',
      brand: 'SoundWave',
      description: 'Altavoces Bluetooth portátiles con sonido estéreo',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    },
    
    // Productos adicionales para testing
    {
      title: 'level',
      brand: 'TestBrand',
      description: 'Producto para testing de palíndromos con título level',
      price: 49.99,
      imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
    },
    {
      title: 'Tablet Pro',
      brand: 'TabletCorp',
      description: 'Tablet profesional con stylus incluido y pantalla racecar ultra sensible',
      price: 599.99,
      imageUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400',
    },
    {
      title: 'Smartwatch',
      brand: 'WatchTech',
      description: 'Reloj inteligente con monitor de salud y GPS integrado deed',
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    },
    {
      title: 'Cargador Inalámbrico',
      brand: 'ChargePlus',
      description: 'Base de carga inalámbrica rápida madam compatible con todos los dispositivos',
      price: 39.99,
      imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400',
    },
  ];

  await productRepository.save(products);
  console.log(`✅ Se han creado ${products.length} productos de prueba`);
};
