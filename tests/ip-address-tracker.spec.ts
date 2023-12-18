import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - IP Address Tracker Page", () => {
  /** Go to IP Address Tracker page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/ip-address-tracker");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | IP Address Tracker");
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "IP Address Tracker",
      }),
    ).toBeVisible();
  });
});
