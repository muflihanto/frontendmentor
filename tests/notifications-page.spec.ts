import { test, expect } from "@playwright/test";
import { notifications } from "../components/notifications-page/Main";
import AxeBuilder from "@axe-core/playwright";

test.describe("FrontendMentor Challenge - Notifications Page", () => {
  /** Go to notifications page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/notifications-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/notifications page/i);
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Notifications",
      }),
    ).toBeVisible();
  });

  /** Test if the page has unread notifications indicator */
  test.describe("has unread notifications indicator", () => {
    test("indicator is visible", async ({ page }) => {
      const count = page.locator("header div");
      await expect(count).toBeVisible();
    });

    test("indicator has correct text and aria-label", async ({ page }) => {
      await expect(page.locator("header div")).toContainText("3");
      await expect(page.locator("header div")).toHaveAccessibleName(
        "You have 3 new notifications",
      );
    });
  });

  /** Test if the page has "mark all as read" button */
  test('has "mark all as read" button', async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Mark all as read" }),
    ).toBeVisible();
  });

  /** Test if the page has all initial notifications */
  test.describe("has initial notifications", () => {
    test("has correct total notifications", async ({ page }) => {
      const notificationContainer = page.getByLabel("Notifications list");
      await expect(notificationContainer).toBeVisible();
      const allnotifications = await notificationContainer
        .getByRole("listitem")
        .all();
      expect(allnotifications).toHaveLength(notifications.length);
    });

    test("has new notification indicator", async ({ page }) => {
      const allnotifications = page.getByRole("listitem");
      const newnotifications = allnotifications.filter({
        has: page.locator("span.bg-notif-primary-red"),
      });
      await expect(newnotifications).toHaveCount(
        notifications.filter((el) => el.isNew).length,
      );
    });
  });

  /** Test if "mark all as read" button works */
  test('"mark all as read" button works', async ({ page }) => {
    const button = page.getByRole("button", { name: "Mark all as read" });
    const indicator = page.locator("header div");
    await expect(indicator).toHaveText("3");
    await expect(indicator).toHaveAccessibleName(
      "You have 3 new notifications",
    );
    await button.click();
    await expect(indicator).toHaveText("0");
    await expect(indicator).toHaveAccessibleName(
      "You have 0 new notifications",
    );
  });

  /** Test if links change color on hover */
  test("links change color on hover", async ({ page }) => {
    const links = page.getByRole("listitem").getByRole("link");

    for (const link of await links.all()) {
      // Get initial color
      const initialColor = await link.evaluate(
        (el) => window.getComputedStyle(el).color,
      );

      // Hover over the link
      await link.hover();

      // Get hover color
      const hoverColor = await link.evaluate(
        (el) => window.getComputedStyle(el).color,
      );

      // Verify color changed (except for group links which shouldn't change)
      const textContent = await link.textContent();
      if (textContent !== "" && !textContent?.includes("Chess Club")) {
        expect(initialColor).not.toBe(hoverColor);
      } else {
        expect(initialColor).toBe(hoverColor);
      }
    }
  });

  /** Test if the page has correct footer */
  test.describe("has correct footer", () => {
    test("footer is visible", async ({ page }) => {
      await expect(page.getByRole("contentinfo")).toBeVisible();
    });
    test("footer has 2 links", async ({ page }) => {
      const footer = page.getByRole("contentinfo");
      const links = footer.getByRole("link");

      await expect(links).toHaveCount(2);

      for (const [text, href] of [
        ["Frontend Mentor", "https://www.frontendmentor.io?ref=challenge"],
        ["Muflihanto", "https://github.com/muflihanto"],
      ]) {
        await expect(links.getByText(text)).toHaveAttribute("href", href);
      }
    });
  });

  /** Test if the page has responsive layout */
  test.describe("has responsive layout", () => {
    /** Test if the page layout is correct on mobile view */
    test("page layout is correct on mobile view", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page.locator("main")).toHaveCSS("padding-left", "16px");
      await expect(page.locator("main")).toHaveCSS("padding-right", "16px");
    });

    /** Test if the page layout is correct on desktop view */
    test("page layout is correct on desktop view", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 800 });
      await expect(page.locator("main")).toHaveCSS("max-width", "730px");
      await expect(page.locator("main")).toHaveCSS("margin-left", "355px");
      await expect(page.locator("main")).toHaveCSS("margin-right", "355px");
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
