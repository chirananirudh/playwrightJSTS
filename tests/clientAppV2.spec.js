const { test, expect } = require('@playwright/test');

test('Client App Login', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const product = page.locator('.card-body');
    const productTitle = "ZARA COAT 3";
    const email = "chiranjeevee@gmail.com";

    await page.goto('https://rahulshettyacademy.com/client');

    // Fill the fields and click the login button
    const userName = page.getByPlaceholder('email@example.com');
    const passWord = page.getByPlaceholder('enter your passsword');
    const signIn = page.getByRole('button', { name: 'Login' });

    await userName.fill(email);
    await passWord.fill('Hewitt@5');
    await signIn.click();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor({ state: 'visible' });

    // Navigate to the products page
    const pageTitle = await page.locator('.card-body b').allTextContents();
    console.log(pageTitle);

    await page.locator('.card-body').filter({ hasText: productTitle }).getByRole('button', { name: 'Add To Cart' }).click();

    await page.getByRole('listitem').getByRole('button', { name: 'Cart' }).click();
    
    await page.locator("div li").first().waitFor();
    await expect(page.getByText(`${productTitle}`)).toBeVisible();
    // const cardPrdTitle = await page.locator(`h3:has-text("${productTitle}")`).isVisible();
    // expect(cardPrdTitle).toBeTruthy();

    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 });

    await page.getByRole('button', { name: 'India' }).nth(1).click();
    await page.getByText('PLACE ORDER').click();
    

    await expect(page.getByText(`Thankyou for the order.`)).toBeVisible();
    // const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    // console.log(orderId);

    // await page.locator("button[routerlink*='myorders']").click();
    // await page.locator("tbody").waitFor();
    // const rows = await page.locator("tbody tr");
    
    // await page.pause();
    // for (let i = 0; i < await rows.count(); ++i) {
    //     const rowOrderId = await rows.nth(i).locator("th").textContent();
    //     if (orderId.includes(rowOrderId)) {
    //         await rows.nth(i).locator("button").first().click();
    //         break;
    //     }
    // }

    //  await page.pause();

    // const orderIdDetails = await page.locator(".col-text").textContent();
    // expect(orderId.includes(orderIdDetails)).toBeTruthy();

    await page.pause();
})