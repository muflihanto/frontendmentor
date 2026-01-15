# Frontend Mentor - Loopstudios landing page solution

This is a solution to the [Loopstudios landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/loopstudios-landing-page-N88J5Onjw). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Loopstudios landing page solution](#frontend-mentor---loopstudios-landing-page-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [Advanced Group Selection with Arbitrary Variants](#advanced-group-selection-with-arbitrary-variants)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page

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

#### Advanced Group Selection with Arbitrary Variants

I used Tailwind's arbitrary group variants to apply specific styles to a child element based on a complex condition on its parent. This is particularly useful when you need to target a specific index in a list or satisfy a unique CSS selector without creating new classes.

In the `Creations` component, I targeted the 4th item in the grid to adjust its padding:

```tsx
<li className="... ... group">
  <a href="" className="... ... group-[&:nth-child(4)]:pr-[120px]">
    {el.title}
  </a>
</li>
```

- `group`: Marks the `li` as the parent group.
- `group-[&:nth-child(4)]`: This arbitrary variant checks if the element with the `group` class is the 4th child of its parent. The `&` symbol represents the group element itself.
- `pr-[120px]`: Applies the specific padding only when the condition is met.

This approach allowed for fine-grained control over individual items within a loop while keeping the logic clean and contained within Tailwind classes.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Tailwind CSS - Arbitrary variants](https://tailwindcss.com/docs/hover-focus-and-other-states#arbitrary-variants) - Documentation on using square brackets to create one-off variants.
- [Tailwind CSS - Styling based on parent state (group)](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state) - How to use the `group` class to style child elements.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
