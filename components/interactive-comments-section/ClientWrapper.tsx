import { zodResolver } from "@hookform/resolvers/zod";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useOnClickOutside } from "usehooks-ts";
import type { z } from "zod";
import {
  type Comment,
  type Reply,
  type User,
  zEdit,
  zNewComment,
  zNewReply,
} from "../../pages/interactive-comments-section";
import rawData from "../../public/interactive-comments-section/data.json";
import dayjs from "../../utils/dayjs";

const unit = ["month", "week", "day"] as const;

const transformDate = (data: typeof rawData) => {
  const { comments } = data;
  const dates: [number, (typeof unit)[number]][] = [
    [1, "month"],
    [2, "week"],
    [1, "week"],
    [2, "day"],
  ];
  const formatDate = (dat: Comment[] | Reply[]) => {
    for (const c of dat) {
      c.createdAt = dayjs()
        .subtract(dates[c.id - 1][0], dates[c.id - 1][1])
        .format();
      if (!!c.replies && c.replies.length > 0) {
        formatDate(c.replies);
      }
    }
  };
  formatDate(comments);
  return { ...data, comments };
};
const getVotes = () => {
  const obj: Record<string, "up" | "down" | null> = {};
  function getId(input: Comment[] | Reply[]) {
    for (const data of input) {
      obj[`id${data.id}`] = null;
      if (data.replies !== undefined) {
        getId(data.replies);
      }
    }
  }
  getId(rawData.comments);
  return obj;
};
const getLatestId = () => {
  let latestId = Number.NaN;
  function getId(input: Comment[] | Reply[]) {
    for (const data of input) {
      if (!latestId || data.id > latestId) {
        latestId = data.id;
      }
      if (data.replies !== undefined) {
        getId(data.replies);
      }
    }
  }
  getId(rawData.comments);
  return latestId;
};

const dataAtom = atomWithStorage<{ currentUser: User; comments: Comment[] }>(
  "data",
  transformDate(rawData),
);
const voteAtom = atomWithStorage<Record<string, "up" | "down" | null>>(
  "vote",
  getVotes(),
);
const latestIdAtom = atomWithStorage<number>("id", getLatestId());
const idToDeleteAtom = atom<number | null>(null);

export default function Main() {
  const [data, setData] = useAtom(dataAtom);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const setIdToDelete = useSetAtom(idToDeleteAtom);

  const update = useCallback(
    (
      id: number,
      data: Comment[] | Reply[],
      type: "increment" | "decrement",
    ) => {
      for (const comment of data) {
        if (comment.id === id) {
          comment.score = comment.score + (type === "increment" ? 1 : -1);
        } else if (comment.replies !== undefined) {
          update(id, comment.replies, type);
        }
      }
    },
    [],
  );

  const handleUpdate = useCallback(
    (id: number, type: "increment" | "decrement") => {
      setData((prev) => {
        const { currentUser, comments } = prev;
        update(id, comments, type);
        return { currentUser, comments };
      });
    },
    [setData, update],
  );

  const renderReplies = (replies: Reply[], parent = true) => {
    if (replies.length > 0)
      return (
        <div
          className={`flex flex-col gap-4 border-l-2 border-l-interactive-comment-neutral-300 pl-4 lg:ml-[44px] lg:gap-6 lg:pl-[42px] ${
            parent && "mt-4 lg:mt-5"
          }`}
        >
          {replies.map((reply) => {
            return (
              <div key={reply.id}>
                <Card
                  currentUser={data.currentUser}
                  data={reply}
                  handleUpdate={handleUpdate}
                  variant="reply"
                  openDeleteModal={() => {
                    setDeleteModalOpen(true);
                  }}
                />
                {!!reply.replies && renderReplies(reply.replies, false)}
              </div>
            );
          })}
        </div>
      );
  };

  // useEffect(() => {
  //   console.log(latestId);
  // }, [latestId]);

  return (
    <main className="flex max-w-md flex-col items-center gap-4 px-4 py-8 lg:max-w-[764px] lg:gap-[20px] lg:py-16">
      <h1 className="sr-only">Interactive comments section</h1>

      {data.comments.map((comment) => {
        return (
          <div key={comment.id} className="w-full">
            <Card
              currentUser={data.currentUser}
              data={comment}
              handleUpdate={handleUpdate}
              variant="comment"
              openDeleteModal={() => {
                setDeleteModalOpen(true);
              }}
            />
            {!!comment.replies && renderReplies(comment.replies)}
          </div>
        );
      })}

      <NewEntryForm />

      {deleteModalOpen && (
        <DeleteModal
          close={() => {
            setIdToDelete(null);
            setDeleteModalOpen(false);
          }}
        />
      )}
    </main>
  );
}

