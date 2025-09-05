import { isPalindrome, calculateDiscountedPrice } from './palindrome.util';

describe('🔄 Palindrome Utility Tests', () => {
  describe('✅ isPalindrome - Casos Positivos', () => {
    it('✅ Debe detectar palíndromos simples correctamente', () => {
      const testCases = [
        { input: 'abba', expected: true, description: 'palabra simple' },
        { input: 'racecar', expected: true, description: 'palabra larga' },
        { input: 'level', expected: true, description: 'palabra común' },
        { input: 'deed', expected: true, description: 'palabra corta' },
        { input: 'noon', expected: true, description: 'palabra con doble letra' }
      ];

      testCases.forEach(({ input, expected, description }) => {
        expect(isPalindrome(input)).toBe(expected);
        console.log(`    ✓ "${input}" (${description}): ${expected ? 'ES' : 'NO ES'} palíndromo`);
      });
    });

    it('✅ Debe ignorar mayúsculas y minúsculas', () => {
      const testCases = [
        { input: 'Abba', expected: true },
        { input: 'RaceCar', expected: true },
        { input: 'LEVEL', expected: true },
        { input: 'DeEd', expected: true },
        { input: 'MaDAm', expected: true }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(isPalindrome(input)).toBe(expected);
        console.log(`    ✓ "${input}": Case-insensitive OK`);
      });
    });

    it('✅ Debe manejar palíndromos con espacios y puntuación', () => {
      const complexPalindromes = [
        { 
          input: 'A man a plan a canal Panama', 
          expected: true,
          description: 'Frase famosa con espacios'
        },
        { 
          input: 'Was it a car or a cat I saw?', 
          expected: true,
          description: 'Pregunta con puntuación'
        },
        { 
          input: 'Madam, I\'m Adam', 
          expected: true,
          description: 'Diálogo con coma y apóstrofe'
        },
        { 
          input: 'Never odd or even', 
          expected: true,
          description: 'Frase con espacios múltiples'
        }
      ];

      complexPalindromes.forEach(({ input, expected, description }) => {
        expect(isPalindrome(input)).toBe(expected);
        console.log(`    ✓ "${input}" (${description}): VÁLIDO`);
      });
    });

    it('✅ Debe manejar palíndromos alfanuméricos', () => {
      const alphanumericCases = [
        { input: '12321', expected: true, description: 'números simples' },
        { input: '1001', expected: true, description: 'números con ceros' },
        { input: 'A1B2b1a', expected: true, description: 'mezcla letras-números' },
        { input: '2002', expected: true, description: 'año palíndromo' }
      ];

      alphanumericCases.forEach(({ input, expected, description }) => {
        expect(isPalindrome(input)).toBe(expected);
        console.log(`    ✓ "${input}" (${description}): VÁLIDO`);
      });
    });
  });

  describe('❌ isPalindrome - Casos Negativos', () => {
    it('❌ Debe rechazar strings que NO son palíndromos', () => {
      const negativeCases = [
        { input: 'hello', expected: false, reason: 'palabra común' },
        { input: 'world', expected: false, reason: 'palabra común' },
        { input: 'javascript', expected: false, reason: 'palabra larga' },
        { input: 'race a car', expected: false, reason: 'frase que NO es palíndromo' },
        { input: 'palindrome', expected: false, reason: 'ironía - la palabra no es palíndromo' }
      ];

      negativeCases.forEach(({ input, expected, reason }) => {
        expect(isPalindrome(input)).toBe(expected);
        console.log(`    ✗ "${input}" (${reason}): Correctamente rechazado`);
      });
    });

    it('❌ Debe manejar casos edge con strings vacíos o inválidos', () => {
      const edgeCases = [
        { input: '', expected: false, reason: 'string vacío' },
        { input: '   ', expected: false, reason: 'solo espacios' },
        { input: '!!!', expected: false, reason: 'solo puntuación' },
        { input: '123', expected: false, reason: 'números no palíndromos' }
      ];

      edgeCases.forEach(({ input, expected, reason }) => {
        expect(isPalindrome(input)).toBe(expected);
        console.log(`    ✗ "${input}" (${reason}): Correctamente manejado`);
      });
    });

    it('❌ Debe manejar valores null, undefined y tipos incorrectos', () => {
      const invalidInputs = [
        { input: null as any, expected: false, reason: 'valor null' },
        { input: undefined as any, expected: false, reason: 'valor undefined' },
        { input: 12321 as any, expected: false, reason: 'número en lugar de string' },
        { input: [] as any, expected: false, reason: 'array vacío' },
        { input: {} as any, expected: false, reason: 'objeto vacío' }
      ];

      invalidInputs.forEach(({ input, expected, reason }) => {
        expect(isPalindrome(input)).toBe(expected);
        console.log(`    ✗ ${typeof input === 'object' ? JSON.stringify(input) : input} (${reason}): Correctamente manejado`);
      });
    });
  });

  describe('💰 calculateDiscountedPrice - Lógica de Descuentos', () => {
    const basePrice = 100;

    it('💰 Debe aplicar 50% de descuento para palíndromos', () => {
      const palindromes = ['abba', 'level', 'racecar', 'A man a plan a canal Panama'];
      
      palindromes.forEach(palindrome => {
        const result = calculateDiscountedPrice(basePrice, palindrome);
        
        expect(result.isPalindrome).toBe(true);
        expect(result.discountPercentage).toBe(50);
        expect(result.finalPrice).toBe(50);
        expect(result.discountAmount).toBe(50);
        expect(result.originalPrice).toBe(basePrice);
        
        console.log(`    💰 "${palindrome}": $${basePrice} → $${result.finalPrice} (Ahorro: $${result.discountAmount})`);
      });
    });

    it('💰 NO debe aplicar descuento para términos normales', () => {
      const normalTerms = ['hello', 'world', 'product', 'search'];
      
      normalTerms.forEach(term => {
        const result = calculateDiscountedPrice(basePrice, term);
        
        expect(result.isPalindrome).toBe(false);
        expect(result.discountPercentage).toBe(0);
        expect(result.finalPrice).toBe(basePrice);
        expect(result.discountAmount).toBe(0);
        expect(result.originalPrice).toBe(basePrice);
        
        console.log(`    💰 "${term}": $${basePrice} → $${result.finalPrice} (Sin descuento)`);
      });
    });

    it('💰 Debe calcular descuentos correctamente con precios decimales', () => {
      const testPrices = [199.99, 299.50, 1299.95];
      
      testPrices.forEach(price => {
        const result = calculateDiscountedPrice(price, 'abba');
        const expectedFinalPrice = price * 0.5;
        const expectedDiscount = price * 0.5;
        
        expect(result.finalPrice).toBeCloseTo(expectedFinalPrice, 2);
        expect(result.discountAmount).toBeCloseTo(expectedDiscount, 2);
        
        console.log(`    💰 Precio $${price}: Descuento $${result.discountAmount.toFixed(2)} → Final $${result.finalPrice.toFixed(2)}`);
      });
    });

    it('💰 Debe manejar precios extremos correctamente', () => {
      const extremeCases = [
        { price: 0.01, description: 'precio mínimo' },
        { price: 9999.99, description: 'precio alto' },
        { price: 1, description: 'precio unitario' }
      ];

      extremeCases.forEach(({ price, description }) => {
        const result = calculateDiscountedPrice(price, 'level');
        
        expect(result.originalPrice).toBe(price);
        expect(result.finalPrice).toBe(price * 0.5);
        expect(result.discountAmount).toBe(price * 0.5);
        
        console.log(`    💰 ${description} ($${price}): Descuento aplicado correctamente`);
      });
    });
  });

  describe('🧪 Edge Cases y Casos Especiales', () => {
    it('🧪 Debe manejar palíndromos de un solo carácter', () => {
      const singleChars = ['a', 'A', '1']; // Removemos '!' porque se limpia a string vacío
      
      singleChars.forEach(char => {
        expect(isPalindrome(char)).toBe(true);
        console.log(`    ✓ Carácter único "${char}": ES palíndromo`);
      });

      // Casos especiales que NO son palíndromos válidos
      const invalidChars = ['!', ' ', ''];
      invalidChars.forEach(char => {
        expect(isPalindrome(char)).toBe(false);
        console.log(`    ✗ Carácter inválido "${char}": Correctamente rechazado`);
      });
    });

    it('🧪 Debe manejar strings muy largos', () => {
      const longPalindrome = 'a'.repeat(1000) + 'b' + 'a'.repeat(1000);
      const longNonPalindrome = 'a'.repeat(1000) + 'bc';
      
      expect(isPalindrome(longPalindrome)).toBe(true);
      expect(isPalindrome(longNonPalindrome)).toBe(false);
      
      console.log(`    ✓ String largo (${longPalindrome.length} chars): Manejado correctamente`);
      console.log(`    ✗ String largo no-palíndromo (${longNonPalindrome.length} chars): Correctamente rechazado`);
    });

    it('🧪 Debe manejar caracteres especiales y unicode', () => {
      const unicodeCases = [
        { input: 'aña', expected: true, description: 'con ñ' },
        { input: 'été', expected: true, description: 'con acentos' },
        // Palíndromo real con acentos
        { input: 'áéééá', expected: true, description: 'acentos complejos' },
        { input: 'café', expected: false, description: 'no es palíndromo con acentos' }
      ];

      unicodeCases.forEach(({ input, expected, description }) => {
        expect(isPalindrome(input)).toBe(expected);
        console.log(`    ${expected ? '✓' : '✗'} "${input}" (${description}): ${expected ? 'ES' : 'NO ES'} palíndromo`);
      });
    });
  });
});