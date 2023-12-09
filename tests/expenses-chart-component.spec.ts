import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Expenses chart component Page", () => {
  /** Go to Expenses chart component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/expenses-chart-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Expenses chart component",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "My balance",
      }),
    ).toBeVisible();
  });
});
