# Frontend Mentor - Advice generator app solution

This is a solution to the [Advice generator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/advice-generator-app-QdUG-13db). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Advice generator app solution](#frontend-mentor---advice-generator-app-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [Force Loading State in Playwright Tests](#force-loading-state-in-playwright-tests)
      - [Dynamic Viewport Testing](#dynamic-viewport-testing)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Generate a new piece of advice by clicking the dice icon

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
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

### What I learned

#### Force Loading State in Playwright Tests

When testing loading states, you can override `window.fetch` to return a Promise that never resolves. This forces the UI to stay in its loading state indefinitely, making it easy to test loading indicators and spinners.

```js
await page.evaluate(() => {
  window.fetch = () => new Promise(() => {});
});
await page.getByLabel("Generate new advice").click();

const spinner = page.getByRole("status");
await expect(spinner).toBeVisible();
```

This technique is useful for verifying that loading states are properly displayed and accessible without relying on timing-based assertions.

#### Dynamic Viewport Testing

To test responsive behavior within a single test case, `page.setViewportSize` can be used to change the browser's viewport dynamically. This is particularly useful when you need to verify that elements (like images using `srcset` or `<picture>`) respond correctly to size changes without restarting the browser context.

```js
test("displays correct divider image based on viewport", async ({ page }) => {
  // Set mobile view
  await page.setViewportSize({ width: 375, height: 667 });
  const mobileDivider = page.getByAltText("Line Divider");
  // ... assertions for mobile ...

  // Switch to desktop view
  await page.setViewportSize({ width: 1440, height: 800 });
  // Small delay might be needed for layout/image source re-calculation
  await page.waitForTimeout(300);

  // ... assertions for desktop ...
});
```

**Comparison: `page.setViewportSize` vs `test.use({ viewport })`**

- **`page.setViewportSize`**: Changes the viewport **dynamically** during test execution. It is ideal for testing transitions and responsiveness within a single flow.
- **`test.use({ viewport: { ... } })`**: Sets a **static** viewport for all tests in a file or block. It is a configuration setting that applies when the browser context is created. If you only need to test a specific view (e.g., "only mobile" or "only desktop"), `test.use` is the preferred, more declarative approach.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Playwright Documentation - `page.setViewportSize()`](https://playwright.dev/docs/api/class-page#page-set-viewport-size) - Official API reference for dynamically changing the viewport size.
- [Playwright Documentation - `test.use({ viewport })`](https://playwright.dev/docs/test-use-options#browser-and-context-options) - Official guide on how to configure the viewport for all tests in a file or block.
- [Playwright Documentation - Emulation](https://playwright.dev/docs/emulation) - Comprehensive guide on emulating mobile devices, including viewports and touch.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
