import { expect, test } from "@playwright/test";
import path from "node:path";

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

    /** Test if the form can generate conference ticket */
    test("should generate conference ticket", async ({ page }) => {
      const form = page.locator("form");
      // Fill inputs
      await page.getByLabel("Full Name").fill("Jonatan Kristof");
      await page.getByLabel("Email Address").fill("jonatan@email.com");
      await page.getByLabel("GitHub Username").fill("@jonatankristof0101");
      // Submit
      await page.getByRole("button", { name: "Generate My Ticket" }).click();
      // Switch to ticket view
      await expect(form).not.toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Congrats, Jonatan Kristof!" }),
      ).toBeVisible();
      await expect(
        page.getByText("We’ve emailed your ticket to jonatan@email.com"),
      ).toBeVisible();
      await expect(
        page.getByText("Coding ConfJan 31, 2025 / Austin, TX"),
      ).toBeVisible();
      await expect(
        page.getByRole("img", { name: "Avatar preview" }).first(),
      ).toBeVisible();
      await expect(
        page.getByText("Jonatan Kristof@jonatankristof0101"),
      ).toBeVisible();
      await expect(page.getByText(/#\d+/)).toBeVisible();
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
      const fullName = form.getByLabel("Full Name");
      const email = form.getByLabel("Email Address");

      const fullNameError = page.getByText("Fullname cannot be empty.");
      const emailError = page.getByText("Please enter a valid email address.");
      const usernameError = page.getByText("Username cannot be empty.");
      const submit = page.getByRole("button", { name: "Generate My Ticket" });

      await expect(fullNameError).not.toBeVisible();
      await expect(emailError).not.toBeVisible();
      await expect(usernameError).not.toBeVisible();

      await fullName.fill("  \t\t  ");
      await email.fill("jonatan");

      await submit.click();

      await expect(fullNameError).toBeVisible();
      await expect(emailError).toBeVisible();
      await expect(usernameError).toBeVisible();
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
