import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";
import passagesData from "../public/typing-speed-test/data.json";

async function selectOption(
  page: Page,
  currentLabel: string,
  targetLabel: string,
) {
  const desktopBtn = page
    .locator(".md\\:flex")
    .getByRole("button", { name: targetLabel, exact: true });
  if (await desktopBtn.isVisible()) {
    await desktopBtn.click();
  } else {
    await page
      .locator(".md\\:hidden")
      .getByRole("button", { name: currentLabel, exact: true })
      .click();
    await page
      .locator(".md\\:hidden")
      .getByRole("menuitem", { name: targetLabel, exact: true })
      .click();
  }
}

async function switchToPassageMode(page: Page) {
  await selectOption(page, "Timed (60s)", "Passage");
}

async function getPassageText(page: Page, fallback = "") {
  return (await page.locator("p.text-\\[28px\\]").textContent()) ?? fallback;
}

async function verifyPassageFromDifficulty(
  page: Page,
  difficulty: "easy" | "medium" | "hard",
  options?: {
    expectBlurred?: boolean;
    expectNotBlurred?: boolean;
    fallback?: string;
  },
) {
  const text = await getPassageText(page, options?.fallback);
  expect(passagesData[difficulty].map((p) => p.text)).toContain(text);
  const passage = page.locator("p").filter({ hasText: text });
  if (options?.expectBlurred) {
    await expect(passage).toHaveClass(/blur-\[8px\]/);
  } else if (options?.expectNotBlurred) {
    await expect(passage).not.toHaveClass(/blur-\[8px\]/);
  } else {
    await expect(passage).toBeVisible();
  }
  return text;
}

async function completePassage(page: Page) {
  await switchToPassageMode(page);
  await page.getByRole("button", { name: "Start Typing Test" }).click();
  const text = await getPassageText(page);
  await page.locator('input[type="text"]').fill(text, { force: true });
  return text;
}

function getStatsContainer(page: Page) {
  return page.locator("main > div").first();
}

