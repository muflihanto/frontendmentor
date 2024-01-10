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

  test.describe("form should works", () => {
    test("has all fields", async ({ page }) => {
      const inputs = await page.locator("form input").all();
      const names = ["firstName", "lastName", "email", "password"];
      expect(inputs).toHaveLength(4);
      const inputNames = [];
      for (const input of inputs) {
        inputNames.push(await input.getAttribute("name"));
      }
      expect(inputNames).toStrictEqual(names);
    });

    test("has a submit button", async ({ page }) => {
      const submit = page.locator("form button");
      await expect(submit).toBeVisible();
    });

    test("invalid input should trigger error warning", ({ page: _page }) => {
      test.fixme();
    });

    test("has a terms and services agreement", async ({ page }) => {
      await expect(
        page
          .locator("form")
          .getByText(
            "By clicking the button, you are agreeing to our Terms and Services",
          ),
      ).toBeVisible();
    });
  });

  /** Test if the page has a correct footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
