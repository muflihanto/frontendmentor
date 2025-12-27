# Frontend Mentor - Mortgage repayment calculator solution

This is a solution to the [Mortgage repayment calculator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/mortgage-repayment-calculator-Galx1LXK73). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Mortgage repayment calculator solution](#frontend-mentor---mortgage-repayment-calculator-solution)
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

- Input mortgage information and see monthly repayment and total repayment amounts after submitting the form
- See form validation messages if any field is incomplete
- Complete the form only using their keyboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

<!-- ### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

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
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [TanStack Form](https://tanstack.com/form/latest) - TS library for type-safe form state management
- [Zod](https://zod.dev/) - TS library for schema validation
- [Jotai](https://jotai.org/) - React state management
- [React number format](https://s-yadav.github.io/react-number-format/docs/intro/) - React input-formatter library

### What I learned

- We can specify when the form validation done using `validator` props.

  - `onSubmit`

  ```typescript
  <form.Field
    name="amount"
    validators={{
      onSubmit: z.coerce.number().min(1, "This field is required"),
    }}
  >
  ```

  - `onChange`

  ```typescript
  <form.Field
    name="amount"
    validators={{
      onChange: z.coerce.number().min(1, "This field is required"),
    }}
  >
  ```

- Using `NumericFormat` from `react-number-format` to format numeric inputs with thousand separators.

  ```tsx
  import { NumericFormat } from "react-number-format";

  <NumericFormat
    type="text"
    thousandSeparator=","
    id={field.name}
    name={field.name}
    value={field.state.value}
    onValueChange={(val) => field.handleChange(val.value)}
  />;
  ```

  - `thousandSeparator` - Adds thousand separators to the number (e.g., `1,000,000`)
  - `value` - The raw numeric value (without formatting)
  - `onValueChange` - Callback that receives an object with `value` (unformatted string), `formattedValue` (formatted string), and `floatValue` (number)

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Form and Field Validation](https://tanstack.com/form/latest/docs/framework/react/guides/validation) - This helped me understand more about the concept of how Form and Field Validation works in Tanstack Form.
- [NumericFormat Props](https://s-yadav.github.io/react-number-format/docs/numeric_format) - Official documentation for NumericFormat component props and usage.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments -->
