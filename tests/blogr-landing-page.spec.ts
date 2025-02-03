import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - [Blogr] Page", () => {
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
    const nav = page.getByRole("banner").locator("nav");
    await expect(nav).toBeInViewport();
    // has blogr logo
    await expect(nav.getByRole("img", { name: "Blogr Logo" })).toBeVisible();
    // has navigation links
    const navlinks = await nav.getByRole("menubar").locator(">li").all();
    expect(navlinks).toHaveLength(3);
    for (const [index] of Object.entries(navlinks)) {
      const group = navItems[Number(index)].parent;
      const menu = page.getByRole("menuitem", {
        name: group,
      });
      await expect(menu).toHaveAttribute("aria-haspopup", "true");
      await expect(menu).toHaveAttribute("aria-expanded", "false");
      await expect(menu).toBeVisible();
      await menu.click();
      await page.waitForTimeout(100);
      // collapsible menu works
      const popup = nav.getByLabel(group);
      await expect(menu).toHaveAttribute("aria-expanded", "true");
      await expect(popup).toBeVisible();
      for (const item of navItems[Number(index)].children) {
        await expect(popup.getByRole("menuitem", { name: item })).toBeVisible();
      }
      await menu.click();
      await expect(menu).toHaveAttribute("aria-expanded", "false");
    }
    // has login link
    await expect(nav.getByRole("link", { name: "Login" })).toBeVisible();
    // has sign up link
    await expect(nav.getByRole("link", { name: "Sign Up" })).toBeVisible();
  });

  /** Test if can navigate navbar using keyboard */
  test("can navigate navbar using keyboard", async ({ page }) => {
    const nav = page.getByRole("banner").locator("nav");
    for (const [index, item] of Object.entries(navItems)) {
      const parentLink = nav.getByRole("menuitem", { name: item.parent });
      const nextLink = nav.getByRole("menuitem", {
        name: navItems[(Number(index) + 1) % navItems.length].parent,
      });
      await expect(parentLink).toBeVisible();
      await expect(nextLink).toBeVisible();
      await expect(nextLink).not.toBeFocused();
      await parentLink.focus();
      await expect(parentLink).toBeFocused();
      await page.keyboard.down("ArrowRight");
      await expect(parentLink).not.toBeFocused();
      await expect(nextLink).toBeFocused();
      await page.keyboard.down("ArrowLeft");
      await expect(parentLink).toBeFocused();
      await expect(nextLink).not.toBeFocused();
      const popup = nav.getByLabel(item.parent);
      await expect(popup).not.toBeVisible();
      await expect(parentLink).toHaveAttribute("aria-expanded", "false");
      await page.keyboard.down("ArrowDown");
      await expect(popup).toBeVisible();
      await expect(popup.getByRole("menuitem").first()).toBeFocused();
      await expect(parentLink).toHaveAttribute("aria-expanded", "true");
      await page.keyboard.down("Escape");
      await expect(popup).not.toBeVisible();
      await expect(parentLink).toHaveAttribute("aria-expanded", "false");
      await page.keyboard.down(" ");
      await expect(popup).toBeVisible();
      await expect(popup.getByRole("menuitem").first()).toBeFocused();
      await expect(parentLink).toHaveAttribute("aria-expanded", "true");
      await page.keyboard.down("Escape");
      await expect(popup).not.toBeVisible();
      await expect(parentLink).toHaveAttribute("aria-expanded", "false");
      await page.keyboard.down("Enter");
      await expect(popup).toBeVisible();
      await expect(parentLink).toHaveAttribute("aria-expanded", "true");
      await expect(popup.getByRole("menuitem").first()).toBeFocused();
      await page.keyboard.down("ArrowDown");
      await expect(popup.getByRole("menuitem").nth(1)).toBeFocused();
      await page.keyboard.down("ArrowUp");
      await expect(popup.getByRole("menuitem").first()).toBeFocused();
      await page.keyboard.down("Escape");
      await expect(popup).not.toBeVisible();
      await expect(parentLink).toHaveAttribute("aria-expanded", "false");
    }
    await page.keyboard.down("Home");
    await expect(
      nav.getByRole("menuitem", { name: "Product White Arrow Icon" }),
    ).toBeFocused();
    await page.keyboard.down("End");
    await expect(
      nav.getByRole("menuitem", { name: "Connect White Arrow Icon" }),
    ).toBeFocused();
    await page.keyboard.down("PageUp");
    await expect(
      nav.getByRole("menuitem", { name: "Product White Arrow Icon" }),
    ).toBeFocused();
    await page.keyboard.down("PageDown");
    await expect(
      nav.getByRole("menuitem", { name: "Connect White Arrow Icon" }),
    ).toBeFocused();
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

  /** Test if the page has 'Other features' section */
  test.describe("has 'Other features' section", () => {
    test("section is visible", async ({ page }) => {
      await expect(page.locator("section").nth(2)).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const section = page.locator("section").nth(2);
      await section.scrollIntoViewIfNeeded();
      // Has illustration
      await expect(
        section.getByRole("img", { name: "Illustration Laptop" }),
      ).toBeVisible();
      // has articles
      const articles = [
        {
          h3: "Free, open, simple",
          p: "Blogr is a free and open source application backed by a large community of helpful developers. It supports features such as code syntax highlighting, RSS feeds, social media integration, third-party commenting tools, and works seamlessly with Google Analytics. The architecture is clean and is relatively easy to learn.",
        },
        {
          h3: "Powerful tooling",
          p: "Batteries included. We built a simple and straightforward CLI tool that makes customization and deployment a breeze, but capable of producing even the most complicated sites.",
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

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
    // has a blogr logo
    await expect(footer.getByRole("img", { name: "Blogr Logo" })).toBeVisible();
    // has navigation links
    const navs = await footer.getByRole("navigation").all();
    for (const [index, nav] of Object.entries(navs)) {
      await expect(nav).toBeVisible();
      await expect(
        nav.getByRole("heading", { name: navItems[Number(index)].parent }),
      ).toBeVisible();
      for (const name of navItems[Number(index)].children) {
        await expect(nav.getByRole("link", { name })).toBeVisible();
      }
    }
    // has attribution
    await expect(
      footer.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  /** Test if the page displayed correctly on mobile */
  test.describe("displayed correctly on mobile", () => {
    test.use({ viewport: { height: 667, width: 375 }, hasTouch: true });

    test("has mobile navigation menu", async ({ page }) => {
      const header = page.getByRole("banner");
      const menuButton = header.getByRole("button", { name: "Menu" });
      await expect(menuButton).toBeVisible();
      await menuButton.tap();
      const navContainer = header.locator("div").filter({
        hasText:
          "ProductOverviewPricingMarketplaceFeaturesIntegrationsCompanyAboutTeamBlogCareers",
      });
      const login = navContainer.getByRole("link", { name: "Login" });
      const signUp = navContainer.getByRole("link", { name: "Sign Up" });
      await expect(navContainer).toBeVisible();
      for (const nav of navItems) {
        const parent = navContainer.getByRole("menuitem", { name: nav.parent });
        await expect(parent).toBeVisible();
        for (const item of nav.children) {
          await expect(
            navContainer.getByRole("menuitem", { name: item }),
          ).not.toBeVisible();
        }
        await parent.tap();
        for (const item of nav.children) {
          await expect(
            navContainer.getByRole("menuitem", { name: item }),
          ).toBeVisible();
        }
        await parent.tap();
      }
      await expect(login).toBeVisible();
      await expect(signUp).toBeVisible();
      await menuButton.tap();
      await expect(navContainer).not.toBeVisible();
      for (const nav of navItems) {
        await expect(
          navContainer.getByRole("menuitem", { name: nav.parent }),
        ).not.toBeVisible();
      }
      await expect(login).not.toBeVisible();
      await expect(signUp).not.toBeVisible();
    });
  });
});
