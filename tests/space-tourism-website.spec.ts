import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Space Tourism Website Page", () => {
  /** Go to Space Tourism Website page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/space-tourism-website");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Space Tourism Website | Home");
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Space" })).toBeVisible();
  });
});
