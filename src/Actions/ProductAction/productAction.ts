import { expect, Page } from "@playwright/test";
import { ProductPage } from "../../Pages/ProductPage/productPage";

export class ProductAction {
  readonly page: Page;
  readonly productPage: ProductPage;

  constructor(page: Page) {
    this.page = page;
    this.productPage = new ProductPage(page);
  }

  async get10_90ProductCount() {
    await this.page.waitForLoadState("networkidle");
    return await this.productPage.product10_90.count();
  }
  async get14_90ProductCount() {
    await this.page.waitForLoadState("networkidle");
    return await this.productPage.product14_90.count();
  }

  async getFilteredProductCount() {
    const products = this.productPage.Allproducts;
    await products.first().waitFor();
    //const count = await products.count();
    //console.log("Total Products:", count);
    const prices = await this.page
      .locator("text=/\\$\\d+\\.\\d{2}/")
      .allTextContents();
    const filtered = prices.filter((p) => p === "$10.90" || p === "$14.90");
    return filtered.length;
  }

  async addProductsByPrice(targetPrices: string[]) {
    const productCount = await this.productPage.Allproducts.count();
    const selectedMatchingProducts: { name: string; price: string }[] = [];
    for (let i = 0; i < productCount; i++) {
      const productName = await this.productPage.productName.nth(i).textContent();
      const productPrice = await this.productPage.productPrice.nth(i).textContent();
      if (productPrice && targetPrices.includes(productPrice)) {
        await this.productPage.addToCartButton.nth(i).click();
        await this.productPage.closecartButton.click();
        selectedMatchingProducts.push({
          name: productName ?? "",
          price: productPrice,
        });
      }
    }
   //console.log("Selected Matching Products:", selectedMatchingProducts);
    return selectedMatchingProducts;
  }

  async addMultipleProducts(ProductNames: string[]) {
    const productCount = await this.productPage.Allproducts.count();
    const selectedProducts: { name: string }[] = [];
    for (let i = 0; i < productCount; i++) {
      const productName = await this.productPage.productName
        .nth(i)
        .textContent();
      if (productName && ProductNames.includes(productName)) {
        await this.productPage.addToCartButton.nth(i).click();
        await this.productPage.closecartButton.click();
        await this.productPage.closecartButton.waitFor({
        state: "hidden",
        timeout: 5000
      });
        selectedProducts.push({
          name: productName ?? "",
        });
      }
    }
    //console.log("Added Products:", selectedProducts);
    return selectedProducts;
  }

  async addMatchingProductsByPrice(targetPrices: string[]) {
    await this.productPage.Allproducts.first().waitFor({ state: "visible" });
    const productCount = await this.productPage.Allproducts.count();
    const selectedMatchingProductsByPrice: { name: string; price: string }[] = [];
    for (let i = 0; i < productCount; i++) {
      const productName = await this.productPage.productName
        .nth(i)
        .textContent();
      const productPrice = await this.productPage.productPrice
        .nth(i)
        .textContent();
      if (productPrice && targetPrices.includes(productPrice)) {
        await this.productPage.addToCartButton.nth(i).click();
        await this.productPage.closecartButton.click();
        selectedMatchingProductsByPrice.push({
          name: productName ?? "",
          price: productPrice,
        });
      }
    }
    return selectedMatchingProductsByPrice;
  }
}
