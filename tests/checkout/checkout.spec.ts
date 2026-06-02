import{test, expect, Locator} from '@playwright/test';
test.describe('Checkout', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  });

  test('Verify checkout functionality', async ({ page }) => {
    const addToCartButtons: Locator = page.getByRole('button', {name: /Add To Cart/i});
    await addToCartButtons.nth(1).click();
    const headerMenu:Locator = page.locator('nav');
    await headerMenu.getByRole('button', { name: /Cart/i }).click();
    await expect(page.getByText('Subtotal', { exact: true })).toBeVisible();
    await expect(page.getByText('Total', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /Checkout/i })).toBeVisible();
    await page.getByRole('button', { name: /Checkout/i }).click();
    await expect(page).toHaveURL(/order/);
  });

  test('Verify order details on checkout page', async ({ page }) => {
    const addToCartButtons: Locator = page.getByRole('button', {name: /Add To Cart/i});
    await addToCartButtons.nth(1).click();
    const headerMenu:Locator = page.locator('nav');
    await headerMenu.getByRole('button', { name: /Cart/i }).click();
    await page.getByRole('button', { name: /Checkout/i }).click();
    await expect(page.locator('.item__title')).toHaveText('ZARA COAT 3');
    await expect(page.locator('.item__price')).toHaveText('$ 11500');
    await expect(page.locator('.item__quantity')).toHaveText('Quantity: 1');
    await expect(page.getByText('Credit Card Number')).toBeVisible();
    await expect(page.getByText('CVV Code')).toBeVisible();
    await expect(page.getByText('Name on Card')).toBeVisible();
    await expect(page.getByText('Place Order', { exact: true })).toBeVisible();
  });

  test('Verify order placement', async ({ page }) => {
    const addToCartButtons: Locator = page.getByRole('button', {name: /Add To Cart/i});
    await addToCartButtons.nth(1).click();
    const headerMenu:Locator = page.locator('nav');
    await headerMenu.getByRole('button', { name: /Cart/i }).click();
    await page.getByRole('button', { name: /Checkout/i }).click();
    const countryInput: Locator = page.getByPlaceholder('Select Country');
    await expect(countryInput).toBeVisible();
    await countryInput.click();
    await countryInput.pressSequentially('ind');
    const dropdown = page.locator('.ta-results');
    await expect(dropdown).toBeVisible();
    await page.locator('.ta-item').getByText('India', { exact: true }).click();
    await page.getByText('Place Order', { exact: true }).click();
    // URL validation
    await expect(page).toHaveURL(/thanks/);
    // Success message
    const toastMessage:Locator = page.locator('#toast-container');
    await expect(toastMessage).toContainText('Order Placed Successfully');
    await expect(toastMessage).toBeVisible();
  });
});