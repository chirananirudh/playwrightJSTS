const { test, expect } = require('@playwright/test');
const { Customtest } = require('../utils/test-base');
const { POManager } = require('../pageObjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));

for (const data of dataSet) {
    test(`@web Client App Login - ${data.email} - ${data.productTitle}`, async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const pomanager = new POManager(page);

        //Login Page
        const loginPage = pomanager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.email, data.passWord);

        //Dashboard Page
        const dashboard = pomanager.getDashboardPage();
        await dashboard.searchProductAddToCart(data.productTitle);
        await dashboard.navigateToCart();

        //Cart Page
        const cartPage = pomanager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productTitle);
        await cartPage.Checkout();

        //Orders Review Page
        const ordersReviewPage = pomanager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);

        //Orders History Page
        await dashboard.navigateToOrders();
        const ordersHistoryPage = pomanager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    })
}

Customtest(`@web Client App Login`, async ({ browser, testDataForOrder }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const pomanager = new POManager(page);

    //Login Page
    const loginPage = pomanager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.email, testDataForOrder.passWord);

    //Dashboard Page
    const dashboard = pomanager.getDashboardPage();
    await dashboard.searchProductAddToCart(testDataForOrder.productTitle);
    await dashboard.navigateToCart();

    //Cart Page
    const cartPage = pomanager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productTitle);
    await cartPage.Checkout();

    //Orders Review Page
    const ordersReviewPage = pomanager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    //Orders History Page
    await dashboard.navigateToOrders();
    const ordersHistoryPage = pomanager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
})
