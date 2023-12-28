import Head from "next/head";
import Image from "next/image";
import { figtree } from "../utils/fonts/figtree";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

/**
 * TODO: Your users should be able to:
 * - See hover and focus states for all interactive elements on the page
 */

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
        {/* <Slider basePath="/blog-preview-card/design" /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <div className="bg relative z-0 flex min-h-full w-full max-w-[384px] flex-col justify-start gap-4 rounded-3xl border border-blog-neutral-300 bg-blog-neutral-100 p-6 drop-shadow-[8px_8px_0px_rgb(0,0,0)]">
      <header>
        <figure className="relative aspect-[336/201] w-full overflow-hidden rounded-lg">
          <Image
            fill
            src="/blog-preview-card/assets/images/illustration-article.svg"
            alt="Illustration Article"
          />
        </figure>
      </header>
      {`
        Learning

        Published 21 Dec 2023
      `}
      <h1>HTML & CSS foundations</h1>
      {`
        These languages are the backbone of every website, defining structure, content, and presentation.
      
        Greg Hooper
      `}
    </div>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
