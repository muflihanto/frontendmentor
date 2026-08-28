import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { socialLinks } from "../constants/social-links-profile";

test.describe("FrontendMentor Challenge - Social links profile Page", () => {
  /** Go to Social links profile page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/social-links-profile");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Social links profile");
  });

  /** Test if the page has a main card */
  test("has a main card", async ({ page }) => {
    const card = page.getByTestId("profile-card");
    await expect(card).toBeVisible();
    await expect(page.getByTestId("profile-avatar")).toBeVisible();
    await expect(page.getByTestId("profile-name")).toBeVisible();
    await expect(page.getByTestId("profile-name")).toHaveText(
      "Jessica Randall",
    );
    await expect(page.getByTestId("profile-location")).toBeVisible();
    await expect(page.getByTestId("profile-location")).toHaveText(
      "London, United Kingdom",
    );
    await expect(page.getByTestId("profile-bio")).toBeVisible();
    await expect(page.getByTestId("social-links-list")).toBeVisible();
    // has social links
    for (const { name } of socialLinks) {
      const kebab = name.toLowerCase().replace(" ", "-");
      const link = page.getByTestId(`social-link-${kebab}`);
      await expect(link).toBeVisible();
      const defaultColor = await link.evaluate(
        (el) => getComputedStyle(el).color,
      );
      const defaultBackgroundColor = await link.evaluate(
        (el) => getComputedStyle(el).backgroundColor,
      );
      const defaultOutlineWidth = await link.evaluate(
        (el) => getComputedStyle(el).outlineWidth,
      );
      // Test hover state changes
      await link.hover();
      await expect
        .poll(async () => link.evaluate((el) => getComputedStyle(el).color))
        .not.toEqual(defaultColor);
      await expect
        .poll(async () =>
          link.evaluate((el) => getComputedStyle(el).backgroundColor),
        )
        .not.toEqual(defaultBackgroundColor);
      // Test focus state shows an outline
      await link.focus();
      await expect
        .poll(async () =>
          link.evaluate((el) => getComputedStyle(el).outlineWidth),
        )
        .not.toEqual(defaultOutlineWidth);
    }
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
