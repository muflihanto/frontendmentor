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
      - [Using TanStack Query for Data Fetching](#using-tanstack-query-for-data-fetching)
      - [Implementing Debounced Input](#implementing-debounced-input)
      - [Styling Component States with group-data](#styling-component-states-with-group-data)
      - [Testing with Playwright](#testing-with-playwright)
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

#### Using TanStack Query for Data Fetching

[TanStack Query](https://tanstack.com/query/latest) simplifies data fetching by managing server state, caching, synchronization, and updates. In this project, custom hooks in `useCountries.ts` leverage `useQuery` for fetching country data from the REST Countries API.

**1. Basic useQuery Setup**

The `useQuery` hook requires a `queryKey` for cache identification and a `queryFn` for fetching data:

```tsx
const useCountries = (limit: number) => {
  return useQuery({
    queryKey: ["countries", limit],
    queryFn: () => fetchCountries(limit),
  });
};
```

**2. Conditional Fetching with `enabled`**

The `enabled` option controls when the query runs. Setting it to `false` prevents the query from automatically executing:

```tsx
const useCountry = (name: string) => {
  return useQuery({
    queryKey: ["country", name],
    queryFn: () => fetchCountry(name),
    enabled: name !== undefined,
  });
};
```

**3. Custom Retry Logic**

The `retry` option accepts a function to define custom retry behavior:

```tsx
const useCountry = (name: string) => {
  return useQuery({
    // ...
    retry: (count) => {
      if (count >= 1) return false;
      return true;
    },
  });
};
```

#### Implementing Debounced Input

Using `useDebounce` from `usehooks-ts` helps in reducing the number of filtering operations when the user types in the search input. This improves performance by waiting for a specified delay before updating the search keyword.

```tsx
const [input, setInput] = useAtom(inputAtom);
const debouncedValue = useDebounce<string>(input, 500);
const setKeywordFilter = useSetAtom(keywordFilterAtom);

useEffect(() => {
  setKeywordFilter(debouncedValue);
}, [debouncedValue, setKeywordFilter]);
```

In this implementation, the `input` atom tracks the immediate value of the text field, while the `keywordFilter` atom is only updated with the `debouncedValue` after 500ms of inactivity.

#### Styling Component States with group-data

I used the `group-data` variant to style child elements based on the state of a parent component. This is particularly useful when working with libraries like Headless UI, which manage component states (like "open" or "selected") and expose them via data attributes.

In the `RegionFilter` component, I used this to rotate the chevron icon when the dropdown is open:

```tsx
<Listbox.Button className="text-rest-countries-darkblue-100 dark:bg-rest-countries-darkblue-100 dark:text-rest-countries-gray-200 group flex h-12 w-[200px] items-center justify-between rounded bg-white pl-6 pr-5 text-left text-[12px] font-semibold tracking-[-.125px] shadow-sm md:h-[56px] md:text-[14px]">
  <span>{selectedFilter?.name ?? "Filter by Region"}</span>
  <FontAwesomeIcon
    className="w-2 transition-transform group-data-[headlessui-state=open]:rotate-180 lg:w-[10px]"
    icon={faChevronDown}
  />
</Listbox.Button>
```

- `group`: Applied to the parent element (`Listbox.Button`) to mark it as the target for the variant.
- `group-data-[headlessui-state=open]`: This variant tells Tailwind to apply the `rotate-180` class to the icon only when the parent `group` has the attribute `data-headlessui-state="open"`.
- `transition-transform`: Ensures a smooth rotation effect.

#### Testing with Playwright

[Playwright](https://playwright.dev/) is used for end-to-end testing in this project. The `page.waitForURL` method is essential for handling navigation between pages in a client-side rendered application.

**1. Using waitForURL for Navigation Verification**

The `waitForURL` method waits for the page URL to match a specific pattern before proceeding with assertions. This is crucial when testing client-side navigation (SPA) where the page doesn't do a full reload:

```tsx
// Wait for navigation to Indonesia detail page
await page.getByRole("link", { name: "Indonesia" }).click();
await page.waitForURL("**/indonesia");
await expect(page.getByRole("heading", { name: "Indonesia" })).toBeVisible();
```

**2. URL Pattern Matching**

Playwright supports glob patterns for matching URLs:

- `**/indonesia` - Matches any URL containing "/indonesia"
- `**${pageUrl}` - Matches the base page URL
- `**/malaysia` - Matches any URL containing "/malaysia"

```tsx
// Navigate back to countries list
await back.click();
await page.waitForURL(`**${pageUrl}`);
const countries = await page.getByRole("list").getByRole("link").all();
expect(countries).toHaveLength(data.length);
```

**3. Best Practices**

Using `waitForURL` ensures tests are resilient to timing issues by waiting for the URL to update before making assertions. This is especially important in SPAs where content changes without full page reloads.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [match-sorter](https://github.com/kentcdodds/match-sorter) - Official documentation for the match-sorter library. Contains detailed API reference for all options including keys, threshold rankings, and advanced configuration.
- [Playwright - waitForURL](https://playwright.dev/docs/api/class-page#page-wait-for-url) - Official documentation for the waitForURL method used for handling navigation in end-to-end tests.
- [Tailwind CSS - Data Attributes](https://tailwindcss.com/docs/hover-focus-and-other-states#data-attributes) - Documentation on how to style elements based on data attributes.
- [Headless UI - Listbox Styling](https://headlessui.com/react/listbox#styling-with-data-attributes) - How Headless UI uses data attributes to expose component state for styling.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
