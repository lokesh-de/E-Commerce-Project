import { Page, Locator } from '@playwright/test';
// This class represents the login page of the application and provides methods to interact with it.
export class LoginPage {
    readonly page: Page;
    readonly userEmail: Locator;
    readonly userPassword: Locator;
    readonly loginButton: Locator;
    readonly toastMessage: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userEmail = page.locator('#userEmail');
        this.userPassword = page.locator('#userPassword');
        this.loginButton = page.locator('#login');
        this.toastMessage = page.locator('#toast-container');
        this.errorMessage = page.locator('.invalid-feedback').filter({ hasText: 'Email is required' });
    }

    async navigateToLoginPage() {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }

    async login(data: { email: string; password: string }) {
        await this.userEmail.fill(data.email);
        await this.userPassword.fill(data.password);
        await this.loginButton.click();
    }

    async getToken(): Promise<string | null> {
        return await this.page.evaluate(() => localStorage.getItem('token'));
    }
    
}