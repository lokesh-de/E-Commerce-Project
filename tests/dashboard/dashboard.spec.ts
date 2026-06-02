import {test, expect, Locator} from '@playwright/test';
test.describe('Dashboard', () => {
    test.beforeEach(async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    });
  test('Verify products displayed', async ({ page }) => {
    // Product validation
    await expect(page.getByRole('heading', { name: /iphone 13 pro/i })).toBeVisible();
    // Product count validation
    const products:Locator = page.locator('.card-body');
    await expect(products).toHaveCount(3);
  });

  test('Verify search box visible', async ({ page }) => {
    // Search validation
    await expect(page.getByRole('textbox', { name: 'search' })).toBeVisible();
  });

  test('Verify header menus', async ({ page }) => {
    // Header menus
    const headerMenu:Locator = page.locator('nav');
    await expect(headerMenu.getByRole('button', { name: /HOME/i })).toBeVisible();
    await expect(headerMenu.getByRole('button', { name: /ORDERS/i })).toBeVisible();
    await expect(headerMenu.getByRole('button', { name: /Cart/i })).toBeVisible();
    await expect(headerMenu.getByRole('button', { name: /Sign Out/i })).toBeVisible();
  });

  test("Verify token in local storage", async ({ page }) => {
    // Token validation
    const token:string | null = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).not.toBeNull();
  });
});