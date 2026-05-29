import {test, expect, Locator} from '@playwright/test';

test('Validate successful login', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  const userEmail:Locator = page.locator('#userEmail');
  const userPassword:Locator = page.locator('#userPassword');
  const loginButton:Locator = page.locator('#login');
  await userEmail.fill("lokeshavula80@gmail.com");
  await userPassword.fill("Lokesh123@");
  await loginButton.click();
  // URL validation
  await expect(page).toHaveURL(/dashboard/);
  // Success message
  const toastMessage:Locator = page.locator('#toast-container');
  await expect(toastMessage).toContainText('Login Successfully');
  await expect(toastMessage).toBeHidden();
  // Header menus
  const headerMenu:Locator = page.locator('nav');
  await expect(headerMenu.getByRole('button', { name: /HOME/i })).toBeVisible();
  await expect(headerMenu.getByRole('button', { name: /ORDERS/i })).toBeVisible();
  await expect(headerMenu.getByRole('button', { name: /Cart/i })).toBeVisible();
  await expect(headerMenu.getByRole('button', { name: /Sign Out/i })).toBeVisible();
  // Product validation
  await expect(page.getByRole('heading', { name: /iphone 13 pro/i })).toBeVisible();
  // Product count validation
  const products:Locator = page.locator('.card-body');
  await expect(products).toHaveCount(3);
  // Search validation
  await expect(
  page.getByRole('textbox', { name: 'search' })).toBeVisible();
  // Token validation
  const token:string | null = await page.evaluate(() => localStorage.getItem('token'));
  expect(token).not.toBeNull();
});