function Card({
  data,
  currentUser,
  variant,
  handleUpdate,
  openDeleteModal,
}: {
  data: Comment | Reply;
  currentUser: User;
  variant: "comment" | "reply";
  handleUpdate: (id: number, type: "increment" | "decrement") => void;
  openDeleteModal: () => void;
}) {
  const [vote, setVote] = useAtom(voteAtom);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const setIdToDelete = useSetAtom(idToDeleteAtom);

  return (
    <>
      <article
        className={`min-h-[150px] rounded-lg bg-interactive-comment-neutral-100 p-4 pr-5 lg:relative lg:pb-2 lg:pl-[89px] lg:pt-6 ${
          variant === "reply" ? "break-words lg:pr-[16px]" : "lg:pr-[40px]"
        }`}
        aria-labelledby={`comment${data.id}-heading`}
        aria-describedby={`comment${data.id}-author comment${data.id}-time comment${data.id}-votes`}
      >
        <div className="flex items-center gap-4">
          <div className="relative h-8 w-8">
            <Image
              fill
              src={`/interactive-comments-section${data.user.image.webp.slice(
                1,
              )}`}
              alt={`${data.user.username}'s avatar`}
            />
          </div>
          <h2 className="sr-only" id={`comment${data.id}-heading`}>
            Comment by {data.user.username}
          </h2>
          <p
            className="pb-[2px] font-medium tracking-[.1px] text-interactive-comment-neutral-500"
            id={`comment${data.id}-author`}
          >
            {data.user.username}
            {currentUser.username === data.user.username && (
              <span className="relative z-10 ml-2 px-[6px] text-[13px] text-interactive-comment-neutral-100 before:absolute before:-top-[1px] before:left-0 before:z-[-1] before:h-[19px] before:w-full before:rounded-sm before:bg-interactive-comment-primary-blue-200 before:content-['']">
                you
              </span>
            )}
          </p>
          <p
            className="pb-[2px] text-interactive-comment-neutral-400"
            id={`comment${data.id}-time`}
          >
            {dayjs(data.createdAt).fromNow()}
          </p>
        </div>
        {isEditOpen ? (
          <EditForm
            id={data.id}
            data={data}
            variant={variant}
            toggle={() => {
              setIsEditOpen(false);
            }}
          />
        ) : (
          <p className="mt-[15px] text-interactive-comment-neutral-400 lg:mt-[14px]">
            {variant === "reply" && (
              <span className="font-medium text-interactive-comment-primary-blue-200">
                @{(data as Reply).replyingTo}{" "}
              </span>
            )}
            {data.content}
          </p>
        )}
        <div className="mt-[17px] flex items-center justify-between">
          <div
            className={`${
              vote[`id${data.id}`] !== null
                ? "bg-interactive-comment-neutral-300"
                : "bg-interactive-comment-neutral-200"
            } grid h-10 w-[100px] grid-cols-3 grid-rows-1 items-center justify-center rounded-xl px-1 pb-[2px] lg:absolute lg:left-[24px] lg:top-[24px] lg:h-[100px] lg:w-10 lg:grid-cols-1 lg:grid-rows-3`}
          >
            <button
              className={`text-[20px] font-medium hover:text-interactive-comment-primary-blue-200 lg:text-center ${
                vote[`id${data.id}`] === "up"
                  ? "text-interactive-comment-primary-blue-200"
                  : "text-interactive-comment-primary-blue-100"
              } `}
              onClick={() => {
                if (vote[`id${data.id}`] === "up") {
                  setVote((prev) => {
                    return { ...prev, [`id${data.id}`]: null };
                  });
                  handleUpdate(data.id, "decrement");
                } else {
                  setVote((prev) => {
                    return { ...prev, [`id${data.id}`]: "up" };
                  });
                  vote[`id${data.id}`] === "down" &&
                    handleUpdate(data.id, "increment");
                  handleUpdate(data.id, "increment");
                }
              }}
              type="button"
              aria-pressed={vote[`id${data.id}`] === "up"}
              aria-label="Upvote comment"
            >
              +
            </button>
            <output
              className="text-center text-[17px] font-medium text-interactive-comment-primary-blue-200"
              id={`comment${data.id}-votes`}
              aria-live="polite"
              aria-label={`${data.score} votes`}
            >
              {data.score}
            </output>
            <button
              className={`text-[16px] font-medium hover:text-interactive-comment-primary-blue-200 ${
                vote[`id${data.id}`] === "down"
                  ? "text-interactive-comment-primary-blue-200"
                  : "text-interactive-comment-primary-blue-100"
              }`}
              onClick={() => {
                if (vote[`id${data.id}`] === "down") {
                  setVote((prev) => {
                    return { ...prev, [`id${data.id}`]: null };
                  });
                  handleUpdate(data.id, "increment");
                } else {
                  setVote((prev) => {
                    return { ...prev, [`id${data.id}`]: "down" };
                  });
                  vote[`id${data.id}`] === "up" &&
                    handleUpdate(data.id, "decrement");
                  handleUpdate(data.id, "decrement");
                }
              }}
              type="button"
              aria-pressed={vote[`id${data.id}`] === "down"}
              aria-label="Downvote comment"
            >
              &mdash;
            </button>
          </div>
          <div className="flex gap-[6px] lg:absolute lg:right-[30px] lg:top-[24px] lg:h-8 lg:gap-[12px]">
            {currentUser.username === data.user.username ? (
              <>
                <button
                  className="mr-[8px] flex items-center gap-2 hover:opacity-40 active:opacity-60"
                  onClick={() => {
                    setIdToDelete(data.id);
                    openDeleteModal();
                  }}
                  type="button"
                  aria-label="Delete my comment"
                >
                  <svg viewBox="0 0 12 14" className="w-3" aria-hidden="true">
                    <use href="/interactive-comments-section/images/icon-delete.svg#icon-delete" />
                  </svg>
                  <span className="pb-[2px] font-medium text-interactive-comment-primary-red-200">
                    Delete
                  </span>
                </button>
                <button
                  className="flex translate-x-[3.25px] items-center gap-2 hover:opacity-40 active:opacity-60"
                  onClick={() => {
                    setIsEditOpen((p) => !p);
                  }}
                  type="button"
                >
                  <svg
                    viewBox="0 0 14 14"
                    className="w-[14px]"
                    aria-hidden="true"
                  >
                    <use href="/interactive-comments-section/images/icon-edit.svg#icon-edit" />
                  </svg>
                  <span className="pb-[3px] font-medium text-interactive-comment-primary-blue-200">
                    Edit
                  </span>
                </button>
              </>
            ) : (
              <button
                className="flex items-center gap-1 pb-[2px] hover:opacity-40 active:opacity-60"
                onClick={() => {
                  setIsReplyOpen((p) => !p);
                }}
                type="button"
                aria-label="Reply to comment"
              >
                <span>
                  <svg
                    viewBox="0 0 14 13"
                    className="h-[13px] translate-y-[1px]"
                    aria-hidden="true"
                  >
                    <use href="/interactive-comments-section/images/icon-reply.svg#icon-reply" />
                  </svg>
                </span>
                <span className="translate-x-[3px] font-medium text-interactive-comment-primary-blue-200">
                  Reply
                </span>
              </button>
            )}
          </div>
        </div>
      </article>
      {isReplyOpen && (
        <NewEntryForm
          variant="reply"
          replyingTo={data.user.username}
          parentId={data.id}
          toggle={() => {
            setIsReplyOpen((p) => !p);
          }}
        />
      )}
    </>
  );
}

