import Head from "next/head";
import Link from "next/link.js";
import getPages from "../utils/getPages.js";

export async function getServerSideProps() {
  return {
    props: { ...getPages() },
  };
}

export default function Home({ paths, titles }) {
  return (
    <div>
      <Head>
        <title>Home | Frontendmentor</title>
        <meta
          name="description"
          content="Frontendmentor Challenge Portofolio"
        />
      </Head>
      <main className="flex flex-col items-center justify-center flex-1 min-h-screen px-16 py-8">
        <h1 className="text-[3rem] text-center font-bold">Muf&apos;s Frontendmentor Challenge Solution</h1>
        <ul className="grid items-center self-start max-w-screen-md grid-cols-4 gap-4 mx-auto mt-8">
          {paths.map((path, index) => {
            return (
              <li
                key={index}
                className="mb-2 font-semibold text-center bg-sky-600 hover:bg-sky-600/80 rounded-xl p-5 hover:cursor-pointer text-white hover:underline h-[180px] flex justify-center items-center hover:underline-offset-2 shadow-md text-[18px]"
              >
                <Link
                  href={path}
                  className="focus-visible:outline-none"
                >
                  {titles[index]}
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
