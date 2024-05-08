import { test, expect } from "@playwright/test";
import data from "../public/rest-countries-api-with-color-theme-switcher/all.json";

const RegionName = ["Africa", "Americas", "Asia", "Europe", "Oceania"] as const;
type RegionName = (typeof RegionName)[number];

test.describe("FrontendMentor Challenge - Rest Countries Api With Color Theme Switcher Page", () => {
  /** Go to Rest Countries Api With Color Theme Switcher page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/rest-countries-api-with-color-theme-switcher");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Rest Countries Api With Color Theme Switcher",
    );
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(
      header.getByRole("heading", {
        level: 1,
        name: "Where in the world?",
      }),
    ).toBeVisible();
    await expect(
      header.getByRole("button", { name: "Moon Icon Dark Mode" }),
    ).toBeVisible();
  });

  /** Test if the page has countries filters */
  test.describe("has countries filters", () => {
    test("elements visible", async ({ page }) => {
      const container = page.locator("div").nth(3);
      await expect(
        container.getByPlaceholder("Search for a country..."),
      ).toBeVisible();
      await expect(
        container.getByRole("button", { name: "Filter by Region" }),
      ).toBeVisible();
    });
    test("region filter works", async ({ page }) => {
      const container = page.locator("div").nth(3);
      let currentRegion = "Filter by Region";
      const initialRegionFilterButton = page.getByRole("button", {
        name: currentRegion,
      });
      const initialRegionSelectors = container.getByLabel(currentRegion);
      const linksContainer = page.locator("div").nth(5);
      await expect(initialRegionFilterButton).toBeVisible();
      await initialRegionFilterButton.click();
      await expect(initialRegionSelectors).toBeVisible();
      expect(
        await initialRegionSelectors.getByRole("option").all(),
      ).toHaveLength(5);
      await initialRegionFilterButton.click();
      await expect(initialRegionSelectors).not.toBeVisible();
      for (const region of RegionName) {
        const currentRegionFilterButton = page.getByRole("button", {
          name: currentRegion,
        });
        await currentRegionFilterButton.click();
        const currentRegionSelectors = container.getByLabel(currentRegion);
        const selector = currentRegionSelectors.getByRole("option", {
          name: region,
        });
        await selector.click();
        const countries = await linksContainer.getByRole("link").all();
        expect(countries).toHaveLength(
          data.filter((ctr) => ctr.region === region).length,
        );
        currentRegion = region;
      }
    });
  });

  /** Test if the page has countries links */
  test.describe("has countries links", () => {
    test("elements visible", async ({ page }) => {
      const container = page.locator("div").nth(5);
      const countries = await container.getByRole("link").all();
      expect(countries).toHaveLength(data.length);
    });
  });

  /** Test if the theme switcher works */
  test("theme switcher works", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await header.getByRole("button", { name: "Moon Icon Dark Mode" }).click();
    await expect(header).toHaveCSS("background-color", "rgb(43, 57, 69)");
    // TODO: add more theme related assertions
  });
});
