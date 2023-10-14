import Head from "next/head";
import Image from "next/image";
import {
  type ComponentProps,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { cn } from "../utils/cn";
import { barlow } from "../utils/fonts/barlow";
import { barlowCondensed } from "../utils/fonts/barlowCondensed";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const ProjectTracking = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Project tracking intro component</title>
      </Head>
      <div className="absolute right-0 top-0 -z-10 h-[424px] w-[50vw] rounded-bl-[60px] bg-project-tracking-neutral-100 lg:h-[427px] lg:w-[calc(705/1440*100vw)]" />
      <div
        className={cn([
          "App relative pb-[75.5px] font-barlow max-lg:mx-auto max-lg:max-w-screen-sm",
          barlow.variable,
          barlowCondensed.variable,
        ])}
      >
        <Main />
        <Footer />
        {/* <Slider
          basePath="/project-tracking-intro-component/design/"
          // absolutePath="/project-tracking-intro-component/design/mobile-navigation.jpg"
          // absolutePath="/project-tracking-intro-component/design/active-states.jpg"
        /> */}
      </div>
    </>
  );
};

function Header({
  toggle,
  isMenuOpen,
}: {
  toggle: () => void;
  isMenuOpen: boolean;
}) {
  return (
    <header className="flex h-[100px] items-center justify-between px-8 lg:h-[160px] lg:px-[165px]">
      <svg className="w-6 lg:w-8" viewBox="0 0 32 32">
        <use href="/project-tracking-intro-component/images/logo.svg#logo" />
      </svg>
      <button onClick={toggle} className="hidden max-md:block">
        {isMenuOpen ? (
          <svg className="w-6" viewBox="0 0 20 20">
            <use href="/project-tracking-intro-component/images/icon-close.svg#icon-close" />
          </svg>
        ) : (
          <svg className="w-6" viewBox="0 0 24 16">
            <use href="/project-tracking-intro-component/images/icon-hamburger.svg#icon-hamburger" />
          </svg>
        )}
      </button>
      {isMenuOpen ? <NavigationMenu /> : null}
    </header>
  );
}

function Hero() {
  return (
    <div className="relative mt-[21px] min-h-[244px]  max-lg:aspect-[960/464] lg:m-0 lg:h-[464px] lg:w-1/2 lg:flex-1">
      <Image
        src="/project-tracking-intro-component/images/illustration-devices.svg"
        fill
        alt="Illustration Devices"
        className="object-cover object-[right_-139px_top_50%] lg:object-[center_left]"
      />
    </div>
  );
}

type NavAnchorParams = PropsWithChildren &
  ComponentProps<"a"> & { variant: "gray" | "darkgrey" };

function NavAnchor({
  variant,
  children,
  href = "",
  className,
  ...props
}: NavAnchorParams) {
  return (
    <a
      {...props}
      className={cn([
        "font-barlow-condensed text-[18px] font-bold uppercase tracking-[1px] hover:underline hover:decoration-2 md:text-[16px] md:tracking-[.5px]", // base
        variant === "darkgrey"
          ? "text-project-tracking-neutral-400"
          : "text-project-tracking-neutral-200", // variant
        className,
      ])}
      href={href}
    >
      {children}
    </a>
  );
}

function NavigationMenu() {
  return (
    <nav className="absolute top-[100px] z-10 h-[233px] w-[calc(100%-64px)] rounded-sm bg-white shadow-md md:static md:h-auto md:w-auto md:bg-transparent md:shadow-none">
      <ul className="flex flex-col items-center gap-[19px] px-6 py-[22px] md:flex-row md:gap-[42px] md:p-0">
        <li>
          <NavAnchor variant="darkgrey">Product</NavAnchor>
        </li>
        <li>
          <NavAnchor variant="darkgrey">Features</NavAnchor>
        </li>
        <li>
          <NavAnchor variant="darkgrey">Pricing</NavAnchor>
        </li>
        <span className="mr-1 block h-[5px] w-[5px] rounded-full bg-project-tracking-neutral-200/50 max-md:hidden" />
        <hr className="mb-[3px] mt-[1.5px] w-full border-t-[1.5px] border-t-project-tracking-neutral-200/50 md:hidden" />
        <li>
          <NavAnchor variant="gray">Login</NavAnchor>
        </li>
      </ul>
    </nav>
  );
}

function Main() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, [setIsMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(window?.innerWidth >= 768);
  }, []);

  useEffect(() => {
    const handleWindowChange = () => {
      setIsMenuOpen(window?.innerWidth >= 768);
    };

    window.addEventListener("resize", handleWindowChange);

    return () => {
      window.removeEventListener("resize", handleWindowChange);
    };
  });

  return (
    <>
      <Header toggle={toggle} isMenuOpen={isMenuOpen} />
      <div className="relative flex flex-col max-lg:gap-[87px] lg:mt-[51px] lg:flex-row-reverse lg:items-center lg:gap-7">
        <Hero />
        <div className="px-8 lg:w-1/2 lg:px-0 lg:pb-1 lg:pl-[165px] lg:pr-10">
          <p className="flex items-center gap-4">
            <span className="flex h-[25px] items-center justify-center rounded-full bg-project-tracking-neutral-400 px-[10px] pb-[2px] font-barlow-condensed text-[15px] font-bold uppercase leading-none tracking-[1px] text-project-tracking-neutral-100">
              New
            </span>
            <span className="pb-[2px] font-barlow-condensed uppercase leading-none tracking-[4.6px] text-project-tracking-neutral-200">
              Monograph Dashboard
            </span>
          </p>
          <h1 className="mt-4 font-barlow-condensed text-[40px] font-bold uppercase leading-none text-project-tracking-neutral-400 lg:text-[64px]">
            Powerful insights into your team
          </h1>
          <p className="mt-[16px] pr-7 text-[18px] leading-[26px] text-project-tracking-neutral-300 lg:mt-[30px] lg:w-3/5 lg:leading-[27px] ">
            Project planning and time tracking for agile teams
          </p>
          <div className="mt-[27px] grid w-full grid-cols-2 items-center gap-x-1 text-center lg:mt-[64px] lg:w-[384px] lg:gap-x-4">
            <a
              href=""
              className="grid h-10 items-center rounded-md bg-project-tracking-primary-red font-barlow-condensed text-[14px] font-bold uppercase leading-none tracking-[0.9px] text-project-tracking-neutral-100 hover:bg-opacity-75 lg:h-12 lg:text-base lg:tracking-[1px]"
            >
              Schedule a demo
            </a>
            <span className="ml-0.5 font-barlow-condensed text-[14px] uppercase tracking-[2.5px] text-project-tracking-neutral-200 lg:text-base lg:tracking-[4.5px]">
              to see a preview
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 left-0 mx-auto w-full text-center">
      <p className="text-center text-[11px] [&_a:hover]:text-project-tracking-primary-red [&_a:hover]:decoration-project-tracking-primary-red/75 [&_a]:font-bold [&_a]:text-[hsl(228,45%,44%)] [&_a]:underline [&_a]:decoration-project-tracking-primary-red [&_a]:decoration-wavy">
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
      </p>
    </footer>
  );
}

export default ProjectTracking;
