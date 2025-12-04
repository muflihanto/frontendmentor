import path from "node:path";
import { expect, test } from "@playwright/test";

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
    const form = page.locator("form");
    await expect(form).toBeVisible();
    // Upload avatar field
    await expect(
      page.locator("label", { hasText: "Upload Avatar" }),
    ).toBeVisible();
    await expect(page.getByLabel("Upload Avatar")).toHaveCount(1);
    await expect(page.getByLabel("Upload Avatar")).toBeHidden();
    await expect(
      page.locator("label", { hasText: "Drag and drop or click to upload" }),
    ).toBeVisible();
    await expect(
      page.getByLabel("Drag and drop or click to upload"),
    ).toHaveCount(1);
    await expect(
      page.getByLabel("Drag and drop or click to upload"),
    ).toBeHidden();
    // Full name field
    await expect(page.locator("label", { hasText: "Full Name" })).toBeVisible();
    await expect(page.getByLabel("Full Name")).toBeVisible();
    // Email Address field
    await expect(
      page.locator("label", { hasText: "Email Address" }),
    ).toBeVisible();
    await expect(page.getByLabel("Email Address")).toBeVisible();
    // GitHub Username field
    await expect(
      page.locator("label", { hasText: "GitHub Username" }),
    ).toBeVisible();
    await expect(page.getByLabel("GitHub Username")).toBeVisible();
    // Submit button
    await expect(
      page.getByRole("button", { name: "Generate My Ticket" }),
    ).toBeVisible();
  });

  /** Test if the page can handle form submission */
  test.describe("form submission", () => {
    /** Test if the form can handle valid input */
    test("should handle valid input correctly", async ({ page }) => {
      const form = page.locator("form");
      const fullName = page.getByLabel("Full Name");
      const email = page.getByLabel("Email Address");
      const username = page.getByLabel("GitHub Username");
      const submit = page.getByRole("button", { name: "Generate My Ticket" });
      // Fill inputs
      await fullName.fill("Jonatan Kristof");
      await email.fill("jonatan@email.com");
      await username.fill("@jonatankristof0101");
      // Submit
      await submit.click();
      // Switch to ticket view
      await expect(form).not.toBeVisible();
      await expect(page.getByText("Congrats")).toBeVisible();
    });

    /** Test if the form can handle valid input with avatar */
    test("should handle valid input with avatar correctly", async ({
      page,
    }) => {
      const form = page.locator("form");
      const avatar = page.getByLabel("Drag and drop or click to upload");
      const fullName = page.getByLabel("Full Name");
      const email = page.getByLabel("Email Address");
      const username = page.getByLabel("GitHub Username");
      const submit = page.getByRole("button", { name: "Generate My Ticket" });
      // Fill inputs
      await avatar.setInputFiles(
        path.join(__dirname, "assets/image-avatar.jpg"),
      );
      await fullName.fill("Jonatan Kristof");
      await email.fill("jonatan@email.com");
      await username.fill("@jonatankristof0101");
      // Submit
      await submit.click();
      // Switch to ticket view
      await expect(form).not.toBeVisible();
      await expect(page.getByText("Congrats")).toBeVisible();
    });

    /** Test if the form can generate conference ticket */
    test("should generate conference ticket", async ({ page }) => {
      const form = page.locator("form");
      const ticket = page.locator('div[id="ticket"]');
      // input data
      const fullname = "Jonatan Kristof";
      const email = "jonatan@email.com";
      const username = "@jonatankristof0101";
      // Fill inputs
      await page.getByLabel("Full Name").fill(fullname);
      await page.getByLabel("Email Address").fill(email);
      await page.getByLabel("GitHub Username").fill(username);
      // Submit
      await page.getByRole("button", { name: "Generate My Ticket" }).click();
      // Switch to ticket view
      await expect(form).not.toBeVisible();
      await expect(
        page.getByRole("heading", { name: `Congrats, ${fullname}!` }),
      ).toBeVisible();
      await expect(
        page.getByText(`We’ve emailed your ticket to ${email}`),
      ).toBeVisible();
      await expect(
        ticket.getByText("Coding ConfJan 31, 2025 / Austin, TX"),
      ).toBeVisible();
      await expect(
        ticket.getByRole("img", { name: "Avatar preview" }),
      ).toBeVisible();
      await expect(ticket.getByText(`${fullname}${username}`)).toBeVisible();
      await expect(ticket.getByText(/#\d+/)).toBeVisible();
    });

    /** Test if the form can generate conference ticket with avatar */
    test("should generate conference ticket with avatar", async ({ page }) => {
      const form = page.locator("form");
      const ticket = page.locator('div[id="ticket"]');
      // input data
      const fullname = "Jonatan Kristof";
      const email = "jonatan@email.com";
      const username = "@jonatankristof0101";
      const filePath = path.join(__dirname, "assets/image-avatar.jpg");
      // Fill inputs
      await page.getByLabel("Upload Avatar").setInputFiles(filePath);
      await page.getByLabel("Full Name").fill(fullname);
      await page.getByLabel("Email Address").fill(email);
      await page.getByLabel("GitHub Username").fill(username);

      const preview = form.getByRole("img", { name: "Avatar preview" });
      const previewSrc = await preview.getAttribute("src");
      // Submit
      await page.getByRole("button", { name: "Generate My Ticket" }).click();
      // Switch to ticket view
      await expect(form).not.toBeVisible();
      await expect(
        page.getByRole("heading", { name: `Congrats, ${fullname}!` }),
      ).toBeVisible();
      await expect(
        page.getByText(`We’ve emailed your ticket to ${email}`),
      ).toBeVisible();
      await expect(
        ticket.getByText("Coding ConfJan 31, 2025 / Austin, TX"),
      ).toBeVisible();
      await expect(
        ticket.getByRole("img", { name: "Avatar preview" }),
      ).toBeVisible();
      await expect(
        ticket.getByRole("img", { name: "Avatar preview" }),
      ).toHaveAttribute("src", previewSrc ?? "");
      await expect(ticket.getByText(`${fullname}${username}`)).toBeVisible();
      await expect(ticket.getByText(/#\d+/)).toBeVisible();
    });

    /** Test if the form can handle empty input */
    test("should handle empty input correctly", async ({ page }) => {
      const fullNameError = page.getByText("Fullname cannot be empty.");
      const emailError = page.getByText("Email address cannot be empty.");
      const usernameError = page.getByText("Username cannot be empty.");
      const submit = page.getByRole("button", { name: "Generate My Ticket" });

      await expect(fullNameError).not.toBeVisible();
      await expect(emailError).not.toBeVisible();
      await expect(usernameError).not.toBeVisible();

      await submit.click();

      await expect(fullNameError).toBeVisible();
      await expect(emailError).toBeVisible();
      await expect(usernameError).toBeVisible();
    });

    /** Test if the form can handle whitespace-only input */
    test("should handle whitespace-only input correctly", async ({ page }) => {
      const form = page.locator("form");
      const fullName = form.getByLabel("Full Name");
      const email = form.getByLabel("Email Address");
      const username = form.getByLabel("GitHub Username");

      const fullNameError = page.getByText("Fullname cannot be empty.");
      const emailError = page.getByText("Please enter a valid email address.");
      const usernameError = page.getByText("Username cannot be empty.");
      const submit = page.getByRole("button", { name: "Generate My Ticket" });

      await expect(fullNameError).not.toBeVisible();
      await expect(emailError).not.toBeVisible();
      await expect(usernameError).not.toBeVisible();

      await fullName.fill("   ");
      await email.fill("jonatan@email.com");
      await username.fill("   ");

      await submit.click();

      await expect(fullNameError).toBeVisible();
      await expect(usernameError).toBeVisible();
    });

    /** Test if the form can handle invalid input */
    test("should handle invalid input correctly", async ({ page }) => {
      const form = page.locator("form");
      const avatar = form.getByLabel("Upload Avatar");
      const fullName = form.getByLabel("Full Name");
      const email = form.getByLabel("Email Address");

      const avatarError = page.getByText(
        "File too large. Please upload a photo under 500KB.",
      );
      const fullNameError = page.getByText("Fullname cannot be empty.");
      const emailError = page.getByText("Please enter a valid email address.");
      const usernameError = page.getByText("Username cannot be empty.");
      const submit = page.getByRole("button", { name: "Generate My Ticket" });

      const filePath = path.join(__dirname, "assets/icon-github.png");

      await expect(avatarError).not.toBeVisible();
      await expect(fullNameError).not.toBeVisible();
      await expect(emailError).not.toBeVisible();
      await expect(usernameError).not.toBeVisible();

      await avatar.setInputFiles(filePath);
      await fullName.fill("  \t\t  ");
      await email.fill("jonatan");

      await submit.click();

      await expect(avatarError).toBeVisible();
      await expect(fullNameError).toBeVisible();
      await expect(emailError).toBeVisible();
      await expect(usernameError).toBeVisible();
    });

    /** Test if the form can handle special characters in inputs */
    test("should handle special characters in inputs", async ({ page }) => {
      const form = page.locator("form");
      const fullName = form.getByLabel("Full Name");
      const email = form.getByLabel("Email Address");
      const username = form.getByLabel("GitHub Username");
      const submit = page.getByRole("button", { name: "Generate My Ticket" });

      const specialName = "José O'Brien-Smith";
      const specialEmail = "jose.o-brien+test@email-domain.co.uk";
      const specialUsername = "@jose_obrien-123";

      await fullName.fill(specialName);
      await email.fill(specialEmail);
      await username.fill(specialUsername);
      await submit.click();

      await expect(form).not.toBeVisible();
      await expect(
        page.getByRole("heading", { name: `Congrats, ${specialName}!` }),
      ).toBeVisible();
    });

    /** Test if the form trim leading and trailing whitespace from inputs */
    test("should trim leading and trailing whitespace from inputs", async ({
      page,
    }) => {
      const form = page.locator("form");
      const ticket = page.locator('div[id="ticket"]');
      const fullName = form.getByLabel("Full Name");
      const email = form.getByLabel("Email Address");
      const username = form.getByLabel("GitHub Username");
      const submit = page.getByRole("button", { name: "Generate My Ticket" });

      const trimmedName = "John Doe";
      const trimmedUsername = "@johndoe";

      // input with trailing/leading whitespace
      await fullName.fill(`  ${trimmedName}  `);
      await email.fill("  john@email.com  ");
      await username.fill(`  ${trimmedUsername}  `);
      await submit.click();

      // ticket should shows trimmed values
      await expect(form).not.toBeVisible();
      await expect(
        ticket.getByText(`${trimmedName}${trimmedUsername}`),
      ).toBeVisible();
    });

    /** Test if the avatar upload field works */
    test("should show avatar preview", async ({ page }) => {
      const form = page.locator("form");
      const avatarLabel = form.locator("label", {
        hasText: "Drag and drop or click to upload",
      });
      const fileChooserPromise = page.waitForEvent("filechooser");
      await avatarLabel.click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        path.join(__dirname, "assets/image-avatar.jpg"),
      );
      const preview = form.getByRole("img", { name: "Avatar preview" });
      const removeImage = form.locator("button", { hasText: "Remove image" });
      const changeImage = form.locator("button", { hasText: "Change image" });
      await expect(preview).toBeVisible();
      await expect(removeImage).toBeVisible();
      await expect(changeImage).toBeVisible();
    });

    /** Test if the avatar upload field validation works */
    test("should trigger field validation on avatar change", async ({
      page,
    }) => {
      const form = page.locator("form");
      const avatarLabel = form.locator("label", {
        hasText: "Drag and drop or click to upload",
      });
      const formatError = form.getByText("File must be JPG or PNG format.");
      const sizeError = form.getByText(
        "File too large. Please upload a photo under 500KB.",
      );
      const fileChooserPromise = page.waitForEvent("filechooser");

      // initial check
      await expect(formatError).not.toBeVisible();
      await expect(sizeError).not.toBeVisible();

      // unsupported format upload
      await avatarLabel.click();
      let fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        path.join(__dirname, "assets/image-avatar.webp"),
      );
      await expect(formatError).toBeVisible();
      await expect(sizeError).not.toBeVisible();

      // too large file upload
      await avatarLabel.click();
      fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        path.join(__dirname, "assets/icon-github.png"),
      );
      await expect(formatError).not.toBeVisible();
      await expect(sizeError).toBeVisible();

      // valid image upload
      await avatarLabel.click();
      fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(
        path.join(__dirname, "assets/image-avatar.jpg"),
      );
      await expect(formatError).not.toBeVisible();
      await expect(sizeError).not.toBeVisible();
      await expect(
        form.getByRole("img", { name: "Avatar preview" }),
      ).toBeVisible();
    });

    /** Test if the avatar upload field works */
    test("should be able to change and remove selected image", async ({
      page,
    }) => {
      const form = page.locator("form");
      const avatarLabel = form.getByText("Upload Avatar");
      const avatarInput = form.getByLabel("Upload Avatar");
      const preview = form.getByRole("img", { name: "Avatar preview" });
      const removeImage = form.locator("button", { hasText: "Remove image" });
      const changeImage = form.locator("button", { hasText: "Change image" });

      const imagePathOne = path.join(__dirname, "assets/image-avatar.jpg");
      const imagePathTwo = path.join(__dirname, "assets/default-avatar.png");

      // select first image
      const fileChooserPromise = page.waitForEvent("filechooser");
      await avatarLabel.click();
      let fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(imagePathOne);
      await expect(preview).toBeVisible();
      await expect(removeImage).toBeVisible();
      await expect(changeImage).toBeVisible();
      expect(
        await avatarInput.evaluate(
          (el) => (el as HTMLInputElement).files?.[0].name,
        ),
      ).toBe("image-avatar.jpg");

      // change image button check
      fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(imagePathTwo);
      await expect(preview).toBeVisible();
      await expect(removeImage).toBeVisible();
      await expect(changeImage).toBeVisible();
      expect(
        await avatarInput.evaluate(
          (el) => (el as HTMLInputElement).files?.[0].name,
        ),
      ).toBe("default-avatar.png");

      // remove image button check
      await removeImage.click();
      await expect(preview).not.toBeVisible();
      await expect(removeImage).not.toBeVisible();
      await expect(changeImage).not.toBeVisible();
    });

    /** Test if the avatar field reject non-image file formats */
    test("should reject non-image file formats", async ({ page }) => {
      const form = page.locator("form");
      const avatar = form.getByLabel("Upload Avatar");
      const formatError = form.getByText("File must be JPG or PNG format.");

      // try upload non-image file
      const filePath = path.join(__dirname, "assets/test-file.txt");

      await avatar.setInputFiles(filePath);
      await expect(formatError).toBeVisible();
    });

    /** Test if the form can handle rapid avatar changes */
    test("should handle rapid avatar changes", async ({ page }) => {
      const form = page.locator("form");
      const avatar = form.getByLabel("Upload Avatar");
      const preview = form.getByRole("img", { name: "Avatar preview" });

      const file1 = path.join(__dirname, "assets/image-avatar.jpg");
      const file2 = path.join(__dirname, "assets/default-avatar.png");

      // upload rapidly several times
      await avatar.setInputFiles(file1);
      await avatar.setInputFiles(file2);
      await avatar.setInputFiles(file1);

      // preview should be visible with no errors
      await expect(preview).toBeVisible();
      await expect(
        form.getByRole("img", { name: "Avatar preview" }),
      ).toHaveAttribute("src", /blob:/);
    });

    /** Test if the avatar preview persists when other validation errors occur */
    test("should keep avatar preview when other validation errors occur", async ({
      page,
    }) => {
      const form = page.locator("form");
      const avatar = form.getByLabel("Upload Avatar");
      const fullName = form.getByLabel("Full Name");
      const email = form.getByLabel("Email Address");
      const submit = page.getByRole("button", { name: "Generate My Ticket" });
      const preview = form.getByRole("img", { name: "Avatar preview" });

      const filePath = path.join(__dirname, "assets/image-avatar.jpg");

      // upload avatar
      await avatar.setInputFiles(filePath);
      await expect(preview).toBeVisible();

      // submit with other fields empty
      await fullName.fill("");
      await email.fill("");
      await submit.click();

      // avatar preview should be visible
      await expect(preview).toBeVisible();
      await expect(page.getByText("Fullname cannot be empty.")).toBeVisible();
    });

    /** Test if the email field validation works */
    test("should validate specific email formats", async ({ page }) => {
      const form = page.locator("form");
      const email = form.getByLabel("Email Address");
      const fullName = form.getByLabel("Full Name");
      const username = form.getByLabel("GitHub Username");
      const submit = page.getByRole("button", { name: "Generate My Ticket" });
      const emailError = page.getByText("Please enter a valid email address.");

      // fill valid name and username
      await fullName.fill("John Doe");
      await username.fill("@johndoe");

      // test email without @
      await email.fill("emailwithoutatsign.com");
      await submit.click();
      await expect(emailError).toBeVisible();

      // test email without domain
      await email.fill("email@");
      await submit.click();
      await expect(emailError).toBeVisible();

      // test email without local part
      await email.fill("@domain.com");
      await submit.click();
      await expect(emailError).toBeVisible();

      // test email with space
      await email.fill("john doe@email.com");
      await submit.click();
      await expect(emailError).toBeVisible();
    });

    /** Test if the username field should automatically prepend @ */
    test("should automatically prepend @ when user types username without it", async ({
      page,
    }) => {
      const form = page.locator("form");
      const username = form.getByLabel("GitHub Username");

      // fill username without @
      await username.fill("testuser");
      await username.blur();

      // verify @ automatically added
      await expect(username).toHaveValue("@testuser");
    });

    /** Test if the username field should not duplicate @ */
    test("should not duplicate @ if user already typed it", async ({
      page,
    }) => {
      const form = page.locator("form");
      const username = form.getByLabel("GitHub Username");

      // fill username with @
      await username.fill("@testuser");
      await username.blur();

      // verify @ not duplicated
      await expect(username).toHaveValue("@testuser");
    });

    /** Test if the form handle username with and without @ symbol */
    test("should handle username with and without @ symbol", async ({
      page,
    }) => {
      const form = page.locator("form");
      const ticket = page.locator('div[id="ticket"]');
      const fullName = page.getByLabel("Full Name");
      const email = page.getByLabel("Email Address");
      const username = page.getByLabel("GitHub Username");
      const submit = page.getByRole("button", { name: "Generate My Ticket" });

      // fill with username without @
      await fullName.fill("John Doe");
      await email.fill("john@email.com");
      await username.fill("johndoe");

      // blur to trigger onChange handler
      await username.blur();

      // verify that @ has been added to the field
      await expect(username).toHaveValue("@johndoe");

      await submit.click();

      await expect(form).not.toBeVisible();
      await expect(page.getByText("Congrats")).toBeVisible();

      // verify the username in the ticket has @
      await expect(ticket.getByText("John Doe@johndoe")).toBeVisible();
    });

    /** Test if the form auto-prepend @ even when validation errors occur */
    test("should auto-prepend @ even when validation errors occur", async ({
      page,
    }) => {
      const form = page.locator("form");
      const username = form.getByLabel("GitHub Username");
      const submit = form.getByRole("button", { name: "Generate My Ticket" });

      // fill only username
      await username.fill("testuser");
      await username.blur();

      // verify @ added
      await expect(username).toHaveValue("@testuser");

      // submit to trigger validation errors
      await submit.click();

      // username value should contain @
      await expect(username).toHaveValue("@testuser");
      await expect(page.getByText("Fullname cannot be empty.")).toBeVisible();
    });

    /** Test if the error messages cleared when input is corrected */
    test("should clear error messages when input is corrected", async ({
      page,
    }) => {
      const form = page.locator("form");
      const fullName = form.getByLabel("Full Name");
      const email = form.getByLabel("Email Address");
      const username = form.getByLabel("GitHub Username");
      const submit = page.getByRole("button", { name: "Generate My Ticket" });

      const fullNameError = page.getByText("Fullname cannot be empty.");
      const emailError = page.getByText("Email address cannot be empty.");
      const usernameError = page.getByText("Username cannot be empty.");

      // submit empty form
      await submit.click();
      await expect(fullNameError).toBeVisible();
      await expect(emailError).toBeVisible();
      await expect(usernameError).toBeVisible();

      // fix input one by one
      await fullName.fill("John Doe");
      await expect(fullNameError).not.toBeVisible();
      await expect(emailError).toBeVisible();
      await expect(usernameError).toBeVisible();

      await email.fill("john@email.com");
      await expect(emailError).not.toBeVisible();
      await expect(usernameError).toBeVisible();

      await username.fill("@johndoe");
      await expect(usernameError).not.toBeVisible();
    });

    /** Test if the page has correct tab navigation order */
    test("should have correct tab navigation order", async ({ page }) => {
      const avatar = page.locator("label", {
        hasText: "Drag and drop or click to upload",
      });
      const fullName = page.getByLabel("Full Name");
      const email = page.getByLabel("Email Address");
      const username = page.getByLabel("GitHub Username");
      const submit = page.getByRole("button", { name: "Generate My Ticket" });

      await page.keyboard.press("Tab");
      await expect(avatar).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(fullName).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(email).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(username).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(submit).toBeFocused();
    });

    /** Test if the form can be submitted with enter key */
    test("should submit form with Enter key", async ({ page }) => {
      const form = page.locator("form");
      const fullName = form.getByLabel("Full Name");
      const email = form.getByLabel("Email Address");
      const username = form.getByLabel("GitHub Username");

      await fullName.fill("John Doe");
      await email.fill("john@email.com");
      await username.fill("@johndoe");

      // press Enter at the last field
      await username.press("Enter");

      // form submit
      await expect(form).not.toBeVisible();
      await expect(page.getByText("Congrats")).toBeVisible();
    });
  });

  /** Test if the page has hover effects on interactive elements */
  test("has hover effects on interactive elements", async ({ page }) => {
    // interactive elements
    const form = page.locator("form");
    const avatar = form.locator('label[for="avatar"]').nth(1);
    const fullName = form.getByLabel("Full Name");
    const email = form.getByLabel("Email Address");
    const username = form.getByLabel("GitHub Username");
    const submit = form.getByRole("button", { name: "Generate My Ticket" });
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
    await expect(fullName).toHaveCSS("background-color", defaultBg);
    await fullName.hover();
    await expect(fullName).toHaveCSS("background-color", hoverBg);
    // email
    await expect(email).toHaveCSS("background-color", defaultBg);
    await email.hover();
    await expect(email).toHaveCSS("background-color", hoverBg);
    // username
    await expect(username).toHaveCSS("background-color", defaultBg);
    await username.hover();
    await expect(username).toHaveCSS("background-color", hoverBg);
    // submit
    await expect(submit).toHaveCSS("background-color", "rgb(245, 114, 97)");
    await expect(submit).toHaveCSS("box-shadow", "none");
    await submit.hover();
    await expect(submit).toHaveCSS("background-color", "rgb(225, 97, 81)");
    await expect(submit).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(245, 114, 97) 0px 4px 0px 0px",
    );
  });

  /** Test if the page has focus states on interactive elements */
  test("has focus states on interactive elements", async ({ page }) => {
    // interactive elements
    const form = page.locator("form");
    const fullName = form.getByLabel("Full Name");
    const email = form.getByLabel("Email Address");
    const username = form.getByLabel("GitHub Username");
    const submit = form.getByRole("button", { name: "Generate My Ticket" });
    const textInputs = [fullName, email, username];

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
    await expect(submit).toHaveCSS("border-color", "rgb(229, 231, 235)");
    await expect(submit).toHaveCSS("border-width", "0px");
    await expect(submit).toHaveCSS("outline-color", "rgb(12, 8, 43)");
    await expect(submit).toHaveCSS("outline-style", "none");
    await expect(submit).toHaveCSS("outline-width", "0px");
    await submit.focus();
    await expect(submit).toHaveCSS("border-color", "rgb(12, 8, 43)");
    await expect(submit).toHaveCSS("border-width", "3px");
    await expect(submit).toHaveCSS("outline-color", "rgb(135, 132, 164)");
    await expect(submit).toHaveCSS("outline-style", "solid");
    await expect(submit).toHaveCSS("outline-width", "2px");
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
