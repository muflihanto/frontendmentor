import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("FrontendMentor Challenge - Blog preview card Page", () => {
  /** Go to Blog preview card page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/blog-preview-card");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Blog preview card");
  });

  /** Test if the page has a correct illustration */
  test("has a correct illustration", async ({ page }) => {
    const image = page.getByTestId("blog-illustration");
    await expect(image).toBeVisible();
  });

  /** Test if the page has correct author info */
  test("has correct author info", async ({ page }) => {
    const avatar = page.getByTestId("author-avatar");
    const name = page.getByTestId("author-name");
    await expect(avatar).toBeVisible();
    await expect(name).toBeVisible();
    await expect(name).toHaveText("Greg Hooper");
  });

  /** Test if the page has a heading */
  test("has a heading", async ({ page }) => {
    const heading = page.getByRole("heading", {
      level: 1,
      name: "HTML & CSS foundations",
    });
    await expect(heading).toBeVisible();
  });

  /** Test hover states for interactive elements */
  test("hover states", async ({ page }) => {
    const main = page.getByTestId("blog-card");
    const headingLink = page.getByTestId("blog-heading-link");
    const defaultColor = await headingLink.evaluate(
      (el) => getComputedStyle(el).color,
    );
    const defaultFilter = await main.evaluate(
      (el) => getComputedStyle(el).filter,
    );
    await headingLink.hover();
    await expect
      .poll(async () =>
        headingLink.evaluate((el) => getComputedStyle(el).color),
      )
      .not.toEqual(defaultColor);
    await expect
      .poll(async () => main.evaluate((el) => getComputedStyle(el).filter))
      .not.toEqual(defaultFilter);
  });

  /** Test if hovering non-link card areas does not change the shadow */
  test("background hover does not change shadow", async ({ page }) => {
    const main = page.getByTestId("blog-card");
    const defaultFilter = await main.evaluate(
      (el) => getComputedStyle(el).filter,
    );
    await page.getByText("Published 21 Dec 2023").hover();
    /** Wait past the transition duration before asserting no change */
    await page.waitForTimeout(300);
    expect(await main.evaluate((el) => getComputedStyle(el).filter)).toEqual(
      defaultFilter,
    );
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(page.getByText("Challenge by Frontend Mentor")).toBeVisible();
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
