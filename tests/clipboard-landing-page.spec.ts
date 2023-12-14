import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Clipboard landing Page", () => {
  /** Go to Clipboard landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/clipboard-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Clipboard landing page");
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "A history of everything you copy",
      }),
    ).toBeVisible();
  });
});
