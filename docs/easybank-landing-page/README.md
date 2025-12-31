# Frontend Mentor - Easybank landing page solution

This is a solution to the [Easybank landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/easybank-landing-page-WaUhkoDN). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Easybank landing page solution](#frontend-mentor---easybank-landing-page-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
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
- [HeadlessUI](https://headlessui.com/) - UI components

### What I learned

In this project, I learned how to dynamically change the color of an SVG logo using the `currentColor` attribute in combination with Tailwind CSS and the SVG `<use>` tag.

By setting `fill="currentColor"` inside the SVG file, the SVG paths inherit the text color of their parent element. This allows me to control the logo's color directly through Tailwind's text color utilities, including arbitrary values.

**SVG Implementation (`logo.svg`):**

```xml
<svg xmlns="http://www.w3.org/2000/svg" id="easybank-logo">
  <!-- ... -->
  <path fill="currentColor" d="..." />
  <g fill="currentColor">
    <path d="..." />
  </g>
</svg>
```

**React Component (`easybank-landing-page.tsx`):**
In the React component, I use the `<use>` tag to reference the external SVG and apply Tailwind's arbitrary value classes to change the color based on the context (header vs. footer).

```tsx
function Logo({ variant, className, ...props }: LogoProps) {
  return (
    <svg
      {...props}
      viewBox="0 0 139 20"
      className={cn([
        "h-5",
        variant === "footer" ? "text-white" : "text-[#2D314D]", // Dynamic coloring with arbitrary value
        className,
      ])}
    >
      <title>Easybank Logo</title>
      <use href="/easybank-landing-page/images/logo.svg#easybank-logo" />
    </svg>
  );
}
```

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Using SVG currentColor](https://css-tricks.com/cascading-svg-fill-color/) - This article explains how the `currentColor` keyword works with SVGs.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
