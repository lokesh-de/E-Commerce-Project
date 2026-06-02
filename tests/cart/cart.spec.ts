import{test, expect, Locator} from '@playwright/test';
test.describe('Cart', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  });

  test('Add product to cart', async ({page}) => {
    const addToCartButtons: Locator = page.getByRole('button', {name: /Add To Cart/i});
    await addToCartButtons.nth(1).click();
    const toastMessage:Locator = page.locator('#toast-container');
    await expect(toastMessage).toContainText('Product Added To Cart');
    await expect(toastMessage).toBeHidden();
  });

  test('Verify cart total', async ({page}) => {
    const headerMenu:Locator = page.locator('nav');
    const cartItems: Locator = headerMenu.getByRole('button', { name: /Cart/i });
    await expect(cartItems).toHaveCount(1);
  });

  test('Verify cart item details', async ({page}) => {
    const headerMenu:Locator = page.locator('nav');
    await headerMenu.getByRole('button', { name: /Cart/i }).click();
    await expect(page).toHaveURL(/cart/);
    await expect(page.getByRole('heading', { name: /My Cart/i })).toBeVisible();
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();
    const cartItem: Locator = page.locator('li').filter({has: page.getByRole('heading', { name: 'ZARA COAT 3' })});
    await expect(cartItem.getByText('$ 11500', { exact: true })).toBeVisible();
    await expect(page.getByText('IN STOCK')).toBeVisible();
    await expect(page.getByRole('button', { name: /Buy Now/i })).toBeVisible();
  });

  test('Remove product from cart', async ({page}) => {
    const headerMenu:Locator = page.locator('nav');
    await headerMenu.getByRole('button', { name: /Cart/i }).click();
    await expect(page).toHaveURL(/cart/);
    await expect(page.getByRole('heading', { name: /My Cart/i })).toBeVisible();
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();
    const deleteButton: Locator = page.locator('button.btn-danger');
    await expect(deleteButton).toBeVisible();
    await deleteButton.click();
  });
});