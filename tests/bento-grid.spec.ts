import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Bento grid page", () => {
  /** Go to Bento grid page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/bento-grid");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Bento grid");
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
