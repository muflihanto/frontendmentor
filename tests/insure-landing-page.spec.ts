import { test, expect } from "@playwright/test";

test.describe("FrontendMentor Challenge - Insure landing Page", () => {
  /** Go to Insure landing page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/insure-landing-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Insure landing page");
  });

  /** Test if the page has a header*/
  test.describe("has a header", () => {
    test("header is visible", async ({ page }) => {
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.getByRole("banner")).toBeInViewport();
    });
    test("has all elements", async ({ page }) => {
      const header = page.getByRole("banner");
      // has an insure logo
      await expect(
        header.getByRole("img", { name: "insure logo" }),
      ).toBeVisible();
      // has a navigation links
      const nav = header.getByRole("navigation");
      const links = ["How we work", "Blog", "Account", "View plans"];
      for (const link of links) {
        await expect(nav.getByRole("link", { name: link })).toBeVisible();
      }
    });
  });

  /** Test if the page has a hero section*/
  test.describe("has a hero section", () => {
    test("hero section is visible", async ({ page }) => {
      const section = page.locator("div").nth(3);
      await expect(section).toBeVisible();
      await expect(section).toBeInViewport();
    });
    test("has all elements", async ({ page }) => {
      const section = page.locator("div").nth(3);
      // has a level 1 heading
      await expect(
        section.getByRole("heading", {
          level: 1,
          name: "Humanizing your insurance.",
        }),
      ).toBeVisible();
      // has a body text
      await expect(
        section.getByText(
          "Get your life insurance coverage easier and faster. We blend our expertise and technology to help you find the plan that’s right for you. Ensure you and your loved ones are protected.",
        ),
      ).toBeVisible();
      // has a "View Plans" link
      await expect(
        section.getByRole("link", { name: "View plans" }),
      ).toBeVisible();
      // has a hero image
      await expect(
        section.getByRole("img", {
          name: "Happy Family of 4 Holding Each Other's Hands",
        }),
      ).toBeVisible();
    });
  });

  /** Test if the page has a 'We’re different' section*/
  test.describe("has a 'We’re different' section", () => {
    test("section is visible", async ({ page }) => {
      await expect(page.locator("section").first()).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const section = page.locator("section").first();
      await section.scrollIntoViewIfNeeded();
      const elements = [
        {
          h2: "Snappy Process",
          p: "Our application process can be completed in minutes, not hours. Don’t get stuck filling in tedious forms.",
        },
        {
          h2: "Affordable Prices",
          p: "We don’t want you worrying about high monthly costs. Our prices may be low, but we still offer the best coverage possible.",
        },
        {
          h2: "People First",
          p: "Our plans aren’t full of conditions and clauses to prevent payouts. We make sure you’re covered when you need it.",
        },
      ];
      // has a heading
      await expect(
        section.getByRole("heading", {
          name: "We’re different",
        }),
      ).toBeVisible();
      // has all features
      const containers = await section.locator(">div>div").all();
      for (const [index, container] of Object.entries(containers)) {
        await expect(
          container.getByRole("heading", { name: elements[Number(index)].h2 }),
        ).toBeVisible();
        await expect(
          container.getByText(elements[Number(index)].p),
        ).toBeVisible();
      }
    });
  });

  /** Test if the page has a 'how we work' section*/
  test.describe("has a 'how we work' section", () => {
    test("section is visible", async ({ page }) => {
      await expect(page.locator("div").nth(12)).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const section = page.locator("div").nth(12);
      await section.scrollIntoViewIfNeeded();
      // has a heading
      await expect(
        section.getByRole("heading", {
          name: "Find out more about how we work",
        }),
      ).toBeVisible();
      // has a link
      await expect(
        section.getByRole("link", { name: "How we work" }),
      ).toBeVisible();
    });
  });

  /** Test if the page has a footer*/
  test.describe("has a footer", () => {
    test("footer is visible", async ({ page }) => {
      await expect(page.getByRole("contentinfo")).toBeVisible();
    });
    test("has all elements", async ({ page }) => {
      const footer = page.getByRole("contentinfo");
      await footer.scrollIntoViewIfNeeded();
      // has a logo
      await expect(
        footer.getByRole("img", { name: "insure logo" }),
      ).toBeVisible();
      // has navigation links
      const navigations = await footer
        .getByRole("navigation")
        .locator(">div")
        .all();
      const links = [
        {
          parent: "Our company",
          links: ["How we work", "Why Insure?", "Check Price", "Reviews"],
        },
        {
          parent: "Help me",
          links: ["FAQ", "Terms of use", "Privacy policy", "Cookies"],
        },
        {
          parent: "Contact",
          links: ["Sales", "Support", "Live chat"],
        },
        {
          parent: "Others",
          links: ["Careers", "Press", "Licenses"],
        },
      ];
      for (const [index, nav] of Object.entries(navigations)) {
        await expect(
          nav.getByRole("heading", { name: links[Number(index)].parent }),
        ).toBeVisible();
        for (const link of links[Number(index)].links) {
          await expect(nav.getByRole("link", { name: link })).toBeVisible();
        }
      }
      // has attribution
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
      await expect(button).not.toHaveAttribute("aria-controls", "mobilemenu");
      await button.click();
      await page.waitForTimeout(500);
      await expect(button).toHaveAttribute("aria-expanded", "true");
      await expect(button).toHaveAttribute("aria-controls", "mobilemenu");
      const nav = header.getByRole("navigation");
      const links = ["How we work", "Blog", "Account", "View plans"];
      await expect(nav).toBeVisible();
      await expect(nav).toBeInViewport();
      for (const link of links) {
        await expect(nav.getByRole("link", { name: link })).toBeVisible();
        await expect(nav.getByRole("link", { name: link })).toBeInViewport();
      }
      await button.click();
      await page.waitForTimeout(500);
      await expect(button).toHaveAttribute("aria-expanded", "false");
      await expect(button).not.toHaveAttribute("aria-controls", "mobilemenu");
      await expect(nav).not.toBeVisible();
      await expect(nav).not.toBeInViewport();
    });
  });
});
