import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Testimonials Grid Section Page", () => {
  /** Go to Testimonials Grid Section page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/testimonials-grid-section");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Testimonials Grid Section",
    );
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
