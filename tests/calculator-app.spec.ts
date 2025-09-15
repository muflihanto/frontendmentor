import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const keys = [
  { key: "7", type: "number" },
  { key: "8", type: "number" },
  { key: "9", type: "number" },
  { key: "del", type: "del" },
  { key: "4", type: "number" },
  { key: "5", type: "number" },
  { key: "6", type: "number" },
  { key: "+", type: "operator" },
  { key: "1", type: "number" },
  { key: "2", type: "number" },
  { key: "3", type: "number" },
  { key: "-", type: "operator" },
  { key: ".", type: "dot" },
  { key: "0", type: "number" },
  { key: "/", type: "operator" },
  { key: "*", type: "operator" },
  { key: "reset", type: "reset" },
  { key: "=", type: "equal" },
] as const;

test.describe("FrontendMentor Challenge - Calculator app Page", () => {
  /** Go to Calculator app page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/calculator-app");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Calculator app");
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(header.getByText("calc")).toBeVisible();
    const switcher = header.locator(">div");
    await expect(switcher.getByText("theme", { exact: true })).toBeVisible();
    await expect(switcher.getByText("123", { exact: true })).toBeVisible();
    await expect(switcher.getByRole("button")).toBeVisible();
    await expect(switcher.getByRole("button")).toHaveAccessibleName(
      "Switch to 3",
    );
    await expect(switcher.getByLabel("Switch to")).toBeVisible();
  });

  /** Test if the page has a calculator screen */
  test("has a calculator screen", async ({ page }) => {
    const screen = page.locator("div").nth(6);
    await expect(screen).toBeVisible();
    await expect(screen).toBeInViewport();
  });

  /** Test if the page has all calculator keys */
  test("has all calculator keys", async ({ page }) => {
    const calckeys = page.locator("div").nth(8);
    await expect(calckeys).toBeVisible();
    await expect(calckeys).toBeInViewport();
    expect(await calckeys.getByRole("button").all()).toHaveLength(18);
    for (const key of keys) {
      await expect(
        calckeys.getByRole("button", { name: key.key === "*" ? "x" : key.key }),
      ).toBeVisible();
    }
  });

  test.describe("Comma Formatting", () => {
    test.describe("Single numbers formatting", () => {
      test("should format 4-digit numbers with commas", async ({ page }) => {
        await page.getByRole("button", { name: "1" }).click();
        await page.getByRole("button", { name: "0" }).click();
        await page.getByRole("button", { name: "0" }).click();
        await page.getByRole("button", { name: "0" }).click();

        const screen = page.locator("div").nth(6);
        await expect(screen).toHaveText("1,000");
      });
    });
  });

  test.describe("Theme Switching", () => {
    test("should switch between themes when theme toggle is clicked", async ({
      page,
    }) => {
      // Get initial theme class
      const main = page.locator("main");
      const initialThemeClass = await main.getAttribute("class");

      // Click the theme toggle button
      const themeToggle = page.locator('button[aria-label^="Switch to"]');
      await themeToggle.click();

      // Verify theme has changed
      const newThemeClass = await main.getAttribute("class");
      expect(newThemeClass).not.toBe(initialThemeClass);

      // Click again to cycle through themes
      await themeToggle.click();
      const thirdThemeClass = await main.getAttribute("class");
      expect(thirdThemeClass).not.toBe(newThemeClass);
      expect(thirdThemeClass).not.toBe(initialThemeClass);

      // One more click should cycle back to first theme
      await themeToggle.click();
      const finalThemeClass = await main.getAttribute("class");
      expect(finalThemeClass).toBe(initialThemeClass);
    });

    test("should update the theme indicator position when switching themes", async ({
      page,
    }) => {
      const themeToggle = page.locator('button[aria-label^="Switch to"]');
      const themeIndicator = themeToggle.locator('div[class*="bg-calculator"]');

      // Get initial position
      const initialPosition = await themeIndicator.evaluate((el) => {
        return window.getComputedStyle(el).left;
      });

      // Click and verify new position
      await themeToggle.click();
      const secondPosition = await themeIndicator.evaluate((el) => {
        return window.getComputedStyle(el).left;
      });
      expect(secondPosition).not.toBe(initialPosition);

      // Click again and verify third position
      await themeToggle.click();
      const thirdPosition = await themeIndicator.evaluate((el) => {
        return window.getComputedStyle(el).left;
      });
      expect(thirdPosition).not.toBe(initialPosition);
      expect(thirdPosition).not.toBe(secondPosition);
    });
  });

  test.describe("Theme Preference Persistence", () => {
    test("should persist theme preference in localStorage", async ({
      page,
    }) => {
      // Initial localStorage should be empty
      const initialTheme = await page.evaluate(() => {
        return localStorage.getItem("calc-theme");
      });
      expect(initialTheme).toBeNull();

      // Click theme toggle to change theme (this should create the localStorage entry)
      const themeToggle = page.locator('button[aria-label^="Switch to"]');
      await themeToggle.click();

      // Verify localStorage was created and has a value
      const newTheme = await page.evaluate(() => {
        return localStorage.getItem("calc-theme");
      });
      expect(newTheme).toMatch(/^[1-3]$/); // Should be 1, 2, or 3

      // Reload page and verify theme persists
      await page.reload();
      const persistedTheme = await page.evaluate(() => {
        return localStorage.getItem("calc-theme");
      });
      expect(persistedTheme).toBe(newTheme);

      // Verify UI reflects persisted theme
      const main = page.locator("main");
      const persistedThemeClass = await main.getAttribute("class");
      expect(persistedThemeClass).toContain(`th${persistedTheme}`);
    });

    test("should maintain theme preference across sessions", async ({
      context,
      page,
    }) => {
      // Set the theme by clicking the toggle
      const themeToggle = page.locator('button[aria-label^="Switch to"]');
      await themeToggle.click();

      // Get the selected theme
      const selectedTheme = await page.evaluate(() => {
        return localStorage.getItem("calc-theme");
      });

      // Create a new page in the same context (simulating a new session with same storage)
      const newPage = await context.newPage();
      await newPage.goto("/calculator-app");

      // Verify the theme persists
      const persistedTheme = await newPage.evaluate(() => {
        return localStorage.getItem("calc-theme");
      });
      expect(persistedTheme).toBe(selectedTheme);

      // Verify UI reflects persisted theme
      const main = newPage.locator("main");
      const persistedThemeClass = await main.getAttribute("class");
      expect(persistedThemeClass).toContain(`th${persistedTheme}`);
    });

    test("should respect system preference on initial load", async ({
      browser,
    }) => {
      // Create context with dark mode preference
      const darkContext = await browser.newContext({
        colorScheme: "dark",
      });
      const darkPage = await darkContext.newPage();
      await darkPage.goto("/calculator-app");

      // Verify dark theme (theme 3) is applied initially (even before localStorage is set)
      const initialDarkTheme = await darkPage.evaluate(() => {
        return localStorage.getItem("calc-theme");
      });
      expect(initialDarkTheme).toBeNull();

      const mainDark = darkPage.locator("main");
      const darkThemeClass = await mainDark.getAttribute("class");
      expect(darkThemeClass).toContain("th3");

      // Create context with light mode preference
      const lightContext = await browser.newContext({
        colorScheme: "light",
      });
      const lightPage = await lightContext.newPage();
      await lightPage.goto("/calculator-app");

      // Verify light theme (theme 2) is applied initially
      const initialLightTheme = await lightPage.evaluate(() => {
        return localStorage.getItem("calc-theme");
      });
      expect(initialLightTheme).toBeNull();

      const mainLight = lightPage.locator("main");
      const lightThemeClass = await mainLight.getAttribute("class");
      expect(lightThemeClass).toContain("th2");

      await darkContext.close();
      await lightContext.close();
    });
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
