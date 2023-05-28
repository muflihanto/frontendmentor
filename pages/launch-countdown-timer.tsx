import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function LaunchCountdownTimer() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Launch countdown timer</title>
      </Head>
      <div className="App [&_*]:font-red-hat-text relative min-h-[100svh]">
        <Main />
        <Footer />
        <Slider basePath="/launch-countdown-timer/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
        We're launching soon

        Days
        Hours
        Minutes
        Seconds
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
