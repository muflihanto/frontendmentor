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

  test("can search for a location and display results", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search for a place...");
    await searchInput.fill("London");
    await page.getByRole("button", { name: "Search" }).click();

    // Wait for search results dropdown
    await page.waitForSelector("text=London", { state: "visible" });

    // Click on first result
    await page.getByText("London").first().click();

    // Verify location changed
    await expect(page.getByText("London, United Kingdom")).toBeVisible();
  });

  test("shows loading state while searching", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search for a place...");
    await searchInput.fill("Paris");
    await page.getByRole("button", { name: "Search" }).click();

    // Check if loading indicator appears
    await expect(page.getByText("Search in progress")).toBeVisible();
  });

  test("displays no results message for invalid search", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search for a place...");
    await searchInput.fill("xyzabc123");
    await page.getByRole("button", { name: "Search" }).click();

    // Wait for no results message
    await expect(page.getByText("No search result found!")).toBeVisible();
  });

  test("search input has proper accessibility attributes", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search for a place...");
    await expect(searchInput).toHaveAttribute("type", "text");

    const searchButton = page.getByRole("button", { name: "Search" });
    await expect(searchButton).toBeEnabled();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