function NewEntryForm({
  variant = "comment",
  replyingTo,
  parentId,
  toggle,
}: {
  variant?: "reply" | "comment";
  replyingTo?: string;
  parentId?: number;
  toggle?: () => void;
}) {
  const [data, setData] = useAtom(dataAtom);
  const [latestId, setLatestId] = useAtom(latestIdAtom);
  const schemas = {
    comment: zNewComment,
    reply: zNewReply,
  };

  const {
    register,
    formState: { isSubmitSuccessful },
    reset,
    handleSubmit,
    setFocus,
  } = useForm<z.infer<(typeof schemas)[typeof variant]>>({
    resolver: zodResolver(schemas[variant]),
  });

  const handleAddComment = handleSubmit((c) => {
    const newComment: Comment = {
      content: c.content,
      createdAt: dayjs().format(),
      id: latestId + 1,
      score: 0,
      user: data.currentUser,
      replies: [],
    };
    setData((prev) => {
      const { comments } = prev;
      return { ...prev, comments: [...comments, newComment] };
    });
    setLatestId((prev) => prev + 1);
    console.log({ newComment });
  });

  const handleReply = handleSubmit((c) => {
    const newReply: Reply = {
      content: c.content.split(" ").slice(1).join(" "),
      createdAt: dayjs().format(),
      id: latestId + 1,
      score: 0,
      user: data.currentUser,
      // biome-ignore lint/style/noNonNullAssertion: replyingTo is guaranteed by parent component validation
      replyingTo: replyingTo!,
      replies: [],
    };
    setData((prev) => {
      const { comments } = prev;
      const searchById = (data: Comment[] | Reply[], id: number) => {
        for (const dat of data) {
          if (dat.id === id) {
            if (dat.replies) {
              dat.replies.push(newReply);
            } else {
              dat.replies = [newReply];
            }
          } else {
            if (dat.replies) {
              searchById(dat.replies, id);
            }
          }
        }
      };
      // biome-ignore lint/style/noNonNullAssertion: parentId guaranteed by reply action flow
      searchById(comments, parentId!);
      return { ...prev, comments };
    });
    setLatestId((prev) => prev + 1);
    console.log({ newReply });
  });

  useEffect(() => {
    if (variant === "reply") {
      setFocus("content");
    }
  }, [setFocus, variant]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      if (typeof toggle === "function" && variant === "reply") toggle();
    }
  }, [variant, reset, isSubmitSuccessful, toggle]);

  return (
    <form
      className={`grid w-full grid-cols-2 grid-rows-[auto,auto] items-center gap-[16px] rounded bg-interactive-comment-neutral-100 p-4 pb-[14px] lg:flex lg:grid-cols-[auto,auto,auto] lg:grid-rows-1 lg:items-start lg:p-6 lg:pr-[25px] ${
        variant === "reply" && "mt-2"
      }`}
      onSubmit={(e) => {
        if (variant === "comment") {
          void handleAddComment(e);
        } else {
          void handleReply(e);
        }
      }}
    >
      <div className="relative col-start-1 row-start-2 aspect-square h-8 w-8 lg:mt-1 lg:h-10 lg:w-10">
        <Image
          fill
          alt={`${data.currentUser.username} Avatar`}
          src={`/interactive-comments-section${data.currentUser.image.webp.slice(
            1,
          )}`}
        />
      </div>
      <textarea
        {...register("content", {
          required: true,
          value: variant === "reply" ? `@${replyingTo} ` : "",
        })}
        className="col-span-2 col-start-1 row-start-1 h-24 w-full resize-none rounded border border-interactive-comment-neutral-300 bg-white px-[22px] py-[10px] text-interactive-comment-neutral-500 placeholder:font-medium focus:border-interactive-comment-neutral-500 focus-visible:outline focus-visible:outline-transparent lg:flex-1"
        placeholder="Add a comment..."
        required
      />
      {variant === "reply" && (
        <input
          type="hidden"
          {...register("replyingTo", { value: replyingTo })}
        />
      )}
      <button
        className="col-start-2 row-start-2 h-12 w-[104px] translate-y-[-1px] place-self-end rounded-lg bg-interactive-comment-primary-blue-200 pb-[2px] font-medium uppercase text-white hover:opacity-40 active:opacity-60 lg:mt-[1px] lg:self-start"
        type="submit"
      >
        {variant === "comment" ? "Send" : "Reply"}
      </button>
    </form>
  );
}

