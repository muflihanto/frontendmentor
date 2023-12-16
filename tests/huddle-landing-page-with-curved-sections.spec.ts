import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Huddle landing page with curved sections Page", () => {
  /** Go to Huddle landing page with curved sections page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/huddle-landing-page-with-curved-sections");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Huddle landing page with curved sections",
    );
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Build The Community Your Fans Will Love",
      }),
    ).toBeVisible();
  });
});
