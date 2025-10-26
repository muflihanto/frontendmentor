import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import raw_data from "../public/interactive-comments-section/data.json";

interface User {
  image: { png: string; webp: string };
  username: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Comment[];
}

function flattenComments(rootComment: Comment[]): Comment[] {
  let stack: Comment[] = [...rootComment];
  const flattened: Comment[] = [];

  while (stack.length > 0) {
    // biome-ignore lint/style/noNonNullAssertion: Stack length check guarantees pop() will not return undefined
    const comment = stack.pop()!;
    flattened.push({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      score: comment.score,
      user: {
        image: {
          png: comment.user.image.png,
          webp: comment.user.image.webp,
        },
        username: comment.user.username,
      },
      replies: [],
    });

    if (comment.replies !== undefined) {
      for (let i = comment.replies.length - 1; i >= 0; i--) {
        stack.push(comment.replies[i]);
      }
    }
  }

  stack = [];
  return flattened;
}

const comments = flattenComments(raw_data.comments as unknown as Comment[]);

test.describe("FrontendMentor Challenge - Interactive comments section Page", () => {
  /** Go to Interactive comments section page before each test */
  test.beforeEach("Open", async ({ page }) => {
    await page.goto("/interactive-comments-section");
  });

  /** Test if the page has a correct title */
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Frontend Mentor | Interactive comments section",
    );
  });

  /** Test if the page has an 'Add a comment' form */
  test.describe("has an 'Add a comment' form", () => {
    test("has all elements", async ({ page }) => {
      const form = page.locator("form");
      await expect(
        form.getByRole("img", { name: "juliusomo Avatar" }),
      ).toBeVisible();
      await expect(form.getByPlaceholder("Add a comment...")).toBeVisible();
      await expect(form.getByRole("button", { name: "Send" })).toBeVisible();
    });
  });

  /** Test if the page has comments */
  test("has all comments", async ({ page }) => {
    const currentUser = raw_data.currentUser.username;
    for (const comment of comments) {
      const article = page.getByRole("article", {
        name: `Comment by ${comment.user.username}`,
      });
      await expect(article).toBeVisible();
      await expect(
        article.getByRole("img", { name: `${comment.user.username}'s avatar` }),
      ).toBeVisible();
      await expect(
        article.getByRole("heading", {
          name: `Comment by ${comment.user.username}`,
        }),
      ).toBeVisible();
      await expect(
        article.locator(`id=comment${comment.id}-author`),
      ).toBeVisible();
      await expect(
        article.locator(`id=comment${comment.id}-time`),
      ).toBeVisible();
      await expect(article.getByText(comment.content)).toBeVisible();
      if (comment.user.username === currentUser) {
        await expect(article.getByLabel("Delete my comment")).toBeVisible();
        await expect(
          article.getByRole("button", { name: "Edit" }),
        ).toBeVisible();
      } else {
        await expect(
          article.getByRole("button", { name: "Reply to comment" }),
        ).toBeVisible();
      }
      await expect(
        article.getByRole("button", { name: "Upvote comment" }),
      ).toBeVisible();
      await expect(article.getByLabel(`${comment.score} votes`)).toBeVisible();
      await expect(
        article.getByRole("button", { name: "Downvote comment" }),
      ).toBeVisible();
    }
  });

  /** Test comment voting functionality */
  test.describe("comment voting", () => {
    test("can upvote a comment", async ({ page }) => {
      const comment = comments[0];
      const voteButton = page
        .getByRole("article", { name: `Comment by ${comment.user.username}` })
        .getByRole("button", { name: "Upvote comment" });

      await voteButton.click();
      const scoreElement = page.locator(`id=comment${comment.id}-votes`);
      await expect(scoreElement).toHaveText(String(comment.score + 1));
    });

    test("can downvote a comment", async ({ page }) => {
      const comment = comments[0];
      const voteButton = page
        .getByRole("article", { name: `Comment by ${comment.user.username}` })
        .getByRole("button", { name: "Downvote comment" });

      await voteButton.click();
      const scoreElement = page.locator(`id=comment${comment.id}-votes`);
      await expect(scoreElement).toHaveText(String(comment.score - 1));
    });

    test("vote buttons have proper aria-labels", async ({ page }) => {
      const comment = comments[0];
      const article = page.getByRole("article", {
        name: `Comment by ${comment.user.username}`,
      });
      const scoreElement = page.locator(`id=comment${comment.id}-votes`);

      const upvoteButton = article.getByRole("button", {
        name: "Upvote comment",
      });
      const downvoteButton = article.getByRole("button", {
        name: "Downvote comment",
      });

      await expect(upvoteButton).toHaveAttribute(
        "aria-label",
        "Upvote comment",
      );
      await expect(downvoteButton).toHaveAttribute(
        "aria-label",
        "Downvote comment",
      );
      await expect(scoreElement).toHaveAttribute(
        "aria-label",
        `${comment.score} votes`,
      );
      await expect(upvoteButton).toHaveAttribute("aria-pressed", "false");
      await expect(downvoteButton).toHaveAttribute("aria-pressed", "false");

      await upvoteButton.click();
      await expect(upvoteButton).toHaveAttribute("aria-pressed", "true");
      await expect(downvoteButton).toHaveAttribute("aria-pressed", "false");
      await expect(scoreElement).toHaveText(String(comment.score + 1));

      await downvoteButton.click();
      await expect(downvoteButton).toHaveAttribute("aria-pressed", "true");
      await expect(upvoteButton).toHaveAttribute("aria-pressed", "false");
      await expect(scoreElement).toHaveText(String(comment.score - 1));
    });
  });

  /** Test comment submission */
  test.describe("comment submission", () => {
    test("can submit valid comment without validation errors", async ({
      page,
    }) => {
      const form = page.locator("form").first();
      const textarea = form.getByPlaceholder("Add a comment...");
      const submitButton = form.getByRole("button", { name: "Send" });

      const getMyComments = async () =>
        await page.getByText("juliusomoyou").all();

      const initialLength = (await getMyComments()).length;

      await textarea.fill("This is a valid comment");
      await submitButton.click();

      // Should not show validation errors
      await expect(page.getByText("Cannot be empty")).not.toBeVisible();
      await expect(
        page.getByText("Cannot be only whitespace"),
      ).not.toBeVisible();

      // Comment should be added
      const updatedLength = (await getMyComments()).length;
      expect(updatedLength).toBeGreaterThan(initialLength);
    });

    test("new comment has current user's avatar and username", async ({
      page,
    }) => {
      const form = page.locator("form").first();
      const textarea = form.getByPlaceholder("Add a comment...");
      const submitButton = form.getByRole("button", { name: "Send" });

      const content = "Test comment with user info";

      await textarea.fill(content);
      await submitButton.click();

      const newComment = page.locator("article", { hasText: content });

      // Check that the new comment has the current user's info
      await expect(
        newComment.locator("p", { hasText: "juliusomo" }),
      ).toBeVisible();
      await expect(newComment.getByAltText("juliusomo's avatar")).toBeVisible();
    });

    test("cannot submit empty comment", async ({ page }) => {
      const form = page.locator("form").first();
      const textarea = form.getByPlaceholder("Add a comment...");
      const submitButton = form.getByRole("button", { name: "Send" });

      const getMyComments = async () =>
        await page.getByText("juliusomoyou").all();

      const initialLength = (await getMyComments()).length;

      await textarea.fill("");
      await submitButton.click();

      const updatedLength = (await getMyComments()).length;
      expect(initialLength).toEqual(updatedLength);

      await expect(form.getByText("Cannot be empty")).toBeVisible();
      await expect(textarea).toHaveAttribute("aria-invalid", "true");
    });

    test("cannot submit whitespace-only comment", async ({ page }) => {
      const form = page.locator("form").first();
      const textarea = form.getByPlaceholder("Add a comment...");
      const submitButton = form.getByRole("button", { name: "Send" });

      const getMyComments = async () =>
        await page.getByText("juliusomoyou").all();

      const initialLength = (await getMyComments()).length;

      await textarea.fill("   ");
      await submitButton.click();

      const updatedLength = (await getMyComments()).length;
      expect(initialLength).toEqual(updatedLength);

      await expect(page.getByText("Cannot be only whitespace")).toBeVisible();
      await expect(textarea).toHaveAttribute("aria-invalid", "true");
    });

    test("validation error clears when valid content is entered and submitted", async ({
      page,
    }) => {
      const form = page.locator("form").first();
      const textarea = form.getByPlaceholder("Add a comment...");
      const submitButton = form.getByRole("button", { name: "Send" });

      // Trigger error by submitting whitespace
      await textarea.fill("   ");
      await submitButton.click();
      await expect(page.getByText("Cannot be only whitespace")).toBeVisible();

      // Enter valid content and submit successfully
      await textarea.fill("Valid comment");
      await submitButton.click();

      // Error should clear and form should submit
      await expect(
        page.getByText("Cannot be only whitespace"),
      ).not.toBeVisible();
      await expect(textarea).toHaveAttribute("aria-invalid", "false");
    });
  });

  /** Test reply functionality */
  test.describe("reply functionality", () => {
    test("can open reply form", async ({ page }) => {
      const comment = comments.find(
        (c) => c.user.username !== raw_data.currentUser.username,
      );
      if (!comment) return;

      const replyButton = page
        .getByRole("article", { name: `Comment by ${comment.user.username}` })
        .getByRole("button", { name: "Reply to comment" });

      await replyButton.click();
      await expect(
        page.getByPlaceholder("Add a comment...").nth(1),
      ).toBeVisible();
    });

    test("reply form has correct user avatar", async ({ page }) => {
      const comment = comments.find(
        (c) => c.user.username !== raw_data.currentUser.username,
      );
      if (!comment) return;

      const replyButton = page
        .getByRole("article", { name: `Comment by ${comment.user.username}` })
        .getByRole("button", { name: "Reply to comment" });

      await replyButton.click();

      const replyForm = page.locator("form").filter({ hasText: "Reply" });
      await expect(
        replyForm.getByRole("img", { name: "juliusomo Avatar" }),
      ).toBeVisible();
    });

    test("can submit a reply", async ({ page }) => {
      const comment = comments.find(
        (c) => c.user.username !== raw_data.currentUser.username,
      );
      if (!comment) return;

      const replyButton = page
        .getByRole("article", { name: `Comment by ${comment.user.username}` })
        .getByRole("button", { name: "Reply to comment" });

      await replyButton.click();

      const replyForm = page.locator("form").filter({ hasText: "Reply" });
      const textarea = replyForm.getByPlaceholder("Add a comment...");
      const submitButton = replyForm.getByRole("button", {
        name: "Reply",
        exact: true,
      });

      await textarea.fill(`@${comment.user.username} This is a test reply`);
      await submitButton.click();

      await expect(
        page.getByText(`@${comment.user.username} This is a test reply`),
      ).toBeVisible();
    });

    test("reply form closes after submission", async ({ page }) => {
      const comment = comments.find(
        (c) => c.user.username !== raw_data.currentUser.username,
      );
      if (!comment) return;

      const replyButton = page
        .getByRole("article", { name: `Comment by ${comment.user.username}` })
        .getByRole("button", { name: "Reply to comment" });

      await replyButton.click();

      const replyForm = page.locator("form").filter({ hasText: "Reply" });
      const textarea = replyForm.getByPlaceholder("Add a comment...");
      const submitButton = replyForm.getByRole("button", {
        name: "Reply",
        exact: true,
      });

      await textarea.fill("Test reply");
      await submitButton.click();

      // Reply form should no longer be visible
      await expect(replyForm).not.toBeVisible();
    });
  });

  /** Test comment editing */
  test.describe("comment editing", () => {
    test("can edit own comment", async ({ page }) => {
      const comment = comments.find(
        (c) => c.user.username === raw_data.currentUser.username,
      );
      if (!comment) return;

      const editButton = page
        .getByRole("article", { name: `Comment by ${comment.user.username}` })
        .getByRole("button", { name: "Edit" });

      await editButton.click();

      const editForm = page.locator("form").first();
      const textarea = editForm.getByPlaceholder("Add a comment...");
      const submitButton = editForm.getByRole("button", { name: "Update" });

      await textarea.fill("@ramsesmiron This is an edited comment");
      await submitButton.click();

      await expect(
        page.getByText("@ramsesmiron This is an edited comment"),
      ).toBeVisible();
    });

    test("can cancel editing", async ({ page }) => {
      const comment = comments.find(
        (c) => c.user.username === raw_data.currentUser.username,
      );
      if (!comment) return;

      const originalContent = comment.content;

      const editToggleButton = page
        .getByRole("article", { name: `Comment by ${comment.user.username}` })
        .getByRole("button", { name: "Edit" });

      await editToggleButton.click();

      const editForm = page.locator("form").first();
      const textarea = editForm.getByPlaceholder("Add a comment...");

      await textarea.fill("This edit will be cancelled");
      await editToggleButton.click();

      // Content should remain unchanged
      await expect(page.getByText(originalContent)).toBeVisible();
      await expect(
        page.getByText("This edit will be cancelled"),
      ).not.toBeVisible();
    });

    test("shows validation error for empty edit after submission attempt", async ({
      page,
    }) => {
      const comment = comments.find(
        (c) => c.user.username === raw_data.currentUser.username,
      );
      if (!comment) return;

      const editButton = page
        .getByRole("article", { name: `Comment by ${comment.user.username}` })
        .getByRole("button", { name: "Edit" });

      await editButton.click();

      const editForm = page.locator("form").first();
      const textarea = editForm.getByPlaceholder("Add a comment...");
      const updateButton = editForm.getByRole("button", { name: "Update" });

      // Clear content and try to submit
      await textarea.fill("");
      await updateButton.click();

      // Check for validation error after submission attempt
      await expect(page.getByText("Cannot be empty")).toBeVisible();
      await expect(textarea).toHaveAttribute("aria-invalid", "true");
    });

    test("shows validation error for whitespace-only edit after submission attempt", async ({
      page,
    }) => {
      const comment = comments.find(
        (c) => c.user.username === raw_data.currentUser.username,
      );
      if (!comment) return;

      const editButton = page
        .getByRole("article", { name: `Comment by ${comment.user.username}` })
        .getByRole("button", { name: "Edit" });

      await editButton.click();

      const editForm = page.locator("form").first();
      const textarea = editForm.getByPlaceholder("Add a comment...");
      const updateButton = editForm.getByRole("button", { name: "Update" });

      await textarea.fill("   ");
      await updateButton.click();

      // Check for validation error after submission attempt
      await expect(page.getByText("Cannot be only whitespace")).toBeVisible();
      await expect(textarea).toHaveAttribute("aria-invalid", "true");
    });

    test("validation error clears when valid content is entered and submitted in edit form", async ({
      page,
    }) => {
      const comment = comments.find(
        (c) => c.user.username === raw_data.currentUser.username,
      );
      if (!comment) return;

      const editButton = page
        .getByRole("article", { name: `Comment by ${comment.user.username}` })
        .getByRole("button", { name: "Edit" });

      await editButton.click();

      const editForm = page.locator("form").first();
      const textarea = editForm.getByPlaceholder("Add a comment...");
      const updateButton = editForm.getByRole("button", { name: "Update" });

      // Trigger error by submitting whitespace
      await textarea.fill("   ");
      await updateButton.click();
      await expect(page.getByText("Cannot be only whitespace")).toBeVisible();

      // Enter valid content and submit successfully
      await textarea.fill("This is an edited comment");
      await updateButton.click();

      // Error should clear and form should submit
      await expect(
        page.getByText("Cannot be only whitespace"),
      ).not.toBeVisible();
    });
  });

  /** Test comment deletion */
  test.describe("comment deletion", () => {
    test("can delete own comment", async ({ page }) => {
      const comment = comments.find(
        (c) => c.user.username === raw_data.currentUser.username,
      );
      if (!comment) return;

      const deleteButton = page
        .getByRole("article", { name: `Comment by ${comment.user.username}` })
        .getByLabel("Delete my comment");

      await deleteButton.click();

      await expect(page.getByText("Delete comment")).toBeVisible();

      const confirmButton = page.getByRole("button", { name: "Yes, delete" });
      await confirmButton.click();

      await expect(
        page.getByRole("article", {
          name: `Comment by ${comment.user.username}`,
        }),
      ).not.toBeVisible();
    });

    test("delete modal has proper buttons", async ({ page }) => {
      const comment = comments.find(
        (c) => c.user.username === raw_data.currentUser.username,
      );
      if (!comment) return;

      const deleteButton = page
        .getByRole("article", { name: `Comment by ${comment.user.username}` })
        .getByLabel("Delete my comment");

      await deleteButton.click();

      await expect(
        page.getByRole("button", { name: "Yes, delete" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "No, cancel" }),
      ).toBeVisible();
    });

    test("can cancel deletion", async ({ page }) => {
      const comment = comments.find(
        (c) => c.user.username === raw_data.currentUser.username,
      );
      if (!comment) return;

      const deleteButton = page
        .getByRole("article", { name: `Comment by ${comment.user.username}` })
        .getByLabel("Delete my comment");

      await deleteButton.click();

      await expect(page.getByText("Delete comment")).toBeVisible();

      const cancelButton = page.getByRole("button", { name: "No, cancel" });
      await cancelButton.click();

      // Comment should still be visible
      await expect(
        page.getByRole("article", {
          name: `Comment by ${comment.user.username}`,
        }),
      ).toBeVisible();
    });
  });

  test("only current user can see edit and delete buttons", async ({
    page,
  }) => {
    const currentUser = raw_data.currentUser.username;

    for (const comment of comments) {
      const article = page.getByRole("article", {
        name: `Comment by ${comment.user.username}`,
      });

      if (comment.user.username === currentUser) {
        await expect(article.getByLabel("Delete my comment")).toBeVisible();
        await expect(
          article.getByRole("button", { name: "Edit" }),
        ).toBeVisible();
        await expect(
          article.getByRole("button", { name: "Reply to comment" }),
        ).not.toBeVisible();
      } else {
        await expect(article.getByLabel("Delete my comment")).not.toBeVisible();
        await expect(
          article.getByRole("button", { name: "Edit" }),
        ).not.toBeVisible();
        await expect(
          article.getByRole("button", { name: "Reply to comment" }),
        ).toBeVisible();
      }
    }
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
});
