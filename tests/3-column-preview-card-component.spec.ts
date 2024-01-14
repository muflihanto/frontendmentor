import { test, expect } from "@playwright/test";

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
      const container = page.getByText(`${card.heading}${card.description}`);
      await expect(
        container.getByRole("heading", {
          level: 2,
          name: card.heading,
        }),
      ).toBeVisible();
      await expect(container.getByText(card.description)).toBeVisible();
      await expect(
        container.getByRole("link", { name: "Learn More" }).first(),
      ).toBeVisible();
    }
  });

  /** Test if the page has correct footer */
  test("has footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
