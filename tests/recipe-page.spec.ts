import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("FrontendMentor Challenge - Recipe Page", () => {
  /** Go to Recipe page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/recipe-page");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Recipe Page");
  });

  /** Test if the page has a main card */
  test.describe("has a main card", () => {
    test("has a header", async ({ page }) => {
      const header = page.getByRole("banner");
      await expect(header).toBeVisible();
      await expect(
        header.getByRole("img", { name: "Omelette on a plate" }),
      ).toBeVisible();
    });

    test("has main element", async ({ page }) => {
      const card = page.getByRole("main");
      await expect(card).toBeVisible();
      await expect(
        card.getByRole("heading", { level: 1, name: "Simple Omelette Recipe" }),
      ).toBeVisible();
      await expect(
        card.getByText(
          " An easy and quick dish, perfect for any meal. This classic omelette combines beaten eggs cooked to perfection, optionally filled with your choice of cheese, vegetables, or meats.",
        ),
      ).toBeVisible();
    });

    test("has 'Preparation time' section", async ({ page }) => {
      const section = page.locator("section").first();
      await section.scrollIntoViewIfNeeded();
      await expect(
        section.getByRole("heading", { name: "Preparation time" }),
      ).toBeVisible();
      const listItem = await section.getByRole("listitem").all();
      expect(listItem).toHaveLength(3);
    });

    test("has 'Ingredients' section", async ({ page }) => {
      const section = page.locator("section").nth(1);
      await section.scrollIntoViewIfNeeded();
      await expect(
        section.getByRole("heading", { name: "Ingredients" }),
      ).toBeVisible();
      const listItem = await section.getByRole("listitem").all();
      expect(listItem).toHaveLength(5);
    });

    test("has 'Instructions' section", async ({ page }) => {
      const section = page.locator("section").nth(2);
      await section.scrollIntoViewIfNeeded();
      await expect(
        section.getByRole("heading", { name: "Instructions" }),
      ).toBeVisible();
      const listItem = await section.getByRole("listitem").all();
      expect(listItem).toHaveLength(6);
    });

    test("has 'Nutrition' section", async ({ page }) => {
      const section = page.locator("section").nth(3);
      await section.scrollIntoViewIfNeeded();
      await expect(
        section.getByRole("heading", { name: "Nutrition" }),
      ).toBeVisible();
      await expect(
        section.getByText(
          "The table below shows nutritional values per serving without the additional fillings.",
        ),
      ).toBeVisible();
      const listItem = await section.getByRole("listitem").all();
      expect(listItem).toHaveLength(4);
    });
  });

  /** Test if the page has a footer */
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
