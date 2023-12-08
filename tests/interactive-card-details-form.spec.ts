import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Interactive card details form Page", () => {
  /** Go to Interactive card details form page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/interactive-card-details-form");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Interactive card details form",
    );
  });

  /** Test if the page has a correct footer */
  test("has a footer", async ({ page }) => {
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toHaveText(
      "Challenge by Frontend Mentor. Coded by Muflihanto.",
    );
  });
});
