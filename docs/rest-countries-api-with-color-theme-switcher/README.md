# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - REST Countries API with color theme switcher solution](#frontend-mentor---rest-countries-api-with-color-theme-switcher-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [Using match-sorter for Flexible Filtering](#using-match-sorter-for-flexible-filtering)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode _(optional)_

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
- [TanStack Query](https://tanstack.com/query/latest) - Asynchronous state management for TS/JS
- [Ky](https://github.com/sindresorhus/ky) - Tiny and elegant HTTP client for JS
- [match-sorter](https://github.com/kentcdodds/match-sorter) - match sorting of an array in JS

### What I learned

#### Using match-sorter for Flexible Filtering

The [match-sorter](https://github.com/kentcdodds/match-sorter) package provides a simple, powerful way to filter and sort arrays based on user input. Here's how I used it in this project:

**1. Configuring Keys for Nested Object Properties**

Match-sorter allows searching through nested object properties using dot notation and wildcards:

```tsx
const keywordFilterOptions: MatchSorterOptions<(typeof data)[number]> = {
  keys: [
    "name.common",
    "name.official",
    "name.nativeName.*.common", // Wildcard for dynamic keys
    "name.nativeName.*.official",
  ],
  threshold: matchSorter.rankings.CONTAINS,
};
```

**2. Using Threshold Rankings**

Match-sorter provides different ranking thresholds to control match strictness:

- `matchSorter.rankings.CONTAINS` - Matches if the search term is contained anywhere in the value
- `matchSorter.rankings.EQUAL` - Matches only if the value exactly equals the search term

```tsx
// For keyword search (partial match)
threshold: matchSorter.rankings.CONTAINS;

// For region filter (exact match)
threshold: matchSorter.rankings.EQUAL;
```

**3. Combining Multiple Filters**

The component demonstrates combining keyword and region filters:

```tsx
matchSorter(
  data.filter((ctr) => ctr.region === selectedFilter.name),
  keywordFilter,
  keywordFilterOptions,
);
```

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [match-sorter](https://github.com/kentcdodds/match-sorter) - Official documentation for the match-sorter library. Contains detailed API reference for all options including keys, threshold rankings, and advanced configuration.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
