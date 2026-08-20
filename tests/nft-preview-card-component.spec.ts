import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("FrontendMentor Challenge - NFT preview card component Page", () => {
  /** Go to NFT preview card component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/nft-preview-card-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | NFT preview card component",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    const heading = page.getByRole("heading", {
      level: 1,
      name: "Equilibrium #3429",
    });
    await expect(heading).toBeVisible();
    const defaultColor = await heading.evaluate(
      (el) => getComputedStyle(el).color,
    );
    await heading.hover();
    await expect
      .poll(async () => heading.evaluate((el) => getComputedStyle(el).color))
      .not.toEqual(defaultColor);
    await expect(heading).toHaveCSS("cursor", "pointer");
  });

  /** Test if the page has a header image */
  test("has a header image", async ({ page }) => {
    await expect(page.getByAltText("Equilibrium Image")).toBeVisible();
  });

  /** Test if the page has description text */
  test("has description", async ({ page }) => {
    await expect(
      page.getByText("Our Equilibrium collection promotes balance and calm."),
    ).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  /** Test if the page has correct nft product summary */
  test("has summary", async ({ page }) => {
    const summary = page.getByText("0.041 ETH3 days left");
    await expect(summary).toBeVisible();
  });

  /** Test if the page has correct creator info */
  test.describe("has creator info", () => {
    test("has creator avatar", async ({ page }) => {
      const avatar = page.getByRole("img", { name: "Jules Wyvern Avatar" });
      await expect(avatar).toBeVisible();
      await expect(avatar).toHaveAttribute("src", /image-avatar\.png/);
    });

    test("has creator name", async ({ page }) => {
      const creator = page
        .locator("p")
        .filter({ hasText: "Creation ofJules Wyvern" });
      await expect(creator).toBeVisible();
      const name = creator.locator("span").filter({ hasText: "Jules Wyvern" });
      const defaultColor = await name.evaluate(
        (el) => getComputedStyle(el).color,
      );
      await name.hover();
      await expect
        .poll(async () => name.evaluate((el) => getComputedStyle(el).color))
        .not.toEqual(defaultColor);
      await expect(name).toHaveCSS("cursor", "pointer");
    });
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
