import { test, expect } from "@playwright/test";
import _products from "../public/product-list-with-cart/data.json";
import type { Product } from "../pages/product-list-with-cart";
const products = _products as Product[];

test.describe("FrontendMentor Challenge - Product list with cart page", () => {
  /** Go to Product list with cart page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/product-list-with-cart");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Product list with cart");
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Desserts", level: 1 }),
    ).toBeVisible();
  });

  /** Test if the page has initial product cards */
  test("has initial product cards", async ({ page }) => {
    const container = page.locator("ul");
    expect(await container.locator("li").all()).toHaveLength(products.length);
    for (const product of products) {
      const card = container.locator("li", {
        has: page.getByRole("img", { name: product.name }),
      });
      await expect(card).toBeVisible();
      await expect(
        card.getByRole("button", { name: "Add to Cart" }),
      ).toBeVisible();
      await expect(
        card.getByText(product.category, { exact: true }),
      ).toBeVisible();
      await expect(card.getByText(product.name)).toBeVisible();
      await expect(
        card.getByText(`$${product.price.toFixed(2)}`),
      ).toBeVisible();
    }
  });

  /** Test if the page has initial cart content */
  test("has initial cart content", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Your Cart (0)" }),
    ).toBeVisible();
    await expect(page.getByLabel("Empty Cart")).toBeVisible();
    await expect(page.getByText("Your added items will appear")).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
