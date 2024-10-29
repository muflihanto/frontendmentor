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
        card.getByRole("button", { name: `Add ${product.name} to Cart` }),
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

  /** Test if the user can add items to the cart and remove them */
  test("can add items to the cart and remove them", async ({ page }) => {
    const addToCartButtons = products.map((product) => {
      return page.getByRole("button", { name: `Add ${product.name} to Cart` });
    });
    for (const button of addToCartButtons) {
      await expect(button).toBeVisible();
      await button.click();
    }
    const quantityButtonGroup = products.map((product) => {
      return page
        .locator("li")
        .filter({ hasText: `1${product.category}${product.name}` })
        .locator("div")
        .nth(2);
    });
    const cart = page.locator("aside");
    for (const [index, group] of Object.entries(quantityButtonGroup)) {
      await expect(group).toBeVisible();
      await expect(
        cart.getByRole("heading", {
          name: products[Number.parseInt(index)].name,
        }),
      ).toBeVisible();
    }
    const removeItemButtons = products.map(({ name }) => {
      return [
        name,
        cart.locator("li").filter({ hasText: name }).getByRole("button"),
      ] as const;
    });
    for (const [name, button] of removeItemButtons) {
      await button.click();
      await expect(button).not.toBeVisible();
      await expect(cart.getByRole("heading", { name })).not.toBeVisible();
    }
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
