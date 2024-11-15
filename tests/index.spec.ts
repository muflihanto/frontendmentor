import { test, expect } from "@playwright/test";
import pages from "../docs/data.json";

test.describe("FrontendMentor index page", () => {
  /** Go to index page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/home \| frontendmentor/i);
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /muf\'s frontendmentor challenge solution/i,
      }),
    ).toBeVisible();
  });

  /** Test if the page display all the links */
  test("has list of links", async ({ page }) => {
    const links = page.getByRole("link");

    for (const pg of pages) {
      await expect(links.getByText(pg.name, { exact: true })).toHaveAttribute(
        "href",
        `/${pg.path}`,
      );
    }

    await expect(links).toHaveCount(pages.length * 2 + 1);
  });

  /** Test if the page has link filter input box */
  test("has filter input", async ({ page }) => {
    const input = page.locator("input");

    await expect(input).toBeVisible();
  });

  /** Test if the link filter input box works */
  test.describe("should be able to filter links", () => {
    /** Clear input box beforea each test */
    test.afterEach(async ({ page }) => {
      await page.getByRole("textbox").clear();
    });

    test("has 78 links that contain 'test'", async ({ page }) => {
      await page.getByRole("textbox").fill("test");
      const links = page.locator("ul").getByRole("link");
      await expect(links).toHaveCount(78);
    });

    test("has 46 links that contain 'page'", async ({ page }) => {
      await page.getByRole("textbox").fill("page");
      const links = page.locator("ul").getByRole("link");
      await expect(links).toHaveCount(46);
    });

    test("has 0 links that contain 'arbitrarystring'", async ({ page }) => {
      await page.getByRole("textbox").fill("arbitrarystring");
      const links = page.locator("ul").getByRole("link");
      await expect(links).toHaveCount(0);
    });
  });

  /** Test if theme switcher button works */
  test.describe("has theme switcher button", () => {
    test.describe("on light mode", () => {
      test.use({ colorScheme: "light" });

      /** Test if the button works on light mode */
      test("button works on light mode", async ({ page }) => {
        const img = page.locator("button img");
        const button = page.getByRole("button");
        await expect(img).toHaveAttribute("src", /moon-outline.svg$/);
        await button.click();
        await expect(img).toHaveAttribute("src", /moon.svg$/);
        await expect(page.locator("html")).toHaveClass("dark");
      });
    });

    test.describe("on dark mode", () => {
      test.use({ colorScheme: "dark" });

      /** Test if the button works on dark mode */
      test("button works on light mode", async ({ page }) => {
        const img = page.locator("button img");
        const button = page.getByRole("button");
        await expect(img).toHaveAttribute("src", /moon.svg$/);
        await button.click();
        await expect(img).toHaveAttribute("src", /moon-outline.svg$/);
        await expect(page.locator("html")).not.toHaveClass("dark");
      });
    });
  });
});
