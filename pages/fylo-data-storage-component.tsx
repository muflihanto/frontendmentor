import Head from "next/head";
import Image from "next/image";
import { type CSSProperties, type ComponentProps, useState } from "react";
import { raleway } from "../utils/fonts/raleway";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function FyloDataStorageComponent() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Fylo data storage component</title>
      </Head>
      <div
        className={`App relative flex min-h-[100svh] items-center justify-center bg-fylo-storage-neutral-400 bg-[url('/fylo-data-storage-component/images/bg-mobile.png')] bg-cover bg-no-repeat pb-20 pt-11 font-raleway lg:bg-[url('/fylo-data-storage-component/images/bg-desktop.png')] lg:bg-contain lg:bg-[50%_47.5vh] lg:pt-[59px] lg:[@media(max-aspect-ratio:9/5)]:bg-[center_bottom] ${raleway.variable}`}
      >
        <Main />
        <Footer />
        {/* <Slider basePath="/fylo-data-storage-component/design" /> */}
      </div>
    </>
  );
}

const iconVariant = ["document", "folder", "upload"] as const;
type IconVariant = (typeof iconVariant)[number];
const variantProps: Record<IconVariant, ComponentProps<"svg">["viewBox"]> = {
  document: "0 0 20 24",
  folder: "0 0 24 20",
  upload: "0 0 24 16",
};
type NavLinkProps = {
  variant: IconVariant;
  href?: string;
};
function NavLink(props: NavLinkProps) {
  return (
    <a
      href={props.href ?? ""}
      className="flex h-full w-full items-center justify-center"
    >
      <svg
        className={props.variant === "document" ? "w-5" : "w-6"}
        viewBox={variantProps[props.variant]}
      >
        <use
          href={`/fylo-data-storage-component/images/icon-${props.variant}.svg#icon-${props.variant}`}
        />
      </svg>
    </a>
  );
}

function Navigation() {
  return (
    <header className="flex h-[201px] w-full max-w-[480px] flex-col items-start justify-center gap-[33px] rounded-[10px] rounded-tr-[100px] bg-fylo-storage-neutral-300 px-[41px] shadow-2xl shadow-fylo-storage-neutral-400/70 lg:max-w-none">
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
          {iconVariant.map((el) => {
            return (
              <li
                key={el}
                className="aspect-square h-12 w-12 rounded-[10px] bg-fylo-storage-neutral-400 hover:bg-opacity-75"
              >
                <NavLink variant={el} />
              </li>
            );
          })}
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
    <div className="flex min-h-[160px] w-full max-w-[480px] flex-col items-start justify-start rounded-[10px] bg-fylo-storage-neutral-300 px-[32px] pt-[29px] text-fylo-storage-neutral-100 shadow-2xl shadow-fylo-storage-neutral-400/70 max-lg:relative lg:h-[154px] lg:min-h-0 lg:max-w-none lg:px-[39px] lg:pt-[37px]">
      <p className="w-full text-center text-[15px] tracking-[-.3px] lg:text-left lg:text-[14px] lg:tracking-[.1px]">
        You&lsquo;ve used{" "}
        <span className="text-[14px] font-bold">{storage.remaining} GB</span> of
        your storage
      </p>
      <div className="justify-left mt-3 flex h-5 w-full items-center rounded-full bg-fylo-storage-neutral-400/50 px-[3px] pb-[2.5px] pt-[3.5px] lg:mr-[1px] lg:translate-y-[2px] lg:py-[2.75px]">
        <div
          style={
            {
              "--bar-length": (storage.remaining / storage.maximum) * 100 + "%",
            } as CSSProperties
          }
          className="flex h-full w-[--bar-length] items-center justify-end rounded-full bg-gradient-to-r from-fylo-storage-primary-gradient-100 to-fylo-storage-primary-gradient-200 p-[2px]"
        >
          <div className="aspect-square h-full rounded-full bg-white" />
        </div>
      </div>
      <p className="mt-2 flex w-full justify-between text-[12px] font-bold">
        <span>0 GB</span>
        <span>{storage.maximum} GB</span>
      </p>
      <div
        className="lg:-top absolute bottom-0 left-1/2 flex h-[72px] w-[179px] -translate-x-1/2 translate-y-1/2 items-center justify-center gap-[9px] rounded-[10px] bg-white font-bold leading-none lg:bottom-auto lg:left-auto lg:right-[39px] lg:top-0 lg:translate-x-0 lg:translate-y-0 lg:before:absolute lg:before:-bottom-[--triangle-size] lg:before:right-0 lg:before:h-0 lg:before:w-0 lg:before:border-b-[length:--triangle-size] lg:before:border-r-[length:--triangle-size] lg:before:border-t-[length:--triangle-size] lg:before:border-transparent lg:before:border-r-white lg:before:content-['']"
        style={
          {
            "--triangle-size": "22px",
          } as CSSProperties
        }
      >
        <span className="pb-[2px] text-[40px] text-fylo-storage-neutral-400">
          {storage.maximum - storage.remaining}
        </span>{" "}
        <span className="pt-[3px] text-[12px] uppercase tracking-[1px] text-fylo-storage-neutral-200">
          GB Left
        </span>
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
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-fylo-storage-neutral-100 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
