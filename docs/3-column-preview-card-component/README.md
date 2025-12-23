# Frontend Mentor - 3-column preview card component solution

This is a solution to the [3-column preview card component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/3column-preview-card-component-pH92eAR2-). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - 3-column preview card component solution](#frontend-mentor---3-column-preview-card-component-solution)
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

- View the optimal layout depending on their device's screen size
- See hover states for interactive elements

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

Optimized SVG icons by using the `<use>` tag to reference external SVG files instead of inlining the full SVG paths in JSX. This approach reduces bundle size and simplifies the component code significantly.

**Before (inline SVG with ~80 lines of code):**

```tsx
function Icons({ variant }: { variant: "sedans" | "luxury" | "suvs" }) {
  switch (variant) {
    case "sedans":
      return (
        <svg viewBox="0 0 64 40">
          <g fill="none" fillRule="evenodd">
            <circle fill="#000" opacity=".201" cx="20" cy="20" r="20" />
            <path d="M52.936 24.11c1.942..." fill="#FFD473" />
          </g>
        </svg>
      );
    // ... similar for other variants
  }
}
```

**After (using `<use>` tag):**

```tsx
function Icons({ variant }: { variant: "sedans" | "luxury" | "suvs" }) {
  return (
    <svg className="ml-[1px] h-10 w-[64px]" viewBox="0 0 64 40">
      <use
        href={`/3-column-preview-card-component/images/icon-${variant}.svg#icon-${variant}`}
      />
    </svg>
  );
}
```

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [SVG in JS](https://kurtextrem.de/posts/svg-in-js) - Great article explaining the performance implications of inlining SVGs in JavaScript and better alternatives like using the `<use>` tag.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
