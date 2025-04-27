import { motion, useDragControls, useMotionValue } from "framer-motion";
// import Image from "next/image";
import { type KeyboardEvent, useCallback, useEffect, useState } from "react";
import { useDarkMode, useWindowSize } from "usehooks-ts";
import _data from "./data.json";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Reorder } from "framer-motion";
import { nanoid } from "nanoid";

export type Data = {
  activity: string;
  completed: boolean;
  id: string;
};

const dataAtom = atomWithStorage<Data[]>(
  "todo-data",
  _data.map((d) => {
    return { ...d, id: nanoid() };
  }),
);

const darkModeAtom = atomWithStorage<boolean | null>(
  "todo-app-dark-mode",
  null,
);

export default function Main() {
  return (
    <>
      <Header />
      <Todo />
    </>
  );
}

function Header() {
  const { isDarkMode: systemDarkMode, toggle } = useDarkMode();
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const isDarkMode = darkMode ?? systemDarkMode;

  useEffect(() => {
    if (darkMode !== null && darkMode !== systemDarkMode) {
      toggle();
    }
  }, [darkMode, systemDarkMode, toggle]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !(prev ?? systemDarkMode));
  };

  return (
    <header className="relative flex items-center justify-center px-[24px]">
      <div className="flex w-full max-w-[540px] items-center justify-between">
        <h1 className="pl-[1px] text-[26px] font-bold uppercase leading-[32px] tracking-[10.25px] text-todo-neutral-light-100 dark:leading-[31.5px] lg:pl-0 lg:text-[40px] lg:leading-none lg:tracking-[15px] lg:dark:leading-none">
          TODO
        </h1>
        <motion.button
          onClick={() => {
            toggleDarkMode();
          }}
          role="switch"
          aria-checked={isDarkMode}
          aria-label="Dark Mode"
        >
          {isDarkMode ? (
            <svg
              viewBox="0 0 26 26"
              className="mb-[6px] w-[20px] lg:-mr-[1px] lg:mb-0 lg:w-[26px] lg:-translate-y-[5px]"
            >
              <title>Turn Dark Mode Off</title>
              <use href="/todo-app/images/icon-sun.svg#icon-sun" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 26 26"
              className="mb-[4px] w-[20px] lg:mb-0 lg:w-[26px] lg:-translate-y-[4px]"
            >
              <title>Turn Dark Mode On</title>
              <use href="/todo-app/images/icon-moon.svg#icon-moon" />
            </svg>
          )}
        </motion.button>
      </div>
    </header>
  );
}

const zInputSchema = z.object({
  input: z
    .string()
    .trim()
    .min(1, { message: "Input cannot be empty or whitespace" }),
});
type InputScheme = z.infer<typeof zInputSchema>;

