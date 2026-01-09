# Frontend Mentor - Interactive rating component solution

This is a solution to the [Interactive rating component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-rating-component-koxpeBUmI). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Interactive rating component solution](#frontend-mentor---interactive-rating-component-solution)
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

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Select and submit a number rating
- See the "Thank you" card state after submitting a rating

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
- [React Hook Form](https://react-hook-form.com/) - React forms build tool
- [AutoAnimate](https://auto-animate.formkit.com/) - JS zero-config, drop-in animation utility

### What I learned

- First time using **React Hook Form** for managing form state and validation. It's much more efficient than using multiple `useState` hooks for individual inputs, especially when dealing with validation and error states:

```tsx
const {
  register,
  handleSubmit,
  formState: { errors },
  clearErrors,
  watch,
} = useForm<Input>();

// Registering inputs with validation
<input
  {...register("rating", { required: true })}
  type="radio"
  value={ratingValue}
/>;
```

- Using **@formkit/auto-animate** for smooth transitions between component states without writing custom animations:

```js
import { useAutoAnimate } from "@formkit/auto-animate/react";

const InteractiveRating = () => {
  const [parent] = useAutoAnimate({ duration: 100 });
  return (
    <div ref={parent}>
      {/* Content here will animate smoothly when DOM changes */}
    </div>
  );
};
```

This zero-config animation utility automatically handles smooth transitions when children are added, removed, or reordered.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [React Hook Form Get Started](https://react-hook-form.com/get-started) - This helped me understand the basic setup of the library, specifically using the `register` and `handleSubmit` functions for form control.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
