# Frontend Mentor - Room homepage solution

This is a solution to the [Room homepage challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/room-homepage-BtdBY_ENq). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Room homepage solution](#frontend-mentor---room-homepage-solution)
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
- Navigate the slider using either their mouse/trackpad or keyboard

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
- [Framer Motion](https://www.framer.com/motion/) - Motion library for React

### What I learned

During this project, I used the CSS `clamp()` function for the first time to create fluid typography and responsive spacing.

The `clamp(min, preferred, max)` function calculates a value based on three parameters:

- **Minimum**: The lower bound.
- **Preferred**: The value that scales (e.g., using `vw` or `vh`).
- **Maximum**: The upper bound.

It effectively works as `max(min, min(preferred, max))`, ensuring the value stays within the defined range while remaining fluid.

For example, I used it to scale the font size of the main heading and paragraphs fluidly:

```tsx
<h1 className="text-[40px] font-semibold leading-[37px] tracking-[-1.7px] text-room-primary-400 lg:text-[clamp(40px,calc(48/800*100dvh),48px)] lg:leading-[45px] lg:tracking-[-2px]">
  {product[activeProduct].title}
</h1>
<p className="mt-[15px] font-medium leading-[22px] tracking-[-.35px] text-room-primary-200 lg:mt-[22px] lg:text-[clamp(15px,calc(16/800*100dvh),16px)]">
  {product[activeProduct].description}
</p>
```

It's also useful for responsive padding:

```tsx
<div className="h-[410px] w-full px-8 py-[61px] lg:flex lg:h-full lg:w-auto lg:flex-col lg:justify-center lg:px-[clamp(80px,calc(100/1440*100vw),100px)] lg:py-0 lg:pb-[34px]">
  {/* Content */}
</div>
```

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [clamp() - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) - This is the official MDN documentation for the `clamp()` function, which explains how to use it to clamp a value between an upper and lower bound.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
