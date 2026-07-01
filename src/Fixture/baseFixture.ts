import { test as base, expect } from "@playwright/test";
import { ProductAction } from "../Actions/ProductAction/productAction";
import { CartAction } from "../Actions/CartAction/cartAction";
import BaseData from "../testdata/BaseData/base.json";



type AppAction = {
  product: ProductAction;
  cart: CartAction;  
  
};
type Fixtures = {
  gotoBaseUrl: void;
  appAction: AppAction;
};

export const test = base.extend<Fixtures>({
  gotoBaseUrl: [
    async ({ page }, use) => {
      await page.goto(BaseData.baseUrl);
      await expect(page).toHaveURL(BaseData.baseUrl);
      await use();
    },
    { auto: true },
  ],

  appAction: async ({ page }, use) => {
    const appAction: AppAction = {
      cart: new CartAction(page),
      product: new ProductAction(page),
    };
    await use(appAction);
  },
});

export { expect } from "@playwright/test";
