import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("FrontendMentor Challenge - QR code component Page", () => {
  /** Go to QR code component page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/qr-code-component");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | QR code component");
  });

  /** Test if the page has a correct heading */
  test("has a heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Improve your front-end skills by building projects",
      }),
    ).toBeVisible();
  });

  /** Test if the page has correct QR code image */
  test("has a QR code image", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "QR code Image" }),
    ).toBeVisible();
  });

  /** Test if the page has body text */
  test("has body text", async ({ page }) => {
    await expect(
      page.getByText(
        "Scan the QR code to visit Frontend Mentor and take your coding skills to the nex",
      ),
    ).toBeVisible();
  });

  /** Test if the page has correct footer */
  test("has correct footer", async ({ page }) => {
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
});
