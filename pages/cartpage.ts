import{Page, Locator} from '@playwright/test';
export class CartPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly toastMessage: Locator;
    readonly headerMenu: Locator;
    readonly cartItems: Locator;
    readonly cartItem: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.getByRole('button', { name: /Add To Cart/i });
        this.toastMessage = page.locator('#toast-container');
        this.headerMenu = page.locator('nav');
        this.cartItems = this.headerMenu.getByRole('button', { name: /Cart/i });
        this.cartItem = page.locator('li').filter({ has: page.getByRole('heading', { name: 'ZARA COAT 3' }) });
        this.deleteButton = page.locator('button.btn-danger');
    }   

    async navigateToCartPage() {
        await this.page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
    }   

}
