import { test, expect } from "@playwright/test";

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

  /** Test if the page has time range switcher buttons */
  test("has time range switcher buttons", async ({ page }) => {
    const units = ["Daily", "Weekly", "Monthly"];
    const switcher = page.getByText("DailyWeeklyMonthly");
    for (const name of units) {
      await expect(switcher.getByRole("button", { name })).toBeVisible();
    }
  });
});
