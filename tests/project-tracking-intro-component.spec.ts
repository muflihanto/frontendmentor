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
      const navLink = nav.getByRole("link", { name: link });
      await expect(navLink).toBeVisible();

      // Get initial text color
      const initialColor = await navLink.evaluate(
        (el) => window.getComputedStyle(el).color,
      );

      // Hover over the link
      await navLink.hover();

      // Verify hover state changes
      await expect(navLink).toHaveCSS("text-decoration-line", "underline");
      await expect(navLink).toHaveCSS("text-decoration-thickness", "2px");

      // For the "Login" link which has different styling
      if (link === "Login") {
        await expect(navLink).toHaveCSS("color", "rgb(160, 161, 172)"); // project-tracking-neutral-200
      } else {
        await expect(navLink).toHaveCSS("color", "rgb(36, 41, 66)"); // project-tracking-neutral-400
      }

      // Remove hover and verify it returns to normal
      await page.mouse.move(0, 0);
      await expect(navLink).toHaveCSS("color", initialColor);
    }
  });

  /** Test if the page has a main section */
  test("has a main section", async ({ page }) => {
    const section = page.locator("main");
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
    const demoLink = page.getByRole("link", { name: "Schedule a demo" });
    await expect(demoLink).toBeVisible();
    await expect(demoLink).toHaveCSS("background-color", "rgb(255, 92, 92)");
    await demoLink.hover();
    await expect(demoLink).toHaveCSS(
      "background-color",
      "rgba(255, 92, 92, 0.75)",
    );
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

    test("hero image is responsive", async ({ page }) => {
      // Test desktop view
      await page.setViewportSize({ width: 1440, height: 800 });
      const hero = page.getByRole("img", { name: "Illustration Devices" });
      await expect(hero).toBeVisible();
      const desktopSize = await hero.boundingBox();

      // Test mobile view
      await page.setViewportSize({ width: 375, height: 667 });
      const mobileSize = await hero.boundingBox();

      expect(desktopSize?.width).toBeGreaterThan(mobileSize?.width ?? 0);
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
