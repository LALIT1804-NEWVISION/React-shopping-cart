import { Page, Locator } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly product10_90: Locator;
  readonly product14_90: Locator;
  readonly Allproducts: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly closecartButton :Locator;


  constructor(page: Page) {
    this.page = page;
    this.product10_90 = page.locator("//b[text()='10']/parent::p/span[text()='.90']");
    this.product14_90 = page.locator("//b[text()='14']/parent::p/span[text()='.90']");
    this.Allproducts = page.locator('div.sc-124al1g-2');
    this.productName = page.locator("//div[@tabindex='1']/p[@class='sc-124al1g-4 eeXMBo']");
    this.productPrice = page.locator("//div[@tabindex='1']//p[@class='sc-124al1g-6 ljgnQL']");
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.closecartButton = page.getByRole("button", { name: "X" });
   
    
  }
}