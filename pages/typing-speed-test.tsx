import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import passagesData from "../public/typing-speed-test/data.json";
import { cn } from "../utils/cn";
import { sora } from "../utils/fonts/sora";

const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const FOCUS_CLASSES =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-typing-speed-test-blue-600";

export default function TypingSpeedTest() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Typing Speed Test</title>
      </Head>
      <div
        className={cn(
          "App relative min-h-[100svh] overflow-x-hidden bg-typing-speed-test-neutral-900 font-sora text-typing-speed-test-neutral-0",
          sora.variable,
        )}
      >
        <Main />
        <Footer />
        {/* <Slider
          basePath="/typing-speed-test/design"
          absolutePath="/typing-speed-test/design/desktop-results-new-personal-best.jpg"
        /> */}
      </div>
    </>
  );
}

type Difficulty = "Easy" | "Medium" | "Hard";

function isDifficulty(value: string | null): value is Difficulty {
  return value === "Easy" || value === "Medium" || value === "Hard";
}

const DIFFICULTY_KEYS: Record<Difficulty, "easy" | "medium" | "hard"> = {
  Easy: "easy",
  Medium: "medium",
  Hard: "hard",
};

function getRandomPassage(diff: Difficulty) {
  const key = DIFFICULTY_KEYS[diff];
  const list = passagesData[key];
  if (!list || list.length === 0) return "";
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex].text;
}

function StatDisplay({
  label,
  value,
  valueColorClass,
}: {
  label: string;
  value: React.ReactNode;
  valueColorClass: string;
}) {
  return (
    <div className="flex flex-col items-center md:flex-row md:gap-3">
      <p className="text-[15px] font-medium text-typing-speed-test-neutral-400 md:text-[20px] md:tracking-tight">
        {label}
      </p>
      <p
        className={cn(
          "mt-1.5 text-2xl font-bold leading-none md:mt-0 md:text-[24px]",
          valueColorClass,
        )}
      >
        {value}
      </p>
    </div>
  );
}

function PillGroup({
  label,
  options,
  activeOption,
  onChange,
}: {
  label: string;
  options: string[];
  activeOption: string;
  onChange: (option: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[16px] font-medium text-typing-speed-test-neutral-400">
        {label}:
      </span>
      <div className="flex items-center gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-lg px-2 py-1 text-[15px] transition-colors",
              FOCUS_CLASSES,
              activeOption === opt
                ? "border border-typing-speed-test-blue-600 bg-typing-speed-test-neutral-900 text-typing-speed-test-blue-600"
                : "border border-typing-speed-test-neutral-500 text-typing-speed-test-neutral-0 hover:border-typing-speed-test-blue-600 hover:text-typing-speed-test-blue-600",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function Dropdown({
  options,
  activeOption,
  isOpen,
  setIsOpen,
  onOpenClick,
  onChange,
  triggerRef,
  menuRef,
}: {
  options: string[];
  activeOption: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onOpenClick: () => void;
  onChange: (option: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  menuRef: React.RefObject<HTMLDivElement>;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault();
      setIsOpen(true);
      setTimeout(() => {
        const firstItem =
          menuRef.current?.querySelector<HTMLButtonElement>(
            '[role="menuitem"]',
          );
        firstItem?.focus();
      }, 0);
      return;
    }

    if (!isOpen || !menuRef.current) return;

    const items = Array.from(
      menuRef.current.querySelectorAll<HTMLButtonElement>('[role="menuitem"]'),
    );
    if (items.length === 0) return;

    const currentIndex = items.indexOf(
      document.activeElement as HTMLButtonElement,
    );

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex =
        currentIndex < 0 ? 0 : (currentIndex + 1) % items.length;
      items[nextIndex].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
      items[prevIndex].focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0].focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1].focus();
    } else if (e.key === "Tab") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full">
      <button
        ref={triggerRef}
        type="button"
        onKeyDown={handleKeyDown}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={onOpenClick}
        className={cn(
          "flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-typing-speed-test-neutral-500 bg-transparent px-4 text-[15px] font-medium text-typing-speed-test-neutral-0 transition-colors hover:bg-typing-speed-test-neutral-800",
          FOCUS_CLASSES,
        )}
      >
        {activeOption}
        <Image
          src="/typing-speed-test/assets/images/icon-down-arrow.svg"
          alt=""
          width={12}
          height={8}
          className={cn(
            "h-auto w-3 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          onKeyDown={handleKeyDown}
          className="absolute left-0 top-full mt-[11px] flex w-full flex-col divide-y divide-typing-speed-test-neutral-500 rounded-xl border border-typing-speed-test-neutral-500/20 bg-typing-speed-test-neutral-800 shadow-xl"
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              role="menuitem"
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 px-2 py-[6px] transition-colors hover:bg-typing-speed-test-neutral-500/20"
            >
              {activeOption === opt ? (
                <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-typing-speed-test-blue-400">
                  <div className="h-2 w-2 rounded-full bg-typing-speed-test-blue-400"></div>
                </div>
              ) : (
                <div className="h-4 w-4 rounded-full border border-typing-speed-test-neutral-0"></div>
              )}
              <span className="text-[15px] font-medium text-typing-speed-test-neutral-0">
                {opt}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StatDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-12 w-px place-self-center bg-typing-speed-test-neutral-500 md:h-8",
        className,
      )}
    />
  );
}

