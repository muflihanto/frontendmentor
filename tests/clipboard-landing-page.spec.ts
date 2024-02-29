import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Clipboard landing Page", () => {
  /** Go to Clipboard landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/clipboard-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Clipboard landing page");
  });

  /** Test if the page has a main section */
  test("has a main section", async ({ page }) => {
    const main = page.getByRole("main");
    await expect(main.getByRole("img")).toBeVisible();
    await expect(
      main.getByRole("heading", {
        level: 1,
        name: "A history of everything you copy",
      }),
    ).toBeVisible();
    await expect(
      main.getByText(
        "Clipboard allows you to track and organize everything you copy. Instantly access",
      ),
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: "Download for iOS" }),
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: "Download for Mac" }),
    ).toBeVisible();
  });
});
