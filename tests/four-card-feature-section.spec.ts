import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("FrontendMentor Challenge - Four card feature section Page", () => {
  /** Go to Four card feature section page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/four-card-feature-section");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Four card feature section",
    );
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Reliable, efficient delivery Powered by Technology",
      }),
    ).toBeVisible();
  });

  /** Test if the page has a correct body text */
  test("has a body text", async ({ page }) => {
    await expect(
      page.getByText(
        "Our Artificial Intelligence powered tools use millions of project data points to ensure that your project is successful",
      ),
    ).toBeVisible();
  });

  test.describe("has four cards", () => {
    const cards = {
      Supervisor: "Monitors activity to identify project roadblocks",
      "Team Builder":
        "Scans our talent network to create the optimal team for your project",
      Karma: "Regularly evaluates our talent to ensure quality",
      Calculator:
        "Uses data from past projects to provide better delivery estimates",
    };

    for (const card of Object.entries(cards)) {
      test(`has a ${card[0]} card`.toLowerCase(), async ({ page }) => {
        const cardParent = page.getByText(`${card[0]}${card[1]}`);
        await expect(
          cardParent.getByRole("heading", { name: card[0] }),
        ).toBeVisible();
        await expect(cardParent.getByText(card[1])).toBeVisible();
        await expect(cardParent.locator("svg")).toBeVisible();
      });
    }
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
