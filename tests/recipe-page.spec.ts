import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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

    test("has main heading and intro", async ({ page }) => {
      const card = page.getByRole("main");
      await expect(card).toBeVisible();
      await expect(
        card.getByRole("heading", { level: 1, name: "Simple Omelette Recipe" }),
      ).toBeVisible();
      await expect(card.getByText(/easy and quick dish/)).toBeVisible();
    });
  });

  test.describe("Preparation time section", () => {
    test("is visible with heading", async ({ page }) => {
      const section = page.getByTestId("preparation");
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      await expect(
        section.getByRole("heading", { name: "Preparation time" }),
      ).toBeVisible();
    });

    test("has 3 time items", async ({ page }) => {
      const section = page.getByTestId("preparation");
      await expect(section.getByRole("listitem")).toHaveCount(3);
    });
  });

  test.describe("Ingredients section", () => {
    test("is visible with heading", async ({ page }) => {
      const section = page.getByTestId("ingredients");
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      await expect(
        section.getByRole("heading", { name: "Ingredients" }),
      ).toBeVisible();
    });

    test("has 5 items", async ({ page }) => {
      const section = page.getByTestId("ingredients");
      await expect(section.getByRole("listitem")).toHaveCount(5);
    });
  });

  test.describe("Instructions section", () => {
    test("is visible with heading", async ({ page }) => {
      const section = page.getByTestId("instructions");
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      await expect(
        section.getByRole("heading", { name: "Instructions" }),
      ).toBeVisible();
    });

    test("has 6 steps", async ({ page }) => {
      const section = page.getByTestId("instructions");
      await expect(section.getByRole("listitem")).toHaveCount(6);
    });
  });

  test.describe("Nutrition section", () => {
    test("is visible with heading and description", async ({ page }) => {
      const section = page.getByTestId("nutrition");
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      await expect(
        section.getByRole("heading", { name: "Nutrition" }),
      ).toBeVisible();
      await expect(
        section.getByText(
          "The table below shows nutritional values per serving without the additional fillings.",
        ),
      ).toBeVisible();
    });

    test("has a table with 4 rows", async ({ page }) => {
      const section = page.getByTestId("nutrition");
      await expect(section.getByRole("table")).toBeVisible();
      await expect(section.getByRole("row")).toHaveCount(4);
    });

    test("has correct nutrition rows", async ({ page }) => {
      const section = page.getByTestId("nutrition");
      await expect(
        section.getByRole("row", { name: "Calories 277kcal" }),
      ).toBeVisible();
      await expect(
        section.getByRole("row", { name: "Carbs 0g" }),
      ).toBeVisible();
      await expect(
        section.getByRole("row", { name: "Protein 20g" }),
      ).toBeVisible();
      await expect(section.getByRole("row", { name: "Fat 22g" })).toBeVisible();
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
