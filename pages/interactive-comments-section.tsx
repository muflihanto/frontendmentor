import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });
import data from "../public/interactive-comments-section/data.json";

export default function InteractiveCommentsSection() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Interactive comments section</title>
      </Head>
      <div className="App font-rubik relative min-h-[100svh]">
        <Main />
        <Footer />
        <Slider basePath="/interactive-comments-section/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
         
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
      <a
        href="https://github.com/muflihanto"
        target="_blank"
        rel="noreferrer"
      >
        Muflihanto
      </a>
      .
    </footer>
  );
}
