import { test, expect, type Page, type Locator } from "@playwright/test";

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
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
