import AxeBuilder from "@axe-core/playwright";
import type { Locator, Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

const pageUrl = "/ping-coming-soon-page";

test.describe("FrontendMentor Challenge - Ping coming soon Page", () => {
  /** Go to Ping coming soon page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto(pageUrl);
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
    await expect(input).toHaveCSS("outline-color", "rgb(21, 31, 41)");
    await input.focus();
    await expect(input).toHaveCSS("outline-color", "rgb(79, 125, 243)");
    await expect(submit).toBeVisible();
    await expect(submit).toHaveCSS("opacity", "1");
    await submit.hover();
    await expect(submit).toHaveCSS("opacity", "0.8");
  });

  /** Test if the form works */
  test.describe("form works", () => {
    test.describe.configure({ mode: "serial" });

    let page: Page;
    let form: Locator;
    let input: Locator;
    let errorMessage: Locator;
    let button: Locator;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(pageUrl);
    });

    test("can handle empty input", async () => {
      form = page.locator("form");
      await expect(form).toBeVisible();
      input = form.getByPlaceholder("Your email address...");
      button = form.getByRole("button", { name: "Notify Me" });
      errorMessage = form.getByText("Please provide a valid email address");
      await expect(errorMessage).not.toBeVisible();
      await expect(input).toHaveCSS(
        "border-bottom-color",
        "rgba(79, 125, 243, 0.3)",
      );
      await button.click();
      await expect(errorMessage).toBeVisible();
      await expect(input).toHaveCSS(
        "border-bottom-color",
        "rgb(184, 122, 131)",
      );
      await page.reload();
    });

    test("can handle invalid input", async () => {
      const invalidInput = "invalid email";
      await expect(input).toHaveCSS(
        "border-bottom-color",
        "rgba(79, 125, 243, 0.3)",
      );
      await input.fill(invalidInput);
      await button.click();
      await expect(errorMessage).toBeVisible();
      await expect(input).toHaveCSS(
        "border-bottom-color",
        "rgb(184, 122, 131)",
      );
      await expect(input).toHaveValue(invalidInput);
      await page.reload();
    });

    test("can handle valid input", async () => {
      const validInput = "validemail@example.com";
      await expect(input).toHaveCSS(
        "border-bottom-color",
        "rgba(79, 125, 243, 0.3)",
      );
      await input.fill(validInput);
      await button.click();
      await expect(errorMessage).not.toBeVisible();
      await expect(input).toHaveCSS(
        "border-bottom-color",
        "rgba(79, 125, 243, 0.3)",
      );
      await expect(input).toHaveValue("");
    });
  });

  /** Test if the page has an illustration */
  test("has an illustration", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "Illustration Dashboard" }),
    ).toBeVisible();
  });

  /** Test if the page has social links */
  test("has social links", async ({ page }) => {
    const container = page.locator("div:has(a)").nth(2);
    const links = await container.locator("a").all();
    for (const link of links) {
      await expect(link).toBeVisible();
      await expect(link).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
      await expect(link.locator("svg")).toHaveCSS("color", "rgb(79, 125, 243)");
      await link.hover();
      await expect(link).toHaveCSS("background-color", "rgb(79, 125, 243)");
      await expect(link.locator("svg")).toHaveCSS(
        "color",
        "rgb(255, 255, 255)",
      );
    }
  });

  /** Test if the page has footers */
  test("has footers", async ({ page }) => {
    await expect(
      page.getByText("© Copyright Ping. All rights reserved."),
    ).toBeVisible();
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
