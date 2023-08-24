import Head from "next/head";
import Image from "next/image";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { ComponentProps, useEffect, useRef } from "react";
import { cn } from "../utils/cn";
import { twJoin } from "tailwind-merge";
import { useEffectOnce } from "usehooks-ts";
import ClientOnly from "../components/ClientOnly";
import { atomWithStorage } from "jotai/utils";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

/**
 * TODO:
 * Your users should be able to:
 * - View the optimal layout for the game depending on their device's screen size
 * - Play Rock, Paper, Scissors against the computer
 * - Maintain the state of the score after refreshing the browser _(optional)_
 * - **Bonus**: Play Rock, Paper, Scissors, Lizard, Spock against the computer _(optional)_
 *
 * ### Rules
 * If the player wins, they gain 1 point. If the computer wins, the player loses one point.
 */

const rulesAtom = atom(false);
const scoreAtom = atomWithStorage("rps_score", 12);
const winAtom = atom<boolean | undefined>(undefined);
const choiceAtom = atom<ChoiceVariant | null>(null);
const houseAtom = atom<ChoiceVariant | null>(null);
const stepsAtom = atom<1 | 2 | 3 | 4>(1);

export default function RockPaperScissors() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Rock, Paper, Scissors</title>
      </Head>
      <div className="App font-barlow-semi-condensed from-rock-paper-scissor-background-100 to-rock-paper-scissor-background-200 relative min-h-[100svh] bg-gradient-to-b to-[130%] font-semibold lg:bg-[radial-gradient(circle_at_top,var(--tw-gradient-from),var(--tw-gradient-to))] lg:to-[100%]">
        <Main />
        <Footer />
        {/* <Slider
          // absolutePath="/rock-paper-scissors/design/original/mobile-rules-modal.jpg"
          absolutePath="/rock-paper-scissors/design/original/desktop-step-1.jpg"
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
        className="mt-auto h-[42px] w-[130px] rounded-[10px] border-2 border-white/50 uppercase tracking-[2.5px] text-white hover:border-white lg:absolute lg:bottom-[31px] lg:right-[31px]"
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
  const score = useAtomValue(scoreAtom);

  return (
    <div className="border-rock-paper-scissor-neutral-header flex h-[99px] w-full max-w-[702px] items-center justify-between rounded border-[3px] pl-[21px] pr-[10px] lg:h-[152px] lg:rounded-[16px] lg:pl-[28px] lg:pr-[22px]">
      <div className="relative mt-1 aspect-[162/99] h-[51px] lg:mt-[3px] lg:h-[99px]">
        <Image
          src="/rock-paper-scissors/images/logo.svg"
          alt="Rock Paper Scissors Logo"
          fill
        />
      </div>
      <div className="flex h-[72px] w-[80px] flex-col items-center rounded bg-white pt-[11px] shadow lg:h-[114px] lg:w-[150px] lg:justify-center lg:rounded-lg lg:pt-[2px]">
        <h4 className="text-rock-paper-scissor-neutral-score text-[10px] uppercase leading-none tracking-[1.5px] lg:text-[16px] lg:tracking-[2.5px]">score</h4>
        <h2 className="mt-px w-min text-center text-[40px] font-bold uppercase leading-none text-[hsl(246,11%,37%)] lg:mt-[2px] lg:text-[64px]">{score}</h2>
      </div>
    </div>
  );
}

const options = ["Rock", "Paper", "Scissors"] as const;
type ChoiceVariant = (typeof options)[number];
const weapons: Record<ChoiceVariant, { weakTo: ChoiceVariant; strongTo: ChoiceVariant }> = {
  Rock: { weakTo: "Paper", strongTo: "Scissors" },
  Paper: { weakTo: "Scissors", strongTo: "Rock" },
  Scissors: { weakTo: "Rock", strongTo: "Paper" },
};
type VariantStyles = Record<ChoiceVariant, { button: string; image: string }>;
type ChoiceButtonProps = ComponentProps<"button"> & { variant: ChoiceVariant };
function ChoiceButton({ variant, disabled = false, ...props }: ChoiceButtonProps) {
  const variantStyles: VariantStyles = {
    Paper: {
      button: "from-rock-paper-scissor-primary-paper-100 to-rock-paper-scissor-primary-paper-200 border-b-[hsl(229,66%,46%)]",
      image: "mr-0.5 aspect-[49/59] w-[44px] lg:w-[67px]",
    },
    Scissors: {
      button: "from-rock-paper-scissor-primary-scissor-100 to-rock-paper-scissor-primary-scissor-200 border-b-[hsl(28,78%,44%)]",
      image: "mr-1 aspect-[51/58] w-[45px] lg:mr-[9px] lg:w-[69px]",
    },
    Rock: {
      button: "from-rock-paper-scissor-primary-rock-100 to-rock-paper-scissor-primary-rock-200 border-b-[hsl(347,74%,35%)]",
      image: "mr-0 aspect-square w-[43px] lg:mt-[2px] lg:w-[66px]",
    },
  };
  return (
    <button
      className={twJoin(
        cn([
          "group relative flex h-[133px] w-[129px] origin-center items-center justify-center rounded-full bg-gradient-to-t pt-[3px] shadow-lg transition-transform duration-75", // base
          "lg:h-[203px] lg:w-[198px] lg:pt-1", //large
          disabled ? "cursor-default" : "active:scale-[97%]", // disabled
          variantStyles[variant].button, // variant
        ]),
        "border-b-[6px] lg:border-b-[9px]"
      )}
      {...props}
    >
      <div className="flex aspect-square w-[99px] flex-col items-center justify-center rounded-full border-t-[6px] border-t-[#BBBDDD] bg-[hsl(0,0%,91%)] lg:w-[152px] lg:border-t-[8px]">
        <div
          className={cn([
            "relative", // base
            !disabled && "group-hover:opacity-75", // disabled
            variantStyles[variant].image, // variant
          ])}
        >
          <Image
            src={`/rock-paper-scissors/images/icon-${variant.toLowerCase()}.svg`}
            alt={`${variant} Icon`}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </button>
  );
}

function Choices() {
  const setChoice = useSetAtom(choiceAtom);
  const setStep = useSetAtom(stepsAtom);

  const handleClick = (cv: ChoiceVariant) => {
    setChoice(cv);
    setStep(2);
  };

  return (
    <div className="relative mt-[100px] w-[311px] lg:mt-[60px] lg:w-[477px]">
      <div className="relative z-10 flex flex-col items-center gap-4 pt-[3px] lg:gap-6">
        <div className="flex w-full items-center justify-between">
          <ChoiceButton
            variant="Paper"
            onClick={() => handleClick("Paper")}
          />
          <ChoiceButton
            variant="Scissors"
            onClick={() => {
              handleClick("Scissors");
            }}
          />
        </div>
        <ChoiceButton
          variant="Rock"
          onClick={() => {
            handleClick("Rock");
          }}
        />
      </div>

      <svg
        className="absolute left-1/2 top-[61px] w-[calc(375px-170px)] -translate-x-1/2 stroke-[27] lg:left-[calc(50%+4px)] lg:top-[94px] lg:w-[313px] lg:stroke-[16px]"
        viewBox="0 0 313 278"
      >
        <use href="/rock-paper-scissors/images/bg-triangle.svg#bg-triangle" />
      </svg>
    </div>
  );
}

function WaitForHouse() {
  const setStep = useSetAtom(stepsAtom);
  const [choice, setChoice] = useAtom(choiceAtom);
  const setScore = useSetAtom(scoreAtom);
  const [house, setHouse] = useAtom(houseAtom);
  const [win, setWin] = useAtom(winAtom);
  const optRef = useRef<ChoiceVariant | undefined>(undefined); // debug only
  const winStyle = "relative before:absolute before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2 before:aspect-[137/133] before:w-[129px] before:rounded-full before:shadow-[0_0_0_19px_hsla(0,0%,100%,.02),0_0_0_46px_hsla(0,0%,100%,.03),0_0_0_80px_hsla(0,0%,100%,.025)] z-0";

  const getRandomHouse = (draw: ChoiceVariant) => {
    if (optRef.current !== undefined) return optRef.current; // debug only
    const getRandOptions = () => Math.floor(Math.random() * 3);
    let res = draw;
    while (res === draw) {
      res = options[getRandOptions()];
    }
    optRef.current = res; // debug only
    return res;
  };

  useEffectOnce(() => {
    if (!!choice) {
      setTimeout(() => {
        const opt = getRandomHouse(choice);
        if (weapons[choice].strongTo === opt) {
          setWin(true);
          setScore((s) => s + 1);
        } else {
          setWin(false);
          setScore((s) => s - 1);
        }
        setHouse(opt);
      }, 1000);
    }
  });

  return (
    <>
      <div className="relative mt-[97.5px] flex w-[316px] items-center justify-between text-white">
        <div className="flex flex-col items-center">
          {!!choice ? (
            <div
              className={cn([
                "animate-in fade-in-5", //
                !!win ? winStyle : "relative z-10",
              ])}
            >
              <ChoiceButton
                variant={choice!}
                disabled
              />
            </div>
          ) : (
            <div className="aspect-square w-[110px] animate-pulse rounded-full bg-black/10" />
          )}
          <p className="mt-5 font-bold uppercase tracking-[1.5px]">you picked</p>
        </div>
        <div className="-mr-[14px] flex w-[50%] flex-col items-center">
          <div className="flex h-[133px] items-center justify-center">
            {!!house ? (
              <div
                className={cn([
                  "animate-in fade-in-5", //
                  win === false ? winStyle : "relative z-10",
                ])}
              >
                <ChoiceButton
                  variant={house!}
                  disabled
                />
              </div>
            ) : (
              <div className="aspect-square w-[110px] animate-pulse rounded-full bg-black/10" />
            )}
          </div>
          <p className="mt-5 font-bold uppercase tracking-[1.5px]">the house picked</p>
        </div>
      </div>
      {win !== undefined ? (
        <div className="mt-[72px] flex flex-col items-center">
          <h1 className="text-[56px] font-bold uppercase leading-none tracking-[.01px] text-white">you {win ? "win" : "lose"}</h1>
          <button
            className="text-rock-paper-scissor-neutral-dark mt-[22px] flex h-12 w-[220px] items-center justify-center rounded-lg bg-white uppercase tracking-[2.5px] shadow"
            onClick={() => {
              optRef.current = undefined; // debug only
              setChoice(null);
              setWin(undefined);
              setHouse(null);
              setStep(1);
            }}
          >
            play again
          </button>
        </div>
      ) : null}
    </>
  );
}

function Main() {
  const step = useAtomValue(stepsAtom);

  return (
    <div className="flex min-h-screen flex-col items-center px-[31px] pb-[55px] pt-[30.5px] lg:pt-[47px]">
      <ClientOnly>
        <Header />
      </ClientOnly>
      {step === 1 ? <Choices /> : <WaitForHouse />}
      <RulesModal />
    </div>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-white [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
