# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Todo app solution](#frontend-mentor---todo-app-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [Testing pseudo-elements with Playwright](#testing-pseudo-elements-with-playwright)
      - [Drag-and-drop reordering with Framer Motion](#drag-and-drop-reordering-with-framer-motion)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

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
- [Jotai](https://jotai.org/) - React state management
- [React Hook Form](https://react-hook-form.com/) - React forms build tool
- [Zod](https://zod.dev/) - TypeScript-first schema validation

### What I learned

#### Testing pseudo-elements with Playwright

In this project, I learned how to test CSS pseudo-elements using Playwright. Since pseudo-elements are not part of the DOM, they cannot be selected directly. Instead, I used `window.getComputedStyle()` within an `evaluate` call to assert their properties, such as the `background-image` of a `::before` element:

```ts
const getBgImage = async () =>
  await container.evaluate(
    (el) => window.getComputedStyle(el, "::before").backgroundImage,
  );

expect(await getBgImage()).toStrictEqual(
  'url("http://localhost:3000/todo-app/images/bg-desktop-light.jpg")',
);
```

#### Drag-and-drop reordering with Framer Motion

I implemented drag-and-drop reordering using Framer Motion's `Reorder` component. This allowed for a smooth, accessible reordering experience with minimal boilerplate.

```tsx
<Reorder.Group axis="y" values={data} onReorder={setData}>
  {data.map((item) => (
    <Reorder.Item key={item.id} value={item}>
      {item.text}
    </Reorder.Item>
  ))}
</Reorder.Group>
```

In this specific implementation, I used custom drag controls to allow dragging only when interacting with the todo text, while letting the checkbox and delete button remain clickable without triggering a drag. This was achieved by setting `dragListener={false}` on `Reorder.Item` and manually triggering the drag with `controls.start(e)` on the `onPointerDown` event of the text element.

```tsx
function Item({ d }) {
  const y = useMotionValue(0);
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={d}
      dragListener={false}
      dragControls={controls}
      style={{ y }}
    >
      <button onClick={toggle}>Checkbox</button>
      <p onPointerDown={(e) => controls.start(e)}>{d.activity}</p>
      <button onClick={deleteItem}>Delete</button>
    </Reorder.Item>
  );
}
```

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Framer Motion Reorder Documentation](https://www.framer.com/motion/reorder/) - Comprehensive guide on how to implement reorderable lists with Framer Motion.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
