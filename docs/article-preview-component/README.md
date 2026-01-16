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
      - [UI Transitions with Headless UI](#ui-transitions-with-headless-ui)
      - [Accessibility \& Landmark Regions](#accessibility--landmark-regions)
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

#### UI Transitions with Headless UI

I learned how to use the `@headlessui/react` `Transition` component (v1) to implement smooth entry and exit animations for the share menu. By using Tailwind CSS classes within the transition props, orchestrating animations becomes highly declarative.

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

Key takeaways:

- **`show` state**: The component automatically handles the mounting/unmounting logic based on this boolean.
- **Fragment Wrapper**: Using `as={Fragment}` avoids adding unnecessary wrapper divs to the DOM.
- **Responsive Animations**: Tailwind's responsive modifiers can be used directly in transition classes to vary animation behavior across devices.

#### Accessibility & Landmark Regions

According to the [axe-core "region" rule](https://dequeuniversity.com/rules/axe/4.10/region), all page content should be contained within HTML5 landmark regions.

To comply with these best practices, I refactored the component from generic `<div>` tags to semantic landmarks:

- **Hero Image**: Wrapped the image section in a `<header>` tag, signaling that it serves as introductory content for the article.
- **Article Body**: Wrapped the primary content in a `<main>` tag to explicitly define the central purpose of the component.

This transition from purely visual layout containers to semantic landmarks ensures that the content's purpose is programmatically determinable, improving the experience for all users, including those relying on screen readers or other assistive technologies.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Headless UI Transition Documentation (v1)](https://headlessui.com/v1/react/transition) - Official documentation for the `Transition` component in Headless UI v1.
- [Tailwind CSS Transition Property](https://tailwindcss.com/docs/transition-property) - Comprehensive guide on Tailwind's transition utilities.
- [axe-core Region Rule](https://dequeuniversity.com/rules/axe/4.10/region) - Documentation on why all content should be contained by landmarks.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
