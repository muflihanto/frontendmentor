import { test, expect } from "@playwright/test";
import data from "../components/time-tracking-dashboard/data.json";
import AxeBuilder from "@axe-core/playwright";
// const activities = [
//   "Work",
//   "Play",
//   "Study",
//   "Exercise",
//   "Social",
//   "Self Care",
// ] as const;

test.describe("FrontendMentor Challenge - Time tracking dashboard Page", () => {
  /** Go to Time tracking dashboard page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/time-tracking-dashboard");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Time tracking dashboard");
  });

  /** Test if the page has a correct header */
  test("has a header", async ({ page }) => {
    await expect(page.getByText("Report forJeremy Robson")).toBeVisible();
  });

  /** Test if the page has an avatar */
  test("has an avatar", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "Jeremy Profile Picture" }),
    ).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  /** Test if the page has timeframe switcher buttons */
  test("has timeframe switcher buttons", async ({ page }) => {
    const units = ["Daily", "Weekly", "Monthly"];
    const lastTime = {
      weekly: "Last Week",
      daily: "Yesterday",
      monthly: "Last Month",
    };
    const switcher = page.getByLabel("Report forJeremy Robson");
    await expect(switcher.getByRole("tab", { name: "Weekly" })).toHaveCSS(
      "color",
      "rgb(255, 255, 255)",
    );
    type Timeframe = keyof (typeof data)[number]["timeframes"];
    const tabpanel = page.getByRole("tabpanel");
    for (const name of units) {
      const button = switcher.getByRole("tab", { name });
      await expect(button).toBeVisible();
      await expect(button).toHaveAttribute("aria-selected", "false");
      await expect(button).toHaveAttribute("aria-controls", "tabpanel");
      await expect(tabpanel).not.toHaveAccessibleName(name);
      await button.click();
      await expect(button).toHaveAttribute("aria-selected", "true");
      await expect(tabpanel).toHaveAccessibleName(name);
      await expect(switcher.getByRole("tab", { name })).toHaveCSS(
        "color",
        "rgb(255, 255, 255)",
      );
      for (const activity of data) {
        const container = page
          .locator("div")
          .filter({ hasText: activity.title })
          .nth(4);
        const icon = container.locator(`svg[aria-label="${activity.title}"]`);
        await expect(icon).toBeVisible();
        await expect(icon).toHaveAttribute(
          "viewBox",
          expect.stringContaining("0 0"),
        );
        await expect(container.getByText(activity.title)).toBeVisible();
        await expect(
          container.getByText(
            `${
              activity.timeframes[name.toLowerCase() as Timeframe].current
            }hrs`,
            { exact: true },
          ),
        ).toBeVisible();
        await expect(
          container.getByText(
            `${lastTime[name.toLowerCase() as Timeframe]} - ${
              activity.timeframes[name.toLowerCase() as Timeframe].previous
            }hrs`,
            { exact: true },
          ),
        ).toBeVisible();
      }
    }
  });

  /** Test for activity card hover states and interactive elements */
  test("activity cards have correct hover states and interactive elements", async ({
    page,
  }) => {
    const activities = data.map((item) => item.title);

    for (const activity of activities) {
      const card = page.locator(`div:has-text("${activity}")`).nth(5);

      await expect(card).toHaveCSS("background-color", "rgb(28, 31, 74)");

      // Test hover state
      await card.hover();
      await expect(card).toHaveCSS("background-color", "rgb(52, 57, 123)");

      // Test ellipsis button presence
      const ellipsisButton = card.getByRole("button");
      await expect(ellipsisButton).toBeVisible();

      // Test ellipsis icon hover state
      const svg = ellipsisButton.locator("svg");
      await expect(svg).toHaveCSS("fill", "rgb(187, 192, 255)");
      await ellipsisButton.hover();
      await expect(svg).toHaveCSS("fill", "rgb(255, 255, 255)");
    }
  });

  /** Test if the tab keyboard navigation works  */
  test.describe("tab keyboard navigation works", () => {
    const units = ["Daily", "Weekly", "Monthly"];

    test("works on desktop", async ({ page }) => {
      const switcher = page.getByLabel("Report forJeremy Robson");
      const tabpanel = page.getByRole("tabpanel");
      for (const [idx, unit] of Object.entries(units)) {
        const index = Number.parseInt(idx);
        const button = switcher.getByRole("tab", { name: unit });
        const nextTabButton = switcher.getByRole("tab", {
          name: units[index === 2 ? 0 : index + 1],
        });
        const prevTabButton = switcher.getByRole("tab", {
          name: units[index === 0 ? 2 : index - 1],
        });
        const firstTabButton = switcher.getByRole("tab", { name: units[0] });
        const lastTabButton = switcher.getByRole("tab", { name: units[2] });
        await button.focus();
        await page.keyboard.press("ArrowDown");
        await expect(nextTabButton).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(tabpanel).toHaveAccessibleName(
          units[index === 2 ? 0 : index + 1],
        );
        await page.keyboard.press("ArrowUp");
        await page.keyboard.press("ArrowUp");
        await expect(prevTabButton).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(tabpanel).toHaveAccessibleName(
          units[index === 0 ? 2 : index - 1],
        );
        await page.keyboard.press("Home");
        await expect(firstTabButton).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(tabpanel).toHaveAccessibleName(units[0]);
        await page.keyboard.press("End");
        await expect(lastTabButton).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(tabpanel).toHaveAccessibleName(units[2]);
      }
    });

    test.describe("works on mobile", () => {
      test.use({ viewport: { width: 375, height: 667 } });

      test("works on mobile", async ({ page }) => {
        const switcher = page.getByLabel("Report forJeremy Robson");
        const tabpanel = page.getByRole("tabpanel");
        for (const [idx, unit] of Object.entries(units)) {
          const index = Number.parseInt(idx);
          const button = switcher.getByRole("tab", { name: unit });
          const nextTabButton = switcher.getByRole("tab", {
            name: units[index === 2 ? 0 : index + 1],
          });
          const prevTabButton = switcher.getByRole("tab", {
            name: units[index === 0 ? 2 : index - 1],
          });
          const firstTabButton = switcher.getByRole("tab", { name: units[0] });
          const lastTabButton = switcher.getByRole("tab", { name: units[2] });
          await button.focus();
          await page.keyboard.press("ArrowRight");
          await expect(nextTabButton).toBeFocused();
          await page.keyboard.press("Enter");
          await expect(tabpanel).toHaveAccessibleName(
            units[index === 2 ? 0 : index + 1],
          );
          await page.keyboard.press("ArrowLeft");
          await page.keyboard.press("ArrowLeft");
          await expect(prevTabButton).toBeFocused();
          await page.keyboard.press("Enter");
          await expect(tabpanel).toHaveAccessibleName(
            units[index === 0 ? 2 : index - 1],
          );
          await page.keyboard.press("Home");
          await expect(firstTabButton).toBeFocused();
          await page.keyboard.press("Enter");
          await expect(tabpanel).toHaveAccessibleName(units[0]);
          await page.keyboard.press("End");
          await expect(lastTabButton).toBeFocused();
          await page.keyboard.press("Enter");
          await expect(tabpanel).toHaveAccessibleName(units[2]);
        }
      });
    });
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
