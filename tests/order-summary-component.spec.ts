import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("FrontendMentor Challenge - Order summary card Page", () => {
  /** Go to Order summary card page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/order-summary-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Order summary card");
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Order Summary",
      }),
    ).toBeVisible();
  });

  /** Test if the page has a correct header image */
  test("has a header image", async ({ page }) => {
    await expect(page.getByRole("img", { name: "Illustration" })).toBeVisible();
  });

  /** Test if the page has a correct order summary text */
  test("has an order summary text", async ({ page }) => {
    await expect(
      page.getByText(
        "You can now listen to millions of songs, audiobooks, and podcasts on any device ",
      ),
    ).toBeVisible();
  });

  /** Test if the page has a change plan button */
  test("has a change plan button", async ({ page }) => {
    const link = page.getByRole("link", { name: "Change" });
    await expect(link).toBeVisible();
    // Test hover state
    await link.hover();
    await expect(link).toHaveCSS("color", "rgb(117, 106, 241)");
    await expect(link).toHaveCSS("text-decoration-line", "none");
  });

  /** Test if the page has a cta button */
  test("has a cta button", async ({ page }) => {
    const button = page.getByRole("link", { name: "Proceed to Payment" });
    await expect(button).toBeVisible();
    // Test hover state
    await button.hover();
    await expect(button).toHaveCSS("background-color", "rgb(117, 106, 241)");
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
