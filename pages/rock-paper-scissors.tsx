import Head from "next/head";
import Image from "next/image";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const rulesAtom = atom(false);
const scoreAtom = atom(12);

export default function RockPaperScissors() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Rock, Paper, Scissors</title>
      </Head>
      <div className="App font-barlow-semi-condensed from-rock-paper-scissor-background-100 to-rock-paper-scissor-background-200 relative min-h-[100svh] bg-gradient-to-b to-[130%] font-semibold">
        <Main />
        <RulesModal />
        <Footer />
        {/* <Slider
          // absolutePath="/rock-paper-scissors/design/original/mobile-rules-modal.jpg"
          absolutePath="/rock-paper-scissors/design/original/mobile-step-1.jpg"
          // absolutePath="/rock-paper-scissors/design/original/desktop-rules-modal.jpg"
        /> */}
      </div>
    </>
  );
}

function RulesModal() {
  const [open, setOpen] = useAtom(rulesAtom);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <>
      <button
        className="absolute bottom-[55px] left-1/2 h-[42px] w-[130px] -translate-x-1/2 rounded-[10px] border-2 border-opacity-50 uppercase tracking-[2.5px] text-white"
        onClick={() => {
          setOpen(true);
        }}
      >
        rules
      </button>

      {open ? (
        <div className="fixed left-0 top-0 z-20 h-screen w-screen bg-transparent md:bg-black/50">
          <div className="absolute flex h-full w-full flex-col items-center bg-white pb-[64px] pt-[88px] md:left-1/2 md:top-1/2 md:h-[415px] md:w-[400px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:p-8 md:pt-[33px]">
            <h1 className="text-rock-paper-scissor-neutral-dark text-[31px] font-bold uppercase tracking-[.5px] md:self-start md:leading-none">rules</h1>
            <svg
              className="mt-[105px] w-[304px] md:mt-12"
              viewBox="0 0 304 270"
            >
              <use href="/rock-paper-scissors/images/image-rules.svg#rules-image" />
            </svg>
            <button
              className="relative mt-auto aspect-square w-5 md:absolute md:right-[31px] md:top-[38px]"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Image
                fill
                src="/rock-paper-scissors/images/icon-close.svg"
                alt="Close Button"
              />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Header() {
  const [score, setScore] = useAtom(scoreAtom);

  return (
    <div className="border-rock-paper-scissor-neutral-header flex h-[99px] w-full items-center justify-between rounded border-[3px] pl-[21px] pr-[10px]">
      <div className="relative mt-1 aspect-[162/99] h-[51px]">
        <Image
          src="/rock-paper-scissors/images/logo.svg"
          alt="Rock Paper Scissors Logo"
          fill
        />
      </div>
      <div className="flex h-[72px] w-[80px] flex-col items-center rounded bg-white pt-[11px] shadow">
        <h4 className="text-rock-paper-scissor-neutral-score text-[10px] uppercase leading-none tracking-[1.5px]">score</h4>
        <h2 className="mt-px w-min text-center text-[40px] font-bold uppercase leading-none text-[hsl(246,11%,37%)]">{score}</h2>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="px-[31px] pt-[30.5px]">
      <Header />
      {/* {`
         Score
         Rules
       
         You Picked
         The House Picked
       
         You Win
         You Lose
       
         Play Again
      `} */}
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
