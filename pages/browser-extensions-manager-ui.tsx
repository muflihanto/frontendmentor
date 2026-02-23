import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import extensionsData from "../starter_files/browser-extensions-manager-ui/data.json";
import { cn } from "../utils/cn";
import { notoSans } from "../utils/fonts/notoSans";
import { createTabKeyHandler } from "../utils/tabKeyHandler";

const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function BrowserExtensionsManagerUi() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Browser extensions manager UI</title>
      </Head>
      <div
        className={cn(
          "App relative min-h-[100svh] bg-white font-noto-sans",
          notoSans.variable,
        )}
      >
        <Main />
        <Footer />
        {/* <Slider
          basePath="/browser-extensions-manager-ui/design"
          // absolutePath="/browser-extensions-manager-ui/design/mobile-design-light.jpg"
          absolutePath="/browser-extensions-manager-ui/design/desktop-design-light-focus.jpg"
        /> */}
      </div>
    </>
  );
}

const tabs = ["All", "Active", "Inactive"] as const;

type Tab = (typeof tabs)[number];

type Extension = (typeof extensionsData)[number];

type ExtensionsState = Record<string, boolean>;

function ExtensionCard({
  extension,
  onRemove,
  onToggle,
}: {
  extension: Extension;
  onRemove: () => void;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[200px] flex-col rounded-[18px] border border-browser-extensions-neutral-200 bg-browser-extensions-neutral-0 px-[18px] py-[19px] shadow-sm lg:px-[19px]",
        "dark:border-browser-extensions-neutral-600 dark:bg-browser-extensions-neutral-800",
      )}
    >
      <div className="flex gap-4">
        <div className="relative aspect-square h-[60px] flex-shrink-0 rounded-lg">
          <Image
            src={extension.logo.replace(".", "/browser-extensions-manager-ui")}
            alt={extension.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex-1">
          <h2
            className={cn(
              "text-[20px]/[20px] font-bold leading-tight tracking-[-0.01rem] text-browser-extensions-neutral-900",
              "dark:text-browser-extensions-neutral-0",
            )}
          >
            {extension.name}
          </h2>
          <p
            className={cn(
              "mt-[7px] text-base leading-[1.375] tracking-[-0.03rem] text-browser-extensions-neutral-600",
              "dark:text-browser-extensions-neutral-300",
            )}
          >
            {extension.description}
          </p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <button
          type="button"
          onClick={onRemove}
          className={cn(
            "h-[38px] rounded-full border border-browser-extensions-neutral-300 bg-browser-extensions-neutral-0 px-4 text-base font-medium tracking-tight text-browser-extensions-neutral-900 transition-colors lg:tracking-[-0.04rem]",
            "hover:border-browser-extensions-red-700 hover:bg-browser-extensions-red-700 hover:text-browser-extensions-neutral-0",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-browser-extensions-red-700 focus-visible:ring-offset-2",
            "dark:border-browser-extensions-neutral-600 dark:bg-transparent dark:text-browser-extensions-neutral-0",
            "dark:hover:border-browser-extensions-red-400 dark:hover:bg-browser-extensions-red-400 dark:hover:text-browser-extensions-neutral-900",
            "dark:focus-visible:ring-browser-extensions-red-400 dark:focus-visible:ring-offset-browser-extensions-neutral-800",
          )}
        >
          Remove
        </button>
        <button
          type="button"
          role="switch"
          aria-checked={extension.isActive}
          aria-label={`Toggle ${extension.name} extension`}
          onClick={onToggle}
          className={cn(
            "relative h-5 w-9 rounded-full transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-browser-extensions-red-700 focus-visible:ring-offset-2",
            "dark:focus-visible:ring-browser-extensions-red-400 dark:focus-visible:ring-offset-browser-extensions-neutral-800",
            extension.isActive
              ? "bg-browser-extensions-red-700 hover:bg-browser-extensions-red-500 dark:bg-browser-extensions-red-400 dark:hover:bg-browser-extensions-red-500"
              : "bg-browser-extensions-neutral-300 hover:bg-opacity-75 dark:bg-browser-extensions-neutral-600 dark:hover:bg-opacity-75",
          )}
        >
          <span
            className={cn(
              "absolute top-1/2 aspect-square h-4 -translate-y-1/2 rounded-full bg-browser-extensions-neutral-0 transition-transform",
              extension.isActive ? "left-[18px]" : "left-[2px]",
            )}
          />
        </button>
      </div>
    </div>
  );
}

