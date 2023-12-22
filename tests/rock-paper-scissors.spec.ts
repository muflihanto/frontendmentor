import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Rock, Paper, Scissors Page", () => {
  /** Go to Rock, Paper, Scissors page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/rock-paper-scissors");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Rock, Paper, Scissors");
  });

  /** Test if the page has a logo */
  test("has a logo", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "Rock Paper Scissors Logo" }),
    ).toBeVisible();
  });
});
