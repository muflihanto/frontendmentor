import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Stats preview card component Page", () => {
  /** Go to Stats preview card component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/stats-preview-card-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Stats preview card component",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Get insights that help your business grow.",
      }),
    ).toBeVisible();
  });
});
