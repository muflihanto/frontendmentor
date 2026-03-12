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

  test("displays weather information for default location", async ({
    page,
  }) => {
    // Wait for weather data to load
    await page.waitForSelector("text=How’s the sky looking today?", {
      state: "visible",
    });

    // Check if location name is displayed (Berlin, Germany)
    await expect(page.getByText("Berlin, Germany")).toBeVisible();

    // Check if weather stats are displayed
    await expect(page.getByText("Feels Like")).toBeVisible();
    await expect(page.getByText("Humidity")).toBeVisible();
    await expect(page.getByText("Wind")).toBeVisible();
    await expect(page.getByText("Precipitation")).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
