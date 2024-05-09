import { test, expect, type Page } from "@playwright/test";
import data from "../public/rest-countries-api-with-color-theme-switcher/all.json";

const RegionName = ["Africa", "Americas", "Asia", "Europe", "Oceania"] as const;
type RegionName = (typeof RegionName)[number];
const pageUrl = "/rest-countries-api-with-color-theme-switcher";

test.describe("FrontendMentor Challenge - Rest Countries Api With Color Theme Switcher Page", () => {
  /** Go to Rest Countries Api With Color Theme Switcher page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto(pageUrl);
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
    test("keyword filter works", async ({ page }) => {
      const input = page.getByPlaceholder("Search for a country...");
      const linksContainer = page.locator("div").nth(5);
      await expect(input).toBeVisible();
      await expect(linksContainer).toBeVisible();
      const getCountries = async () =>
        await linksContainer.getByRole("link").all();
      expect(await getCountries()).toHaveLength(data.length);
      await input.fill("indonesia");
      await page.waitForTimeout(1000);
      expect(await getCountries()).toHaveLength(1);
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

  /** Test if country detail page works */
  test.describe("country detail page works", () => {
    test.describe.configure({ mode: "serial" });

    let page: Page;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(pageUrl);
    });

    test("elements visible", async () => {
      const indonesia = page.getByRole("link", {
        name: "The flag of Indonesia is composed of two equal horizontal bands of red and white. Indonesia Population: 273,523,621 Region: Asia Capital: Jakarta",
      });
      await indonesia.click();
      await page.waitForURL("**/indonesia");
      await page.waitForTimeout(2000);
      await expect(page.getByRole("button", { name: "Back" })).toBeVisible();
      await expect(
        page.getByRole("img", {
          name: "The flag of Indonesia is composed of two equal horizontal bands of red and white.",
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Indonesia" }),
      ).toBeVisible();
      await expect(page.getByText("Native Name: Indonesia")).toBeVisible();
      await expect(page.getByText("Population: 273,523,621")).toBeVisible();
      await expect(page.getByText("Region: Asia")).toBeVisible();
      await expect(
        page.getByText("Sub Region: South-Eastern Asia"),
      ).toBeVisible();
      await expect(page.getByText("Capital: Jakarta")).toBeVisible();

      await expect(page.getByText("Top Level Domain: .id")).toBeVisible();
      await expect(
        page.getByText("Currencies: Indonesian rupiah"),
      ).toBeVisible();
      await expect(page.getByText("Languages: Indonesian")).toBeVisible();

      await expect(
        page.getByRole("heading", { name: "Border Countries:" }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Papua New Guinea" }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Timor-Leste" }),
      ).toBeVisible();
      await expect(page.getByRole("link", { name: "Malaysia" })).toBeVisible();

      await expect(
        page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
      ).toBeVisible();
    });

    test("back button works", async () => {
      const back = page.getByRole("button", { name: "Back" });
      await expect(back).toBeVisible();
      await back.click();
      await page.waitForURL(`**${pageUrl}`);
      await page.waitForTimeout(2000);
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
