import { motion } from "framer-motion";
import { atom, useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import Mexp from "math-expression-evaluator";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { getMaxIndex } from "../../utils/indexesOf";

const MEDIA_QUERY = "(prefers-color-scheme: dark)";

export type calculatorTheme = 1 | 2 | 3;

export const calculatorThemeAtom = atomWithStorage<calculatorTheme>(
  "calc-theme",
  window.matchMedia(MEDIA_QUERY).matches ? 3 : 2,
);
export const themeClassAtom = atom({
  1: {
    bg1: "bg-calculator-th1-background-100",
    bg2: "bg-calculator-th1-background-200",
    bg3: "bg-calculator-th1-background-300",
    key1: "bg-calculator-th1-keys-blue-100",
    key2: "border-b-calculator-th1-keys-blue-200",
    key3: "bg-calculator-th1-keys-red-100",
    key4: "border-b-calculator-th1-keys-red-200",
    key5: "bg-calculator-th1-keys-orange-100",
    key6: "border-b-calculator-th1-keys-orange-200",
    text1: "text-calculator-th1-text-100",
    text2: "text-calculator-th1-text-200",
    text3: "text-calculator-th1-text-100",
  },
  2: {
    bg1: "bg-calculator-th2-background-100",
    bg2: "bg-calculator-th2-background-200",
    bg3: "bg-calculator-th2-background-300",
    key1: "bg-calculator-th2-keys-cyan-100",
    key2: "border-b-calculator-th2-keys-cyan-200",
    key3: "bg-calculator-th2-keys-orange-100",
    key4: "border-b-calculator-th2-keys-orange-200",
    key5: "bg-calculator-th2-keys-gray-100",
    key6: "border-b-calculator-th2-keys-gray-200",
    text1: "text-calculator-th2-text-100",
    text2: "text-calculator-th2-text-200",
    text3: "text-calculator-th2-text-100",
  },
  3: {
    bg1: "bg-calculator-th3-background-100",
    bg2: "bg-calculator-th3-background-200",
    bg3: "bg-calculator-th3-background-200",
    key1: "bg-calculator-th3-keys-violet-100",
    key2: "border-b-calculator-th3-keys-violet-200",
    key3: "bg-calculator-th3-keys-cyan-100",
    key4: "border-b-calculator-th3-keys-cyan-200",
    key5: "bg-calculator-th3-keys-dark-violet-100",
    key6: "border-b-calculator-th3-keys-dark-violet-200",
    text1: "text-calculator-th3-text-100",
    text2: "text-calculator-th3-text-200",
    text3: "text-calculator-th3-text-300",
  },
});
export const displayAtom = atom("");

export type KeyType = "number" | "operator" | "dot" | "equal" | "del" | "reset";
export type Key = {
  key: string;
  type: KeyType;
  keyboardKey?: string;
};

const keys: Key[] = [
  { key: "7", type: "number", keyboardKey: "7" },
  { key: "8", type: "number", keyboardKey: "8" },
  { key: "9", type: "number", keyboardKey: "9" },
  { key: "del", type: "del", keyboardKey: "Backspace" },
  { key: "4", type: "number", keyboardKey: "4" },
  { key: "5", type: "number", keyboardKey: "5" },
  { key: "6", type: "number", keyboardKey: "6" },
  { key: "+", type: "operator", keyboardKey: "+" },
  { key: "1", type: "number", keyboardKey: "1" },
  { key: "2", type: "number", keyboardKey: "2" },
  { key: "3", type: "number", keyboardKey: "3" },
  { key: "-", type: "operator", keyboardKey: "-" },
  { key: ".", type: "dot", keyboardKey: "." },
  { key: "0", type: "number", keyboardKey: "0" },
  { key: "/", type: "operator", keyboardKey: "/" },
  { key: "*", type: "operator", keyboardKey: "*" },
  { key: "reset", type: "reset", keyboardKey: "Escape" },
  { key: "=", type: "equal", keyboardKey: "Enter" },
];

export default function MainContent() {
  const classes = useAtomValue(themeClassAtom);
  const theme = useAtomValue(calculatorThemeAtom);

  return (
    <>
      <main
        className={`flex min-h-[100svh] w-screen justify-center text-calculator-th1-text-100 lg:items-center [&_*]:font-league-spartan [&_*]:font-bold ${classes[theme].bg1} px-6 py-[28px]`}
        aria-labelledby="main-heading"
      >
        <h1 className="sr-only" id="main-heading">
          Calculator App
        </h1>
        <div className="w-full min-w-[calc(360px-48px)] max-w-[540px]">
          <Header />
          <Screen />
          <Keyboard />
        </div>
      </main>
      <Footer />
    </>
  );
}

function formatDisplayWithCommas(value: string): string {
  if (!value) return "";

  // Split the expression into tokens (numbers and operators)
  const tokens = value.split(/([+\-*/])/);

  // Format each number token with commas
  const formattedTokens = tokens.map((token) => {
    // Check if it's an operator
    if (/[+\-*/]/.test(token)) {
      return token;
    }

    // It's a number, split into integer and decimal parts
    const parts = token.split(".");
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? `.${parts[1]}` : "";

    // Format integer part with commas
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formattedInteger + decimalPart;
  });

  return formattedTokens.join("");
}

function Header() {
  const classes = useAtomValue(themeClassAtom);
  const [theme, setTheme] = useAtom(calculatorThemeAtom);
  // const setDisplay = useSetAtom(displayAtom);
  const matches = useMediaQuery(MEDIA_QUERY);
  const prevThemeRef = useRef<number>(0);

  useEffect(() => {
    if (prevThemeRef.current !== 0) {
      const updatedTheme = matches ? 3 : 2;
      setTheme(updatedTheme);
      prevThemeRef.current = updatedTheme;
    }
  }, [matches, setTheme]);

  return (
    <header
      className={`flex items-center justify-between ${
        theme === 1 ? classes[theme].text1 : classes[theme].text2
      }`}
    >
      <p className="pl-[7px] text-[32px] tracking-[-0.5px] lg:pt-1 lg:leading-none">
        calc
      </p>
      <div className="flex flex-col items-end gap-[5px] pb-[2px] lg:pb-[8px]">
        <p className="grid w-[70px] grid-cols-3 grid-rows-1 items-center px-[10px] text-[12px] leading-none lg:text-[14px]">
          <span className="text-left">1</span>
          <span className="text-center">2</span>
          <span className="text-right">3</span>
        </p>
        <div className="flex items-center gap-[26px]">
          <p className="pt-[4px] text-[12px] uppercase tracking-[1px] lg:pt-[2px] lg:leading-none">
            theme
          </p>
          <button
            className={`group relative flex h-[26px] w-[71px] items-center rounded-full px-[5px] ${classes[theme].bg2}`}
            onClick={() => {
              setTheme((t) => {
                prevThemeRef.current = t;
                return t === 3 ? 1 : ((t + 1) as calculatorTheme);
              });
            }}
            type="button"
            aria-pressed={theme !== 2}
            aria-label={`Switch to ${(theme % 3) + 1}`}
          >
            <span className="sr-only">Switch Theme</span>
            <motion.div
              animate={{
                left:
                  theme === 1
                    ? "5px"
                    : theme === 2
                      ? "calc(50% - 8px)"
                      : "calc(100% - 21px)",
              }}
              className={`${classes[theme].key3} absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full group-hover:brightness-125`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}

function Screen() {
  const classes = useAtomValue(themeClassAtom);
  const theme = useAtomValue(calculatorThemeAtom);
  const display = useAtomValue(displayAtom);

  const formattedDisplay = formatDisplayWithCommas(display);

  return (
    <div
      className={`mt-7 h-[88px] w-full rounded-[10px] px-6 lg:mt-6 lg:h-[128px] lg:px-8 ${classes[theme].bg3}`}
    >
      <p
        className={`flex h-full w-full items-center justify-end overflow-hidden text-[40px] tracking-[-0.6px] lg:text-[56px] ${
          theme === 1 ? classes[theme].text1 : classes[theme].text2
        }`}
      >
        {formattedDisplay ? formattedDisplay.replace("*", "x") : "0"}
      </p>
    </div>
  );
}

const getCharType = (char: string): KeyType => {
  const ch = keys.find((c) => {
    return c.key === char;
  });
  // biome-ignore lint/style/noNonNullAssertion: Character guaranteed to exist in keys array
  return ch!.type;
};

function Keyboard() {
  const classes = useAtomValue(themeClassAtom);
  const theme = useAtomValue(calculatorThemeAtom);
  const [display, setDisplay] = useAtom(displayAtom);
  const currentInputType = useRef<KeyType>();
  const [isFloat, setIsFloat] = useState(false);

  const handleNumKey = useCallback(
    (k: Key) => {
      if (!currentInputType.current) {
        if (k.key === "0") return;
        setDisplay(k.key);
      } else {
        setDisplay((d) => {
          return (
            (d.endsWith("0") && getCharType(d.slice(-2)[0]) === "operator"
              ? d.slice(0, -1)
              : d) + k.key
          );
        });
      }
      currentInputType.current = k.type;
    },
    [setDisplay],
  );

  const handleReset = useCallback(() => {
    setDisplay("");
    setIsFloat(false);
    currentInputType.current = undefined;
  }, [setDisplay]);

  const handleDelete = useCallback(() => {
    if (!currentInputType.current) return;

    if (currentInputType.current === "dot") {
      setIsFloat(false);
    }

    if (currentInputType.current === "operator" && !isFloat) {
      const dotIndex = getMaxIndex(display, /[.]/g);
      if (dotIndex !== undefined) {
        const oprIndex = getMaxIndex(display.slice(0, -1), /[+\-/*]/g);
        if (!oprIndex || dotIndex > oprIndex) setIsFloat(true);
      }
    }

    setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : ""));
    currentInputType.current =
      display.length > 1 ? getCharType(display.slice(-2, -1)) : undefined;
  }, [display, isFloat, setDisplay]);

  const handleDot = useCallback(() => {
    if (isFloat) return;

    if (!currentInputType.current) {
      setDisplay("0.");
    } else {
      setDisplay(
        (d) => `${d}${currentInputType.current === "operator" ? "0" : ""}.`,
      );
    }
    setIsFloat(true);

    currentInputType.current = "dot";
  }, [isFloat, setDisplay]);

  const handleOperator = useCallback(
    (key: Key) => {
      if (!currentInputType.current) {
        setDisplay(`0${key.key}`);
      } else {
        const curr = (["operator", "dot"] as KeyType[]).includes(
          currentInputType.current,
        )
          ? display.slice(0, -1)
          : display;
        setDisplay(curr + key.key);
      }

      setIsFloat(false);
      currentInputType.current = key.type;
    },
    [display, setDisplay],
  );

  const handleEqual = useCallback(() => {
    const mex = new Mexp();
    const result = String(mex.eval(display));
    setDisplay(result);
    setIsFloat(result.includes("."));
    currentInputType.current = "number";
  }, [display, setDisplay]);

  const handleKeyPress = useCallback(
    (key: Key) => {
      switch (key.type) {
        case "number":
          handleNumKey(key);
          break;
        case "reset":
          handleReset();
          break;
        case "del":
          handleDelete();
          break;
        case "dot":
          handleDot();
          break;
        case "operator":
          handleOperator(key);
          break;
        case "equal":
          handleEqual();
          break;
        default:
          console.log("invalid input");
          break;
      }
    },
    [
      handleNumKey,
      handleReset,
      handleDelete,
      handleDot,
      handleOperator,
      handleEqual,
    ],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default behavior for calculator keys
      if (event.key === "Enter") {
        event.preventDefault();
      }

      const pressedKey = keys.find(
        (k) =>
          k.keyboardKey === event.key || (k.key === "*" && event.key === "x"),
      );

      if (pressedKey) {
        handleKeyPress(pressedKey);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (display.length < 1) {
      setIsFloat(false);
    }
    // console.log({ display, curr: currentInputType.current });
  }, [display]);

  return (
    <div
      className={`mt-6 h-[420px] w-full rounded-[10px] p-6 lg:h-[480px] lg:p-8 lg:pl-[30px] ${classes[theme].bg2}`}
    >
      <div className="grid grid-cols-4 grid-rows-5 gap-[13px] lg:gap-x-[24px] lg:gap-y-6">
        {keys.map((key, index) => {
          return (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={key.key}
              onClick={() => handleKeyPress(key)}
              className={`${
                (key.type === "reset" || key.type === "equal") && "col-span-2"
              } flex h-16 items-center justify-center rounded-[6px] border-b-4 pt-2 uppercase hover:brightness-125 lg:rounded-[10px] ${
                index === 3 || index > 15
                  ? "pb-[6px] text-[19px] lg:pb-[4px] lg:text-[28px]"
                  : index === 15
                    ? "pt-[14px] text-[22px] lg:text-[24px]"
                    : "text-[32px] lg:pb-[2px] lg:text-[40px]"
              } ${
                index === 3 || index === 16
                  ? [
                      classes[theme].key1,
                      classes[theme].key2,
                      classes[theme].text1,
                    ].join(" ")
                  : index === 17
                    ? [
                        classes[theme].key3,
                        classes[theme].key4,
                        classes[theme].text1,
                      ].join(" ")
                    : [
                        classes[theme].key5,
                        classes[theme].key6,
                        classes[theme].text2,
                      ].join(" ")
              }`}
            >
              {key.key.replace("*", "x")}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function Footer() {
  const classes = useAtomValue(themeClassAtom);
  const theme = useAtomValue(calculatorThemeAtom);

  return (
    <footer
      className={`absolute bottom-2 left-0 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy ${
        theme === 2 ? classes[theme].text2 : classes[theme].text1
      }`}
    >
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
