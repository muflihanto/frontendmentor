import AxeBuilder from "@axe-core/playwright";
import type { Locator, Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

const pageUrl = "/newsletter-sign-up-with-success-message";

test.describe("FrontendMentor Challenge - Newsletter sign-up form with success message Page", () => {
  /** Go to Newsletter sign-up form with success message page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto(pageUrl);
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
    const subscribe = form.getByRole("button", {
      name: "Subscribe to monthly newsletter",
    });
    // Subscribe button visible
    await expect(subscribe).toBeVisible();
    await expect(subscribe).toHaveCSS("background-image", "none");
    await expect(subscribe).toHaveCSS("box-shadow", "none");
    await subscribe.hover();
    await expect(subscribe).not.toHaveCSS("background-image", "none");
    await expect(subscribe).not.toHaveCSS("box-shadow", "none");
  });

  /** Test focus states */
  test("has proper focus states", async ({ page }) => {
    const input = page.getByPlaceholder("email@company.com");
    const button = page.getByRole("button", {
      name: "Subscribe to monthly newsletter",
    });

    // Test input focus state
    await expect(input).toHaveCSS("border-color", "rgba(146, 148, 160, 0.75)");
    await input.focus();
    await expect(input).toHaveCSS("border-color", "rgb(54, 56, 78)");

    // Test button focus state
    await expect(button).toHaveCSS("outline-width", "0px");
    await button.focus();
    await expect(button).toHaveCSS("outline-width", "3px");
  });

  /** Test keyboard navigation */
  test("supports keyboard navigation", async ({ page }) => {
    const input = page.getByPlaceholder("email@company.com");
    const button = page.getByRole("button", {
      name: "Subscribe to monthly newsletter",
    });

    // Tab to input and verify focus
    await page.keyboard.press("Tab");
    await expect(input).toBeFocused();

    // Tab to button and verify focus
    await page.keyboard.press("Tab");
    await expect(button).toBeFocused();

    // Submit form with keyboard
    await page.keyboard.press("Enter");
    await expect(page.getByText("Email required")).toBeVisible();

    // Fill valid email and submit with keyboard
    await page.keyboard.press("Tab"); // Back to input
    await input.fill("test@example.com");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("heading", { name: "Thanks for subscribing!" }),
    ).toBeVisible();

    // Test dismiss with keyboard
    const dismissButton = page.getByRole("button", { name: "Dismiss message" });
    // TODO: Should be auto-focused
    await page.keyboard.press("Tab");
    await expect(dismissButton).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("heading", { name: "Stay updated!" }),
    ).toBeVisible();
  });

  /** Test if the form works */
  test.describe("form works", () => {
    test.describe.configure({ mode: "serial" });

    let page: Page;
    let body: Locator;
    let form: Locator;
    let input: Locator;
    let errorMessage: Locator;
    let button: Locator;
    let dismiss: Locator;
    const validEmail = "validemail@example.com";

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(pageUrl);
    });

    test("can handle empty input", async () => {
      form = page.locator("form");
      await expect(form).toBeVisible();
      input = form.getByPlaceholder("email@company.com");
      button = form.getByRole("button", {
        name: "Subscribe to monthly newsletter",
      });
      errorMessage = form.getByText("Email required");
      await expect(errorMessage).not.toBeVisible();
      await expect(input).toHaveCSS("background-color", "rgb(255, 255, 255)");
      await expect(input).toHaveCSS(
        "border-bottom-color",
        "rgba(146, 148, 160, 0.75)",
      );
      await button.click();
      await expect(errorMessage).toBeVisible();
      await expect(input).toHaveCSS(
        "background-color",
        "rgba(255, 98, 87, 0.15)",
      );
      await expect(input).toHaveCSS("border-bottom-color", "rgb(255, 98, 87)");
      await page.reload();
    });

    test("can handle invalid input", async () => {
      errorMessage = form.getByText("Valid email required");
      await expect(errorMessage).not.toBeVisible();
      await expect(input).toHaveCSS("background-color", "rgb(255, 255, 255)");
      await expect(input).toHaveCSS(
        "border-bottom-color",
        "rgba(146, 148, 160, 0.75)",
      );
      await input.fill("invalid email");
      await button.click();
      await expect(errorMessage).toBeVisible();
      await expect(input).toHaveCSS(
        "background-color",
        "rgba(255, 98, 87, 0.15)",
      );
      await expect(input).toHaveCSS("border-bottom-color", "rgb(255, 98, 87)");
      await expect(input).toHaveValue("invalid email");
      await page.reload();
    });

    test("can handle valid input", async () => {
      await input.fill(validEmail);
      await button.click();
      await expect(
        page.getByRole("heading", { name: "Thanks for subscribing!" }),
      ).toBeVisible();
    });

    test("has 'success message' card", async () => {
      dismiss = page.getByRole("button", { name: "Dismiss message" });
      await expect(page.getByRole("img", { name: "Success" })).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Thanks for subscribing!" }),
      ).toBeVisible();
      await expect(
        page.getByText(`A confirmation email has been sent to ${validEmail}`),
      ).toBeVisible();
      await expect(dismiss).toBeVisible();
      await expect(dismiss).toBeVisible();
      await expect(dismiss).toHaveCSS("background-image", "none");
      await expect(dismiss).toHaveCSS("box-shadow", "none");
      await dismiss.hover();
      await expect(dismiss).not.toHaveCSS("background-image", "none");
      await expect(dismiss).not.toHaveCSS("box-shadow", "none");
    });

    /** Test body overflow is hidden when success screen is open */
    test("disables body scroll when success screen is open", async () => {
      body = page.locator("body");
      await expect(body).toHaveCSS("overflow", "hidden");

      await dismiss.click();
      await expect(body).toHaveCSS("overflow", "auto");
      await expect(
        page.getByRole("heading", { name: "Stay updated!" }),
      ).toBeVisible();
    });
  });

  /** Test if the page has a correct footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  test.describe("responsive layout", () => {
    /** Test responsive behavior - mobile view */
    test("shows mobile illustration on small screens", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const mobileIllustration = page.locator(
        'svg[aria-labelledby="illustration-sign-up-mobile-title"]',
      );
      await expect(mobileIllustration).toBeVisible();
    });

    /** Test responsive behavior - desktop view */
    test("shows desktop illustration on large screens", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 800 });
      const desktopIllustration = page.locator(
        'svg[aria-labelledby="illustration-desktop-title"]',
      );
      await expect(desktopIllustration).toBeVisible();
    });
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();
    // console.log({ violations: accessibilityScanResults.violations });
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
