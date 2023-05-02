import rawData from "../../public/interactive-comments-section/data.json";
import { atomWithStorage } from "jotai/utils";
import { type User, type Comment, type Reply, zNewComment, zNewReply, zEdit } from "../../pages/interactive-comments-section";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dayjs from "../../utils/dayjs";
import { useOnClickOutside } from "usehooks-ts";

const transformDate = (data: typeof rawData) => {
  const { comments } = data;
  const dates: [number, any][] = [
    [1, "month"],
    [2, "week"],
    [1, "week"],
    [2, "day"],
  ];
  const formatDate = (dat: Comment[] | Reply[]) => {
    dat.forEach((c) => {
      c.createdAt = dayjs()
        .subtract(dates[c.id - 1][0], dates[c.id - 1][1])
        .format();
      if (!!c.replies && c.replies.length > 0) {
        formatDate(c.replies);
      }
    });
  };
  formatDate(comments);
  return { ...data, comments };
};
const getVotes = () => {
  let obj: { [x: string]: "up" | "down" | null } = {};
  function getId(input: Comment[] | Reply[]) {
    input.forEach((data) => {
      obj[`id${data.id}`] = null;
      if (!!data.replies) {
        getId(data.replies);
      }
    });
  }
  getId(rawData.comments);
  return obj;
};
const getLatestId = () => {
  let latestId: number = NaN;
  function getId(input: Comment[] | Reply[]) {
    input.forEach((data) => {
      if (!latestId || data.id > latestId) {
        latestId = data.id;
      }
      if (!!data.replies) {
        getId(data.replies);
      }
    });
  }
  getId(rawData.comments);
  return latestId;
};

const dataAtom = atomWithStorage<{ currentUser: User; comments: Comment[] }>("data", transformDate(rawData));
const voteAtom = atomWithStorage<{ [x: string]: "up" | "down" | null }>("vote", getVotes());
const latestIdAtom = atomWithStorage<number>("id", getLatestId());
const idToDeleteAtom = atom<number | null>(null);

