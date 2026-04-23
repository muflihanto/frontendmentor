# Frontend Mentor - Typing Speed Test solution

This is a solution to the [Typing Speed Test challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Typing Speed Test solution](#frontend-mentor---typing-speed-test-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

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
