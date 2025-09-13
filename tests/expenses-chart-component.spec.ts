import AxeBuilder from "@axe-core/playwright";
import type { Locator } from "@playwright/test";
import { expect, test } from "@playwright/test";

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
    const expectInitialColor = async (element: Locator, day: string) => {
      if (day === "wed") {
        await expect(element).toHaveCSS(
          "background-color",
          "rgb(118, 181, 188)",
        );
      } else {
        await expect(element).toHaveCSS(
          "background-color",
          "rgb(236, 119, 95)",
        );
      }
    };
    const expectNewColor = async (element: Locator, day: string) => {
      if (day === "wed") {
        await expect(element).toHaveCSS(
          "background-color",
          "rgb(180, 223, 229)",
        );
      } else {
        await expect(element).toHaveCSS(
          "background-color",
          "rgb(255, 155, 135)",
        );
      }
    };
    for (const d of data) {
      const id = `tooltip-${d.day}`;
      const trigger = page.locator(`[aria-describedby=${id}]`);
      const tooltip = page.locator(`id=${id}`);
      await expect(tooltip).not.toBeVisible();
      await expectInitialColor(trigger, d.day);
      await trigger.hover();
      await expect(tooltip).toBeVisible();
      await expectNewColor(trigger, d.day);
      await heading.hover();
      await expect(tooltip).not.toBeVisible();
      await expectInitialColor(trigger, d.day);
      await trigger.focus();
      await expect(tooltip).toBeVisible();
      await expectNewColor(trigger, d.day);
      await trigger.blur();
      await expect(tooltip).not.toBeVisible();
      await expectInitialColor(trigger, d.day);
    }
  });

  /** Test if the keyboard navigation works properly */
  test("keyboard navigation works properly", async ({ page }) => {
    // Get all chart bars
    const chartBars = page.locator('[role="toolbar"] button');
    const firstBar = chartBars.first();
    const lastBar = chartBars.last();

    // Initially, no bar should be focused and no tooltips visible
    for (let i = 0; i < data.length; i++) {
      await expect(chartBars.nth(i)).not.toBeFocused();
      const tooltip = page.locator(`id=tooltip-${data[i].day}`);
      await expect(tooltip).not.toBeVisible();
    }

    // Focus the first bar manually - tooltip should appear automatically
    await firstBar.focus();
    await expect(firstBar).toBeFocused();
    const firstTooltip = page.locator(`id=tooltip-${data[0].day}`);
    await expect(firstTooltip).toBeVisible();

    // Test Right Arrow navigation - tooltip should follow focus
    for (let i = 0; i < data.length - 1; i++) {
      await page.keyboard.press("ArrowRight");
      await expect(chartBars.nth(i + 1)).toBeFocused();
      const currentTooltip = page.locator(`id=tooltip-${data[i + 1].day}`);
      await expect(currentTooltip).toBeVisible();

      // Previous tooltip should be hidden
      const previousTooltip = page.locator(`id=tooltip-${data[i].day}`);
      await expect(previousTooltip).not.toBeVisible();
    }

    // Test Left Arrow navigation
    for (let i = data.length - 1; i > 0; i--) {
      await page.keyboard.press("ArrowLeft");
      await expect(chartBars.nth(i - 1)).toBeFocused();
      const currentTooltip = page.locator(`id=tooltip-${data[i - 1].day}`);
      await expect(currentTooltip).toBeVisible();

      // Previous tooltip should be hidden
      const previousTooltip = page.locator(`id=tooltip-${data[i].day}`);
      await expect(previousTooltip).not.toBeVisible();
    }

    // Test Home key
    await page.keyboard.press("Home");
    await expect(firstBar).toBeFocused();
    await expect(firstTooltip).toBeVisible();

    // Test End key
    await page.keyboard.press("End");
    await expect(lastBar).toBeFocused();
    const lastTooltip = page.locator(`id=tooltip-${data[data.length - 1].day}`);
    await expect(lastTooltip).toBeVisible();
    await expect(firstTooltip).not.toBeVisible();

    // Test that Enter/Space does not toggle tooltip (it should remain visible)
    await firstBar.focus();
    await expect(firstTooltip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(firstTooltip).toBeVisible(); // Should still be visible
    await page.keyboard.press(" ");
    await expect(firstTooltip).toBeVisible(); // Should still be visible

    // Test blur hides tooltip
    await page.keyboard.press("Tab"); // Tab away from chart
    await expect(firstBar).not.toBeFocused();
    await expect(firstTooltip).not.toBeVisible();
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
