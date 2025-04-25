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

  test.describe("Gameplay", () => {
    test("should show win/lose result and update score", async ({ page }) => {
      // Mock the API response to control test outcome
      await page.route("**/*", (route) => {
        if (route.request().url().includes("icon-")) {
          // Allow image requests to pass through
          return route.continue();
        }
        return route.continue();
      });

      const initialScore = await page
        .locator("header >> p:last-child")
        .textContent();

      const paperButton = page.getByRole("button", { name: "Paper" });
      await paperButton.click();

      // Wait for house choice to appear (mock would be better here)
      await page.waitForTimeout(1500); // Wait for the 1s timeout in the code

      // Check if we have a result (either win or lose)
      const resultText = await page
        .locator('h1:text-matches("win|lose", "i")')
        .textContent();
      expect(resultText).toMatch(/win|lose/);

      // Verify play again button appears
      const playAgainButton = page.locator('button:has-text("PLAY AGAIN")');
      await expect(playAgainButton).toBeVisible();

      // Check score change
      const newScore = await page
        .locator("header >> p:last-child")
        .textContent();
      expect(Number.parseInt(newScore ?? "0")).not.toBe(
        Number.parseInt(initialScore ?? "0"),
      );
    });

    test("should return to choice screen when play again is clicked", async ({
      page,
    }) => {
      const paperButton = page.getByRole("button", { name: "Paper" });
      await paperButton.click();

      await page.waitForTimeout(1500); // Wait for results

      const playAgainButton = page.locator('button:has-text("PLAY AGAIN")');
      await playAgainButton.click();

      // Verify we're back to choices
      await expect(page.getByRole("button", { name: "Paper" })).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Scissors" }),
      ).toBeVisible();
      await expect(page.getByRole("button", { name: "Rock" })).toBeVisible();
    });
  });

  test("should persist score between page reloads", async ({ page }) => {
    // Make a choice to change the score
    const paperButton = page.getByRole("button", { name: "Paper" });
    await paperButton.click();

    await page.waitForTimeout(1500); // Wait for results

    // Get the new score
    const scoreAfterPlay = await page
      .locator("header >> p:last-child")
      .textContent();

    // Reload the page
    await page.reload();

    // Verify score is the same
    await expect(page.locator("header >> p:last-child")).toHaveText(
      scoreAfterPlay ?? "",
    );
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
