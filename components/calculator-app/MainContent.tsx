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
    key2: "bg-calculator-th1-keys-blue-200",
    key3: "bg-calculator-th1-keys-red-100",
    key4: "bg-calculator-th1-keys-red-200",
    key5: "bg-calculator-th1-keys-orange-100",
    key6: "bg-calculator-th1-keys-orange-200",
    text1: "text-calculator-th1-text-100",
    text2: "text-calculator-th1-text-200",
    text3: "text-calculator-th1-text-100",
  },
  2: {
    bg1: "bg-calculator-th2-background-100",
    bg2: "bg-calculator-th2-background-200",
    bg3: "bg-calculator-th2-background-300",
    key1: "bg-calculator-th2-keys-cyan-100",
    key2: "bg-calculator-th2-keys-cyan-200",
    key3: "bg-calculator-th2-keys-orange-100",
    key4: "bg-calculator-th2-keys-orange-200",
    key5: "bg-calculator-th2-keys-gray-100",
    key6: "bg-calculator-th2-keys-gray-200",
    text1: "text-calculator-th2-text-100",
    text2: "text-calculator-th2-text-200",
    text3: "text-calculator-th2-text-100",
  },
  3: {
    bg1: "bg-calculator-th3-background-100",
    bg2: "bg-calculator-th3-background-200",
    bg3: "bg-calculator-th3-background-200",
    key1: "bg-calculator-th3-keys-violet-100",
    key2: "bg-calculator-th3-keys-violet-200",
    key3: "bg-calculator-th3-keys-cyan-100",
    key4: "bg-calculator-th3-keys-cyan-200",
    key5: "bg-calculator-th3-keys-dark-violet-100",
    key6: "bg-calculator-th3-keys-dark-violet-200",
    text1: "text-calculator-th3-text-100",
    text2: "text-calculator-th3-text-200",
    text3: "text-calculator-th3-text-300",
  },
});

export default function MainContent() {
  const classes = useAtomValue(themeClassAtom);
  const [theme, setTheme] = useAtom(calculatorThemeAtom);

  return (
    <div className={`text-calculator-th1-text-100 [&_*]:font-league-spartan min-h-[100svh] w-screen [&_*]:font-bold ${classes[theme].bg1} px-6 py-[28px]`}>
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
              className={`flex h-[26px] w-[71px] items-center rounded-full px-[5px] ${classes[theme].bg2} ${theme === 1 ? "justify-start" : theme === 2 ? "justify-center" : "justify-end"}`}
              onClick={() => {
                setTheme((t) => {
                  return t === 3 ? 1 : ((t + 1) as calculatorTheme);
                });
              }}
            >
              <div className={`${classes[theme].key3} h-4 w-4 rounded-full`}></div>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Footer() {
  const classes = useAtomValue(themeClassAtom);
  const theme = useAtomValue(calculatorThemeAtom);

  return (
    <footer className={`absolute bottom-3 left-0 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy ${theme === 2 ? classes[theme].text2 : classes[theme].text1}`}>
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
