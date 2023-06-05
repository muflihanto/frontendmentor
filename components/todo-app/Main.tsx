import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDarkMode } from "usehooks-ts";
import _data from "./data.json";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export type Data = {
  activity: string;
  completed: boolean;
};

const dataAtom = atomWithStorage<Data[]>("todo-data", _data);

export default function Main() {
  return (
    <>
      <Header />
      <Todo />
    </>
  );
}

function Header() {
  const { isDarkMode, toggle } = useDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <header className="flex items-center justify-center px-[24px]">
      <div className="flex w-full max-w-[540px] items-center justify-between">
        <h1 className="text-todo-neutral-light-100 pl-[1px] text-[26px] font-bold uppercase leading-[32px] tracking-[10.25px] dark:leading-[31.5px] lg:pl-0 lg:text-[40px] lg:leading-none lg:tracking-[15px] lg:dark:leading-none">TODO</h1>
        <motion.button
          onClick={() => {
            toggle();
          }}
        >
          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 26 26"
              className="mb-[6px] w-[20px] lg:-mr-[1px] lg:mb-0 lg:w-[26px] lg:-translate-y-[5px]"
            >
              <path
                fill="#FFF"
                fillRule="evenodd"
                d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 26 26"
              className="mb-[4px] w-[20px] lg:mb-0 lg:w-[26px] lg:-translate-y-[4px]"
            >
              <path
                fill="#FFF"
                fillRule="evenodd"
                d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
              />
            </svg>
          )}
        </motion.button>
      </div>
    </header>
  );
}

const zInputSchema = z.object({
  input: z.string().min(1),
});
type InputScheme = z.infer<typeof zInputSchema>;

