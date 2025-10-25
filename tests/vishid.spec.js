const { test, expect } = require('@playwright/test');
const { text } = require('stream/consumers');

// test.describe.configure({ mode: 'parallel' });
test.describe.configure({ mode: 'serial' });

test("Visible Hidden Elements", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on("dialog", dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator('li a[href*="lifetime-access"]:visible').click();
    const textCheck = await framePage.locator(".text h2 span").textContent();
    console.log(textCheck);
});

test("Screenshot & Visual Comparison", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({ path: 'visible.png' });
    await page.locator("#hide-textbox").click();
    await page.screenshot({ path: 'screenshot.png' });
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test('Visual Comparison', async ({ page }) => {
    await page.goto("https://flightware.com/");
    expect(await page.screenshot()).toMatchSnapshot('flightware.png');

});