# Frontend Mentor - Insure landing page solution

This is a solution to the [Insure landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/insure-landing-page-uTU68JV8). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Insure landing page solution](#frontend-mentor---insure-landing-page-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [CSS Viewport Units: `svh`, `dvh`, `lvh`](#css-viewport-units-svh-dvh-lvh)
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
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

### What I learned

#### CSS Viewport Units: `svh`, `dvh`, `lvh`

This project marks my first usage of the new CSS viewport units (`svh`, `dvh`, `lvh`) which solve the common mobile viewport height problem.

The traditional `vh` unit doesn't account for dynamic browser UI elements (like the address bar on mobile), causing layout issues. The new units address this:

- **`svh` (Small Viewport Height)** - The viewport size when browser UI is fully expanded (smallest visible area)
- **`dvh` (Dynamic Viewport Height)** - Adjusts dynamically as browser UI appears/disappears
- **`lvh` (Large Viewport Height)** - The viewport size when browser UI is fully hidden (largest visible area)

```css
/* Used in the mobile navigation menu */
.menu {
  height: calc(100svh - 80px);
}
```

Using `svh` ensures the content fits properly even when the mobile browser's address bar is visible.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [CSS vh, dvh, lvh, svh and vw units](https://dev.to/frehner/css-vh-dvh-lvh-svh-and-vw-units-27k4) - A comprehensive explanation of the new viewport units and when to use each one.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
