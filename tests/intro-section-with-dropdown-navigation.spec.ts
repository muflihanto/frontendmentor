import { test, expect, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Helper function to test hover effect on a given locator.
 * @param {Locator} locator - The locator of the element to test.
 * @param {string} initialColor - The expected initial color of the element (in RGB format).
 * @param {string} hoverColor - The expected color of the element after hover (in RGB format).
 */
async function testHoverEffect(
  locator: Locator,
  initialColor: string,
  hoverColor: string,
): Promise<void> {
  await locator.waitFor({ state: "visible", timeout: 5000 });
  const computedInitialColor = await locator.evaluate((el) => {
    return window.getComputedStyle(el).color;
  });
  expect(computedInitialColor).toBe(initialColor);
  await locator.hover({ timeout: 5000 });
  const computedHoverColor = await locator.evaluate((el) => {
    return window.getComputedStyle(el).color;
  });
  expect(computedHoverColor).toBe(hoverColor);
}

test.describe("FrontendMentor Challenge - Intro section with dropdown navigation Page", () => {
  const listItems = [
    {
      parent: "Features",
      children: ["Todo List", "Calendar", "Reminders", "Planning"],
    },
    { parent: "Company", children: ["History", "Our Team", "Blog"] },
    { parent: "Careers" },
    { parent: "About" },
  ];

  /** Go to Intro section with dropdown navigation page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/intro-section-with-dropdown-navigation");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Intro section with dropdown navigation",
    );
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header.getByRole("img").first()).toBeVisible();
    const nav = header.getByRole("navigation");
    for (const listItem of listItems) {
      if (listItem.children !== undefined) {
        await expect(
          nav.locator("summary").filter({ hasText: listItem.parent }),
        ).toBeVisible();
      } else {
        await expect(
          nav.locator("li").filter({ hasText: listItem.parent }),
        ).toBeVisible();
      }
    }
    const links = ["Login", "Register"];
    for (const link of links) {
      await expect(nav.getByRole("link", { name: link })).toBeVisible();
    }
  });

  /** Test if the dropdown menu works */
  test("dropdown menu works", async ({ page }) => {
    const nav = page.getByRole("banner").getByRole("navigation");
    const baseColor = "rgb(105, 105, 105)";
    const hoveredColor = "rgb(20, 20, 20)";
    for (const listItem of listItems) {
      if (listItem.children !== undefined) {
        const menu = nav
          .locator("summary")
          .filter({ hasText: listItem.parent });
        await expect(menu).toBeVisible();

        // Test click on parent
        const computedInitialColor = await menu
          .locator("span")
          .first()
          .evaluate((el) => {
            return window.getComputedStyle(el).color;
          });
        expect(computedInitialColor).toBe(baseColor);
        await menu.click();
        await expect(page.getByText(listItem.children.join(""))).toBeVisible();
        const computedGroupOpenColor = await menu
          .locator("span")
          .first()
          .evaluate((el) => {
            return window.getComputedStyle(el).color;
          });
        expect(computedGroupOpenColor).toBe(hoveredColor);

        // Test hover on children
        for (const item of listItem.children) {
          const itemLink = page.getByRole("menuitem", { name: item });
          await testHoverEffect(itemLink, baseColor, hoveredColor);
        }
      } else {
        const menu = nav.getByRole("menuitem", { name: listItem.parent });
        await testHoverEffect(menu, baseColor, hoveredColor);
      }
    }
  });

  /** Test if the page has a main content */
  test("has a main content", async ({ page }) => {
    const container = page.getByRole("main");
    await expect(
      container.getByRole("heading", {
        level: 1,
        name: "Make remote work",
      }),
    ).toBeVisible();
    await expect(
      container.getByText(
        "Get your team in sync, no matter your location. Streamline processes, create tea",
      ),
    ).toBeVisible();
    await expect(
      container.getByRole("button", { name: "Learn more" }),
    ).toBeVisible();
    const clientContainer = container.locator(">*").last();
    const clients = ["Databiz", "Audiophile", "Meet", "Maker"];
    for (const client of clients) {
      await expect(
        clientContainer.getByRole("img", { name: client }),
      ).toBeVisible();
    }
  });

  /** Test if the page has a hero image */
  test("has a hero image", async ({ page }) => {
    await expect(page.getByRole("img", { name: "Hero Image" })).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  /** Test if the page displayed correctly on mobile */
  test.describe("displayed correctly on mobile", () => {
    test.use({ viewport: { height: 667, width: 375 } });

    test("has mobile navigation menu", async ({ page }) => {
      const header = page.getByRole("banner");
      await expect(header.getByRole("button")).toBeVisible();
    });

    test("mobile navigation menu works", async ({ page }) => {
      const header = page.getByRole("banner");
      const menuButton = header.getByRole("button");
      const navContainer = page.locator("id=mobilenavmenu");
      await expect(menuButton).toBeVisible();
      await expect(menuButton).toHaveAttribute("aria-haspopup", "true");
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
      await expect(menuButton).toHaveAttribute(
        "aria-controls",
        "mobilenavmenu",
      );
      await expect(navContainer).not.toBeVisible();
      for (const link of listItems) {
        if (!link.children) {
          await expect(
            header.getByRole("menuitem", { name: link.parent }),
          ).not.toBeVisible();
        } else {
          for (const child of link.children) {
            await expect(
              header.getByRole("menuitem", { name: child }),
            ).not.toBeVisible();
          }
        }
      }
      await menuButton.click();
      await expect(menuButton).toHaveAttribute("aria-expanded", "true");
      await expect(navContainer).toBeVisible();
      for (const link of listItems) {
        if (!link.children) {
          await expect(
            navContainer.getByRole("menuitem", { name: link.parent }),
          ).toBeVisible();
        } else {
          const parent = navContainer.locator("summary", {
            hasText: link.parent,
          });
          const submenu = navContainer.getByRole("menu", { name: link.parent });
          await expect(parent).toBeVisible();
          await expect(submenu).not.toBeVisible();
          await parent.click();
          await expect(submenu).toBeVisible();
          for (const child of link.children) {
            await expect(
              submenu.getByRole("menuitem", { name: child }),
            ).toBeVisible();
          }
        }
      }
      await menuButton.click();
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
      await expect(navContainer).not.toBeVisible();
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