function EditForm({
  id,
  toggle,
  data,
  variant,
}: {
  id: number;
  toggle: () => void;
  data: Comment | Reply;
  variant?: "reply" | "comment";
}) {
  const setData = useSetAtom(dataAtom);
  const {
    register,
    formState: { isSubmitSuccessful },
    reset,
    handleSubmit,
    setFocus,
  } = useForm<z.infer<typeof zEdit>>({ resolver: zodResolver(zEdit) });

  // TODO: FIXME: handle user mention highlighting in reply
  const handleEdit = handleSubmit((c) => {
    const editedEntry: Pick<Comment, "content" | "createdAt"> = {
      content:
        variant === "comment"
          ? c.content
          : c.content.split(" ").slice(1).join(" "),
      createdAt: dayjs().format(),
    };
    setData((prev) => {
      const { comments } = prev;
      const searchById = (data: Comment[] | Reply[], id: number) => {
        data.forEach((dat, index) => {
          if (dat.id === id) {
            data[index] = { ...dat, ...editedEntry };
          } else {
            if (dat.replies) {
              searchById(dat.replies, id);
            }
          }
        });
      };
      searchById(comments, id);
      console.log({ editedEntry, comments, id });
      return { ...prev, comments };
    });
    // console.log({ editedEntry });
  });

  useEffect(() => {
    setFocus("content");
  }, [setFocus]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      toggle();
    }
  }, [reset, isSubmitSuccessful, toggle]);

  return (
    <form
      className={
        "mt-4 grid w-full grid-cols-2 grid-rows-[auto,auto] items-center gap-[16px] rounded bg-interactive-comment-neutral-100 pb-[14px] pr-[10px]"
      }
      onSubmit={handleEdit}
    >
      <textarea
        {...register("content", {
          required: true,
          value:
            variant === "comment"
              ? data.content
              : `@${(data as Reply).replyingTo} ${data.content}`,
        })}
        className="col-span-2 col-start-1 row-start-1 h-24 w-full resize-none rounded border border-interactive-comment-neutral-300 bg-white px-[22px] py-[10px] pr-[24px] text-interactive-comment-neutral-500 placeholder:font-medium focus:border-interactive-comment-neutral-500 focus-visible:outline focus-visible:outline-transparent lg:h-[124px]"
        placeholder="Add a comment..."
        required
      />
      <button
        className="col-start-2 row-start-2 h-12 w-[104px] translate-y-[-1px] place-self-end rounded-lg bg-interactive-comment-primary-blue-200 pb-[2px] font-medium uppercase text-white hover:opacity-40 active:opacity-60 lg:mt-[1px] lg:self-start"
        type="submit"
      >
        Update
      </button>
    </form>
  );
}

