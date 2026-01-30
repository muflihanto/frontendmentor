# Frontend Mentor - Social media dashboard with theme switcher solution

This is a solution to the [Social media dashboard with theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/social-media-dashboard-with-theme-switcher-6oY8ozp_H). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Social media dashboard with theme switcher solution](#frontend-mentor---social-media-dashboard-with-theme-switcher-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [Tailwind CSS Dark Mode Configuration](#tailwind-css-dark-mode-configuration)
      - [Accessible Theme Switcher](#accessible-theme-switcher)
      - [System Color Scheme Testing (Playwright)](#system-color-scheme-testing-playwright)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Toggle color theme to their preference

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

### What I learned

#### Tailwind CSS Dark Mode Configuration

This project uses Tailwind CSS's `darkMode: "class"` strategy (configured in `tailwind.config.ts:1169`). This setting tells Tailwind to apply dark mode styles only when a parent element has the `.dark` class, rather than relying on the system's color scheme preference.

```ts
// tailwind.config.ts
export default {
  // ... other config
  darkMode: "class",
} satisfies Config;
```

This configuration works in conjunction with the React context theme switcher. When the theme is toggled, the `dark` class is added or removed from `document.documentElement` (the `<html>` tag), which triggers Tailwind to apply all `dark:` prefixed utility classes throughout the application.

```tsx
// From pages/social-media-dashboard-with-theme-switcher.tsx:104-115
useEffect(() => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    if (theme === "light") setTheme("dark");
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [theme]);
```

The combination of `darkMode: "class"` and manual class manipulation via React context provides:

- **Explicit control** over when dark mode is applied
- **Persistence** of user preference via localStorage
- **Respect for system preference** when no user preference is set
- **Immediate visual feedback** without page reload

#### Accessible Theme Switcher

In this project, I learned how to implement an accessible theme switcher using the ARIA `switch` role. Using a `button` with `role="switch"` and `aria-checked` is a more semantic way to represent a toggle that takes immediate effect compared to a standard checkbox.

```tsx
<div className="... ... mt-[16px] flex justify-between focus-within:outline">
  <label htmlFor="darkSwitch" className="..." id="dark-label">
    Dark Mode
  </label>
  <button
    className="... ... flex h-[24px] w-[48px] dark:justify-start"
    onClick={() => {
      update?.();
    }}
    type="button"
    id="darkSwitch"
    role="switch"
    aria-checked={theme === "dark"}
  >
    <span className="... aspect-square h-[18px] rounded-full" />
  </button>
</div>
```

#### System Color Scheme Testing (Playwright)

To test how the application responds to system-level color scheme preferences (e.g., "dark mode" or "light mode" set at the OS/browser level), `page.emulateMedia` can be used within a test case.

```ts
test("theme respects system preference", async ({ page }) => {
  const button = page.getByRole("switch", { name: "Dark Mode" });

  // Set system preference to dark
  await page.emulateMedia({ colorScheme: "dark" });
  await page.reload();

  // Should automatically switch to dark mode
  await expect(button).toHaveAttribute("aria-checked", "true");

  // Set system preference back to light
  await page.emulateMedia({ colorScheme: "light" });
  await page.reload();

  // Should automatically switch to light mode
  await expect(button).toHaveAttribute("aria-checked", "false");
});
```

**Comparison: `page.emulateMedia({ colorScheme })` vs `test.use({ colorScheme })`**

- **`page.emulateMedia({ colorScheme })`**: Changes the color scheme **dynamically** during test execution. This is perfect for verifying that the app correctly listens and reacts to system preference changes without needing to restart the browser context.
- **`test.use({ colorScheme: '...' })`**: Sets a **static** color scheme for all tests in a block or file. It is a configuration-level setting that emulates the preference when the browser context is initially created. Use this when you want to run a suite of tests specifically in light or dark mode.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [W3C ARIA Authoring Practices Guide - Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/examples/switch-button/) - This resource provided a clear example of how to implement an accessible switch button, which I used for the theme toggle.
- [Playwright Documentation - `page.emulateMedia()`](https://playwright.dev/docs/api/class-page#page-emulate-media) - Official API reference for emulating media features like color scheme.
- [Playwright Documentation - `test.use({ colorScheme })`](https://playwright.dev/docs/test-use-options#browser-and-context-options) - Official guide on configuring the color scheme at the test or file level.
- [Playwright Documentation - Emulation](https://playwright.dev/docs/emulation) - Comprehensive guide on emulating various browser and system states.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
