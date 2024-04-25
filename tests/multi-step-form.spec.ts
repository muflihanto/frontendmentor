import { test, expect, type Page, type Locator } from "@playwright/test";

const pageUrl = "/multi-step-form";

test.describe("FrontendMentor Challenge - Multi-step form Page", () => {
  /** Go to Multi-step form page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto(pageUrl);
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Multi-step form");
  });

  /** Test if the page has a main card */
  test.describe("has a main card", () => {
    test.describe.configure({ mode: "serial" });

    let page: Page;
    let card: Locator;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(pageUrl);
    });

    test("card is visble", async () => {
      card = page.getByRole("main");
      await expect(card).toBeVisible();
      await expect(card).toBeInViewport();
    });
  });
});
