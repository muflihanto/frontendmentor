# Frontend Mentor - Bento grid solution

This is a solution to the [Bento grid challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/bento-grid-RMydElrlOj). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Bento grid solution](#frontend-mentor---bento-grid-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [CSS Grid & display: contents](#css-grid--display-contents)
      - [Accessibility: Main Landmark](#accessibility-main-landmark)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size

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

#### CSS Grid & `display: contents`

"**display: contents**" makes the container disappear, making the child elements children of the element the next level up in the DOM

Example:

- The actual code:

  ```html
  <div class="page-header">
    <h1>Recent articles</h1>
    <p>A look at my recent articles about CSS</p>
  </div>
  ```

  ```css
  .page-header {
    display: contents;
  }
  ```

  the visual:

  ```html
  <!-- <div class="page-header"> -->
  <h1>Recent articles</h1>
  <p>A look at my recent articles about CSS</p>
  <!-- </div> -->
  ```

#### Accessibility: Main Landmark

I learned about the importance of having a `main` landmark on every page. According to the [axe-core "landmark-one-main" rule](https://dequeuniversity.com/rules/axe/4.10/landmark-one-main), a document must have at least one `main` landmark to allow users of assistive technologies to quickly bypass navigation and reach the primary content.

In this project, I used the semantic `<main>` tag to wrap the grid layout:

```tsx
function Main() {
  return <main className="... grid">{/* Bento grid items */}</main>;
}
```

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [CSS display contents](https://ishadeed.com/article/display-contents/) - This helped me understand how to use display contents to build more fluid layouts.
- [axe-core landmark-one-main Rule](https://dequeuniversity.com/rules/axe/4.10/landmark-one-main) - Documentation on why a document must have a `main` landmark.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
