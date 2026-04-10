import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
          absolutePath="/typing-speed-test/design/mobile-results-first-test.jpg"
        />
      </div>
    </>
  );
}

const passageText =
  'The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic—all discovered in a single Mycenaean tomb—suggested commercial connections far more extensive than previously hypothesized. "We\'ve underestimated ancient peoples\' navigational capabilities and their appetite for luxury goods," the lead researcher observed. "Globalization isn\'t as modern as we assume."';

function Main() {
  const [difficulty, setDifficulty] = useState("Hard");
  const [mode, setMode] = useState("Timed (60s)");
  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const [isModeOpen, setIsModeOpen] = useState(false);

  const [status, setStatus] = useState<"idle" | "active" | "finished">("idle");
  const [input, setInput] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const lastOffsetTopRef = useRef<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "active") {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status === "active") {
      if (mode === "Timed (60s)" && timeElapsed >= 60) {
        setStatus("finished");
      }
    }
  }, [timeElapsed, mode, status]);

  useEffect(() => {
    if (status === "active") {
      let correct = 0;
      for (let i = 0; i < input.length; i++) {
        if (input[i] === passageText[i]) correct++;
      }

      const acc =
        input.length === 0 ? 100 : Math.round((correct / input.length) * 100);
      setAccuracy(acc);

      if (timeElapsed > 0) {
        const currentWpm = Math.round(correct / 5 / (timeElapsed / 60));
        setWpm(currentWpm);
      }

      if (mode === "Passage" && input.length >= passageText.length) {
        setStatus("finished");
      }
    }
  }, [input, timeElapsed, status, mode]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: trigger scroll on input change
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (status !== "active") {
      lastOffsetTopRef.current = null;
      return;
    }

    const activeChar = document.getElementById("active-char");
    if (!activeChar) return;

    const currentOffset = activeChar.offsetTop;

    // Track vertical position of invisible input to prevent native browser focus-scroll jumps
    if (inputRef.current) {
      inputRef.current.style.top = `${currentOffset}px`;
    }

    // Scroll smoothly to center only when wrapping to a new line
    const isNewLine = lastOffsetTopRef.current !== currentOffset;

    if (isNewLine) {
      activeChar.scrollIntoView({ behavior: "smooth", block: "center" });
      lastOffsetTopRef.current = currentOffset;
    }
  }, [input, status]);

  const handleStartTest = () => {
    setStatus("active");
    setInput("");
    setTimeElapsed(0);
    setWpm(0);
    setAccuracy(100);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const handleContainerClick = () => {
    if (status === "idle") {
      handleStartTest();
    } else if (status === "active") {
      inputRef.current?.focus();
    }
  };

  const renderPassage = () => {
    const chars = passageText.split("");
    const typedChars = input.split("");

    return chars.map((char, index) => {
      let colorClass = "text-typing-speed-test-neutral-400";
      let decorationClass = "";

      if (index < typedChars.length) {
        if (typedChars[index] === char) {
          colorClass = "text-typing-speed-test-green-500";
        } else {
          if (char !== " ") {
            colorClass = "text-typing-speed-test-red-500";
            decorationClass =
              "underline decoration-typing-speed-test-red-500 underline-offset-4";
          } else {
            decorationClass =
              "underline decoration-typing-speed-test-red-500 underline-offset-4";
          }
        }
      }

      const isCursor = index === typedChars.length && status === "active";

      return (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: static string sequence won't reorder
          key={index}
          id={isCursor ? "active-char" : undefined}
          className={`relative ${colorClass} ${decorationClass}`}
        >
          {char}
          {isCursor && (
            <span className="absolute inset-x-0 bottom-0 top-1 -mx-[1px] rounded-[4px] bg-typing-speed-test-neutral-400/30"></span>
          )}
        </span>
      );
    });
  };

  let correctChars = 0;
  let incorrectChars = 0;
  if (status === "finished") {
    for (let i = 0; i < input.length; i++) {
      if (input[i] === passageText[i]) correctChars++;
      else incorrectChars++;
    }
  }

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

      {status !== "finished" ? (
        <>
          <div className="mt-[30px] flex flex-col border-b-0 border-typing-speed-test-neutral-800 pb-0 md:mt-[62px] md:flex-row md:items-center md:justify-between md:border-b md:pb-[14px]">
            {/* Stats */}
            <div className="grid w-full grid-cols-[1fr_0.4fr_1fr_0.4fr_1fr] items-center md:flex md:w-auto md:gap-6">
              <div className="flex flex-col items-center md:flex-row md:gap-3">
                <p className="text-[15px] font-medium text-typing-speed-test-neutral-400 md:text-[20px] md:tracking-tight">
                  WPM:
                </p>
                <p
                  className={`mt-1.5 text-2xl font-bold leading-none md:mt-0 md:text-[24px] ${status === "active" ? "text-typing-speed-test-neutral-0" : "text-typing-speed-test-neutral-0"}`}
                >
                  {status === "idle" ? "0" : wpm}
                </p>
              </div>
              <div className="h-12 w-px place-self-center bg-typing-speed-test-neutral-500 md:h-8"></div>
              <div className="flex flex-col items-center md:flex-row md:gap-3">
                <p className="text-[15px] font-medium text-typing-speed-test-neutral-400 md:text-[20px] md:tracking-tight">
                  Accuracy:
                </p>
                <p
                  className={`mt-1.5 text-2xl font-bold leading-none md:mt-0 md:text-[24px] ${status === "active" && accuracy < 100 ? "text-typing-speed-test-red-500" : "text-typing-speed-test-neutral-0"}`}
                >
                  {status === "idle" ? "100%" : `${accuracy}%`}
                </p>
              </div>
              <div className="h-12 w-px place-self-center bg-typing-speed-test-neutral-500 md:h-8"></div>
              <div className="flex flex-col items-center md:flex-row md:gap-3">
                <p className="text-[15px] font-medium text-typing-speed-test-neutral-400 md:text-[20px] md:tracking-tight">
                  Time:
                </p>
                <p
                  className={`mt-1.5 text-2xl font-bold leading-none md:mt-0 md:text-[24px] ${status === "active" ? "text-typing-speed-test-yellow-400" : "text-typing-speed-test-neutral-0"}`}
                >
                  {mode === "Timed (60s)"
                    ? `0:${Math.max(0, 60 - timeElapsed)
                        .toString()
                        .padStart(2, "0")}`
                    : `${Math.floor(timeElapsed / 60)}:${(timeElapsed % 60).toString().padStart(2, "0")}`}
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

          {/* biome-ignore lint/a11y/noStaticElementInteractions: capturing text bounds click */}
          <div
            role="presentation"
            className="relative mt-8 cursor-text md:mt-8"
            onClick={handleContainerClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleContainerClick();
              }
            }}
          >
            <p
              className={`text-[28px] leading-[1.575] tracking-[0.0235em] md:text-[39px] md:leading-[1.3875] ${status === "idle" ? "text-typing-speed-test-neutral-400 opacity-70 blur-[8px] md:blur-[10px]" : ""}`}
            >
              {status === "idle" ? passageText : renderPassage()}
            </p>

            {status === "idle" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-[30px] md:pt-[0px]">
                <button
                  type="button"
                  onClick={handleStartTest}
                  className="h-[56px] w-[220px] rounded-xl bg-typing-speed-test-blue-400 text-[20px] font-semibold tracking-[-0.02em] text-typing-speed-test-neutral-0 hover:bg-typing-speed-test-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-typing-speed-test-blue-600"
                >
                  Start Typing Test
                </button>
                <p className="mt-[18px] text-center text-[20px] font-semibold tracking-[-0.02875em] text-typing-speed-test-neutral-0">
                  Or click the text and start typing
                </p>
              </div>
            )}

            {status === "active" && (
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={passageText.length}
                className="absolute left-0 top-0 h-0 w-0 opacity-0"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            )}
          </div>

          {status === "active" && (
            <div className="mt-[63px] flex justify-center border-t-2 border-t-typing-speed-test-neutral-800 pb-8 pt-[30px]">
              <button
                type="button"
                onClick={handleStartTest}
                className="flex h-14 w-[180px] items-center justify-center gap-2 rounded-xl bg-typing-speed-test-neutral-800 p-2 text-center text-[20px] font-semibold text-typing-speed-test-neutral-0 transition hover:bg-typing-speed-test-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-typing-speed-test-blue-600"
              >
                Restart Test
                <Image
                  src="/typing-speed-test/assets/images/icon-restart.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="h-5 w-5 transition-transform hover:rotate-180"
                />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="relative mt-8 flex w-full flex-col items-center px-0 pb-16">
          <Image
            src="/typing-speed-test/assets/images/pattern-star-2.svg"
            alt=""
            width={32}
            height={32}
            className="absolute left-[3px] top-[45px] h-5 w-5"
          />
          <Image
            src="/typing-speed-test/assets/images/pattern-star-1.svg"
            alt=""
            width={32}
            height={32}
            className="absolute bottom-[40px] right-[12px] h-10 w-10"
          />

          <div className="relative flex h-[80px] w-[80px] items-center justify-center rounded-full bg-typing-speed-test-green-500/10">
            <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-typing-speed-test-green-500/20">
              <Image
                src="/typing-speed-test/assets/images/icon-completed.svg"
                alt="Completed"
                width={64}
                height={64}
                className="h-12 w-12"
              />
            </div>
          </div>

          <h1 className="mt-7 text-center text-[24px] font-bold leading-none tracking-[0.015em] text-typing-speed-test-neutral-0">
            Baseline Established!
          </h1>
          <p className="mt-[10px] text-center leading-5 tracking-[-0.035em] text-typing-speed-test-neutral-400">
            You&apos;ve set the bar. Now the real challenge begins—time to beat
            it.
          </p>

          <div className="mt-[23px] flex w-full flex-col gap-4">
            <div className="flex h-[92px] flex-col justify-center gap-2 rounded border border-typing-speed-test-neutral-800 bg-typing-speed-test-neutral-900 px-6 pb-1 shadow-sm">
              <span className="text-[20px] text-typing-speed-test-neutral-400">
                WPM:
              </span>
              <span className="text-[24px] font-bold leading-none text-typing-speed-test-neutral-0">
                {wpm}
              </span>
            </div>
            <div className="flex h-[92px] flex-col justify-center gap-2 rounded border border-typing-speed-test-neutral-800 bg-typing-speed-test-neutral-900 px-6 pb-1 shadow-sm">
              <span className="text-[20px] text-typing-speed-test-neutral-400">
                Accuracy:
              </span>
              <span
                className={`text-[24px] font-bold leading-none ${accuracy < 100 ? "text-typing-speed-test-red-500" : "text-typing-speed-test-neutral-0"}`}
              >
                {accuracy}%
              </span>
            </div>
            <div className="flex h-[92px] flex-col justify-center gap-2 rounded border border-typing-speed-test-neutral-800 bg-typing-speed-test-neutral-900 px-6 pb-1 shadow-sm">
              <span className="text-[20px] text-typing-speed-test-neutral-400">
                Characters
              </span>
              <div className="flex items-end gap-[6px]">
                <span className="text-[24px] font-bold leading-none tracking-tight text-typing-speed-test-green-500">
                  {correctChars}
                </span>
                <span className="pb-[2px] text-[24px] font-bold leading-none text-typing-speed-test-neutral-500">
                  /
                </span>
                <span className="text-[24px] font-bold leading-none tracking-tight text-typing-speed-test-red-500">
                  {incorrectChars}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartTest}
              className="mt-6 flex h-[56px] w-[215px] items-center justify-center gap-[10px] self-center rounded-xl bg-typing-speed-test-neutral-0 text-[20px] font-semibold tracking-[-0.015em] text-typing-speed-test-neutral-900 transition hover:bg-typing-speed-test-neutral-0/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-typing-speed-test-blue-600"
            >
              Beat This Score
              <Image
                src="/typing-speed-test/assets/images/icon-restart.svg"
                alt="Restart"
                width={16}
                height={16}
                className="h-5 w-5 brightness-0 transition-transform hover:rotate-180"
              />
            </button>
          </div>
        </div>
      )}
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
