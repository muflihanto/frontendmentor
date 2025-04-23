import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("FrontendMentor Challenge - Rock, Paper, Scissors Page", () => {
  /** Go to Rock, Paper, Scissors page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/rock-paper-scissors");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Rock, Paper, Scissors");
  });

  /** Test if the page has a header with logo and score */
  test("should display header with logo and score", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();

    const logo = header.locator('img[alt="Rock Paper Scissors Logo"]');
    await expect(logo).toBeVisible();

    const scoreContainer = header.locator("h2");
    await expect(scoreContainer).toContainText("score");

    const scoreValue = scoreContainer.locator("p:last-child");
    await expect(scoreValue).toHaveText("12"); // Default score
  });

  test("should display game choices (rock, paper, scissors)", async ({
    page,
  }) => {
    const choicesForm = page.locator("form");
    await expect(choicesForm).toBeVisible();

    const paperButton = choicesForm.getByRole("button", { name: "Paper" });
    const scissorsButton = choicesForm.getByRole("button", {
      name: "Scissors",
    });
    const rockButton = choicesForm.getByRole("button", { name: "Rock" });

    await expect(paperButton).toBeVisible();
    await expect(scissorsButton).toBeVisible();
    await expect(rockButton).toBeVisible();

    // Verify icons are loaded
    await expect(paperButton.locator('img[alt="Paper Icon"]')).toBeVisible();
    await expect(
      scissorsButton.locator('img[alt="Scissors Icon"]'),
    ).toBeVisible();
    await expect(rockButton.locator('img[alt="Rock Icon"]')).toBeVisible();
  });

  test("should show rules modal when rules button is clicked", async ({
    page,
  }) => {
    const rulesButton = page.locator('button:has-text("rules")');
    await rulesButton.click();

    const rulesModal = page.locator('section[aria-label="Rules modal"]>div');
    await expect(rulesModal).toBeVisible();

    const rulesTitle = rulesModal.locator('h2:has-text("RULES")');
    await expect(rulesTitle).toBeVisible();

    const rulesImage = rulesModal.getByRole("img", { name: "Rules" });
    await expect(rulesImage).toBeVisible();

    const closeButton = rulesModal.locator(
      'button:has(img[alt="Close Button"])',
    );
    await expect(closeButton).toBeVisible();

    // Test closing the modal
    await closeButton.click();
    await expect(rulesModal).not.toBeVisible();
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
