import AxeBuilder from "@axe-core/playwright";
import { expect, type Locator, test } from "@playwright/test";

test.describe("FrontendMentor Challenge - Weather App page", () => {
  let searchInput: Locator;
  let searchButton: Locator;
  let unitsButton: Locator;
  let switchToImperial: Locator;
  let switchToMetric: Locator;

  /** Go to Weather App page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/weather-app");
    searchInput = page.getByPlaceholder("Search for a place...");
    searchButton = page.getByRole("button", { name: "Search" });
    unitsButton = page.getByLabel("Switch to Imperial/Metric");
    switchToImperial = page.getByRole("menuitem", {
      name: "Switch to Imperial",
      exact: true,
    });
    switchToMetric = page.getByRole("menuitem", {
      name: "Switch to Metric",
      exact: true,
    });
  });

  /** Fill the search input, click Search, and optionally wait for text to appear */
  async function searchFor(query: string, waitForText?: string) {
    await searchInput.fill(query);
    await searchButton.click();
    if (waitForText) {
      await expect(
        searchInput.page().getByText(waitForText).first(),
      ).toBeVisible();
    }
  }

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
    await expect(page.getByText("Wind", { exact: true })).toBeVisible();
    await expect(
      page.getByText("Precipitation", { exact: true }),
    ).toBeVisible();
  });

  test("shows skeleton loading state initially", async ({ page }) => {
    // Reload page to see loading state
    await page.reload();

    // Check for loading indicators
    await expect(page.getByText("Loading...")).toBeVisible();
    await expect(page.locator(".animate-bounce")).toHaveCount(3);
  });

  test("can search for a location and display results", async ({ page }) => {
    await searchFor("London", "London");

    // Click on first result
    await page.getByText("London").first().click();

    // Verify location changed
    await expect(page.getByText("London, United Kingdom")).toBeVisible();
  });

  test("supports keyboard navigation in search results", async ({ page }) => {
    await searchFor("London", "London");

    // Focus input to receive keydown events
    await searchInput.focus();

    // Press ArrowDown to highlight the first item
    await searchInput.press("ArrowDown");

    const firstOption = page.locator('[role="option"]').first();
    await expect(firstOption).toHaveAttribute("aria-selected", "true");

    // Press ArrowDown again to highlight the second item
    const optionsCount = await page.locator('[role="option"]').count();
    if (optionsCount > 1) {
      await searchInput.press("ArrowDown");
      const secondOption = page.locator('[role="option"]').nth(1);
      await expect(secondOption).toHaveAttribute("aria-selected", "true");
      await expect(firstOption).toHaveAttribute("aria-selected", "false");

      // Go back to the first item using ArrowUp
      await searchInput.press("ArrowUp");
      await expect(firstOption).toHaveAttribute("aria-selected", "true");
    }

    // Press Escape to clear the focused index
    await searchInput.press("Escape");
    await expect(firstOption).toHaveAttribute("aria-selected", "false");

    // Press ArrowDown to highlight the first item again
    await searchInput.press("ArrowDown");
    await expect(firstOption).toHaveAttribute("aria-selected", "true");

    // Press Enter to select the currently highlighted item (first option)
    await searchInput.press("Enter");

    // Verify location changed
    await expect(
      page.getByText("London, United Kingdom").first(),
    ).toBeVisible();
  });

  test("shows loading state while searching", async ({ page }) => {
    await searchFor("Paris");

    // Check if loading indicator appears
    await expect(page.getByText("Search in progress")).toBeVisible();
  });

  test("displays no results message for invalid search", async ({ page }) => {
    await searchInput.fill("xyzabc123");
    await searchButton.click();

    // Wait for no results message
    await expect(page.getByText("No search result found!")).toBeVisible();
  });

  test("displays API error state and can retry", async ({ page }) => {
    // Intercept the weather API call and abort it to simulate an error
    await page.route("**/v1/forecast**", (route) => route.abort());

    // Reload the page to trigger the error state
    await page.reload();

    // Verify error state is visible (wait up to 15 seconds)
    await expect(page.getByText("Something went wrong")).toBeVisible({
      timeout: 15000,
    });
    await expect(
      page.getByText(/We couldn.*t connect to the server/),
    ).toBeVisible();

    // Now unroute to simulate successful retry
    await page.unroute("**/v1/forecast**");

    // Click retry
    await page.getByRole("button", { name: "Retry connection" }).click();

    // Verify it loads the dashboard again (wait up to 5 seconds for weather data to load)
    await expect(page.getByText("Berlin, Germany")).toBeVisible({
      timeout: 5000,
    });

    // Verify error state is not visible
    await expect(page.getByText("Something went wrong")).not.toBeVisible();
    await expect(
      page.getByText(/We couldn.*t connect to the server/),
    ).not.toBeVisible();
  });

  test("search input has proper accessibility attributes", async () => {
    await expect(searchInput).toHaveAttribute("type", "text");
    await expect(searchButton).toBeEnabled();
  });

  test("units dropdown opens and closes", async () => {
    // Dropdown should be closed initially
    await expect(switchToImperial).not.toBeVisible();

    // Open dropdown
    await unitsButton.click();
    await expect(switchToImperial).toBeVisible();

    // Close dropdown by clicking again
    await unitsButton.click();
    await expect(switchToImperial).not.toBeVisible();
  });

  test("can switch between metric and imperial units", async ({ page }) => {
    // Open units dropdown
    await unitsButton.click();

    // Switch to Imperial
    await switchToImperial.click();

    // Verify wind speed unit changed to mph
    await expect(page.getByText(/mph/)).toBeVisible();

    // Open units dropdown again
    await unitsButton.click();

    // Switch back to Metric
    await switchToMetric.click();

    // Verify wind speed unit changed back to km/h
    await expect(page.getByText(/km\/h/)).toBeVisible();
  });

  test("can individually change unit preferences", async ({ page }) => {
    /** Click a menuitemradio and verify it becomes checked */
    async function selectAndVerifyUnit(name: string) {
      const radio = page.getByRole("menuitemradio", { name });
      await radio.click();
      await expect(radio).toHaveAttribute("aria-checked", "true");
    }

    // Open units dropdown
    await unitsButton.click();

    // Change Temperature to Fahrenheit
    await selectAndVerifyUnit("Fahrenheit (°F)");

    // Change Wind Speed to mph
    await selectAndVerifyUnit("mph");
    await expect(page.getByText(/mph/)).toBeVisible();

    // Change Precipitation to inch
    await selectAndVerifyUnit("Inches (inch)");
    await expect(page.getByText(/\d+\sin/)).toBeVisible();
  });

  test("daily forecast cards are displayed", async ({ page }) => {
    // Wait for the daily forecast section to be visible
    const forecastSection = page.locator(
      'section:has(h2:has-text("Daily forecast"))',
    );
    await expect(forecastSection).toBeVisible();

    // Verify exactly 7 daily forecast cards are rendered
    const dailyCards = forecastSection.getByRole("listitem");
    await expect(dailyCards).toHaveCount(7);
  });

  test("can switch between hourly forecast days", async ({ page }) => {
    // Wait for hourly forecast section to load
    await page.waitForSelector("text='12 AM'", { state: "visible" });

    const dayOptionsToggle = page.getByRole("button", {
      name: "Select day for hourly forecast",
    });

    // Open day dropdown
    await dayOptionsToggle.click();

    // Select a different day
    const listbox = page.getByRole("listbox", { name: "Select a day" });
    const dayOptions = await listbox.getByRole("option").all();
    if (dayOptions.length > 0) {
      await dayOptions[3].click();

      // Verify dropdown closed
      await expect(listbox).not.toBeVisible();
    }
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();
    // console.log({ violations: accessibilityScanResults.violations });
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
