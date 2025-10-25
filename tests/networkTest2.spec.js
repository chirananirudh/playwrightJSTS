const { test, expect } = require('@playwright/test');


test('Security test request intercept', async ({ page }) => {

    const email = "chiranjeevee@gmail.com";
    const userName = page.locator('#userEmail');
    const passWord = page.locator('#userPassword');
    const signIn = page.locator('[value="Login"]');

    await page.goto("https://rahulshettyacademy.com/client");
    await userName.fill(email);
    await passWord.fill('Hewitt@5');
    await signIn.click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();


    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=68cb906df669d6cb0ad589c6' }))
    await page.locator("button:has-text('View')").first().click();
    await page.pause();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

});