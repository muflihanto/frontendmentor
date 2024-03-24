import { test, expect } from "@playwright/test";

const keys = [
  { key: "7", type: "number" },
  { key: "8", type: "number" },
  { key: "9", type: "number" },
  { key: "del", type: "del" },
  { key: "4", type: "number" },
  { key: "5", type: "number" },
  { key: "6", type: "number" },
  { key: "+", type: "operator" },
  { key: "1", type: "number" },
  { key: "2", type: "number" },
  { key: "3", type: "number" },
  { key: "-", type: "operator" },
  { key: ".", type: "dot" },
  { key: "0", type: "number" },
  { key: "/", type: "operator" },
  { key: "*", type: "operator" },
  { key: "reset", type: "reset" },
  { key: "=", type: "equal" },
] as const;

test.describe("FrontendMentor Challenge - Calculator app Page", () => {
  /** Go to Calculator app page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/calculator-app");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Frontend Mentor | Calculator app");
  });

  /** Test if the page has a header */
  test("has a header", async ({ page }) => {
    const header = page.locator("div").nth(4);
    await expect(header.getByText("calc")).toBeVisible();
    const switcher = header.locator(">div");
    await expect(switcher.getByText("theme")).toBeVisible();
    await expect(switcher.getByText("123", { exact: true })).toBeVisible();
    await expect(switcher.getByRole("button")).toBeVisible();
  });

  /** Test if the page has a footer */
  test("has a footer", async ({ page }) => {
    await expect(
      page.getByText("Challenge by Frontend Mentor. Coded by Muflihanto."),
    ).toBeVisible();
  });
});
