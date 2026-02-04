import dynamic from "next/dynamic";
import Head from "next/head";
// import { useEffect } from "react";
import { useState } from "react";

import { cn } from "../utils/cn";
import { notoSans } from "../utils/fonts/notoSans";

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
      <div
        className={`App relative min-h-[100svh] bg-white font-noto-sans ${notoSans.variable}`}
      >
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

const tabs = ["All", "Active", "Inactive"] as const;

function Main() {
  const [selectedTab, setSelectedTab] = useState<(typeof tabs)[number]>("All");

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
      <h1
        id="extensions"
        className="mt-[31px] w-full text-center text-[34px] font-bold tracking-[-0.055rem] text-browser-extensions-neutral-900"
      >
        Extensions List
      </h1>
      <div
        role="tablist"
        aria-labelledby="extensions"
        className="mt-4 flex items-center justify-center gap-3"
      >
        {tabs.map((tab) => {
          return (
            <div key={tab}>
              <button
                role="tab"
                type="button"
                id={`tab-${tab.toLowerCase()}`}
                aria-selected={tab === selectedTab}
                onClick={() => {
                  setSelectedTab(tab);
                }}
                className="h-[46px] rounded-full border border-browser-extensions-neutral-300 bg-browser-extensions-neutral-0 px-[19px] pb-0.5 text-xl tracking-[-0.01rem] text-browser-extensions-neutral-900 shadow-sm aria-selected:border-browser-extensions-red-700 aria-selected:bg-browser-extensions-red-700 aria-selected:text-browser-extensions-neutral-0"
              >
                {tab}
              </button>
            </div>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id="tabpanel"
        aria-labelledby={`tab-${selectedTab.toLowerCase()}`}
      ></div>
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
