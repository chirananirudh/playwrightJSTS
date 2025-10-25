class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInButton = page.locator('[value="Login"]');
        this.userName = page.locator('#userEmail');
        this.passWord = page.locator('#userPassword');
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    async validLogin(userName, passWord) {
        await this.userName.fill(userName);
        await this.passWord.fill(passWord);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage };