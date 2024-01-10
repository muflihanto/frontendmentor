import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Intro component with sign up form Page", () => {
  /** Go to Intro component with sign up form page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/intro-component-with-signup-form");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Intro component with sign up form",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Learn to code by watching others",
      }),
    ).toBeVisible();
  });

  /** Test if the page has a correct body text */
  test("has a body text", async ({ page }) => {
    await expect(
      page.getByText(
        "See how experienced developers solve problems in real-time. Watching scripted tutorials is great, but understanding how developers think is invaluable.",
      ),
    ).toBeVisible();
  });

  /** Test if the page has a correct call to action */
  test("has a call to action", async ({ page }) => {
    await expect(
      page.getByText("Try it free 7 days then $20/mo. thereafter"),
    ).toBeVisible();
  });

  /** Test if the page has a correct form */
  test("has a form", async ({ page }) => {
    await expect(page.locator("form")).toBeVisible();
  });

  /** Test if the page has a correct footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
