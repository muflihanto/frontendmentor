# Frontend Mentor - Intro component with sign up form solution

This is a solution to the [Intro component with sign up form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/intro-component-with-signup-form-5cf91bd49edda32581d28fd1). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Intro component with sign up form solution](#frontend-mentor---intro-component-with-sign-up-form-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [1. Schema-Driven Forms with React Hook Form \& Zod](#1-schema-driven-forms-with-react-hook-form--zod)
      - [2. Advanced Validation and Transformation with Zod](#2-advanced-validation-and-transformation-with-zod)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Receive an error message when the `form` is submitted if:
  - Any `input` field is empty. The message for this error should say _"[Field Name] cannot be empty"_
  - The email address is not formatted correctly (i.e. a correct email address should have this structure: `name@host.tld`). The message for this error should say _"Looks like this is not an email"_

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
- [Zod](https://zod.dev/) - TS library for schema validation
- [React Hook Form](https://react-hook-form.com/) - React forms build tool

### What I learned

#### 1. Schema-Driven Forms with React Hook Form & Zod

Combining **React Hook Form** with **Zod** provides a robust, type-safe way to manage complex form states. By using the `@hookform/resolvers/zod` package, I was able to decouple the validation logic from the component itself, maintaining a single source of truth for both the data structure and validation rules.

```tsx
// Schema definition and type inference
const inputSchema = z.object({
  firstName: z.string().min(1, { message: "First Name cannot be empty" }),
  email: z.string().email({ message: "Looks like this is not an email" }),
  // ...other fields
});

type Inputs = z.infer<typeof inputSchema>;

// Integration with useForm
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<Inputs>({
  resolver: zodResolver(inputSchema),
});
```

#### 2. Advanced Validation and Transformation with Zod

Zod's extensibility allowed for precise control over the input data through various validation and transformation methods:

- **Strict Validation**: Used `.min(1)` to enforce required fields and `.email()` for specialized format checks.
- **Custom Refinement**: Implemented `.refine()` alongside `.trim()` to reject inputs that consist only of whitespace characters.
- **Data Sanitization**: Leveraged `.transform()` to automatically trim user input before it reaches the submission handler, ensuring clean data.
- **Type Safety**: Used `z.infer` to automatically generate TypeScript types from the schema, preventing desynchronization between validation logic and type definitions.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [React Hook Form + Zod](https://react-hook-form.com/get-started#SchemaValidation) - A great guide on how to integrate React Hook Form with various schema validation libraries like Zod.
- [Zod Documentation](https://zod.dev/) - The official documentation for Zod, which was essential for learning how to define schemas and custom validation messages.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
