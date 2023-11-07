import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Four card feature section Page", () => {
  /** Go to Four card feature section page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/four-card-feature-section");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Four card feature section",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Reliable, efficient delivery Powered by Technology",
      }),
    ).toBeVisible();
  });
});
