# Frontend Mentor - Conference ticket generator solution

This is a solution to the [Conference ticket generator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/conference-ticket-generator-oq5gFIU12w). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Conference ticket generator solution](#frontend-mentor---conference-ticket-generator-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [Avatar File Validation with Zod](#avatar-file-validation-with-zod)
      - [Handling File Input with Drag and Drop](#handling-file-input-with-drag-and-drop)
      - [Testing File Uploads with Playwright](#testing-file-uploads-with-playwright)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- Complete the form with their details
- Receive form validation messages if:
  - Any field is missed
  - The email address is not formatted correctly
  - The avatar upload is too big or the wrong image format
- Complete the form only using their keyboard
- Have inputs, form field hints, and error messages announced on their screen reader
- See the generated conference ticket when they successfully submit the form
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
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation
- [Jotai](https://jotai.org/) - State management
- [Playwright](https://playwright.dev/) - End-to-end testing
- [axe-core](https://github.com/dequelabs/axe-core) - Accessibility testing

### What I learned

#### Avatar File Validation with Zod

I learned how to use Zod's `.custom()` and `.refine()` methods to validate file uploads. This schema validates that the avatar is a valid image file (JPG or PNG) and is under 500KB:

```ts
const inputSchema = z.object({
  avatar: z
    .custom<FileList | null>()
    .transform((fileList) => (fileList ? fileList[0] : null))
    .refine((file) => file instanceof File, {
      message: "Avatar cannot be empty.",
    })
    .refine(
      (file) => {
        if (!file) return true;
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        return allowedTypes.includes(file.type);
      },
      {
        message: "File must be JPG or PNG format.",
      },
    )
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 500 * 1024;
      },
      {
        message: "File too large. Please upload a photo under 500KB.",
      },
    ),
  // ... other fields
});
```

#### Handling File Input with Drag and Drop

I implemented a file input handler that supports both click-to-upload and drag-and-drop functionality. The key was using React Hook Form's `Controller` component to manage the file input state:

```tsx
const handleFileChange = (
  files: FileList | null,
  field: ControllerRenderProps<Inputs, "avatar">,
) => {
  if (files && files.length > 0) {
    const validation = z
      .object({
        avatar: inputSchema.shape.avatar,
      })
      .safeParse({ avatar: files });
    if (validation.success) {
      const url = URL.createObjectURL(files[0]);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  } else {
    setPreviewUrl(null);
  }
  field.onChange(files);
  void trigger("avatar");
};

const handleDrop = (
  e: DragEvent,
  field: ControllerRenderProps<Inputs, "avatar">,
) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(false);

  const files = e.dataTransfer.files;
  if (files && files.length > 0) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(files[0]);

    if (inputRef.current) {
      inputRef.current.files = dataTransfer.files;
    }

    handleFileChange(dataTransfer.files, field);
  }
};
```

#### Testing File Uploads with Playwright

Testing file inputs required two different approaches: using Playwright's built-in `setInputFiles` for standard input interactions and a custom helper to simulate drag-and-drop events.

For standard file selection:

```ts
await page
  .getByLabel("Upload Avatar")
  .setInputFiles(path.join(__dirname, "assets/image-avatar.jpg"));
```

For simulating drag-and-drop, I implemented a helper that recreates a `File` object within the browser context and dispatches the necessary events:

```ts
export async function dragAndDropFile(
  page: Page,
  dropSelector: string,
  filePath: string,
  mimeType = "application/octet-stream",
) {
  const absolutePath = path.join(__dirname, filePath);
  const buffer = readFileSync(absolutePath);

  const dataTransfer = await page.evaluateHandle(
    ({ bytes, name, type }) => {
      const dt = new DataTransfer();
      const uint8Array = new Uint8Array(bytes);
      const blob = new Blob([uint8Array], { type });
      const file = new File([blob], name, { type });
      dt.items.add(file);
      return dt;
    },
    {
      bytes: Array.from(buffer),
      name: path.basename(absolutePath),
      type: mimeType,
    },
  );

  await page.dispatchEvent(dropSelector, "dragenter", { dataTransfer });
  await page.dispatchEvent(dropSelector, "drop", { dataTransfer });
}
```

<!-- ### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

### Useful resources

- [Playwright drag and drop files](https://github.com/microsoft/playwright/issues/10667) - This helped me create drag and drop files simulation using playwright.

## Author

- Github - [Muflihanto](https://github.com/muflihanto)
- Frontend Mentor - [@muflihanto](https://www.frontendmentor.io/profile/muflihanto)
- Twitter - [@muflihanto](https://www.twitter.com/muflihanto)

<!-- ## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->