function DeleteModal({ close }: { close: () => void }) {
  const cardRef = useRef(null);
  const setData = useSetAtom(dataAtom);
  const idToDelete = useAtomValue(idToDeleteAtom);

  const deleteReply = useCallback((id: number, replies: Reply[]): Reply[] => {
    const reps = replies.filter((rep) => rep.id !== id);
    for (const rep of reps) {
      if (rep.replies && rep.replies.length > 0) {
        rep.replies = deleteReply(id, rep.replies);
      }
    }
    return reps;
  }, []);

  const handleDelete = useCallback(() => {
    if (idToDelete === null) return;

    setData((prev) => {
      const { currentUser, comments } = prev;

      // Filter out the comment to delete
      const filteredComments = comments.filter(
        (comment) => comment.id !== idToDelete,
      );

      // Process remaining comments to delete any nested replies
      for (const comment of filteredComments) {
        if (comment.replies && comment.replies.length > 0) {
          comment.replies = deleteReply(idToDelete, comment.replies);
        }
      }

      return { currentUser, comments: filteredComments };
    });

    close();
  }, [setData, idToDelete, close, deleteReply]);

  const handleCancel = useCallback(() => {
    close();
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useOnClickOutside(cardRef, handleCancel);

  return (
    <div className="fixed left-0 top-0 z-40 flex h-[100svh] w-screen flex-col items-center justify-center bg-black/50 px-4 pt-[2px] lg:pt-0">
      <div
        className="max-w-[400px] rounded-lg bg-white px-[27px] pb-[24px] pt-[21px] lg:px-[32px] lg:pb-[32px] lg:pt-[28px]"
        ref={cardRef}
      >
        <h2 className="text-[20px] font-medium text-interactive-comment-neutral-500 lg:text-[24px]">
          Delete comment
        </h2>
        <p className="mt-[12px] text-interactive-comment-neutral-400 lg:mt-[15px]">
          Are you sure you want to delete this comment? This will remove the
          comment and can{"'"}t be undone.
        </p>
        <div className="mt-[17px] grid h-[48px] grid-cols-2 grid-rows-1 gap-3 lg:mt-[21px] lg:gap-[14px]">
          <button
            className="rounded-lg bg-interactive-comment-neutral-400 pb-[2px] font-medium uppercase text-interactive-comment-neutral-100"
            onClick={handleCancel}
            type="button"
          >
            No, cancel
          </button>
          <button
            className="rounded-lg bg-interactive-comment-primary-red-200 pb-[2px] font-medium uppercase text-interactive-comment-neutral-100"
            onClick={handleDelete}
            type="button"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}
