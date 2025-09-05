/**
 * Verifica si un texto es un palíndromo
 * Ignora espacios, puntuación y es case-insensitive
 * @param text - El texto a verificar
 * @returns true si es palíndromo, false en caso contrario
 */
export function isPalindrome(text: string): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }

  // Limpiar el texto: remover espacios, puntuación pero mantener letras Unicode y números
  // Usar \p{L} para letras Unicode (incluye ñ, acentos, etc.) y \p{N} para números
  const cleanText = text.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();
  
  // Un palíndromo debe tener al menos 2 caracteres
  if (cleanText.length < 2) {
    return false;
  }

  // Verificar si es igual al reverso
  const reversedText = cleanText.split('').reverse().join('');
  return cleanText === reversedText;
}

/**
 * Calcula el precio con descuento si aplica
 * @param originalPrice - Precio original
 * @param searchTerm - Término de búsqueda
 * @returns Objeto con precio final y información del descuento
 */
export function calculateDiscountedPrice(originalPrice: number, searchTerm: string) {
  const isSearchPalindrome = isPalindrome(searchTerm);
  const discountPercentage = isSearchPalindrome ? 50 : 0;
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discountAmount;

  return {
    originalPrice,
    finalPrice,
    discountPercentage,
    discountAmount,
    isPalindrome: isSearchPalindrome,
  };
}
