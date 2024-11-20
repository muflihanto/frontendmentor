import Head from "next/head";
import Image from "next/image";
import { figtree } from "../utils/fonts/figtree";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function BlogPreviewCard() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Blog preview card</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] font-figtree ${figtree.variable} flex flex-col items-center justify-center bg-blog-primary p-6`}
      >
        <Main />
        <Footer />
        {/* <Slider basePath="/blog-preview-card/design" active /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <main className="relative z-0 m-6 mt-[23px] flex min-h-[500px] w-full max-w-[384px] flex-col justify-start rounded-[20px] border-[1.5px] border-blog-neutral-300 bg-blog-neutral-100 p-[23px] font-medium text-blog-neutral-300 drop-shadow-[8.5px_8.5px_0px_rgb(0,0,0)] transition-all has-[a:focus]:drop-shadow-[16px_16px_0px_rgb(0,0,0)] has-[a:hover]:drop-shadow-[16px_16px_0px_rgb(0,0,0)] sm:mt-[22px] sm:min-h-[522px]">
      <header>
        <figure className="relative aspect-[278/200] w-full overflow-hidden rounded-xl sm:aspect-[336/201]">
          <Image
            fill
            src="/blog-preview-card/assets/images/illustration-article.svg"
            alt="Illustration Article"
            className="object-cover"
          />
        </figure>
      </header>
      <p className="mt-[23px] inline-block w-fit grow-0 rounded bg-blog-primary px-[12px] py-1 text-[12px] font-bold sm:px-[13px] sm:text-[14px]">
        Learning
      </p>
      <p className="mt-3 text-[12px] sm:text-[14px]">Published 21 Dec 2023</p>
      <h1 className="mt-[13px] text-xl font-extrabold sm:text-[24px]/[1.4]">
        <a
          href=""
          className="hover:text-blog-primary focus-visible:rounded focus-visible:text-blog-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
        >
          HTML & CSS foundations
        </a>
      </h1>
      <p className="mb-6 mt-[13px] text-[14px] text-blog-neutral-200 sm:mt-[14px] sm:text-base">
        These languages are the backbone of every website, defining structure,
        content, and presentation.
      </p>
      <div className="mt-auto flex items-center gap-3">
        <span className="relative size-8">
          <Image
            src="/blog-preview-card/assets/images/image-avatar.webp"
            alt="Greg Hooper Avatar"
            fill
          />
        </span>
        <span className="text-[14px] font-extrabold">Greg Hooper</span>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-blog-neutral-300 [&_a:focus]:drop-shadow-[3px_3px_0px_rgb(255,255,255)] [&_a:hover]:drop-shadow-[3px_3px_0px_rgb(255,255,255)] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a href="https://github.com/muflihanto" target="_blank" rel="noreferrer">
        Muflihanto
      </a>
      .
    </footer>
  );
}
