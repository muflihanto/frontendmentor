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
