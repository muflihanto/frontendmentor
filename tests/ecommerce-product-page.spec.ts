import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - E-commerce product Page", () => {
  /** Go to E-commerce product page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/ecommerce-product-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | E-commerce product page");
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Fall Limited Edition Sneakers",
      }),
    ).toBeVisible();
  });
});
