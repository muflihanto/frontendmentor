import { motion, useDragControls, useMotionValue } from "framer-motion";
// import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDarkMode } from "usehooks-ts";
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
    <header className="relative flex items-center justify-center px-[24px]">
      <div className="flex w-full max-w-[540px] items-center justify-between">
        <h1 className="pl-[1px] text-[26px] font-bold uppercase leading-[32px] tracking-[10.25px] text-todo-neutral-light-100 dark:leading-[31.5px] lg:pl-0 lg:text-[40px] lg:leading-none lg:tracking-[15px] lg:dark:leading-none">
          TODO
        </h1>
        <motion.button
          onClick={() => {
            toggle();
          }}
        >
          {isDarkMode ? (
            <svg
              viewBox="0 0 26 26"
              className="mb-[6px] w-[20px] lg:-mr-[1px] lg:mb-0 lg:w-[26px] lg:-translate-y-[5px]"
            >
              <title>Light Mode</title>
              <use href="/todo-app/images/icon-sun.svg#icon-sun" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 26 26"
              className="mb-[4px] w-[20px] lg:mb-0 lg:w-[26px] lg:-translate-y-[4px]"
            >
              <title>Dark Mode</title>
              <use href="/todo-app/images/icon-moon.svg#icon-moon" />
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
  const [filterType, setFilterType] = useState<"all" | "active" | "completed">(
    "all",
  );
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
      <label htmlFor="input" className="relative w-full max-w-[540px]">
        <div className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border dark:border-todo-neutral-dark-500 lg:left-6 lg:h-6 lg:w-6" />
        <input
          {...register("input")}
          type="text"
          className="h-12 w-full rounded-md bg-todo-neutral-light-100 px-5 pl-[52px] pt-[2px] text-[12px] leading-none tracking-[-.25px] text-todo-neutral-light-500 caret-todo-primary-blue shadow-lg shadow-todo-neutral-light-300/25 focus-visible:outline focus-visible:outline-transparent dark:bg-todo-neutral-dark-600 dark:text-todo-neutral-dark-200 dark:shadow-black/25 dark:placeholder:opacity-70 lg:h-16 lg:pl-[72px] lg:pt-[4px] lg:text-[18px] lg:shadow-[0px_20px_20px_var(--tw-shadow-colored)]"
          placeholder="Create a new todo..."
        />
      </label>
      <Reorder.Group
        axis="y"
        values={data}
        onReorder={(newOrder) => {
          if (filterType === "all") {
            setData(newOrder);
          }
        }}
        className="relative mt-4 w-full max-w-[540px] rounded-md bg-white shadow-lg shadow-todo-neutral-light-300/75 dark:bg-todo-neutral-dark-600 dark:shadow-black/50 lg:mt-6 lg:shadow-[0px_40px_10px_-20px_var(--tw-shadow-colored),0px_25px_25px_20px_var(--tw-shadow-colored)] lg:shadow-black/[.025] lg:dark:shadow-black/[.15]"
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
        <div className="flex h-[50px] items-center justify-between px-5 pb-[2px] text-[12px] tracking-[-.2px] text-todo-neutral-light-400 dark:text-todo-neutral-dark-400 lg:grid lg:grid-cols-3 lg:px-6 lg:pt-[5px] lg:text-[14px]">
          <p className="lg:text-left">{`${
            data.filter((d) => !d.completed).length
          } items left`}</p>
          <div className="flex gap-5 max-lg:hidden">
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
            >
              All
            </button>
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
            >
              Active
            </button>
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
            >
              Completed
            </button>
          </div>
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
      </Reorder.Group>
      <div className="mt-4 flex h-[48px] w-full max-w-[540px] items-center justify-center gap-[20px] rounded-md bg-white pt-1 shadow-lg shadow-todo-neutral-light-300/25 dark:bg-todo-neutral-dark-600 dark:shadow-[0px_5px_10px_rgba(0,0,0,.2),0px_50px_15px_-10px_rgba(0,0,0,.125)] lg:hidden">
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
        >
          All
        </button>
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
        >
          Active
        </button>
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
        >
          Completed
        </button>
      </div>
      <p className="mt-10 w-full text-center text-[14px] tracking-[-.2px] text-todo-neutral-light-400 dark:text-todo-neutral-dark-400 lg:mt-[49px]">
        Drag and drop to reorder list
      </p>
    </form>
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
  toggleCompleted: (itemIndex: number) => void;
  deleteItem: (itemIndex: number) => void;
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
    >
      <button
        type="button"
        className={`flex h-5 w-5 items-center justify-center rounded-full lg:h-6 lg:w-6 ${
          d.completed
            ? "bg-gradient-to-br from-todo-primary-green to-todo-primary-violet"
            : "border border-todo-neutral-light-200 hover:border-transparent hover:[background:linear-gradient(white,white)_padding-box,linear-gradient(135deg,theme(colors.todo.primary.green),theme(colors.todo.primary.violet))_border-box] dark:border-todo-neutral-dark-500 dark:hover:border-transparent dark:hover:[background:linear-gradient(theme(colors.todo.neutral.dark.600),theme(colors.todo.neutral.dark.600))_padding-box,linear-gradient(135deg,theme(colors.todo.primary.green),theme(colors.todo.primary.violet))_border-box]"
        }`}
        onClick={() => {
          toggleCompleted(index);
        }}
      >
        {d.completed ? (
          <svg viewBox="0 0 11 9" className="h-2 lg:h-[9px]">
            <title>Check</title>
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
      >
        {d.activity}
      </p>
      <button
        type="button"
        className="ml-auto flex items-center justify-center rounded-full transition-all lg:invisible lg:group-hover:visible"
        onClick={() => {
          deleteItem(index);
        }}
      >
        <svg
          viewBox="0 0 18 18"
          className="w-[12px] fill-[#494C6B] hover:fill-todo-neutral-light-400 dark:hover:fill-todo-neutral-dark-200 lg:w-[18px]"
        >
          <title>Cross</title>
          <use href="/todo-app/images/icon-cross.svg#icon-cross" />
        </svg>
      </button>
    </Reorder.Item>
  );
}
