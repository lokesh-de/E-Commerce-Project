import {test, expect, Locator} from '@playwright/test';
test.describe('Logout', () => {

  test('Valid Logout', async ({page}) => {
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
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
    await page.getByRole("button", { name: "Sign Out" }).click();
    await expect(page).toHaveURL(/auth\/login/);
  });
});