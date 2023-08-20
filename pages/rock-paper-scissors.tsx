import Head from "next/head";
// import Image from "next/image";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function RockPaperScissors() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Rock, Paper, Scissors</title>
      </Head>
      <div className="App font-barlow-semi-condensed relative min-h-[100svh] font-semibold">
        <Main />
        <Footer />
        {/* <Slider absolutePath="/rock-paper-scissors/design/original/mobile-rules-modal.jpg" /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {/* {`
         Score
         Rules
       
         You Picked
         The House Picked
       
         You Win
         You Lose
       
         Play Again
      `} */}
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
