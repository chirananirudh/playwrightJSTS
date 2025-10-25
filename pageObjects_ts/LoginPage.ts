import { expect, test, Page, Locator } from '@playwright/test';

export class LoginPage {
    page: Page;
    signInButton: Locator;
    userName: Locator;
    passWord: Locator;
    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator('[value="Login"]');
        this.userName = page.locator('#userEmail');
        this.passWord = page.locator('#userPassword');
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    async validLogin(userName: string, passWord: string) {
        await this.userName.fill(userName);
        await this.passWord.fill(passWord);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
} 