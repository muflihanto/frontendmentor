import AxeBuilder from "@axe-core/playwright";
import type { Locator, Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

const pageUrl = "/multi-step-form";

async function fillPersonalInfo(
  page: Page,
  name: string,
  email: string,
  phone: string,
) {
  await page.getByPlaceholder("e.g. Stephen King").fill(name);
  await page.getByPlaceholder("e.g. stephenking@lorem.com").fill(email);
  await page.getByPlaceholder("e.g. +1 234 567 890").fill(phone);
}

async function goToStep(page: Page, step: number) {
  await page.getByRole("link", { name: String(step) }).click();
}

async function expectAllVisible(...locators: Locator[]) {
  for (const locator of locators) {
    await expect(locator).toBeVisible();
  }
}

async function expectHeadingVisible(scope: Page | Locator, name: string) {
  await expect(scope.getByRole("heading", { name })).toBeVisible();
}

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
    const plans = ["Arcade", "Advanced", "Pro"] as const;
    const planPrice: Record<(typeof plans)[number], number> = {
      Arcade: 9,
      Advanced: 12,
      Pro: 15,
    };
    // const planPayments = ["monthly" , "yearly"] as const;
    let step2Form: {
      labels: Locator[];
      toggle: Locator;
      goBack: Locator;
      nextStep: Locator;
    };
    const addOns = [
      {
        name: "Online service",
        description: "Access to multiplayer games",
        price: {
          monthly: 1,
          yearly: 10,
        },
      },
      {
        name: "Larger storage",
        description: "Extra 1TB of cloud save",
        price: {
          monthly: 2,
          yearly: 20,
        },
      },
      {
        name: "Customizable profile",
        description: "Custom theme on your profile",
        price: {
          monthly: 2,
          yearly: 20,
        },
      },
    ] as const;
    let step3Form: {
      labels: Locator[];
      goBack: Locator;
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
      expect(page.url()).toContain("?step=1");
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
        await fillPersonalInfo(page, "     ", "invalid email", "invalid phone");
        await step1Form.nextStep.click();
        await expectAllVisible(
          form.getByText("This field is required"),
          form.getByText("Email invalid"),
          form.getByText("Invalid Number!"),
        );
      });
      test("can handle valid inputs", async () => {
        await page.reload();
        await fillPersonalInfo(
          page,
          "Valid Name",
          "email@example.com",
          "+12345678",
        );
        await step1Form.nextStep.click();
        expect(page.url()).toContain("?step=2");
        await expect(
          form.getByRole("heading", { name: "Personal info" }),
        ).not.toBeVisible();
        await expectHeadingVisible(form, "Select your plan");
      });
    });

    test.describe("step 2 form is working", () => {
      test("has all elements", async () => {
        expect(page.url()).toContain("?step=2");
        await expectHeadingVisible(form, "Select your plan");
        await expect(
          form.getByText("You have the option of monthly or yearly billing."),
        ).toBeVisible();
        const labels: Locator[] = [];
        for (const plan of plans) {
          const label = form.locator("label", {
            has: page.getByRole("heading", { name: plan }),
          });
          labels.push(label);
          await expect(label).toBeVisible();
        }
        const toggle = form.getByText("MonthlyYearly");
        const nextStep = form.getByRole("button", { name: "Next Step" });
        const goBack = form.getByRole("link", { name: "Go Back" });
        await expectAllVisible(toggle.getByRole("button"), goBack, nextStep);
        step2Form = { toggle, goBack, nextStep, labels };
      });
      test("can change default selected option", async () => {
        for (const [index, label] of Object.entries(step2Form.labels)) {
          const div = label.locator(">div");
          if (index !== "0")
            await expect(div).toHaveCSS(
              "border-bottom-color",
              "rgb(229, 231, 235)",
            );
          await label.click();
          await expect(div).toHaveCSS(
            "border-bottom-color",
            "rgb(71, 61, 255)",
          );
        }
        await expect(
          step2Form.toggle.getByText("Monthly", { exact: true }),
        ).toHaveCSS("color", "rgb(2, 41, 90)");
        await expect(
          step2Form.toggle.getByText("Yearly", { exact: true }),
        ).toHaveCSS("color", "rgb(150, 153, 171)");
        await step2Form.toggle.getByRole("button").click();
        await expect(
          step2Form.toggle.getByText("Yearly", { exact: true }),
        ).toHaveCSS("color", "rgb(2, 41, 90)");
        await expect(
          step2Form.toggle.getByText("Monthly", { exact: true }),
        ).toHaveCSS("color", "rgb(150, 153, 171)");
      });
      test("can go back to previous step", async () => {
        await step2Form.goBack.click();
        expect(page.url()).toContain("?step=1");
        for (const loc of Object.values(step1Form)) {
          await expect(loc).toBeVisible();
        }
        await expect(step1Form.name).toHaveValue("Valid Name");
        await expect(step1Form.email).toHaveValue("email@example.com");
        await expect(step1Form.phone).toHaveValue("+12345678");
        await step1Form.nextStep.click();
        await expectHeadingVisible(form, "Select your plan");
      });
      test("can go to step 3", async () => {
        await step2Form.labels[2].click();
        await step2Form.toggle.getByRole("button").click();
        await expect(
          step2Form.toggle.getByText("Monthly", { exact: true }),
        ).toHaveCSS("color", "rgb(2, 41, 90)");
        await step2Form.nextStep.click();
        expect(page.url()).toContain("?step=3");
        await expectHeadingVisible(form, "Pick add-ons");
      });
    });

    test.describe("step 3 form is working", () => {
      test("has all elements", async () => {
        expect(page.url()).toContain("?step=3");
        await expectHeadingVisible(form, "Pick add-ons");
        await expect(
          form.getByText("Add-ons help enhance your gaming experience."),
        ).toBeVisible();
        const labels: Locator[] = [];
        for (const addOn of addOns) {
          const heading = page.getByRole("heading", {
            name: addOn.name,
            level: 3,
          });
          await expect(heading).toBeVisible();
          const label = form.locator("label", { has: heading });
          labels.push(label);
          await expect(label).toBeVisible();
          await expect(label.locator("input")).toBeAttached();
          await expect(label.locator("input")).toBeHidden();
          await expect(label.getByText(addOn.description)).toBeVisible();
          await expect(
            label.getByText(`$${addOn.price.monthly}/mo`),
          ).toBeVisible();
        }
        const nextStep = form.getByRole("button", { name: "Next Step" });
        const goBack = form.getByRole("link", { name: "Go Back" });
        await expectAllVisible(goBack, nextStep);
        step3Form = { goBack, nextStep, labels };
      });
      test("can toggle all checkboxes", async () => {
        for (const label of step3Form.labels) {
          const input = label.locator(">input");
          await expect(input).not.toBeChecked();
          await label.click();
          await expect(input).toBeChecked();
          await label.click();
          await expect(input).not.toBeChecked();
        }
      });
      test("can go back to previous step", async () => {
        await step3Form.goBack.click();
        expect(page.url()).toContain("?step=2");
        await expectHeadingVisible(form, "Select your plan");
        for (const loc of Object.values(step2Form)) {
          if (Array.isArray(loc)) {
            for (const lc of loc) await expect(lc).toBeVisible();
          } else {
            await expect(loc).toBeVisible();
          }
        }
        await expect(
          step2Form.toggle.getByText("Monthly", { exact: true }),
        ).toHaveCSS("color", "rgb(2, 41, 90)");
        await expect(step2Form.labels[2].locator(">div")).toHaveCSS(
          "border-bottom-color",
          "rgb(71, 61, 255)",
        );
        await step2Form.nextStep.click();
        expect(page.url()).toContain("?step=3");
        await expectHeadingVisible(form, "Pick add-ons");
      });
      test("can go to step 4", async () => {
        await step3Form.labels[0].click();
        await step3Form.labels[1].click();
        await step2Form.nextStep.click();
        expect(page.url()).toContain("?step=4");
        await expectHeadingVisible(form, "Finishing up");
      });
    });

    test.describe("step 4 form is working", () => {
      test("has all elements", async () => {
        expect(page.url()).toContain("?step=4");
        await expectHeadingVisible(form, "Finishing up");
        await expectAllVisible(
          form.getByText("Double-check everything looks OK before confirming."),
          form.getByText("Pro (Monthly)"),
          form.getByRole("link", { name: "Change" }),
          form.getByText("$15/mo"),
          form.getByText("Online service"),
          form.getByText("+$1/mo"),
          form.getByText("Larger storage"),
          form.getByText("+$2/mo"),
          form.getByText("Total (per month)"),
          form.getByText("+$18/mo"),
          form.getByRole("button", { name: "Confirm" }),
          form.getByRole("link", { name: "Go Back" }),
        );
      });
      test("change button/link works", async () => {
        const link = page.getByRole("link", { name: "Change" });
        await link.click();
        expect(page.url()).toContain("?step=2");
        await expectHeadingVisible(form, "Select your plan");
        for (const loc of Object.values(step2Form)) {
          if (Array.isArray(loc)) {
            await expectAllVisible(...loc);
          } else {
            await expect(loc).toBeVisible();
          }
        }
        await expect(
          step2Form.toggle.getByText("Monthly", { exact: true }),
        ).toHaveCSS("color", "rgb(2, 41, 90)");
        await expect(step2Form.labels[2].locator(">div")).toHaveCSS(
          "border-bottom-color",
          "rgb(71, 61, 255)",
        );
        await goToStep(page, 4);
        expect(page.url()).toContain("?step=4");
        await expectHeadingVisible(form, "Finishing up");
      });
      test("can go back to previous step", async () => {
        await form.getByRole("link", { name: "Go Back" }).click();
        expect(page.url()).toContain("?step=3");
        await expectHeadingVisible(form, "Pick add-ons");
        await expect(step3Form.labels[0].locator(">input")).toBeChecked();
        await expect(step3Form.labels[1].locator(">input")).toBeChecked();
        await expect(step3Form.labels[2].locator(">input")).not.toBeChecked();
        await step3Form.nextStep.click();
        expect(page.url()).toContain("?step=4");
        await expectHeadingVisible(form, "Finishing up");
      });
    });

    test.describe("payment type affect prices", () => {
      test("payment type affect plan price", async () => {
        const link = form.getByRole("link", { name: "Change" });
        await link.click();
        expect(page.url()).toContain("?step=2");
        await expectHeadingVisible(form, "Select your plan");
        const planPriceEntries = Object.entries(planPrice) as [
          (typeof plans)[number],
          number,
        ][];
        for (const [plan, price] of planPriceEntries) {
          const label = form.locator("label", {
            has: page.getByRole("heading", { name: plan }),
          });
          await expect(label.getByText(`$${price}/mo`)).toBeVisible();
        }
        await step2Form.toggle.getByRole("button").click();
        for (const [plan, price] of planPriceEntries) {
          const label = form.locator("label", {
            has: page.getByRole("heading", { name: plan }),
          });
          await expect(label.getByText(`$${price}0/yr`)).toBeVisible();
          await expect(label.getByText("2 months free")).toBeVisible();
        }
      });
      test("payment type affect add-on price", async () => {
        await step2Form.nextStep.click();
        expect(page.url()).toContain("?step=3");
        await expectHeadingVisible(form, "Pick add-ons");
        for (const addOn of addOns) {
          const heading = page.getByRole("heading", {
            name: addOn.name,
            level: 3,
          });
          await expect(heading).toBeVisible();
          const label = form.locator("label", { has: heading });
          await expect(
            label.getByText(`+$${addOn.price.yearly}/yr`),
          ).toBeVisible();
        }
      });
      test("summary updated", async () => {
        await step3Form.nextStep.click();
        expect(page.url()).toContain("?step=4");
        await expectHeadingVisible(form, "Finishing up");
        await expectAllVisible(
          form.getByText("Pro (Yearly)"),
          form.getByRole("link", { name: "Change" }),
          form.getByText("$150/yr"),
          form.getByText("Online service"),
          form.getByText("+$10/yr"),
          form.getByText("Larger storage"),
          form.getByText("+$20/yr"),
          form.getByText("Total (per year)"),
          form.getByText("+$180/yr"),
        );
      });
    });

    test.describe("can submit data", () => {
      test("thank you card is visible", async () => {
        await form.getByRole("button", { name: "Confirm" }).click();
        expect(page.url()).toContain("?step=4&completed=1");
        await expectAllVisible(
          page.getByRole("img", { name: "Thank You Illustration" }),
          page.getByRole("heading", { name: "Thank you!" }),
          page.getByText(
            "Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.",
          ),
        );
      });
    });
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
});
