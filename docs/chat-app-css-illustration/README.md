# Frontend Mentor - Chat app CSS illustration solution

This is a solution to the [Chat app CSS illustration challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/chat-app-css-illustration-O5auMkFqY). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Chat app CSS illustration solution](#frontend-mentor---chat-app-css-illustration-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Framer Motion Animation Sequences](#framer-motion-animation-sequences)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the component depending on their device's screen size
- **Bonus**: See the chat interface animate on the initial load

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

This project marks my earliest usage of `PropsWithChildren` utility type from React. This utility type helps to properly type component props that include children.

```tsx
import { type PropsWithChildren } from "react";

function ChatGroup({
  variant,
  children,
}: PropsWithChildren<{ variant?: "left" | "right" }>) {
  return (
    <div
      className={`mb-2 flex flex-col ${variant === "right" ? "items-end self-end" : "items-start self-start"}`}
    >
      {children}
    </div>
  );
}

function ChatLeft({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={twMerge("...", className)}>{children}</div>;
}
```

### Framer Motion Animation Sequences

This project uses the imperative `animate` function from `framer-motion` (v10) to create staggered animation sequences for the chat interface. Unlike the declarative `initial` and `animate` props on `motion` components, this approach allows for more control over complex orchestrations.

```tsx
import { animate, stagger } from "framer-motion";
import { useEffect } from "react";

function Main() {
  useEffect(() => {
    void animate([
      ["div.chat", { scale: [0, 1] }, { delay: stagger(2), duration: 0.3 }],
      ["div.radio", { scale: [0, 1] }, { delay: 2 }],
    ]);
  }, []);
  // ...
}
```

The `animate` function accepts an array of animation definitions (sequences). Each definition consists of a selector string, the animation properties, and transition options. The `stagger` function is used here to offset the start time of animations for multiple elements matching the same selector.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Framer Motion animate() Sequences](https://motion.dev/docs/animate#sequences) - Documentation for the imperative `animate` function and timeline sequences.
- [Framer Motion stagger()](https://motion.dev/docs/stagger) - Official guide on using the `stagger` function for orchestrated animations.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
