import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Ping coming soon Page", () => {
  /** Go to Ping coming soon page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/ping-coming-soon-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Ping coming soon page");
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "We are launching soon!",
      }),
    ).toBeVisible();
  });
});
