import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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

  test.describe("Interactive element states", () => {
    test("form inputs should have proper focus states", async ({ page }) => {
      const inputs = await page.locator("form input").all();

      for (const input of inputs) {
        await expect(input).toHaveCSS(
          "border-color",
          "rgba(105, 105, 105, 0.3)",
        );
        await expect(input).toHaveCSS("outline", "rgb(20, 20, 20) 0px");
        await input.focus();
        await expect(input).toHaveCSS("border-color", "rgb(105, 105, 105)");
        await expect(input).toHaveCSS("outline", "rgba(0, 0, 0, 0) solid 3px");
      }
    });

    test("submit button should have proper hover and focus states", async ({
      page,
    }) => {
      const submit = page.getByRole("button", {
        name: "Claim your free trial",
      });

      // Test hover state
      await expect(submit).toHaveCSS("opacity", "1");
      await submit.hover();
      await expect(submit).toHaveCSS("opacity", "0.75");

      await page.mouse.move(0, 0);

      // Test focus state
      await expect(submit).toHaveCSS("opacity", "1");
      await submit.focus();
      await expect(submit).toHaveCSS("opacity", "0.8");
      await expect(submit).toHaveCSS("outline", /rgba\(0, 0, 0, 0\)/);
    });

    test("error inputs should have different focus states", async ({
      page,
    }) => {
      const submit = page.getByRole("button", {
        name: "Claim your free trial",
      });
      await submit.click(); // Trigger errors

      await page.waitForTimeout(500);

      const inputs = await page.locator("form input").all();
      for (const input of inputs) {
        await input.focus();
        await expect(input).toHaveCSS("border-color", "rgb(252, 165, 165)");
      }
    });
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

    test("invalid password input should trigger error warning", async ({
      page,
    }) => {
      /**
       * Password: string, min 6 chars
       */
      const invalidPasswords = ["p", "pass", "12345"];
      const passInput = page.getByPlaceholder("Password");
      const submit = page.locator("form button");
      for (const pass of invalidPasswords) {
        await passInput.fill(pass);
        await submit.click();
        await expect(
          passInput
            .locator("+p")
            .getByText("Password must be atleast 6 characters"),
        ).toBeVisible();
      }
    });

    test("should be able to submit valid input", async ({ page }) => {
      const inputValues = ["John", "Doe", "johndoe@example.com", "password"];
      const inputs = await page.locator("form input").all();
      const submit = page.locator("form button");
      for (const [index, input] of Object.entries(inputs)) {
        await input.fill(inputValues[Number(index)]);
      }
      await submit.click();
      for (const input of inputs) {
        await expect(input).toBeEmpty();
      }
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