function Main() {
  const [selectedTab, setSelectedTab] = useState<Tab>("All");
  const [extensions, setExtensions] = useState<Extension[]>(extensionsData);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const onTabKeyDown = createTabKeyHandler();

  useEffect(() => {
    const saved = localStorage.getItem("browser-extensions-theme");
    const prefersDark =
      saved !== null
        ? saved === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const savedExtensions = localStorage.getItem("browser-extensions-state");
    if (savedExtensions) {
      try {
        const parsed: ExtensionsState = JSON.parse(
          savedExtensions,
        ) as ExtensionsState;
        // Validate that parsed is actually an object and not null/array
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          setExtensions((prev) =>
            prev.map((ext) => ({
              ...ext,
              isActive: parsed[ext.name] ?? ext.isActive,
            })),
          );
        } else {
          // Invalid data structure, log and remove corrupted entry
          console.error(
            "Invalid extensions state format in localStorage, resetting",
          );
          localStorage.removeItem("browser-extensions-state");
        }
      } catch (error) {
        // Parse error - log and remove corrupted entry
        console.error(
          "Failed to parse extensions state from localStorage:",
          error,
        );
        localStorage.removeItem("browser-extensions-state");
      }
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("browser-extensions-theme", isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const state: ExtensionsState = {};
    extensions.forEach((ext) => {
      state[ext.name] = ext.isActive;
    });
    localStorage.setItem("browser-extensions-state", JSON.stringify(state));
  }, [extensions, mounted]);

  const filteredExtensions = useMemo((): Extension[] => {
    switch (selectedTab) {
      case "Active":
        return extensions.filter((ext) => ext.isActive);
      case "Inactive":
        return extensions.filter((ext) => !ext.isActive);
      default:
        return extensions;
    }
  }, [selectedTab, extensions]);

  const handleRemove = (index: number) => {
    const actualIndex = extensions.findIndex(
      (ext) => ext.name === filteredExtensions[index].name,
    );
    setExtensions((prev) => prev.filter((_, i) => i !== actualIndex));
  };

  const handleToggle = (index: number) => {
    const actualIndex = extensions.findIndex(
      (ext) => ext.name === filteredExtensions[index].name,
    );
    setExtensions((prev) =>
      prev.map((ext, i) =>
        i === actualIndex ? { ...ext, isActive: !ext.isActive } : ext,
      ),
    );
  };

  return (
    <main
      className={cn(
        "min-h-[100svh] bg-gradient-to-b from-browser-extensions-gradient-light-0 to-browser-extensions-gradient-light-100 px-4 pb-10 pt-5 md:px-6 md:pb-12 md:pt-6 lg:px-[135px] lg:pb-[66px] lg:pt-[40px]",
        "dark:from-browser-extensions-gradient-dark-0 dark:to-browser-extensions-gradient-dark-100",
      )}
    >
      <header
        className={cn(
          "flex items-center justify-between rounded-xl border border-browser-extensions-neutral-200 bg-browser-extensions-neutral-0 px-3 py-2 shadow md:px-4 md:py-[12px] lg:rounded-[22px]",
          "dark:border-browser-extensions-neutral-800 dark:bg-browser-extensions-neutral-800",
        )}
      >
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
        {mounted && (
          <button
            role="switch"
            aria-checked={isDark}
            aria-label="Toggle dark mode"
            type="button"
            onClick={() => setIsDark(!isDark)}
            className={cn(
              "flex aspect-square w-12 items-center justify-center rounded-lg bg-browser-extensions-neutral-100 transition-colors hover:bg-browser-extensions-neutral-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-browser-extensions-red-700 focus-visible:ring-offset-2",
              "dark:bg-browser-extensions-neutral-700 dark:hover:bg-browser-extensions-neutral-600",
              "dark:focus-visible:ring-browser-extensions-red-400 dark:focus-visible:ring-offset-browser-extensions-neutral-800",
            )}
          >
            <svg
              viewBox="0 0 22 22"
              className="w-[22px]"
              role="graphics-symbol"
              aria-hidden="true"
            >
              <g className={isDark ? "block" : "hidden"}>
                <use href="/browser-extensions-manager-ui/assets/images/icon-sun.svg#icon-sun" />
              </g>
              <g className={isDark ? "hidden" : "block"}>
                <use href="/browser-extensions-manager-ui/assets/images/icon-moon.svg#icon-moon" />
              </g>
            </svg>
          </button>
        )}
      </header>

      <div className="mt-[31px] flex flex-col gap-4 md:mt-12 md:flex-row md:items-center md:justify-between lg:mt-[61px] lg:gap-6">
        <h1
          id="extensions"
          className={cn(
            "text-center text-[34px] font-bold tracking-[-0.055rem] text-browser-extensions-neutral-900 md:text-left",
            "dark:text-browser-extensions-neutral-0",
          )}
        >
          Extensions List
        </h1>
        <div
          role="tablist"
          aria-labelledby="extensions"
          className="flex items-center justify-center gap-3"
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
                  onKeyDown={onTabKeyDown}
                  className={cn(
                    "h-[46px] rounded-full border border-browser-extensions-neutral-300 bg-browser-extensions-neutral-0 px-[19px] pb-0.5 text-xl tracking-[-0.01rem] text-browser-extensions-neutral-900 shadow-sm transition-all hover:border-browser-extensions-neutral-200 hover:text-browser-extensions-neutral-600 hover:shadow-none",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-browser-extensions-red-700 focus-visible:ring-offset-2",
                    "aria-selected:border-browser-extensions-red-700 aria-selected:bg-browser-extensions-red-700 aria-selected:text-browser-extensions-neutral-0 aria-selected:hover:border-browser-extensions-red-500 aria-selected:hover:bg-browser-extensions-red-500",
                    "dark:border-browser-extensions-neutral-700 dark:bg-browser-extensions-neutral-800 dark:text-browser-extensions-neutral-0 dark:hover:border-browser-extensions-neutral-800 dark:hover:bg-browser-extensions-neutral-600 dark:hover:shadow-lg",
                    "dark:focus-visible:ring-browser-extensions-red-400 dark:focus-visible:ring-offset-browser-extensions-neutral-900",
                    "dark:aria-selected:border-browser-extensions-red-400 dark:aria-selected:bg-browser-extensions-red-400 dark:aria-selected:text-browser-extensions-neutral-900",
                    "dark:aria-selected:hover:border-browser-extensions-red-500 dark:aria-selected:hover:bg-browser-extensions-red-500",
                  )}
                >
                  {tab}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {mounted && (
        <div
          role="tabpanel"
          id="tabpanel"
          aria-labelledby={`tab-${selectedTab.toLowerCase()}`}
          className={cn(
            "mt-10 grid grid-cols-1 gap-[12px] md:mt-12 md:grid-cols-2 lg:mt-[30px] lg:grid-cols-3",
            "dark:mt-8",
          )}
        >
          {filteredExtensions.map((extension, index) => (
            <ExtensionCard
              key={extension.name}
              extension={extension}
              onRemove={() => handleRemove(index)}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      )}
    </main>
  );
}

function Footer() {
  return (
    <footer
      className={cn(
        "absolute bottom-3 w-full text-center text-[11px] text-browser-extensions-neutral-900",
        "dark:text-browser-extensions-neutral-0",
        "[&_a:focus-visible]:rounded-sm [&_a:focus-visible]:outline-none [&_a:focus-visible]:ring-2 [&_a:focus-visible]:ring-browser-extensions-red-700 [&_a:focus-visible]:ring-offset-2",
        "dark:[&_a:focus-visible]:ring-browser-extensions-red-400 dark:[&_a:focus-visible]:ring-offset-browser-extensions-neutral-900",
        "[&_a:hover]:text-browser-extensions-red-700 dark:[&_a:hover]:text-browser-extensions-red-400",
        "[&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy dark:[&_a]:decoration-browser-extensions-red-400",
      )}
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
