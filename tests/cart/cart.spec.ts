import{test, expect} from '@playwright/test';
import { CartPage } from '../../pages/cartpage';
test.describe('Cart', () => {
  let cartPage: CartPage;
  test.beforeEach(async ({ page }) => { cartPage = new CartPage(page);
    await cartPage.navigateToCartPage();  
  });

  test('Validate cart URL', async ({ page }) => {
    await expect(page).toHaveURL(/dashboard\/dash/);
  });

  test('Add product to cart', async ({page}) => {
    await cartPage.addToCartButton.nth(1).click();
    await expect(cartPage.toastMessage).toContainText('Product Added To Cart');
    await expect(cartPage.toastMessage).toBeHidden();
  });

  test('Verify cart total', async ({page}) => {
    await expect(cartPage.cartItems).toHaveCount(1);
  });

  test('Verify cart item details', async ({page}) => {
    await cartPage.headerMenu.getByRole('button', { name: /Cart/i }).click();
    await expect(page.getByRole('heading', { name: /My Cart/i })).toBeVisible();
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();
    await expect(cartPage.cartItem.getByText('$ 11500', { exact: true })).toBeVisible();
    await expect(page.getByText('IN STOCK')).toBeVisible();
    await expect(page.getByRole('button', { name: /Buy Now/i })).toBeVisible();
  });

  test('Verify cart URL after clicking cart menu', async ({page}) => {
    await cartPage.headerMenu.getByRole('button', { name: /Cart/i }).click();
    await expect(page).toHaveURL(/cart/);
  });

  test('Remove product from cart', async ({page}) => {
    await cartPage.addToCartButton.nth(1).click();
    await expect(cartPage.toastMessage).toContainText('Product Added To Cart');
    await cartPage.headerMenu.getByRole('button', { name: /Cart/i }).click();
    await expect(page).toHaveURL(/cart/);
    await expect(page.getByRole('heading', { name: /My Cart/i })).toBeVisible();
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();
    await expect(cartPage.deleteButton).toBeVisible();
    await cartPage.deleteButton.click();
  });
});