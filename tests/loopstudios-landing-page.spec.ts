import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Loopstudios landing Page", () => {
  /** Go to Loopstudios landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/loopstudios-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Loopstudios landing page",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Immersive experiences that deliver",
      }),
    ).toBeVisible();
  });
});