function getTimeLocator(page: Page) {
  return getStatsContainer(page)
    .locator("p")
    .filter({ hasText: /^Time:/ })
    .locator("xpath=../p[2]");
}

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
      const stats = getStatsContainer(page);

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
      await verifyPassageFromDifficulty(page, "hard", { expectBlurred: true });
    });
  });

  test.describe("Mobile UI Features", () => {
    test.beforeEach(async ({ page }) => {
      // Set to mobile viewport to ensure mobile dropdowns are visible
      await page.setViewportSize({ width: 375, height: 667 });
    });

    test("can change difficulty via mobile dropdown", async ({ page }) => {
      await verifyPassageFromDifficulty(page, "hard");

      const mobileContainer = page.locator(".md\\:hidden");

      const diffDropdownBtn = mobileContainer.getByRole("button", {
        name: "Hard",
        exact: true,
      });
      await diffDropdownBtn.click();

      const mediumOption = mobileContainer.getByRole("menuitem", {
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
        mobileContainer.getByRole("menuitem", { name: "Easy", exact: true }),
      ).not.toBeVisible();

      // Verify the passage text has changed and matches Medium difficulty list
      await verifyPassageFromDifficulty(page, "medium");
    });

    test("can change mode via mobile dropdown", async ({ page }) => {
      const mobileContainer = page.locator(".md\\:hidden");

      const modeDropdownBtn = mobileContainer.getByRole("button", {
        name: "Timed (60s)",
        exact: true,
      });
      await modeDropdownBtn.click();

      const passageOption = mobileContainer.getByRole("menuitem", {
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
        mobileContainer.getByRole("menuitem", {
          name: "Timed (60s)",
          exact: true,
        }),
      ).not.toBeVisible();
    });

    test("supports keyboard navigation for custom dropdowns", async ({
      page,
    }) => {
      const mobileContainer = page.locator(".md\\:hidden");

      const diffDropdownBtn = mobileContainer.getByRole("button", {
        name: "Hard",
        exact: true,
      });

      // Focus the button and press ArrowDown to open and focus first item
      await diffDropdownBtn.focus();
      await page.keyboard.press("ArrowDown");

      const easyOption = mobileContainer.getByRole("menuitem", {
        name: "Easy",
        exact: true,
      });
      await expect(easyOption).toBeFocused();

      // Press ArrowDown to move to next item
      await page.keyboard.press("ArrowDown");
      const mediumOption = mobileContainer.getByRole("menuitem", {
        name: "Medium",
        exact: true,
      });
      await expect(mediumOption).toBeFocused();

      // Press ArrowUp to move back
      await page.keyboard.press("ArrowUp");
      await expect(easyOption).toBeFocused();

      // Press End to jump to the last item
      await page.keyboard.press("End");
      const hardOption = mobileContainer.getByRole("menuitem", {
        name: "Hard",
        exact: true,
      });
      await expect(hardOption).toBeFocused();

      // Press Home to jump to the first item
      await page.keyboard.press("Home");
      await expect(easyOption).toBeFocused();

      // Press Escape to close and return focus to trigger
      await page.keyboard.press("Escape");
      await expect(easyOption).not.toBeVisible();
      await expect(diffDropdownBtn).toBeFocused();

      // Re-open with ArrowUp to test Tab behavior
      await page.keyboard.press("ArrowUp");
      await expect(easyOption).toBeFocused();

      // Press Tab to close the dropdown normally (focus leaves)
      await page.keyboard.press("Tab");
      await expect(easyOption).not.toBeVisible();
    });
  });

  test.describe("Responsive Layout", () => {
    test.describe("Mobile viewport (375px)", () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
      });

      test("shows the small logo and hides the large logo", async ({
        page,
      }) => {
        const smallLogo = page.locator('img[src*="logo-small.svg"]');
        const largeLogo = page.locator('img[src*="logo-large.svg"]');

        await expect(smallLogo).toBeVisible();
        await expect(largeLogo).toBeHidden();
      });

      test("shows mobile dropdowns and hides desktop pills", async ({
        page,
      }) => {
        // Desktop pills have specific labels like "Difficulty:" and "Mode:"
        await expect(
          page.getByText("Difficulty:", { exact: true }),
        ).toBeHidden();
        await expect(page.getByText("Mode:", { exact: true })).toBeHidden();

        // Mobile dropdowns use a down arrow icon next to the active button
        const mobileDropdownIcons = page.locator(
          'img[src*="icon-down-arrow.svg"]',
        );
        await expect(mobileDropdownIcons).toHaveCount(2); // One for difficulty, one for mode
        await expect(mobileDropdownIcons.first()).toBeVisible();
      });

      test("shows 'Best:' label (short) in the header", async ({ page }) => {
        await expect(page.getByText("Best:", { exact: true })).toBeVisible();
        await expect(
          page.getByText("Personal best:", { exact: true }),
        ).toBeHidden();
      });
    });

    test.describe("Desktop viewport (1280px)", () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 720 });
      });

      test("shows the large logo and hides the small logo", async ({
        page,
      }) => {
        const smallLogo = page.locator('img[src*="logo-small.svg"]');
        const largeLogo = page.locator('img[src*="logo-large.svg"]');

        await expect(smallLogo).toBeHidden();
        await expect(largeLogo).toBeVisible();
      });

      test("shows desktop pills and hides mobile dropdowns", async ({
        page,
      }) => {
        // Desktop pills have "Difficulty:" and "Mode:" labels
        await expect(
          page.getByText("Difficulty:", { exact: true }),
        ).toBeVisible();
        await expect(page.getByText("Mode:", { exact: true })).toBeVisible();

        // Mobile dropdown icons should be hidden
        const mobileDropdownIcons = page.locator(
          'img[src*="icon-down-arrow.svg"]',
        );
        await expect(mobileDropdownIcons.first()).toBeHidden();
      });

      test("shows 'Personal best:' label (full) in the header", async ({
        page,
      }) => {
        await expect(
          page.getByText("Personal best:", { exact: true }),
        ).toBeVisible();
        await expect(page.getByText("Best:", { exact: true })).toBeHidden();
      });

      test("difficulty and mode pills are all visible on desktop", async ({
        page,
      }) => {
        // We can get the desktop container by looking for the one containing "Difficulty:"
        const difficultyContainer = page
          .getByText("Difficulty:", { exact: true })
          .locator("..");
        await expect(
          difficultyContainer.getByRole("button", {
            name: "Easy",
            exact: true,
          }),
        ).toBeVisible();
        await expect(
          difficultyContainer.getByRole("button", {
            name: "Medium",
            exact: true,
          }),
        ).toBeVisible();
        await expect(
          difficultyContainer.getByRole("button", {
            name: "Hard",
            exact: true,
          }),
        ).toBeVisible();

        const modeContainer = page
          .getByText("Mode:", { exact: true })
          .locator("..");
        await expect(
          modeContainer.getByRole("button", {
            name: "Timed (60s)",
            exact: true,
          }),
        ).toBeVisible();
        await expect(
          modeContainer.getByRole("button", { name: "Passage", exact: true }),
        ).toBeVisible();
      });
    });
  });

  test.describe("Difficulty Switcher", () => {
    test("changes the passage text when difficulty is changed", async ({
      page,
    }) => {
      // By default it's Hard, which starts with "The archaeological expedition"
      await verifyPassageFromDifficulty(page, "hard");

      // Change to Easy
      await selectOption(page, "Hard", "Easy");

      // Check the new passage text for Easy
      await verifyPassageFromDifficulty(page, "easy");
    });

    test("resets test state when difficulty is changed during an active test", async ({
      page,
    }) => {
      await page.getByRole("button", { name: "Start Typing Test" }).click();

      const initialPassageText = await getPassageText(page, "The");
      // Type a bit to change state
      await page.keyboard.press(initialPassageText[0]);
      await page.keyboard.press(initialPassageText[1]);

      // Verify state changed (moved to 3rd character)
      const activeChar = page.locator("#active-char");
      await expect(activeChar).toHaveText(initialPassageText[2]);

      // Change to Medium
      await selectOption(page, "Hard", "Medium");

      // Test should reset to idle, passage should be blurred, Start button should appear
      await expect(
        page.getByRole("button", { name: "Start Typing Test" }),
      ).toBeVisible();
      await verifyPassageFromDifficulty(page, "medium", {
        expectBlurred: true,
      });
    });

    test.describe("Mobile viewport", () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
      });

      test("changes the passage text when difficulty is changed via mobile dropdown", async ({
        page,
      }) => {
        await verifyPassageFromDifficulty(page, "hard");

        const mobileContainer = page.locator(".md\\:hidden");
        await mobileContainer
          .getByRole("button", { name: "Hard", exact: true })
          .click();
        await mobileContainer
          .getByRole("menuitem", { name: "Easy", exact: true })
          .click();

        await verifyPassageFromDifficulty(page, "easy");
      });

      test("resets test state when difficulty is changed via mobile dropdown during an active test", async ({
        page,
      }) => {
        await page.getByRole("button", { name: "Start Typing Test" }).click();

        const initialPassageText = await getPassageText(page, "The");
        await page.keyboard.press(initialPassageText[0]);
        await page.keyboard.press(initialPassageText[1]);

        const activeChar = page.locator("#active-char");
        await expect(activeChar).toHaveText(initialPassageText[2]);

        const mobileContainer = page.locator(".md\\:hidden");
        await mobileContainer
          .getByRole("button", { name: "Hard", exact: true })
          .click();
        await mobileContainer
          .getByRole("menuitem", { name: "Medium", exact: true })
          .click();

        await expect(
          page.getByRole("button", { name: "Start Typing Test" }),
        ).toBeVisible();
        await verifyPassageFromDifficulty(page, "medium", {
          expectBlurred: true,
        });
      });
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
      const currentPassageText = await verifyPassageFromDifficulty(
        page,
        "hard",
        { expectNotBlurred: true, fallback: "T" },
      );

      // Startup overlay should be hidden
      await expect(
        page.getByRole("button", { name: "Start Typing Test" }),
      ).not.toBeVisible();

      // There should be a visible restart button
      await expect(
        page.getByRole("button", { name: "Restart Test" }),
      ).toBeVisible();

      // The active character should be the first letter
      const activeChar = page.locator("#active-char");
      await expect(activeChar).toHaveText(currentPassageText[0]);
    });

    test("styles correctly typed characters", async ({ page }) => {
      const currentPassageText = await getPassageText(page, "T ");
      // Type first char (correct)
      await page.keyboard.press(currentPassageText[0]);

      // The first character should now be green
      const chars = page.locator("p > span.relative");
      await expect(chars.nth(0)).toHaveClass(
        /text-typing-speed-test-green-500/,
      );

      // The active character should have moved to the second character
      await expect(page.locator("#active-char")).toHaveText(
        currentPassageText[1],
      );
    });

    test("styles incorrectly typed characters", async ({ page }) => {
      // Type "x" (incorrect)
      await page.keyboard.press("x");

      // The first character should now be red and underlined
      const chars = page.locator("p > span.relative");
      await expect(chars.nth(0)).toHaveClass(/text-typing-speed-test-red-500/);
      await expect(chars.nth(0)).toHaveClass(/underline/);
    });

    test("enforces case-sensitivity for typed characters", async ({ page }) => {
      // Type wrong case
      const currentPassageText = await getPassageText(page, "T");
      const firstChar = currentPassageText.charAt(0);
      const wrongCaseChar =
        firstChar === firstChar.toUpperCase()
          ? firstChar.toLowerCase()
          : firstChar.toUpperCase();
      await page.keyboard.press(wrongCaseChar);

      const chars = page.locator("p > span.relative");

      // The wrong case should be explicitly marked as incorrect
      await expect(chars.nth(0)).toHaveClass(/text-typing-speed-test-red-500/);
      await expect(chars.nth(0)).toHaveClass(/underline/);
    });

    test("reverts styling and moves active cursor back on backspace", async ({
      page,
    }) => {
      const stats = getStatsContainer(page);
      const currentPassageText = await getPassageText(page, "T ");

      // Before typo: initial accuracy is naturally 100%
      await expect(stats.getByText("100%")).toBeVisible();

      // Type "x" (incorrect)
      await page.keyboard.press("x");
      await page.waitForTimeout(50);

      const chars = page.locator("p > span.relative");

      // Verify the element is styled as incorrect
      await expect(chars.nth(0)).toHaveClass(/text-typing-speed-test-red-500/);

      // Verification: 0 out of 1 characters correct guarantees 0% accuracy
      await expect(stats.getByText("0%", { exact: true })).toBeVisible();

      // The active cursor should have moved to the second character
      await expect(page.locator("#active-char")).toHaveText(
        currentPassageText[1],
      );

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

      // Accuracy remains penalized because the mistake was already logged against the total keystrokes
      await expect(stats.getByText("0%", { exact: true })).toBeVisible();

      // The active cursor should have correctly moved back to the first character
      await expect(page.locator("#active-char")).toHaveText(
        currentPassageText[0],
      );
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

      const currentPassageText = await getPassageText(page, "T");
      // Type first character to ensure input top layout is stabilized after viewport resize
      await page.keyboard.press(currentPassageText[0]);
      await page.waitForTimeout(50);
      const initialTop = await input.evaluate((node) => node.style.top);

      // Type a long string to force a line wrap on the narrow mobile bounds
      // We inject the bulk of the text instantly to drastically speed up the test
      const injectText = currentPassageText.slice(1, 120);
      const typeText = currentPassageText.slice(120, 128);

      await input.fill(`${currentPassageText[0]}${injectText}`, {
        force: true,
      });

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
      await input.fill(currentPassageText[0], { force: true });

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
      await switchToPassageMode(page);

      // We must manually start the test after switching modes
      await page.getByRole("button", { name: "Start Typing Test" }).click();

      const input = page.locator('input[type="text"]');
      const passageText = await getPassageText(page);

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

    test("moves focus to the results heading when the test completes", async ({
      page,
    }) => {
      await switchToPassageMode(page);

      await page.getByRole("button", { name: "Start Typing Test" }).click();

      const input = page.locator('input[type="text"]');
      const passageText = await getPassageText(page);

      await input.fill(passageText.slice(0, -1), { force: true });
      await page.keyboard.press(passageText.slice(-1));

      const heading = page.getByRole("heading", {
        name: "Baseline Established!",
      });
      await expect(heading).toBeVisible();
      await expect(heading).toBeFocused();
    });

    test("resets all stats and UI when 'Restart Test' is clicked during an active session", async ({
      page,
    }) => {
      // Let time advance slightly so WPM and timers can calculate deviations natively
      await page.waitForTimeout(1050);

      const currentPassageText = await getPassageText(page, "T h");
      // Type some correct and incorrect characters to alter stats and UI state actively
      await page.keyboard.press(currentPassageText[0]);
      await page.keyboard.press(currentPassageText[1]);
      await page.keyboard.press("x"); // Mistake drastically drops accuracy

      const stats = getStatsContainer(page);

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

      const timeLocator = getTimeLocator(page);
      await expect(timeLocator).toHaveText("0:60");

      // Verify passage character UI styling is completely sanitized of progress/mistakes
      await expect(chars.nth(0)).not.toHaveClass(
        /text-typing-speed-test-green-500/,
      );
      await expect(chars.nth(2)).not.toHaveClass(
        /text-typing-speed-test-red-500/,
      );

      // Verify the cursor was accurately bumped back to the first character index
      const newPassageText = await getPassageText(page, "T");
      await expect(page.locator("#active-char")).toHaveText(newPassageText[0]);

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
      await switchToPassageMode(page);

      // Manually start the test after switching modes
      await page.getByRole("button", { name: "Start Typing Test" }).click();

      // Let time advance slightly so WPM and timers calculate natively
      await page.waitForTimeout(1050);

      const currentPassageText = await getPassageText(page, "Th");
      // Type some characters to push stats out of default baseline
      await page.keyboard.press(currentPassageText[0]);
      await page.keyboard.press(currentPassageText[1]);

      // Trigger the active 'Restart Test' button
      await page.getByRole("button", { name: "Restart Test" }).click();

      const stats = getStatsContainer(page);

      // Assert that all dynamic stats are completely wiped to default
      await expect(stats.getByText("100%")).toBeVisible();
      await expect(stats.getByText("0", { exact: true })).toBeVisible(); // WPM

      // CRITICAL DIFFERENCE: Passage mode counts UP from 0:00, not DOWN from 0:60
      const timeLocator = getTimeLocator(page);
      await expect(timeLocator).toHaveText("0:00");

      // Verify the cursor was accurately bumped back to the first character index
      const newPassageText = await getPassageText(page, "T");
      await expect(page.locator("#active-char")).toHaveText(newPassageText[0]);
    });

    test("instantly restarts the test when the 'Escape' key is pressed", async ({
      page,
    }) => {
      const currentPassageText = await getPassageText(page, "The ");
      // Type some characters to progress the test
      await page.keyboard.press(currentPassageText[0]);
      await page.keyboard.press(currentPassageText[1]);
      await page.keyboard.press(currentPassageText[2]);

      // Verify the active character has progressed to the fourth character
      await expect(page.locator("#active-char")).toHaveText(
        currentPassageText[3],
      );

      // Press the Escape shortcut
      await page.keyboard.press("Escape");

      // Verify the test has reset to the first character
      const newPassageText = await getPassageText(page, "T");
      await expect(page.locator("#active-char")).toHaveText(newPassageText[0]);

      // Verify stats have reset (Accuracy back to 100%)
      const stats = getStatsContainer(page);
      await expect(stats.getByText("100%")).toBeVisible();

      // Verify input is still focused for immediate typing
      const isFocused = await page.evaluate(
        () => document.activeElement?.tagName === "INPUT",
      );
      expect(isFocused).toBe(true);
    });

    test("pauses the test, stops the timer, and blurs text when the input loses focus", async ({
      page,
    }) => {
      const currentPassageText = await getPassageText(page, "T");
      // Type the first character to ensure the timer has actively started
      await page.keyboard.press(currentPassageText[0]);

      const passage = page.locator("p").filter({ hasText: currentPassageText });
      const timeLocator = getTimeLocator(page);

      // Verify the test is active and not blurred
      await expect(passage).not.toHaveClass(/blur-\[8px\]/);
      await expect(page.getByText("Paused", { exact: true })).not.toBeVisible();

      // Blur the input to simulate losing focus
      const input = page.locator('input[type="text"]');
      await input.evaluate((node) => node.blur());

      // Verify the paused UI overlay is shown
      await expect(page.getByText("Paused", { exact: true })).toBeVisible();
      await expect(page.getByText("Click the text to resume")).toBeVisible();
      await expect(passage).toHaveClass(/blur-\[8px\]/);

      // Verify the timer is paused by waiting 1.1s and checking that time hasn't changed
      const timeWhilePaused = await timeLocator.textContent();
      await page.waitForTimeout(1100);
      const timeAfterWait = await timeLocator.textContent();
      expect(timeAfterWait).toBe(timeWhilePaused);

      // Resume the test by clicking the paused overlay (which bubbles up to the container)
      await page.getByText("Paused", { exact: true }).click();

      // Verify the test resumes to active state
      await expect(page.getByText("Paused", { exact: true })).not.toBeVisible();
      await expect(passage).not.toHaveClass(/blur-\[8px\]/);

      // Verify the input is refocused
      const isRefocused = await page.evaluate(
        () => document.activeElement?.tagName === "INPUT",
      );
      expect(isRefocused).toBe(true);
    });
  });

  test.describe("Stats Update While Typing", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "Start Typing Test" }).click();
    });

    test("WPM updates as user types correct characters", async ({ page }) => {
      // Get initial WPM (should be 0 before typing)
      const wpmLocator = getStatsContainer(page).getByText(/^\d+$/);

      const currentPassageText = await getPassageText(page, "The");
      // Type correct characters to build up WPM
      await page.keyboard.press(currentPassageText[0]);
      await page.keyboard.press(currentPassageText[1]);
      await page.keyboard.press(currentPassageText[2]);

      // Wait for WPM to update (it calculates based on time elapsed, needs > 1s)
      await page.waitForTimeout(1100);

      // WPM should now be greater than 0
      const wpmText = await wpmLocator.textContent();
      expect(parseInt(wpmText ?? "0")).toBeGreaterThan(0);
    });

    test("Accuracy starts at 100% and updates with correct/incorrect typing", async ({
      page,
    }) => {
      const stats = getStatsContainer(page);

      // Initial accuracy should be 100%
      await expect(stats.getByText("100%")).toBeVisible();

      const currentPassageText = await getPassageText(page, "T");
      // Type a correct character - accuracy should still be 100%
      await page.keyboard.press(currentPassageText[0]);
      await page.waitForTimeout(50);
      await expect(stats.getByText("100%")).toBeVisible();

      // Type an incorrect character - accuracy should drop below 100%
      await page.keyboard.press("x");
      await page.waitForTimeout(50);
      // Now 1 correct out of 2 typed = 50%
      await expect(stats.getByText("50%")).toBeVisible();
    });

    test("WPM and accuracy update incrementally as more characters are typed", async ({
      page,
    }) => {
      const stats = getStatsContainer(page);
      const wpmLocator = stats
        .locator("p")
        .filter({ hasText: /^WPM:/ })
        .locator("xpath=../p[2]");

      const currentPassageText = await getPassageText(
        page,
        "The archaeological",
      );
      // Type many correct characters
      const correctText = currentPassageText.slice(0, 18);
      for (const char of correctText) {
        await page.keyboard.press(char);
      }
      await page.waitForTimeout(1100);

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
      const timeLocator = getTimeLocator(page);

      // Get initial time - should be 60 seconds
      const initialTimeText = await timeLocator.textContent();
      const initialTime = parseInt(initialTimeText?.replace(":", "") ?? "0");
      expect(initialTime).toBe(60);

      const currentPassageText = await getPassageText(page, "T");
      // Type a character to start the timer
      await page.keyboard.press(currentPassageText[0]);

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
      await completePassage(page);
    });

    test("shows baseline heading and subtitle", async ({ page }) => {
      await expect(
        page.getByRole("heading", { name: "Baseline Established!" }),
      ).toBeVisible();
      await expect(
        page.locator("p").filter({
          hasText:
            "You've set the bar. Now the real challenge begins—time to beat it.",
        }),
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
      await completePassage(page);

      // Restart to begin the second run
      await page.getByRole("button", { name: "Beat This Score" }).click();

      const secondPassageText = await getPassageText(page);

      // Second run completes immediately as well, matching the WPM <= bestWpm condition
      await page
        .locator('input[type="text"]')
        .fill(secondPassageText, { force: true });
    });

    test("shows standard complete heading and subtitle", async ({ page }) => {
      await expect(
        page.getByRole("heading", { name: "Test Complete!" }),
      ).toBeVisible();
      await expect(
        page.locator("p").filter({
          hasText: "Solid run. Keep pushing to beat your high score.",
        }),
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
      await completePassage(page);

      // Restart to begin the second run
      await page.getByRole("button", { name: "Beat This Score" }).click();

      const secondPassageText = await getPassageText(page);

      // Type first char to start the timer (hasStartedTyping = true)
      await page.keyboard.press(secondPassageText[0]);

      // Wait 1.1s so that timeElapsed becomes 1. This ensures calculated WPM > 0.
      await page.waitForTimeout(1100);

      // Second run completes, matching WPM (> 0) > bestWpm (0)
      await page
        .locator('input[type="text"]')
        .fill(secondPassageText, { force: true });
    });

    test("shows high score smashed heading and subtitle", async ({ page }) => {
      await expect(
        page.getByRole("heading", { name: "High Score Smashed!" }),
      ).toBeVisible();
      await expect(
        page.locator("p").filter({
          hasText: "You're getting faster. That was incredible typing.",
        }),
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

  test.describe("Local Storage Persistence", () => {
    test("loads personal best from local storage on mount", async ({
      page,
    }) => {
      // Set the local storage value before navigating
      await page.addInitScript(() => {
        window.localStorage.setItem("typing-test-best-wpm", "123");
      });
      await page.goto("/typing-speed-test");

      // Verify the header displays the loaded personal best
      await expect(page.getByText("123 WPM")).toBeVisible();
    });

    test("saves personal best to local storage upon completion", async ({
      page,
    }) => {
      await page.goto("/typing-speed-test");
      await page.getByRole("button", { name: "Start Typing Test" }).click();

      const currentPassageText = await getPassageText(page, "T");
      // Type the first character to start the timer
      await page.keyboard.press(currentPassageText[0]);

      // Wait for timeElapsed to be >= 1s so calculated WPM > 0
      await page.waitForTimeout(1100);

      const passageText = await getPassageText(page);

      // Finish the passage to complete the test
      await page
        .locator('input[type="text"]')
        .fill(passageText.slice(0, -1), { force: true });
      await page.keyboard.press(passageText.slice(-1));

      // Wait for the results screen to verify completion
      await expect(
        page.getByRole("heading", { name: "Baseline Established!" }),
      ).toBeVisible();

      // Retrieve the saved value from local storage natively
      const savedWpm = await page.evaluate(() => {
        return window.localStorage.getItem("typing-test-best-wpm");
      });

      // The saved WPM should not be null and should be populated with the achieved score
      expect(savedWpm).not.toBeNull();
      expect(parseInt(savedWpm!)).toBeGreaterThan(0);
    });

    test("loads user preferences for mode and difficulty from local storage on mount", async ({
      page,
    }) => {
      // Set the local storage values before navigating
      await page.addInitScript(() => {
        window.localStorage.setItem("typing-test-mode", "Passage");
        window.localStorage.setItem("typing-test-difficulty", "Easy");
      });
      await page.goto("/typing-speed-test");

      // Verify the preferences are applied to the UI (check mobile dropdown triggers)
      const mobileDiffBtn = page.locator(".md\\:hidden > div > button").first();
      await expect(mobileDiffBtn).toContainText("Easy");

      const mobileModeBtn = page.locator(".md\\:hidden > div > button").nth(1);
      await expect(mobileModeBtn).toContainText("Passage");
    });

    test("saves user preferences to local storage on change", async ({
      page,
    }) => {
      await page.goto("/typing-speed-test");

      // Change Mode to Passage (using desktop pills for simplicity)
      await page
        .locator(".md\\:flex")
        .getByRole("button", { name: "Passage" })
        .click();

      // Change Difficulty to Easy
      await page
        .locator(".md\\:flex")
        .getByRole("button", { name: "Easy" })
        .click();

      // Retrieve values from local storage
      const savedMode = await page.evaluate(() =>
        window.localStorage.getItem("typing-test-mode"),
      );
      const savedDiff = await page.evaluate(() =>
        window.localStorage.getItem("typing-test-difficulty"),
      );

      expect(savedMode).toBe("Passage");
      expect(savedDiff).toBe("Easy");
    });
  });

  test.describe("Accidental Navigation Prevention", () => {
    test("prevents default and sets returnValue on beforeunload when attempting to leave during an active test", async ({
      page,
    }) => {
      await page.goto("/typing-speed-test");
      await page.getByRole("button", { name: "Start Typing Test" }).click();

      // Dispatch beforeunload event manually to reliably test the listener logic
      const eventDetails = await page.evaluate(() => {
        const event = new Event("beforeunload", { cancelable: true });
        window.dispatchEvent(event);
        return {
          defaultPrevented: event.defaultPrevented,
        };
      });

      expect(eventDetails.defaultPrevented).toBe(true);
    });

    test("does not interfere with beforeunload when test is idle", async ({
      page,
    }) => {
      await page.goto("/typing-speed-test");

      // Need some interaction to simulate a real scenario
      await page
        .locator(".md\\:flex")
        .getByRole("button", { name: "Easy" })
        .click();

      const eventDetails = await page.evaluate(() => {
        const event = new Event("beforeunload", { cancelable: true });
        window.dispatchEvent(event);
        return {
          defaultPrevented: event.defaultPrevented,
        };
      });

      expect(eventDetails.defaultPrevented).toBe(false);
    });
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  test.describe("Accessibility", () => {
    test("idle state should not have any automatically detectable accessibility issues", async ({
      page,
    }) => {
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(["color-contrast"])
        .analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test("active state should not have accessibility issues", async ({
      page,
    }) => {
      // 1. Trigger the active state
      await page.getByRole("button", { name: "Start Typing Test" }).click();

      // 2. Wait for the state to settle (e.g., ensure the Restart button is visible)
      await expect(
        page.getByRole("button", { name: "Restart Test" }),
      ).toBeVisible();

      // 3. Run the Axe scan
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(["color-contrast"])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test("finished state should not have accessibility issues", async ({
      page,
    }) => {
      // 1. Instantly complete passage to reach finished state
      await completePassage(page);

      // 4. Ensure the results screen rendered
      await expect(
        page.getByRole("heading", { name: "Baseline Established!" }),
      ).toBeVisible();

      // 5. Run the Axe scan
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(["color-contrast"])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test("paused state should not have accessibility issues", async ({
      page,
    }) => {
      // 1. Start the test
      await page.getByRole("button", { name: "Start Typing Test" }).click();

      // 2. Type a character to ensure timer and active state begin
      const currentPassageText = await getPassageText(page, "T");
      await page.keyboard.press(currentPassageText[0]);

      // 3. Blur the input to trigger the paused state
      const input = page.locator('input[type="text"]');
      await input.evaluate((node) => node.blur());

      // 4. Wait for the Paused overlay to become visible
      await expect(page.getByText("Paused", { exact: true })).toBeVisible();

      // 5. Run the Axe scan
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(["color-contrast"])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test("mobile dropdowns should not have accessibility issues when open", async ({
      page,
    }) => {
      // 1. Set to mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      // 2. Open the Difficulty dropdown
      await page
        .locator(".md\\:hidden")
        .getByRole("button", { name: "Hard", exact: true })
        .click();

      // 3. Ensure dropdown is open (items have role="menuitem" after a11y improvements)
      await expect(
        page
          .locator(".md\\:hidden")
          .getByRole("menuitem", { name: "Easy", exact: true }),
      ).toBeVisible();

      // 4. Run the Axe scan
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(["color-contrast"])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test("announces incorrect keystrokes via live region", async ({ page }) => {
      // 1. Start the test
      await page.getByRole("button", { name: "Start Typing Test" }).click();

      const liveRegion = page.locator('.sr-only[aria-live="assertive"]');

      // 2. Initial state: should be empty
      await expect(liveRegion).toBeEmpty();

      const currentPassageText = await getPassageText(page, "T");
      // 3. Type an incorrect character
      await page.keyboard.press("x");

      // 4. Verify the live region correctly announces the error
      const expectedChar = currentPassageText.startsWith(" ")
        ? "space"
        : currentPassageText[0];
      await expect(liveRegion).toHaveText(
        `Incorrect. Expected ${expectedChar}, typed x.`,
      );
    });
  });
});
