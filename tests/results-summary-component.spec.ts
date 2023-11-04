import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Results summary component Page", () => {
  /** Go to results summary component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/results-summary-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Results summary component",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Your Result",
      }),
    ).toBeVisible();
  });
});
