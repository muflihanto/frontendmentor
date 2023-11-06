import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Article preview component Page", () => {
  /** Go to Article preview component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/article-preview-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Article preview component",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Shift the overall look and feel by adding these wonderful touches to furniture in your home",
      }),
    ).toBeVisible();
  });
});
