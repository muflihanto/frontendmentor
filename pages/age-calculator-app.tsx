import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function AgeCalculatorApp() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Age calculator app</title>
      </Head>
      <div className="App relative min-h-[100svh]">
        <Main />
        <Footer />
        <Slider basePath="/age-calculator-app/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
        Day
        DD
      
        Month
        MM
      
        Year
        YYYY
      
        -- years
        -- months
        -- days
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
