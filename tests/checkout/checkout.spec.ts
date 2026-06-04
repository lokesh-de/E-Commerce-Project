import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../pages/checkoutpage';
import { CartPage } from '../../pages/cartpage';
test.describe('Checkout', () => { 
  let checkoutPage: CheckoutPage;
  let cartPage: CartPage;
  test.beforeEach(async ({ page }) => { 
    checkoutPage = new CheckoutPage(page);
    cartPage = new CartPage(page);
    await checkoutPage.navigateToCheckoutPage();
  });

  test('Verify checkout functionality', async ({ page }) => {
    await cartPage.addToCartButton.nth(1).click();
    await cartPage.headerMenu.getByRole('button', { name: /Cart/i }).click();
    await expect(page.getByText('Subtotal', { exact: true })).toBeVisible();
    await expect(page.getByText('Total', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /Checkout/i })).toBeVisible();
    await page.getByRole('button', { name: /Checkout/i }).click();
    await expect(page).toHaveURL(/order/);
  });

  test('Verify order details on checkout page', async ({ page }) => {
    await cartPage.addToCartButton.nth(1).click();
    await cartPage.headerMenu.getByRole('button', { name: /Cart/i }).click();
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
    await cartPage.addToCartButton.nth(1).click();
    await cartPage.headerMenu.getByRole('button', { name: /Cart/i }).click();
    await page.getByRole('button', { name: /Checkout/i }).click();
    await expect(checkoutPage.countryInput).toBeVisible();
    await checkoutPage.countryInput.click();
    await checkoutPage.countryInput.pressSequentially('ind');
    await expect(checkoutPage.countryDropdown).toBeVisible();
    await page.locator('.ta-item').getByText('India', { exact: true }).click();
    await page.getByText('Place Order', { exact: true }).click();
    await expect(page).toHaveURL(/thanks/);
    await expect(cartPage.toastMessage).toContainText('Order Placed Successfully');
    await expect(cartPage.toastMessage).toBeVisible();
  });
});