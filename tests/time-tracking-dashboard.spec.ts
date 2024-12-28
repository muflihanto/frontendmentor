import { test, expect } from "@playwright/test";
import data from "../components/time-tracking-dashboard/data.json";
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
});
