import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Interactive pricing component Page", () => {
  /** Go to Interactive pricing component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/interactive-pricing-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Interactive pricing component",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Simple, traffic-based pricing",
      }),
    ).toBeVisible();
  });
});
