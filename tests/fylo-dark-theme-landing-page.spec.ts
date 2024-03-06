import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Fylo landing page with dark theme and features grid Page", () => {
  /** Go to Fylo landing page with dark theme and features grid page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/fylo-dark-theme-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Fylo landing page with dark theme and features grid",
    );
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header).toBeInViewport();
    await expect(header.getByRole("img", { name: "Fylo Logo" })).toBeVisible();
    const nav = header.getByRole("navigation");
    const navlinks = ["Features", "Team", "Sign In"];
    for (const link of navlinks) {
      await expect(nav.getByRole("link", { name: link })).toBeVisible();
    }
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "All your files in one secure location, accessible anywhere.",
      }),
    ).toBeVisible();
  });
});
