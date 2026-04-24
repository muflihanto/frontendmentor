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

    test("shows difficulty and mode options with defaults", async ({
      page,
    }) => {
      // Check Desktop Pills (since we don't specify viewport, we expect both or one depending on default playwright viewport)
      // Usually Playwright default is 1280x720, so desktop pills should be visible.

      const hardButton = page
        .getByRole("button", { name: "Hard" })
        .filter({ visible: true });
      await expect(hardButton).toBeVisible();
      // It should have the active class (border-blue-600)
      await expect(hardButton).toHaveClass(/border-typing-speed-test-blue-600/);

      const timedButton = page
        .getByRole("button", { name: "Timed (60s)" })
        .filter({ visible: true });
      await expect(timedButton).toBeVisible();
      await expect(timedButton).toHaveClass(
        /border-typing-speed-test-blue-600/,
      );
    });

    test("shows the startup overlay", async ({ page }) => {
      await expect(
        page.getByRole("button", { name: "Start Typing Test" }),
      ).toBeVisible();
      await expect(
        page.getByText("Or click the text and start typing"),
      ).toBeVisible();

      // The passage should be blurred (opacity-70 blur-[8px])
      const passage = page
        .locator("p")
        .filter({ hasText: "The archaeological expedition" });
      await expect(passage).toHaveClass(/blur-\[8px\]/);
    });
  });

  test.describe("Mobile UI Features", () => {
    test.beforeEach(async ({ page }) => {
      // Set to mobile viewport to ensure mobile dropdowns are visible
      await page.setViewportSize({ width: 375, height: 667 });
    });

    test("can change difficulty via mobile dropdown", async ({ page }) => {
      const mobileContainer = page.locator(".md\\:hidden");

      const diffDropdownBtn = mobileContainer.getByRole("button", {
        name: "Hard",
        exact: true,
      });
      await diffDropdownBtn.click();

      const mediumOption = mobileContainer.getByRole("button", {
        name: "Medium",
        exact: true,
      });
      await expect(mediumOption).toBeVisible();
      await mediumOption.click();

      // Only the main toggle should remain, and it should be "Medium"
      await expect(
        mobileContainer.getByRole("button", { name: "Medium", exact: true }),
      ).toHaveCount(1);
      // "Easy" option from dropdown should be gone
      await expect(
        mobileContainer.getByRole("button", { name: "Easy", exact: true }),
      ).not.toBeVisible();
    });

    test("can change mode via mobile dropdown", async ({ page }) => {
      const mobileContainer = page.locator(".md\\:hidden");

      const modeDropdownBtn = mobileContainer.getByRole("button", {
        name: "Timed (60s)",
        exact: true,
      });
      await modeDropdownBtn.click();

      const passageOption = mobileContainer.getByRole("button", {
        name: "Passage",
        exact: true,
      });
      await expect(passageOption).toBeVisible();
      await passageOption.click();

      // Only the main toggle should remain, and it should be "Passage"
      await expect(
        mobileContainer.getByRole("button", { name: "Passage", exact: true }),
      ).toHaveCount(1);
      // "Timed (60s)" option from dropdown should be gone
      await expect(
        mobileContainer.getByRole("button", {
          name: "Timed (60s)",
          exact: true,
        }),
      ).not.toBeVisible();
    });
  });

  test.describe("Difficulty Switcher", () => {
    test("changes the passage text when difficulty is changed", async ({
      page,
    }) => {
      // By default it's Hard, which starts with "The archaeological expedition"
      const hardPassage = page
        .locator("p")
        .filter({ hasText: "The archaeological expedition" });
      await expect(hardPassage).toBeVisible();

      // Change to Easy
      const desktopEasyBtn = page
        .locator(".md\\:flex")
        .getByRole("button", { name: "Easy", exact: true });
      if (await desktopEasyBtn.isVisible()) {
        await desktopEasyBtn.click();
      } else {
        await page
          .locator(".md\\:hidden")
          .getByRole("button", { name: "Hard", exact: true })
          .click();
        await page
          .locator(".md\\:hidden")
          .getByRole("button", { name: "Easy", exact: true })
          .click();
      }

      // Check the new passage text for Easy
      const easyPassage = page
        .locator("p")
        .filter({ hasText: "The sun was warm and the sky was blue" });
      await expect(easyPassage).toBeVisible();
    });
  });

  test.describe("Typing Functionality", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "Start Typing Test" }).click();
    });

    test("starts the test and focuses the invisible input", async ({
      page,
    }) => {
      // The passage should no longer be blurred
      const passage = page
        .locator("p")
        .filter({ hasText: "The archaeological expedition" });
      await expect(passage).not.toHaveClass(/blur-\[8px\]/);

      // Startup overlay should be hidden
      await expect(
        page.getByRole("button", { name: "Start Typing Test" }),
      ).not.toBeVisible();

      // There should be a visible restart button
      await expect(
        page.getByRole("button", { name: "Restart Test" }),
      ).toBeVisible();

      // The active character should be the first letter "T"
      const activeChar = page.locator("#active-char");
      await expect(activeChar).toHaveText("T");
    });

    test("styles correctly typed characters", async ({ page }) => {
      // Type "T" (correct)
      await page.keyboard.press("T");

      // The first character should now be green
      const chars = page.locator("p > span.relative");
      await expect(chars.nth(0)).toHaveClass(
        /text-typing-speed-test-green-500/,
      );

      // The active character should have moved to "h"
      await expect(page.locator("#active-char")).toHaveText("h");
    });

    test("styles incorrectly typed characters", async ({ page }) => {
      // Type "x" (incorrect, expecting "T")
      await page.keyboard.press("x");

      // The first character should now be red and underlined
      const chars = page.locator("p > span.relative");
      await expect(chars.nth(0)).toHaveClass(/text-typing-speed-test-red-500/);
      await expect(chars.nth(0)).toHaveClass(/underline/);
    });

    test("enforces case-sensitivity for typed characters", async ({ page }) => {
      // The first character of the passage is uppercase "T"
      // Type lowercase "t" to verify exact case matching
      await page.keyboard.press("t");

      const chars = page.locator("p > span.relative");

      // The lowercase 't' should be explicitly marked as incorrect
      await expect(chars.nth(0)).toHaveClass(/text-typing-speed-test-red-500/);
      await expect(chars.nth(0)).toHaveClass(/underline/);
    });

    test("reverts styling and moves active cursor back on backspace", async ({
      page,
    }) => {
      const stats = page.locator("main > div").first();

      // Before typo: initial accuracy is naturally 100%
      await expect(stats.getByText("100%")).toBeVisible();

      // Type "x" (incorrect, expecting "T")
      await page.keyboard.press("x");
      await page.waitForTimeout(50);

      const chars = page.locator("p > span.relative");

      // Verify the element is styled as incorrect
      await expect(chars.nth(0)).toHaveClass(/text-typing-speed-test-red-500/);

      // Verification: 0 out of 1 characters correct guarantees 0% accuracy
      await expect(stats.getByText("0%", { exact: true })).toBeVisible();

      // The active cursor should have moved to the second character ("h")
      await expect(page.locator("#active-char")).toHaveText("h");

      // Press Backspace to delete the mistake
      await page.keyboard.press("Backspace");
      await page.waitForTimeout(50);

      // The first character should revert to its default untyped styling
      await expect(chars.nth(0)).not.toHaveClass(
        /text-typing-speed-test-red-500/,
      );
      await expect(chars.nth(0)).toHaveClass(
        /text-typing-speed-test-neutral-400/,
      );

      // Accuracy statistically jumps back up to 100% as the typing baseline is reset
      await expect(stats.getByText("100%")).toBeVisible();

      // The active cursor should have correctly moved back to the first character ("T")
      await expect(page.locator("#active-char")).toHaveText("T");
    });

    test("prevents pasting text into the input field", async ({ page }) => {
      const input = page.locator('input[type="text"]');

      const defaultPrevented = await input.evaluate((node) => {
        // Dispatch a native paste event that bubbles up to React's event listener
        const pasteEvent = new Event("paste", {
          bubbles: true,
          cancelable: true,
        });
        node.dispatchEvent(pasteEvent);
        return pasteEvent.defaultPrevented;
      });

      // Verify the onPaste handler called e.preventDefault()
      expect(defaultPrevented).toBe(true);

      // And verify the input's value has not changed from empty as an extra safeguard
      await expect(input).toHaveValue("");
    });

    test("handles backwards autoscrolling when backspacing across lines", async ({
      page,
    }) => {
      // Set to mobile viewport to aggressively force early line wrapping
      await page.setViewportSize({ width: 375, height: 667 });

      const input = page.locator('input[type="text"]');

      // Type first character to ensure input top layout is stabilized after viewport resize
      await page.keyboard.press("T");
      await page.waitForTimeout(50);
      const initialTop = await input.evaluate((node) => node.style.top);

      // Type a long string to force a line wrap on the narrow mobile bounds
      // We inject the bulk of the text instantly to drastically speed up the test
      const injectText =
        "he archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. ";
      const typeText = "Obsidian";

      await input.fill(`T${injectText}`, { force: true });

      // Type the final word to trigger key events and layout engine settling organically
      for (const char of typeText) {
        await page.keyboard.press(char);
      }

      // Wait for React layout engine to recalculate the wrapped offsetTop tracking
      await page.waitForTimeout(100);
      const wrappedTop = await input.evaluate((node) => node.style.top);

      // Verify the tracking offsetTop genuinely shifted downwards to a new line
      expect(parseInt(wrappedTop || "0", 10)).toBeGreaterThan(
        parseInt(initialTop || "0", 10),
      );

      // Backspace the final word manually
      for (const _ of typeText) {
        await page.keyboard.press("Backspace");
      }

      // Inject deletion for the rest of the text to instantly return to the first line
      await input.fill("T", { force: true });

      await page.waitForTimeout(100);
      const revertedTop = await input.evaluate((node) => node.style.top);

      // Verify the autoscroll behavior cleanly rewinds by reverting the top offset to mathematical exact parity
      expect(revertedTop).toBe(initialTop);
    });

    test("transitions to completion screen when the final passage character is typed", async ({
      page,
    }) => {
      // Test suite starts in Timed (60s) mode via beforeEach, but we want Passage mode.
      // Switching mode now automatically resets the test to idle state.
      const desktopPassageBtn = page
        .locator(".md\\:flex")
        .getByRole("button", { name: "Passage" });
      if (await desktopPassageBtn.isVisible()) {
        await desktopPassageBtn.click();
      } else {
        await page
          .locator(".md\\:hidden")
          .getByRole("button", { name: "Timed (60s)" })
          .click();
        await page
          .locator(".md\\:hidden")
          .getByRole("button", { name: "Passage" })
          .click();
      }

      // We must manually start the test after switching modes
      await page.getByRole("button", { name: "Start Typing Test" }).click();

      const input = page.locator('input[type="text"]');
      const passageText =
        'The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic—all discovered in a single Mycenaean tomb—suggested commercial connections far more extensive than previously hypothesized. "We\'ve underestimated ancient peoples\' navigational capabilities and their appetite for luxury goods," the lead researcher observed. "Globalization isn\'t as modern as we assume."';

      // Instantly inject the entire passage minus the final character to bypass test wait times
      await input.fill(passageText.slice(0, -1), { force: true });

      // Verify the application remains firmly in the active typing state
      await expect(
        page.getByRole("heading", { name: "Baseline Established!" }),
      ).not.toBeVisible();

      // Type the final character natively via Playwright
      await page.keyboard.press(passageText.slice(-1));

      // Assert that this final organic keystroke triggered the Passage mode auto-completion sequence
      await expect(
        page.getByRole("heading", { name: "Baseline Established!" }),
      ).toBeVisible();
    });

    test("resets all stats and UI when 'Restart Test' is clicked during an active session", async ({
      page,
    }) => {
      // Let time advance slightly so WPM and timers can calculate deviations natively
      await page.waitForTimeout(1050);

      // Type some correct and incorrect characters to alter stats and UI state actively
      await page.keyboard.press("T");
      await page.keyboard.press("h");
      await page.keyboard.press("x"); // Mistake drastically drops accuracy

      const stats = page.locator("main > div").first();

      // Verify dynamic stats actively changed from their defaults
      await expect(stats.getByText("100%")).not.toBeVisible();

      // Verify the typing cursor progressed
      await expect(page.locator("#active-char")).toHaveText(" ");

      // Verify incorrect formatting applied
      const chars = page.locator("p > span.relative");
      await expect(chars.nth(2)).toHaveClass(/text-typing-speed-test-red-500/);

      // Trigger the active 'Restart Test' button
      await page.getByRole("button", { name: "Restart Test" }).click();

      // Assert that all dynamic stats are completely wiped to default
      await expect(stats.getByText("100%")).toBeVisible();
      await expect(stats.getByText("0", { exact: true })).toBeVisible(); // WPM

      const timeLocator = stats
        .locator("p")
        .filter({ hasText: /^Time:/ })
        .locator("xpath=../p[2]");
      await expect(timeLocator).toHaveText("0:60");

      // Verify passage character UI styling is completely sanitized of progress/mistakes
      await expect(chars.nth(0)).not.toHaveClass(
        /text-typing-speed-test-green-500/,
      );
      await expect(chars.nth(2)).not.toHaveClass(
        /text-typing-speed-test-red-500/,
      );

      // Verify the cursor was accurately bumped back to the first character index
      await expect(page.locator("#active-char")).toHaveText("T");

      // Assert the invisible input is successfully refocused so the user can immediately type
      const isFocused = await page.evaluate(
        () => document.activeElement?.tagName === "INPUT",
      );
      expect(isFocused).toBe(true);
    });

    test("resets all stats and UI when 'Restart Test' is clicked during an active session in Passage mode", async ({
      page,
    }) => {
      // Test suite starts in Timed (60s) mode via beforeEach, so we must restart to switch modes
      await page.getByRole("button", { name: "Restart Test" }).click();

      // Dynamically switch to Passage mode
      const desktopPassageBtn = page
        .locator(".md\\:flex")
        .getByRole("button", { name: "Passage" });
      if (await desktopPassageBtn.isVisible()) {
        await desktopPassageBtn.click();
      } else {
        await page
          .locator(".md\\:hidden")
          .getByRole("button", { name: "Timed (60s)" })
          .click();
        await page
          .locator(".md\\:hidden")
          .getByRole("button", { name: "Passage" })
          .click();
      }

      // Manually start the test after switching modes
      await page.getByRole("button", { name: "Start Typing Test" }).click();

      // Let time advance slightly so WPM and timers calculate natively
      await page.waitForTimeout(1050);

      // Type some characters to push stats out of default baseline
      await page.keyboard.press("T");
      await page.keyboard.press("h");

      // Trigger the active 'Restart Test' button
      await page.getByRole("button", { name: "Restart Test" }).click();

      const stats = page.locator("main > div").first();

      // Assert that all dynamic stats are completely wiped to default
      await expect(stats.getByText("100%")).toBeVisible();
      await expect(stats.getByText("0", { exact: true })).toBeVisible(); // WPM

      // CRITICAL DIFFERENCE: Passage mode counts UP from 0:00, not DOWN from 0:60
      const timeLocator = stats
        .locator("p")
        .filter({ hasText: /^Time:/ })
        .locator("xpath=../p[2]");
      await expect(timeLocator).toHaveText("0:00");

      // Verify the cursor was accurately bumped back to the first character index
      await expect(page.locator("#active-char")).toHaveText("T");
    });
  });

  test.describe("Stats Update While Typing", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "Start Typing Test" }).click();
    });

    test("WPM updates as user types correct characters", async ({ page }) => {
      // Get initial WPM (should be 0 before typing)
      const wpmLocator = page.locator("main > div").first().getByText(/^\d+$/);

      // Type correct characters to build up WPM
      // "The" = 3 correct characters
      await page.keyboard.press("T");
      await page.keyboard.press("h");
      await page.keyboard.press("e");

      // Wait for WPM to update (it calculates based on time elapsed)
      await page.waitForTimeout(100);

      // WPM should now be greater than 0
      const wpmText = await wpmLocator.textContent();
      expect(parseInt(wpmText ?? "0")).toBeGreaterThan(0);
    });

    test("Accuracy starts at 100% and updates with correct/incorrect typing", async ({
      page,
    }) => {
      const stats = page.locator("main > div").first();

      // Initial accuracy should be 100%
      await expect(stats.getByText("100%")).toBeVisible();

      // Type a correct character - accuracy should still be 100%
      await page.keyboard.press("T");
      await page.waitForTimeout(50);
      await expect(stats.getByText("100%")).toBeVisible();

      // Type an incorrect character - accuracy should drop below 100%
      await page.keyboard.press("x"); // Should be "h"
      await page.waitForTimeout(50);
      // Now 1 correct out of 2 typed = 50%
      await expect(stats.getByText("50%")).toBeVisible();
    });

    test("WPM and accuracy update incrementally as more characters are typed", async ({
      page,
    }) => {
      const stats = page.locator("main > div").first();
      const wpmLocator = stats
        .locator("p")
        .filter({ hasText: /^WPM:/ })
        .locator("xpath=../p[2]");

      // Type "The archaeological" (many correct characters)
      const correctText = "The archaeological";
      for (const char of correctText) {
        await page.keyboard.press(char);
      }
      await page.waitForTimeout(100);

      // WPM should have increased significantly
      const wpmText = await wpmLocator.textContent();
      expect(parseInt(wpmText ?? "0")).toBeGreaterThan(0);

      // Accuracy should still be 100% since all typed chars were correct
      await expect(stats.getByText("100%")).toBeVisible();

      // Type some incorrect characters
      await page.keyboard.press("z");
      await page.keyboard.press("z");
      await page.keyboard.press("z");
      await page.waitForTimeout(100);

      // Accuracy should now be lower (not 100%)
      await expect(stats.getByText("100%")).not.toBeVisible();
    });

    test("Time counts down in Timed mode", async ({ page }) => {
      const stats = page.locator("main > div").first();
      const timeLocator = stats
        .locator("p")
        .filter({ hasText: /^Time:/ })
        .locator("xpath=../p[2]");

      // Get initial time - should be 60 seconds
      const initialTimeText = await timeLocator.textContent();
      const initialTime = parseInt(initialTimeText?.replace(":", "") ?? "0");
      expect(initialTime).toBe(60);

      // Wait for time to decrement by at least 1 second
      await page.waitForTimeout(1100);

      // After 1+ second, time should have decreased
      const newTimeText = await timeLocator.textContent();
      const newTime = parseInt(newTimeText?.replace(":", "") ?? "0");
      expect(newTime).toBeLessThan(initialTime);
    });
  });

  test.describe("Results Screen (Baseline)", () => {
    test.beforeEach(async ({ page }) => {
      // Find visible Passage button. On desktop it's a direct button, on mobile it's in a dropdown.
      const desktopPassageBtn = page
        .locator(".md\\:flex")
        .getByRole("button", { name: "Passage" });
      if (await desktopPassageBtn.isVisible()) {
        await desktopPassageBtn.click();
      } else {
        const mobileDropdown = page
          .locator(".md\\:hidden")
          .getByRole("button", { name: "Timed (60s)" });
        await mobileDropdown.click();
        const mobilePassageBtn = page
          .locator(".md\\:hidden")
          .getByRole("button", { name: "Passage" });
        await mobilePassageBtn.click();
      }

      await page.getByRole("button", { name: "Start Typing Test" }).click();

      const passageText =
        'The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic—all discovered in a single Mycenaean tomb—suggested commercial connections far more extensive than previously hypothesized. "We\'ve underestimated ancient peoples\' navigational capabilities and their appetite for luxury goods," the lead researcher observed. "Globalization isn\'t as modern as we assume."';

      await page
        .locator('input[type="text"]')
        .fill(passageText, { force: true });
    });

    test("shows baseline heading and subtitle", async ({ page }) => {
      await expect(
        page.getByRole("heading", { name: "Baseline Established!" }),
      ).toBeVisible();
      await expect(
        page.getByText(
          "You've set the bar. Now the real challenge begins—time to beat it.",
        ),
      ).toBeVisible();
    });

    test("shows correct stats structure and 'Beat This Score' button", async ({
      page,
    }) => {
      await expect(page.getByText("WPM:")).toBeVisible();
      await expect(page.getByText("Accuracy:")).toBeVisible();
      await expect(page.getByText("Characters")).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Beat This Score" }),
      ).toBeVisible();
    });
  });

  test.describe("Results Screen (Test Complete)", () => {
    test.beforeEach(async ({ page }) => {
      // Find visible Passage button. On desktop it's a direct button, on mobile it's in a dropdown.
      const desktopPassageBtn = page
        .locator(".md\\:flex")
        .getByRole("button", { name: "Passage" });
      if (await desktopPassageBtn.isVisible()) {
        await desktopPassageBtn.click();
      } else {
        const mobileDropdown = page
          .locator(".md\\:hidden")
          .getByRole("button", { name: "Timed (60s)" });
        await mobileDropdown.click();
        const mobilePassageBtn = page
          .locator(".md\\:hidden")
          .getByRole("button", { name: "Passage" });
        await mobilePassageBtn.click();
      }

      await page.getByRole("button", { name: "Start Typing Test" }).click();

      const passageText =
        'The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic—all discovered in a single Mycenaean tomb—suggested commercial connections far more extensive than previously hypothesized. "We\'ve underestimated ancient peoples\' navigational capabilities and their appetite for luxury goods," the lead researcher observed. "Globalization isn\'t as modern as we assume."';

      // First run to set baseline (instant fill means 0 time elapsed, so 0 WPM)
      await page
        .locator('input[type="text"]')
        .fill(passageText, { force: true });

      // Restart to begin the second run
      await page.getByRole("button", { name: "Beat This Score" }).click();

      // Second run completes immediately as well, matching the WPM <= bestWpm condition
      await page
        .locator('input[type="text"]')
        .fill(passageText, { force: true });
    });

    test("shows standard complete heading and subtitle", async ({ page }) => {
      await expect(
        page.getByRole("heading", { name: "Test Complete!" }),
      ).toBeVisible();
      await expect(
        page.getByText("Solid run. Keep pushing to beat your high score."),
      ).toBeVisible();
    });

    test("shows standard 'Go Again' button", async ({ page }) => {
      await expect(
        page.getByRole("button", { name: "Go Again" }),
      ).toBeVisible();
    });
  });

  test.describe("Results Screen (New Personal Best)", () => {
    test.beforeEach(async ({ page }) => {
      // Find visible Passage button. On desktop it's a direct button, on mobile it's in a dropdown.
      const desktopPassageBtn = page
        .locator(".md\\:flex")
        .getByRole("button", { name: "Passage" });
      if (await desktopPassageBtn.isVisible()) {
        await desktopPassageBtn.click();
      } else {
        const mobileDropdown = page
          .locator(".md\\:hidden")
          .getByRole("button", { name: "Timed (60s)" });
        await mobileDropdown.click();
        const mobilePassageBtn = page
          .locator(".md\\:hidden")
          .getByRole("button", { name: "Passage" });
        await mobilePassageBtn.click();
      }

      await page.getByRole("button", { name: "Start Typing Test" }).click();

      const passageText =
        'The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic—all discovered in a single Mycenaean tomb—suggested commercial connections far more extensive than previously hypothesized. "We\'ve underestimated ancient peoples\' navigational capabilities and their appetite for luxury goods," the lead researcher observed. "Globalization isn\'t as modern as we assume."';

      // First run to set baseline (instant fill means 0 time elapsed, so 0 WPM)
      await page
        .locator('input[type="text"]')
        .fill(passageText, { force: true });

      // Restart to begin the second run
      await page.getByRole("button", { name: "Beat This Score" }).click();

      // Wait 1.1s so that timeElapsed becomes 1. This ensures calculated WPM > 0.
      await page.waitForTimeout(1100);

      // Second run completes, matching WPM (> 0) > bestWpm (0)
      await page
        .locator('input[type="text"]')
        .fill(passageText.slice(0, -5), { force: true });

      for (const char of passageText.slice(-5)) {
        await page.keyboard.press(char);
        await page.waitForTimeout(100);
      }
    });

    test("shows high score smashed heading and subtitle", async ({ page }) => {
      await expect(
        page.getByRole("heading", { name: "High Score Smashed!" }),
      ).toBeVisible();
      await expect(
        page.getByText("You're getting faster. That was incredible typing."),
      ).toBeVisible();
    });

    test("shows standard 'Go Again' button", async ({ page }) => {
      await expect(
        page.getByRole("button", { name: "Go Again" }),
      ).toBeVisible();
    });
  });

  test.describe("Timed Mode Expiration", () => {
    test("automatically finishes the test when time hits zero", async ({
      page,
    }) => {
      // Install the mock clock before navigating to the page
      await page.clock.install();
      await page.goto("/typing-speed-test");

      await page.getByRole("button", { name: "Start Typing Test" }).click();

      // Start the timer by typing the first character
      await page.keyboard.press("T");

      // Advance the clock by 60 seconds. runFor() is often more reliable than fastForward()
      // as it allows React's microtask queue to flush between ticks.
      await page.clock.runFor(60000);

      // Verify completion
      await expect(
        page.getByRole("heading", { name: "Baseline Established!" }),
      ).toBeVisible();
    });
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
