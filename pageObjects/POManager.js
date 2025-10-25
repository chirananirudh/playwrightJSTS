const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { OrdersHistoryPage } = require('./OrdersHistoryPage');
const { OrdersReviewPage } = require('./OrdersReviewPage');
const { CartPage } = require('./CartPage');

class POManager {

    constructor(page) {
        this.page = page;
        this.LoginPage = new LoginPage(page);
        this.DashboardPage = new DashboardPage(page);
        this.OrdersHistoryPage = new OrdersHistoryPage(page);
        this.OrdersReviewPage = new OrdersReviewPage(page);
        this.CartPage = new CartPage(page);
    }

    getLoginPage() {
        return this.LoginPage;
    }

    getDashboardPage() {
        return this.DashboardPage;
    }


    getCartPage() {
        return this.CartPage;
    }


    getOrdersHistoryPage() {
        return this.OrdersHistoryPage;
    }

    getOrdersReviewPage() {
        return this.OrdersReviewPage;
    }
}

module.exports = { POManager };
