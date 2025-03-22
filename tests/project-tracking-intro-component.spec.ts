import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const navLinks = ["Product", "Features", "Pricing", "Login"];

test.describe("FrontendMentor Challenge - Project tracking intro component Page", () => {
  /** Go to Project tracking intro component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/project-tracking-intro-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Project tracking intro component",
    );
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    // has a logo
    await expect(header.getByRole("img")).toBeVisible();
    // has a navigation
    const nav = header.getByRole("navigation");
    for (const link of navLinks) {
      await expect(nav.getByRole("link", { name: link })).toBeVisible();
    }
  });

  /** Test if the page has a main section */
  test("has a main section", async ({ page }) => {
    const section = page.locator("div").nth(5);
    await expect(section.getByText("NewMonograph Dashboard")).toBeVisible();
    await expect(
      section.getByRole("heading", {
        level: 1,
        name: "Powerful insights into your team",
      }),
    ).toBeVisible();
    await expect(
      section.getByText("Project planning and time tracking for agile teams"),
    ).toBeVisible();
    await expect(
      section.getByRole("link", { name: "Schedule a demo" }),
    ).toBeVisible();
    await expect(section.getByText("to see a preview")).toBeVisible();
  });

  /** Test if the page has a hero image */
  test("has a hero image", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "Illustration Devices" }),
    ).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  /** Test if the page correctly rendered on mobile screen size */
  test.describe("correctly rendered on mobile screen size", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test("mobile menu visible", async ({ page }) => {
      const header = page.getByRole("banner");
      const menuButton = header.getByRole("button");
      await expect(menuButton).toBeVisible();
      await expect(menuButton).toHaveAttribute("aria-haspopup", "true");
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
      await expect(menuButton).not.toHaveAttribute("aria-controls");
      // nav is not visible
      const nav = header.getByRole("navigation");
      for (const link of navLinks) {
        await expect(nav.getByRole("link", { name: link })).not.toBeVisible();
      }
      await menuButton.click();
      await page.waitForTimeout(250);
      await expect(menuButton).toHaveAttribute("aria-expanded", "true");
      await expect(menuButton).toHaveAttribute("aria-controls", "menu");
      for (const link of navLinks) {
        await expect(nav.getByRole("link", { name: link })).toBeVisible();
      }
      await menuButton.click();
      await page.waitForTimeout(250);
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
      await expect(menuButton).not.toHaveAttribute("aria-controls");
      for (const link of navLinks) {
        await expect(nav.getByRole("link", { name: link })).not.toBeVisible();
      }
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
