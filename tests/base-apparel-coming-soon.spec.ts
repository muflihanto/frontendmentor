import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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
    const heading = page.getByTestId("heading");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("We're");
    await expect(heading).toContainText("coming");
    await expect(heading).toContainText("soon");
  });

  /** Test if the page has a correct logo */
  test("has a logo", async ({ page }) => {
    const logo = page.getByTestId("logo");
    await expect(logo).toBeVisible();
    await expect(
      logo.getByRole("img", { name: "Base Apparel Logo" }),
    ).toBeVisible();
  });

  /** Test if the page has correct body text */
  test("has body text", async ({ page }) => {
    const desc = page.getByTestId("description");
    await expect(desc).toBeVisible();
    await expect(desc).toContainText(
      "Hello fellow shoppers! We're currently building",
    );
  });

  /** Test if the page has a correct hero image */
  test("has a hero image", async ({ page }) => {
    const heroImage = page.getByTestId("hero-image");
    await expect(heroImage).toBeVisible();
    await expect(page.getByRole("img", { name: "Hero Image" })).toBeVisible();
  });

  /** Test if the page has a correct form */
  test("has a form", async ({ page }) => {
    await expect(page.getByTestId("email-form")).toBeVisible();
  });

  /** Test if the page has a correct footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  test("submit button should have hover effect", async ({ page }) => {
    const submitButton = page.getByTestId("submit-button");

    // Get initial box-shadow
    const initialShadow = await submitButton.evaluate(
      (el) => window.getComputedStyle(el).boxShadow,
    );

    // Hover over the button
    await submitButton.hover();

    // Check shadow changed – change-based, not exact value
    await expect
      .poll(async () =>
        submitButton.evaluate((el) => window.getComputedStyle(el).boxShadow),
      )
      .not.toEqual(initialShadow);
  });

  test.describe("Responsive behavior", () => {
    test("should display mobile layout on small screens", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const heading = page.getByTestId("heading");
      await expect(heading).toHaveCSS("text-align", "center");

      await expect(page.getByTestId("hero-image")).toBeVisible();

      const heroContainer = page.getByTestId("hero-container");
      await expect(heroContainer).toHaveCSS("position", "relative");
    });

    test("should display desktop layout on large screens", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 800 });

      const heading = page.getByTestId("heading");
      await expect(heading).toHaveCSS("text-align", "left");

      await expect(page.getByTestId("hero-image")).toBeVisible();

      const heroContainer = page.getByTestId("hero-container");
      await expect(heroContainer).toHaveCSS("position", "absolute");
      await expect(heroContainer).toHaveCSS("right", "0px");
      await expect(heroContainer).toHaveCSS("top", "0px");
    });
  });

  test.describe("form should works", () => {
    test("empty input should trigger a warning", async ({ page }) => {
      const submit = page.getByTestId("submit-button");
      await expect(submit).toBeVisible();
      await submit.click();
      const errorWarning = page.getByTestId("error-message");
      await expect(errorWarning).toBeVisible();
      await expect(errorWarning).toHaveText("Please provide a valid email");
    });

    test("invalid input should trigger a warning", async ({ page }) => {
      const input = page.getByTestId("email-input");
      const submit = page.getByTestId("submit-button");
      await expect(input).toBeEditable();
      await input.fill("janeappleseed#email.com");
      await expect(submit).toBeVisible();
      await submit.click();
      const errorWarning = page.getByTestId("error-message");
      await expect(errorWarning).toBeVisible();
      await expect(errorWarning).toHaveText("Please provide a valid email");
    });

    test("valid input should clears input and not trigger a warning", async ({
      page,
    }) => {
      const input = page.getByTestId("email-input");
      const submit = page.getByTestId("submit-button");
      await expect(input).toBeEditable();
      await input.fill("janeappleseed@email.com");
      await expect(submit).toBeVisible();
      await submit.click();
      // Make sure the input is cleared
      await expect(input).toHaveValue("");
      await expect(page.getByTestId("error-message")).not.toBeVisible();
    });
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
