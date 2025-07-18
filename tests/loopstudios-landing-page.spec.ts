import { test, expect, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const hasBefore = async (element: Locator) =>
  await element.evaluate((el) => {
    const beforeStyle = window.getComputedStyle(el, "::before");
    return beforeStyle.content !== "none" && beforeStyle.content !== "";
  });

test.describe("FrontendMentor Challenge - Loopstudios landing Page", () => {
  /** Go to Loopstudios landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/loopstudios-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Loopstudios landing page",
    );
  });

  /** Test if the page has a correct header */
  test.describe("has a header", () => {
    test("header is visible", async ({ page }) => {
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("header")).toBeInViewport();
    });
    test("has a logo", async ({ page }) => {
      await expect(
        page
          .locator("header")
          .getByRole("img", { name: "Loopstudios Logo", exact: true }),
      ).toBeVisible();
    });
    test("has a nav", async ({ page }) => {
      const header = page.locator("header");
      const links = ["About", "Careers", "Events", "Products", "Support"];
      const nav = header.getByText(links.join(""));
      await expect(nav).toBeVisible();
      for (const link of links) {
        const linkElement = nav.getByRole("menuitem", { name: link });
        await expect(linkElement).toBeVisible();
        expect(await hasBefore(linkElement.locator(".."))).toBeFalsy();
        await linkElement.hover();
        expect(await hasBefore(linkElement.locator(".."))).toBeTruthy();
      }
    });
  });

  test.describe("has a hero section", () => {
    /** Test if the page has a correct heading */
    test("has a heading", async ({ page }) => {
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "Immersive experiences that deliver",
        }),
      ).toBeVisible();
    });
  });

  /** Test if the page has an 'Interactive' section */
  test.describe("has an 'Interactive' section", () => {
    test("section is visible", async ({ page }) => {
      await expect(page.locator("div").nth(5)).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const section = page.locator("div").nth(5);
      await section.scrollIntoViewIfNeeded();
      // has an illustration
      await expect(
        section.getByRole("img", { name: "A Man Playing Game With VR" }),
      ).toBeVisible();
      // has a heading
      await expect(
        section.getByRole("heading", { name: "The leader in interactive VR" }),
      ).toBeVisible();
      // has a text
      await expect(
        section.getByText(
          "Founded in 2011, Loopstudios has been producing world-class virtual reality projects for some of the best companies around the globe. Our award-winning creations have transformed businesses through digital experiences that bind to their brand.",
        ),
      ).toBeVisible();
    });
  });

  /** Test if the page has an 'Our creations' section */
  test.describe("has an 'Our creations' section", () => {
    test("section is visible", async ({ page }) => {
      await expect(page.locator("div").nth(8)).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const section = page.locator("div").nth(8);
      await section.scrollIntoViewIfNeeded();
      const creations = [
        "Deep earth",
        "Night arcade",
        "Soccer team VR",
        "The grid",
        "From up above VR",
        "Pocket borealis",
        "The curiosity",
        "Make it fisheye",
      ];
      // has a correct heading
      await expect(
        section.getByRole("heading", { name: "Our creations" }),
      ).toBeVisible();
      // has a 'See All' link
      const seeAllButton = section.getByRole("link", { name: "See All" });
      await expect(seeAllButton).toBeVisible();
      await expect(seeAllButton).toHaveCSS(
        "background-color",
        "rgba(0, 0, 0, 0)",
      );
      await expect(seeAllButton).toHaveCSS("color", "rgb(0, 0, 0)");
      await seeAllButton.hover();
      await expect(seeAllButton).toHaveCSS("color", "rgb(255, 255, 255)");
      await expect(seeAllButton).toHaveCSS("background-color", "rgb(0, 0, 0)");
      expect(await section.getByRole("link").all()).toHaveLength(
        creations.length + 1,
      );
      // has all creation images
      for (const name of creations) {
        const link = section.getByRole("link", { name });
        await expect(link).toBeVisible();
        await expect(link).toHaveCSS(
          "background-image",
          "linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))",
        );
        await expect(link).toHaveCSS("color", "rgba(255, 255, 255, 0.75)");
        await link.hover();
        await page.waitForTimeout(1000);
        await expect(link).toHaveCSS(
          "background-image",
          "linear-gradient(to top, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75))",
        );
        await expect(link).toHaveCSS("color", "rgb(0, 0, 0)");
      }
    });
  });

  /** Test if the page has a footer */
  test.describe("has a footer", () => {
    test("section is visible", async ({ page }) => {
      await expect(page.locator("footer")).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const footer = page.getByRole("contentinfo");
      await footer.scrollIntoViewIfNeeded();
      // has loopstudios logo
      await expect(
        footer.getByRole("img", { name: "Loopstudios logo", exact: true }),
      ).toBeVisible();
      // has navigation links
      const navLinks = ["About", "Careers", "Events", "Products", "Support"];
      const nav = footer.locator("ul").nth(0);
      for (const name of navLinks) {
        const linkElement = nav.getByRole("link", { name });
        await expect(linkElement).toBeVisible();
        expect(await hasBefore(linkElement.locator(".."))).toBeFalsy();
        await linkElement.hover();
        expect(await hasBefore(linkElement.locator(".."))).toBeTruthy();
      }
      // has sns links
      const socials = [
        "facebook",
        "twitter",
        "pinterest",
        "instagram",
      ] as const;
      const snss = await footer.locator("ul").nth(1).locator("a").all();
      expect(snss).toHaveLength(socials.length);
      for (const sns of snss) {
        await expect(sns).toBeVisible();
        await expect(sns.locator("svg")).toBeVisible();
        expect(await hasBefore(sns.locator(".."))).toBeFalsy();
        await sns.hover();
        expect(await hasBefore(sns.locator(".."))).toBeTruthy();
      }
      // has attribution
      await expect(
        footer.getByText("© 2021 Loopstudios. All rights reserved."),
      ).toBeVisible();
      await expect(
        footer.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
      ).toBeVisible();
    });
  });

  /** Test if the page has a mobile menu*/
  test.describe("has a mobile menu", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test("button is visible", async ({ page }) => {
      const button = page.getByRole("banner").getByRole("button");
      await expect(button).toBeVisible();
      await expect(button).toBeInViewport();
    });
    test("menu button works", async ({ page }) => {
      const header = page.getByRole("banner");
      const button = header.getByRole("button");
      await expect(button).toBeVisible();
      await expect(button).toHaveAttribute("aria-haspopup", "true");
      await expect(button).toHaveAttribute("aria-expanded", "false");
      await expect(button).toHaveAttribute("aria-controls", "menu");
      await button.click();
      await page.waitForTimeout(500);
      const nav = header.getByRole("navigation");
      const links = ["About", "Careers", "Events", "Products", "Support"];
      await expect(nav).toBeVisible();
      await expect(nav).toBeInViewport();
      await expect(button).toHaveAttribute("aria-expanded", "true");
      for (const link of links) {
        await expect(nav.getByRole("menuitem", { name: link })).toBeVisible();
        await expect(
          nav.getByRole("menuitem", { name: link }),
        ).toBeInViewport();
        // FIXME: nav link text is black in playwright test ui
      }
      await button.click();
      await page.waitForTimeout(500);
      await expect(nav).not.toBeVisible();
      await expect(nav).not.toBeInViewport();
      await expect(button).toHaveAttribute("aria-expanded", "false");
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
