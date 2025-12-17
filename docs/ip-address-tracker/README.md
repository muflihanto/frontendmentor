# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - IP address tracker solution](#frontend-mentor---ip-address-tracker-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

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
- [Leaflet](https://leafletjs.com/) - JS library for mobile-friendly interactive maps
- [Jotai](https://jotai.org/) - React state management
- [React Hook Form](https://react-hook-form.com/) - React forms build tool
- [Zod](https://zod.dev/) - TypeScript-first schema validation

### What I learned

#### Mock Slow API Response in Playwright Tests

When testing loading states that depend on API responses, you can use Playwright's `page.route()` to intercept requests and simulate slow network conditions. This allows you to verify loading spinners, disabled states, and other UI feedback during async operations.

```js
test("show loading state in button during API request", async ({ page }) => {
  // Mock slow API response
  await page.route("**/api/getIpInfo?ip=8.8.8.8", async (route) => {
    await page.waitForTimeout(1000); // Simulate slow network
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: {
          ip: "8.8.8.8",
          city: "Mountain View",
          // ... other fields
        },
      }),
    });
  });

  const input = page.locator('input[type="text"]');
  const submitButton = page.locator('button[type="submit"]');

  await input.fill("8.8.8.8");
  await submitButton.click();

  // Check loading spinner in button
  const loadingSpinner = page.locator(".animate-spin");
  await expect(loadingSpinner).toBeVisible();

  // Button should be disabled during loading
  await expect(submitButton).toBeDisabled();
});
```

This technique is useful for:
- Verifying loading indicators appear during API calls
- Testing that form controls are properly disabled during submission
- Ensuring the UI maintains previous data while new data is loading

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept. -->

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
