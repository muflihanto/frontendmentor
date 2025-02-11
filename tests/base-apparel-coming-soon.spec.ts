import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Base Apparel coming soon Page", () => {
  /** Go to Base Apparel coming soon page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/base-apparel-coming-soon");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Base Apparel coming soon page",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "We're coming soon",
      }),
    ).toBeVisible();
  });

  /** Test if the page has a correct logo */
  test("has a logo", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "Base Apparel Logo" }),
    ).toBeVisible();
  });

  /** Test if the page has correct body text */
  test("has body text", async ({ page }) => {
    await expect(
      page.getByText(
        "Hello fellow shoppers! We're currently building our new fashion store. Add your email below to stay up-to-date with announcements and our launch deals.",
      ),
    ).toBeVisible();
  });

  /** Test if the page has a correct hero image */
  test("has a hero image", async ({ page }) => {
    await expect(page.getByRole("img", { name: "Hero Image" })).toBeVisible();
  });

  /** Test if the page has a correct form */
  test("has a form", async ({ page }) => {
    await expect(page.locator("form").first()).toBeVisible();
  });

  /** Test if the page has a correct footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  test.describe("form should works", () => {
    test("empty input should trigger a warning", async ({ page }) => {
      const submit = page.getByRole("button");
      await expect(submit).toBeVisible();
      await submit.click();
      const errorWarning = page.getByText("Please provide a valid email");
      await expect(errorWarning).toBeVisible();
    });

    test("invalid input should trigger a warning", async ({ page }) => {
      const input = page.getByPlaceholder("Email Address");
      const submit = page.getByRole("button");
      await expect(input).toBeEditable();
      await input.fill("janeappleseed#email.com");
      await expect(submit).toBeVisible();
      await submit.click();
      const errorWarning = page.getByText("Please provide a valid email");
      await expect(errorWarning).toBeVisible();
    });

    test("valid input should not trigger a warning", async ({ page }) => {
      const input = page.getByPlaceholder("Email Address");
      const submit = page.getByRole("button");
      await expect(input).toBeEditable();
      await input.fill("janeappleseed@email.com");
      await expect(submit).toBeVisible();
      await submit.click();
      const errorWarning = page.getByText("Please provide a valid email");
      await expect(errorWarning).not.toBeVisible();
    });
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
