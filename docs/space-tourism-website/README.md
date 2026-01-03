# Frontend Mentor - Space tourism website solution

This is a solution to the [Space tourism website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/space-tourism-multipage-website-gRWj1URZ3). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Space tourism website solution](#frontend-mentor---space-tourism-website-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [React Aria Usage for Accessible Mobile Navigation](#react-aria-usage-for-accessible-mobile-navigation)
        - [1. `useButton` - Accessible Button Component](#1-usebutton---accessible-button-component)
        - [2. `useOverlayTriggerState` + `useOverlayTrigger` - Managing Modal State](#2-useoverlaytriggerstate--useoverlaytrigger---managing-modal-state)
        - [3. `useModalOverlay` - Modal Accessibility](#3-usemodaloverlay---modal-accessibility)
        - [4. `useDialog` - Dialog Accessibility](#4-usedialog---dialog-accessibility)
        - [Key Takeaways](#key-takeaways)
      - [Client-side Rendering with `next/dynamic`](#client-side-rendering-with-nextdynamic)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each of the website's pages depending on their device's screen size
- See hover states for all interactive elements on the page
- View each page and be able to toggle between the tabs to see new information

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

### What I learned

#### React Aria Usage for Accessible Mobile Navigation

This project uses [React Aria](https://react-spectrum.adobe.com/react-aria/) and [React Stately](https://react-spectrum.adobe.com/react-stately/) to build an accessible mobile navigation menu. Here's a breakdown of the hooks used:

##### 1. `useButton` - Accessible Button Component

The `useButton` hook provides accessible button behaviors including keyboard interactions and ARIA attributes:

```tsx
import { useButton } from "react-aria";

function Button(
  props: PropsWithChildren<AriaButtonProps & HTMLProps<HTMLButtonElement>>,
) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button {...buttonProps} ref={ref}>
      {props.children}
    </button>
  );
}
```

##### 2. `useOverlayTriggerState` + `useOverlayTrigger` - Managing Modal State

These hooks work together to manage the open/close state of overlay elements like modals and menus:

```tsx
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";

function MobileNav({ children, ...props }: OverlayTriggerProps) {
  // State management from react-stately
  const state = useOverlayTriggerState(props);

  // UI behaviors from react-aria
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "menu" },
    state,
  );

  return (
    <>
      <Button {...triggerProps}>Open Menu</Button>
      {state.isOpen && (
        <Modal state={state}>
          {cloneElement(children(state.close), overlayProps)}
        </Modal>
      )}
    </>
  );
}
```

##### 3. `useModalOverlay` - Modal Accessibility

The `useModalOverlay` hook provides proper modal behavior including focus trapping and ARIA attributes:

```tsx
import { Overlay, useModalOverlay } from "react-aria";

function Modal({ state, children, ...props }: ModalProps) {
  const ref = useRef(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);

  return (
    <Overlay>
      <div {...underlayProps}>
        <div {...modalProps} ref={ref}>
          {children}
        </div>
      </div>
    </Overlay>
  );
}
```

##### 4. `useDialog` - Dialog Accessibility

The `useDialog` hook provides proper dialog semantics and ARIA attributes:

```tsx
import { useDialog } from "react-aria";

function Dialog({ children, ...props }: DialogProps) {
  const ref = useRef(null);
  const { dialogProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref} aria-label="Mobile Navigation Menu">
      {children}
    </div>
  );
}
```

##### Key Takeaways

- **Separation of Concerns**: React Stately handles state logic (`useOverlayTriggerState`), while React Aria handles accessibility behaviors and ARIA attributes.
- **Prop Spreading**: Each hook returns props objects that should be spread onto the appropriate DOM elements.
- **Ref Management**: Most hooks require a ref to the DOM element for proper focus management.
- **Composable Patterns**: These hooks can be combined to create complex accessible UI patterns like this mobile navigation menu.

#### Client-side Rendering with `next/dynamic`

In the `Layout` component, I used `next/dynamic` to import the `Header` component with SSR disabled. This was necessary because the `Header` (specifically through React Aria hooks) relies on browser-only APIs or might cause hydration mismatches if rendered on the server.

```tsx
import dynamic from "next/dynamic";

const Header = dynamic(import("./Header"), { ssr: false });
```

By setting `ssr: false`, Next.js ensures that this component is only loaded and rendered on the client side, preventing potential server-side execution errors and ensuring a consistent initial render.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [React Aria Documentation](https://react-spectrum.adobe.com/react-aria/) - Official documentation for React Aria hooks and components.
- [React Stately Documentation](https://react-spectrum.adobe.com/react-stately/) - Official documentation for React Stately state management hooks.
- [Next.js dynamic import (v14.2.35)](https://nextjs.org/docs/14/pages/building-your-application/optimizing/lazy-loading#nextdynamic) - Documentation for `next/dynamic` and the `ssr: false` option.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
