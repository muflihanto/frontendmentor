import Head from "next/head";
import Image from "next/image";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { type ComponentProps, useEffect, useRef } from "react";
import { cn } from "../utils/cn";
import { twJoin } from "tailwind-merge";
import { useEffectOnce } from "usehooks-ts";
import ClientOnly from "../components/ClientOnly";
import { atomWithStorage } from "jotai/utils";
import { barlowSemiCondensed } from "../utils/fonts/barlowSemiCondensed";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

/**
 * TODO:
 * Your users should be able to:
 * - View the optimal layout for the game depending on their device's screen size
 */

const rulesAtom = atom(false);
const scoreAtom = atomWithStorage("rps_score", 12);
const winAtom = atom<boolean | undefined>(undefined);
const choiceAtom = atom<ChoiceVariant | null>(null);
const houseAtom = atom<ChoiceVariant | null>(null);
const stepsAtom = atom<1 | 2 | 3 | 4>(1);
// const choiceAtom = atom<ChoiceVariant | null>("Scissors");
// const houseAtom = atom<ChoiceVariant | null>("Spock");
// const stepsAtom = atom<1 | 2 | 3 | 4>(2);
// const winAtom = atom<boolean | undefined>(true);

export default function RockPaperScissors() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Rock, Paper, Scissors, Lizard, Spock</title>
      </Head>
      <div
        className={`App relative min-h-[750px] bg-gradient-to-b from-rock-paper-scissor-background-100 to-rock-paper-scissor-background-200 to-[130%] font-barlow-semi-condensed font-semibold lg:min-h-[100svh] lg:bg-[radial-gradient(circle_at_top,var(--tw-gradient-from),var(--tw-gradient-to))] lg:to-[100%] ${barlowSemiCondensed.variable}`}
      >
        <Main />
        <Footer />
        {/* <Slider
          // absolutePath="/rock-paper-scissors/design/original/mobile-rules-modal.jpg"
          absolutePath="/rock-paper-scissors/design/bonus/desktop-rules-modal-bonus.jpg"
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
    <section className="contents" aria-label="Rules modal">
      <button
        className="absolute mt-auto h-[42px] w-[130px] rounded-[10px] border-2 border-white/50 uppercase tracking-[2.5px] text-white hover:border-white max-lg:bottom-[55px] max-lg:left-1/2 max-lg:-translate-x-1/2 lg:bottom-[31px] lg:right-[31px]"
        onClick={() => {
          setOpen(true);
        }}
        type="button"
      >
        rules
      </button>

      {open ? (
        <div className="fixed left-0 top-0 z-20 h-screen w-screen bg-transparent md:bg-black/50">
          <div className="absolute flex h-full w-full flex-col items-center bg-white pb-[64px] pt-[88px] md:left-1/2 md:top-1/2 md:h-[461px] md:w-[400px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-lg md:p-8 md:pt-[33px] md:shadow-md">
            <h2 className="text-[31px] font-bold uppercase tracking-[.5px] text-rock-paper-scissor-neutral-dark md:self-start md:leading-none">
              rules
            </h2>
            <svg
              className="mt-[88.5px] w-[313px] max-md:ml-1 md:ml-1 md:mt-5 md:w-[340px]"
              viewBox="0 0 340 330"
            >
              <title>Rules Bonus</title>
              <use href="/rock-paper-scissors/images/image-rules-bonus.svg#rules-image-bonus" />
            </svg>
            <button
              className="relative mt-auto aspect-square w-5 md:absolute md:right-[31px] md:top-[38px]"
              onClick={() => {
                setOpen(false);
              }}
              type="button"
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
    </section>
  );
}

function Header() {
  const score = useAtomValue(scoreAtom);

  return (
    <header className="flex h-[99px] w-full max-w-[702px] items-center justify-between rounded border-[3px] border-rock-paper-scissor-neutral-header pl-[21px] pr-[10px] lg:h-[152px] lg:rounded-[16px] lg:pl-[28px] lg:pr-[22px]">
      <div className="relative mt-[3px] aspect-[115/114] h-[51px] lg:mt-[7.5px] lg:h-[114px]">
        <Image
          src="/rock-paper-scissors/images/logo-bonus.svg"
          alt="Rock Paper Scissors Lizard Spock Logo"
          fill
        />
      </div>
      <h2 className="flex h-[72px] w-[80px] flex-col items-center rounded bg-white pt-[11px] shadow lg:h-[114px] lg:w-[150px] lg:justify-center lg:rounded-lg lg:pt-[2px]">
        <p className="text-[10px] uppercase leading-none tracking-[1.5px] text-rock-paper-scissor-neutral-score lg:text-[16px] lg:tracking-[2.5px]">
          score
        </p>
        <p className="mt-px w-min text-center text-[40px] font-bold uppercase leading-none text-[hsl(246,11%,37%)] lg:mt-[2px] lg:text-[64px]">
          {score}
        </p>
      </h2>
    </header>
  );
}

const options = ["Rock", "Paper", "Scissors", "Lizard", "Spock"] as const;
type ChoiceVariant = (typeof options)[number];
const weapons: Record<
  ChoiceVariant,
  { weakTo: ChoiceVariant[]; strongTo: ChoiceVariant[] }
> = {
  Rock: { weakTo: ["Paper", "Spock"], strongTo: ["Scissors", "Lizard"] },
  Paper: { weakTo: ["Scissors", "Lizard"], strongTo: ["Rock", "Spock"] },
  Scissors: { weakTo: ["Rock", "Spock"], strongTo: ["Paper", "Lizard"] },
  Lizard: { weakTo: ["Rock", "Scissors"], strongTo: ["Paper", "Spock"] },
  Spock: { weakTo: ["Paper", "Lizard"], strongTo: ["Scissors", "Rock"] },
};
type VariantStyles = Record<
  ChoiceVariant,
  { button: string; image: string; imageDisabled: string }
>;
type ChoiceButtonProps = ComponentProps<"button"> & { variant: ChoiceVariant };
function ChoiceButton({
  variant,
  disabled = false,
  className,
  ...props
}: ChoiceButtonProps) {
  const variantStyles: VariantStyles = {
    Paper: {
      button:
        "from-rock-paper-scissor-primary-paper-100 to-rock-paper-scissor-primary-paper-200 border-b-[hsl(229,66%,46%)]",
      image: "mr-px aspect-[49/59] w-[32px] lg:w-[49px]",
      imageDisabled: "lg:w-[98px] lg:mr-1 w-[44px] mr-0.5",
    },
    Scissors: {
      button:
        "from-rock-paper-scissor-primary-scissor-100 to-rock-paper-scissor-primary-scissor-200 border-b-[hsl(28,78%,44%)]",
      image:
        "mr-[3px] aspect-[51/58] w-[33px] lg:mr-[5px] lg:mb-px lg:w-[51px]",
      imageDisabled: "lg:w-[103px] lg:mr-[10px] lg:mb-0.5 mr-[5px] w-[46px]",
    },
    Rock: {
      button:
        "from-rock-paper-scissor-primary-rock-100 to-rock-paper-scissor-primary-rock-200 border-b-[hsl(347,74%,35%)]",
      image: "mr-0 aspect-square w-[31.5px] lg:mt-[0px] lg:w-[48px]",
      imageDisabled: "lg:w-[97px] lg:-mr-[3px] mr-0 w-[43px]",
    },
    Lizard: {
      button:
        "from-rock-paper-scissor-primary-lizard-100 to-rock-paper-scissor-primary-lizard-200 border-b-[hsl(261,52%,44%)]",
      image: "mr-0 aspect-square mb-px w-[41px] lg:mt-[0px] lg:w-[63px]",
      imageDisabled: "lg:w-[97px] lg:-mr-[3px] w-[56px]",
    },
    Spock: {
      button:
        "from-rock-paper-scissor-primary-cyan-100 to-rock-paper-scissor-primary-cyan-200 border-b-[hsl(194,60%,42%)]",
      image:
        "ml-1 mb-0.5 aspect-square w-[39px] lg:ml-[5px] lg:mt-[-2px] lg:w-[58px]",
      imageDisabled: "lg:w-[120px] lg:-mr-[8px] lg:mb-[6px] -mr-0.5 w-[53px]",
    },
  };

  return (
    <button
      className={twJoin(
        cn([
          "group relative flex h-[97px] w-[96px] origin-center items-center justify-center rounded-full bg-gradient-to-t pt-[2px] shadow-lg transition-transform duration-75", // base
          "lg:h-[148px] lg:w-[145px]", //large
          disabled
            ? "h-[133px] w-[129px] cursor-default pt-[3px] lg:h-[300px] lg:w-[294px] lg:pt-[6px] lg:shadow-md lg:shadow-black/50"
            : "active:scale-[97%] lg:pt-1", // disabled
          variantStyles[variant].button, // variant,
          className,
        ]),
        disabled
          ? "border-b-[6px] lg:border-b-[13px]"
          : "border-b-[4px] lg:border-b-[7px]",
      )}
      {...props}
    >
      <div
        className={cn(
          [
            "flex aspect-square w-[73px] flex-col items-center justify-center rounded-full border-t-[4px] border-t-[#BBBDDD] bg-[hsl(0,0%,91%)]",
          ], //
          disabled
            ? "w-[100px] border-t-[5px] lg:w-[225px] lg:border-t-[12px]"
            : "lg:w-[111px] lg:border-t-[6px]",
        )}
      >
        <div
          className={cn([
            "relative", // base
            variantStyles[variant].image, // variant
            disabled
              ? variantStyles[variant].imageDisabled
              : "group-hover:opacity-75", // disabled
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
    <form className="relative mt-[90.5px] w-[311px] lg:mt-[44px] lg:w-[472px]">
      <div className="relative z-10 flex flex-col items-center pt-[3px] lg:gap-6">
        <ChoiceButton
          variant="Scissors"
          onClick={() => {
            handleClick("Scissors");
          }}
        />
        <div className="-mt-[43px] flex w-full items-center justify-between">
          <ChoiceButton variant="Spock" onClick={() => handleClick("Spock")} />
          <ChoiceButton
            variant="Paper"
            onClick={() => {
              handleClick("Paper");
            }}
          />
        </div>
        <div className="mt-[26px] flex w-full items-center justify-between px-[43px] lg:mt-[14px] lg:px-[65px]">
          <ChoiceButton
            variant="Lizard"
            onClick={() => handleClick("Lizard")}
          />
          <ChoiceButton
            variant="Rock"
            onClick={() => {
              handleClick("Rock");
            }}
          />
        </div>
      </div>

      <svg
        className="pointer-events-none absolute left-1/2 top-[56px] w-[calc(375px-164px)] -translate-x-1/2 stroke-[24px] lg:left-[calc(50%)] lg:top-[78px] lg:w-[329px] lg:stroke-[15px]"
        viewBox="0 0 329 313"
        aria-hidden="true"
      >
        <use href="/rock-paper-scissors/images/bg-pentagon.svg#bg-pentagon" />
      </svg>
    </form>
  );
}

function WaitForHouse() {
  const setStep = useSetAtom(stepsAtom);
  const [choice, setChoice] = useAtom(choiceAtom);
  const setScore = useSetAtom(scoreAtom);
  const [house, setHouse] = useAtom(houseAtom);
  const [win, setWin] = useAtom(winAtom);
  const optRef = useRef<ChoiceVariant | undefined>(undefined); // debug only
  const winStyle =
    "relative before:absolute before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2 before:aspect-[137/133] before:w-[129px] lg:before:aspect-[311/300] lg:before:top-[calc(50%-6px)] lg:before:w-[294px] before:rounded-full before:shadow-[0_0_0_19px_hsla(0,0%,100%,.02),0_0_0_46px_hsla(0,0%,100%,.03),0_0_0_80px_hsla(0,0%,100%,.025)] lg:before:shadow-[0_0_0_65px_hsla(0,0%,100%,.02),0_0_0_135px_hsla(0,0%,100%,.03),0_0_0_218px_hsla(0,0%,100%,.025)] z-0";

  const getRandomHouse = (draw: ChoiceVariant) => {
    if (optRef.current !== undefined) return optRef.current; // debug only
    const getRandOptions = () => Math.floor(Math.random() * 5);
    let res = draw;
    while (res === draw) {
      res = options[getRandOptions()];
    }
    optRef.current = res; // debug only
    return res;
  };

  useEffectOnce(() => {
    if (choice !== null) {
      setTimeout(() => {
        const opt = getRandomHouse(choice);
        const isWin = weapons[choice].strongTo.includes(opt);
        setWin(isWin);
        setScore((s) => (isWin ? s + 1 : s - 1));
        setHouse(opt);
      }, 1000);
    }
  });

  return (
    <>
      <div
        className={cn(
          [
            "relative mt-[97.5px] flex w-[316px] items-center justify-between text-white lg:mt-[69px] lg:items-start",
          ], //
          win === undefined ? "lg:w-[675px]" : "lg:-ml-[28px] lg:w-[932px]",
        )}
      >
        <div className="flex flex-col items-center lg:flex-col-reverse">
          {choice !== null ? (
            <div
              className={cn([
                "animate-in fade-in-5 lg:mt-[61px]", //
                win ? winStyle : "relative z-10",
              ])}
            >
              <ChoiceButton variant={choice} disabled />
            </div>
          ) : (
            <div className="aspect-square w-[110px] animate-pulse rounded-full bg-black/10 lg:mt-[98px] lg:w-[224px]" />
          )}
          <p className="mt-5 font-bold uppercase tracking-[1.5px] lg:mt-0 lg:text-[24px] lg:tracking-[3px]">
            you picked
          </p>
        </div>
        {win !== undefined ? (
          <div className="absolute -bottom-[72px] left-1/2 flex -translate-x-1/2 translate-y-full flex-col items-center lg:static lg:w-[220px] lg:translate-x-[14px] lg:translate-y-0 lg:self-center lg:pt-[63px]">
            <h1 className="text-[56px] font-bold uppercase leading-none tracking-[.01px] text-white drop-shadow-md">
              you {win ? "win" : "lose"}
            </h1>
            <button
              className="mt-[22px] flex h-12 w-[220px] items-center justify-center rounded-lg bg-white uppercase tracking-[2.5px] text-rock-paper-scissor-neutral-dark shadow hover:text-rock-paper-scissor-primary-rock-100"
              onClick={() => {
                optRef.current = undefined; // debug only
                setChoice(null);
                setWin(undefined);
                setHouse(null);
                setStep(1);
              }}
              type="button"
            >
              play again
            </button>
          </div>
        ) : null}
        <div
          className={cn([
            "-mr-[14px] flex w-[50%] flex-col items-center lg:mr-[16px] lg:w-[294px] lg:flex-col-reverse", //
            win !== undefined && "lg:mr-0 lg:translate-x-[7px]",
          ])}
        >
          <div className="flex h-[133px] items-center justify-center lg:mt-[61px] lg:h-[300px]">
            {house !== null ? (
              <div
                className={cn([
                  "animate-in fade-in-5", //
                  win === false ? winStyle : "relative z-10",
                ])}
              >
                <ChoiceButton variant={house} disabled />
              </div>
            ) : (
              <div className="aspect-square w-[110px] animate-pulse rounded-full bg-black/10 lg:-mt-1 lg:w-[224px]" />
            )}
          </div>
          <p className="mt-5 font-bold uppercase tracking-[1.5px] lg:mt-0 lg:text-[24px] lg:tracking-[3px]">
            the house picked
          </p>
        </div>
      </div>
    </>
  );
}

function Main() {
  const step = useAtomValue(stepsAtom);

  return (
    <main
      className="flex min-h-screen flex-col items-center px-[31px] pt-[30.5px] lg:pb-[58px] lg:pt-[47px]"
      aria-labelledby="title"
    >
      <h1 className="sr-only" id="title">
        Rock, Paper, Scissors, Lizard, Spock Game
      </h1>
      <ClientOnly>
        <Header />
      </ClientOnly>
      {step === 1 ? <Choices /> : <WaitForHouse />}
      <RulesModal />
    </main>
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
      <a href="https://github.com/muflihanto" target="_blank" rel="noreferrer">
        Muflihanto
      </a>
      .
    </footer>
  );
}
