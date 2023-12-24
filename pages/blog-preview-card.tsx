import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
import { figtree } from "../utils/fonts/figtree";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

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
        className={`App font-figtree relative min-h-[100svh] ${figtree.variable}`}
      >
        <Main />
        <Footer />
        <Slider basePath="/blog-preview-card/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
        Learning

        Published 21 Dec 2023
      `}
      <h1>HTML & CSS foundations</h1>
      {`
        These languages are the backbone of every website, defining structure, content, and presentation.
      
        Greg Hooper
      `}
    </>
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
