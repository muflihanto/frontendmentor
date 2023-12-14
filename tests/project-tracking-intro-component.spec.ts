import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Project tracking intro component Page", () => {
  /** Go to Project tracking intro component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/project-tracking-intro-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Project tracking intro component",
    );
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Powerful insights into your team",
      }),
    ).toBeVisible();
  });
});
