import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Newsletter sign-up form with success message Page", () => {
  /** Go to Newsletter sign-up form with success message page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/newsletter-sign-up-with-success-message");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Newsletter sign-up form with success message",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Stay updated!",
      }),
    ).toBeVisible();
  });

  /** Test if the page has a correct hero image */
  test("has a hero image", async ({ page }) => {
    await expect(page.getByRole("img").first()).toBeVisible();
  });

  /** Test if the page has a form */
  test("has a form", async ({ page }) => {
    const form = page.locator("form");
    await expect(form).toBeVisible();
    // Label visible
    await expect(form.getByText("Email address")).toBeVisible();
    // Input visible
    await expect(form.getByPlaceholder("email@company.com")).toBeVisible();
    // Subscribe button visible
    await expect(
      form.getByRole("button", { name: "Subscribe to monthly newsletter" }),
    ).toBeVisible();
  });
});
