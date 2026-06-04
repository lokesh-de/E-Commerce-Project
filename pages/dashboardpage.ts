import{Locator, Page} from '@playwright/test';
export class DashboardPage {
    readonly page: Page;
    readonly products: Locator;
    readonly headerMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = page.locator('.card-body');
        this.headerMenu = page.locator('nav');
    }

    async navigateToDashboardPage() {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }
}