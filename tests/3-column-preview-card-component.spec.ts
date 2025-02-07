import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("FrontendMentor Challenge - 3-column preview card component Page", () => {
  /** Go to 3-column preview card component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/3-column-preview-card-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | 3-column preview card component",
    );
  });

  /** Test if the page has correct headings */
  test("has headings", async ({ page }) => {
    const h1 = page.locator("h1");
    await expect(h1).toHaveText("3-column preview card component");
    expect(await h1.getAttribute("class")).toContain("sr-only");

    await expect(
      page.getByRole("heading", {
        level: 2,
      }),
    ).toHaveCount(3);
  });

  /** Test if the page has all cards */
  test("has all cards", async ({ page }) => {
    const cards = [
      {
        heading: "Sedans",
        description:
          "Choose a sedan for its affordability and excellent fuel economy. Ideal for cruising in the city or on your next road trip.",
      },
      {
        heading: "SUVs",
        description:
          "Take an SUV for its spacious interior, power, and versatility. Perfect for your next family vacation and off-road adventures.",
      },
      {
        heading: "Luxury",
        description:
          "Cruise in the best car brands without the bloated prices. Enjoy the enhanced comfort of a luxury rental and arrive in style.",
      },
    ];
    for (const card of cards) {
      const container = page.getByLabel(card.heading, { exact: true });
      await expect(
        container.getByRole("heading", {
          level: 2,
          name: card.heading,
        }),
      ).toBeVisible();
      await expect(container.getByText(card.description)).toBeVisible();
      await expect(
        container
          .getByRole("link", { name: `Learn more about ${card.heading}` })
          .first(),
      ).toBeVisible();
    }
  });

  test("should have correct ARIA attributes", async ({ page }) => {
    // Check aria-label for icons
    const sedansIcon = page.locator('[aria-labelledby="sedans-title"]');
    const suvsIcon = page.locator('[aria-labelledby="suvs-title"]');
    const luxuryIcon = page.locator('[aria-labelledby="luxury-title"]');
    await expect(sedansIcon).toBeVisible();
    await expect(suvsIcon).toBeVisible();
    await expect(luxuryIcon).toBeVisible();

    // Check aria-labelledby for sections
    const sedansSection = page.locator(
      'section[aria-labelledby="sedans-heading"]',
    );
    const suvsSection = page.locator('section[aria-labelledby="suvs-heading"]');
    const luxurySection = page.locator(
      'section[aria-labelledby="luxury-heading"]',
    );
    await expect(sedansSection).toBeVisible();
    await expect(suvsSection).toBeVisible();
    await expect(luxurySection).toBeVisible();
  });

  /** Test if the page has correct footer */
  test("has footer", async ({ page }) => {
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
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
