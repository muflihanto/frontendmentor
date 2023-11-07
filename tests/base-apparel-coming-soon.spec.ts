import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Base Apparel coming soon Page", () => {
  /** Go to Base Apparel coming soon page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/base-apparel-coming-soon");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Base Apparel coming soon page",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "We're coming soon",
      }),
    ).toBeVisible();
  });
});
