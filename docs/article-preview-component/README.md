# Frontend Mentor - Article preview component solution

This is a solution to the [Article preview component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/article-preview-component-dYBN_pYFT). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Article preview component solution](#frontend-mentor---article-preview-component-solution)
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

- View the optimal layout for the component depending on their device's screen size
- See the social media share links when they click the share icon

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
- [Jotai](https://jotai.org/) - React state management

### What I learned

In this project, I learned how to use the `@headlessui/react` `Transition` component (v1) to add smooth enter and leave animations to the share menu. Using Tailwind CSS classes within the transition props makes it straightforward to orchestrate animations directly in the component.

```tsx
<Transition
  show={shareMenu}
  as={Fragment}
  enter="transition-all duration-75"
  enterFrom="opacity-50 max-lg:-bottom-16"
  enterTo="opacity-100 max-lg:bottom-0"
  leave="transition-all duration-200 lg:duration-75"
  leaveFrom="opacity-100 max-lg:bottom-0 h-[72px] pb-2"
  leaveTo="opacity-0 max-lg:-bottom-16"
>
  <div className="... absolute">{/* Share menu content */}</div>
</Transition>
```

Key learnings:

- **`show` prop**: Automatically triggers enter/leave transitions based on a boolean state.
- **`as={Fragment}`**: Useful for keeping the DOM clean by not adding extra wrapper elements.
- **Tailwind Orchestration**: Responsive classes (like `max-lg:-bottom-16`) can be used directly in transition props to handle different animation behaviors across screen sizes.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Headless UI Transition Documentation (v1)](https://headlessui.com/v1/react/transition) - Official documentation for the `Transition` component in Headless UI v1.
- [Tailwind CSS Transition Property](https://tailwindcss.com/docs/transition-property) - Comprehensive guide on Tailwind's transition utilities.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
