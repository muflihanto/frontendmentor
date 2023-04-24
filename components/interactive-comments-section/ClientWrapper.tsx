import rawData from "../../public/interactive-comments-section/data.json";
import { atomWithStorage } from "jotai/utils";
import type { User, Comment, Reply } from "../../pages/interactive-comments-section";
import { useAtom } from "jotai";
import { Fragment, useCallback, useEffect } from "react";
import Image from "next/image";

const dataAtom = atomWithStorage<{ currentUser: User; comments: Comment[] }>("data", rawData);

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

const voteAtom = atomWithStorage<{ [x: string]: "up" | "down" | null }>("vote", getVotes());

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

// const latestId = atomWithStorage<number>("id",()=>{

// })

export default function Main() {
  const [data, setData] = useAtom(dataAtom);
  const [vote, setVote] = useAtom(voteAtom);

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
        <div className={`border-l-interactive-comment-neutral-300 flex flex-col gap-4 border-l-2 pl-4 ${parent && "mt-4"}`}>
          {replies.map((reply) => {
            return (
              <Fragment key={reply.id}>
                <div className="bg-interactive-comment-neutral-100 rounded-lg p-4 pr-5">
                  <div className="flex items-center gap-4">
                    <div className="relative h-8 w-8">
                      <Image
                        fill
                        src={"/interactive-comments-section" + reply.user.image.webp.slice(1)}
                        alt={reply.user.username + "Avatar"}
                      />
                    </div>
                    <p className="text-interactive-comment-neutral-500 font-rubiks pb-[2px] font-medium tracking-[.1px]">
                      {reply.user.username}
                      {data.currentUser.username === reply.user.username && <span className="text-interactive-comment-neutral-100 before:bg-interactive-comment-primary-blue-200 relative z-10 ml-2 px-[6px] text-[13px] before:absolute before:left-0 before:-top-[1px] before:z-[-1] before:h-[19px] before:w-full before:rounded-sm before:content-['']">you</span>}
                    </p>
                    <p className="text-interactive-comment-neutral-400 pb-[2px]">{reply.createdAt}</p>
                  </div>
                  <p className="text-interactive-comment-neutral-400 mt-[15px]">
                    <span className="text-interactive-comment-primary-blue-200 font-medium">@{reply.replyingTo}</span> {reply.content}
                  </p>
                  <div className="mt-[17px] flex items-center justify-between">
                    <div className={`${!!vote[`id${reply.id}`] ? "bg-interactive-comment-neutral-300" : "bg-interactive-comment-neutral-200"} grid h-10 w-[100px] grid-cols-3 grid-rows-1 items-center justify-center rounded-xl px-1 pb-[2px]`}>
                      <button
                        className={`text-[20px] font-medium ${vote[`id${reply.id}`] === "up" ? "text-interactive-comment-primary-blue-200" : "text-interactive-comment-primary-blue-100"} `}
                        onClick={() => {
                          if (vote[`id${reply.id}`] === "up") {
                            setVote((prev) => {
                              return { ...prev, [`id${reply.id}`]: null };
                            });
                            handleUpdate(reply.id, "decrement");
                          } else {
                            setVote((prev) => {
                              return { ...prev, [`id${reply.id}`]: "up" };
                            });
                            vote[`id${reply.id}`] === "down" && handleUpdate(reply.id, "increment");
                            handleUpdate(reply.id, "increment");
                          }
                        }}
                      >
                        +
                      </button>
                      <div className="text-interactive-comment-primary-blue-200 text-center text-[17px] font-medium">{reply.score}</div>
                      <button
                        className={`text-[16px] font-medium ${vote[`id${reply.id}`] === "down" ? "text-interactive-comment-primary-blue-200" : "text-interactive-comment-primary-blue-100"}`}
                        onClick={() => {
                          if (vote[`id${reply.id}`] === "down") {
                            setVote((prev) => {
                              return { ...prev, [`id${reply.id}`]: null };
                            });
                            handleUpdate(reply.id, "increment");
                          } else {
                            setVote((prev) => {
                              return { ...prev, [`id${reply.id}`]: "down" };
                            });
                            vote[`id${reply.id}`] === "up" && handleUpdate(reply.id, "decrement");
                            handleUpdate(reply.id, "decrement");
                          }
                        }}
                      >
                        &mdash;
                      </button>
                    </div>
                    <div className="flex gap-2">
                      {data.currentUser.username === reply.user.username ? (
                        <>
                          <button className="mr-[8px] flex items-center gap-2">
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
                            <span className="text-interactive-comment-primary-red-200 pb-[3px] font-medium">Delete</span>
                          </button>
                          <button className="flex translate-x-1 items-center gap-2">
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
                        <button className="flex items-center gap-1 pb-[2px]">
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
                {!!reply.replies && renderReplies(reply.replies, false)}
              </Fragment>
            );
          })}
        </div>
      );
  };

  return (
    <div className="flex max-w-md flex-col items-center gap-4 px-4 py-8">
      {data.comments.map((comment) => {
        return (
          <div key={comment.id}>
            <div className="bg-interactive-comment-neutral-100 rounded-lg p-4 pr-5">
              <div className="flex items-center gap-4">
                <div className="relative h-8 w-8">
                  <Image
                    fill
                    src={"/interactive-comments-section" + comment.user.image.webp.slice(1)}
                    alt={comment.user.username + "Avatar"}
                  />
                </div>
                <p className="text-interactive-comment-neutral-500 font-rubiks pb-[2px] font-medium tracking-[.1px]">{comment.user.username}</p>
                {data.currentUser.username === comment.user.username && <p>you</p>}
                <p className="text-interactive-comment-neutral-400 pb-[2px]">{comment.createdAt}</p>
              </div>
              <p className="text-interactive-comment-neutral-400 mt-[15px]">{comment.content}</p>
              <div className="mt-[17px] flex items-center justify-between">
                <div className={`${!!vote[`id${comment.id}`] ? "bg-interactive-comment-neutral-300" : "bg-interactive-comment-neutral-200"} grid h-10 w-[100px] grid-cols-3 grid-rows-1 items-center justify-center rounded-xl px-1 pb-[2px]`}>
                  <button
                    className={`text-[20px] font-medium ${vote[`id${comment.id}`] === "up" ? "text-interactive-comment-primary-blue-200" : "text-interactive-comment-primary-blue-100"}`}
                    onClick={() => {
                      if (vote[`id${comment.id}`] === "up") {
                        setVote((prev) => {
                          return { ...prev, [`id${comment.id}`]: null };
                        });
                        handleUpdate(comment.id, "decrement");
                      } else {
                        setVote((prev) => {
                          return { ...prev, [`id${comment.id}`]: "up" };
                        });
                        vote[`id${comment.id}`] === "down" && handleUpdate(comment.id, "increment");
                        handleUpdate(comment.id, "increment");
                      }
                    }}
                  >
                    +
                  </button>
                  <div className="text-interactive-comment-primary-blue-200 text-center text-[17px] font-medium">{comment.score}</div>
                  <button
                    className={`text-[16px] font-medium ${vote[`id${comment.id}`] === "down" ? "text-interactive-comment-primary-blue-200" : "text-interactive-comment-primary-blue-100"}`}
                    onClick={() => {
                      if (vote[`id${comment.id}`] === "down") {
                        setVote((prev) => {
                          return { ...prev, [`id${comment.id}`]: null };
                        });
                        handleUpdate(comment.id, "increment");
                      } else {
                        setVote((prev) => {
                          return { ...prev, [`id${comment.id}`]: "down" };
                        });
                        vote[`id${comment.id}`] === "up" && handleUpdate(comment.id, "decrement");
                        handleUpdate(comment.id, "decrement");
                      }
                    }}
                  >
                    &mdash;
                  </button>
                </div>
                <div className="flex gap-2">
                  {data.currentUser.username === comment.user.username ? (
                    <>
                      <button className="flex items-center">
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
                        <span className="text-interactive-comment-primary-red-200 font-medium">Delete</span>
                      </button>
                      <button className="flex items-center">
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
                        <span className="text-interactive-comment-primary-blue-200 font-medium">Edit</span>
                      </button>
                    </>
                  ) : (
                    <button className="flex items-center gap-1 pb-[2px]">
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
            {!!comment.replies && renderReplies(comment.replies)}
          </div>
        );
      })}
      <div className="bg-interactive-comment-neutral-100 w-full rounded p-4 pb-[14px]">
        <textarea
          name="comment"
          className="border-interactive-comment-neutral-300 h-24 w-full resize-none rounded border px-[22px] py-[10px] placeholder:font-medium"
          placeholder="Add a comment..."
        />
        <div className="mt-[14px] flex items-center justify-between">
          <div className="relative h-8 w-8">
            <Image
              fill
              alt={data.currentUser.username + " Avatar"}
              src={"/interactive-comments-section" + data.currentUser.image.webp.slice(1)}
            />
          </div>
          <button className="bg-interactive-comment-primary-blue-200 h-12 w-[104px] rounded-lg font-medium uppercase text-white">Send</button>
        </div>
      </div>
    </div>
  );
}
