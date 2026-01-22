# Frontend Mentor - Fylo data storage component solution

This is a solution to the [Fylo data storage component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/fylo-data-storage-component-1dZPRbV5n). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Fylo data storage component solution](#frontend-mentor---fylo-data-storage-component-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [CSS custom properties with Tailwind CSS](#css-custom-properties-with-tailwind-css)
      - [Floating-point assertions in Playwright](#floating-point-assertions-in-playwright)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size

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

#### CSS custom properties with Tailwind CSS

This project marks my first usage of CSS custom properties (variables) combined with Tailwind CSS arbitrary value syntax. This approach is particularly useful for dynamic styles that are difficult to express with standard Tailwind classes alone, such as a progress bar width calculated from state.

```tsx
<div
  style={
    {
      "--bar-length": `${(storage.remaining / storage.maximum) * 100}%`,
    } as CSSProperties
  }
  className="from-fylo-storage-primary-gradient-100 to-fylo-storage-primary-gradient-200 flex h-full w-[--bar-length] items-center justify-end rounded-full bg-gradient-to-r p-[2px]"
>
  <div className="aspect-square h-full rounded-full bg-white" />
</div>
```

By using `as CSSProperties`, I can define custom properties in the `style` attribute that are then accessible within Tailwind's arbitrary value brackets `[...]`.

#### Floating-point assertions in Playwright

Used the `toBeCloseTo` assertion to verify floating-point calculations with tolerance:

```ts
// tests/fylo-data-storage-component.spec.ts
expect(fillWidth).toBeCloseTo(81.5, -0.5);
```

The `toBeCloseTo` matcher uses the formula `|expected - actual| < (10 ** -precision) / 2`. By passing `-0.5` as the precision (numDigits), the tolerance becomes `(10 ** 0.5) / 2 = √10 / 2 ≈ 1.58`. This allows the test to pass even if subtle layout factors like padding or sub-pixel rendering cause the calculated width to deviate slightly from the theoretical 81.5%.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Playwright - toBeCloseTo Documentation](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-be-close-to) - Official documentation for the `toBeCloseTo` assertion.
- [Jest - toBeCloseTo Documentation](https://jestjs.io/docs/expect#tobeclosetoexpect-numdigits) - `toBeCloseTo` behavior, which Playwright follows.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
