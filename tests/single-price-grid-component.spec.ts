import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("FrontendMentor Challenge - Single Price Grid Component Page", () => {
  /** Go to Single Price Grid Component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/single-price-grid-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Single Price Grid Component",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Join our community",
      }),
    ).toBeVisible();
  });

  test.describe("has price section", () => {
    /** Test if the section has a heading */
    test("has a heading", async ({ page }) => {
      await expect(
        page.getByRole("heading", { name: "Monthly Subscription" }),
      ).toBeVisible();
    });

    /** Test if the section has a correct price */
    test("has a price", async ({ page }) => {
      await expect(page.getByText("$29per month")).toBeVisible();
    });

    /** Test if the section has a sign up button */
    test("has a sign up button", async ({ page }) => {
      await expect(page.getByRole("link", { name: "Sign Up" })).toBeVisible();
    });
  });

  /** Test if the page has a why us section */
  test("has a why us section", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Why Us" });
    const whyUs = [
      "Tutorials by industry experts",
      "Peer & expert code review",
      "Coding exercises",
      "Access to our GitHub repos",
      "Community forum",
      "Flashcard decks",
      "New videos every week",
    ];
    const whyUsElements = await heading.locator("+ul li").all();
    await expect(heading).toBeVisible();
    for (const [index, el] of Object.entries(whyUsElements)) {
      await expect(el).toBeVisible();
      expect(await el.textContent()).toEqual(whyUs[Number(index)]);
    }
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
