import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Product preview card component page", () => {
  /** Go to "Product preview card component" page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/product-preview-card-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      /Frontend Mentor \| Product preview card component/i,
    );
  });

  /** Test if the page has correct headings */
  test.describe("has correct heading", () => {
    /** Test if the page has correct h1 */
    test("has an h1", async ({ page }) => {
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "Gabrielle Essence Eau De Parfum",
        }),
      ).toBeVisible();
    });

    /** Test if the page has correct h3 */
    test("has an h3", async ({ page }) => {
      await expect(
        page.getByRole("heading", {
          level: 3,
          name: "perfume",
        }),
      ).toBeVisible();
    });
  });

  /** Test if the page has correct image product */
  test("has image product", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "Image Product" }),
    ).toBeVisible();
  });

  /** Test if the page has correct cta button */
  test("has cta button", async ({ page }) => {
    const cta = page.getByRole("button", { name: "Add to Cart" });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveCSS("background-color", "rgb(60, 128, 103)");
    await cta.hover();
    await expect(cta).toHaveCSS("background-color", "rgb(27, 65, 50)");
  });

  /** Test if the page has correct product description */
  test("has product description", async ({ page }) => {
    await expect(
      page.getByText(
        "A floral, solar and voluptuous interpretation composed by Olivier Polge, Perfume",
      ),
    ).toBeVisible();
  });

  /** Test if the page has correct pricing */
  test.describe("has pricing", () => {
    test("has current price", async ({ page }) => {
      await expect(page.getByText("$149.99")).toBeVisible();
    });
    test("has real price", async ({ page }) => {
      await expect(page.getByText("$169.99")).toBeVisible();
    });
  });

  /** Test if the page has correct footer */
  test("has footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
