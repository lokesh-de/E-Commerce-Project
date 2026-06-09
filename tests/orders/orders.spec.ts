import{ test, expect } from '@playwright/test';
import { OrdersPage } from '../../pages/orderspage';
import { CartPage } from '../../pages/cartpage';
test.describe('Orders', () => {
  let ordersPage: OrdersPage;
  let cartPage: CartPage;
  test.beforeEach(async ({ page }) => {
    ordersPage = new OrdersPage(page);
    cartPage = new CartPage(page);
    await ordersPage.navigateToOrdersPage();
  });

  test('Verify orders page', async ({ page }) => {
    await cartPage.headerMenu.getByRole('button', { name: /ORDERS/i }).click();
    await expect(page).toHaveURL(/myorders/);
    await expect(page.getByRole('heading', { name: 'Your Orders' })).toBeVisible();
    await expect(page.getByText('Order Id')).toBeVisible();
    await expect(page.getByText('Product Image')).toBeVisible();
    await expect(page.getByText('Name')).toBeVisible();
    await expect(page.getByText('Price')).toBeVisible();
    await expect(page.getByText('Ordered Date')).toBeVisible();
  });

  test('Verify order details page', async ({ page }) => {
    await cartPage.headerMenu.getByRole('button', { name: /ORDERS/i }).click();
    await page.getByRole('button', { name: 'View' }).first().click();
    await expect(page).toHaveURL(/order-details/);
    await expect(page.getByText(/thank you for shopping with us/i)).toBeVisible();
    await expect(page.getByText(/order summary/i)).toBeVisible();
    await expect(page.getByText('Order Id')).toBeVisible();
    await expect(page.getByText(/billing address/i)).toBeVisible();
    await expect(page.getByText(/delivery address/i)).toBeVisible();
    await expect(page.getByText('lokeshavula80@gmail.com')).toHaveCount(2);
    await expect(page.getByText('Country - India')).toHaveCount(2);
    await expect(page.getByText(/product ordered/i)).toBeVisible();
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();
    await expect(page.getByText('$ 11500')).toBeVisible();
    await expect(page.getByText('By ECOM')).toBeVisible();
    await expect(page.locator('img')).toBeVisible();
    await expect(page.getByText('View Orders')).toBeVisible();
  });
});