function Todo() {
  const [data, setData] = useAtom(dataAtom);
  const [filterType, setFilterType] = useState<"all" | "active" | "completed">(
    "all",
  );
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<InputScheme>({ resolver: zodResolver(zInputSchema) });
  const { width } = useWindowSize();

  const onSubmit = handleSubmit((dat) => {
    setData((prev) => {
      return [
        ...prev,
        {
          activity: dat.input.trim(),
          completed: false,
          id: nanoid(),
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
      }
      if (filterType === "active") {
        return !d.completed;
      }
      return d.completed;
    },
    [filterType],
  );

  const deleteItem = (itemId: string) => {
    setData(data.filter((d) => d.id !== itemId));
  };

  const toggleCompleted = (itemId: string) => {
    setData(
      data.map((d) =>
        d.id === itemId ? { ...d, completed: !d.completed } : d,
      ),
    );
  };

  const clearCompleted = () => {
    setData((prev) => {
      return prev.filter((d) => {
        return !d.completed;
      });
    });
  };

  const onItemKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const tab = event.currentTarget;
    const parent = tab.parentElement;
    const tablist = parent?.parentElement;
    const key = event.key;
    const allTabs = tablist?.querySelectorAll("button");
    const firstTab = allTabs?.[0];
    const lastTab = allTabs?.[allTabs.length - 1];
    const nextTab = parent?.nextElementSibling?.querySelector("button");
    const prevTab = parent?.previousElementSibling?.querySelector("button");

    let flag = false;

    switch (key) {
      case "Right":
      case "ArrowRight":
        if (nextTab) {
          nextTab.focus();
        } else {
          firstTab?.focus();
        }
        flag = true;
        break;

      case "Left":
      case "ArrowLeft":
        if (prevTab) {
          prevTab.focus();
        } else {
          lastTab?.focus();
        }
        flag = true;
        break;

      case "Home":
      case "PageUp":
        firstTab?.focus();
        flag = true;
        break;

      case "End":
      case "PageDown":
        lastTab?.focus();
        flag = true;
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  return (
    <main className="contents" aria-label="Todo app">
      <form
        action=""
        className="mt-8 flex w-full flex-col items-center bg-transparent px-6 lg:mt-10"
        onSubmit={onSubmit}
      >
        <label htmlFor="input" className="relative w-full max-w-[540px]">
          <div className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border dark:border-todo-neutral-dark-500 lg:left-6 lg:h-6 lg:w-6" />
          <input
            {...register("input")}
            type="text"
            className="h-12 w-full rounded-md bg-todo-neutral-light-100 px-5 pl-[52px] pt-[2px] text-[12px] leading-none tracking-[-.25px] text-todo-neutral-light-500 caret-todo-primary-blue shadow-lg shadow-todo-neutral-light-300/25 focus-visible:outline focus-visible:outline-transparent dark:bg-todo-neutral-dark-600 dark:text-todo-neutral-dark-200 dark:shadow-black/25 dark:placeholder:opacity-70 lg:h-16 lg:pl-[72px] lg:pt-[4px] lg:text-[18px] lg:shadow-[0px_20px_20px_var(--tw-shadow-colored)]"
            placeholder="Create a new todo..."
          />
        </label>
        <div
          role="tabpanel"
          id="tabpanel"
          aria-labelledby={`tab-${filterType}${width <= 1023 ? "-mobile" : ""}`}
          className="relative mt-4 w-full max-w-[540px] rounded-md bg-white shadow-lg shadow-todo-neutral-light-300/75 dark:bg-todo-neutral-dark-600 dark:shadow-black/50 lg:mt-6 lg:shadow-[0px_40px_10px_-20px_var(--tw-shadow-colored),0px_25px_25px_20px_var(--tw-shadow-colored)] lg:shadow-black/[.025] lg:dark:shadow-black/[.15]"
        >
          <Reorder.Group
            axis="y"
            values={data}
            onReorder={(newOrder) => {
              if (filterType === "all") {
                setData(newOrder);
              }
            }}
            className="contents"
          >
            {data.filter(filter).map((d, index) => {
              return (
                <Item
                  key={d.id}
                  index={index}
                  d={d}
                  toggleCompleted={toggleCompleted}
                  deleteItem={deleteItem}
                />
              );
            })}
          </Reorder.Group>
          <div className="flex h-[50px] items-center justify-between px-5 pb-[2px] text-[12px] tracking-[-.2px] text-todo-neutral-light-400 dark:text-todo-neutral-dark-400 lg:grid lg:grid-cols-3 lg:px-6 lg:pt-[5px] lg:text-[14px]">
            <p className="lg:text-left">{`${
              data.filter((d) => !d.completed).length
            } items left`}</p>
            <ul
              className="flex gap-5 max-lg:hidden"
              role="tablist"
              aria-label="Filter"
            >
              <li role="none">
                <button
                  type="button"
                  onClick={() => {
                    setFilterType("all");
                  }}
                  className={`${
                    filterType === "all"
                      ? "text-todo-primary-blue"
                      : "text-todo-neutral-light-400 hover:text-todo-neutral-light-500 dark:text-todo-neutral-dark-400 dark:hover:text-todo-neutral-dark-200"
                  } text-[14px] font-bold tracking-[-.25px]`}
                  role="tab"
                  onKeyDown={onItemKeyDown}
                  id="tab-all"
                  aria-controls="tabpanel"
                  aria-selected={filterType === "all"}
                >
                  All
                </button>
              </li>
              <li role="none">
                <button
                  type="button"
                  onClick={() => {
                    setFilterType("active");
                  }}
                  className={`${
                    filterType === "active"
                      ? "text-todo-primary-blue"
                      : "text-todo-neutral-light-400 hover:text-todo-neutral-light-500 dark:text-todo-neutral-dark-400 dark:hover:text-todo-neutral-dark-200"
                  } text-[14px] font-bold tracking-[-.25px]`}
                  role="tab"
                  onKeyDown={onItemKeyDown}
                  id="tab-active"
                  aria-controls="tabpanel"
                  aria-selected={filterType === "active"}
                >
                  Active
                </button>
              </li>
              <li role="none">
                <button
                  type="button"
                  onClick={() => {
                    setFilterType("completed");
                  }}
                  className={`${
                    filterType === "completed"
                      ? "text-todo-primary-blue"
                      : "text-todo-neutral-light-400 hover:text-todo-neutral-light-500 dark:text-todo-neutral-dark-400 dark:hover:text-todo-neutral-dark-200"
                  } text-[14px] font-bold tracking-[-.25px]`}
                  role="tab"
                  onKeyDown={onItemKeyDown}
                  id="tab-completed"
                  aria-controls="tabpanel"
                  aria-selected={filterType === "completed"}
                >
                  Completed
                </button>
              </li>
            </ul>
            <button
              type="button"
              className="hover:text-todo-neutral-light-500 dark:hover:text-todo-neutral-dark-200 lg:text-right lg:tracking-[-.2px]"
              onClick={() => {
                clearCompleted();
              }}
            >
              Clear Completed
            </button>
          </div>
        </div>
        <ul
          className="mt-4 flex h-[48px] w-full max-w-[540px] items-center justify-center gap-[20px] rounded-md bg-white pt-1 shadow-lg shadow-todo-neutral-light-300/25 dark:bg-todo-neutral-dark-600 dark:shadow-[0px_5px_10px_rgba(0,0,0,.2),0px_50px_15px_-10px_rgba(0,0,0,.125)] lg:hidden"
          role="tablist"
          aria-label="Filter"
        >
          <li role="none">
            <button
              type="button"
              onClick={() => {
                setFilterType("all");
              }}
              className={`${
                filterType === "all"
                  ? "text-todo-primary-blue"
                  : "text-todo-neutral-light-400 hover:text-todo-neutral-light-500 dark:text-todo-neutral-dark-400 dark:hover:text-todo-neutral-dark-200"
              } text-[14px] font-bold tracking-[-.25px]`}
              role="tab"
              onKeyDown={onItemKeyDown}
              id="tab-all-mobile"
              aria-controls="tabpanel"
              aria-selected={filterType === "all"}
            >
              All
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              onClick={() => {
                setFilterType("active");
              }}
              className={`${
                filterType === "active"
                  ? "text-todo-primary-blue"
                  : "text-todo-neutral-light-400 hover:text-todo-neutral-light-500 dark:text-todo-neutral-dark-400 dark:hover:text-todo-neutral-dark-200"
              } text-[14px] font-bold tracking-[-.25px]`}
              role="tab"
              onKeyDown={onItemKeyDown}
              id="tab-active-mobile"
              aria-controls="tabpanel"
              aria-selected={filterType === "active"}
            >
              Active
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              onClick={() => {
                setFilterType("completed");
              }}
              className={`${
                filterType === "completed"
                  ? "text-todo-primary-blue"
                  : "text-todo-neutral-light-400 hover:text-todo-neutral-light-500 dark:text-todo-neutral-dark-400 dark:hover:text-todo-neutral-dark-200"
              } text-[14px] font-bold tracking-[-.25px]`}
              role="tab"
              onKeyDown={onItemKeyDown}
              id="tab-completed-mobile"
              aria-controls="tabpanel"
              aria-selected={filterType === "completed"}
            >
              Completed
            </button>
          </li>
        </ul>
        <p className="mt-10 w-full text-center text-[14px] tracking-[-.2px] text-todo-neutral-light-400 dark:text-todo-neutral-dark-400 lg:mt-[49px]">
          Drag and drop to reorder list
        </p>
      </form>
    </main>
  );
}

function Item({
  index,
  d,
  toggleCompleted,
  deleteItem,
}: {
  index: number;
  d: Data;
  toggleCompleted: (itemId: string) => void;
  deleteItem: (itemId: string) => void;
}) {
  const y = useMotionValue(0);
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={d}
      className={`group relative flex h-[53px] w-full items-center border-b border-b-todo-neutral-light-200 px-5 dark:border-b-todo-neutral-dark-500 lg:px-6 ${
        index === 0 ? "lg:h-[64px]" : "lg:h-[65px]"
      }`}
      style={{ y }}
      dragListener={false}
      dragControls={controls}
      aria-labelledby={`activity-${d.id}`}
    >
      <button
        type="button"
        aria-label={`Mark as ${d.completed ? "Active" : "Completed"}`}
        className={`flex h-5 w-5 items-center justify-center rounded-full lg:h-6 lg:w-6 ${
          d.completed
            ? "bg-gradient-to-br from-todo-primary-green to-todo-primary-violet"
            : "border border-todo-neutral-light-200 hover:border-transparent hover:[background:linear-gradient(white,white)_padding-box,linear-gradient(135deg,theme(colors.todo.primary.green),theme(colors.todo.primary.violet))_border-box] dark:border-todo-neutral-dark-500 dark:hover:border-transparent dark:hover:[background:linear-gradient(theme(colors.todo.neutral.dark.600),theme(colors.todo.neutral.dark.600))_padding-box,linear-gradient(135deg,theme(colors.todo.primary.green),theme(colors.todo.primary.violet))_border-box]"
        }`}
        onClick={() => {
          toggleCompleted(d.id);
        }}
      >
        {d.completed ? (
          <svg viewBox="0 0 11 9" className="h-2 lg:h-[9px]" role="none">
            <use href="/todo-app/images/icon-check.svg#icon-check" />
          </svg>
        ) : null}
      </button>
      <p
        onPointerDown={(e) => controls.start(e)}
        className={`ml-3 cursor-grab select-none pt-[2px] text-[12px] leading-none tracking-[-.2px] active:cursor-grabbing lg:ml-6 lg:pt-1 lg:text-[18px] ${
          d.completed
            ? "text-todo-neutral-light-300 line-through dark:text-todo-neutral-dark-400"
            : "text-todo-neutral-light-500 dark:text-todo-neutral-dark-200"
        }`}
        id={`activity-${d.id}`}
      >
        {d.activity}
      </p>
      <button
        type="button"
        className="ml-auto flex items-center justify-center rounded-full transition-all lg:invisible lg:group-hover:visible"
        onClick={() => {
          deleteItem(d.id);
        }}
      >
        <svg
          viewBox="0 0 18 18"
          className="w-[12px] fill-[#494C6B] hover:fill-todo-neutral-light-400 dark:hover:fill-todo-neutral-dark-200 lg:w-[18px]"
        >
          <title>Delete activity</title>
          <use href="/todo-app/images/icon-cross.svg#icon-cross" />
        </svg>
      </button>
    </Reorder.Item>
  );
}
