import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Launch countdown timer Page", () => {
  /** Go to Launch countdown timer page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/launch-countdown-timer");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Launch countdown timer");
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "We‘re launching soon" }),
    ).toBeVisible();
  });
});
