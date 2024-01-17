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
    const switcher = page.getByText(units.join(""));
    await expect(switcher.getByRole("button", { name: "Weekly" })).toHaveCSS(
      "color",
      "rgb(255, 255, 255)",
    );
    type Timeframe = keyof (typeof data)[number]["timeframes"];
    for (const name of units) {
      const button = switcher.getByRole("button", { name });
      await expect(button).toBeVisible();
      await button.click();
      await expect(switcher.getByRole("button", { name })).toHaveCSS(
        "color",
        "rgb(255, 255, 255)",
      );
      for (const activity of data) {
        const title = page
          .locator("div")
          .filter({ hasText: activity.title })
          .nth(0);
        const container = page.locator("div").filter({ has: title }).nth(3);
        await expect(
          container.getByText(
            `${
              activity.timeframes[name.toLowerCase() as Timeframe].current
            }hrs`,
            { exact: true },
          ),
        ).toBeVisible();
      }
    }
  });
});
