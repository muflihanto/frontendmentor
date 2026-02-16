# Frontend Mentor - Browser extensions manager UI solution

This is a solution to the [Browser extensions manager UI challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/browser-extension-manager-ui-yNZnOfsMAp). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Browser extensions manager UI solution](#frontend-mentor---browser-extensions-manager-ui-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [Dynamic Multi-Variable SVG Styling](#dynamic-multi-variable-svg-styling)
      - [Conditional SVG Group Visibility](#conditional-svg-group-visibility)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- Toggle extensions between active and inactive states
- Filter active and inactive extensions
- Remove extensions from the list
- Select their color theme
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
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

### What I learned

#### Dynamic Multi-Variable SVG Styling

In this project, I implemented dynamic CSS variable styling using Tailwind's arbitrary property syntax to control multiple parts of an SVG independently. This technique allows for granular, theme-aware color management of distinct SVG paths within a single asset loaded via the `<use>` element.

By defining multiple variables (e.g., `--logo-shape` and `--logo-text`), I can target different elements of the SVG logo—such as the icon and the typography—and style them with different colors that react to the theme toggle simultaneously.

```tsx
<svg
  viewBox="0 0 179 41"
  className={cn(
    "aspect-[179/41] h-[41px]",
    "[--logo-shape:theme(colors.browser-extensions.red.700)] dark:[--logo-shape:theme(colors.browser-extensions.red.400)]",
    "[--logo-text:theme(colors.browser-extensions.neutral.800)] dark:[--logo-text:theme(colors.white)]",
  )}
  role="graphics-symbol"
  aria-hidden="true"
>
  <use href="/browser-extensions-manager-ui/assets/images/logo.svg#logo" />
</svg>
```

#### Conditional SVG Group Visibility

Another technique I used was managing the visibility of different icons within a single `<svg>` container using conditional group (`<g>`) tags. Instead of swapping the entire SVG component, I toggle the visibility of specific groups based on the application state (like dark mode). This keeps the DOM structure stable while allowing for simple theme-switching logic within the SVG itself.

```tsx
<svg
  viewBox="0 0 22 22"
  className="w-[22px]"
  role="graphics-symbol"
  aria-hidden="true"
>
  <g className={isDark ? "block" : "hidden"}>
    <use href="/browser-extensions-manager-ui/assets/images/icon-sun.svg#icon-sun" />
  </g>
  <g className={isDark ? "hidden" : "block"}>
    <use href="/browser-extensions-manager-ui/assets/images/icon-moon.svg#icon-moon" />
  </g>
</svg>
```

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
