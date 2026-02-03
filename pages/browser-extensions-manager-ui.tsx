import dynamic from "next/dynamic";
import Head from "next/head";
// import { useEffect } from "react";
import { cn } from "../utils/cn";

const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function BrowserExtensionsManagerUi() {
  // useEffect(() => {
  //   document.documentElement.classList.add("dark");
  // }, []);

  return (
    <>
      <Head>
        <title>Frontend Mentor | Browser extensions manager UI</title>
      </Head>
      <div className="App relative min-h-[100svh] bg-white">
        <Main />
        <Footer />
        <Slider
          basePath="/browser-extensions-manager-ui/design"
          // absolutePath="/browser-extensions-manager-ui/design/mobile-design-dark.jpg"
          absolutePath="/browser-extensions-manager-ui/design/mobile-design-light.jpg"
        />
      </div>
    </>
  );
}

function Main() {
  return (
    <main className="min-h-[2866px] bg-gradient-to-b from-browser-extensions-gradient-light-0 to-browser-extensions-gradient-light-100 px-4 py-5 dark:from-browser-extensions-gradient-dark-0 dark:to-browser-extensions-gradient-dark-100 dark:py-6">
      <header className="flex items-center justify-between rounded-lg border border-browser-extensions-neutral-200 bg-browser-extensions-neutral-0 px-3 py-2 shadow dark:border-browser-extensions-neutral-800 dark:bg-browser-extensions-neutral-800">
        <svg
          viewBox="0 0 179 41"
          className={cn(
            "aspect-[179/41] h-[41px]",
            "[--logo-shape:theme(colors.browser-extensions.red.700)] dark:[--logo-shape:theme(colors.browser-extensions.red.400)]",
            "[--logo-text:theme(colors.browser-extensions.neutral.800)] dark:[--logo-text:theme(colors.white)]",
          )}
          role="graphics-symbol"
          aria-hidden="true"
        >
          <use href="/browser-extensions-manager-ui/assets/images/logo.svg#logo" />
        </svg>
        <button
          role="switch"
          aria-checked="false"
          type="button"
          className="flex aspect-square w-12 items-center justify-center rounded-lg bg-browser-extensions-neutral-100 dark:bg-browser-extensions-neutral-700"
        >
          <svg
            viewBox="0 0 22 22"
            className="w-[22px]"
            role="graphics-symbol"
            aria-hidden="true"
          >
            {/* <use href="/browser-extensions-manager-ui/assets/images/icon-sun.svg#icon-sun" /> */}
            <use href="/browser-extensions-manager-ui/assets/images/icon-moon.svg#icon-moon" />
          </svg>
        </button>
      </header>
      {/* {`
        Extensions List

        All
        Active
        Inactive

        <!-- If you plan to use the JSON file to populate the data dynamically, you can delete the content below -->

        DevLens
        Quickly inspect page layouts and visualize element boundaries.
        Remove

        StyleSpy
        Instantly analyze and copy CSS from any webpage element.
        Remove

        SpeedBoost
        Optimizes browser resource usage to accelerate page loading.
        Remove

        JSONWizard
        Formats, validates, and prettifies JSON responses in-browser.
        Remove

        TabMaster Pro
        Organizes browser tabs into groups and sessions.
        Remove

        ViewportBuddy
        Simulates various screen resolutions directly within the browser.
        Remove

        Markup Notes
        Enables annotation and notes directly onto webpages for collaborative debugging.
        Remove

        GridGuides
        Overlay customizable grids and alignment guides on any webpage.
        Remove

        Palette Picker
        Instantly extracts color palettes from any webpage.
        Remove

        LinkChecker
        Scans and highlights broken links on any page.
        Remove

        DOM Snapshot
        Capture and export DOM structures quickly.
        Remove

        ConsolePlus
        Enhanced developer console with advanced filtering and logging.
        Remove
      `} */}
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-black [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
