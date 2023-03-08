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
      <main className="flex min-h-screen flex-1 flex-col items-center justify-center px-16 py-8">
        <h1 className="text-center text-[36px] font-bold lg:text-[3rem]">Muf&apos;s Frontendmentor Challenge Solution</h1>
        <ul className="mx-auto mt-8 grid max-w-screen-md grid-cols-1 items-center gap-4 self-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paths.map((path, index) => {
            return (
              <li key={index}>
                <Link
                  href={path}
                  className="mb-2 flex h-[180px] min-w-[180px] items-center justify-center rounded-xl bg-sky-600 p-5 text-center text-[18px] font-semibold text-white shadow-md hover:bg-sky-600/80 hover:underline hover:underline-offset-2 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-sky-500"
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
