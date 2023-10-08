import Head from "next/head";
import Image from "next/image";
import { atom, useAtom } from "jotai";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import { cn } from "../utils/cn";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const shareMenuAtom = atom(false);

export default function ArticlePreviewComponent() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Article preview component</title>
      </Head>
      <div className="App relative flex min-h-[100svh] flex-col items-center justify-center bg-article-preview-100 py-12 pb-[55px] font-manrope font-medium">
        <Main />
        <Footer />
        {/* <Slider
          basePath="/article-preview-component/design/"
          // absolutePath="/article-preview-component/design/desktop-active-state.jpg"
        /> */}
      </div>
    </>
  );
}

function Main() {
  const [shareMenu, setShareMenu] = useAtom(shareMenuAtom);
  return (
    <div
      className={`grid w-[calc(100vw-48px)] max-w-[calc(375px-48px)] grid-cols-1 grid-rows-[fit-content(200px),auto] gap-0 rounded-[10px] bg-white shadow-2xl shadow-article-preview-300/20 lg:mt-[7px] lg:h-[280px] lg:w-[730px] lg:max-w-none lg:grid-cols-[285px,auto] lg:grid-rows-1 ${
        shareMenu ? "max-lg:mb-2 max-lg:h-[504px]" : "h-[512px]"
      }`}
    >
      <div className="relative aspect-[327/200] w-full overflow-hidden rounded-t-[10px] lg:aspect-[285/280] lg:rounded-l-[10px] lg:rounded-t-none">
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-white/[.175] mix-blend-overlay" />
        <Image
          alt="Drawer"
          src="/article-preview-component/images/drawers.jpg"
          fill
          className="object-cover object-[center_25%] lg:object-[0%_25%]"
        />
      </div>
      <main
        className={`relative flex h-full flex-col rounded-b-[10px] px-8 pt-[min(36px,calc(8px+(24/375*100vw)))] max-lg:overflow-hidden lg:rounded-b-none lg:rounded-r-[10px] lg:px-10 lg:pb-8 lg:pt-8 ${
          shareMenu ? "pb-3" : "pb-5"
        }`}
      >
        <h1 className="font-bold tracking-[.2px] text-article-preview-400 lg:text-[20px] lg:leading-[28px]">
          Shift the overall look and feel by adding these wonderful touches to
          furniture in your home
        </h1>
        <p className="mt-[12px] text-[13px] leading-[20px] tracking-[.12px] text-article-preview-300">
          Ever been in a room and felt like something was missing? Perhaps it
          felt slightly bare and uninviting. I’ve got some simple tips to help
          you make any room feel complete.
        </p>
        <div className="mt-auto flex h-10 items-center lg:relative">
          <Image
            src="/article-preview-component/images/avatar-michelle.jpg"
            alt="Michelle Appleton's Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="ml-4 flex flex-col gap-[7px] pb-[1px] text-[13px] tracking-[.1px]">
            <span className="font-bold leading-none text-article-preview-400">
              Michelle Appleton
            </span>
            <span className="leading-none text-article-preview-200">
              28 Jun 2020
            </span>
          </p>
          <button
            className={`ml-auto flex h-8 w-8 items-center justify-center rounded-full pb-[2px] ${
              shareMenu
                ? "relative z-20 bg-[#6E8098]"
                : "bg-article-preview-100"
            }`}
            onClick={() => setShareMenu((prev) => !prev)}
          >
            <svg
              viewBox="0 0 15 13"
              className={cn([
                "w-[15px] fill-[#6E8098]",
                shareMenu && "fill-article-preview-100",
              ])}
            >
              <use href="/article-preview-component/images/icon-share.svg#icon-share" />
            </svg>
          </button>
          <Transition
            show={shareMenu}
            as={Fragment}
            enter="transition-all duration-75"
            enterFrom="opacity-50 max-lg:-bottom-16"
            enterTo="opacity-100 max-lg:bottom-0"
            leave="transition-all duration-200 lg:duration-75"
            leaveFrom="opacity-100 max-lg:bottom-0 h-[72px] pb-2"
            leaveTo="opacity-0 max-lg:-bottom-16"
          >
            <div className="absolute bottom-0 left-0 flex h-[64px] w-full items-center gap-[17px] bg-article-preview-400 px-8 lg:bottom-16 lg:left-auto lg:right-0 lg:h-[55px] lg:w-[248px] lg:translate-x-[calc(50%-16px)] lg:rounded-lg lg:px-[37px] lg:shadow-lg lg:before:absolute lg:before:-bottom-[5px] lg:before:left-1/2 lg:before:-z-[1] lg:before:h-8 lg:before:w-8 lg:before:-translate-x-1/2 lg:before:rotate-45 lg:before:bg-article-preview-400 lg:before:content-['']">
              <span className="text-[12.5px] uppercase leading-none tracking-[5.2px] text-article-preview-200">
                share
              </span>
              <SocialIcons />
            </div>
          </Transition>
        </div>
      </main>
    </div>
  );
}

function SocialIcons() {
  return (
    <ul className="flex items-center gap-4">
      {(["facebook", "twitter", "pinterest"] as const).map((el) => {
        return (
          <li key={el}>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height={el === "twitter" ? "17" : "20"}
              >
                <use
                  href={`/article-preview-component/images/icon-${el}.svg#icon-${el}`}
                />
              </svg>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:text-article-preview-400 [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
