import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Chat app CSS illustration Page", () => {
  /** Go to Chat app CSS illustration page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/chat-app-css-illustration");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Chat app CSS illustration",
    );
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Simple booking",
      }),
    ).toBeVisible();
  });
});