function Main() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Hard");
  const [passageText, setPassageText] = useState(passagesData.hard[0].text);
  const [mode, setMode] = useState("Timed (60s)");
  const [openDropdown, setOpenDropdown] = useState<"diff" | "mode" | null>(
    null,
  );
  const isDiffOpen = openDropdown === "diff";
  const isModeOpen = openDropdown === "mode";

  const [status, setStatus] = useState<"idle" | "active" | "finished">("idle");
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [cumulativeErrors, setCumulativeErrors] = useState(0);
  const [bestWpm, setBestWpm] = useState<number | null>(null);
  const [resultType, setResultType] = useState<
    "baseline" | "newBest" | "complete" | null
  >(null);

  const [a11yErrorAnnouncement, setA11yErrorAnnouncement] = useState("");

  const accuracy = useMemo(() => {
    return totalKeystrokes === 0
      ? 100
      : Math.max(
          0,
          Math.round(
            ((totalKeystrokes - cumulativeErrors) / totalKeystrokes) * 100,
          ),
        );
  }, [totalKeystrokes, cumulativeErrors]);

  const { correctChars, incorrectChars } = useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === passageText[i]) {
        correct++;
      } else {
        incorrect++;
      }
    }
    return { correctChars: correct, incorrectChars: incorrect };
  }, [input, passageText]);

  const wpm = useMemo(() => {
    if (timeElapsed <= 0) return 0;
    return Math.round(correctChars / 5 / (timeElapsed / 60));
  }, [correctChars, timeElapsed]);

  const inputRef = useRef<HTMLInputElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);
  const lastOffsetTopRef = useRef<number | null>(null);
  const dropdownsRef = useRef<HTMLDivElement>(null);
  const diffTriggerRef = useRef<HTMLButtonElement>(null);
  const modeTriggerRef = useRef<HTMLButtonElement>(null);
  const diffMenuRef = useRef<HTMLDivElement>(null);
  const modeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownsRef.current &&
        !dropdownsRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  useEffect(() => {
    const savedBest = localStorage.getItem("typing-test-best-wpm");
    if (savedBest) {
      setBestWpm(parseInt(savedBest, 10));
    }

    const savedMode = localStorage.getItem("typing-test-mode");
    if (savedMode) {
      setMode(savedMode);
    }

    const savedDiff = localStorage.getItem("typing-test-difficulty");
    if (isDifficulty(savedDiff)) {
      setDifficulty(savedDiff);
      setPassageText(getRandomPassage(savedDiff));
    } else {
      setPassageText(getRandomPassage("Hard"));
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "active" && hasStartedTyping && isFocused) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status, hasStartedTyping, isFocused]);

  useEffect(() => {
    if (status === "active" && !hasStartedTyping && input.length > 0) {
      setHasStartedTyping(true);
    }
  }, [input, status, hasStartedTyping]);

  const handleFinish = useCallback(() => {
    let type: "baseline" | "newBest" | "complete" = "complete";
    if (bestWpm === null) {
      type = "baseline";
    } else if (wpm > bestWpm) {
      type = "newBest";
    }

    setResultType(type);
    if (type !== "complete") {
      setBestWpm(wpm);
      localStorage.setItem("typing-test-best-wpm", wpm.toString());
    }
    setStatus("finished");
  }, [bestWpm, wpm]);

  useEffect(() => {
    if (status !== "active") return;
    if (
      (mode === "Timed (60s)" && timeElapsed >= 60) ||
      input.length >= passageText.length
    ) {
      handleFinish();
    }
  }, [timeElapsed, mode, input.length, passageText, status, handleFinish]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: trigger scroll on input change
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (status !== "active") {
      lastOffsetTopRef.current = null;
      if (caretRef.current) {
        caretRef.current.style.opacity = "0";
      }
      return;
    }

    const handle = requestAnimationFrame(() => {
      const activeChar = document.getElementById("active-char");
      if (!activeChar) return;

      const currentOffset = activeChar.offsetTop;

      // Track vertical position of invisible input to prevent native browser focus-scroll jumps
      if (inputRef.current) {
        inputRef.current.style.top = `${currentOffset}px`;
        inputRef.current.style.left = `${activeChar.offsetLeft}px`;
        inputRef.current.style.width = `${activeChar.offsetWidth || 10}px`;
        inputRef.current.style.height = `${activeChar.offsetHeight || 20}px`;
      }

      // Scroll smoothly to center only when wrapping to a new line
      const isNewLine = lastOffsetTopRef.current !== currentOffset;

      if (isNewLine) {
        activeChar.scrollIntoView({ behavior: "smooth", block: "center" });
        lastOffsetTopRef.current = currentOffset;
      }

      if (caretRef.current) {
        caretRef.current.style.top = `${activeChar.offsetTop}px`;
        caretRef.current.style.left = `${activeChar.offsetLeft}px`;
        caretRef.current.style.width = `${activeChar.offsetWidth}px`;
        caretRef.current.style.height = `${activeChar.offsetHeight}px`;
        caretRef.current.style.opacity = "1";
      }
    });

    return () => cancelAnimationFrame(handle);
  }, [input, status]);

  // Accuracy and WPM are now calculated dynamically as derived state using useMemo

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (status === "active") {
        e.preventDefault();
        // The custom message is largely ignored by modern browsers, but required to trigger the prompt
        e.returnValue =
          "You have an active typing test. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [status]);

  const resetTestState = useCallback((newStatus: "idle" | "active") => {
    setStatus(newStatus);
    setHasStartedTyping(false);
    setInput("");
    setTimeElapsed(0);
    setTotalKeystrokes(0);
    setCumulativeErrors(0);
    if (newStatus === "idle") {
      setResultType(null);
      setIsFocused(false);
    }
  }, []);

  const handleModeChange = useCallback(
    (newMode: string) => {
      if (newMode !== mode) {
        setMode(newMode);
        localStorage.setItem("typing-test-mode", newMode);
        resetTestState("idle");
      }
    },
    [mode, resetTestState],
  );

  const handleDifficultyChange = useCallback(
    (newDiff: string) => {
      if (isDifficulty(newDiff)) {
        if (newDiff !== difficulty) {
          setDifficulty(newDiff);
          setPassageText(getRandomPassage(newDiff));
          localStorage.setItem("typing-test-difficulty", newDiff);
          resetTestState("idle");
        }
      }
    },
    [difficulty, resetTestState],
  );

  const handleStartTest = useCallback(() => {
    if (status !== "idle") {
      setPassageText(getRandomPassage(difficulty));
    }
    resetTestState("active");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  }, [status, difficulty, resetTestState]);

  const closeAllDropdowns = useCallback(() => setOpenDropdown(null), []);
  const openDiffDropdown = useCallback(
    () => setOpenDropdown((prev) => (prev === "diff" ? null : "diff")),
    [],
  );
  const openModeDropdown = useCallback(
    () => setOpenDropdown((prev) => (prev === "mode" ? null : "mode")),
    [],
  );
  const setDiffOpen = useCallback(
    (open: boolean) => setOpenDropdown(open ? "diff" : null),
    [],
  );
  const setModeOpen = useCallback(
    (open: boolean) => setOpenDropdown(open ? "mode" : null),
    [],
  );

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openDropdown !== null) {
          if (isDiffOpen) diffTriggerRef.current?.focus();
          if (isModeOpen) modeTriggerRef.current?.focus();
          closeAllDropdowns();
        } else {
          handleStartTest();
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [
    handleStartTest,
    openDropdown,
    isDiffOpen,
    isModeOpen,
    closeAllDropdowns,
  ]);

  const handleContainerClick = () => {
    if (status === "idle") {
      handleStartTest();
    } else if (status === "active") {
      inputRef.current?.focus();
    }
  };

  const renderedPassage = useMemo(() => {
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
              "underline decoration-typing-speed-test-red-500 underline-offset-4 bg-typing-speed-test-red-500/20";
          }
        }
      }

      const isCursor = index === typedChars.length && status === "active";

      return (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: passage text is stable during a test
          key={index}
          id={isCursor ? "active-char" : undefined}
          className={cn("relative", colorClass, decorationClass)}
        >
          {char}
        </span>
      );
    });
  }, [passageText, input, status]);

  const isNewBest = resultType === "newBest";
  const isBaseline = resultType === "baseline";

  return (
    <main className="mx-auto flex w-full max-w-md flex-col px-4 pb-[0px] pt-4 md:max-w-7xl md:px-8 md:pt-8">
      <h1 className="sr-only">Typing Speed Test</h1>
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
            <span className="text-typing-speed-test-neutral-0">
              {bestWpm ?? "0"} WPM
            </span>
          </p>
        </div>
      </header>

      {status !== "finished" ? (
        <>
          <div className="mt-[30px] flex flex-col border-b-0 border-typing-speed-test-neutral-800 pb-0 md:mt-[62px] md:flex-row md:items-center md:justify-between md:border-b md:pb-[14px]">
            {/* Stats */}
            <div className="grid w-full grid-cols-[1fr_0.4fr_1fr_0.4fr_1fr] items-center md:flex md:w-auto md:gap-6">
              <StatDisplay
                label="WPM:"
                value={status === "idle" ? "0" : wpm}
                valueColorClass="text-typing-speed-test-neutral-0"
              />
              <StatDivider />
              <StatDisplay
                label="Accuracy:"
                value={status === "idle" ? "100%" : `${accuracy}%`}
                valueColorClass={
                  status === "active" && accuracy < 100
                    ? "text-typing-speed-test-red-500"
                    : "text-typing-speed-test-neutral-0"
                }
              />
              <StatDivider />
              <StatDisplay
                label="Time:"
                value={
                  mode === "Timed (60s)"
                    ? `0:${Math.max(0, 60 - timeElapsed)
                        .toString()
                        .padStart(2, "0")}`
                    : `${Math.floor(timeElapsed / 60)}:${(timeElapsed % 60).toString().padStart(2, "0")}`
                }
                valueColorClass={
                  status === "active"
                    ? "text-typing-speed-test-yellow-400"
                    : "text-typing-speed-test-neutral-0"
                }
              />
            </div>

            {/* Mobile Dropdowns */}
            <div
              ref={dropdownsRef}
              className="relative z-20 mt-4 flex w-full gap-2 border-b border-typing-speed-test-neutral-800 pb-[15px] md:hidden"
            >
              <Dropdown
                options={["Easy", "Medium", "Hard"]}
                activeOption={difficulty}
                isOpen={isDiffOpen}
                setIsOpen={setDiffOpen}
                onOpenClick={openDiffDropdown}
                onChange={handleDifficultyChange}
                triggerRef={diffTriggerRef}
                menuRef={diffMenuRef}
              />

              <Dropdown
                options={["Timed (60s)", "Passage"]}
                activeOption={mode}
                isOpen={isModeOpen}
                setIsOpen={setModeOpen}
                onOpenClick={openModeDropdown}
                onChange={handleModeChange}
                triggerRef={modeTriggerRef}
                menuRef={modeMenuRef}
              />
            </div>

            {/* Desktop Pills */}
            <div className="ml-auto hidden items-center gap-5 md:flex">
              <PillGroup
                label="Difficulty"
                options={["Easy", "Medium", "Hard"]}
                activeOption={difficulty}
                onChange={handleDifficultyChange}
              />

              <StatDivider className="place-self-[unset] h-8" />

              <PillGroup
                label="Mode"
                options={["Timed (60s)", "Passage"]}
                activeOption={mode}
                onChange={handleModeChange}
              />
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
            <div
              ref={caretRef}
              className={cn(
                "pointer-events-none absolute rounded-[4px] bg-typing-speed-test-neutral-400/30 transition-all duration-100 ease-out",
                !isFocused && status === "active" && "hidden",
              )}
              style={{
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                opacity: 0,
              }}
            />
            <p
              className={cn(
                "text-[28px] leading-[1.575] tracking-[0.0235em] md:text-[39px] md:leading-[1.3875]",
                (status === "idle" || (status === "active" && !isFocused)) &&
                  "text-typing-speed-test-neutral-400 opacity-70 blur-[8px] md:blur-[10px]",
              )}
            >
              {status === "idle" ? passageText : renderedPassage}
            </p>

            {status === "idle" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-[30px] md:pt-[0px]">
                <button
                  type="button"
                  onClick={handleStartTest}
                  className={cn(
                    "h-[56px] w-[220px] rounded-xl bg-typing-speed-test-blue-400 text-[20px] font-semibold tracking-[-0.02em] text-typing-speed-test-neutral-0 hover:bg-typing-speed-test-blue-600",
                    FOCUS_CLASSES,
                  )}
                >
                  Start Typing Test
                </button>
                <p className="mt-[18px] text-center text-[20px] font-semibold tracking-[-0.02875em] text-typing-speed-test-neutral-0">
                  Or click the text and start typing
                </p>
              </div>
            )}

            {status === "active" && !isFocused && (
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-[30px] md:pt-[0px]">
                <p className="text-center text-[24px] font-semibold tracking-[-0.02875em] text-typing-speed-test-neutral-0">
                  Paused
                </p>
                <p className="mt-[12px] text-center text-[18px] font-medium tracking-[-0.02875em] text-typing-speed-test-neutral-400">
                  Click the text to resume
                </p>
              </div>
            )}

            {status === "active" && (
              <>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => {
                    const newVal = e.target.value;
                    if (newVal.length > input.length) {
                      setTotalKeystrokes((prev) => prev + 1);
                      const lastIdx = newVal.length - 1;
                      if (newVal[lastIdx] !== passageText[lastIdx]) {
                        setCumulativeErrors((prev) => prev + 1);
                        const expected =
                          passageText[lastIdx] === " "
                            ? "space"
                            : passageText[lastIdx];
                        const typed =
                          newVal[lastIdx] === " " ? "space" : newVal[lastIdx];
                        setA11yErrorAnnouncement(
                          `Incorrect. Expected ${expected}, typed ${typed}.`,
                        );
                      } else {
                        setA11yErrorAnnouncement("");
                      }
                    }
                    setInput(newVal);
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onPaste={(e) => e.preventDefault()}
                  maxLength={passageText.length}
                  className="absolute opacity-0"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck="false"
                  aria-label="Typing test input"
                />
                <div className="sr-only" aria-live="assertive">
                  {a11yErrorAnnouncement}
                </div>
              </>
            )}
          </div>

          {status === "active" && (
            <div className="mt-[63px] flex justify-center border-t-2 border-t-typing-speed-test-neutral-800 pb-8 pt-[30px]">
              <button
                type="button"
                onClick={handleStartTest}
                className={cn(
                  "flex h-14 w-[180px] items-center justify-center gap-2 rounded-xl bg-typing-speed-test-neutral-800 p-2 text-center text-[20px] font-semibold text-typing-speed-test-neutral-0 transition hover:bg-typing-speed-test-neutral-500",
                  FOCUS_CLASSES,
                )}
              >
                Restart Test
                <RestartIcon />
              </button>
            </div>
          )}
        </>
      ) : (
        <Results
          wpm={wpm}
          accuracy={accuracy}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          isBaseline={isBaseline}
          isNewBest={isNewBest}
          onRestart={handleStartTest}
        />
      )}
    </main>
  );
}

