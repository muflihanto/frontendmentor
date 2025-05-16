import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("FrontendMentor Challenge - IP Address Tracker Page", () => {
  /** Go to IP Address Tracker page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/ip-address-tracker");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | IP Address Tracker");
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "IP Address Tracker",
      }),
    ).toBeVisible();
  });

  /** Test if the page has an input group */
  test("has an input group", async ({ page }) => {
    const form = page.locator("form");
    await expect(
      form.getByPlaceholder("Search for any IP address or domain"),
    ).toBeVisible();
    await expect(form.getByRole("button")).toBeVisible();
  });

  /** Test if the page has an ip info card */
  test("has an ip info card", async ({ page }) => {
    const card = page.locator("div").nth(4);
    await expect(card.getByText("IP Address::ffff:127.0.0.1")).toBeVisible();
    await expect(card.getByText("Location-")).toBeVisible();
    await expect(card.getByText("Timezone-")).toBeVisible();
    await expect(card.getByText("ISP-")).toBeVisible();
  });

  /** Test if the page has a leaflet map */
  test("has a leaflet map", async ({ page }) => {
    await page.waitForTimeout(2000);
    const map = page
      .locator("div")
      .filter({ hasText: "Leaflet | © OpenStreetMap contributors" })
      .nth(2);
    await expect(map).toBeVisible();
    // Attribution
    await expect(
      map.getByText("Leaflet | © OpenStreetMap contributors"),
    ).toBeVisible();
  });

  /** Test if the map displays the correct initial position */
  test("map displays correct initial position", async ({ page }) => {
    await page.waitForTimeout(2000);
    const map = page.locator(".leaflet-map-pane");
    const style = await map.getAttribute("style");
    expect(style).toContain("translate3d");
  });

  /** Test if the marker icon is displayed on the map */
  test("displays marker icon on map", async ({ page }) => {
    await page.waitForTimeout(2000);
    const marker = page.locator(".leaflet-marker-icon");
    await expect(marker).toBeVisible();
    await expect(marker).toHaveAttribute(
      "src",
      "/ip-address-tracker/images/icon-location.svg",
    );
  });

  /** Test if the form works */
  test("form works", async ({ page }) => {
    await page.waitForTimeout(2000);
    const form = page.locator("form");
    const input = form.getByPlaceholder("Search for any IP address or domain");
    const map = page
      .locator("div")
      .filter({ hasText: "Leaflet | © OpenStreetMap contributors" })
      .nth(2);
    const initialMapPosition = await map
      .locator(".leaflet-proxy")
      .getAttribute("style");
    expect(initialMapPosition).toContain(
      "translate3d(545886px, 382367px, 0px)",
    );
    await expect(map).toBeVisible();
    await input.fill("8.8.8.8");
    await form.getByRole("button").click();
    await page.waitForTimeout(1000);
    expect(
      await map.locator(".leaflet-map-pane").getAttribute("style"),
    ).not.toContain("translate3d(545886px, 382367px, 0px)");
    const card = page.locator("div").nth(4);
    await expect(card.getByText("IP Address8.8.8.8")).toBeVisible();
    await expect(card.getByText("ISPGoogle LLC")).toBeVisible();
  });

  /** Test if the page handles API errors gracefully */
  test("handles API errors gracefully", async ({ page }) => {
    // Mock the API response
    await page.route("/api/getIpInfo*", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Server error" }),
      });
    });

    const initialAddress = page.getByText("IP Address::ffff:127.0.0.1");
    await expect(initialAddress).toBeVisible();

    const form = page.locator("form");
    const input = form.getByPlaceholder("Search for any IP address or domain");
    await input.fill("8.8.8.8");
    await form.getByRole("button").click();
    await page.waitForTimeout(1000);

    // Check if the UI shows appropriate error state
    await expect(initialAddress).not.toBeVisible();
    await expect(page.getByText("IP Address-")).toBeVisible();
  });

  /** Test form validation with invalid IP address */
  test("form validation rejects invalid IP address", async ({ page }) => {
    const initialAddress = page.getByText("IP Address::ffff:127.0.0.1");
    await expect(initialAddress).toBeVisible();

    const form = page.locator("form");
    const input = form.getByPlaceholder("Search for any IP address or domain");
    await input.fill("invalid.ip.address");
    await form.getByRole("button").click();
    await page.waitForTimeout(500);

    await expect(input).toHaveValue("invalid.ip.address");

    // TODO: the input should show visual feedback for invalid input
    await expect(initialAddress).toBeVisible();
  });

  /** Test responsive layout for mobile */
  test("has correct mobile layout", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator("h1")).toHaveCSS("font-size", "26px");
    await expect(page.locator("form")).toHaveCSS("width", "327px");
  });

  /** Test responsive layout for desktop */
  test("has correct desktop layout", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 800 });
    await expect(page.locator("h1")).toHaveCSS("font-size", "32px");
    await expect(page.locator("form")).toHaveCSS("width", "555px");
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
