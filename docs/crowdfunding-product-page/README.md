# Frontend Mentor - Crowdfunding product page solution

This is a solution to the [Crowdfunding product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/crowdfunding-product-page-7uvcZe7ZR). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Crowdfunding product page solution](#frontend-mentor---crowdfunding-product-page-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [Focus Trapping](#focus-trapping)
      - [Navigation Menu Accessibility](#navigation-menu-accessibility)
      - [Progress Bar Accessibility](#progress-bar-accessibility)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout depending on their device's screen size
- See hover states for interactive elements
- Make a selection of which pledge to make
- See an updated progress bar and total money raised based on their pledge total after confirming a pledge
- See the number of total backers increment by one after confirming a pledge
- Toggle whether or not the product is bookmarked

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

#### Focus Trapping

Focus trapping is an essential technique for web accessibility, ensuring keyboard focus remains within a specific component like a modal. For this project, I implemented a custom `useFocusTrap` hook, following the principles of circular navigation and intercepting keyboard events to create a seamless user experience.

```tsx
import { type Dispatch, type SetStateAction, useEffect } from "react";
import { useCallbackRef } from "use-callback-ref";

export default function useFocusTrap(
  state: boolean,
  setState: Dispatch<SetStateAction<boolean>>,
) {
  const modalRef = useCallbackRef<HTMLDivElement>(null, (curr) => {
    if (curr !== null) {
      (
        curr.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )[0] as HTMLElement
      ).focus();
    }
  });

  useEffect(() => {
    if (state) {
      const modalElement = modalRef.current;
      if (modalElement) {
        const focusableElements = modalElement.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTabKeyPress = (event: KeyboardEvent) => {
          if (event.key === "Tab") {
            if (event.shiftKey && document.activeElement === firstElement) {
              event.preventDefault();
              (lastElement as HTMLElement).focus();
            } else if (
              !event.shiftKey &&
              document.activeElement === lastElement
            ) {
              event.preventDefault();
              (firstElement as HTMLElement).focus();
            }
          }
        };

        const handleEscapeKeyPress = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            setState(false);
          }
        };

        modalElement.addEventListener("keydown", handleTabKeyPress);
        modalElement.addEventListener("keydown", handleEscapeKeyPress);

        return () => {
          modalElement.removeEventListener("keydown", handleTabKeyPress);
          modalElement.removeEventListener("keydown", handleEscapeKeyPress);
        };
      }
    }
  }, [setState, state, modalRef]);

  return modalRef;
}
```

This approach allows for a controlled environment where users can interact with the modal content efficiently using only the keyboard.

#### Navigation Menu Accessibility

Implementing a mobile navigation menu requires careful attention to ARIA roles and attributes to ensure it's accessible to screen reader users. I used the `menu` and `menuitem` roles along with appropriate state management to clearly define the structure and relationship of the navigation elements.

```tsx
<MenuButton
  aria-expanded={isMenuOpen}
  aria-haspopup="true"
  aria-controls="mobilenavmenu"
  handleClick={handleClick}
/>
<nav>
  <ul
    id="mobilenavmenu"
    role="menu"
    aria-labelledby="menubutton"
  >
    <li role="none">
      <a role="menuitem" href="">About</a>
    </li>
    {/* ... other items */}
  </ul>
</nav>
```

#### Progress Bar Accessibility

To ensure the crowdfunding progress is accessible to screen reader users, I implemented the ARIA `progressbar` role. This involves providing the current, minimum, and maximum values, and linking the component to a descriptive label using `aria-labelledby`.

```tsx
<div id="progress-label" className="sr-only">
  {`Crowdfunding progress: ${props.value} of ${props.target}`}
</div>
<div
  role="progressbar"
  aria-valuenow={Number(props.value)}
  aria-valuemin={0}
  aria-valuemax={Number(props.target)}
  aria-labelledby="progress-label"
>
  {/* progress indicator */}
</div>
```

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Achieving Focus Trapping in a React Modal Component](https://medium.com/cstech/achieving-focus-trapping-in-a-react-modal-component-3f28f596f35b) - This article was a great reference for understanding how to manually implement focus trapping without external libraries.
- [W3C - Menu Button Navigation Links Example](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-links/) - This example provided a clear guide on implementing an accessible menu button that opens a list of navigation links, which was instrumental in structuring the header navigation.
- [W3C - Progress Bar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/progressbar/) - The definitive guide for implementing accessible progress bars, detailing necessary roles and attributes.
- [MDN - ARIA: progressbar role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role) - A comprehensive reference for the progressbar role, including browser compatibility and examples.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
