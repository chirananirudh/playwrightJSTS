const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('../utils/ApiUtils');
const loginPayload = { userEmail: "chiranjeevee@gmail.com", userPassword: "Hewitt@5" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "68a961459320a140fe1ca57a" }] };
const fakePayload = { data: [], message: "No Orders" };
let response;

test.beforeAll(async () => {
    //Login API call
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayLoad);
});

test("Place the Order", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client');
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*', async route => {
        const answer = await page.request.fetch(route.request())
        let body = JSON.stringify(fakePayload);
        route.fulfill({
            answer,
            body,
        })
    })

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*')
    console.log(await page.locator(".mt-4").textContent());
});