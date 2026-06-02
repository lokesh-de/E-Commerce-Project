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
  await expect(page.getByRole('textbox', { name: 'search' })).toBeVisible();
  // Token validation
  const token:string | null = await page.evaluate(() => localStorage.getItem('token'));
  expect(token).not.toBeNull();
  const addToCartButtons: Locator = page.getByRole('button', {name: /Add To Cart/i});
  await addToCartButtons.nth(1).click();
  await headerMenu.getByRole('button', { name: /Cart/i }).click();
  await expect(page).toHaveURL(/cart/);
  await expect(page.getByRole('heading', { name: /My Cart/i })).toBeVisible();
  await expect(page.getByText('ZARA COAT 3')).toBeVisible();
  const cartItems: Locator = headerMenu.getByRole('button', { name: /Cart/i });
  await expect(cartItems).toHaveCount(1);
  const cartItem: Locator = page.locator('li').filter({has: page.getByRole('heading', { name: 'ZARA COAT 3' })});
  await expect(cartItem.getByText('$ 11500', { exact: true })).toBeVisible();
  await expect(page.getByText('IN STOCK')).toBeVisible();
  await expect(page.getByRole('button', { name: /Buy Now/i })).toBeVisible();
  const deleteButton: Locator = page.locator('button.btn-danger');
  await expect(deleteButton).toBeVisible();
  await expect(page.getByText('Subtotal', { exact: true })).toBeVisible();
  await expect(page.getByText('Total', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /Checkout/i })).toBeVisible();
  await page.getByRole('button', { name: /Checkout/i }).click();
  await expect(page).toHaveURL(/order/);
  await expect(page.locator('.item__title')).toHaveText('ZARA COAT 3');
  await expect(page.locator('.item__price')).toHaveText('$ 11500');
  await expect(page.locator('.item__quantity')).toHaveText('Quantity: 1');
  await expect(page.getByText('Payment Method')).toBeVisible();
  await expect(page.getByText('Credit Card', { exact: true })).toBeVisible();
  const email: string = "lokeshavula80@gmail.com";
  const emailLabel: Locator = page.locator('.user__name label');
  await expect(emailLabel).toHaveText(email);
  const countryInput: Locator = page.getByPlaceholder('Select Country');
  await expect(countryInput).toBeVisible();
  await countryInput.click();
  await countryInput.pressSequentially('ind');
  const dropdown = page.locator('.ta-results');
  await expect(dropdown).toBeVisible();
  await page.locator('.ta-item').getByText('India', { exact: true }).click();
  await expect(page.getByText('Credit Card Number')).toBeVisible();
  await expect(page.getByText('CVV Code')).toBeVisible();
  await expect(page.getByText('Name on Card')).toBeVisible();
  await expect(page.getByText('Place Order', { exact: true })).toBeVisible();
  await page.getByText('Place Order', { exact: true }).click();
  // URL validation
  await expect(page).toHaveURL(/thanks/);
  // Success message
  const toastMessage1:Locator = page.locator('#toast-container');
  await expect(toastMessage1).toContainText('Order Placed Successfully');
  await expect(toastMessage1).toBeVisible();
  await headerMenu.getByRole('button', { name: /ORDERS/i }).click();
  await expect(page).toHaveURL(/myorders/);
  await expect(page.getByRole('heading', { name: 'Your Orders' })).toBeVisible();
  await expect(page.getByText('Order Id')).toBeVisible();
  await expect(page.getByText('Product Image')).toBeVisible();
  await expect(page.getByText('Name')).toBeVisible();
  await expect(page.getByText('Price')).toBeVisible();
  await expect(page.getByText('Ordered Date')).toBeVisible();
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
  await page.getByText('View Orders').click();
  await expect(page).toHaveURL(/myorders/);
  await expect(page.getByText('Your Orders')).toBeVisible();
  await expect(page.getByText('Order Id')).toBeVisible();
  await expect(page.getByText('Product Image')).toBeVisible();
  await expect(page.getByText('Name')).toBeVisible();
  await expect(page.getByText('Price')).toBeVisible();
  await expect(page.getByText('Ordered Date')).toBeVisible();
  await expect(page.getByRole('button', { name: 'View' }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'Delete' }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
  await page.getByRole("button", { name: "Sign Out" }).click();
  await expect(page).toHaveURL(/auth\/login/);
});

