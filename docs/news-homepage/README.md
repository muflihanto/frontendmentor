# Frontend Mentor - News homepage solution

This is a solution to the [News homepage challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/news-homepage-H6SWTa1MFl). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - News homepage solution](#frontend-mentor---news-homepage-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [Accessibility with Screen Reader Only Text](#accessibility-with-screen-reader-only-text)
      - [React Fragment with Key](#react-fragment-with-key)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: Toggle the mobile menu (requires some JavaScript)

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
- [HeadlessUI](https://headlessui.com/) - UI components
- [Jotai](https://jotai.org/) - React state management

### What I learned

#### Accessibility with Screen Reader Only Text

To enhance accessibility, I used the `sr-only` utility class from Tailwind CSS. This class allows providing descriptive text for screen readers while keeping it visually hidden from sighted users. In this project, I used it to provide a heading for the "Popular posts" section, which visually doesn't have a title in the design, but is crucial for semantic layout and navigation.

```tsx
<section className="lg:col-span-3" aria-labelledby="popular-title">
  <h2 className="sr-only" id="popular-title">
    Popular posts
  </h2>
  {/* popular posts list */}
</section>
```

#### React Fragment with Key

When mapping over an array and needing to return multiple sibling elements without adding an extra wrapper node to the DOM, I used the `<Fragment>` component with a `key` prop. The short syntax `<>...</>` doesn't support keys, so the full component name is required here. In this case, it allowed me to render both a post item and its separator.

```tsx
{
  newPosts.map(({ body, title, href }, index) => (
    <Fragment key={title}>
      <li className="flex flex-col justify-center">{/* post content */}</li>
      {index !== newPosts.length - 1 && (
        <li
          aria-hidden="true"
          className="border-t-news-homepage-neutral-300 border-t"
        />
      )}
    </Fragment>
  ));
}
```

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Screen Readers - Tailwind CSS](https://v3.tailwindcss.com/docs/screen-readers) - This documentation explains how to use `sr-only` and `not-sr-only` to control the visibility of elements for screen readers.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
