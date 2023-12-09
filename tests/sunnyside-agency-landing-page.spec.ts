import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Sunnyside agency landing Page", () => {
  /** Go to Sunnyside agency landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/sunnyside-agency-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Sunnyside agency landing page",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "We are creatives",
      }),
    ).toBeVisible();
  });
});
