import { expect, test } from "@playwright/test";

test.describe("FrontendMentor Challenge - Typing speed test page", () => {
  /** Go to Typing speed test page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/typing-speed-test");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Typing speed test");
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
