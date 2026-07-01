import { expect, Page } from "@playwright/test";
import { CartPage } from "../../Pages/CartPage/cartPage";

export class CartAction {
  readonly page: Page;
  readonly cartPage: CartPage;

  constructor(page: Page) {
    this.page = page;
    this.cartPage = new CartPage(page);
  }

  async getCartCount() {
    return await this.cartPage.cartItems.count();
  }

  async getCartProducts(): Promise<{ name: string; price: string }[]> {
    const count = await this.cartPage.cartItems.count();
    const products: { name: string; price: string }[] = [];
    for (let i = 0; i < count; i++) {
      const item = this.cartPage.cartItems.nth(i);
      const name = await item
        .locator(this.cartPage.cartProductName)
        .textContent();
      const price = await item.locator(this.cartPage.cartPrice).textContent();
      const cleanPrice = price?.replace(/[^0-9.$]/g, "").replace(/\s+/g, "");
      products.push({
        name: name?.trim() ?? "",
        price: cleanPrice?.trim() ?? "",
      });
    }
    //console.log("Cart Products:", products);
    return products;
  }

  async openCart() {
    await this.cartPage.cartButton.click();
  }

  async getAllitemQuantities(): Promise<number[]> {
    const quantities = this.cartPage.itemquantity;
    const count = await quantities.count();
    const qtyArray: number[] = [];
    for (let i = 0; i < count; i++) {
      const text = await quantities.nth(i).innerText();
      const match = text.match(/\d+/);
      qtyArray.push(match ? Number(match[0]) : 0);
    }
    //console.log("Particular item quantity:", qtyArray);
    return qtyArray;
  }

  async getAllQuantities() {
    const qty = await this.cartPage.quantity.innerText();
    const totalQuantity = Number(qty.trim());
    //console.log("all item quantity=>", totalQuantity);
    return totalQuantity;
  }

  async calculateSubtotal() {
    const AmmountValue = await this.cartPage.subtotal.innerText();
    console.log("Ammount Value:", AmmountValue);
    const subtotalAmount = Number(AmmountValue?.replace(/[^0-9.]/g, "") || 0);
    console.log("Subtotal:", subtotalAmount);
    return subtotalAmount;
  }

  async verifyIncreaseQuantity() {
    const beforeIncreaseQuantity = await this.getAllitemQuantities();
    console.log("Before Increase Quantity:", beforeIncreaseQuantity);
    const count = await this.cartPage.cartItems.count();
    for (let i = 0; i < count; i++) {
      await this.cartPage.increaseBtn.nth(i).click();
    }
    const afterIncreaseQuantity = await this.getAllitemQuantities();
    console.log("After Increase Quantity:", afterIncreaseQuantity);
    return { beforeIncreaseQuantity, afterIncreaseQuantity };
  }

  async verifyDecreaseQuantity() {
    const count = await this.cartPage.cartItems.count();
    for (let i = 0; i < count; i++) {
      await this.cartPage.increaseBtn.nth(i).click();
    }
    const beforeDecreaseQuantity = await this.getAllitemQuantities();
    console.log("Before Decrease Quantity:", beforeDecreaseQuantity);
     for (let i = count - 1; i >= 0; i--) {
      await this.cartPage.decreaseBtn.nth(i).click();
    }
    const afterDecreaseQuantity = await this.getAllitemQuantities();
    console.log("After Decrease Quantity:", afterDecreaseQuantity);
    return { beforeDecreaseQuantity, afterDecreaseQuantity };
  }
}
