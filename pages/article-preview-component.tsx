import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { atom, useAtom } from "jotai";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const shareMenuAtom = atom(false);

export default function ArticlePreviewComponent() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Article preview component</title>
      </Head>
      <div className="App font-manrope bg-article-preview-100 relative flex min-h-[100svh] flex-col items-center justify-center py-12 pb-[55px] font-medium">
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
    <div className={`shadow-article-preview-300/20 grid w-[calc(100vw-48px)] max-w-[calc(375px-48px)] grid-cols-1 grid-rows-[fit-content(200px),auto] gap-0 rounded-[10px] bg-white shadow-2xl lg:mt-[7px] lg:h-[280px] lg:w-[730px] lg:max-w-none lg:grid-cols-[285px,auto] lg:grid-rows-1 ${shareMenu ? "max-lg:mb-2 max-lg:h-[504px]" : "h-[512px]"}`}>
      <div className="relative aspect-[327/200] w-full overflow-hidden rounded-t-[10px] lg:aspect-[285/280] lg:rounded-t-none lg:rounded-l-[10px]">
        <div className="absolute top-0 left-0 z-10 h-full w-full bg-white/[.175] mix-blend-overlay" />
        <Image
          alt="Drawer"
          src="/article-preview-component/images/drawers.jpg"
          fill
          className="object-cover object-[center_25%] lg:object-[0%_25%]"
        />
      </div>
      <main className={`relative flex h-full flex-col rounded-b-[10px] px-8 pt-[min(36px,calc(8px+(24/375*100vw)))] max-lg:overflow-hidden lg:rounded-b-none lg:rounded-r-[10px] lg:px-10 lg:pt-8 lg:pb-8 ${shareMenu ? "pb-3" : "pb-5"}`}>
        <h1 className="text-article-preview-400 font-bold tracking-[.2px] lg:text-[20px] lg:leading-[28px]">Shift the overall look and feel by adding these wonderful touches to furniture in your home</h1>
        <p className="text-article-preview-300 mt-[12px] text-[13px] leading-[20px] tracking-[.12px]">Ever been in a room and felt like something was missing? Perhaps it felt slightly bare and uninviting. I’ve got some simple tips to help you make any room feel complete.</p>
        <div className="mt-auto flex h-10 items-center lg:relative">
          <Image
            src="/article-preview-component/images/avatar-michelle.jpg"
            alt="Michelle Appleton's Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="ml-4 flex flex-col gap-[7px] pb-[1px] text-[13px] tracking-[.1px]">
            <span className="text-article-preview-400 font-bold leading-none">Michelle Appleton</span>
            <span className="text-article-preview-200 leading-none">28 Jun 2020</span>
          </p>
          <button
            className={`ml-auto flex h-8 w-8 items-center justify-center rounded-full pb-[2px] ${shareMenu ? "relative z-20 bg-[#6E8098]" : "bg-article-preview-100"}`}
            onClick={() => setShareMenu((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 15 13"
              className={`${shareMenu ? "fill-article-preview-100" : "fill-[#6E8098]"} w-[15px]`}
            >
              <path d="M15 6.495L8.766.014V3.88H7.441C3.33 3.88 0 7.039 0 10.936v2.049l.589-.612C2.59 10.294 5.422 9.11 8.39 9.11h.375v3.867L15 6.495z" />
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
            <div className="bg-article-preview-400 lg:before:bg-article-preview-400 absolute bottom-0 left-0 flex h-[64px] w-full items-center gap-[17px] px-8 lg:right-0 lg:left-auto lg:bottom-16 lg:h-[55px] lg:w-[248px] lg:translate-x-[calc(50%-16px)] lg:rounded-lg lg:px-[37px] lg:shadow-lg lg:before:absolute lg:before:-bottom-[5px] lg:before:left-1/2 lg:before:-z-[1] lg:before:h-8 lg:before:w-8 lg:before:-translate-x-1/2 lg:before:rotate-45 lg:before:content-['']">
              <span className="text-article-preview-200 text-[12.5px] uppercase leading-none tracking-[5.2px]">share</span>
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
      <li>
        <a href="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
          >
            <path
              fill="#FFF"
              d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.793C0 19.506.494 20 1.104 20h9.58v-7.745H8.076V9.237h2.606V7.01c0-2.583 1.578-3.99 3.883-3.99 1.104 0 2.052.082 2.329.119v2.7h-1.598c-1.254 0-1.496.597-1.496 1.47v1.928h2.989l-.39 3.018h-2.6V20h5.098c.608 0 1.102-.494 1.102-1.104V1.104C20 .494 19.506 0 18.896 0z"
            />
          </svg>
        </a>
      </li>
      <li>
        <a href="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="17"
          >
            <path
              fill="#FFF"
              d="M20 2.172a8.192 8.192 0 01-2.357.646 4.11 4.11 0 001.804-2.27 8.22 8.22 0 01-2.605.996A4.096 4.096 0 0013.847.248c-2.65 0-4.596 2.472-3.998 5.037A11.648 11.648 0 011.392 1a4.109 4.109 0 001.27 5.478 4.086 4.086 0 01-1.858-.513c-.045 1.9 1.318 3.679 3.291 4.075a4.113 4.113 0 01-1.853.07 4.106 4.106 0 003.833 2.849A8.25 8.25 0 010 14.658a11.616 11.616 0 006.29 1.843c7.618 0 11.922-6.434 11.663-12.205A8.354 8.354 0 0020 2.172z"
            />
          </svg>
        </a>
      </li>
      <li>
        <a href="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
          >
            <path
              fill="#FFF"
              d="M10 0C4.478 0 0 4.477 0 10c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.545 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.522 0 10-4.477 10-10S15.522 0 10 0z"
            />
          </svg>
        </a>
      </li>
    </ul>
  );
}

function Footer() {
  return (
    <footer className="[&_a]:text-article-preview-400 absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
