import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebounce } from "usehooks-ts";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

/**
 * Your users should be able to:
 * - See all countries from the API on the homepag
 * - Search for a country using an `input` fiel
 * - Filter countries by regio
 * - Click on a country to see more detailed information on a separate pag
 * - Click through to the border countries on the detail pag
 * - Toggle the color scheme between light and dark mode *(optional)*
 *
 * [REST Countries API](https://restcountries.com)
 */

const themeAtom = atomWithStorage<boolean>("rcapi-dark-mode", false);
const inputAtom = atom<string>("");

export default function RestCountriesApiWithColorThemeSwitcher() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Rest Countries Api With Color Theme Switcher</title>
      </Head>
      <div className="App font-nunito-sans relative min-h-[100svh] font-light">
        <Header />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/rest-countries-api-with-color-theme-switcher/design"
          // absolutePath="/rest-countries-api-with-color-theme-switcher/design/mobile-design-home-dark.jpg"
          absolutePath="/rest-countries-api-with-color-theme-switcher/design/mobile-design-home-light.jpg"
        /> */}
      </div>
    </>
  );
}

function Header() {
  const [dark, setDark] = useAtom(themeAtom);
  const toggle = () => {
    setDark((d) => !d);
  };

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <header className="shadow-rest-countries-darkblue-100/5 dark:bg-rest-countries-darkblue-100 relative z-10 flex h-20 items-center justify-between px-4 shadow-md">
      <h1 className="text-rest-countries-darkblue-200 dark:text-rest-countries-gray-100 text-[14px] font-extrabold tracking-[-.1px]">Where in the world?</h1>
      <button
        className="text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 flex items-center px-px pt-px text-[12px] font-normal"
        onClick={() => toggle()}
      >
        <span className="relative mr-[10px] aspect-square h-[14px]">
          <Image
            src={dark ? "/rest-countries-api-with-color-theme-switcher/images/moon.svg" : "/rest-countries-api-with-color-theme-switcher/images/moon-outline.svg"}
            fill
            alt="Moon Icon"
          />
        </span>
        <span>Dark Mode</span>
      </button>
    </header>
  );
}

function InputField() {
  const [input, setInput] = useAtom(inputAtom);
  const debouncedValue = useDebounce<string>(input, 500);

  // useEffect(() => {
  //   console.log(debouncedValue);
  // }, [debouncedValue]);

  return (
    <form className="relative h-12 w-full">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="text-rest-countries-gray-300/60 absolute left-8 top-1/2 w-[15px] -translate-y-1/2"
      />
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className="shadow-rest-countries-gray-300/10 text-rest-countries-gray-300 h-full w-full rounded px-4 py-2 pl-[74px] text-[12px] tracking-[.05px] shadow-md placeholder:opacity-50"
        placeholder="Search for a country..."
      />
    </form>
  );
}

function Main() {
  return (
    <div className="bg-rest-countries-gray-200 h-52 px-4 pt-6">
      <InputField />
      {`
         
      `}
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
