# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Weather app solution](#frontend-mentor---weather-app-solution)
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

- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

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
- [TanStack Query](https://tanstack.com/query/latest) - Asynchronous state management for TS/JS
- [Ky](https://github.com/sindresorhus/ky) - Tiny and elegant HTTP client for JS
- [Day.js](https://day.js.org/) - JS date utility library

### What I learned

One of the key accessibility improvements in this project was implementing a custom search combobox using the `aria-activedescendant` pattern. This allows users to navigate through search results using the arrow keys while keeping the keyboard focus on the input field.

The `aria-activedescendant` attribute on the input points to the `id` of the currently "visually focused" option in the listbox. Screen readers then announce the selected option as if it were truly focused.

```tsx
// Input implementation
<input
  role="combobox"
  aria-autocomplete="list"
  aria-expanded={isOpen}
  aria-controls="search-results-list"
  aria-activedescendant={
    focusedIndex >= 0 ? `search-result-${results[focusedIndex].id}` : undefined
  }
  onKeyDown={(e) => {
    if (e.key === "ArrowDown") {
      setFocusedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    }
    // ... other navigation logic
  }}
/>

// Listbox implementation
<div id="search-results-list" role="listbox">
  {results.map((res, index) => (
    <button
      id={`search-result-${res.id}`}
      role="option"
      aria-selected={focusedIndex === index}
    >
      {res.name}
    </button>
  ))}
</div>
```

This pattern is cleaner than manually moving focus between the input and list items, as it maintains the user's ability to keep typing or clearing the input without losing their place.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Aria-activedescendant - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-activedescendant) - Documentation for the `aria-activedescendant` attribute.
- [W3C WAI-ARIA Authoring Practices - Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) - Best practices for building accessible comboboxes.

<!-- ### AI Collaboration

Describe how you used AI tools (if any) during this project. This helps demonstrate your ability to work effectively with AI assistants.

- What tools did you use (e.g., ChatGPT, Claude, GitHub Copilot)?
- How did you use them (e.g., debugging, generating boilerplate, brainstorming solutions)?
- What worked well? What didn't? -->

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
