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
    await expect(
      page.getByRole("button", { name: "Add to Cart" }),
    ).toBeVisible();
  });
});
