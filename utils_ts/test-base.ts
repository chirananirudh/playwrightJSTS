import { test as baseTest } from '@playwright/test';
interface TestDataForOrder {
    email: string;
    passWord: string;
    productTitle: string;
}

export const CustomTest = baseTest.extend<{ testDataForOrder: TestDataForOrder }>({
    testDataForOrder: {
        email: "chiranjeevee@gmail.com",
        passWord: "Hewitt@5",
        productTitle: "ZARA COAT 3"
    }
})