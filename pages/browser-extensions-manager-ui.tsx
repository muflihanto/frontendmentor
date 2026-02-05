import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
// import { useEffect } from "react";
import { useMemo, useState } from "react";

import extensionsData from "../starter_files/browser-extensions-manager-ui/data.json";
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

type Extension = (typeof extensionsData)[number];

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
    <div className="rounded-[18px] border border-browser-extensions-neutral-200 bg-browser-extensions-neutral-0 px-[18px] py-[19px] shadow-sm">
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
          <h2 className="text-[20px]/[20px] font-bold leading-tight text-browser-extensions-neutral-900">
            {extension.name}
          </h2>
          <p className="mt-[7px] leading-[1.375] tracking-[-0.0275rem] text-browser-extensions-neutral-600">
            {extension.description}
          </p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onRemove}
          className="h-[38px] rounded-full border border-browser-extensions-neutral-300 bg-browser-extensions-neutral-0 px-4 font-medium tracking-tight text-browser-extensions-neutral-900 transition-colors"
        >
          Remove
        </button>
        <button
          type="button"
          role="switch"
          aria-checked={extension.isActive}
          onClick={onToggle}
          className={cn(
            "relative h-5 w-9 rounded-full transition-colors",
            extension.isActive
              ? "bg-browser-extensions-red-700"
              : "bg-browser-extensions-neutral-300",
          )}
        >
          <span
            className={cn(
              "absolute top-1/2 aspect-square h-4 -translate-y-1/2 rounded-full bg-browser-extensions-neutral-0 transition-transform",
              extension.isActive ? "left-[17px]" : "left-[3px]",
            )}
          />
        </button>
      </div>
    </div>
  );
}

function Main() {
  const [selectedTab, setSelectedTab] = useState<(typeof tabs)[number]>("All");
  const [extensions, setExtensions] = useState<Extension[]>(extensionsData);

  const filteredExtensions = useMemo(() => {
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
        className="mt-10 flex flex-col gap-[12px]"
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
