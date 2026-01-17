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
      - [Type-safe Component Props](#type-safe-component-props)
      - [Accessible Tabs Pattern](#accessible-tabs-pattern)
    - [Useful resources](#useful-resources)
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

#### Type-safe Component Props

This project marks my earliest usage of the `ComponentProps` utility type from React. It allows for extracting prop types from any React component or HTML element, which is incredibly useful when building wrapper components that need to pass through native props.

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
```

Using `ComponentProps<"button">` ensures that the component remains fully typed for all native button attributes while allowing for custom extensions like the `active` state or custom styling logic.

#### Accessible Tabs Pattern

I learned how to correctly implement the ARIA tab pattern while maintaining a valid HTML structure. When using a `<ul>` with `role="tablist"`, the spec requires that the direct children have the `role="tab"`.

However, wrapping the tabs in `<li>` elements introduces an implicit `role="listitem"`, which violates the `aria-required-children` rule. To fix this, I used `role="none"` (or `role="presentation"`) on the `<li>` elements to remove their semantic meaning, allowing the nested `tab` elements to be correctly associated with the `tablist`.

```tsx
<ul role="tablist" ...>
  {features.map((feature, index) => (
    <li key={feature.name} role="none">
      <TabButton role="tab" ...>
        {feature.name}
      </TabButton>
    </li>
  ))}
</ul>
```

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Axe Rules: aria-required-children](https://dequeuniversity.com/rules/axe/4.10/aria-required-children) - This documentation explained why my tab list was failing accessibility checks and how to fix it by using `role="none"` on wrapper elements.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
