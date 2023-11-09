import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Newsletter sign-up form with success message Page", () => {
  /** Go to Newsletter sign-up form with success message page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/newsletter-sign-up-with-success-message");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Newsletter sign-up form with success message",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Stay updated!",
      }),
    ).toBeVisible();
  });
});
