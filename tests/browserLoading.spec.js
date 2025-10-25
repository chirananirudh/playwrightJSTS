const{test,expect}=require('@playwright/test');

test('Browser Loading Test',async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    page.route('**/*.css',route=>route.abort()); // to block css files
    page.route('**/*.{jpg,jpeg,png}',route=>route.abort()); // to block png,jpg and jpeg files
    page.on('request',request=>console.log(request.url()));
    page.on('response',response=>console.log(response.url(),response.status()));
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
 
    //css selector for fields
    const userName = page.locator('#username');
    const password = page.locator('[type="password"]');
    const signIn =  page.locator('#signInBtn');
    const products = page.locator('.card-body a');
    const errorMessage  = page.locator('[style*="block"]');

    await userName.fill('rahulshetty');
    await password.fill('learning');
    await signIn.click();
    expect(await errorMessage.textContent()).toContain('Incorrect');

    await userName.fill('');
    await userName.fill('rahulshettyacademy');
    await password.fill('learning');
    await signIn.click();

    console.log(await products.first().textContent());
    console.log(await products.nth(0).textContent());
    
    const allTitles  = await products.allTextContents();
    console.log(allTitles);
});

test('UI Controls Page',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName= page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    const dropDown = page.locator('select.form-control');
    const userBtn = page.locator('.radiotextsty');
    const popup = page.locator('#okayBtn');
    const checkBox = page.locator('input[type="checkbox"]');
    const blinkText = page.locator('[href*="https://rahulshettyacademy.com/documents-request"]');

    await userName.fill('rahulshettyacademy');
    await password.fill('learning');
    await dropDown.selectOption('consult');
    await userBtn.nth(1).click();
    await popup.click();
    await expect(userBtn.nth(1)).toBeChecked();
    await checkBox.click();
    await expect(checkBox).toBeChecked();
    await checkBox.uncheck();

   expect(await checkBox.isChecked()).toBeFalsy();
   await page.pause();
   await expect(blinkText).toHaveAttribute('class','blinkingText');
   await signIn.click();

});

test('Child Window Handling',async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName= page.locator('#username');
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const blinkText = page.locator('[href*="https://rahulshettyacademy.com/documents-request"]');
    
    const[newPage] = await Promise.all([
        context.waitForEvent('page'), // Listen for a page with pending, rejected and 
        blinkText.click()
    ])

    const text = await newPage.locator('div p.im-para.red').textContent();
    const email = text.split('@')[1].split(' ')[0];
    await newPage.close();

    await userName.fill(email);
    console.log(await userName.inputValue());
});