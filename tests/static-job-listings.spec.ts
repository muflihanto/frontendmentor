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

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(header).toHaveCSS(
      "background-image",
      'url("http://localhost:3000/static-job-listings/images/bg-header-desktop.svg")',
    );
  });

  /** Test if the page has correct initial cards */
  test("has correct initial cards", async ({ page }) => {
    const container = page.locator("div").nth(3);
    await expect(container).toBeVisible();
    expect(await container.locator(">div").all()).toHaveLength(10);
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
