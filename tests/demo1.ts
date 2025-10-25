import { expect, type Locator, type Page } from '@playwright/test';

let message1: string = "Hello";
message1 = "bye"
console.log(message1);

let age1: number = 20;
console.log(age1);

let isActive: boolean = true;
console.log(isActive);

let numbers1: number[] = [1, 2, 3, 4, 5];
console.log(numbers1);

let data: any = "Hello";
data = 2;
console.log(data);

// Function with type annotations
function add(a: number, b: number): number {
    console.log(a + b);
    return a + b;
}

add(5, 10);

// Object with type annotations

let person: {
    name: string,
    age: number,
    spouse?: string,
    kid?: string
} = { name: "Chiranjeevee", age: 41 };
person.spouse = "Deekshitha";
person.kid = "Anirudh";

console.log(person);

// Class with type annotations

class CartPage {
    page: Page;
    cartProducts: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;
    checkout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");
    }
}