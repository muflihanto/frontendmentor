# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Tip calculator app solution](#frontend-mentor---tip-calculator-app-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [React Aria Usage for Accessible Number Input](#react-aria-usage-for-accessible-number-input)
        - [1. `useLocale` - Internationalization Support](#1-uselocale---internationalization-support)
        - [2. `useNumberFieldState` - State Management](#2-usenumberfieldstate---state-management)
        - [3. `useNumberField` - Accessible Number Input](#3-usenumberfield---accessible-number-input)
      - [Key Takeaways](#key-takeaways)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person

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
- [React Stately](https://react-spectrum.adobe.com/react-stately/index.html) - React state management
- [React Aria](https://react-spectrum.adobe.com/react-aria/) - Accessible UI components for React

### What I learned

#### React Aria Usage for Accessible Number Input

This project uses [React Aria](https://react-spectrum.adobe.com/react-aria/) and [React Stately](https://react-spectrum.adobe.com/react-stately/) to build an accessible number input field with internationalization support.

##### 1. `useLocale` - Internationalization Support

The `useLocale` hook provides the current locale for proper number formatting:

```tsx
import { useLocale } from "react-aria";

const { locale } = useLocale();
```

##### 2. `useNumberFieldState` - State Management

The `useNumberFieldState` hook from react-stately manages the number field's state including value parsing and formatting based on locale:

```tsx
import { useNumberFieldState } from "react-stately";

const state = useNumberFieldState({ ...props, locale });
```

##### 3. `useNumberField` - Accessible Number Input

The `useNumberField` hook provides all the necessary props for building an accessible number input:

```tsx
import { type AriaNumberFieldProps, useNumberField } from "react-aria";

function NumberField(props: AriaNumberFieldProps) {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });
  const inputRef = useRef(null);

  const { labelProps, groupProps, inputProps } = useNumberField(
    props,
    state,
    inputRef,
  );

  return (
    <label {...labelProps}>
      <span>{props.label}</span>
      <div {...groupProps}>
        <input {...inputProps} ref={inputRef} />
      </div>
    </label>
  );
}
```

#### Key Takeaways

- **Internationalization**: `useLocale` + `useNumberFieldState` work together to handle locale-specific number formatting (decimal separators, grouping, etc.).
- **Prop Separation**: The hook returns separate prop objects (`labelProps`, `groupProps`, `inputProps`) for different elements, enabling flexible component composition.
- **Type Safety**: `AriaNumberFieldProps` provides type-safe props including `label`, `value`, `onChange`, `minValue`, `maxValue`, `step`, and more.
- **Accessibility**: The hook automatically handles ARIA attributes, keyboard navigation (arrow keys for increment/decrement), and screen reader announcements.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [React Aria useNumberField](https://react-spectrum.adobe.com/react-aria/useNumberField.html) - Official documentation for the useNumberField hook.
- [React Stately useNumberFieldState](https://react-spectrum.adobe.com/react-stately/useNumberFieldState.html) - Official documentation for number field state management.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
