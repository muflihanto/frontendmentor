# Frontend Mentor - Blogr landing page solution

This is a solution to the [Blogr landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/blogr-landing-page-EX2RLAApP). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Blogr landing page solution](#frontend-mentor---blogr-landing-page-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [Automated Accessibility Testing](#automated-accessibility-testing)
      - [Keyboard Navigation Simulation](#keyboard-navigation-simulation)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page

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
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Axe-core for Playwright](https://playwright.dev/docs/accessibility-testing) - Automated accessibility testing

### What I learned

#### Automated Accessibility Testing

This project marks the first time I integrated [axe-core](https://www.deque.com/axe/) via `@axe-core/playwright` to automate accessibility testing. This allows for catching common accessibility issues (like missing labels or incorrect ARIA attributes) automatically during the E2E test suite.

Key takeaways:

- **AxeBuilder**: Using the `AxeBuilder` class to scan the page or specific components.
- **Rule Configuration**: Learning how to disable specific rules (like `color-contrast` if needed) to focus on structural accessibility.
- **Continuous Accessibility**: Ensuring that every new feature meets a baseline of accessibility by default.

Example of an automated accessibility scan in Playwright:

```ts
import AxeBuilder from "@axe-core/playwright";

test("should not have any automatically detectable accessibility issues", async ({
  page,
}) => {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .disableRules(["color-contrast"])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

#### Keyboard Navigation Simulation

Beyond automated scanning, I used Playwright's `keyboard` API to manually verify that complex interactive components—like the nested navigation dropdowns—are fully operable via keyboard. This ensures compliance with success criteria like [WCAG 2.1 Keyboard (2.1.1)](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html).

```typescript
test("desktop navigation works with keyboard", async ({ page }) => {
  const nav = page.getByRole("navigation").first();
  const firstItem = nav.getByRole("menuitem", { name: "Product" });
  const secondItem = nav.getByRole("menuitem", { name: "Company" });

  await firstItem.focus();
  await expect(firstItem).toBeFocused();

  // Simulate ArrowRight to move focus
  await page.keyboard.down("ArrowRight");
  await expect(secondItem).toBeFocused();

  // Simulate ArrowLeft to move focus back
  await page.keyboard.down("ArrowLeft");
  await expect(firstItem).toBeFocused();
});
```

**Key methods used:**

- **`locator.focus()`**: Programmatically moves focus to an element to start the keyboard interaction flow.
- **`page.keyboard.down(key)`**: Simulates a physical key press. This is more realistic than just triggering events as it tests the actual browser/application response to hardware-level signals.
- **`expect(locator).toBeFocused()`**: A Playwright-specific assertion to verify that the accessibility focus is exactly where it's expected to be.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Axe-core for Playwright Documentation](https://playwright.dev/docs/accessibility-testing) - A great guide on how to integrate accessibility testing into your Playwright tests.
- [Axe-core Rules](https://dequeuniversity.com/rules/axe/4.10) - Detailed documentation on all the rules axe-core checks for.
- [Playwright - Keyboard API](https://playwright.dev/docs/api/class-keyboard) - Reference for simulating keyboard events to test interactive elements.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
