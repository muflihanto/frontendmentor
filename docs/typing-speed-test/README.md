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

I also wrote a test using Playwright to ensure this functionality works correctly:

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

Additionally, I learned how to use Playwright's clock mocking feature (`page.clock`) to reliably test time-dependent functionality, such as the 60-second timer in the typing test. This approach avoids using `waitForTimeout` with large values, significantly speeding up the test suite and preventing flakiness.

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

To prevent users from losing active typing test progress, I set up a window `beforeunload` listener that triggers a confirmation dialog if they try to close or refresh the page during a test. I verified this in Playwright by programmatically dispatching a native `beforeunload` event and asserting its cancellation:

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

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

### AI Collaboration

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
