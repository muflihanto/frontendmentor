import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { sora } from "../utils/fonts/sora";

const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function TypingSpeedTest() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Typing Speed Test</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] bg-typing-speed-test-neutral-900 text-typing-speed-test-neutral-0 ${sora.variable} font-sora`}
      >
        <Main />
        <Footer />
        <Slider
          basePath="/typing-speed-test/design"
          absolutePath="/typing-speed-test/design/mobile-dropdown.jpg"
        />
      </div>
    </>
  );
}

function Main() {
  const [difficulty, setDifficulty] = useState("Hard");
  const [mode, setMode] = useState("Timed (60s)");
  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const [isModeOpen, setIsModeOpen] = useState(false);

  return (
    <main className="mx-auto flex w-full max-w-md flex-col px-4 pb-[0px] pt-4 md:max-w-7xl md:px-8 md:pt-8">
      <header className="flex w-full items-center justify-between">
        <Image
          src="/typing-speed-test/assets/images/logo-small.svg"
          alt="Logo"
          width={100}
          height={32}
          className="h-8 w-auto md:hidden"
        />
        <Image
          src="/typing-speed-test/assets/images/logo-large.svg"
          alt="Logo"
          width={280}
          height={48}
          className="hidden h-10 w-auto md:block"
        />
        <div className="flex items-center gap-2">
          <Image
            src="/typing-speed-test/assets/images/icon-personal-best.svg"
            alt="Personal best"
            width={16}
            height={16}
            className="h-4 w-auto md:h-[18px]"
          />
          <p className="text-[16px] text-typing-speed-test-neutral-400 md:text-[18px] md:tracking-tight">
            <span className="md:hidden">Best: </span>
            <span className="hidden md:inline">Personal best: </span>
            <span className="text-typing-speed-test-neutral-0">92 WPM</span>
          </p>
        </div>
      </header>

      <div className="mt-[30px] flex flex-col border-b-0 border-typing-speed-test-neutral-800 pb-0 md:mt-[62px] md:flex-row md:items-center md:justify-between md:border-b md:pb-[14px]">
        {/* Stats */}
        <div className="grid w-full grid-cols-[1fr_0.4fr_1fr_0.4fr_1fr] items-center md:flex md:w-auto md:gap-6">
          <div className="flex flex-col items-center md:flex-row md:gap-3">
            <p className="text-[15px] font-medium text-typing-speed-test-neutral-400 md:text-[20px] md:tracking-tight">
              WPM:
            </p>
            <p className="mt-1.5 text-2xl font-bold leading-none text-typing-speed-test-neutral-0 md:mt-0 md:text-[24px]">
              0
            </p>
          </div>
          <div className="h-12 w-px place-self-center bg-typing-speed-test-neutral-500 md:h-8"></div>
          <div className="flex flex-col items-center md:flex-row md:gap-3">
            <p className="text-[15px] font-medium text-typing-speed-test-neutral-400 md:text-[20px] md:tracking-tight">
              Accuracy:
            </p>
            <p className="mt-1.5 text-2xl font-bold leading-none text-typing-speed-test-neutral-0 md:mt-0 md:text-[24px]">
              100%
            </p>
          </div>
          <div className="h-12 w-px place-self-center bg-typing-speed-test-neutral-500 md:h-8"></div>
          <div className="flex flex-col items-center md:flex-row md:gap-3">
            <p className="text-[15px] font-medium text-typing-speed-test-neutral-400 md:text-[20px] md:tracking-tight">
              Time:
            </p>
            <p className="mt-1.5 text-2xl font-bold leading-none text-typing-speed-test-neutral-0 md:mt-0 md:text-[24px]">
              0:60
            </p>
          </div>
        </div>

        {/* Mobile Dropdowns */}
        <div className="relative z-20 mt-4 flex w-full gap-2 border-b border-typing-speed-test-neutral-800 pb-[15px] md:hidden">
          <div className="relative w-full">
            <button
              type="button"
              onClick={() => {
                setIsDiffOpen(!isDiffOpen);
                setIsModeOpen(false);
              }}
              className="flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-typing-speed-test-neutral-500 bg-transparent px-4 text-[15px] font-medium text-typing-speed-test-neutral-0 transition-colors hover:bg-typing-speed-test-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-typing-speed-test-blue-600"
            >
              {difficulty}
              <Image
                src="/typing-speed-test/assets/images/icon-down-arrow.svg"
                alt=""
                width={12}
                height={8}
                className={`h-auto w-3 transition-transform ${isDiffOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isDiffOpen && (
              <div className="absolute left-0 top-full mt-[11px] flex w-full flex-col divide-y divide-typing-speed-test-neutral-500 rounded-xl border border-typing-speed-test-neutral-500/20 bg-typing-speed-test-neutral-800 shadow-xl">
                {["Easy", "Medium", "Hard"].map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => {
                      setDifficulty(diff);
                      setIsDiffOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-2 py-[6px] transition-colors hover:bg-typing-speed-test-neutral-500/20"
                  >
                    {difficulty === diff ? (
                      <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-typing-speed-test-blue-400">
                        <div className="h-2 w-2 rounded-full bg-typing-speed-test-blue-400"></div>
                      </div>
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-typing-speed-test-neutral-0"></div>
                    )}
                    <span className="text-[15px] font-medium text-typing-speed-test-neutral-0">
                      {diff}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative w-full">
            <button
              type="button"
              onClick={() => {
                setIsModeOpen(!isModeOpen);
                setIsDiffOpen(false);
              }}
              className="flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-typing-speed-test-neutral-500 bg-transparent px-4 text-[15px] font-medium text-typing-speed-test-neutral-0 transition-colors hover:bg-typing-speed-test-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-typing-speed-test-blue-600"
            >
              {mode}
              <Image
                src="/typing-speed-test/assets/images/icon-down-arrow.svg"
                alt=""
                width={12}
                height={8}
                className={`h-auto w-3 transition-transform ${isModeOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isModeOpen && (
              <div className="absolute left-0 top-full mt-[11px] flex w-full flex-col divide-y divide-typing-speed-test-neutral-500 rounded-xl border border-typing-speed-test-neutral-500/20 bg-typing-speed-test-neutral-800 shadow-xl">
                {["Timed (60s)", "Passage"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMode(m);
                      setIsModeOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-2 py-1.5 transition-colors hover:bg-typing-speed-test-neutral-500/20"
                  >
                    {mode === m ? (
                      <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-typing-speed-test-blue-400">
                        <div className="h-2 w-2 rounded-full bg-typing-speed-test-blue-400"></div>
                      </div>
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-typing-speed-test-neutral-0"></div>
                    )}
                    <span className="text-[15px] font-medium text-typing-speed-test-neutral-0">
                      {m}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Pills */}
        <div className="ml-auto hidden items-center gap-5 md:flex">
          <div className="flex items-center gap-3">
            <span className="text-[16px] font-medium text-typing-speed-test-neutral-400">
              Difficulty:
            </span>
            <div className="flex items-center gap-2">
              {["Easy", "Medium", "Hard"].map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setDifficulty(diff)}
                  className={`rounded-lg px-2 py-1 text-[15px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-typing-speed-test-blue-600 ${
                    difficulty === diff
                      ? "border border-typing-speed-test-blue-600 bg-typing-speed-test-neutral-900 text-typing-speed-test-blue-600"
                      : "border border-typing-speed-test-neutral-500 text-typing-speed-test-neutral-0 hover:border-typing-speed-test-blue-600 hover:text-typing-speed-test-blue-600"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div className="h-8 w-px bg-typing-speed-test-neutral-500"></div>

          <div className="flex items-center gap-3">
            <span className="text-[16px] font-medium text-typing-speed-test-neutral-400">
              Mode:
            </span>
            <div className="flex items-center gap-2">
              {["Timed (60s)", "Passage"].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-lg px-2 py-1 text-[15px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-typing-speed-test-blue-600 ${
                    mode === m
                      ? "border border-typing-speed-test-blue-600 bg-typing-speed-test-neutral-900 text-typing-speed-test-blue-600"
                      : "border border-typing-speed-test-neutral-500 text-typing-speed-test-neutral-0 hover:border-typing-speed-test-blue-600 hover:text-typing-speed-test-blue-600"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-8 md:mt-8">
        <p className="text-[28px] font-semibold leading-[1.575] text-typing-speed-test-neutral-400 opacity-70 blur-[8px] md:text-[38px] md:leading-[1.425] md:blur-[10px]">
          The archaeological expedition unearthed artifacts that complicated
          prevailing theories about Bronze Age trade networks. Obsidian from
          Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic—all
          discovered in a single Mycenaean tomb. &quot;Globalization isn&apos;t
          as modern as we assume.&quot;
        </p>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-[30px] md:pt-[0px]">
          <button
            type="button"
            className="h-[56px] w-[220px] rounded-xl bg-typing-speed-test-blue-400 text-[20px] font-semibold tracking-[-0.02em] text-typing-speed-test-neutral-0 hover:bg-typing-speed-test-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-typing-speed-test-blue-600"
          >
            Start Typing Test
          </button>
          <p className="mt-[18px] text-center text-[20px] font-semibold tracking-[-0.02875em] text-typing-speed-test-neutral-0">
            Or click the text and start typing
          </p>
        </div>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-typing-speed-test-neutral-400 [&_a]:font-bold [&_a]:text-typing-speed-test-blue-400 [&_a]:underline [&_a]:decoration-typing-speed-test-blue-400 [&_a]:decoration-wavy">
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
