import Head from "next/head";
import Image from "next/image";
import { useDarkMode } from "usehooks-ts";
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
 */

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
          absolutePath="/rest-countries-api-with-color-theme-switcher/design/mobile-design-home-light.jpg"
        /> */}
      </div>
    </>
  );
}

function Header() {
  const { isDarkMode, toggle } = useDarkMode(false);
  return (
    <header className="shadow-rest-countries-darkblue-100/5 flex h-20 items-center justify-between px-4 shadow-md">
      <h1 className="text-rest-countries-darkblue-200 text-[14px] font-extrabold tracking-[-.1px]">Where in the world?</h1>
      <button
        className="text-rest-countries-darkblue-300 flex items-center px-px pt-px text-[12px] font-normal"
        onClick={() => toggle()}
      >
        <span className="relative mr-[10px] aspect-square h-[14px]">
          <Image
            src={isDarkMode ? "/rest-countries-api-with-color-theme-switcher/images/moon.svg" : "/rest-countries-api-with-color-theme-switcher/images/moon-outline.svg"}
            fill
            alt="Moon Icon"
          />
        </span>
        <span>Dark Mode</span>
      </button>
    </header>
  );
}

function Main() {
  return (
    <div className="">
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
