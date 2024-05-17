import { test, expect, type Page, type Locator } from "@playwright/test";

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
    await expect(submit).toBeVisible();
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
});
