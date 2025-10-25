const { test } = require('@playwright/test');
let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const product = page.locator('.card-body');
    const productTitle = "ZARA COAT 3";
    const email = "chiranjeevee@gmail.com";

    await page.goto('https://rahulshettyacademy.com/client');

    // Fill the fields and click the login button
    const userName = page.locator('#userEmail');
    const passWord = page.locator('#userPassword');
    const signIn = page.locator('[value="Login"]');

    await userName.fill(email);
    await passWord.fill('Hewitt@5');
    await signIn.click();
    await page.waitForNavigation();
    // await page.waitForLoadState('networkidle');

    // Store the Storage Data in Json file
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
});

test("Client App login ", async () => {
    const email = "";
    const productTitle = "ZARA COAT 3";
    const page = await webContext.newPage();
    const product = page.locator('.card-body');
    await page.goto('https://rahulshettyacademy.com/client');
    // Navigate to the products page
    const pageTitle = await page.locator('.card-body b').allTextContents();
    console.log(pageTitle);
    const count = await product.count();

    for (let i = 0; i < count; i++) {
        if (await product.nth(i).locator('b').textContent() == productTitle) {
            await product.nth(i).locator('text= Add To Cart').click();
            break
        }
    }

    await page.locator('button[routerlink*="/dashboard/cart"]').click();
    await page.locator("div li").first().waitFor();

    const cardPrdTitle = await page.locator(`h3:has-text("${productTitle}")`).isVisible();
    expect(cardPrdTitle).toBeTruthy();

    await page.locator('text=Checkout').click();
    await page.locator('[placeholder*="Country"]').pressSequentially("ind", { delay: 150 });
    const dropdown = await page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();
    for (let i = 0; i < optionsCount; i++) {
        const text = await dropdown.locator('button').nth(i).textContent();
        if (text.trim() === "India") {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }

    expect(page.locator('.user__name [type="text"]').first()).toHaveText(email);
    await page.locator('.action__submit').click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    await page.pause();
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

test("Client App login2 ", async () => {
    const email = "";
    const productTitle = "ZARA COAT 3";
    const page = await webContext.newPage();
    const product = page.locator('.card-body');
    await page.goto('https://rahulshettyacademy.com/client');
    // Navigate to the products page
    const pageTitle = await page.locator('.card-body b').allTextContents();
    console.log(pageTitle);
});