# Frontend Mentor - Job listings with filtering solution

This is a solution to the [Job listings with filtering challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Job listings with filtering solution](#frontend-mentor---job-listings-with-filtering-solution)
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
- Filter job listings based on the categories

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
- [Jotai](https://jotai.org/) - React state management
- [TS-Pattern](https://github.com/gvergnaud/ts-pattern) - TS exhaustive pattern matching library

### What I learned

To maintain type safety when using `Object.entries()` on an object with specific keys (like the filters in this project), I implemented a helper type called `Entries<T>`. This ensures that the resulting array of key-value pairs preserves the relationship between the key and its corresponding value type, rather than defaulting to `string` and `any`.

```typescript
type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
```

Usage with `Object.entries()`:

```typescript
(Object.entries(filters) as FilterEntries).every((filter) => {
  if (filter[1].size === 0) return true;
  // filter[0] is correctly typed as 'languages' | 'levels' | 'roles' | 'tools'
  // filter[1] is correctly typed as Set<Language> | Set<Level> | etc.
});
```

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [TypeScript key-value relation preserving Object.entries() type](https://stackoverflow.com/questions/60141960/typescript-key-value-relation-preserving-object-entries-type) - This Stack Overflow answer provides a clean way to define an `Entries` helper type to make `Object.entries()` more type-safe in TypeScript.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
