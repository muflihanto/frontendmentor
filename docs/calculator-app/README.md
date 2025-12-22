# Frontend Mentor - Calculator app solution

This is a solution to the [Calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Calculator app solution](#frontend-mentor---calculator-app-solution)
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

- See the size of the elements adjust based on their device's screen size
- Perform mathmatical operations like addition, subtraction, multiplication, and division
- Adjust the color theme based on their preference
- **Bonus**: Have their initial theme preference checked using `prefers-color-scheme` and have any additional changes saved in the browser

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
- [Jotai](https://jotai.org/) - React state management
- [math-expression-evaluator](https://github.com/redhivesoftware/math-expression-evaluator#readme) - Evaluator for Math expression in JS

### What I learned

In this project, I implemented a theme switcher that respects the user's system preferences using the `prefers-color-scheme` media query. I used `jotai` for state management and `usehooks-ts` for easy media query handling in React.

Here's how I initialized the theme based on the system preference:

```ts
const MEDIA_QUERY = "(prefers-color-scheme: dark)";

export const calculatorThemeAtom = atomWithStorage<calculatorTheme>(
  "calc-theme",
  typeof window !== "undefined" && window.matchMedia(MEDIA_QUERY).matches
    ? 3
    : 2,
);
```

I also added a `useEffect` hook to update the theme dynamically when the system preference changes, while also keeping track of whether the user has manually changed the theme:

```tsx
const matches = useMediaQuery(MEDIA_QUERY);
const prevThemeRef = useRef<number>(0);

useEffect(() => {
  if (prevThemeRef.current !== 0) {
    const updatedTheme = matches ? 3 : 2;
    setTheme(updatedTheme);
    prevThemeRef.current = updatedTheme;
  }
}, [matches, setTheme]);
```

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Jotai Documentation](https://jotai.org/docs/utils/atom-with-storage) - This helped me understand how to persist the theme in local storage easily.
- [usehooks-ts useMediaQuery](https://usehooks-ts.com/react-hook/use-media-query) - A great hook for handling media queries in a React-way.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
