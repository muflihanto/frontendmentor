# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - IP address tracker solution](#frontend-mentor---ip-address-tracker-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [Mock Slow API Response in Playwright Tests](#mock-slow-api-response-in-playwright-tests)
      - [Mock API Failure in Playwright Tests](#mock-api-failure-in-playwright-tests)
      - [Converting Timezone Identifiers to UTC Offset](#converting-timezone-identifiers-to-utc-offset)
    - [Useful resources](#useful-resources)
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

#### Mock API Failure in Playwright Tests

You can also use `page.route()` to simulate API errors and test how your application handles failure cases gracefully.

```js
test("handles API errors gracefully", async ({ page }) => {
  // Mock the API response with a 500 error
  await page.route("/api/getIpInfo*", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ error: "Server error" }),
    });
  });

  const apiErrorBanner = page.getByText("Failed to fetch IP information");
  await expect(apiErrorBanner).not.toBeVisible();

  const form = page.locator("form");
  const input = form.getByPlaceholder("Search for any IP address or domain");
  await input.fill("8.8.8.8");
  await form.getByRole("button").click();

  // Check if the UI shows appropriate error state
  await expect(apiErrorBanner).toBeVisible();

  // Check error banner styling
  const errorBanner = apiErrorBanner.locator("..");
  await expect(errorBanner).toHaveCSS("background-color", "rgb(239, 68, 68)");
  await expect(errorBanner).toHaveCSS("color", "rgb(255, 255, 255)");
});
```

This technique is useful for:

- Verifying error messages are displayed to users
- Testing error UI styling and accessibility
- Ensuring the app doesn't crash on API failures
- Testing error dismissal and recovery flows

#### Converting Timezone Identifiers to UTC Offset

When working with timezone data from APIs, you often receive timezone identifiers (like `America/New_York` or `Asia/Jakarta`) rather than UTC offsets. The `getTimezoneOffset` function converts these [IANA timezone identifiers](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) to a formatted UTC offset string (e.g., `UTC +07:00`).

The implementation uses JavaScript's `toLocaleString()` with the `timeZone` option to calculate the offset difference:

```typescript
function getTimezoneOffset(tz: string): string {
  const d1 = new Date(Date.now());
  d1.setMilliseconds(0); // for nice rounding
  const d1OffsetHrs = (d1.getTimezoneOffset() / 60) * -1;

  const d2LocaleStr = d1.toLocaleString("en-US", { timeZone: tz });
  const d2 = new Date(d2LocaleStr);

  const diffHrs = (d2.getTime() - d1.getTime()) / 1000 / 60 / 60;
  const d2OffsetHrs = d1OffsetHrs + diffHrs;

  let formattedOffset = "UTC ";
  switch (true) {
    case d2OffsetHrs < -9:
      formattedOffset += `${d2OffsetHrs}`;
      break;
    case d2OffsetHrs < 0:
      formattedOffset += `-0${d2OffsetHrs.toString()[1]}`;
      break;
    case d2OffsetHrs < 10:
      formattedOffset += `+0${d2OffsetHrs}`;
      break;
    default:
      formattedOffset += `+${d2OffsetHrs}`;
  }

  return `${formattedOffset}:00`;
}
```

**How it works:**

1. Get the current date and the local timezone offset
2. Convert the date to the target timezone using `toLocaleString()`
3. Calculate the difference in hours between the two dates
4. Add this difference to the local offset to get the target timezone's offset
5. Format the offset as a UTC string with proper sign and padding

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Calculate the UTC offset given a TimeZone string in JavaScript - Stack Overflow](https://stackoverflow.com/questions/36112774/calculate-the-utc-offset-given-a-timezone-string-in-javascript) - This answer by ekerner (posted August 14, 2019) provides an elegant solution for converting IANA timezone identifiers to UTC offset strings using `toLocaleString()` and `getTime()`. I used this approach in the `getTimezoneOffset` function.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
