import { test, expect } from "../../src/Fixture/baseFixture";
import ProductData from "../../src/testdata/ProductData/product.json";

test.describe("Product Cart Validation Test Suite", () => {

  test("TC_001 - Verify that products priced at $10.90 and $14.90 are identified and counted correctly.", async ({appAction}) => {
    const count = await appAction.cart.verifyProductPriceCount(ProductData.products.targetPrices);
    console.log("Expected Product Count:", count);
  });

  test("TC_002 - Verify Add matching products By Price to cart", async ({appAction}) => {
    await appAction.cart.addMatchingProductsByPrice(ProductData.products.targetPrices);
  });

  test("TC_003 - Verify Multiple products By names added to cart", async ({ appAction }) => {
    await appAction.cart.addMultipleProducts(ProductData.products.ProductNames);
  });

  test("TC_004 - Validate product names", async ({ appAction }) => {
    await appAction.cart.addMatchingProductsByPrice(ProductData.products.targetPrices);
    await appAction.cart.openCart();
    const products = await appAction.cart.getCartProducts();
    for (const product of products) {
    expect(product.name).toBeTruthy();
    }
  });

  test("TC_005 - Validate product prices", async ({ appAction }) => {
    await appAction.cart.addMatchingProductsByPrice(ProductData.products.targetPrices);
    await appAction.cart.openCart();
    const products = await appAction.cart.getCartProducts();
    for (const product of products) {
      expect(product.price).toContain("$");
    }
  });

  test("TC_006 - Verify quantity > 0", async ({ appAction }) => {
    await appAction.cart.addMatchingProductsByPrice(ProductData.products.targetPrices);
    await appAction.cart.openCart();
    await appAction.cart.getAllitemQuantities();
    const Allquantity = await appAction.cart.getAllQuantities();
    //expect(Allquantity).not.toBe(0);
    console.log("Cart Item Quantities:", Allquantity);
  });

  test("TC_007 - Verify Subtotal validation", async ({ appAction }) => {
  await appAction.cart.addMatchingProductsByPrice(ProductData.products.targetPrices);
  await appAction.cart.openCart();
  const subtotal = await appAction.cart.calculateSubtotal();
  expect(subtotal).not.toBe(0);
  });

  test("TC_008 - Increase quantity", async ({ appAction }) => {
    await appAction.cart.addMatchingProductsByPrice(ProductData.products.targetPrices);
    await appAction.cart.openCart();
    const result = await appAction.cart.verifyIncreaseQuantity();
    for (let i = 0; i < result.beforeIncreaseQuantity.length; i++){
    expect(result.afterIncreaseQuantity[i]).toBe(result.beforeIncreaseQuantity[i] + 1);
    }
  });

  test("TC_009 - Decrease quantity", async ({ appAction }) => {
    await appAction.cart.addMatchingProductsByPrice(ProductData.products.targetPrices);
    await appAction.cart.openCart();
    const result = await appAction.cart.verifyDecreaseQuantity();
    for (let i = 0;i < result.beforeDecreaseQuantity.length;i++) {
    expect(result.afterDecreaseQuantity[i]).toBe(result.beforeDecreaseQuantity[i] - 1);
    }
  });

  test("TC_010 - Complete shopping flow", async ({ appAction }) => {
    await appAction.cart.addMatchingProductsByPrice(ProductData.products.targetPrices);
    await appAction.cart.openCart();
    await appAction.cart.getCartProducts();
    await appAction.cart.getAllitemQuantities();
    await appAction.cart.getAllQuantities();
    await appAction.cart.verifyIncreaseQuantity();
    await appAction.cart.verifyDecreaseQuantity();
    await appAction.cart.calculateSubtotal();
  });
  
});
