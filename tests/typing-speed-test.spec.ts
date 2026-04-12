import { expect, test } from "@playwright/test";

test.describe("FrontendMentor Challenge - Typing speed test page", () => {
  /** Go to Typing speed test page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/typing-speed-test");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Typing Speed Test");
  });

  test.describe("Initial State (Not Started)", () => {
    test("shows correct header elements", async ({ page }) => {
      // Check for logos (one hidden on desktop, one hidden on mobile)
      await expect(
        page.getByRole("img", { name: "Logo", includeHidden: true }),
      ).toHaveCount(2);

      // Check for personal best
      await expect(page.getByText("Personal best: 0 WPM")).toBeVisible();
    });

    test("shows initial stats correctly", async ({ page }) => {
      const stats = page.locator("main > div").first();

      await expect(stats.getByText("WPM:")).toBeVisible();
      await expect(stats.getByText("0", { exact: true })).toBeVisible();

      await expect(stats.getByText("Accuracy:")).toBeVisible();
      await expect(stats.getByText("100%")).toBeVisible();

      await expect(stats.getByText("Time:")).toBeVisible();
      // Default mode is Timed (60s), so time should show 0:60
      await expect(stats.getByText("0:60")).toBeVisible();
    });

    test("shows difficulty and mode options with defaults", async ({ page }) => {
      // Check Desktop Pills (since we don't specify viewport, we expect both or one depending on default playwright viewport)
      // Usually Playwright default is 1280x720, so desktop pills should be visible.

      const hardButton = page.getByRole("button", { name: "Hard" }).filter({ visible: true });
      await expect(hardButton).toBeVisible();
      // It should have the active class (border-blue-600)
      await expect(hardButton).toHaveClass(/border-typing-speed-test-blue-600/);

      const timedButton = page.getByRole("button", { name: "Timed (60s)" }).filter({ visible: true });
      await expect(timedButton).toBeVisible();
      await expect(timedButton).toHaveClass(/border-typing-speed-test-blue-600/);
    });

    test("shows the startup overlay", async ({ page }) => {
      await expect(
        page.getByRole("button", { name: "Start Typing Test" }),
      ).toBeVisible();
      await expect(
        page.getByText("Or click the text and start typing"),
      ).toBeVisible();

      // The passage should be blurred (opacity-70 blur-[8px])
      const passage = page.locator("p").filter({ hasText: "The archaeological expedition" });
      await expect(passage).toHaveClass(/blur-\[8px\]/);
    });
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});

