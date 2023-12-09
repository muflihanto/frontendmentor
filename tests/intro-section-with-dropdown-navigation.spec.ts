import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Intro section with dropdown navigation Page", () => {
  /** Go to Intro section with dropdown navigation page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/intro-section-with-dropdown-navigation");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Intro section with dropdown navigation",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Make remote work",
      }),
    ).toBeVisible();
  });
});
