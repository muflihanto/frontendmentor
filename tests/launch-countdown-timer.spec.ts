import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Launch countdown timer Page", () => {
  /** Go to Launch countdown timer page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/launch-countdown-timer");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Launch countdown timer");
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "We‘re launching soon" }),
    ).toBeVisible();
  });

  /** Test if the page has social media links */
  test("has social media links", async ({ page }) => {
    const links = await page.getByRole("navigation").getByRole("link").all();
    expect(links).toHaveLength(3);
    for (const link of links) {
      await expect(link).toBeVisible();
    }
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
