import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly Allproducts: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly closecartButton :Locator;
  readonly cartItems: Locator;
  readonly cartButton: Locator;
  readonly cartProductName: Locator;
  readonly cartPrice: Locator;
  readonly quantity: Locator;
  readonly itemquantity: Locator;
  readonly subtotal: Locator;
  readonly increaseBtn: Locator;
  readonly decreaseBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.Allproducts = page.locator('div.sc-124al1g-2');
    this.productName = page.locator("//div[@tabindex='1']/p[@class='sc-124al1g-4 eeXMBo']");
    this.productPrice = page.locator("//div[@tabindex='1']//p[@class='sc-124al1g-6 ljgnQL']");
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.closecartButton = page.getByRole("button", { name: "X" });
    this.cartItems = page.locator("div.sc-11uohgb-0");
    this.cartButton = page.locator(".sc-1h98xa9-0");
    this.cartProductName = page.locator("p.sc-11uohgb-2");
    this.cartPrice = page.locator("div.sc-11uohgb-4");
    this.itemquantity = page.locator("p.sc-11uohgb-3");
    this.quantity = page.locator("div.sc-1h98xa9-3");
    this.subtotal = page.locator("p.sc-1h98xa9-9");
    this.increaseBtn = page.locator('button').filter({ hasText: '+' })
    this.decreaseBtn = page.locator('button').filter({ hasText: '-' })
  }
}
