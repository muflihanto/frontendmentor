import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - [Blogr] Page", () => {
  /** Go to [Blogr] page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/blogr-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | [Blogr]");
  });

  /** Test if the page has a correct banner */
  test("has a banner", async ({ page }) => {
    const banner = page.getByRole("banner");
    await expect(
      banner.getByRole("heading", {
        level: 1,
        name: "A modern publishing platform",
      }),
    ).toBeVisible();
    await expect(
      banner.getByText("Grow your audience and build your online brand"),
    ).toBeVisible();
    await expect(
      banner.getByRole("link", { name: "Start for Free" }),
    ).toBeVisible();
    await expect(
      banner.getByRole("link", { name: "Learn More" }),
    ).toBeVisible();
  });

  /** Test if the page has top navigation bar */
  test("has top navigation bar", async ({ page }) => {
    const navItems = [
      {
        parent: "Product",
        children: [
          "Overview",
          "Pricing",
          "Marketplace",
          "Features",
          "Integrations",
        ],
      },
      {
        parent: "Company",
        children: ["About", "Team", "Blog", "Careers"],
      },
      {
        parent: "Connect",
        children: ["Contact", "Newsletter", "LinkedIn"],
      },
    ];
    const nav = page.getByRole("banner").locator("nav");
    await expect(nav).toBeInViewport();
    // has blogr logo
    await expect(nav.getByRole("img", { name: "Blogr Logo" })).toBeVisible();
    // has navigation links
    const navlinks = await nav.locator("ul summary").all();
    expect(navlinks).toHaveLength(3);
    for (const [index] of Object.entries(navlinks)) {
      const menu = page.locator("summary", {
        hasText: navItems[Number(index)].parent,
      });
      const details = page.locator("details", { has: menu });
      await expect(menu).toBeVisible();
      await expect(details).toBeVisible();
      await menu.click();
      await page.waitForTimeout(500);
      // collapsible menu works
      const menuitems = nav.getByText(
        navItems[Number(index)].children.join(""),
      );
      await expect(details).toHaveAttribute("open");
      await expect(menuitems).toBeVisible();
      await menu.click();
    }
    // has login link
    await expect(nav.getByRole("link", { name: "Login" })).toBeVisible();
    // has sign up link
    await expect(nav.getByRole("link", { name: "Sign Up" })).toBeVisible();
  });

  /** Test if the page has 'Designed for the future' section */
  test.describe("has 'Designed for the future' section", () => {
    test("section is visible", async ({ page }) => {
      await expect(page.locator("section").first()).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const section = page.locator("section").first();
      await section.scrollIntoViewIfNeeded();
      await expect(
        section.getByRole("heading", { name: "Designed for the future" }),
      ).toBeVisible();
      // Has illustration
      await expect(
        section.getByRole("img", { name: "Illustration Editor" }),
      ).toBeVisible();
      // has articles
      const articles = [
        {
          h3: "Introducing an extensible editor",
          p: "Blogr features an exceedingly intuitive interface which lets you focus on one thing: creating content. The editor supports management of multiple blogs and allows easy manipulation of embeds such as images, videos, and Markdown. Extensibility with plugins and themes provide easy ways to add functionality or change the looks of a blog.",
        },
        {
          h3: "Robust content management",
          p: "Flexible content management enables users to easily move through posts. Increase the usability of your blog by adding customized categories, sections, format, or flow. With this functionality, you’re in full control.",
        },
      ];
      for (const article of articles) {
        await expect(
          section.getByRole("heading", { name: article.h3, level: 3 }),
        ).toBeVisible();
        await expect(section.getByText(article.p)).toBeVisible();
      }
    });
  });

  /** Test if the page has 'State of the Art Infrastructure' section */
  test.describe("has 'State of the Art Infrastructure' section", () => {
    test("section is visible", async ({ page }) => {
      await expect(page.locator("section").nth(1)).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const section = page.locator("section").nth(1);
      await section.scrollIntoViewIfNeeded();
      await expect(
        section.getByRole("heading", {
          name: "State of the Art Infrastructure",
        }),
      ).toBeVisible();
      // Has illustration
      await expect(
        section.getByRole("img", { name: "Illustration Phone" }),
      ).toBeVisible();
      // has article;
      await expect(
        section.getByText(
          "With reliability and speed in mind, worldwide data centers provide the backbone for ultra-fast connectivity. This ensures your site will load instantly, no matter where your readers are, keeping your site competitive.",
        ),
      ).toBeVisible();
    });
  });
});
