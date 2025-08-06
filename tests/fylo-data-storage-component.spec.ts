import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("FrontendMentor Challenge - Fylo data storage component Page", () => {
  /** Go to Fylo data storage component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/fylo-data-storage-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Fylo data storage component",
    );
  });

  /** Test if the page has a header */
  test.describe("has a header", () => {
    test("header is visible", async ({ page }) => {
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("header")).toBeInViewport();
    });
    test("has all elements", async ({ page }) => {
      const header = page.locator("header");
      await expect(
        header.getByRole("img", { name: "Fylo Company Logo" }),
      ).toBeVisible();
      const links = await header.getByRole("list").getByRole("link").all();
      expect(links).toHaveLength(3);
      for (const link of links) {
        await expect(link.getByRole("img")).toBeVisible();
      }
    });
  });

  /** Test if the page has a status section */
  test.describe("has a status section", () => {
    test("section is visible", async ({ page }) => {
      await expect(page.locator("main > div")).toBeVisible();
      await expect(page.getByText("185 GB Left")).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const section = page.locator("main > div");
      await expect(
        section.getByText("You‘ve used 815 GB of your storage"),
      ).toBeVisible();
      // sr-only heading
      const heading = section.getByRole("heading", {
        name: "Data Storage Status",
      });
      await expect(heading).toBeHidden();
      // other elements
      await expect(section.getByText("0 GB", { exact: true })).toBeVisible();
      await expect(section.getByText("1000 GB")).toBeVisible();
    });
    test("shows correct percentage filled", async ({ page }) => {
      const storageBar = page.locator("main > div > div").first();
      const fillWidth = await storageBar.evaluate((el) => {
        const containerWidth = el.clientWidth;
        const fillWidth = el.firstElementChild?.clientWidth ?? 0;
        return (fillWidth / containerWidth) * 100;
      });
      // padding/margin might affect the calculation
      // -0.5 to make < 1.58 tolerance
      expect(fillWidth).toBeCloseTo(81.5, -0.5);
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
