import { ThemeProvider, useTheme } from "next-themes";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ChangeEvent } from "react";
import { useIsClient } from "usehooks-ts";
import pages from "../docs/data.json";

// import getPages from "../utils/getPages";
// import type { InferGetServerSidePropsType } from "next";

// eslint-disable-next-line @typescript-eslint/require-await
// export async function getServerSideProps() {
//   return {
//     props: { ...getPages() },
//   };
// }

// export default function Home({
//   pages,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
export function Home() {
  const [input, setInput] = useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const filteredPages = useMemo(() => {
    if (!input) return pages;
    return pages.filter((page) => {
      return page.name.toLowerCase().includes(input.toLowerCase());
    });
  }, [input]);
  // }, [input, pages]);
  const { setTheme, resolvedTheme } = useTheme();
  const isClient = useIsClient();

  const iconProps = useMemo(() => {
    const alt = `Moon${
      resolvedTheme !== "dark" || !isClient ? " Outline" : ""
    }`;
    const name = alt.toLowerCase().split(" ").join("-");
    const src = `/rest-countries-api-with-color-theme-switcher/images/${name}.svg`;
    return { src, alt };
  }, [resolvedTheme, isClient]);

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
        <h1 className="text-center text-[36px] font-bold text-slate-950 dark:text-slate-50 lg:text-[3rem]">
          Muf&apos;s Frontendmentor Challenge Solution
        </h1>
        <input
          type="text"
          value={input}
          onChange={onChange}
          className="mt-4 w-full rounded-md border px-3 py-2 focus-visible:outline focus-visible:outline-sky-600 dark:border-sky-800 dark:bg-sky-900 dark:text-sky-100 dark:focus-visible:outline dark:focus-visible:outline-sky-700 lg:max-w-screen-sm"
          placeholder="Type here..."
        />
        <ul className="mx-auto mt-8 grid max-w-screen-lg grid-cols-1 items-center gap-4 self-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {filteredPages.map((page) => {
            return (
              <li key={page.name}>
                <div className="mb-2 flex h-[480px] min-w-[180px] flex-col gap-2 overflow-hidden rounded-xl bg-sky-600 text-center text-white shadow-lg shadow-sky-950/20 focus-within:outline focus-within:outline-offset-2 focus-within:outline-sky-500 dark:bg-sky-900">
                  <Link className="h-[240px] group" href={page.path}>
                    <div className="h-full w-full overflow-hidden relative">
                      <div className="w-full h-14 bg-transparent bg-gradient-to-b from-slate-800/10 group-hover:from-slate-800/20 to-transparent transition-all duration-1000 top-0 left-0 absolute z-10" />
                      <Image
                        src={page["preview-src"]}
                        alt={page.name}
                        className="group-hover:scale-110 transition-all duration-300"
                        fill
                      />
                    </div>
                  </Link>
                  <div className="flex flex-col gap-2 p-5">
                    <Link
                      href={page.path}
                      className="text-left text-xl font-semibold hover:underline hover:underline-offset-2"
                    >
                      {page.name}
                    </Link>
                    <p className="block self-start text-left">
                      {page.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <button
          className="fixed bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-md bg-sky-500 shadow transition-transform hover:bg-opacity-75 active:scale-95 dark:bg-sky-700 dark:hover:bg-opacity-75 lg:bottom-6 lg:right-8"
          onClick={() => {
            setTheme(resolvedTheme === "dark" ? "light" : "dark");
          }}
          type="button"
        >
          <Image
            src={iconProps.src}
            alt={iconProps.alt}
            width={20}
            height={20}
          />
        </button>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <ThemeProvider disableTransitionOnChange attribute="class" enableSystem>
      <Home />
    </ThemeProvider>
  );
}
