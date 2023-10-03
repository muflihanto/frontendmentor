import { motion } from "framer-motion";
import {
  atom,
  useAtom,
  useAtomValue,
  // useSetAtom
} from "jotai";
import { atomWithStorage } from "jotai/utils";
import Mexp from "math-expression-evaluator";
import { useEffect, useRef, useState } from "react";
import { getMaxIndex } from "../../utils/indexesOf";

export type calculatorTheme = 1 | 2 | 3;

export const calculatorThemeAtom = atomWithStorage<calculatorTheme>(
  "calc-theme",
  1,
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
};

const keys: Key[] = [
  { key: "7", type: "number" },
  { key: "8", type: "number" },
  { key: "9", type: "number" },
  { key: "del", type: "del" },
  { key: "4", type: "number" },
  { key: "5", type: "number" },
  { key: "6", type: "number" },
  { key: "+", type: "operator" },
  { key: "1", type: "number" },
  { key: "2", type: "number" },
  { key: "3", type: "number" },
  { key: "-", type: "operator" },
  { key: ".", type: "dot" },
  { key: "0", type: "number" },
  { key: "/", type: "operator" },
  { key: "*", type: "operator" },
  { key: "reset", type: "reset" },
  { key: "=", type: "equal" },
];

export default function MainContent() {
  const classes = useAtomValue(themeClassAtom);
  const theme = useAtomValue(calculatorThemeAtom);

  return (
    <>
      <div
        className={`flex min-h-[100svh] w-screen justify-center text-calculator-th1-text-100 lg:items-center [&_*]:font-league-spartan [&_*]:font-bold ${classes[theme].bg1} px-6 py-[28px]`}
      >
        <div className="w-full min-w-[calc(360px-48px)] max-w-[540px]">
          <Header />
          <Screen />
          <Keyboard />
        </div>
      </div>
      <Footer />
    </>
  );
}

// TODO:
// - See the size of the elements adjust based on their device's screen size
// - Perform mathematical operations like addition, subtraction, multiplication, and division
// - Adjust the color theme based on their preference
// - **Bonus**: Have their initial theme preference checked using `prefers-color-scheme` and have any additional changes saved in the browser

// TODO: Format display

function Header() {
  const classes = useAtomValue(themeClassAtom);
  const [theme, setTheme] = useAtom(calculatorThemeAtom);
  // const setDisplay = useSetAtom(displayAtom);

  return (
    <>
      <div
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
                  return t === 3 ? 1 : ((t + 1) as calculatorTheme);
                });
              }}
            >
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
              ></motion.div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Screen() {
  const classes = useAtomValue(themeClassAtom);
  const theme = useAtomValue(calculatorThemeAtom);
  const display = useAtomValue(displayAtom);

  return (
    <div
      className={`mt-7 h-[88px] w-full rounded-[10px] px-6 lg:mt-6 lg:h-[128px] lg:px-8 ${classes[theme].bg3}`}
    >
      <p
        className={`flex h-full w-full items-center justify-end overflow-hidden text-[40px] tracking-[-0.6px] lg:text-[56px] ${
          theme === 1 ? classes[theme].text1 : classes[theme].text2
        }`}
      >
        {!!display ? display.replace("*", "x") : "0"}
      </p>
    </div>
  );
}

function Keyboard() {
  const classes = useAtomValue(themeClassAtom);
  const theme = useAtomValue(calculatorThemeAtom);
  const [display, setDisplay] = useAtom(displayAtom);
  const currentInputType = useRef<KeyType>();
  const [isFloat, setIsFloat] = useState(false);

  const getCharType = (char: string): KeyType => {
    const ch = keys.find((c) => {
      return c.key === char;
    });
    return ch!.type;
  };

  const handleNumKey = (k: Key) => {
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
  };

  const handleReset = () => {
    setDisplay("");
    setIsFloat(false);
    currentInputType.current = undefined;
  };

  const handleDelete = () => {
    if (!currentInputType.current) return;

    if (currentInputType.current === "dot") {
      setIsFloat(false);
    }

    if (currentInputType.current === "operator" && !isFloat) {
      const dotIndex = getMaxIndex(display, /[\.]/g);
      if (!!dotIndex) {
        const oprIndex = getMaxIndex(display.slice(0, -1), /\+|\-|\/|\*/g);
        if (!oprIndex || dotIndex > oprIndex) setIsFloat(true);
      }
    }

    setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : ""));
    currentInputType.current =
      display.length > 1 ? getCharType(display.slice(-2, -1)) : undefined;
  };

  const handleDot = () => {
    if (isFloat) return;

    if (!currentInputType.current) {
      setDisplay("0.");
    } else {
      setDisplay(
        (d) => d + `${currentInputType.current === "operator" ? "0" : ""}.`,
      );
    }
    setIsFloat(true);

    currentInputType.current = "dot";
  };

  const handleOperator = (key: Key) => {
    if (!currentInputType.current) {
      setDisplay("0" + key.key);
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
  };

  const handleEqual = () => {
    const mex = new Mexp();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const result = String(mex.eval(display));
    setDisplay(result);
    setIsFloat(result.includes("."));
    currentInputType.current = "number";
  };

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
              key={index}
              onClick={() => {
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
              }}
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
