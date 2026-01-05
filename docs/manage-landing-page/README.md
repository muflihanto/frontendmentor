# Frontend Mentor - Manage landing page solution

This is a solution to the [Manage landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/manage-landing-page-SLXqC6P5). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Manage landing page solution](#frontend-mentor---manage-landing-page-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [CSS Scroll Snap](#css-scroll-snap)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- See all testimonials in a horizontal slider
- Receive an error message when the newsletter sign up `form` is submitted if:
  - The `input` field is empty
  - The email address is not formatted correctly

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
- [React Hook Form](https://react-hook-form.com/) - React forms build tool
- [Zod](https://zod.dev/) - TypeScript-first schema validation

### What I learned

#### CSS Scroll Snap

I used CSS Scroll Snap to create a smooth, touch-friendly testimonial carousel. By using Tailwind's `snap-x` and `snap-mandatory` utilities on the container, combined with `snap-center` on the items, the carousel automatically snaps to the nearest testimonial when scrolling.

Scroll container implementation:

```tsx
<motion.div
  className={cn([
    "flex w-full snap-x snap-mandatory items-center gap-8 overflow-x-auto scroll-smooth",
    // ... other classes
  ])}
  ref={carouselRef}
>
  {testimonials.map((testi) => (
    <Testimonial testimony={testi} key={testi.name} />
  ))}
</motion.div>
```

Testimonial item implementation:

```tsx
function Testimonial({ testimony, className }) {
  return (
    <div
      className={cn(
        "min-w-[calc(100vw-32px)] max-w-[539px] shrink-0 snap-center",
        className,
      )}
    >
      {/* ... content */}
    </div>
  );
}
```

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Tailwind CSS - Scroll Snap Type](https://tailwindcss.com/docs/scroll-snap-type) - Utilities for controlling how strictly snap points are enforced in a scroll container.
- [Tailwind CSS - Scroll Snap Align](https://tailwindcss.com/docs/scroll-snap-align) - Utilities for controlling the scroll snap alignment of an element.
- [MDN - CSS Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap) - Comprehensive guide on how scroll snap works in CSS.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
