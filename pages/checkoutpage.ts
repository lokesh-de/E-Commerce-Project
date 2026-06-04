import{Page, Locator} from '@playwright/test';
export class CheckoutPage {
    readonly page:Page;
    readonly countryInput: Locator;
    readonly countryDropdown: Locator;

    constructor(page:Page) {
        this.page = page;
        this.countryInput = page.getByPlaceholder('Select Country');
        this.countryDropdown = page.locator('.ta-results');
    }

    async navigateToCheckoutPage() {
        await this.page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
    }
}