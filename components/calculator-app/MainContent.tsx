import { atom, useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type calculatorTheme = 1 | 2 | 3;

export const calculatorThemeAtom = atomWithStorage<calculatorTheme>("calc-theme", 1);
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
  { key: "x", type: "operator" },
  { key: "reset", type: "reset" },
  { key: "=", type: "equal" },
];

export default function MainContent() {
  const classes = useAtomValue(themeClassAtom);
  const theme = useAtomValue(calculatorThemeAtom);

  return (
    <>
      <div className={`text-calculator-th1-text-100 [&_*]:font-league-spartan min-h-[100svh] w-screen [&_*]:font-bold ${classes[theme].bg1} px-6 py-[28px]`}>
        <Header />
        <Screen />
        <Keyboard />
      </div>
      <Footer />
    </>
  );
}

function Header() {
  const classes = useAtomValue(themeClassAtom);
  const [theme, setTheme] = useAtom(calculatorThemeAtom);

  return (
    <>
      <div className={`flex items-center justify-between ${theme === 1 ? classes[theme].text1 : classes[theme].text2}`}>
        <p className="pl-[7px] text-[32px] tracking-[-0.5px]">calc</p>
        <div className="flex flex-col items-end gap-[5px] pb-[2px]">
          <p className="grid w-[70px] grid-cols-3 grid-rows-1 items-center px-[10px] text-[12px] leading-none">
            <span className="text-left">1</span>
            <span className="text-center">2</span>
            <span className="text-right">3</span>
          </p>
          <div className="flex items-center gap-[26px]">
            <p className="pt-[4px] text-[12px] uppercase tracking-[1px]">theme</p>
            <button
              className={`group flex h-[26px] w-[71px] items-center rounded-full px-[5px] ${classes[theme].bg2} ${theme === 1 ? "justify-start" : theme === 2 ? "justify-center" : "justify-end"}`}
              onClick={() => {
                setTheme((t) => {
                  return t === 3 ? 1 : ((t + 1) as calculatorTheme);
                });
              }}
            >
              <div className={`${classes[theme].key3} h-4 w-4 rounded-full group-hover:brightness-125`}></div>
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

  return (
    <div className={`mt-7 h-[88px] w-full rounded-[10px] ${classes[theme].bg3}`}>
      <p className={`flex h-full w-full items-center justify-end px-6 text-[40px] tracking-[-0.6px] ${theme === 1 ? classes[theme].text1 : classes[theme].text2}`}>399,981</p>
    </div>
  );
}

function Keyboard() {
  const classes = useAtomValue(themeClassAtom);
  const theme = useAtomValue(calculatorThemeAtom);

  return (
    <div className={`mt-6 h-[420px] w-full rounded-[10px] p-6 ${classes[theme].bg2}`}>
      <div className="grid grid-cols-4 grid-rows-5 gap-[13px]">
        {keys.map((key, index) => {
          return (
            <button
              key={index}
              className={`${(key.type === "reset" || key.type === "equal") && "col-span-2"} flex h-16 items-center justify-center rounded-[6px] border-b-4 pt-2 uppercase hover:brightness-125 ${index === 3 || index > 15 ? "pb-[6px] text-[19px]" : index === 15 ? "pt-[14px] text-[22px]" : "text-[32px]"} ${
                index === 3 || index === 16 ? [classes[theme].key1, classes[theme].key2, classes[theme].text1].join(" ") : index === 17 ? [classes[theme].key3, classes[theme].key4, classes[theme].text1].join(" ") : [classes[theme].key5, classes[theme].key6, classes[theme].text2].join(" ")
              }`}
            >
              {key.key}
            </button>
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
    <footer className={`absolute bottom-2 left-0 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy ${theme === 2 ? classes[theme].text2 : classes[theme].text1}`}>
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
