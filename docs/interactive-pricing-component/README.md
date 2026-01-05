# Frontend Mentor - Interactive pricing component solution

This is a solution to the [Interactive pricing component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-pricing-component-t0m8PIyY8). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Interactive pricing component solution](#frontend-mentor---interactive-pricing-component-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [Custom Tailwind Variants](#custom-tailwind-variants)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Use the slider and toggle to see prices for different page view numbers

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

### What I learned

#### Custom Tailwind Variants

To style the slider (range input) consistently across browsers while staying within the Tailwind CSS workflow, I implemented custom variants using Tailwind's plugin system. This allowed me to target vendor-specific pseudo-elements like `::-webkit-slider-thumb` and `::-moz-range-thumb` directly with utility classes.

Custom variant definition in `tailwind.config.ts`:

```ts
// tailwind.config.ts
import plugin from "tailwindcss/plugin";

export default {
  // ...
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("thumb", [
        "&[type='range']::-webkit-slider-thumb",
        "&[type='range']::-moz-range-thumb",
        "&[type='range']::-ms-thumb",
      ]);
      addVariant("track", [
        "&[type='range']::-webkit-slider-runnable-track",
        "&[type='range']::-moz-range-track",
        "&[type='range']::-ms-track",
      ]);
    }),
  ],
};
```

Usage in the component:

```tsx
<input
  type="range"
  className="... thumb:h-10 thumb:w-10 thumb:bg-pricing-primary-cyan-200 track:bg-transparent"
/>
```

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Tailwind CSS - Adding Custom Variants](https://tailwindcss.com/docs/plugins#adding-variants) - Documentation on how to extend Tailwind with custom variants.
- [MDN - ::-webkit-slider-thumb](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-slider-thumb) - Reference for styling the thumb of a range input in WebKit/Blink browsers.
- [MDN - ::-moz-range-thumb](https://developer.mozilla.org/en-US/docs/Web/CSS/::-moz-range-thumb) - Reference for styling the thumb of a range input in Firefox.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
