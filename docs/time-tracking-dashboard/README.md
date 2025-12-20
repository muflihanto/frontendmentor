# Frontend Mentor - Time tracking dashboard solution

This is a solution to the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Time tracking dashboard solution](#frontend-mentor---time-tracking-dashboard-solution)
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

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Switch between viewing Daily, Weekly, and Monthly stats

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

In this project, I focused on implementing an accessible tab pattern (WAI-ARIA). This involves using correct ARIA roles, managing focus, and handling keyboard navigation.

```tsx
<ul
  role="tablist"
  aria-labelledby="title"
  aria-orientation={width > 1023 ? "vertical" : "horizontal"}
>
  {buttons.map((button, index) => (
    <li key={`${index}-${button}`} role="none">
      <button
        role="tab"
        id={`tab-${button.toLowerCase()}`}
        aria-selected={activeTab === button.toLowerCase()}
        tabIndex={activeTab === button.toLowerCase() ? 0 : -1}
        onKeyDown={onItemKeyDown}
      >
        {button}
      </button>
    </li>
  ))}
</ul>
```

Keyboard navigation was implemented to support arrow keys, Home, and End:

```ts
const onItemKeyDown = (event: KeyboardEvent<HTMLElement>) => {
  const tab = event.currentTarget;
  const parent = tab.parentElement;
  const tablist = parent?.parentElement;
  const key = event.key;
  const allTabs = tablist?.querySelectorAll("button");
  const firstTab = allTabs?.[0];
  const lastTab = allTabs?.[allTabs.length - 1];
  const nextTab = parent?.nextElementSibling?.querySelector("button");
  const prevTab = parent?.previousElementSibling?.querySelector("button");

  let flag = false;

  switch (key) {
    case "ArrowDown":
    case "ArrowRight":
      if (nextTab) nextTab.focus();
      else firstTab?.focus();
      flag = true;
      break;
    case "ArrowUp":
    case "ArrowLeft":
      if (prevTab) prevTab.focus();
      else lastTab?.focus();
      flag = true;
      break;
    case "Home":
      firstTab?.focus();
      flag = true;
      break;
    case "End":
      lastTab?.focus();
      flag = true;
      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};
```

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [WAI-ARIA Authoring Practices - Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) - This helped me understand the keyboard interaction expectations for the tab pattern.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
