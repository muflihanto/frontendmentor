import { test, expect } from "@playwright/test";

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
        await expect(nav.getByRole("link", { name: link })).toBeVisible();
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
      await expect(
        section.getByRole("link", { name: "See All" }),
      ).toBeVisible();
      expect(await section.getByRole("link").all()).toHaveLength(
        creations.length + 1,
      );
      // has all creation images
      for (const name of creations) {
        await expect(section.getByRole("link", { name })).toBeVisible();
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
        await expect(nav.getByRole("link", { name })).toBeVisible();
      }
      // has sns links
      const socials = [
        "facebook",
        "twitter",
        "pinterest",
        "instagram",
      ] as const;
      const snss = await footer.locator("ul").nth(1).locator("a svg").all();
      expect(snss).toHaveLength(socials.length);
      for (const sns of snss) {
        await expect(sns).toBeVisible();
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
});
