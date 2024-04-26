import { test, expect, type Page, type Locator } from "@playwright/test";

const pageUrl = "/multi-step-form";

test.describe("FrontendMentor Challenge - Multi-step form Page", () => {
  /** Go to Multi-step form page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto(pageUrl);
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Multi-step form");
  });

  /** Test if the page has a main card */
  test.describe("has a main card", () => {
    test.describe.configure({ mode: "serial" });

    let page: Page;
    let card: Locator;
    let form: Locator;
    let step1Form: {
      name: Locator;
      email: Locator;
      phone: Locator;
      nextStep: Locator;
    };

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(pageUrl);
    });

    test("card is visble", async () => {
      card = page.getByRole("main");
      await expect(card).toBeVisible();
      await expect(card).toBeInViewport();
    });

    test("has initial elements", async () => {
      const stepNav = card.locator("div").first();
      const navs = await stepNav.locator(">div").all();
      expect(navs).toHaveLength(4);
      const steps = ["Your Info", "Select Plan", "Add-ons", "Summary"];
      for (const [idx, nav] of Object.entries(navs)) {
        const index = Number(idx) + 1;
        const stepButton = nav.getByRole("link", { name: `${index}` });
        await expect(stepButton).toBeVisible();
        if (index <= 1) {
          await expect(stepButton).toHaveCSS(
            "background-color",
            "rgb(191, 226, 253)",
          );
          await expect(stepButton).not.toHaveCSS("pointer-events", "none");
        } else {
          await expect(stepButton).not.toHaveCSS(
            "background-color",
            "rgb(191, 226, 253)",
          );
          await expect(stepButton).toHaveCSS("pointer-events", "none");
        }
        await expect(nav.getByText(`Step ${index}`)).toBeVisible();
        await expect(nav.getByText(steps[index - 1])).toBeVisible();
      }
      form = card.locator("form");
      await expect(
        form.getByRole("heading", { name: "Personal info" }),
      ).toBeVisible();
      await expect(
        form.getByText(
          "Please provide your name, email address, and phone number.",
        ),
      ).toBeVisible();
      await expect(form.getByText("Name", { exact: true })).toBeVisible();
      const name = form.getByPlaceholder("e.g. Stephen King");
      const email = form.getByPlaceholder("e.g. stephenking@lorem.com");
      const phone = form.getByPlaceholder("e.g. +1 234 567 890");
      const nextStep = form.getByRole("button", { name: "Next Step" });
      await expect(name).toBeVisible();
      await expect(
        form.getByText("Email Address", { exact: true }),
      ).toBeVisible();
      await expect(email).toBeVisible();
      await expect(
        form.getByText("Phone Number", { exact: true }),
      ).toBeVisible();
      await expect(phone).toBeVisible();
      await expect(nextStep).toBeVisible();
      step1Form = { name, email, phone, nextStep };
    });

    test.describe("step 1 form is working", () => {
      test("can handle empty inputs", async () => {
        await step1Form.nextStep.click();
        expect(
          await form.getByText("This field is required").all(),
        ).toHaveLength(3);
      });
      test("can handle invalid inputs", async () => {
        await page.reload();
        // TODO: add more name validation
        await step1Form.name.fill("Name");
        await step1Form.email.fill("invalid email");
        await step1Form.phone.fill("invalid phone");
        await step1Form.nextStep.click();
        await expect(form.getByText("Email invalid")).toBeVisible();
        await expect(form.getByText("Invalid Number!")).toBeVisible();
      });
    });
  });
});
