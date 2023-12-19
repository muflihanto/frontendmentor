import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Job Listings Page", () => {
  /** Go to Job Listings page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/static-job-listings");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Job Listings");
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
