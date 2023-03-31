import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { CSSProperties, useState } from "react";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function FyloDataStorageComponent() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Fylo data storage component</title>
      </Head>
      <div className="App font-raleway bg-fylo-storage-neutral-400 lg:[@media(max-aspect-ratio:9/5)]:bg-[center_bottom] relative flex min-h-[100svh] items-center justify-center bg-[url('/fylo-data-storage-component/images/bg-mobile.png')] bg-cover bg-no-repeat pt-11 pb-20 lg:bg-[url('/fylo-data-storage-component/images/bg-desktop.png')] lg:bg-contain lg:bg-[50%_47.5vh] lg:pt-[59px]">
        <Main />
        <Footer />
        {/* <Slider basePath="/fylo-data-storage-component/design" /> */}
      </div>
    </>
  );
}

function Navigation() {
  return (
    <header className="bg-fylo-storage-neutral-300 shadow-fylo-storage-neutral-400/70 flex h-[201px] w-full max-w-[480px] flex-col items-start justify-center gap-[33px] rounded-[10px] rounded-tr-[100px] px-[41px] shadow-2xl lg:max-w-none">
      <div className="relative aspect-[135/40] h-10">
        <Image
          src="/fylo-data-storage-component/images/logo.svg"
          alt="Fylo Company Logo"
          className="object-contain"
          fill
        />
      </div>

      <nav>
        <ul className="flex gap-4">
          <li className="bg-fylo-storage-neutral-400 aspect-square h-12 w-12 rounded-[10px] hover:bg-opacity-75">
            <a
              href=""
              className="flex h-full w-full items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5"
                viewBox="0 0 20 24"
              >
                <path
                  fill="#697ED4"
                  d="M12.028 0H2.436A2.387 2.387 0 00.049 2.398L.037 21.583a2.387 2.387 0 002.387 2.398h14.4a2.397 2.397 0 002.398-2.398V7.194L12.028 0zM10.83 8.393V1.8l6.595 6.594h-6.595z"
                />
              </svg>
            </a>
          </li>
          <li className="bg-fylo-storage-neutral-400 aspect-square h-12 w-12 rounded-[10px] hover:bg-opacity-75">
            <a
              href=""
              className="flex h-full w-full items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 20"
                className="h-5"
              >
                <path
                  fill="#697ED4"
                  d="M21.6 2.4H12L9.6 0H2.4A2.39 2.39 0 00.012 2.4L0 16.8a2.4 2.4 0 002.4 2.4h19.2a2.4 2.4 0 002.4-2.4v-12a2.4 2.4 0 00-2.4-2.4z"
                />
              </svg>
            </a>
          </li>
          <li className="bg-fylo-storage-neutral-400 aspect-square h-12 w-12 rounded-[10px] hover:bg-opacity-75">
            <a
              href=""
              className="flex h-full w-full items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6"
                viewBox="0 0 24 16"
              >
                <path
                  fill="#697ED4"
                  d="M19.4 6c-.7-3.4-3.7-6-7.4-6-2.9 0-5.4 1.6-6.6 4C2.3 4.4 0 6.9 0 10c0 3.3 2.7 6 6 6h13c2.8 0 5-2.2 5-5 0-2.6-2.1-4.8-4.6-5zM14 9v4h-4V9H7l5-5 5 5h-3z"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Status() {
  const [storage] = useState({
    remaining: 815,
    maximum: 1000,
  });

  return (
    <div className="bg-fylo-storage-neutral-300 text-fylo-storage-neutral-100 shadow-fylo-storage-neutral-400/70 flex min-h-[160px] w-full max-w-[480px] flex-col items-start justify-start rounded-[10px] px-[32px] pt-[29px] shadow-2xl max-lg:relative lg:h-[154px] lg:min-h-0 lg:max-w-none lg:px-[39px] lg:pt-[37px]">
      <p className="w-full text-center text-[15px] tracking-[-.3px] lg:text-left lg:text-[14px] lg:tracking-[.1px]">
        You&lsquo;ve used <span className="text-[14px] font-bold">{storage.remaining} GB</span> of your storage
      </p>
      <div className="bg-fylo-storage-neutral-400/50 justify-left mt-3 flex h-5 w-full items-center rounded-full px-[3px] pt-[3.5px] pb-[2.5px] lg:mr-[1px] lg:translate-y-[2px] lg:py-[2.75px]">
        <div
          style={
            {
              "--bar-length": (storage.remaining / storage.maximum) * 100 + "%",
            } as CSSProperties
          }
          className="from-fylo-storage-primary-gradient-100 to-fylo-storage-primary-gradient-200 flex h-full w-[--bar-length] items-center justify-end rounded-full bg-gradient-to-r p-[2px]"
        >
          <div className="aspect-square h-full rounded-full bg-white" />
        </div>
      </div>
      <p className="mt-2 flex w-full justify-between text-[12px] font-bold">
        <span>0 GB</span>
        <span>{storage.maximum} GB</span>
      </p>
      <div
        className="lg:-top lg:before:-bottom-[--triangle-size] absolute bottom-0 left-1/2 flex h-[72px] w-[179px] -translate-x-1/2 translate-y-1/2 items-center justify-center gap-[9px] rounded-[10px] bg-white font-bold leading-none lg:bottom-auto lg:left-auto lg:right-[39px] lg:top-0 lg:translate-x-0 lg:translate-y-0 lg:before:absolute lg:before:right-0 lg:before:h-0 lg:before:w-0 lg:before:border-t-[length:--triangle-size] lg:before:border-b-[length:--triangle-size] lg:before:border-r-[length:--triangle-size] lg:before:border-transparent lg:before:border-r-white lg:before:content-['']"
        style={
          {
            "--triangle-size": "22px",
          } as CSSProperties
        }
      >
        <span className="text-fylo-storage-neutral-400 pb-[2px] text-[40px]">{storage.maximum - storage.remaining}</span> <span className="text-fylo-storage-neutral-200 pt-[3px] text-[12px] uppercase tracking-[1px]">GB Left</span>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 pl-[25px] pr-[24px] lg:relative lg:mr-[1px] lg:grid lg:w-fit lg:grid-cols-[350px,538px] lg:grid-rows-1 lg:items-end lg:gap-[30px] lg:px-0">
      <Navigation />
      <Status />
    </div>
  );
}

function Footer() {
  return (
    <footer className="text-fylo-storage-neutral-100 absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
