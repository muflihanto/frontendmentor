import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

import data from "../public/expenses-chart-component/data.json";

test.describe("FrontendMentor Challenge - Expenses chart component Page", () => {
  /** Go to Expenses chart component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/expenses-chart-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Expenses chart component",
    );
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.locator("header");
    await expect(
      header.getByRole("heading", {
        level: 2,
        name: "My balance",
      }),
    ).toBeVisible();
    await expect(header.getByText("$921.48")).toBeVisible();
    await expect(header.getByRole("img")).toBeVisible();
  });

  /** Test if the page has a 'Spending' section */
  test("has a 'Spending' section", async ({ page }) => {
    const section = page.locator("section");
    await expect(
      section.getByRole("heading", { name: "Spending - Last 7 days" }),
    ).toBeVisible();
    // chart is visible
    await expect(
      section.getByText(
        "$17.45mon$34.91tue$52.36wed$31.07thu$23.39fri$43.28sat$25.48sun",
      ),
    ).toBeVisible();
    await expect(section.getByText("Total this month$478.33")).toBeVisible();
    await expect(section.getByText("+2.4%from last month")).toBeVisible();
  });

  /** Test if the tooltip works properly */
  test("tooltip works properly", async ({ page }) => {
    const heading = page.getByRole("heading", {
      name: "Spending - Last 7 days",
    });
    for (const d of data) {
      const id = `tooltip-${d.day}`;
      const trigger = page.locator(`[aria-describedby=${id}]`);
      const tooltip = page.locator(`id=${id}`);
      await expect(tooltip).not.toBeVisible();
      await trigger.hover();
      await expect(tooltip).toBeVisible();
      await heading.hover();
      await expect(tooltip).not.toBeVisible();
      await trigger.focus();
      await expect(tooltip).toBeVisible();
      await trigger.blur();
      await expect(tooltip).not.toBeVisible();
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
