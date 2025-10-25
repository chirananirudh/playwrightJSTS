const{test,expect}=require('@playwright/test');

test('example test', async ({ browser}) => {
  const bbb = await chromium.launch();
  const context = await bbb.newContext();
  const page = await context.newPage();
  await page.goto('https://example.com');
  const title = await page.title();
  await page.getByTitle('Example Domain');
  expect(title).toBe('Example Domain');
  await bbb.close();
});