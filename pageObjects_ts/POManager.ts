import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { OrdersHistoryPage } from "./OrdersHistoryPage";
import { OrdersReviewPage } from "./OrdersReviewPage";
import { CartPage } from "./CartPage";
import { Page } from '@playwright/test'

export class POManager {
    page: Page;
    LoginPage: LoginPage;
    DashboardPage: DashboardPage;
    OrdersHistoryPage: OrdersHistoryPage;
    OrdersReviewPage: OrdersReviewPage;
    CartPage: CartPage;

    constructor(page: Page) {
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