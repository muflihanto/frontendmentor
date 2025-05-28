import { test, expect, type Page, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
    // Subscribe button visible
    await expect(
      form.getByRole("button", { name: "Subscribe to monthly newsletter" }),
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
