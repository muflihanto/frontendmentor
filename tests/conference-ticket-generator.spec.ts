import { readFileSync } from "node:fs";
import path from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

export async function dragAndDropFile(
  page: Page,
  dropSelector: string,
  filePath: string,
  mimeType = "application/octet-stream",
) {
  const absolutePath = path.join(__dirname, filePath);
  const buffer = readFileSync(absolutePath);

  // Pass file bytes and metadata into browser context
  const dataTransfer = await page.evaluateHandle(
    ({ bytes, name, type }) => {
      const dt = new DataTransfer();

      // Recreate the File in the browser from raw bytes
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

  // Dispatch dragenter + drop to simulate real DnD
  await page.dispatchEvent(dropSelector, "dragenter", { dataTransfer });
  await page.dispatchEvent(dropSelector, "drop", { dataTransfer });
}

export async function fillForm(
  page: Page,
  overrides?: Partial<{
    fullName: string;
    email: string;
    username: string;
    avatarPath: string;
  }>,
) {
  const defaultData = {
    fullName: "John Doe",
    email: "john@email.com",
    username: "@johndoe",
    avatarPath: path.join(__dirname, "assets/image-avatar.jpg"),
  };
  const data = { ...defaultData, ...overrides };
  const loc = createLocators(page);
  await loc.avatar.setInputFiles(data.avatarPath);
  await loc.fullName.fill(data.fullName);
  await loc.email.fill(data.email);
  await loc.username.fill(data.username);
}

/** Centralized locators for the conference ticket generator page */
function createLocators(page: Page) {
  const form = page.locator("form");
  return {
    form,
    ticket: page.locator('div[id="ticket"]'),
    // Form fields
    avatar: form.getByLabel("Upload Avatar"),
    fullName: form.getByLabel("Full Name"),
    email: form.getByLabel("Email Address"),
    username: form.getByLabel("GitHub Username"),
    submit: form.getByRole("button", { name: "Generate My Ticket" }),
    // Avatar-related
    preview: form.getByRole("img", { name: "Avatar preview" }),
    removeImage: form.locator("button", { hasText: "Remove image" }),
    changeImage: form.locator("button", { hasText: "Change image" }),
    avatarLabel: form.locator("label", {
      hasText: "Drag and drop or click to upload",
    }),
    // Errors
    errors: {
      avatarEmpty: page.getByText("Avatar cannot be empty."),
      fullNameEmpty: page.getByText("Fullname cannot be empty."),
      emailEmpty: page.getByText("Email address cannot be empty."),
      usernameEmpty: page.getByText("Username cannot be empty."),
      emailInvalid: page.getByText("Please enter a valid email address."),
      formatError: form.getByText("File must be JPG or PNG format."),
      sizeError: form.getByText(
        "File too large. Please upload a photo under 500KB.",
      ),
    },
  };
}

test.describe("FrontendMentor Challenge - Conference ticket generator page", () => {
  /** Go to Conference ticket generator page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/conference-ticket-generator");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Conference ticket generator",
    );
  });

  /** Test if the page has a correct header */
  test("has header components", async ({ page }) => {
    const codingConf = page.getByRole("img", { name: "Coding Conf" });
    const heading = page.getByRole("heading", {
      name: "Your Journey to Coding Conf",
    });
    const tagline = page.getByText("Secure your spot at next year");
    await expect(codingConf).toBeVisible();
    await expect(heading).toBeVisible();
    await expect(tagline).toBeVisible();
  });

  /** Test if the page has a form component */
  test("has form component", async ({ page }) => {
    const loc = createLocators(page);
    await expect(loc.form).toBeVisible();
    // Upload avatar field
    await expect(
      loc.form.locator("label", { hasText: "Upload Avatar" }),
    ).toBeVisible();
    await expect(loc.avatar).toHaveCount(1);
    await expect(loc.avatar).toBeHidden();
    await expect(loc.avatarLabel).toBeVisible();
    await expect(
      page.getByLabel("Drag and drop or click to upload"),
    ).toHaveCount(1);
    await expect(
      page.getByLabel("Drag and drop or click to upload"),
    ).toBeHidden();
    // Full name field
    await expect(
      loc.form.locator("label", { hasText: "Full Name" }),
    ).toBeVisible();
    await expect(loc.fullName).toBeVisible();
    // Email Address field
    await expect(
      loc.form.locator("label", { hasText: "Email Address" }),
    ).toBeVisible();
    await expect(loc.email).toBeVisible();
    // GitHub Username field
    await expect(
      loc.form.locator("label", { hasText: "GitHub Username" }),
    ).toBeVisible();
    await expect(loc.username).toBeVisible();
    // Submit button
    await expect(loc.submit).toBeVisible();
  });

  /** Test if the page can handle form submission */
  test.describe("form submission", () => {
    /** Test if the form can handle valid input with avatar */
    test("should handle valid input correctly", async ({ page }) => {
      const loc = createLocators(page);
      // Fill inputs
      await fillForm(page, {
        fullName: "Jonatan Kristof",
        email: "jonatan@email.com",
        username: "@jonatankristof0101",
      });
      // Submit
      await loc.submit.click();
      // Switch to ticket view
      await expect(loc.form).not.toBeVisible();
      await expect(page.getByText("Congrats")).toBeVisible();
    });

    /** Test if the form can generate conference ticket */
    test("should generate conference ticket", async ({ page }) => {
      const loc = createLocators(page);
      // input data
      const fullname = "Jonatan Kristof";
      const email = "jonatan@email.com";
      const username = "@jonatankristof0101";
      // Fill inputs
      await fillForm(page, { fullName: fullname, email, username });

      const previewSrc = await loc.preview.getAttribute("src");
      // Submit
      await loc.submit.click();
      // Switch to ticket view
      await expect(loc.form).not.toBeVisible();
      await expect(
        page.getByRole("heading", { name: `Congrats, ${fullname}!` }),
      ).toBeVisible();
      await expect(
        page.getByText(`We've emailed your ticket to ${email}`),
      ).toBeVisible();
      await expect(
        loc.ticket.getByText("Coding ConfJan 31, 2025 / Austin, TX"),
      ).toBeVisible();
      await expect(
        loc.ticket.getByRole("img", { name: "Avatar preview" }),
      ).toBeVisible();
      await expect(
        loc.ticket.getByRole("img", { name: "Avatar preview" }),
      ).toHaveAttribute("src", previewSrc ?? "");
      await expect(
        loc.ticket.getByText(`${fullname}${username}`),
      ).toBeVisible();
      await expect(loc.ticket.getByText(/#\d+/)).toBeVisible();
    });

    /** Test if the form can handle empty input */
    test("should handle empty input correctly", async ({ page }) => {
      const loc = createLocators(page);

      await expect(loc.errors.avatarEmpty).not.toBeVisible();
      await expect(loc.errors.fullNameEmpty).not.toBeVisible();
      await expect(loc.errors.emailEmpty).not.toBeVisible();
      await expect(loc.errors.usernameEmpty).not.toBeVisible();

      await loc.submit.click();

      await expect(loc.errors.avatarEmpty).toBeVisible();
      await expect(loc.errors.fullNameEmpty).toBeVisible();
      await expect(loc.errors.emailEmpty).toBeVisible();
      await expect(loc.errors.usernameEmpty).toBeVisible();
    });

    /** Test if the form can handle whitespace-only input */
    test("should handle whitespace-only input correctly", async ({ page }) => {
      const loc = createLocators(page);

      await expect(loc.errors.fullNameEmpty).not.toBeVisible();
      await expect(loc.errors.emailInvalid).not.toBeVisible();
      await expect(loc.errors.usernameEmpty).not.toBeVisible();

      await loc.fullName.fill("   ");
      await loc.email.fill("jonatan@email.com");
      await loc.username.fill("   ");

      await loc.submit.click();

      await expect(loc.errors.fullNameEmpty).toBeVisible();
      await expect(loc.errors.usernameEmpty).toBeVisible();
    });

    /** Test if the form can handle invalid input */
    test("should handle invalid input correctly", async ({ page }) => {
      const loc = createLocators(page);
      const filePath = path.join(__dirname, "assets/icon-github.png");

      await expect(loc.errors.sizeError).not.toBeVisible();
      await expect(loc.errors.fullNameEmpty).not.toBeVisible();
      await expect(loc.errors.emailInvalid).not.toBeVisible();
      await expect(loc.errors.usernameEmpty).not.toBeVisible();

      await loc.avatar.setInputFiles(filePath);
      await loc.fullName.fill("  \t\t  ");
      await loc.email.fill("jonatan");

      await loc.submit.click();

      await expect(loc.errors.sizeError).toBeVisible();
      await expect(loc.errors.fullNameEmpty).toBeVisible();
      await expect(loc.errors.emailInvalid).toBeVisible();
      await expect(loc.errors.usernameEmpty).toBeVisible();
    });

    /** Test if the form can handle special characters in inputs */
    test("should handle special characters in inputs", async ({ page }) => {
      const loc = createLocators(page);

      const specialName = "José O'Brien-Smith";
      const specialEmail = "jose.o-brien+test@email-domain.co.uk";
      const specialUsername = "@jose_obrien-123";

      await fillForm(page, {
        fullName: specialName,
        email: specialEmail,
        username: specialUsername,
      });
      await loc.submit.click();

      await expect(loc.form).not.toBeVisible();
      await expect(
        page.getByRole("heading", { name: `Congrats, ${specialName}!` }),
      ).toBeVisible();
    });

    /** Test if the form trim leading and trailing whitespace from inputs and auto-prepend @ username */
    test("should trim and auto-prepend @ for username input", async ({
      page,
    }) => {
      const loc = createLocators(page);

      const trimmedName = "John Doe";
      const trimmedUsername = "johndoe"; // without @

      // input with trailing/leading whitespace
      await loc.avatar.setInputFiles(
        path.join(__dirname, "assets/image-avatar.jpg"),
      );
      await loc.fullName.fill(`  ${trimmedName}  `);
      await loc.email.fill("  john@email.com  ");
      await loc.username.fill(`  ${trimmedUsername}  `);
      await loc.username.blur();

      // verify @ added after trim
      await expect(loc.username).toHaveValue("@johndoe");

      await loc.submit.click();

      // ticket should shows trimmed values
      await expect(loc.form).not.toBeVisible();
      await expect(
        loc.ticket.getByText(`${trimmedName}@johndoe`),
      ).toBeVisible();
    });

    /** Test if the avatar upload field works */
    test("should show avatar preview", async ({ page }) => {
      const loc = createLocators(page);
      const fileChooserPromise = page.waitForEvent("filechooser");
      await loc.avatarLabel.click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        path.join(__dirname, "assets/image-avatar.jpg"),
      );
      await expect(loc.preview).toBeVisible();
      await expect(loc.removeImage).toBeVisible();
      await expect(loc.changeImage).toBeVisible();
    });

    /** Test if the avatar upload field validation works */
    test("should trigger field validation on avatar change", async ({
      page,
    }) => {
      const loc = createLocators(page);
      const fileChooserPromise = page.waitForEvent("filechooser");

      // initial check
      await expect(loc.errors.formatError).not.toBeVisible();
      await expect(loc.errors.sizeError).not.toBeVisible();

      // unsupported format upload
      await loc.avatarLabel.click();
      let fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        path.join(__dirname, "assets/image-avatar.webp"),
      );
      await expect(loc.errors.formatError).toBeVisible();
      await expect(loc.errors.sizeError).not.toBeVisible();

      // too large file upload
      await loc.avatarLabel.click();
      fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        path.join(__dirname, "assets/icon-github.png"),
      );
      await expect(loc.errors.formatError).not.toBeVisible();
      await expect(loc.errors.sizeError).toBeVisible();

      // valid image upload
      await loc.avatarLabel.click();
      fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        path.join(__dirname, "assets/image-avatar.jpg"),
      );
      await expect(loc.errors.formatError).not.toBeVisible();
      await expect(loc.errors.sizeError).not.toBeVisible();
      await expect(loc.preview).toBeVisible();
    });

    /** Test if the avatar upload field works */
    test("should be able to change and remove selected image", async ({
      page,
    }) => {
      const loc = createLocators(page);
      const avatarLabel = loc.form.getByText("Upload Avatar");

      const imagePathOne = path.join(__dirname, "assets/image-avatar.jpg");
      const imagePathTwo = path.join(__dirname, "assets/default-avatar.png");

      // select first image
      const fileChooserPromise = page.waitForEvent("filechooser");
      await avatarLabel.click();
      let fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(imagePathOne);
      await expect(loc.preview).toBeVisible();
      await expect(loc.removeImage).toBeVisible();
      await expect(loc.changeImage).toBeVisible();
      expect(
        await loc.avatar.evaluate(
          (el) => (el as HTMLInputElement).files?.[0].name,
        ),
      ).toBe("image-avatar.jpg");

      // change image button check
      fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(imagePathTwo);
      await expect(loc.preview).toBeVisible();
      await expect(loc.removeImage).toBeVisible();
      await expect(loc.changeImage).toBeVisible();
      expect(
        await loc.avatar.evaluate(
          (el) => (el as HTMLInputElement).files?.[0].name,
        ),
      ).toBe("default-avatar.png");

      // remove image button check
      await loc.removeImage.click();
      await expect(loc.preview).not.toBeVisible();
      await expect(loc.removeImage).not.toBeVisible();
      await expect(loc.changeImage).not.toBeVisible();
    });

    /** Test if the avatar field reject non-image file formats */
    test("should reject non-image file formats", async ({ page }) => {
      const loc = createLocators(page);

      // try upload non-image file
      const filePath = path.join(__dirname, "assets/test-file.txt");

      await loc.avatar.setInputFiles(filePath);
      await expect(loc.errors.formatError).toBeVisible();
    });

    /** Test if the form can handle rapid avatar changes */
    test("should handle rapid avatar changes", async ({ page }) => {
      const loc = createLocators(page);

      const file1 = path.join(__dirname, "assets/image-avatar.jpg");
      const file2 = path.join(__dirname, "assets/default-avatar.png");

      // upload rapidly several times
      await loc.avatar.setInputFiles(file1);
      await loc.avatar.setInputFiles(file2);
      await loc.avatar.setInputFiles(file1);

      // preview should be visible with no errors
      await expect(loc.preview).toBeVisible();
      await expect(loc.preview).toHaveAttribute("src", /blob:/);
    });

    /** Test if the avatar preview persists when other validation errors occur */
    test("should keep avatar preview when other validation errors occur", async ({
      page,
    }) => {
      const loc = createLocators(page);

      const filePath = path.join(__dirname, "assets/image-avatar.jpg");

      // upload avatar
      await loc.avatar.setInputFiles(filePath);
      await expect(loc.preview).toBeVisible();

      // submit with other fields empty
      await loc.fullName.fill("");
      await loc.email.fill("");
      await loc.submit.click();

      // avatar preview should be visible
      await expect(loc.preview).toBeVisible();
      await expect(loc.errors.fullNameEmpty).toBeVisible();
    });

    /** Test if the email field validation works */
    test("should validate specific email formats", async ({ page }) => {
      const loc = createLocators(page);

      // fill valid name and username
      await loc.fullName.fill("John Doe");
      await loc.username.fill("@johndoe");

      // test email without @
      await loc.email.fill("emailwithoutatsign.com");
      await loc.submit.click();
      await expect(loc.errors.emailInvalid).toBeVisible();

      // test email without domain
      await loc.email.fill("email@");
      await loc.submit.click();
      await expect(loc.errors.emailInvalid).toBeVisible();

      // test email without local part
      await loc.email.fill("@domain.com");
      await loc.submit.click();
      await expect(loc.errors.emailInvalid).toBeVisible();

      // test email with space
      await loc.email.fill("john doe@email.com");
      await loc.submit.click();
      await expect(loc.errors.emailInvalid).toBeVisible();
    });

    /** Test if the username field should automatically prepend @ */
    test("should automatically prepend @ when user types username without it", async ({
      page,
    }) => {
      const loc = createLocators(page);

      // fill username without @
      await loc.username.fill("testuser");
      await loc.username.blur();

      // verify @ automatically added
      await expect(loc.username).toHaveValue("@testuser");
    });

    /** Test if the username field should not duplicate @ */
    test("should not duplicate @ if user already typed it", async ({
      page,
    }) => {
      const loc = createLocators(page);

      // fill username with @
      await loc.username.fill("@testuser");
      await loc.username.blur();

      // verify @ not duplicated
      await expect(loc.username).toHaveValue("@testuser");
    });

    /** Test if the form handle username with and without @ symbol */
    test("should handle username with and without @ symbol", async ({
      page,
    }) => {
      const loc = createLocators(page);

      // fill with username without @
      await loc.avatar.setInputFiles(
        path.join(__dirname, "assets/image-avatar.jpg"),
      );
      await loc.fullName.fill("John Doe");
      await loc.email.fill("john@email.com");
      await loc.username.fill("johndoe");

      // blur to trigger onChange handler
      await loc.username.blur();

      // verify that @ has been added to the field
      await expect(loc.username).toHaveValue("@johndoe");

      await loc.submit.click();

      await expect(loc.form).not.toBeVisible();
      await expect(page.getByText("Congrats")).toBeVisible();

      // verify the username in the ticket has @
      await expect(loc.ticket.getByText("John Doe@johndoe")).toBeVisible();
    });

    /** Test if the form auto-prepend @ even when validation errors occur */
    test("should auto-prepend @ even when validation errors occur", async ({
      page,
    }) => {
      const loc = createLocators(page);

      // fill only username
      await loc.username.fill("testuser");
      await loc.username.blur();

      // verify @ added
      await expect(loc.username).toHaveValue("@testuser");

      // submit to trigger validation errors
      await loc.submit.click();

      // username value should contain @
      await expect(loc.username).toHaveValue("@testuser");
      await expect(loc.errors.fullNameEmpty).toBeVisible();
    });

    /** Test if the form auto-prepend @ when navigating with Tab key */
    test("should auto-prepend @ when navigating with Tab key", async ({
      page,
    }) => {
      const loc = createLocators(page);

      // tab to username field
      await loc.fullName.focus();
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");

      // type without @
      await loc.username.fill("johndoe");

      // tab to move focus
      await page.keyboard.press("Tab");

      // verify @ has been added
      await expect(loc.username).toHaveValue("@johndoe");
    });

    /** Test if the error messages cleared when input is corrected */
    test("should clear error messages when input is corrected", async ({
      page,
    }) => {
      const loc = createLocators(page);

      // submit empty form
      await loc.submit.click();
      await expect(loc.errors.fullNameEmpty).toBeVisible();
      await expect(loc.errors.emailEmpty).toBeVisible();
      await expect(loc.errors.usernameEmpty).toBeVisible();

      // fix input one by one
      await loc.fullName.fill("John Doe");
      await expect(loc.errors.fullNameEmpty).not.toBeVisible();
      await expect(loc.errors.emailEmpty).toBeVisible();
      await expect(loc.errors.usernameEmpty).toBeVisible();

      await loc.email.fill("john@email.com");
      await expect(loc.errors.emailEmpty).not.toBeVisible();
      await expect(loc.errors.usernameEmpty).toBeVisible();

      await loc.username.fill("@johndoe");
      await expect(loc.errors.usernameEmpty).not.toBeVisible();
    });

    /** Test if the page has correct tab navigation order */
    test("should have correct tab navigation order", async ({ page }) => {
      const loc = createLocators(page);

      await page.keyboard.press("Tab");
      await expect(loc.avatarLabel).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(loc.fullName).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(loc.email).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(loc.username).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(loc.submit).toBeFocused();
    });

    /** Test if the form can be submitted with enter key */
    test("should submit form with Enter key", async ({ page }) => {
      const loc = createLocators(page);

      await fillForm(page);

      // press Enter at the last field
      await loc.username.press("Enter");

      // form submit
      await expect(loc.form).not.toBeVisible();
      await expect(page.getByText("Congrats")).toBeVisible();
    });

    /** Test if the form generate unique ticket numbers for multiple submissions */
    test("should generate unique ticket numbers for multiple submissions", async ({
      page,
    }) => {
      const loc = createLocators(page);

      // Mock Date.now and Math.random via localStorage so values persist across
      // page reloads. The init script reads from localStorage on each load.
      await page.addInitScript(() => {
        const time = Number(
          localStorage.getItem("__mockDateNow") ?? "1000000000000",
        );
        const random = Number(
          localStorage.getItem("__mockMathRandom") ?? "0.123",
        );
        Date.now = () => time;
        Math.random = () => random;
      });

      // First submission with initial mock values
      await page.goto("/conference-ticket-generator");
      await fillForm(page, {
        fullName: "John Doe",
        email: "john@email.com",
        username: "@johndoe",
      });
      await loc.submit.click();

      const ticketNumber1 = await loc.ticket.getByText(/#\d+/).textContent();

      // Swap to different mock values (localStorage persists across reload)
      await page.evaluate(() => {
        localStorage.setItem("__mockDateNow", "2000000000000");
        localStorage.setItem("__mockMathRandom", "0.456");
      });

      // Reload so generateTicketNumber picks up the new mock values
      await page.reload();
      await fillForm(page, {
        fullName: "Jane Smith",
        email: "jane@email.com",
        username: "@janesmith",
      });
      await loc.submit.click();

      const ticketNumber2 = await loc.ticket.getByText(/#\d+/).textContent();

      // Ticket numbers must differ
      expect(ticketNumber1).not.toBe(ticketNumber2);
    });

    test.describe("Drag and drop avatar input", () => {
      /** Test if the avatar preview visible when image is dropped */
      test("should show avatar preview when image is dropped", async ({
        page,
      }) => {
        const loc = createLocators(page);

        // make sure preview not visible
        await expect(loc.preview).toHaveCount(0);

        // simulate drag-and-drop file to drop zone
        await dragAndDropFile(
          page,
          "label.group",
          "assets/image-avatar.jpg",
          "image/jpg",
        );

        // preview should visible
        await expect(loc.preview).toBeVisible();
      });

      /** Test if the format error is shown when dropping unsupported image type  */
      test("should show format error when dropping unsupported image type", async ({
        page,
      }) => {
        const loc = createLocators(page);

        await expect(loc.errors.formatError).not.toBeVisible();

        // simulate drag-and-drop unsupported image type file to drop zone
        await dragAndDropFile(
          page,
          "label.group",
          "assets/image-avatar.webp",
          "image/webp",
        );

        await expect(loc.errors.formatError).toBeVisible();
      });

      /** Test if the size error is shown when dropping too large image  */
      test("should show size error when dropping too large image", async ({
        page,
      }) => {
        const loc = createLocators(page);

        await expect(loc.errors.sizeError).not.toBeVisible();

        // drop too large file
        await dragAndDropFile(
          page,
          "label.group",
          "assets/icon-github.png",
          "image/png",
        );

        await expect(loc.errors.sizeError).toBeVisible();
      });

      /** Test if the drag-over styles are applied when dragging file over drop zone  */
      test("should apply drag-over styles when dragging file over drop zone", async ({
        page,
      }) => {
        const loc = createLocators(page);

        const defaultBorder = await loc.avatarLabel.evaluate(
          (el) => window.getComputedStyle(el).borderColor,
        );

        // trigger dragenter + dragover via JS
        await loc.avatarLabel.dispatchEvent("dragenter");
        await loc.avatarLabel.dispatchEvent("dragover");

        const dragBorder = await loc.avatarLabel.evaluate(
          (el) => window.getComputedStyle(el).borderColor,
        );

        expect(dragBorder).not.toBe(defaultBorder);
      });

      /** Test if the drag-over styles are reset when drag leaves drop zone  */
      test("should reset drag-over styles when drag leaves drop zone", async ({
        page,
      }) => {
        const loc = createLocators(page);

        await loc.avatarLabel.dispatchEvent("dragenter");
        await loc.avatarLabel.dispatchEvent("dragover");
        const dragBorder = await loc.avatarLabel.evaluate(
          (el) => window.getComputedStyle(el).borderColor,
        );

        await loc.avatarLabel.dispatchEvent("dragleave");
        const leaveBorder = await loc.avatarLabel.evaluate(
          (el) => window.getComputedStyle(el).borderColor,
        );

        expect(leaveBorder).not.toBe(dragBorder);
      });
    });
  });

  /** Test if the page has hover effects on interactive elements */
  test("has hover effects on interactive elements", async ({ page }) => {
    // interactive elements
    const loc = createLocators(page);
    const avatar = loc.form.locator('label[for="avatar"]').nth(1);
    // text styles
    const defaultBg = "rgba(75, 72, 106, 0.3)";
    const hoverBg = "rgba(75, 72, 106, 0.7)";
    // avatar
    await expect(avatar).toHaveCSS("border-color", "rgb(135, 132, 164)");
    await expect(avatar).toHaveCSS(
      "background-color",
      "rgba(75, 72, 106, 0.3)",
    );
    await avatar.hover();
    await expect(avatar).toHaveCSS("border-color", "rgb(210, 209, 214)");
    await expect(avatar).toHaveCSS(
      "background-color",
      "rgba(75, 72, 106, 0.7)",
    );
    // fullName
    await expect(loc.fullName).toHaveCSS("background-color", defaultBg);
    await loc.fullName.hover();
    await expect(loc.fullName).toHaveCSS("background-color", hoverBg);
    // email
    await expect(loc.email).toHaveCSS("background-color", defaultBg);
    await loc.email.hover();
    await expect(loc.email).toHaveCSS("background-color", hoverBg);
    // username
    await expect(loc.username).toHaveCSS("background-color", defaultBg);
    await loc.username.hover();
    await expect(loc.username).toHaveCSS("background-color", hoverBg);
    // submit
    await expect(loc.submit).toHaveCSS("background-color", "rgb(245, 114, 97)");
    await expect(loc.submit).toHaveCSS("box-shadow", "none");
    await loc.submit.hover();
    await expect(loc.submit).toHaveCSS("background-color", "rgb(225, 97, 81)");
    await expect(loc.submit).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(245, 114, 97) 0px 4px 0px 0px",
    );
  });

  /** Test if the page has focus states on interactive elements */
  test("has focus states on interactive elements", async ({ page }) => {
    const loc = createLocators(page);
    const textInputs = [loc.fullName, loc.email, loc.username];

    // text inputs
    for (const textInput of textInputs) {
      await expect(textInput).toHaveCSS("outline-color", "rgb(255, 255, 255)");
      await expect(textInput).toHaveCSS("outline-offset", "0px");
      await expect(textInput).toHaveCSS("outline-style", "none");
      await expect(textInput).toHaveCSS("outline-width", "0px");
      await textInput.focus();
      await expect(textInput).toHaveCSS("outline-color", "rgb(135, 132, 164)");
      await expect(textInput).toHaveCSS("outline-offset", "3px");
      await expect(textInput).toHaveCSS("outline-style", "solid");
      await expect(textInput).toHaveCSS("outline-width", "2px");
    }

    // submit
    await expect(loc.submit).toHaveCSS("border-color", "rgb(229, 231, 235)");
    await expect(loc.submit).toHaveCSS("border-width", "0px");
    await expect(loc.submit).toHaveCSS("outline-color", "rgb(12, 8, 43)");
    await expect(loc.submit).toHaveCSS("outline-style", "none");
    await expect(loc.submit).toHaveCSS("outline-width", "0px");
    await loc.submit.focus();
    await expect(loc.submit).toHaveCSS("border-color", "rgb(12, 8, 43)");
    await expect(loc.submit).toHaveCSS("border-width", "3px");
    await expect(loc.submit).toHaveCSS("outline-color", "rgb(135, 132, 164)");
    await expect(loc.submit).toHaveCSS("outline-style", "solid");
    await expect(loc.submit).toHaveCSS("outline-width", "2px");
  });

  /** Test if avatar action buttons have focus states */
  test("has focus states on avatar action buttons", async ({ page }) => {
    const loc = createLocators(page);

    // upload avatar first to show action buttons
    await loc.avatar.setInputFiles(
      path.join(__dirname, "assets/image-avatar.jpg"),
    );

    // Remove button - initial state
    await expect(loc.removeImage).toHaveCSS("outline-style", "none");
    await expect(loc.removeImage).toHaveCSS("outline-width", "0px");

    // Remove button - focused state
    await loc.removeImage.focus();
    await expect(loc.removeImage).toHaveCSS(
      "outline-color",
      "rgb(135, 132, 164)",
    );
    await expect(loc.removeImage).toHaveCSS("outline-offset", "2px");
    await expect(loc.removeImage).toHaveCSS("outline-style", "solid");
    await expect(loc.removeImage).toHaveCSS("outline-width", "2px");

    // Change button - initial state
    await loc.changeImage.evaluate((el) => (el as HTMLElement).blur());
    await expect(loc.changeImage).toHaveCSS("outline-style", "none");
    await expect(loc.changeImage).toHaveCSS("outline-width", "0px");

    // Change button - focused state
    await loc.changeImage.focus();
    await expect(loc.changeImage).toHaveCSS(
      "outline-color",
      "rgb(135, 132, 164)",
    );
    await expect(loc.changeImage).toHaveCSS("outline-offset", "2px");
    await expect(loc.changeImage).toHaveCSS("outline-style", "solid");
    await expect(loc.changeImage).toHaveCSS("outline-width", "2px");
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();
    // console.log({ violations: accessibilityScanResults.violations });
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  /** Test accessibility attributes */
  test.describe("accessibility attributes", () => {
    /** Test if avatar input has proper aria-describedby */
    test("should have aria-describedby on avatar input", async ({ page }) => {
      const avatarInput = page.locator("input#avatar");
      const avatarHint = page.locator("#avatar-hint");

      await expect(avatarInput).toHaveAttribute(
        "aria-describedby",
        "avatar-hint",
      );
      await expect(avatarHint).toBeVisible();
      await expect(avatarHint).toHaveAttribute("aria-live", "assertive");
    });

    /** Test if avatar buttons have proper aria-labels */
    test("should have aria-label on avatar buttons", async ({ page }) => {
      const loc = createLocators(page);

      // upload avatar first
      await loc.avatar.setInputFiles(
        path.join(__dirname, "assets/image-avatar.jpg"),
      );

      const removeButton = loc.form.getByRole("button", {
        name: "Remove avatar image",
      });
      const changeButton = loc.form.getByRole("button", {
        name: "Change avatar image",
      });

      await expect(removeButton).toBeVisible();
      await expect(changeButton).toBeVisible();
      await expect(removeButton).toHaveAttribute(
        "aria-label",
        "Remove avatar image",
      );
      await expect(changeButton).toHaveAttribute(
        "aria-label",
        "Change avatar image",
      );
    });

    /** Test if text inputs have aria-invalid when error occurs */
    test("should have aria-invalid on text inputs when validation errors occur", async ({
      page,
    }) => {
      const loc = createLocators(page);

      // initially no aria-invalid
      await expect(loc.fullName).not.toHaveAttribute("aria-invalid", "true");
      await expect(loc.email).not.toHaveAttribute("aria-invalid", "true");
      await expect(loc.username).not.toHaveAttribute("aria-invalid", "true");

      // submit empty form
      await loc.submit.click();

      // aria-invalid should be set
      await expect(loc.fullName).toHaveAttribute("aria-invalid", "true");
      await expect(loc.email).toHaveAttribute("aria-invalid", "true");
      await expect(loc.username).toHaveAttribute("aria-invalid", "true");
    });

    /** Test if text inputs have aria-describedby when error occurs */
    test("should have aria-describedby on text inputs when validation errors occur", async ({
      page,
    }) => {
      const loc = createLocators(page);

      // submit empty form
      await loc.submit.click();

      // check aria-describedby
      await expect(loc.fullName).toHaveAttribute(
        "aria-describedby",
        "fullname-error",
      );
      await expect(loc.email).toHaveAttribute(
        "aria-describedby",
        "email-error",
      );
      await expect(loc.username).toHaveAttribute(
        "aria-describedby",
        "username-error",
      );

      // check error elements exist with correct IDs
      await expect(page.locator("#fullname-error")).toBeVisible();
      await expect(page.locator("#email-error")).toBeVisible();
      await expect(page.locator("#username-error")).toBeVisible();
    });

    /** Test if error messages use output elements with aria-live */
    test("should use output elements with aria-live for error messages", async ({
      page,
    }) => {
      const loc = createLocators(page);

      // submit empty form
      await loc.submit.click();

      // check error outputs have aria-live
      const fullnameError = loc.form.locator("output#fullname-error");
      const emailError = loc.form.locator("output#email-error");
      const usernameError = loc.form.locator("output#username-error");

      await expect(fullnameError).toHaveAttribute("aria-live", "assertive");
      await expect(emailError).toHaveAttribute("aria-live", "assertive");
      await expect(usernameError).toHaveAttribute("aria-live", "assertive");
    });

    /** Test if decorative icons are hidden from screen readers */
    test("should have aria-hidden on decorative icons", async ({ page }) => {
      const loc = createLocators(page);
      const avatarHintIcon = loc.form.locator("#avatar-hint svg");

      await expect(avatarHintIcon).toHaveAttribute("aria-hidden", "true");
    });
  });
});