function Todo() {
  const [data, setData] = useAtom(dataAtom);
  const [filterType, setFilterType] = useState<"all" | "active" | "completed">("all");
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<InputScheme>({ resolver: zodResolver(zInputSchema) });

  const onSubmit = handleSubmit((dat) => {
    setData((prev) => {
      return [
        ...prev,
        {
          activity: dat.input,
          completed: false,
        },
      ];
    });
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const filter = useCallback(
    (d: Data) => {
      if (filterType === "all") {
        return d;
      } else if (filterType === "active") {
        return !d.completed;
      } else {
        return d.completed;
      }
    },
    [filterType]
  );

  const deleteItem = (itemIndex: number) => {
    const updatedData = data.filter(filter).filter((d, index) => {
      return index !== itemIndex;
    });
    setData(updatedData);
  };

  const toggleCompleted = (itemIndex: number) => {
    setData((prev) => {
      return prev.filter(filter).map((d, index) => {
        if (index === itemIndex) {
          return { ...d, completed: !d.completed };
        }
        return d;
      });
    });
  };

  const clearCompleted = () => {
    setData((prev) => {
      return prev.filter((d) => {
        return !d.completed;
      });
    });
  };

  return (
    <form
      action=""
      className="mt-8 flex w-full flex-col items-center bg-transparent px-6 lg:mt-10"
      onSubmit={onSubmit}
    >
      <label
        htmlFor="input"
        className="relative w-full max-w-[540px]"
      >
        <div className="dark:border-todo-neutral-dark-500 absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border lg:left-6 lg:h-6 lg:w-6"></div>
        <input
          {...register("input")}
          type="text"
          className="dark:bg-todo-neutral-dark-600 bg-todo-neutral-light-100 shadow-todo-neutral-light-300/25 text-todo-neutral-light-500 dark:text-todo-neutral-dark-200 caret-todo-primary-blue h-12 w-full rounded-md px-5 pl-[52px] pt-[2px] text-[12px] leading-none tracking-[-.25px] shadow-lg focus-visible:outline focus-visible:outline-transparent dark:shadow-black/25 dark:placeholder:opacity-70 lg:h-16 lg:pl-[72px] lg:pt-[4px] lg:text-[18px] lg:shadow-[0px_20px_20px_var(--tw-shadow-colored)]"
          placeholder="Create a new todo..."
        />
      </label>
      <div className="shadow-todo-neutral-light-300/75 dark:bg-todo-neutral-dark-600 mt-4 w-full max-w-[540px] rounded-md bg-white shadow-lg dark:shadow-black/50 lg:mt-6 lg:shadow-[0px_40px_10px_-20px_var(--tw-shadow-colored),0px_25px_25px_20px_var(--tw-shadow-colored)] lg:shadow-black/[.025] lg:dark:shadow-black/[.15]">
        {data.filter(filter).map((d, index) => {
          return (
            <motion.div
              key={index}
              className={`border-b-todo-neutral-light-200 dark:border-b-todo-neutral-dark-500 group flex h-[53px] w-full items-center border-b px-5 lg:px-6 ${index === 0 ? "lg:h-[64px]" : "lg:h-[65px]"}`}
            >
              <button
                type="button"
                className={`flex h-5 w-5 items-center justify-center rounded-full lg:h-6 lg:w-6 ${
                  d.completed
                    ? "from-todo-primary-green to-todo-primary-violet bg-gradient-to-br"
                    : "border-todo-neutral-light-200 dark:border-todo-neutral-dark-500 border hover:border-transparent hover:[background:linear-gradient(white,white)_padding-box,linear-gradient(135deg,theme(colors.todo.primary.green),theme(colors.todo.primary.violet))_border-box] dark:hover:border-transparent dark:hover:[background:linear-gradient(theme(colors.todo.neutral.dark.600),theme(colors.todo.neutral.dark.600))_padding-box,linear-gradient(135deg,theme(colors.todo.primary.green),theme(colors.todo.primary.violet))_border-box]"
                }`}
                onClick={() => {
                  toggleCompleted(index);
                }}
              >
                {d.completed ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 11 9"
                    className="h-2 lg:h-[9px]"
                  >
                    <path
                      fill="none"
                      stroke="#FFF"
                      strokeWidth={2}
                      d="M1 4.304L3.696 7l6-6"
                    />
                  </svg>
                ) : null}
              </button>
              <p className={`ml-3 pt-[2px] text-[12px] leading-none tracking-[-.2px] lg:ml-6 lg:pt-1 lg:text-[18px] ${d.completed ? "text-todo-neutral-light-300 dark:text-todo-neutral-dark-400 line-through" : "text-todo-neutral-light-500 dark:text-todo-neutral-dark-200"}`}>{d.activity}</p>
              <button
                type="button"
                className="ml-auto flex items-center justify-center rounded-full transition-all lg:invisible lg:group-hover:visible"
                onClick={() => {
                  deleteItem(index);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 18 18"
                  className="dark:hover:fill-todo-neutral-dark-200 hover:fill-todo-neutral-light-400 w-[12px] fill-[#494C6B] lg:w-[18px]"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                  />
                </svg>
              </button>
            </motion.div>
          );
        })}
        <div className="text-todo-neutral-light-400 dark:text-todo-neutral-dark-400 flex h-[50px] items-center justify-between px-5 pb-[2px] text-[12px] tracking-[-.2px] lg:grid lg:grid-cols-3 lg:px-6 lg:pt-[5px] lg:text-[14px]">
          <p className="lg:text-left">{`${data.filter((d) => !d.completed).length} items left`}</p>
          <div className="flex gap-5 max-lg:hidden">
            <button
              type="button"
              onClick={() => {
                setFilterType("all");
              }}
              className={`${filterType === "all" ? "text-todo-primary-blue" : "text-todo-neutral-light-400 dark:hover:text-todo-neutral-dark-200 hover:text-todo-neutral-light-500 dark:text-todo-neutral-dark-400"} text-[14px] font-bold tracking-[-.25px]`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => {
                setFilterType("active");
              }}
              className={`${filterType === "active" ? "text-todo-primary-blue" : "text-todo-neutral-light-400 dark:hover:text-todo-neutral-dark-200 hover:text-todo-neutral-light-500 dark:text-todo-neutral-dark-400"} text-[14px] font-bold tracking-[-.25px]`}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => {
                setFilterType("completed");
              }}
              className={`${filterType === "completed" ? "text-todo-primary-blue" : "text-todo-neutral-light-400 dark:hover:text-todo-neutral-dark-200 hover:text-todo-neutral-light-500 dark:text-todo-neutral-dark-400"} text-[14px] font-bold tracking-[-.25px]`}
            >
              Completed
            </button>
          </div>
          <button
            type="button"
            className="dark:hover:text-todo-neutral-dark-200 hover:text-todo-neutral-light-500 lg:text-right lg:tracking-[-.2px]"
            onClick={() => {
              clearCompleted();
            }}
          >
            Clear Completed
          </button>
        </div>
      </div>
      <div className="dark:bg-todo-neutral-dark-600 shadow-todo-neutral-light-300/25 mt-4 flex h-[48px] w-full max-w-[540px] items-center justify-center gap-[20px] rounded-md bg-white pt-1 shadow-lg dark:shadow-[0px_5px_10px_rgba(0,0,0,.2),0px_50px_15px_-10px_rgba(0,0,0,.125)] lg:hidden">
        <button
          type="button"
          onClick={() => {
            setFilterType("all");
          }}
          className={`${filterType === "all" ? "text-todo-primary-blue" : "text-todo-neutral-light-400 dark:hover:text-todo-neutral-dark-200 hover:text-todo-neutral-light-500 dark:text-todo-neutral-dark-400"} text-[14px] font-bold tracking-[-.25px]`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => {
            setFilterType("active");
          }}
          className={`${filterType === "active" ? "text-todo-primary-blue" : "text-todo-neutral-light-400 dark:hover:text-todo-neutral-dark-200 hover:text-todo-neutral-light-500 dark:text-todo-neutral-dark-400"} text-[14px] font-bold tracking-[-.25px]`}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => {
            setFilterType("completed");
          }}
          className={`${filterType === "completed" ? "text-todo-primary-blue" : "text-todo-neutral-light-400 dark:hover:text-todo-neutral-dark-200 hover:text-todo-neutral-light-500 dark:text-todo-neutral-dark-400"} text-[14px] font-bold tracking-[-.25px]`}
        >
          Completed
        </button>
      </div>
      <p className="text-todo-neutral-light-400 dark:text-todo-neutral-dark-400 mt-10 w-full text-center text-[14px] tracking-[-.2px] lg:mt-[49px]">Drag and drop to reorder list</p>
    </form>
  );
}
