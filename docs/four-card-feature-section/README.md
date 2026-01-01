# Frontend Mentor - Four card feature section solution

This is a solution to the [Four card feature section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/four-card-feature-section-weK1eFYK). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Four card feature section solution](#frontend-mentor---four-card-feature-section-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [React Compound Pattern](#react-compound-pattern)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size

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

### What I learned

#### React Compound Pattern

This project marks my first implementation of the **React Compound Pattern**. This pattern allows creating components with implicit shared state and a more declarative API by attaching subcomponents to a parent component.

```tsx
// Define the subcomponents type
type CardSubComponents = { Heading: typeof Heading; Body: typeof Body };

// Create the parent component with subcomponents attached
const Card: FC<CardProps> & CardSubComponents = ({ className, children }) => {
  return <div className={`...${className}`}>{children}</div>;
};

// Define subcomponents
const Heading: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <h2 className="...">{children}</h2>;
};

const Body: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <p className="...">{children}</p>;
};

// Attach subcomponents to parent
Card.Heading = Heading;
Card.Body = Body;
```

Usage becomes more readable and declarative:

```tsx
<Card className={cards[variant].cardStyle}>
  <Card.Heading>{variant}</Card.Heading>
  <Card.Body>{cards[variant].p}</Card.Body>
  <Icon variant={variant} />
</Card>
```

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [React Design Patterns: Compound Component Pattern](https://blog.logrocket.com/understanding-react-compound-components/) - Great article explaining the compound component pattern with practical examples.
- [React TypeScript Cheatsheet - Compound Components](https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase#props-typing-strategies) - Helpful reference for typing compound components in TypeScript.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
