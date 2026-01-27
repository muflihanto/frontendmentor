# Frontend Mentor - E-commerce product page solution

This is a solution to the [E-commerce product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - E-commerce product page solution](#frontend-mentor---e-commerce-product-page-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [Portals and Transitions](#portals-and-transitions)
      - [Next.js and Client-Side Portals](#nextjs-and-client-side-portals)
      - [Decorative SVGs and Accessibility](#decorative-svgs-and-accessibility)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Open a lightbox gallery by clicking on the large product image
- Switch the large product image by clicking on the small thumbnail images
- Add items to the cart
- View the cart and remove items from it

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

#### Portals and Transitions

In this project, I combined React's `createPortal` with Headless UI's `Transition` to create a robust cart popup. Using `createPortal` ensures the popup is rendered at the end of `document.body`, avoiding common layout issues like `z-index` conflicts or `overflow: hidden` clipping from parent containers.

```tsx
{
  createPortal(
    <Transition show={cartOpen}>
      <CartPopup />
    </Transition>,
    document.body,
  );
}
```

Inside the `CartPopup`, I used `Transition.Child` to coordinate granular enter/leave animations for the content:

```tsx
function CartPopup() {
  return (
    <Transition.Child
      enter="transition-all duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-all duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="... absolute"
    >
      {/* Cart content */}
    </Transition.Child>
  );
}
```

#### Next.js and Client-Side Portals

Using `createPortal` with `document.body` in Next.js requires caution because `document` is not available during Server-Side Rendering (SSR). Rendering a portal on the server would lead to hydration mismatches or "Document is not defined" errors.

To solve this, I used **Client-Side Rendering (CSR)** for components that implement portals (like `CartController`, `MobileMenu`, and `Lightbox`) using `next/dynamic` with the `ssr: false` option:

```tsx
import dynamic from "next/dynamic";

const CartController = dynamic(
  import("../components/ecommerce-product-page/CartController"),
  { ssr: false },
);
```

#### Decorative SVGs and Accessibility

I improved the accessibility of the "Add to cart" button by changing the SVG role from `graphics-symbol` to `none`.

The `svg-img-alt` rule requires SVGs with semantic roles to have text alternatives. However, since the "Add to cart" text immediately follows the icon, the SVG is purely decorative. By using `role="none"`, I removed it from the accessibility tree to avoid redundant announcements.

```tsx
<button ...>
  <svg role="none" ...>
    <use href="..." />
  </svg>
  <div>Add to cart</div>
</button>
```

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [React createPortal Documentation](https://react.dev/reference/react-dom/createPortal) - Learn how to render children into a different part of the DOM.
- [Next.js dynamic import (v14.2.35)](https://nextjs.org/docs/14/pages/building-your-application/optimizing/lazy-loading#nextdynamic) - Documentation for `next/dynamic` and the `ssr: false` option.
- [Headless UI Transition Documentation (v1)](https://headlessui.com/v1/react/transition) - Guide on using the `Transition` component for enter/leave animations.
- [Axe Rules: svg-img-alt](https://dequeuniversity.com/rules/axe/4.10/svg-img-alt) - Documentation on why SVGs with semantic roles need alternative text and how to handle decorative icons.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
