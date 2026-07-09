import { test, expect } from "../../src/Fixture/baseFixture";
import ProductData from "../../src/testdata/ProductData/product.json";

test.describe("Product Cart Validation Test Suite", () => {
  test("TC_001 - Verify products and price $10.90 count", async ({appAction}) => {
    const price10Count = await appAction.product.get10_90ProductCount();
    //console.log("$10.90 Products:", price10Count);
    expect(price10Count).toBeGreaterThan(0);
  });

  test("TC_002 - Verify products and price $14.90 count", async ({appAction}) => {
    const price14Count = await appAction.product.get14_90ProductCount();
    //console.log("$14.90 Products:", price14Count);
    expect(price14Count).toBeGreaterThan(0);
  });

  test("TC_003 - Verify only valid price products selected", async ({appAction}) => {
    const filteredData = await appAction.product.getFilteredProductCount();
    //console.log("Filtered Result:", filteredData);
    expect(filteredData).toBeGreaterThan(0);
  });

  test("TC_004 - Verify Add matching products to cart", async ({appAction}) => {
    await appAction.product.addProductsByPrice(ProductData.products.targetPrices);
  });

  test("TC_005 - Verify Multiple products added", async ({ appAction }) => {
    await appAction.product.addMultipleProducts(ProductData.products.ProductNames);
  });

  test("TC_006 - verify Multiple random products added", async ({appAction}) => {
    await appAction.product.addRandomProducts();
  });

  test("TC_007 - Validate product names", async ({ appAction }) => {
    await appAction.product.addMatchingProductsByPrice(ProductData.products.targetPrices);
    await appAction.cart.openCart();
    const products = await appAction.cart.getCartProducts();
    for (const product of products) {
      expect(product.name).toBeTruthy();
    }
  });

  test("TC_008 - Validate product prices", async ({ appAction }) => {
    await appAction.product.addMatchingProductsByPrice(ProductData.products.targetPrices);
    await appAction.cart.openCart();
    const products = await appAction.cart.getCartProducts();
    for (const product of products) {
      expect(product.price).toContain("$");
    }
  });

  test("TC_009 - Verify quantity > 0", async ({ appAction }) => {
    await appAction.product.addMatchingProductsByPrice(ProductData.products.targetPrices);
    await appAction.cart.openCart();
    await appAction.cart.getAllitemQuantities();
    const Allquantity = await appAction.cart.getAllQuantities();
    expect(Allquantity).toBeGreaterThan(0);
  });

  test("TC_010 - Verify Subtotal validation", async ({ appAction }) => {
  await appAction.product.addMatchingProductsByPrice(ProductData.products.targetPrices);
    await appAction.cart.openCart();
    const subtotal = await appAction.cart.calculateSubtotal();
    expect(subtotal).toBeGreaterThan(0);
  });

  test("TC_011 - Increase quantity", async ({ appAction }) => {
    await appAction.product.addMatchingProductsByPrice(ProductData.products.targetPrices);
    await appAction.cart.openCart();
    const result = await appAction.cart.verifyIncreaseQuantity();
    //expect(result.afterIncreaseQuantity[0]).toBe(result.beforeIncreaseQuantity[0] + 1);
    for (let i = 0; i < result.beforeIncreaseQuantity.length; i++){
    expect(result.afterIncreaseQuantity[i]).toBe(result.beforeIncreaseQuantity[i] + 1);
    }
  });

  test("TC_012 - Decrease quantity", async ({ appAction }) => {
    await appAction.product.addMatchingProductsByPrice(ProductData.products.targetPrices);
    await appAction.cart.openCart();
    const result = await appAction.cart.verifyDecreaseQuantity();
    //expect(result.afterDecreaseQuantity[0]).toBe(result.beforeDecreaseQuantity[0] - 1);
    for (let i = 0;i < result.beforeDecreaseQuantity.length;i++) {
    expect(result.afterDecreaseQuantity[i]).toBe(result.beforeDecreaseQuantity[i] - 1);
    }
  });

  test("TC_013 - Empty cart validation", async ({ appAction }) => {
    const count = await appAction.cart.getCartCount();
    expect(count).toBe(0);
  });

  test("TC_014 - App stability on reload", async ({ page }) => {
    await page.reload();
    await expect(page).toHaveTitle(/Shopping/i);
  });

  test("TC_015 - Complete shopping flow", async ({ appAction }) => {
    await appAction.product.addMatchingProductsByPrice(ProductData.products.targetPrices);
    await appAction.cart.openCart();
    await appAction.cart.getCartProducts();
    await appAction.cart.getAllitemQuantities();
    await appAction.cart.getAllQuantities();
    await appAction.cart.verifyIncreaseQuantity();
    await appAction.cart.verifyDecreaseQuantity();
    await appAction.cart.calculateSubtotal();
  });
});
