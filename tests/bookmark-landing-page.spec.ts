import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Bookmark landing Page", () => {
  /** Go to Bookmark landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/bookmark-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Bookmark landing page");
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "A Simple Bookmark Manager",
      }),
    ).toBeVisible();
  });
});
