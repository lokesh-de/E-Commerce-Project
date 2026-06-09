import{ test, expect } from '@playwright/test';
test.describe('Logout', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  });

  test('User can logout', async ({ page }) => {
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
    await page.getByRole("button", { name: "Sign Out" }).click();
    await expect(page).toHaveURL(/auth\/login/);
  });
});