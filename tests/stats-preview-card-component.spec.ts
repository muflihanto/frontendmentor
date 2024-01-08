import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Stats preview card component Page", () => {
  /** Go to Stats preview card component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/stats-preview-card-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Stats preview card component",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Get insights that help your business grow.",
      }),
    ).toBeVisible();
  });

  /** Test if the page has a correct body text */
  test("has a body text", async ({ page }) => {
    await expect(
      page.getByText(
        "Discover the benefits of data analytics and make better decisions regarding revenue, customer experience, and overall efficiency.",
      ),
    ).toBeVisible();
  });

  /** Test if the page has correct stats */
  test("has stats", async ({ page }) => {
    await expect(page.getByText("10k+companies")).toBeVisible();
    await expect(page.getByText("314templates")).toBeVisible();
    await expect(page.getByText("12m+queries")).toBeVisible();
  });

  /** Test if the page has a correct hero image */
  test("has a hero image", async ({ page }) => {
    await expect(page.getByAltText("Business Illustration")).toBeVisible();
  });

  /** Test if the page has a correct footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
