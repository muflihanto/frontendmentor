import { test, expect } from "@playwright/test";
import _products from "../public/product-list-with-cart/data.json";
import type { Product } from "../pages/product-list-with-cart";
import AxeBuilder from "@axe-core/playwright";
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
    const cart = page.locator("aside");
    await expect(
      cart.getByRole("heading", { name: "Your Cart (0)" }),
    ).toBeVisible();
    for (const [index, button] of Object.entries(addToCartButtons)) {
      await expect(button).toBeVisible();
      await button.click();
      await expect(
        cart.getByRole("heading", { name: `Your Cart (${Number(index) + 1})` }),
      ).toBeVisible();
      await expect(
        cart.getByText(
          `Order Total$${Array.from({ length: Number(index) + 1 })
            .map((_, index) => index)
            .reduce((acc, curr) => acc + products[curr].price, 0)
            .toFixed(2)}`,
        ),
      ).toBeVisible();
    }
    const quantityButtonGroup = products.map((product) => {
      return page
        .locator("li")
        .filter({ hasText: `1${product.category}${product.name}` })
        .locator("div")
        .nth(2);
    });
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

  /** Test if the user can increase/decrease the number of items in the cart */
  test("can increase/decrease the number of items in the cart", async ({
    page,
  }) => {
    for (const product of products) {
      await page
        .getByRole("button", { name: `Add ${product.name} to Cart` })
        .click();
    }
    const quantityButtonGroup = products.map((product) => {
      return [
        product.name,
        page
          .locator("li")
          .filter({ hasText: `${product.category}${product.name}` })
          .locator("div")
          .nth(2),
      ] as const;
    });
    const cart = page.locator("aside");
    for (const [name, group] of quantityButtonGroup) {
      const decrement = group.getByRole("button", {
        name: `Decrement ${name}`,
      });
      const increment = group.getByRole("button", {
        name: `Increment ${name}`,
      });
      const cartItem = cart.locator("li").filter({ hasText: name });

      await expect(decrement).toBeVisible();
      await expect(group.locator("span", { hasText: "1" })).toBeVisible();
      await expect(cartItem.locator("span", { hasText: "1x" })).toBeVisible();
      await expect(increment).toBeVisible();

      await increment.click();
      await increment.click();
      await expect(group.locator("span", { hasText: "3" })).toBeVisible();
      await expect(cartItem.locator("span", { hasText: "3x" })).toBeVisible();

      await decrement.click();
      await expect(group.locator("span", { hasText: "2" })).toBeVisible();
      await expect(cartItem.locator("span", { hasText: "2x" })).toBeVisible();
    }
  });

  /** Test if the user can see an order confirmation modal when they click 'Confirm Order' */
  test("can see an order confirmation modal when they click 'Confirm Order'", async ({
    page,
  }) => {
    for (const index of [1, 2, 3]) {
      await page
        .getByRole("button", { name: `Add ${products[index].name} to Cart` })
        .click();
    }
    const confirmOrderButton = page
      .locator("aside")
      .getByRole("button", { name: "Confirm Order" });
    await expect(confirmOrderButton).toBeVisible();

    await confirmOrderButton.click();
    await page.waitForTimeout(1500);
    await expect(
      page.getByRole("heading", { name: "Order Confirmed" }),
    ).toBeVisible();
    const orderItems = page
      .locator('[id="headlessui-portal-root"]')
      .locator("ul");
    for (const index of [1, 2, 3]) {
      await expect(
        orderItems.getByRole("heading", { name: products[index].name }),
      ).toBeVisible();
      await expect(
        orderItems
          .locator("li")
          .nth(index - 1)
          .getByText("1x"),
      ).toBeVisible();
      await expect(
        orderItems.getByText(`@ $${products[index].price.toFixed(2)}`),
      ).toBeVisible();
      await expect(
        orderItems.getByText(`$${products[index].price.toFixed(2)}`, {
          exact: true,
        }),
      ).toBeVisible();
    }
    await expect(
      page
        .locator('[id="headlessui-portal-root"]')
        .getByText(
          `Order Total$${[1, 2, 3]
            .reduce((acc, curr) => acc + products[curr].price, 0)
            .toFixed(2)}`,
        ),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Start New Order" }),
    ).toBeVisible();
  });

  /** Test if the user can reset their selections when they click 'Start New Order' */
  test("can reset their selections when they click 'Start New Order'", async ({
    page,
  }) => {
    for (const index of [1, 2, 3]) {
      await page
        .getByRole("button", { name: `Add ${products[index].name} to Cart` })
        .click();
    }
    const confirmOrderButton = page
      .locator("aside")
      .getByRole("button", { name: "Confirm Order" });
    await expect(confirmOrderButton).toBeVisible();

    await confirmOrderButton.click();

    await page.waitForTimeout(1500);
    await expect(
      page.getByRole("heading", { name: "Order Confirmed" }),
    ).toBeVisible();

    const startNewOrderButton = page.getByRole("button", {
      name: "Start New Order",
    });
    await expect(startNewOrderButton).toBeVisible();

    await startNewOrderButton.click();
    await expect(
      page.getByRole("heading", { name: "Your Cart (0)" }),
    ).toBeVisible();
    await expect(page.getByText("Your added items will appear")).toBeVisible();
    expect(
      await page.locator("button", { hasText: "Add to Cart" }).all(),
    ).toHaveLength(products.length);
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();
    // console.log({ violations: accessibilityScanResults.violations });
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
