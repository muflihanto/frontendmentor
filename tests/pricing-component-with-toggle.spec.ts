import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Pricing component with toggle Page", () => {
  /** Go to Pricing component with toggle page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/pricing-component-with-toggle");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor - Pricing component with toggle",
    );
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: "Our Pricing" }),
    ).toBeVisible();
  });
});
