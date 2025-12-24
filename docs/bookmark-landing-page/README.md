# Frontend Mentor - Bookmark landing page solution

This is a solution to the [Bookmark landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/bookmark-landing-page-5d0b588a9edda32581d29158). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Bookmark landing page solution](#frontend-mentor---bookmark-landing-page-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Receive an error message when the newsletter form is submitted if:
  - The input field is empty
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
- [React Stately](https://react-spectrum.adobe.com/react-stately/index.html) - React state management
- [React Aria](https://react-spectrum.adobe.com/react-aria/) - Accessible UI components for React
- [HeadlessUI](https://headlessui.com/) - UI components
- [React Hook Form](https://react-hook-form.com/) - React forms build tool
- [Zod](https://zod.dev/) - TypeScript-first schema validation

### What I learned

This project marks my earliest usage of `ComponentProps` utility type from React. This utility type allows extracting the props type from any React component or HTML element, making it easier to extend native element props for custom components.

```tsx
import { ComponentProps, PropsWithChildren } from "react";

function TabButton({
  active,
  children,
  ...props
}: PropsWithChildren<{ active: boolean } & ComponentProps<"button">>) {
  return (
    <button
      className={cn([
        "h-[58px] w-full text-[17px]",
        active &&
          "text-bookmark-neutral-200 ... relative before:absolute before:bottom-0",
      ])}
      {...props}
    >
      {children}
    </button>
  );
}

function FeatureIllustration({
  variant,
  ...props
}: ComponentProps<"svg"> & { variant: number }) {
  const svgProps: { className: ComponentProps<"svg">["className"] }[] = [
    { className: "aspect-[536/346]" },
    { className: "aspect-[478/346]" },
    { className: "aspect-[440/380]" },
  ];
  // ...
}
```

`ComponentProps<"element">` extracts the props type of a given HTML element (e.g., `"button"`, `"svg"`), allowing you to spread all native props onto your custom component while adding your own custom props with full type safety.

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
