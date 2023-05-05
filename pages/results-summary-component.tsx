import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function ResultsSummaryComponent() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Results summary component</title>
      </Head>
      <div className="App font-hanken-grotesk relative min-h-[100svh]">
        <Main />
        <Footer />
        <Slider basePath="/results-summary-component/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
         Your Result
         76
         of 100
       
         Great
         You scored higher than 65% of the people who have taken these tests.
         
         Summary
       
         Reaction
         80 / 100
       
         Memory
         92 / 100
       
         Verbal
         61 / 100
       
         Visual
         72 / 100
       
         Continue
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
