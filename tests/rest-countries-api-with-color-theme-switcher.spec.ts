import { test, expect, type Page } from "@playwright/test";
import data from "../public/rest-countries-api-with-color-theme-switcher/all.json";
import AxeBuilder from "@axe-core/playwright";

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
      header.getByRole("switch", { name: "Dark Mode" }),
    ).toBeVisible();
  });

  /** Test if the page has countries filters */
  test.describe("has countries filters", () => {
    test("elements visible", async ({ page }) => {
      const container = page.locator("div").nth(2);
      await expect(
        container.getByPlaceholder("Search for a country..."),
      ).toBeVisible();
      await expect(
        container.getByRole("button", { name: "Filter by Region" }),
      ).toBeVisible();
    });
    test("region filter works", async ({ page }) => {
      const container = page.locator("div").nth(2);
      let currentRegion = "Filter by Region";
      const initialRegionFilterButton = page.getByRole("button", {
        name: currentRegion,
      });
      const initialRegionSelectors = container.getByLabel(currentRegion, {
        exact: true,
      });
      const linksContainer = page.getByRole("list");
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
      const linksContainer = page.getByRole("list");
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
      const container = page.getByRole("list");
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
      const container = page.getByRole("list");
      const countries = await container.getByRole("link").all();
      expect(countries).toHaveLength(data.length);
    });

    test("can navigate to other countries using 'Border Countries' links", async () => {
      const indonesia = page.getByRole("link", {
        name: "The flag of Indonesia is composed of two equal horizontal bands of red and white. Indonesia Population: 273,523,621 Region: Asia Capital: Jakarta",
      });
      await indonesia.click();
      await page.waitForURL("**/indonesia");
      await page.waitForTimeout(2000);
      const malaysia = page.getByRole("link", { name: "Malaysia" });
      await expect(malaysia).toBeVisible();
      await malaysia.click();
      await page.waitForURL("**/malaysia");
      await page.waitForTimeout(2000);
      await expect(
        page.getByRole("heading", { name: "Malaysia" }),
      ).toBeVisible();
    });
  });

  test("interactive elements focus states behavior", async ({ page }) => {
    const themeSwitcher = page.getByRole("switch", {
      name: "Dark Mode",
    });
    await expect(themeSwitcher).toHaveCSS("outline-style", "none");
    await themeSwitcher.focus();
    await expect(themeSwitcher).not.toHaveCSS("outline-style", "none");

    const input = page.getByPlaceholder("Search for a country...");
    await expect(input).toHaveCSS("outline-style", "none");
    await input.focus();
    await expect(input).not.toHaveCSS("outline-style", "none");

    const filterByRegion = page.getByRole("button", {
      name: "Filter by Region",
    });
    await expect(filterByRegion).toHaveCSS("outline-style", "none");
    await filterByRegion.focus();
    await expect(filterByRegion).not.toHaveCSS("outline-style", "none");

    const countries = await page.getByRole("list").getByRole("link").all();
    for (const country of countries.slice(0, 8)) {
      await expect(country).toHaveCSS("outline-style", "none");
      await country.focus();
      await expect(country).not.toHaveCSS("outline-style", "none");
    }
  });

  /** Test if the theme switcher works */
  test("theme switcher works", async ({ page }) => {
    const header = page.getByRole("banner");
    const themeSwitcher = header.getByRole("switch", {
      name: "Dark Mode",
    });
    await expect(header).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(themeSwitcher).toHaveAttribute("aria-checked", "false");
    await themeSwitcher.click();
    await expect(header).toHaveCSS("background-color", "rgb(43, 57, 69)");
    await expect(themeSwitcher).toHaveAttribute("aria-checked", "true");
    await themeSwitcher.click();
    await expect(themeSwitcher).toHaveAttribute("aria-checked", "false");
    await page
      .getByRole("link", {
        name: "The flag of Indonesia is composed of two equal horizontal bands of red and white. Indonesia Population: 273,523,621 Region: Asia Capital: Jakarta",
      })
      .click();
    await page.waitForURL("**/indonesia");
    await page.waitForTimeout(2000);
    await expect(
      page.getByRole("heading", { name: "Indonesia" }),
    ).toBeVisible();
    const main = page.getByText(
      "BackIndonesiaNative Name: IndonesiaPopulation: 273,523,621Region: AsiaSub Region",
    );
    const back = page.getByRole("button", { name: "Back" });
    await expect(main).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(back).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(back).toHaveCSS("color", "rgb(17, 21, 23)");
    await themeSwitcher.click();
    await expect(themeSwitcher).toHaveAttribute("aria-checked", "true");
    await expect(main).toHaveCSS("background-color", "rgb(32, 44, 55)");
    await expect(back).toHaveCSS("background-color", "rgb(43, 57, 69)");
    await expect(back).toHaveCSS("color", "rgb(255, 255, 255)");
    // TODO: add more theme related assertions
  });

  /** Test if the theme preference persists after page reload */
  test("theme preference persists on reload", async ({ page }) => {
    const header = page.getByRole("banner");
    const themeSwitcher = header.getByRole("switch", {
      name: "Dark Mode",
    });

    // Initial state should be light
    await expect(header).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(themeSwitcher).toHaveAttribute("aria-checked", "false");

    // Switch to dark mode
    await themeSwitcher.click();
    await expect(header).toHaveCSS("background-color", "rgb(43, 57, 69)");
    await expect(themeSwitcher).toHaveAttribute("aria-checked", "true");

    // Reload the page
    await page.reload();

    // Verify theme is still dark after reload
    await expect(header).toHaveCSS("background-color", "rgb(43, 57, 69)");
    await expect(themeSwitcher).toHaveAttribute("aria-checked", "true");

    // Switch back to light mode
    await themeSwitcher.click();
    await expect(header).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(themeSwitcher).toHaveAttribute("aria-checked", "false");

    // Reload again
    await page.reload();

    // Verify theme is still light after reload
    await expect(header).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(themeSwitcher).toHaveAttribute("aria-checked", "false");
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    let accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();
    // console.log({ violations: accessibilityScanResults.violations });
    expect(accessibilityScanResults.violations).toEqual([]);
    // test for "Country details page"
    await page.goto(`${pageUrl}/indonesia`);
    accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
