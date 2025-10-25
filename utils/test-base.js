const base = require('@playwright/test');

exports.Customtest = base.test.extend({
    testDataForOrder: {
        email: "chiranjeevee@gmail.com",
        passWord: "Hewitt@5",
        productTitle: "ZARA COAT 3"
    }
})