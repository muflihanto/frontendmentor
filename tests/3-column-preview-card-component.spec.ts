import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - 3-column preview card component Page", () => {
  /** Go to 3-column preview card component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/3-column-preview-card-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | 3-column preview card component",
    );
  });

  /** Test if the page has correct headings */
  test("has headings", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 2,
      }),
    ).toHaveCount(3);
  });
});
