import {test, expect, Locator} from '@playwright/test';
test.describe('Invalid Login', () => {

  test('Invalid password', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const userEmail:Locator = page.locator('#userEmail');
    const userPassword:Locator = page.locator('#userPassword');
    const loginButton:Locator = page.locator('#login');
    await userEmail.fill("lokeshavula80@gmail.com");
    await userPassword.fill("Lokesh12345@");
    await loginButton.click();
    // URL validation
    await expect(page).not.toHaveURL(/dashboard/);
    // Error message
    const toastMessage:Locator = page.locator('#toast-container');
    await expect(toastMessage).toContainText('Incorrect email or password');
    await expect(toastMessage).toBeHidden();
  });

  test('Empty email', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const userEmail:Locator = page.locator('#userEmail');
    const userPassword:Locator = page.locator('#userPassword');
    const loginButton:Locator = page.locator('#login');
    await userEmail.fill("");
    await userPassword.fill("Lokesh123@");
    await loginButton.click();
    // URL validation
    await expect(page).not.toHaveURL(/dashboard/);
    // Error message
    await expect(page.locator('.invalid-feedback').filter({ hasText: 'Email is required' })).toBeVisible();
  });
});