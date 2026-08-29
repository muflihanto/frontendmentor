import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { huddleSocialLinks } from "../constants/huddle-social-links";

test.describe("FrontendMentor Challenge - Huddle landing page with single introductory section", () => {
  /** Go to Huddle landing page with single introductory section before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/huddle-landing-page-with-single-introductory-section");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Huddle landing page with single introductory section",
    );
  });

  /** Test if the page has a correct huddle logo */
  test("has a huddle logo", async ({ page }) => {
    const logo = page.getByTestId("logo");
    await expect(logo).toBeVisible();
    await expect(logo.getByRole("img", { name: "Huddle Logo" })).toBeVisible();
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(page.getByTestId("main-content")).toBeVisible();
    const heading = page.getByTestId("heading");
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("Build The Community Your Fans Will Love");
  });

  /** Test if the page has a correct body text */
  test("has a body text", async ({ page }) => {
    const description = page.getByTestId("description");
    await expect(description).toBeVisible();
    await expect(description).toContainText(
      "Huddle re-imagines the way we build communities.",
    );
  });

  /** Test if the page has a correct register link */
  test("has a register link", async ({ page }) => {
    const register = page.getByTestId("register-btn");
    await expect(register).toBeVisible();
    await expect(register).toHaveText("Register");
    const defaultColor = await register.evaluate(
      (el) => getComputedStyle(el).color,
    );
    const defaultBg = await register.evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    await register.hover();
    await expect
      .poll(async () => register.evaluate((el) => getComputedStyle(el).color))
      .not.toEqual(defaultColor);
    await expect
      .poll(async () =>
        register.evaluate((el) => getComputedStyle(el).backgroundColor),
      )
      .not.toEqual(defaultBg);
  });

  /** Test if the page has a correct mockup illustration */
  test("has a mockup illustration", async ({ page }) => {
    const mockup = page.getByTestId("mockup");
    await expect(mockup).toBeVisible();
    await expect(
      mockup.getByRole("img", { name: "Huddle Illustration Mockup" }),
    ).toBeVisible();
  });

  /** Test if the page has social media links */
  test("has social media links", async ({ page }) => {
    const container = page.getByTestId("social-links");
    await expect(container).toBeVisible();
    for (const { name } of huddleSocialLinks) {
      const link = page.getByTestId(`social-${name.toLowerCase()}`);
      await expect(link).toBeVisible();
      const svg = link.locator("svg");
      await expect(svg).toBeVisible();
      const box = await svg.boundingBox();
      expect(box).not.toBeNull();
      expect(box?.width).toBeGreaterThan(0);
      expect(box?.height).toBeGreaterThan(0);
      const defaultBorder = await link.evaluate(
        (el) => getComputedStyle(el).borderColor,
      );
      const defaultColor = await svg.evaluate(
        (el) => getComputedStyle(el).color,
      );
      await link.hover();
      await expect
        .poll(async () =>
          link.evaluate((el) => getComputedStyle(el).borderColor),
        )
        .not.toEqual(defaultBorder);
      await expect
        .poll(async () => svg.evaluate((el) => getComputedStyle(el).color))
        .not.toEqual(defaultColor);
    }
  });

  /** Test if the page has a correct footer */
  test("has a footer", async ({ page }) => {
    const footer = page.getByTestId("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText("Challenge by Frontend Mentor");
    const frontend = page.getByRole("link", { name: "Frontend Mentor" });
    await expect(frontend).toBeVisible();
    const defaultFrontendColor = await frontend.evaluate(
      (el) => getComputedStyle(el).color,
    );
    await frontend.hover();
    await expect
      .poll(async () => frontend.evaluate((el) => getComputedStyle(el).color))
      .not.toEqual(defaultFrontendColor);
    const github = page.getByRole("link", { name: "Muflihanto" });
    await expect(github).toBeVisible();
    const defaultGithubColor = await github.evaluate(
      (el) => getComputedStyle(el).color,
    );
    await github.hover();
    await expect
      .poll(async () => github.evaluate((el) => getComputedStyle(el).color))
      .not.toEqual(defaultGithubColor);
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