export default function Main() {
  const [data, setData] = useAtom(dataAtom);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const setIdToDelete = useSetAtom(idToDeleteAtom);

  const update = useCallback((id: number, data: Comment[] | Reply[], type: "increment" | "decrement") => {
    data.forEach((comment) => {
      if (comment.id === id) {
        comment.score = comment.score + (type === "increment" ? 1 : -1);
      } else if (!!comment.replies) {
        update(id, comment.replies, type);
      }
    });
  }, []);

  const handleUpdate = useCallback(
    (id: number, type: "increment" | "decrement") => {
      setData((prev) => {
        const { currentUser, comments } = prev;
        update(id, comments, type);
        return { currentUser, comments };
      });
    },
    [setData, update]
  );

  const renderReplies = (replies: Reply[], parent: boolean = true) => {
    if (replies.length > 0)
      return (
        <div className={`border-l-interactive-comment-neutral-300 flex flex-col gap-4 border-l-2 pl-4 lg:ml-[44px] lg:gap-6 lg:pl-[42px] ${parent && "mt-4 lg:mt-5"}`}>
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
    <div className="flex max-w-md flex-col items-center gap-4 px-4 py-8 lg:max-w-[764px] lg:gap-[20px] lg:py-16">
      {data.comments.map((comment) => {
        return (
          <div
            key={comment.id}
            className="w-full"
          >
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
    </div>
  );
}

function Card({ data, currentUser, variant, handleUpdate, openDeleteModal }: { data: Comment | Reply; currentUser: User; variant: "comment" | "reply"; handleUpdate: (id: number, type: "increment" | "decrement") => void; openDeleteModal: () => void }) {
  const [vote, setVote] = useAtom(voteAtom);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const setIdToDelete = useSetAtom(idToDeleteAtom);

  return (
    <>
      <div className={`bg-interactive-comment-neutral-100 min-h-[150px] rounded-lg p-4 pr-5 lg:relative lg:pl-[89px] lg:pt-6 lg:pb-2 ${variant === "reply" ? "break-words lg:pr-[16px]" : "lg:pr-[40px]"}`}>
        <div className="flex items-center gap-4">
          <div className="relative h-8 w-8">
            <Image
              fill
              src={"/interactive-comments-section" + data.user.image.webp.slice(1)}
              alt={data.user.username + "Avatar"}
            />
          </div>
          <p className="text-interactive-comment-neutral-500 font-rubiks pb-[2px] font-medium tracking-[.1px]">
            {data.user.username}
            {currentUser.username === data.user.username && <span className="text-interactive-comment-neutral-100 before:bg-interactive-comment-primary-blue-200 relative z-10 ml-2 px-[6px] text-[13px] before:absolute before:left-0 before:-top-[1px] before:z-[-1] before:h-[19px] before:w-full before:rounded-sm before:content-['']">you</span>}
          </p>
          <p className="text-interactive-comment-neutral-400 pb-[2px]">{dayjs(data.createdAt).fromNow()}</p>
        </div>
        {!!isEditOpen ? (
          <EditForm
            id={data.id}
            data={data}
            variant={variant}
            toggle={() => {
              setIsEditOpen(false);
            }}
          />
        ) : (
          <p className="text-interactive-comment-neutral-400 mt-[15px] lg:mt-[14px]">
            {variant === "reply" && <span className="text-interactive-comment-primary-blue-200 font-medium">@{(data as Reply).replyingTo} </span>}
            {data.content}
          </p>
        )}
        <div className="mt-[17px] flex items-center justify-between">
          <div className={`${!!vote[`id${data.id}`] ? "bg-interactive-comment-neutral-300" : "bg-interactive-comment-neutral-200"} grid h-10 w-[100px] grid-cols-3 grid-rows-1 items-center justify-center rounded-xl px-1 pb-[2px] lg:absolute lg:left-[24px] lg:top-[24px] lg:h-[100px] lg:w-10 lg:grid-cols-1 lg:grid-rows-3`}>
            <button
              className={`text-[20px] font-medium lg:text-center ${vote[`id${data.id}`] === "up" ? "text-interactive-comment-primary-blue-200" : "text-interactive-comment-primary-blue-100"} `}
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
                  vote[`id${data.id}`] === "down" && handleUpdate(data.id, "increment");
                  handleUpdate(data.id, "increment");
                }
              }}
            >
              +
            </button>
            <div className="text-interactive-comment-primary-blue-200 text-center text-[17px] font-medium">{data.score}</div>
            <button
              className={`text-[16px] font-medium ${vote[`id${data.id}`] === "down" ? "text-interactive-comment-primary-blue-200" : "text-interactive-comment-primary-blue-100"}`}
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
                  vote[`id${data.id}`] === "up" && handleUpdate(data.id, "decrement");
                  handleUpdate(data.id, "decrement");
                }
              }}
            >
              &mdash;
            </button>
          </div>
          <div className="flex gap-[6px] lg:absolute lg:right-[30px] lg:top-[24px] lg:h-8 lg:gap-[12px]">
            {currentUser.username === data.user.username ? (
              <>
                <button
                  className="mr-[8px] flex items-center gap-2"
                  onClick={() => {
                    setIdToDelete(data.id);
                    openDeleteModal();
                  }}
                >
                  <svg
                    viewBox="0 0 12 14"
                    className="w-3"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                      fill="#ED6368"
                    />
                  </svg>
                  <span className="text-interactive-comment-primary-red-200 pb-[2px] font-medium">Delete</span>
                </button>
                <button
                  className="flex translate-x-[3.25px] items-center gap-2"
                  onClick={() => {
                    setIsEditOpen((p) => !p);
                  }}
                >
                  <svg
                    viewBox="0 0 14 14"
                    className="w-[14px]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                      fill="#5357B6"
                    />
                  </svg>
                  <span className="text-interactive-comment-primary-blue-200 pb-[3px] font-medium">Edit</span>
                </button>
              </>
            ) : (
              <button
                className="flex items-center gap-1 pb-[2px]"
                onClick={() => {
                  setIsReplyOpen((p) => !p);
                }}
              >
                <span>
                  <svg
                    viewBox="0 0 14 13"
                    className="h-[13px] translate-y-[1px]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                      fill="#5357B6"
                    />
                  </svg>
                </span>
                <span className="text-interactive-comment-primary-blue-200 translate-x-[3px] font-medium">Reply</span>
              </button>
            )}
          </div>
        </div>
      </div>
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

function NewEntryForm({ variant = "comment", replyingTo, parentId, toggle }: { variant?: "reply" | "comment"; replyingTo?: string; parentId?: number; toggle?: () => void }) {
  const [data, setData] = useAtom(dataAtom);
  const [latestId, setLatestId] = useAtom(latestIdAtom);
  const schemas = {
    comment: zNewComment,
    reply: zNewReply,
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    setFocus,
  } = useForm<z.infer<(typeof schemas)[typeof variant]>>({ resolver: zodResolver(schemas[variant]) });

  const handleAddComment = handleSubmit((c) => {
    const newComment: Comment = { content: c.content, createdAt: dayjs().format(), id: latestId + 1, score: 0, user: data.currentUser, replies: [] };
    setData((prev) => {
      const { comments } = prev;
      return { ...prev, comments: [...comments, newComment] };
    });
    setLatestId((prev) => prev + 1);
    console.log({ newComment });
  });

  const handleReply = handleSubmit((c) => {
    const newReply: Reply = { content: c.content.split(" ").slice(1).join(" "), createdAt: dayjs().format(), id: latestId + 1, score: 0, user: data.currentUser, replyingTo: replyingTo!, replies: [] };
    setData((prev) => {
      const { comments } = prev;
      const searchById = (data: Comment[] | Reply[], id: number) => {
        data.forEach((dat) => {
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
        });
      };
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
      if (variant === "reply") {
        toggle!();
      }
    }
  }, [variant, reset, isSubmitSuccessful, toggle]);

  return (
    <form
      className={`bg-interactive-comment-neutral-100 grid w-full grid-cols-2 grid-rows-[auto,auto] items-center gap-[16px] rounded p-4 pb-[14px] lg:flex lg:grid-cols-[auto,auto,auto] lg:grid-rows-1 lg:items-start lg:p-6 lg:pr-[25px] ${variant === "reply" && "mt-2"}`}
      onSubmit={(e) => {
        if (variant === "comment") {
          handleAddComment(e);
        } else {
          handleReply(e);
        }
      }}
    >
      <div className="relative col-start-1 row-start-2 aspect-square h-8 w-8 lg:mt-1 lg:h-10 lg:w-10">
        <Image
          fill
          alt={data.currentUser.username + " Avatar"}
          src={"/interactive-comments-section" + data.currentUser.image.webp.slice(1)}
        />
      </div>
      <textarea
        {...register("content", { required: true, value: variant === "reply" ? `@${replyingTo} ` : "" })}
        className="border-interactive-comment-neutral-300 focus:border-interactive-comment-neutral-500 col-span-2 col-start-1 row-start-1 h-24 w-full resize-none rounded border px-[22px] py-[10px] placeholder:font-medium focus-visible:outline focus-visible:outline-transparent lg:flex-1"
        placeholder="Add a comment..."
        required
      />
      {variant === "reply" && (
        <input
          type="hidden"
          {...register("replyingTo", { value: replyingTo })}
        />
      )}
      <button className="bg-interactive-comment-primary-blue-200 col-start-2 row-start-2 h-12 w-[104px] translate-y-[-1px] place-self-end rounded-lg pb-[2px] font-medium uppercase text-white lg:mt-[1px] lg:self-start">{variant === "comment" ? "Send" : "Reply"}</button>
    </form>
  );
}

function EditForm({ id, toggle, data, variant }: { id: number; toggle: () => void; data: Comment | Reply; variant?: "reply" | "comment" }) {
  const setData = useSetAtom(dataAtom);
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    setFocus,
  } = useForm<z.infer<typeof zEdit>>({ resolver: zodResolver(zEdit) });

  // TODO: FIXME: handle user mention highlighting in reply
  const handleEdit = handleSubmit((c) => {
    const editedEntry: Pick<Comment, "content" | "createdAt"> = { content: variant === "comment" ? c.content : c.content.split(" ").slice(1).join(" "), createdAt: dayjs().format() };
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
      className={`bg-interactive-comment-neutral-100 mt-4 grid w-full grid-cols-2 grid-rows-[auto,auto] items-center gap-[16px] rounded pb-[14px] pr-[10px]`}
      onSubmit={handleEdit}
    >
      <textarea
        {...register("content", { required: true, value: variant === "comment" ? data.content : `@${(data as Reply).replyingTo} ${data.content}` })}
        className="border-interactive-comment-neutral-300 focus:border-interactive-comment-neutral-500 col-span-2 col-start-1 row-start-1 h-24 w-full resize-none rounded border px-[22px] py-[10px] pr-[24px] placeholder:font-medium focus-visible:outline focus-visible:outline-transparent lg:h-[124px]"
        placeholder="Add a comment..."
        required
      />
      <button className="bg-interactive-comment-primary-blue-200 col-start-2 row-start-2 h-12 w-[104px] translate-y-[-1px] place-self-end rounded-lg pb-[2px] font-medium uppercase text-white lg:mt-[1px] lg:self-start">Update</button>
    </form>
  );
}

function DeleteModal({ close }: { close: () => void }) {
  const cardRef = useRef(null);
  const [data, setData] = useAtom(dataAtom);
  const idToDelete = useAtomValue(idToDeleteAtom);

  const handleDelete = useCallback(
    (id: number) => {
      const filteredComments = data.comments.filter((comment) => {
        return comment.id !== id;
      });
      const deleteReply = (id: number, replies: Reply[]) => {
        const reps = replies.filter((rep) => {
          return rep.id !== id;
        });
        reps.forEach((rep) => {
          if (!!rep.replies && rep.replies.length > 0) {
            rep.replies = deleteReply(id, rep.replies);
          }
        });
        return reps;
      };
      filteredComments.forEach((comment) => {
        if (!!comment.replies && comment.replies.length > 0) {
          comment.replies = deleteReply(id, comment.replies);
        }
      });
      setData((prev) => ({ ...prev, comments: filteredComments }));
    },
    [data, setData]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useOnClickOutside(cardRef, () => {
    close();
  });

  return (
    <div className="fixed top-0 left-0 z-40 flex h-[100svh] w-screen flex-col items-center justify-center bg-black/50 px-4 pt-[2px] lg:pt-0">
      <div
        className="max-w-[400px] rounded-lg bg-white px-[27px] pt-[21px] pb-[24px] lg:px-[32px] lg:pb-[32px] lg:pt-[28px]"
        ref={cardRef}
      >
        <h2 className="text-interactive-comment-neutral-500 text-[20px] font-medium lg:text-[24px]">Delete comment</h2>
        <p className="text-interactive-comment-neutral-400 mt-[12px] lg:mt-[15px]">Are you sure you want to delete this comment? This will remove the comment and can{"'"}t be undone.</p>
        <div className="mt-[17px] grid h-[48px] grid-cols-2 grid-rows-1 gap-3 lg:mt-[21px] lg:gap-[14px]">
          <button
            className="text-interactive-comment-neutral-100 bg-interactive-comment-neutral-400 rounded-lg pb-[2px] font-medium uppercase"
            onClick={() => {
              close();
            }}
          >
            No, cancel
          </button>
          <button
            className="text-interactive-comment-neutral-100 bg-interactive-comment-primary-red-200 rounded-lg pb-[2px] font-medium uppercase"
            onClick={() => {
              if (!!idToDelete) {
                handleDelete(idToDelete);
                close();
              }
            }}
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}
