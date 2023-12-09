import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Advice generator app Page", () => {
  /** Go to Advice generator app page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/advice-generator-app");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Advice generator app");
  });

  /** Test if the page has a correct dice button */
  test("has a dice button", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Icon Dice" })).toBeVisible();
  });
});
