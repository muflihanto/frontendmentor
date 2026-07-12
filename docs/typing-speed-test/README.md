# Frontend Mentor - Typing Speed Test solution

This is a solution to the [Typing Speed Test challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Typing Speed Test solution](#frontend-mentor---typing-speed-test-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
        - [Test Controls](#test-controls)
        - [Typing Experience](#typing-experience)
        - [Results \& Progress](#results--progress)
        - [UI \& Responsiveness](#ui--responsiveness)
      - [Data Model](#data-model)
      - [Expected Behaviors](#expected-behaviors)
      - [Data Persistence](#data-persistence)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [Handling Paste Events](#handling-paste-events)
      - [Mocking Timers in Playwright](#mocking-timers-in-playwright)
      - [Input Element Attributes for Typing Tests](#input-element-attributes-for-typing-tests)
      - [Automated Accessibility Testing with AxeBuilder](#automated-accessibility-testing-with-axebuilder)
      - [Accidental Navigation Protection \& Page Unload Interception](#accidental-navigation-protection--page-unload-interception)
      - [Dynamic Caret Tracking \& Line-Wrap Scroll Syncing](#dynamic-caret-tracking--line-wrap-scroll-syncing)
      - [Locator Getter Helpers (The `get...` Pattern)](#locator-getter-helpers-the-get-pattern)
        - [Why this is useful:](#why-this-is-useful)
      - [Test Helper Functions for Repeated Tasks](#test-helper-functions-for-repeated-tasks)
        - [Why this is useful:](#why-this-is-useful-1)
      - [Centralized Configuration Objects (The `RESULTS_CONFIG` and `STORAGE_KEYS` Pattern)](#centralized-configuration-objects-the-results_config-and-storage_keys-pattern)
        - [Storage Keys Configuration](#storage-keys-configuration)
        - [Results Display Configuration](#results-display-configuration)
        - [Why this is useful:](#why-this-is-useful-2)
      - [XPath Fragility \& the Adjacent-Sibling Alternative](#xpath-fragility--the-adjacent-sibling-alternative)
        - [Why this is useful:](#why-this-is-useful-3)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

##### Test Controls

- Start a test by clicking the start button or by clicking the passage and typing
- Select a difficulty level (Easy, Medium, Hard) for passages of varying complexity
- Switch between "Timed (60s)" mode and "Passage" mode (timer counts up, no limit)
- Restart at any time to get a new random passage from the selected difficulty

##### Typing Experience

- See real-time WPM, accuracy, and time stats while typing
- See visual feedback showing correct characters (green), errors (red/underlined), and cursor position
- Correct mistakes with backspace (original errors still count against accuracy)

##### Results & Progress

- View results showing WPM, accuracy, and characters (correct/incorrect) after completing a test
- See a "Baseline Established!" message on their first test, setting their personal best
- See a "High Score Smashed!" celebration with confetti when beating their personal best
- Have their personal best persist across sessions via localStorage

##### UI & Responsiveness

- View the optimal layout depending on their device's screen size
- See hover and focus states for all interactive elements

#### Data Model

A `data.json` file is provided with passages organized by difficulty. Each passage has the following structure:

```json
{
  "id": "easy-1",
  "text": "The sun rose over the quiet town. Birds sang in the trees as people woke up and started their day."
}
```

| Property | Type   | Description                                                               |
| -------- | ------ | ------------------------------------------------------------------------- |
| `id`     | string | Unique identifier for the passage (e.g., "easy-1", "medium-3", "hard-10") |
| `text`   | string | The passage text the user will type                                       |

#### Expected Behaviors

- **Starting the test**: The timer begins when the user starts typing or clicks the start button. Clicking directly on the passage text and typing also initiates the test
- **Timed mode**: 60-second countdown. Test ends when timer reaches 0 or passage is completed
- **Passage mode**: Timer counts up with no limit. Test ends when the full passage is typed
- **Error handling**: Incorrect characters are highlighted in red with an underline. Backspace allows corrections, but errors still count against accuracy
- **Results logic**:
  - First completed test: "Baseline Established!" - sets initial personal best
  - New personal best: "High Score Smashed!" with confetti animation
  - Normal completion: "Test Complete!" with encouragement message

#### Data Persistence

The personal best score should persist across browser sessions using `localStorage`. When a user beats their high score, the new value should be saved and displayed on subsequent visits.

<!-- ### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com) -->

## My process

### Built with

- Semantic HTML5 markup
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

### What I learned

#### Handling Paste Events

This project provided my first opportunity to use the `onPaste` event in React. I used it to prevent users from cheating on the typing test by pasting text directly into the hidden input field.

```tsx
<input
  // ... other props
  onPaste={(e) => e.preventDefault()}
/>
```

I also wrote a test using Playwright to ensure this functionality works correctly. The test dispatches a synthetic `paste` event and then checks the `Event.defaultPrevented` property to verify that `preventDefault()` was called. According to the MDN Web Docs, `defaultPrevented` is a read-only boolean property on the `Event` interface that returns `true` if `preventDefault()` has been invoked on that event, and `false` otherwise. This only works when the event is created with `cancelable: true`, since `preventDefault()` has no effect on non-cancelable events:

```typescript
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
```

#### Mocking Timers in Playwright

Additionally, I learned how to use Playwright's Clock API (`page.clock`), introduced in Playwright v1.45, to reliably test time-dependent functionality such as the 60-second timer in the typing test. This approach avoids using `waitForTimeout` with large values, significantly speeding up the test suite and preventing flakiness.

According to the Playwright documentation, `clock.install()` must be called before navigating to the page or performing any actions that trigger time-dependent functions. Once installed, it overrides native global functions including `Date`, `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval`, `requestAnimationFrame`, and `performance`, giving the test full control over the passage of time.

Playwright provides two primary methods for advancing time:

- **`clock.runFor(ticks)`**: Runs the clock for a specific duration, firing all timers that become due during that interval. This is more reliable for React applications as it allows the microtask queue to flush between ticks.
- **`clock.fastForward(ticks)`**: Jumps forward by a specific amount, firing due timers at most once. This is ideal for scenarios like simulating a user closing and reopening a laptop.

```typescript
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
```

#### Input Element Attributes for Typing Tests

To ensure a fair and consistent typing experience, especially on mobile devices, I used several specific attributes on the `<input>` element. These attributes prevent the browser or operating system from interfering with the user's raw typing input:

```tsx
<input
  // ... other props
  autoComplete="off"
  autoCorrect="off"
  autoCapitalize="off"
  spellCheck="false"
/>
```

- **`autoComplete="off"`**: Prevents the browser from suggesting previously entered text.
- **`autoCorrect="off"`**: Disables the device's automatic spelling correction, which is crucial since typing tests evaluate raw input accuracy.
- **`autoCapitalize="off"`**: Stops mobile keyboards from automatically capitalizing the first letter of sentences, ensuring case sensitivity remains the user's responsibility.
- **`spellCheck="false"`**: Removes the red squiggly lines under "misspelled" words or nonsense passages, preventing visual distractions.

#### Automated Accessibility Testing with AxeBuilder

In this project, I integrated `@axe-core/playwright` to run automated accessibility checks across multiple interactive states of the application. Instead of just testing the initial load, I used multiple instances of `AxeBuilder` to verify that the app remains accessible as the user interacts with it.

I wrote separate tests for the idle, active, paused, and finished states, as well as for the mobile dropdown menus. For example, here is how I tested the finished state:

```typescript
test("finished state should not have accessibility issues", async ({
  page,
}) => {
  // ... (setup state by starting and finishing the test)

  // Ensure the results screen rendered
  await expect(
    page.getByRole("heading", { name: "Baseline Established!" }),
  ).toBeVisible();

  // Run the Axe scan on the newly rendered state
  const accessibilityScanResults = await new AxeBuilder({ page })
    .disableRules(["color-contrast"])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

This approach ensured that dynamically rendered elements, like the results screen or the paused overlay, also complied with accessibility standards.

#### Accidental Navigation Protection & Page Unload Interception

To prevent users from losing active typing test progress, I set up a window `beforeunload` listener that triggers a confirmation dialog if they try to close or refresh the page during a test. The handler calls `e.preventDefault()` on the `BeforeUnloadEvent`, which signals to the browser that the page has unsaved state and should prompt for confirmation before navigating away:

```tsx
// React page component
useEffect(() => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (status === "active") {
      e.preventDefault();
      e.returnValue =
        "You have an active typing test. Are you sure you want to leave?";
    }
  };
  window.addEventListener("beforeunload", handleBeforeUnload);
  return () => window.removeEventListener("beforeunload", handleBeforeUnload);
}, [status]);
```

The `e.returnValue` assignment is a legacy mechanism for triggering the browser's confirmation dialog. According to the MDN Web Docs, setting `returnValue` to any truthy value (such as a non-empty string) was the original way to signal that the page should prompt the user before unloading. While the modern approach is to call `e.preventDefault()`, setting `returnValue` alongside it ensures compatibility with older browsers that do not yet support `preventDefault()` on `BeforeUnloadEvent`. It is important to note that modern browsers ignore the custom string and always display a generic, browser-defined message to prevent sites from using deceptive or manipulative text. Additionally, the dialog will generally only appear if the user has previously interacted with the page (e.g., clicked, typed, or tapped) — a browser security measure known as "sticky activation."

I verified this in Playwright by dispatching a synthetic `beforeunload` event with `cancelable: true` and asserting that `event.defaultPrevented` returns `true`. This pattern follows the same `preventDefault()` / `defaultPrevented` mechanism used in the paste event test — the event must be cancelable for `preventDefault()` to take effect, and `defaultPrevented` serves as a reliable post-hoc check that the handler did its job. It is worth noting that `preventDefault()` does not stop event propagation; it only cancels the browser's default action. To stop propagation, `stopPropagation()` or `stopImmediatePropagation()` would be needed instead:

```ts
// Playwright test spec
test("prevents default on beforeunload during active test", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Start Typing Test" }).click();
  const eventDetails = await page.evaluate(() => {
    const event = new Event("beforeunload", { cancelable: true });
    window.dispatchEvent(event);
    return { defaultPrevented: event.defaultPrevented };
  });
  expect(eventDetails.defaultPrevented).toBe(true);
});
```

#### Dynamic Caret Tracking & Line-Wrap Scroll Syncing

To ensure the typing experience feels fluid, I computed the caret position dynamically by reading the `offsetTop` and `offsetLeft` bounds of the active character. To prevent performance lag, these updates are synchronized via `requestAnimationFrame`. According to the MDN Web Docs, `requestAnimationFrame` tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. This provides smoother visuals and better efficiency compared to traditional timeouts, as it syncs with the display's refresh rate and automatically pauses in background tabs.

I also used `cancelAnimationFrame` to clean up the animation frame request when the component unmounts or dependencies change, preventing memory leaks and unnecessary background calculations.

Additionally, I implemented smart line-wrap scroll syncing that centers the container smoothly only when the user crosses to a new line:

```tsx
useEffect(() => {
  const handle = requestAnimationFrame(() => {
    const activeChar = document.getElementById("active-char");
    if (!activeChar) return;

    const currentOffset = activeChar.offsetTop;
    const isNewLine = lastOffsetTopRef.current !== currentOffset;

    if (isNewLine) {
      activeChar.scrollIntoView({ behavior: "smooth", block: "center" });
      lastOffsetTopRef.current = currentOffset;
    }

    setCaretStyle({
      top: activeChar.offsetTop,
      left: activeChar.offsetLeft,
      width: activeChar.offsetWidth,
      height: activeChar.offsetHeight,
      opacity: 1,
    });
  });
  return () => cancelAnimationFrame(handle);
}, [input, status]);
```

#### Locator Getter Helpers (The `get...` Pattern)

To keep the test code clean, DRY (Don't Repeat Yourself), and resilient to layout changes, I established a pattern of using locator getter helpers in [tests/typing-speed-test.spec.ts](../../tests/typing-speed-test.spec.ts).

Rather than writing inline, verbose locator chains multiple times throughout the spec, we define pure locator helper functions:

- [getMobileContainer](../../tests/typing-speed-test.spec.ts#L68-L70): Selects the mobile-only viewport wrapper.
- [getStatsContainer](../../tests/typing-speed-test.spec.ts#L72-L74): Locates the primary stats container card.
- [getTimeLocator](../../tests/typing-speed-test.spec.ts#L76-L81): Navigates through the stats structure relative to the time label.

```typescript
function getMobileContainer(page: Page) {
  return page.locator(".md\\:hidden");
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
```

##### Why this is useful:

1. **DRY Implementation**: Minimizes duplication of complex CSS and XPath-like selector paths.
2. **Locator Composition**: Helpers can build on top of other helpers (e.g., `getTimeLocator` leverages `getStatsContainer`).
3. **Single Source of Truth**: If class names or DOM structures change during layout updates, we only update the selector logic in a single function rather than searching and replacing references throughout dozens of test suites.

#### Test Helper Functions for Repeated Tasks

To keep the test suite concise, readable, and DRY in [tests/typing-speed-test.spec.ts](../../tests/typing-speed-test.spec.ts), I abstracted common workflows and viewport-dependent interactions into reusable helper functions:

- [selectOption](../../tests/typing-speed-test.spec.ts#L5-L24): Handles responsive option selection (clicking desktop buttons vs. opening mobile dropdowns depending on viewport).
- [startTest](../../tests/typing-speed-test.spec.ts#L34-L36): Clicks the overlay to begin the test.
- [getPassageText](../../tests/typing-speed-test.spec.ts#L38-L40): Retrieves the target passage text.
- [verifyPassageFromDifficulty](../../tests/typing-speed-test.spec.ts#L42-L62): Verifies the passage text and checks active status or blur styles.
- [completeTest](../../tests/typing-speed-test.spec.ts#L64-L82): Simulates a full test run (starting, filling input, and mock-advancing time).

##### Why this is useful:

1. **DRY Workflows**: Repetitive sequences (like starting a test or switching modes) are defined in one place.
2. **Encapsulates Viewport Differences**: Viewport selection differences are hidden inside the helpers, simplifying test files.
3. **Improves Test Scannability**: Individual tests focus strictly on assertions rather than setup mechanics:

   ```typescript
   test("moves focus to the results heading when the test completes", async ({
     page,
   }) => {
     // completeTest() handles switching mode, starting the test, typing the text, and clock mocking
     await completeTest(page);

     // The test body remains focused on the primary assertion rather than setup noise
     const heading = page.getByRole("heading", {
       name: "Baseline Established!",
     });
     await expect(heading).toBeFocused();
   });
   ```

#### Centralized Configuration Objects (The `RESULTS_CONFIG` and `STORAGE_KEYS` Pattern)

To ensure consistency and ease of updates, I grouped related configurations and magic strings into read-only constant objects in [pages/typing-speed-test.tsx](../../pages/typing-speed-test.tsx).

- [STORAGE_KEYS](../../pages/typing-speed-test.tsx#L43-L47): A centralized record of local storage keys used to persist high scores, mode, and difficulty preferences.
- [RESULTS_CONFIG](../../pages/typing-speed-test.tsx#L929-L949): Configures the title, subtitle, button text, and icon assets based on the test completion state (e.g., establishing a baseline, achieving a new personal best, or general completion).

##### Storage Keys Configuration

```typescript
const STORAGE_KEYS = {
  BEST_WPM: "typing-test-best-wpm",
  MODE: "typing-test-mode",
  DIFFICULTY: "typing-test-difficulty",
} as const;
```

##### Results Display Configuration

```typescript
const RESULTS_CONFIG = {
  baseline: {
    title: "Baseline Established!",
    subtitle:
      "You've set the bar. Now the real challenge begins—time to beat it.",
    buttonText: "Beat This Score",
    icon: "/typing-speed-test/assets/images/icon-completed.svg",
  },
  newBest: {
    title: "High Score Smashed!",
    subtitle: "You're getting faster. That was incredible typing.",
    buttonText: "Go Again",
    icon: "/typing-speed-test/assets/images/icon-new-pb.svg",
  },
  complete: {
    title: "Test Complete!",
    subtitle: "Solid run. Keep pushing to beat your high score.",
    buttonText: "Go Again",
    icon: "/typing-speed-test/assets/images/icon-completed.svg",
  },
};
```

##### Why this is useful:

1. **Prevents Typo Bugs**: Referencing constants like `STORAGE_KEYS.BEST_WPM` instead of raw strings prevents silent local storage bugs due to typos.
2. **Declarative Rendering**: Rather than cluttering the JSX template with verbose conditional logic or multiple `if/else` returns, the component maps state to the config object (e.g., `RESULTS_CONFIG[resultType]`) to pull all text and asset paths.
3. **Maintainability**: Text copy, icon paths, and keys can be altered in one centralized place without having to inspect or modify the underlying rendering/storage logic.

#### XPath Fragility & the Adjacent-Sibling Alternative

While building the stats locators, I initially reached for a positional XPath to grab the numeric value sitting next to a label:

```typescript
function getTimeLocator(page: Page) {
  return getStatsContainer(page)
    .locator("p")
    .filter({ hasText: /^Time:/ })
    .locator("xpath=../p[2]");
}
```

The problem with `xpath=../p[2]` is that it is **fragile**: it depends entirely on the value being the parent's _second_ `<p>` child. If anyone inserts another `<p>` before the value (or reorders the markup), the selector silently grabs the wrong node, and tests either fail or, worse, assert against the wrong data with no error. Positional selectors like `p[2]` couple the test to the exact DOM index rather than the logical relationship between label and value.

I replaced it with the CSS adjacent-sibling combinator, which targets the element that immediately _follows_ the label in the markup:

```typescript
function getTimeLocator(page: Page) {
  return getStatsContainer(page)
    .locator("p")
    .filter({ hasText: /^Time:/ })
    .locator("+ p");
}
```

##### Why this is useful:

1. **Relationship over position**: `+ p` selects the `<p>` that directly follows the "Time:" label, so the locator stays correct even if extra siblings are added before the value.
2. **Self-documenting intent**: It reads as "the value next to this label" rather than an opaque index, making the test easier to reason about.
3. **Resilience to refactors**: Markup restructures that preserve the label → value adjacency keep the test green, reducing false-negative failures after harmless layout changes.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [MDN Web Docs: HTML attribute: autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) - This page documents the `autocomplete` attribute used to prevent the browser from suggesting previously entered text.
- [MDN Web Docs: HTML element: input (autocorrect)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autocorrect) - This documentation covers the non-standard `autocorrect` attribute (supported largely in Safari) used to disable spelling correction.
- [MDN Web Docs: Global attributes: autocapitalize](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize) - This resource explains the `autocapitalize` attribute which controls automatic capitalization, especially on mobile devices.
- [MDN Web Docs: Global attributes: spellcheck](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck) - This page covers the `spellcheck` attribute used to disable native spell checking and its red squiggly lines.
- [MDN Web Docs: Event.defaultPrevented](https://developer.mozilla.org/en-US/docs/Web/API/Event/defaultPrevented) - This documentation explains the read-only boolean property used to check whether `preventDefault()` was called on an event.
- [MDN Web Docs: Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) - This resource details how to cancel a browser's default action for cancelable events, and clarifies that it does not stop event propagation.
- [MDN Web Docs: Event.cancelable](https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelable) - This page explains the `cancelable` property, which determines whether an event's default action can be prevented.
- [MDN Web Docs: BeforeUnloadEvent: returnValue](https://developer.mozilla.org/en-US/docs/Web/API/BeforeUnloadEvent/returnValue) - This documentation covers the legacy `returnValue` property used alongside `preventDefault()` for cross-browser beforeunload confirmation dialogs.
- [MDN Web Docs: window.requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) - This resource explains how to optimize animations by syncing them with the display's refresh rate for smoother visuals.
- [MDN Web Docs: window.cancelAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/cancelAnimationFrame) - This documentation details how to cancel an animation frame request to prevent memory leaks and unnecessary background processes.
- [Playwright Docs: Clock](https://playwright.dev/docs/clock) - This guide covers Playwright's Clock API for mocking and controlling time in tests, including `install()`, `runFor()`, and `fastForward()`.

<!-- ### AI Collaboration

Describe how you used AI tools (if any) during this project. This helps demonstrate your ability to work effectively with AI assistants.

- What tools did you use (e.g., ChatGPT, Claude, GitHub Copilot)?
- How did you use them (e.g., debugging, generating boilerplate, brainstorming solutions)?
- What worked well? What didn't? -->

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
