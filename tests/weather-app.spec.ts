import { expect, test } from "@playwright/test";

test.describe("FrontendMentor Challenge - Weather App page", () => {
  /** Go to Weather App page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/weather-app");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Weather App");
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
