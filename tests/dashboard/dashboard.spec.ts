import { test, expect } from '@playwright/test';
import { DashboardPage } from "../../pages/dashboardpage";
test.describe('Dashboard', () => {
  let dashboardPage: DashboardPage;
  test.beforeEach(async ({ page }) => { dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToDashboardPage();
  });

  test('Validate dashboard URL', async ({ page }) => {
    await expect(page).toHaveURL(/dashboard/);
  });

  test('Verify products displayed', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /iphone 13 pro/i })).toBeVisible();
    await expect(dashboardPage.products).toHaveCount(3);
  });

  test('Verify search box visible', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: 'search' })).toBeVisible();
  });

  test('Verify header menus', async ({ page }) => {
    await expect(dashboardPage.headerMenu.getByRole('button', { name: /HOME/i })).toBeVisible();
    await expect(dashboardPage.headerMenu.getByRole('button', { name: /ORDERS/i })).toBeVisible();
    await expect(dashboardPage.headerMenu.getByRole('button', { name: /Cart/i })).toBeVisible();
    await expect(dashboardPage.headerMenu.getByRole('button', { name: /Sign Out/i })).toBeVisible();
  });
});