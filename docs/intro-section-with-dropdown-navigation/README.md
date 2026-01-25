# Frontend Mentor - Intro section with dropdown navigation solution

This is a solution to the [Intro section with dropdown navigation challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/intro-section-with-dropdown-navigation-ryaPetHE5). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Intro section with dropdown navigation solution](#frontend-mentor---intro-section-with-dropdown-navigation-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [Preventing background scroll](#preventing-background-scroll)
      - [Accessible SVGs](#accessible-svgs)
      - [TypeScript types in React](#typescript-types-in-react)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the relevant dropdown menus on desktop and mobile when interacting with the navigation links
- View the optimal layout for the content depending on their device's screen size
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

#### Preventing background scroll

To prevent background scrolling when the mobile menu is open, I used a `useEffect` hook to toggle the `overflow` property of the `body` element.

```js
useEffect(() => {
  if (isMenuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }
}, [isMenuOpen]);
```

#### Accessible SVGs

I used `role="graphics-symbol"` for SVG icons to improve accessibility for screen readers. This role specifically identifies a graphic as a single functional or decorative symbol (like an icon) rather than a complex image or document.

```tsx
<svg
  viewBox="0 0 10 6"
  className="h-1.5"
  role="graphics-symbol"
  aria-label="Arrow Down"
>
  <use href="/intro-section-with-dropdown-navigation/images/icon-arrow-down.svg#icon-arrow-down" />
</svg>
```

#### TypeScript types in React

I learned the difference between `JSX.Element`, `React.ReactElement`, and `React.ReactNode` when working with TypeScript in React. `JSX.Element` and `React.ReactElement` are used for the result of a JSX expression, while `React.ReactNode` is more comprehensive, covering everything React can render (including strings, numbers, and fragments). For typing `children` props, `React.ReactNode` is the preferred choice.

<!--### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [MDN - overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) - This helped me understand how to control scrolling behavior.
- [University of Melbourne - Accessible SVGs](https://www.unimelb.edu.au/accessibility/techniques/accessible-svgs) - A great resource for implementing accessible SVGs, specifically explaining the use of `role="graphics-symbol"` for icons.
- [Total TypeScript - JSX.Element vs React.ReactNode](https://www.totaltypescript.com/jsx-element-vs-react-reactnode) - A clear explanation of the differences between React's TypeScript types.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
