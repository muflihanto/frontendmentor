# Frontend Mentor - Manage landing page solution

This is a solution to the [Manage landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/manage-landing-page-SLXqC6P5). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Manage landing page solution](#frontend-mentor---manage-landing-page-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [CSS Scroll Snap](#css-scroll-snap)
      - [Click-and-Drag Pan Gesture](#click-and-drag-pan-gesture)
      - [Simulating Swipe in Playwright](#simulating-swipe-in-playwright)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- See all testimonials in a horizontal slider
- Receive an error message when the newsletter sign up `form` is submitted if:
  - The `input` field is empty
  - The email address is not formatted correctly

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
- [Framer Motion](https://www.framer.com/motion/) - Motion library for React
- [React Hook Form](https://react-hook-form.com/) - React forms build tool
- [Zod](https://zod.dev/) - TypeScript-first schema validation

### What I learned

#### CSS Scroll Snap

I used CSS Scroll Snap to create a smooth, touch-friendly testimonial carousel. By using Tailwind's `snap-x` and `snap-mandatory` utilities on the container, combined with `snap-center` on the items, the carousel automatically snaps to the nearest testimonial when scrolling.

Scroll container implementation:

```tsx
<motion.div
  className={cn([
    "flex w-full snap-x snap-mandatory items-center gap-8 overflow-x-auto scroll-smooth",
    // ... other classes
  ])}
  ref={carouselRef}
>
  {testimonials.map((testi) => (
    <Testimonial testimony={testi} key={testi.name} />
  ))}
</motion.div>
```

Testimonial item implementation:

```tsx
function Testimonial({ testimony, className }) {
  return (
    <div
      className={cn(
        "min-w-[calc(100vw-32px)] max-w-[539px] shrink-0 snap-center",
        className,
      )}
    >
      {/* ... content */}
    </div>
  );
}
```

#### Click-and-Drag Pan Gesture

To enhance the carousel UX, I implemented a click-and-drag (pan) behavior using Framer Motion's gesture handlers. When the user holds down the mouse button and moves, the carousel scrolls accordingly, and the snap behavior is temporarily disabled. This provides a more natural scrolling experience, especially on desktop.

```tsx
const carouselRef = useRef<null | HTMLDivElement>(null);
const [panInfo, setPanInfo] = useState<number>();

<motion.div
  className={cn([
    "flex w-full items-center gap-8 overflow-x-auto",
    panInfo === undefined
      ? "snap-x snap-mandatory scroll-smooth" // stop scrolling
      : "snap-none snap-normal scroll-auto", // scrolling
  ])}
  ref={carouselRef}
  onMouseDown={() => {
    setPanInfo(carouselRef.current?.scrollLeft);
  }}
  onPan={(_, info) => {
    panInfo !== undefined &&
      carouselRef.current &&
      carouselRef.current.scrollTo(panInfo - info.offset.x, 0);
  }}
  onMouseUp={() => {
    setPanInfo(undefined);
  }}
>
  {/* ... testimonials */}
</motion.div>;
```

**Key implementation details:**

- **`onMouseDown`**: Captures the initial scroll position when the user starts dragging
- **`onPan`**: Scrolls the container based on the drag offset from the initial position
- **`onMouseUp`**: Resets the pan state, re-enabling scroll snap behavior
- **CSS toggling**: Dynamically switches between `snap-x snap-mandatory` (normal) and `snap-none` (during pan) to prevent snapping interference while dragging

#### Simulating Swipe in Playwright

To test the touch-friendly swipe behavior and the "click-and-drag" pan gesture in the carousel, I used Playwright's `mouse` API to simulate manual mouse interactions. This is particularly useful for verifying scroll behavior that can't be easily triggered by simple `click()` or `scrollIntoView()` calls.

```typescript
test("should swipe between testimonials", async ({ page }) => {
  const carousel = page.locator("div").nth(15);
  const firstItem = carousel.locator("> div").first();
  await carousel.scrollIntoViewIfNeeded();

  // Get initial position
  const initialScroll = await carousel.evaluate((el) => el.scrollLeft);

  // Simulate swipe
  const boundingBox = await firstItem.boundingBox();
  const startX = (boundingBox?.x ?? 0) + 10;
  const y = (boundingBox?.y ?? 0) + 10;
  const endX = (boundingBox?.x ?? 0) - 100;

  // Move cursor to start position and press down
  await page.mouse.move(startX, y);
  await page.mouse.down();

  // Move to end position (swipe left 100px) and release
  await page.mouse.move(endX, y);
  await page.mouse.up();

  // Verify scroll position changed
  const newScroll = await carousel.evaluate((el) => el.scrollLeft);
  expect(newScroll).toBeGreaterThan(initialScroll);
});
```

**Workflow for simulation:**

- **Bounding Box**: Obtain the element's position using `boundingBox()` to calculate precise start and end coordinates.
- **`mouse.move`**: Position the virtual cursor at the starting point.
- **`mouse.down`**: Initiate the drag/press.
- **`mouse.move` (again)**: Perform the actual movement while the "button" is held.
- **`mouse.up`**: Release the drag to finish the gesture.
- **`evaluate`**: Use `page.evaluate` to inspect DOM properties (like `scrollLeft`) that aren't directly exposed as Playwright assertions.

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Tailwind CSS - Scroll Snap Type](https://tailwindcss.com/docs/scroll-snap-type) - Utilities for controlling how strictly snap points are enforced in a scroll container.
- [Tailwind CSS - Scroll Snap Align](https://tailwindcss.com/docs/scroll-snap-align) - Utilities for controlling the scroll snap alignment of an element.
- [MDN - CSS Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap) - Comprehensive guide on how scroll snap works in CSS.
- [Framer Motion - Gestures](https://motion.dev/docs/react-gestures) - Documentation on Framer Motion's gesture system including pan, drag, hover, and tap gestures.
- [Playwright - Mouse API](https://playwright.dev/docs/api/class-mouse) - API reference for simulating mouse events in Playwright tests.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
