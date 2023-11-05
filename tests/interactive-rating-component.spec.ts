import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Interactive rating component Page", () => {
  /** Go to Interactive rating component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/interactive-rating-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Interactive rating component",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "How did we do?",
      }),
    ).toBeVisible();
  });
});
