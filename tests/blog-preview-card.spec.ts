import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Blog preview card Page", () => {
  /** Go to Blog preview card page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/blog-preview-card");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Blog preview card");
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: "HTML & CSS foundations" }),
    ).toBeVisible();
  });
});
