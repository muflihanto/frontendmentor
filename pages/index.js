import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import getPages from "../utils/getPages.js";
import { useMemo, useState, useEffect } from "react";
import { useDarkMode } from "usehooks-ts";

export async function getServerSideProps() {
  return {
    props: { ...getPages() },
  };
}

export default function Home({ pages }) {
  const [input, setInput] = useState("");
  const onChange = (e) => {
    setInput(e.target.value);
  };
  const filteredPages = useMemo(() => {
    if (!input) {
      return pages;
    } else {
      return pages.filter((page) => {
        return page.title.toLowerCase().includes(input.toLowerCase());
      });
    }
  }, [input, pages]);
  const { isDarkMode, toggle } = useDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div>
      <Head>
        <title>Home | Frontendmentor</title>
        <meta
          name="description"
          content="Frontendmentor Challenge Portofolio"
        />
      </Head>
      <main className="flex min-h-screen flex-1 flex-col items-center justify-start bg-white px-16 py-8 duration-300 dark:bg-sky-950 [&_a]:transition-all">
        <h1 className="text-center text-[36px] font-bold text-slate-950 dark:text-slate-50 lg:text-[3rem]">Muf&apos;s Frontendmentor Challenge Solution</h1>
        <input
          type="text"
          value={input}
          onChange={onChange}
          className="mt-4 w-full rounded-md border px-3 py-2 focus-visible:outline focus-visible:outline-sky-600 dark:border-sky-800 dark:bg-sky-900 dark:text-sky-100 dark:focus-visible:outline dark:focus-visible:outline-sky-700 lg:max-w-screen-sm"
          placeholder="Type here..."
        />
        <ul className="mx-auto mt-8 grid max-w-screen-md grid-cols-1 items-center gap-4 self-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredPages.map((page, index) => {
            return (
              <li key={index}>
                <Link
                  href={page.path}
                  className="mb-2 flex h-[180px] min-w-[180px] items-center justify-center rounded-xl bg-sky-600 p-5 text-center text-[18px] font-semibold text-white shadow-md hover:bg-sky-600/80 hover:underline hover:underline-offset-2 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:bg-sky-900"
                >
                  {page.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          className="fixed bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-md bg-sky-500 shadow transition-transform hover:bg-opacity-75 active:scale-95 dark:bg-sky-700 dark:hover:bg-opacity-75 lg:bottom-6 lg:right-8"
          onClick={() => {
            toggle();
          }}
        >
          <Image
            src={`/rest-countries-api-with-color-theme-switcher/images/${isDarkMode ? "moon.svg" : "moon-outline.svg"}`}
            alt="Moon"
            width={20}
            height={20}
          />
        </button>
      </main>
    </div>
  );
}
