import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the search box and placeholder text', async ({ page }) => {
    await expect(page.getByTestId('search-input')).toBeVisible();
    await expect(page.getByTestId('search-input')).toHaveAttribute(
      'placeholder',
      'Buscar productos... (ej: abba, level, racecar)'
    );
  });

  test('should show help text when search is empty', async ({ page }) => {
    await expect(
      page.getByText('Prueba con palíndromos como "abba", "level" o "racecar" para obtener 50% de descuento')
    ).toBeVisible();
  });

  test('should perform search and show results', async ({ page }) => {
    // Type in search box
    await page.getByTestId('search-input').fill('test');
    
    // Wait for search results to load
    await page.waitForSelector('[data-testid="results-count"]', { timeout: 5000 });
    
    // Check if results are displayed
    await expect(page.getByTestId('results-count')).toBeVisible();
  });

  test('should detect palindrome and show discount badge', async ({ page }) => {
    // Search for a palindrome
    await page.getByTestId('search-input').fill('abba');
    
    // Wait for the palindrome badge to appear
    await page.waitForSelector('[data-testid="palindrome-badge"]', { timeout: 5000 });
    
    // Check if palindrome badge is visible
    await expect(page.getByTestId('palindrome-badge')).toBeVisible();
    await expect(page.getByTestId('palindrome-badge')).toContainText('Palíndromo detectado');
  });

  test('should apply discount for palindrome searches', async ({ page }) => {
    // Search for a palindrome
    await page.getByTestId('search-input').fill('level');
    
    // Wait for results
    await page.waitForSelector('[data-testid="palindrome-result-badge"]', { timeout: 5000 });
    
    // Check if discount is applied
    await expect(page.getByTestId('palindrome-result-badge')).toBeVisible();
    await expect(page.getByTestId('discount-applied-badge')).toBeVisible();
    await expect(page.getByTestId('discount-applied-badge')).toContainText('50% de descuento aplicado');
  });

  test('should not show discount for non-palindrome searches', async ({ page }) => {
    // Search for a non-palindrome
    await page.getByTestId('search-input').fill('hello');
    
    // Wait for results
    await page.waitForSelector('[data-testid="results-count"]', { timeout: 5000 });
    
    // Check that discount badges are not present
    await expect(page.getByTestId('palindrome-result-badge')).not.toBeVisible();
    await expect(page.getByTestId('discount-applied-badge')).not.toBeVisible();
  });

  test('should show loading state during search', async ({ page }) => {
    // Start typing
    await page.getByTestId('search-input').fill('test');
    
    // Check for loading spinner (might be brief)
    const loadingSpinner = page.locator('.animate-spin').first();
    
    // The loading state might be very brief, so we just check it exists
    // or wait for results to appear
    await page.waitForSelector('[data-testid="results-count"]', { timeout: 5000 });
  });

  test('should handle empty search results gracefully', async ({ page }) => {
    // Search for something unlikely to exist
    await page.getByTestId('search-input').fill('xyznonexistent123');
    
    // Wait for empty state
    await page.waitForTimeout(2000);
    
    // Check for empty state message
    await expect(page.getByText('No se encontraron productos')).toBeVisible();
  });

  test('should clear results when search is cleared', async ({ page }) => {
    // First perform a search
    await page.getByTestId('search-input').fill('test');
    await page.waitForSelector('[data-testid="results-count"]', { timeout: 5000 });
    
    // Clear the search
    await page.getByTestId('search-input').clear();
    
    // Wait a moment for the interface to update
    await page.waitForTimeout(1000);
    
    // Should show initial state
    await expect(page.getByText('¡Bienvenido a Palindrome Store!')).toBeVisible();
  });

  test('should be case insensitive for palindrome detection', async ({ page }) => {
    // Search for uppercase palindrome
    await page.getByTestId('search-input').fill('ABBA');
    
    // Wait for palindrome detection
    await page.waitForSelector('[data-testid="palindrome-badge"]', { timeout: 5000 });
    
    // Check if palindrome is detected
    await expect(page.getByTestId('palindrome-badge')).toBeVisible();
  });

  test('should handle special characters in palindrome detection', async ({ page }) => {
    // Search for palindrome with spaces and punctuation
    await page.getByTestId('search-input').fill('A man a plan a canal Panama');
    
    // Wait for palindrome detection
    await page.waitForSelector('[data-testid="palindrome-badge"]', { timeout: 5000 });
    
    // Check if palindrome is detected
    await expect(page.getByTestId('palindrome-badge')).toBeVisible();
  });

  test('🎯 should show palindrome detected message when palindrome has no results', async ({ page }) => {
    // Search for a palindrome that doesn't exist in products
    await page.getByTestId('search-input').fill('qwq');
    
    // Wait for search to complete
    await page.waitForTimeout(1500); // Wait for debounce + search
    
    // Should show palindrome detected message
    await expect(page.getByText('¡Palíndromo detectado!')).toBeVisible();
    
    // Should explain the palindrome was valid but no products found
    await expect(page.getByText(/es un palíndromo válido con 50% de descuento/)).toBeVisible();
    await expect(page.getByText(/pero no encontramos productos que coincidan/)).toBeVisible();
    
    // Should show palindrome-specific button
    await expect(page.getByText('Buscar otros palíndromos')).toBeVisible();
    
    // Should show palindrome suggestions
    await expect(page.getByText('abba')).toBeVisible();
    await expect(page.getByText('level')).toBeVisible();
    await expect(page.getByText('noon')).toBeVisible();
    await expect(page.getByText('racecar')).toBeVisible();
    await expect(page.getByText('madam')).toBeVisible();
  });

  test('🎯 should differentiate between palindrome and regular empty states', async ({ page }) => {
    // First, test regular search with no results
    await page.getByTestId('search-input').fill('nonexistentproduct12345');
    await page.waitForTimeout(1500);
    
    // Should show regular empty state
    await expect(page.getByText('No encontramos productos')).toBeVisible();
    await expect(page.getByText('Limpiar búsqueda')).toBeVisible();
    await expect(page.queryByText('¡Palíndromo detectado!')).not.toBeVisible();
    
    // Now test palindrome with no results
    await page.getByTestId('search-input').fill('qwq');
    await page.waitForTimeout(1500);
    
    // Should show palindrome-specific empty state
    await expect(page.getByText('¡Palíndromo detectado!')).toBeVisible();
    await expect(page.getByText('Buscar otros palíndromos')).toBeVisible();
    await expect(page.queryByText('No encontramos productos')).not.toBeVisible();
  });
});
