import { test, expect } from '@playwright/test';

test.describe('Products Display', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display welcome message on initial load', async ({ page }) => {
    await expect(page.getByText('¡Bienvenido a Palindrome Store!')).toBeVisible();
    await expect(page.getByText('Explora nuestro catálogo completo')).toBeVisible();
  });

  test('should display product cards with all required information', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid^="product-"]', { timeout: 10000 });
    
    // Check that at least one product is displayed
    const productCards = page.locator('[data-testid^="product-"]');
    await expect(productCards.first()).toBeVisible();
    
    // Check that product cards have required elements
    const firstCard = productCards.first();
    await expect(firstCard.getByTestId('product-title')).toBeVisible();
    await expect(firstCard.getByTestId('product-brand')).toBeVisible();
    await expect(firstCard.locator('img')).toBeVisible();
  });

  test('should display product prices correctly', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid^="product-"]', { timeout: 10000 });
    
    const productCards = page.locator('[data-testid^="product-"]');
    const firstCard = productCards.first();
    
    // Should have either regular price or discounted price
    const hasRegularPrice = await firstCard.getByTestId('price').isVisible();
    const hasFinalPrice = await firstCard.getByTestId('final-price').isVisible();
    
    expect(hasRegularPrice || hasFinalPrice).toBeTruthy();
  });

  test('should show discount information for discounted products', async ({ page }) => {
    // Search for a palindrome to get discounted products
    await page.getByTestId('search-input').fill('abba');
    
    // Wait for search results
    await page.waitForSelector('[data-testid^="product-"]', { timeout: 10000 });
    
    const productCards = page.locator('[data-testid^="product-"]');
    
    if (await productCards.count() > 0) {
      const firstCard = productCards.first();
      
      // Check for discount badge
      const discountBadge = firstCard.getByTestId('discount-badge');
      if (await discountBadge.isVisible()) {
        await expect(discountBadge).toContainText('OFF');
        
        // Should show both original and final prices
        await expect(firstCard.getByTestId('final-price')).toBeVisible();
        await expect(firstCard.getByTestId('original-price')).toBeVisible();
        await expect(firstCard.getByTestId('savings')).toBeVisible();
      }
    }
  });

  test('should display product images correctly', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid^="product-"]', { timeout: 10000 });
    
    const productCards = page.locator('[data-testid^="product-"]');
    const firstCard = productCards.first();
    const image = firstCard.locator('img');
    
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('alt');
    await expect(image).toHaveAttribute('src');
  });

  test('should handle product hover effects', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid^="product-"]', { timeout: 10000 });
    
    const productCards = page.locator('[data-testid^="product-"]');
    const firstCard = productCards.first();
    
    // Hover over the card
    await firstCard.hover();
    
    // The card should still be visible and interactive
    await expect(firstCard).toBeVisible();
  });

  test('should display responsive grid layout', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid^="product-"]', { timeout: 10000 });
    
    // Check that products are displayed in a grid
    const grid = page.locator('.grid').first();
    await expect(grid).toBeVisible();
    
    // Should have multiple products
    const productCards = page.locator('[data-testid^="product-"]');
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should show product count summary', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid^="product-"]', { timeout: 10000 });
    
    // Look for the results summary at the bottom
    const summary = page.getByText(/Mostrando \d+ productos en total/);
    await expect(summary).toBeVisible();
  });

  test('should maintain product information integrity', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid^="product-"]', { timeout: 10000 });
    
    const productCards = page.locator('[data-testid^="product-"]');
    const firstCard = productCards.first();
    
    // Get product title and brand
    const title = await firstCard.getByTestId('product-title').textContent();
    const brand = await firstCard.getByTestId('product-brand').textContent();
    
    // Both should have content
    expect(title).toBeTruthy();
    expect(brand).toBeTruthy();
    expect(brand).toContain('Marca:');
  });
});
