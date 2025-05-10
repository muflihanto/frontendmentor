import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("FrontendMentor Challenge - Article preview component Page", () => {
  /** Go to Article preview component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/article-preview-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Article preview component",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Shift the overall look and feel by adding these wonderful touches to furniture in your home",
      }),
    ).toBeVisible();
  });

  /** Test if the page has a correct article preview text */
  test("has article preview text", async ({ page }) => {
    await expect(
      page.getByText(
        "Ever been in a room and felt like something was missing? Perhaps it felt slightl",
      ),
    ).toBeVisible();
  });

  /** Test if the page has a correct article preview image */
  test("has article preview image", async ({ page }) => {
    await expect(page.getByAltText("Drawer")).toBeVisible();
  });

  /** Test if the page has a correct article preview author & published date */
  test("has article preview author & published date", async ({ page }) => {
    const main = page.locator("main>div");
    await expect(
      main.getByRole("img", { name: "Michelle Appleton's Avatar" }),
    ).toBeVisible();
    await expect(main.getByText("Michelle Appleton")).toBeVisible();
    await expect(main.getByText("28 Jun 2020")).toBeVisible();
  });

  /** Test if the page has a correct share button */
  test("has a share button", async ({ page }) => {
    const button = page.getByRole("button", { name: "Share" });
    const sns = ["facebook", "twitter", "pinterest"];
    const share = page.getByText(`share${sns.join("")}`);
    await expect(share).not.toBeVisible();
    await expect(button).toBeVisible();
    await button.click();
    const sns_list = await share.locator("ul>li").all();
    await expect(share).toBeVisible();
    expect(sns_list).toHaveLength(3);
    for (const name of sns) {
      await expect(share.getByRole("menuitem", { name })).toBeVisible();
    }
    await button.click();
    await expect(share).not.toBeVisible();
  });

  /** Test share button state changes */
  test("share button changes state when clicked", async ({ page }) => {
    const shareButton = page.getByRole("button", { name: "Share" });
    const shareIcon = shareButton.locator("svg");

    // Initial state
    await expect(shareButton).toHaveClass(/bg-article-preview-100/);
    await expect(shareIcon).toHaveClass(/fill-\[#6E8098\]/);

    // Clicked state
    await shareButton.click();
    await expect(shareButton).toHaveClass(/bg-\[#6E8098\]/);
    await expect(shareIcon).toHaveClass(/fill-article-preview-100/);

    // Back to initial state
    await shareButton.click();
    await expect(shareButton).toHaveClass(/bg-article-preview-100/);
    await expect(shareIcon).toHaveClass(/fill-\[#6E8098\]/);
  });

  /** Test ARIA attributes for accessibility */
  test("has correct ARIA attributes", async ({ page }) => {
    const shareButton = page.getByRole("button", { name: "Share" });
    await expect(shareButton).toHaveAttribute("aria-haspopup", "true");
    await expect(shareButton).toHaveAttribute("aria-controls", "sharemenu");
    await expect(shareButton).toHaveAttribute("aria-expanded", "false");

    await shareButton.click();
    await expect(shareButton).toHaveAttribute("aria-expanded", "true");

    const shareMenu = page.locator('[id="sharemenu"]');
    await expect(shareMenu).toHaveAttribute("role", "menu");
    await expect(shareMenu).toHaveAttribute(
      "aria-labelledby",
      "sharemenubutton",
    );
  });

  /** Test if the page has a correct footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
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
