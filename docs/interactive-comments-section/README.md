# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Interactive comments section solution](#frontend-mentor---interactive-comments-section-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [Jotai's `atomWithStorage` for Persistent State](#jotais-atomwithstorage-for-persistent-state)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

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
- [Jotai](https://jotai.org/) - React state management
- [React Hook Form](https://react-hook-form.com/) - React forms build tool

### What I learned

#### Jotai's `atomWithStorage` for Persistent State

I learned how to use Jotai's `atomWithStorage` utility to persist state to `localStorage`, which automatically syncs state between browser sessions. This was particularly useful for implementing the bonus requirement of maintaining comment data, votes, and IDs across page refreshes.

In `ClientWrapper.tsx`, I created three persistent atoms:

```typescript
const dataAtom = atomWithStorage<{ currentUser: User; comments: Comment[] }>(
  "data",
  transformDate(rawData),
);
const voteAtom = atomWithStorage<Record<string, "up" | "down" | null>>(
  "vote",
  getVotes(),
);
const latestIdAtom = atomWithStorage<number>("id", getLatestId());
```

The `atomWithStorage` function takes three parameters:

1. **key**: The localStorage key (e.g., `"data"`, `"vote"`, `"id"`)
2. **initialValue**: The default value used when no stored value exists
3. **storage** (optional): Custom storage implementation (defaults to `localStorage`)

This approach provides several benefits:

- Automatic serialization/deserialization of complex data structures
- Type-safe state management with TypeScript
- Seamless integration with Jotai's atom ecosystem
- No manual `localStorage.getItem()` or `localStorage.setItem()` calls needed

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Jotai Utils - atomWithStorage](https://jotai.org/docs/utilities/storage#atomwithstorage) - Official documentation for `atomWithStorage` utility that explains how to persist atom values to localStorage or sessionStorage.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
