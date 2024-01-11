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
    const names = ["firstName", "lastName", "email", "password"];

    test("has all fields", async ({ page }) => {
      const inputs = await page.locator("form input").all();
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

    test("empty input should trigger error warning", async ({ page }) => {
      const emptyFieldErrors = [
        "First Name cannot be empty",
        "Last Name cannot be empty",
        "Looks like this is not an email",
        "Password cannot be empty",
      ];
      const inputs = await page.locator("form input").all();
      const submit = page.locator("form button");
      await submit.click();
      for (const [index, input] of Object.entries(inputs)) {
        const error = input
          .locator("+p")
          .getByText(emptyFieldErrors[Number(index)]);
        await expect(error).toBeVisible();
      }
    });

    test("invalid email input should trigger error warning", async ({
      page,
    }) => {
      const invalidEmail = "email@example/com";
      const emailInput = page.getByPlaceholder("Email Address");
      const submit = page.locator("form button");
      await emailInput.fill(invalidEmail);
      await submit.click();
      await expect(
        emailInput.locator("+p").getByText("Looks like this is not an email"),
      ).toBeVisible();
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
