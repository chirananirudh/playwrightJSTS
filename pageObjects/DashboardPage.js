class DashboardPage {
    constructor(page) {
        this.page = page;
        this.product = page.locator('.card-body');
        this.productText = page.locator('.card-body b');
        this.cart = page.locator('button[routerlink*="/dashboard/cart"]')
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    async searchProductAddToCart(productTitle) {
        await this.productText.first().waitFor({ state: 'visible' });
        // await page.locator('.card-body b').first().waitFor({ state: 'visible' });
        // Navigate to the products page
        const pageTitle = await this.productText.allTextContents();
        console.log(pageTitle);
        const count = await this.product.count();

        for (let i = 0; i < count; i++) {
            if (await this.product.nth(i).locator('b').textContent() == productTitle) {
                await this.product.nth(i).locator('text= Add To Cart').click();
                break
            }
        }
    }

    async navigateToOrders() {
        await this.orders.click();
    }

    async navigateToCart() {
        await this.cart.click();
    }
}

module.exports = { DashboardPage };
