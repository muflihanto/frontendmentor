import AxeBuilder from "@axe-core/playwright";
import type { Locator, Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

const pageUrl = "/interactive-rating-component";

test.describe("FrontendMentor Challenge - Interactive rating component Page", () => {
  /** Go to Interactive rating component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto(pageUrl);
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Interactive rating component",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "How did we do?",
      }),
    ).toBeVisible();
  });

  /** Test if the page has input elements */
  test("has input elements", async ({ page }) => {
    const inputs = await page.locator("fieldset input").all();
    expect(inputs).toHaveLength(5);
    for (const input of inputs) {
      await expect(input).toBeVisible();
    }
  });

  /** Test if the page has a submit button */
  test("has a submit button", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
  });

  /** Test if the page has body text */
  test("has body text", async ({ page }) => {
    await expect(
      page.getByText(
        "Please let us know how we did with your support request. All feedback is appreci",
      ),
    ).toBeVisible();
  });

  /** Test rating input selection - checks sibling span styles */
  test("rating inputs can be selected and show visual feedback on sibling span", async ({
    page,
  }) => {
    const inputs = await page.locator("fieldset input").all();

    for (const [index, input] of Object.entries(inputs)) {
      const span = input.locator("+ span"); // Get adjacent sibling span

      // Check initial state
      await expect(input).toHaveAttribute("aria-checked", "false");
      await expect(span).toHaveCSS("background-color", "rgb(37, 45, 55)"); // bg-rating-neutral-400
      await expect(span).toHaveCSS("color", "rgb(149, 158, 172)"); // text-rating-neutral-200

      // Select the rating
      await input.check();

      // Verify selected state
      await expect(input).toHaveAttribute("aria-checked", "true");
      await expect(span).toHaveCSS("background-color", "rgb(251, 116, 19)"); // bg-rating-primary-orange
      await expect(span).toHaveCSS("color", "rgb(255, 255, 255)"); // text-rating-neutral-100

      // Verify hover state (simulate hover)
      await span.hover();
      await expect(span).toHaveCSS(
        "background-color",
        "rgba(251, 116, 19, 0.5)",
      ); // bg-rating-primary-orange/50

      // Verify only one rating is selected at a time
      for (const otherInput of inputs.filter((_, i) => i !== Number(index))) {
        const otherSpan = otherInput.locator("+ span");
        await expect(otherInput).toHaveAttribute("aria-checked", "false");
        await expect(otherSpan).toHaveCSS(
          "background-color",
          "rgb(37, 45, 55)",
        );
      }

      // Reset hover state
      await page.mouse.move(0, 0);
    }
  });

  /** Test if the form works */
  test.describe("form works", () => {
    test.describe.configure({ mode: "serial" });

    let page: Page;
    let card: Locator;
    let submit: Locator;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(pageUrl);
    });

    test.afterAll(async () => {
      await page.close();
    });

    test("can handle empty input", async () => {
      card = page.getByRole("main");
      submit = card.getByRole("button", { name: "Submit" });
      await submit.click();
      await expect(card.getByText("Select a number!")).toBeVisible();
    });

    /** Test if the form input can be submitted */
    test("can submit form", async () => {
      const inputs = await card.locator("fieldset input").all();
      for (const [index, input] of Object.entries(inputs)) {
        await expect(input).toHaveAttribute("aria-checked", "false");
        await input.check();
        await expect(input).toHaveAttribute("aria-checked", "true");
        await submit.click();
        await page.waitForTimeout(100);
        await expect(
          card.getByRole("img", { name: "Thank you illustration" }),
        ).toBeVisible();
        await expect(
          card.getByText(`You selected ${Number(index) + 1} out of 5`),
        ).toBeVisible();
        await expect(
          card.getByRole("heading", { name: "Thank you!" }),
        ).toBeVisible();
        await expect(
          card.getByText(
            "We appreciate you taking the time to give a rating. If you ever need more support, don’t hesitate to get in touch!",
          ),
        ).toBeVisible();
        await page.reload();
      }
    });

    /** Test keyboard navigation */
    test("can navigate and select ratings with keyboard", async () => {
      await page.keyboard.press("Tab"); // Focus first rating

      for (let i = 1; i <= 5; i++) {
        // Verify focus
        const currentInput = page.locator(`input[value="${i}"]`);
        await expect(currentInput).toBeFocused();

        // Select with space
        await page.keyboard.press("Space");
        await expect(currentInput).toHaveAttribute("aria-checked", "true");

        // Move to next rating
        if (i < 5) await page.keyboard.press("ArrowRight");
      }

      // Submit with Enter
      await page.keyboard.press("Tab"); // Focus submit button
      await page.keyboard.press("Enter");

      await page.waitForTimeout(100);

      // Verify thank you state
      await expect(
        page.getByRole("heading", { name: "Thank you!" }),
      ).toBeVisible();
    });
  });

  /** Test if the page has a footer */
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
