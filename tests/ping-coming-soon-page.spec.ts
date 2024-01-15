import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Ping coming soon Page", () => {
  /** Go to Ping coming soon page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/ping-coming-soon-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Ping coming soon page");
  });

  /** Test if the page has a ping logo */
  test("has a ping logo", async ({ page }) => {
    await expect(page.getByRole("img", { name: "Ping Logo" })).toBeVisible();
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "We are launching soon!",
      }),
    ).toBeVisible();
  });

  /** Test if the page has a correct call to action text */
  test("has a call to action text", async ({ page }) => {
    await expect(page.getByText("Subscribe and get notified")).toBeVisible();
  });

  /** Test if the page has a form */
  test("has a form", async ({ page }) => {
    const form = page.locator("form");
    const input = form.getByPlaceholder("Your email address...");
    const submit = form.getByRole("button", { name: "Notify Me" });
    await expect(form).toBeVisible();
    await expect(input).toBeVisible();
    await expect(input).toBeEmpty();
    await expect(submit).toBeVisible();
  });

  /** Test if the page has an illustration */
  test("has an illustration", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "Illustration Dashboard" }),
    ).toBeVisible();
  });
});
