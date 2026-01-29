# Frontend Mentor - Notifications page solution

This is a solution to the [Notifications page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/notifications-page-DqK5QAmKbC). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Notifications page solution](#frontend-mentor---notifications-page-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [E2E Testing with Playwright](#e2e-testing-with-playwright)
      - [Local Font Optimization with `next/font/local`](#local-font-optimization-with-nextfontlocal)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- Distinguish between "unread" and "read" notifications
- Select "Mark all as read" to toggle the visual state of the unread notifications and set the number of unread messages to zero
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
- CSS custom properties
- Flexbox
- Mobile-first workflow
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Playwright](https://playwright.dev/) - End-to-end testing framework

### What I learned

#### E2E Testing with Playwright

This project marks the first time I used [Playwright](https://playwright.dev/) for end-to-end testing. I learned how to set up and run E2E tests for a React/Next.js application, which significantly improved my confidence in the codebase.

Key takeaways:

- **Interaction testing**: Using `page.getByRole` and `page.locator` to simulate user actions, such as clicking the "Mark all as read" button.
- **Responsive verification**: Testing the layout across different viewports (e.g., mobile at 375px and desktop at 1440px) using `page.setViewportSize`.

Example of a test for the "Mark all as read" functionality:

```ts
test('"mark all as read" button works', async ({ page }) => {
  const button = page.getByRole("button", { name: "Mark all as read" });
  const indicator = page.locator("header div");
  await expect(indicator).toHaveText("3");
  await button.click();
  await expect(indicator).toHaveText("0");
});
```

#### Local Font Optimization with `next/font/local`

I implemented `next/font/local` to optimize the loading of the "Plus Jakarta Sans" font. This approach allows Next.js to automatically optimize the font file, provide zero layout shift through CSS variables, and ensure the font is self-hosted with the application.

Implementation in `pages/notifications-page.tsx`:

```tsx
const _plusJakartaSans = localFont({
  src: "../public/notifications-page/assets/fonts/PlusJakartaSans-VariableFont_wght.ttf",
  variable: "--font-plus-jakarta",
});

// Combining the variable and the Tailwind class
const plusJakartaSans = `${_plusJakartaSans.variable} font-plus-jakarta`;
```

This variable is mapped in `tailwind.config.ts` to enable the `font-plus-jakarta` utility class, providing a seamless bridge between Next.js font optimization and Tailwind's styling system.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Next.js Font Optimization Documentation](https://nextjs.org/docs/14/pages/building-your-application/optimizing/fonts#local-fonts) - Comprehensive guide on using `next/font/local` for self-hosted fonts.
- [Playwright Documentation](https://playwright.dev/docs/intro) - The official documentation is excellent for learning E2E testing from scratch.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. -->
