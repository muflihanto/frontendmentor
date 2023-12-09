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
});
