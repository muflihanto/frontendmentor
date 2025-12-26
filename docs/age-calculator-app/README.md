# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Age calculator app solution](#frontend-mentor---age-calculator-app-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [Day.js for Date Manipulation](#dayjs-for-date-manipulation)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

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
- [Day.js](https://day.js.org/) - JS date utility library
- [Zod](https://zod.dev/) - TS library for schema validation
- [React Hook Form](https://react-hook-form.com/) - React forms build tool

### What I learned

#### Day.js for Date Manipulation

I used `dayjs` for handling date calculations in this age calculator app. Day.js is a lightweight alternative to Moment.js that provides a simple API for parsing, validating, manipulating, and displaying dates.

Here's how I used Day.js to calculate the age difference:

```tsx
import dayjs from "../utils/dayjs";

const onSubmit = handleSubmit((data) => {
  const { year, month, day } = data;
  const inputDate = dayjs(new Date(0, month - 1, day)).set("year", year);
  const now = dayjs();

  const yearDiff = now.diff(inputDate, "year");
  const monthDiff = now.diff(inputDate.add(yearDiff, "year"), "month");
  const dayDiff = now.diff(
    inputDate.add(yearDiff, "year").add(monthDiff, "month"),
    "day",
  );
});
```

I also used Day.js for date validation with Zod schema, checking if the input date is valid and not in the future:

```tsx
const inputDate = dayjs(new Date(0, val.month - 1, val.day)).set(
  "year",
  val.year,
);

if (
  inputDate.year() !== val.year ||
  inputDate.month() + 1 !== val.month ||
  inputDate.date() !== val.day
) {
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: "Must be a valid date",
    path: ["day"],
  });
}
```

This approach catches invalid dates like February 30th by comparing the parsed date back to the input values.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept. -->

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
