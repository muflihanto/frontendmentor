import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Interactive comments section Page", () => {
  /** Go to Interactive comments section page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/interactive-comments-section");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Interactive comments section",
    );
  });

  /** Test if the page has an 'Add a comment' form */
  test.describe("has an 'Add a comment' form", () => {
    test("has all elements", async ({ page }) => {
      const form = page.locator("form");
      await expect(
        form.getByRole("img", { name: "juliusomo Avatar" }),
      ).toBeVisible();
      await expect(form.getByPlaceholder("Add a comment...")).toBeVisible();
      await expect(form.getByRole("button", { name: "Send" })).toBeVisible();
    });
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