function RestartIcon({
  className,
  alt = "",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <Image
      src="/typing-speed-test/assets/images/icon-restart.svg"
      alt={alt}
      width={16}
      height={16}
      className={cn("h-5 w-5 transition-transform hover:rotate-180", className)}
    />
  );
}

interface ResultsProps {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  isBaseline: boolean;
  isNewBest: boolean;
  onRestart: () => void;
}

function ResultCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[92px] flex-col justify-center gap-2 rounded-lg border border-typing-speed-test-neutral-800 bg-typing-speed-test-neutral-900 px-6 pb-1 shadow-sm md:h-[92px] md:w-[160px]">
      <span className="text-[20px] text-typing-speed-test-neutral-400">
        {label}
      </span>
      {children}
    </div>
  );
}

function Results({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  isBaseline,
  isNewBest,
  onRestart,
}: ResultsProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const title = isBaseline
    ? "Baseline Established!"
    : isNewBest
      ? "High Score Smashed!"
      : "Test Complete!";
  const subtitle = isBaseline
    ? "You've set the bar. Now the real challenge begins—time to beat it."
    : isNewBest
      ? "You're getting faster. That was incredible typing."
      : "Solid run. Keep pushing to beat your high score.";

  const buttonText = isBaseline ? "Beat This Score" : "Go Again";
  const icon = isNewBest
    ? "/typing-speed-test/assets/images/icon-new-pb.svg"
    : "/typing-speed-test/assets/images/icon-completed.svg";

  return (
    <div className="relative mt-8 flex w-full flex-col items-center px-0 pb-[120px] md:static md:mt-[55px]">
      <div className="sr-only" aria-live="polite">
        {title} {subtitle} You typed at {wpm} words per minute with {accuracy}%
        accuracy.
      </div>
      {isNewBest && (
        <Image
          src="/typing-speed-test/assets/images/pattern-confetti.svg"
          alt=""
          width={1440}
          height={326}
          className="absolute -bottom-[82px] left-1/2 z-0 h-[200px] w-[1440px] max-w-none -translate-x-[35.5%] md:bottom-0 md:h-auto md:w-[max(1440px,100vw)] md:-translate-x-1/2"
        />
      )}
      <div className="relative flex w-full flex-col items-center">
        {!isNewBest && (
          <>
            <Image
              src="/typing-speed-test/assets/images/pattern-star-2.svg"
              alt=""
              width={32}
              height={32}
              className="absolute left-[3px] top-[45px] h-5 w-5 md:-left-[2px] md:top-[124px] md:h-8 md:w-8"
            />
            <Image
              src="/typing-speed-test/assets/images/pattern-star-1.svg"
              alt=""
              width={72}
              height={72}
              className="absolute -bottom-[84px] right-[12px] h-10 w-10 md:bottom-[36px] md:right-[0px] md:h-[72px] md:w-[72px]"
            />
          </>
        )}

        <div
          className={cn(
            "relative flex h-[80px] w-[80px] items-center justify-center rounded-full",
            isNewBest
              ? "mt-2 md:mb-2"
              : "bg-typing-speed-test-green-500/10 md:h-[128px] md:w-[128px]",
          )}
        >
          <div
            className={cn(
              "flex aspect-square h-[64px] items-center justify-center rounded-full",
              isNewBest
                ? "md:h-[80px]"
                : "bg-typing-speed-test-green-500/20 md:h-[96px]",
            )}
          >
            <Image
              src={icon}
              alt="Completed"
              width={isNewBest ? 100 : 64}
              height={isNewBest ? 100 : 64}
              className={cn(
                "aspect-square",
                isNewBest ? "h-16 md:h-[80px]" : "h-12 md:h-16",
              )}
            />
          </div>
        </div>

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-7 text-center text-[24px] font-bold leading-none tracking-[0.015em] text-typing-speed-test-neutral-0 outline-none md:mt-8 md:text-[40px] md:tracking-normal"
        >
          {title}
        </h1>
        <p className="mt-[10px] text-center leading-5 tracking-[-0.035em] text-typing-speed-test-neutral-400 md:mt-[18px] md:text-[20px] md:tracking-[-0.0275em]">
          {subtitle}
        </p>

        <div className="relative z-10 mt-[23px] flex w-full flex-col items-center gap-4 md:mt-[54px]">
          <div className="flex w-full flex-col gap-4 md:flex-row md:justify-center md:gap-[20px]">
            <ResultCard label="WPM:">
              <span className="text-[24px] font-bold leading-none text-typing-speed-test-neutral-0">
                {wpm}
              </span>
            </ResultCard>

            <ResultCard label="Accuracy:">
              <span
                className={cn(
                  "text-[24px] font-bold leading-none",
                  accuracy < 100
                    ? "text-typing-speed-test-red-500"
                    : isNewBest
                      ? "text-typing-speed-test-green-500"
                      : "text-typing-speed-test-neutral-0",
                )}
              >
                {accuracy}%
              </span>
            </ResultCard>

            <ResultCard label="Characters">
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
            </ResultCard>
          </div>

          <button
            type="button"
            onClick={onRestart}
            className={cn(
              "mt-[24px] flex h-[56px] items-center justify-center gap-[10px] rounded-xl bg-typing-speed-test-neutral-0 text-[20px] font-semibold tracking-[-0.015em] text-typing-speed-test-neutral-900 transition hover:bg-typing-speed-test-neutral-0/80 md:mt-12",
              FOCUS_CLASSES,
              isBaseline ? "w-[215px]" : "w-[155px]",
            )}
          >
            {buttonText}
            <RestartIcon alt="Restart" className="brightness-0" />
          </button>
        </div>
      </div>
    </div>
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
