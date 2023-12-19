import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Easybank landing Page", () => {
  /** Go to Easybank landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/easybank-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Easybank landing page");
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Next generation digital banking",
      }),
    ).toBeVisible();
  });
});
