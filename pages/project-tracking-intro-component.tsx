import Head from "next/head";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useState } from "react";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const ProjectTracking = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Project tracking intro component</title>
      </Head>
      <div className="App font-barlow relative pb-[75.5px]">
        <Main />
        <Footer />
        <Slider
          basePath="/project-tracking-intro-component/design/"
          absolutePath="/project-tracking-intro-component/design/mobile-navigation.jpg"
        />
      </div>
    </>
  );
};

function Header({ toggle, isMenuOpen }: { toggle: () => void; isMenuOpen: boolean }) {
  return (
    <header className="flex h-[100px] items-center justify-between px-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6"
        viewBox="0 0 32 32"
      >
        <g
          fill="#323334"
          fillRule="evenodd"
        >
          <path d="M0 32V.241h23.041zM31.15 32V.241h-4.411L17.48 13.158zM3.645 32l11.854-15.879L27.353 32z" />
        </g>
      </svg>
      <button onClick={toggle}>
        {isMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6"
            viewBox="0 0 20 20"
          >
            <path
              fill="#242942"
              fillRule="evenodd"
              d="M17.778.808l1.414 1.414L11.414 10l7.778 7.778-1.414 1.414L10 11.414l-7.778 7.778-1.414-1.414L8.586 10 .808 2.222 2.222.808 10 8.586 17.778.808z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6"
            viewBox="0 0 24 16"
          >
            <g
              fill="#242942"
              fillRule="evenodd"
            >
              <path d="M0 0h24v2H0zM0 7h24v2H0zM0 14h24v2H0z" />
            </g>
          </svg>
        )}
      </button>
      {isMenuOpen ? <MobileMenu /> : null}
    </header>
  );
}

function Hero() {
  return (
    <div className="absolute -right-[138px] mt-[21px] aspect-[960/464] h-[244px]">
      <Image
        src="/project-tracking-intro-component/images/illustration-devices.svg"
        fill
        alt="Illustration Devices"
        className="object-cover"
      />
    </div>
  );
}

function MobileMenu() {
  return (
    <nav className="absolute top-[100px] z-10 h-[233px] w-[calc(375px-64px)] rounded-sm bg-white shadow-md">
      <ul className="flex flex-col items-center gap-[19px] px-6 py-[22px]">
        <li>
          <a
            className="text-project-tracking-neutral-400 font-barlow-condensed text-[18px] font-bold uppercase tracking-[1px]"
            href=""
          >
            Product
          </a>
        </li>
        <li>
          <a
            className="text-project-tracking-neutral-400 font-barlow-condensed text-[18px] font-bold uppercase tracking-[1px]"
            href=""
          >
            Features
          </a>
        </li>
        <li>
          <a
            className="text-project-tracking-neutral-400 font-barlow-condensed text-[18px] font-bold uppercase tracking-[1px]"
            href=""
          >
            Pricing
          </a>
        </li>
        <hr className="border-t-project-tracking-neutral-200/50 mt-[1.5px] mb-[3px] w-full border-t-[1.5px]" />
        <li>
          <a
            className="text-project-tracking-neutral-200 font-barlow-condensed text-[18px] font-bold uppercase tracking-[1px]"
            href=""
          >
            Login
          </a>
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

  return (
    <>
      <div className="relative h-[424px] overflow-hidden">
        <Header
          toggle={toggle}
          isMenuOpen={isMenuOpen}
        />
        <Hero />
        <div className="bg-project-tracking-neutral-100 absolute right-0 top-0 -z-10 h-full w-1/2 rounded-bl-[60px]" />
      </div>
      <div className="mt-7 px-8">
        <p className="flex items-center gap-4">
          <span className="font-barlow-condensed bg-project-tracking-neutral-400 text-project-tracking-neutral-100 flex h-[25px] items-center justify-center rounded-full px-[10px] pb-[2px] text-[15px] font-bold uppercase leading-none tracking-[1px]">New</span>
          <span className="font-barlow-condensed text-project-tracking-neutral-200 pb-[2px] uppercase leading-none tracking-[4.6px]">Monograph Dashboard</span>
        </p>
        <h1 className="font-barlow-condensed text-project-tracking-neutral-400 mt-4 text-[40px] font-bold uppercase leading-none">Powerful insights into your team</h1>
        <p className="text-project-tracking-neutral-300 mt-[16px] pr-7 text-[18px] leading-[26px]">Project planning and time tracking for agile teams</p>
        <div className="mt-[27px] grid w-full grid-cols-2 items-center gap-x-1 text-center">
          <a
            href=""
            className="bg-project-tracking-primary-red font-barlow-condensed text-project-tracking-neutral-100 grid h-10 items-center rounded-md text-[14px] font-bold uppercase leading-none tracking-[0.9px]"
          >
            Schedule a demo
          </a>
          <span className="text-project-tracking-neutral-200 font-barlow-condensed ml-0.5 text-[14px] uppercase tracking-[2.5px]">to see a preview</span>
        </div>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 left-0 mx-auto w-full text-center">
      <p className="[&_a]:decoration-project-tracking-primary-red text-center text-[11px] [&_a]:font-bold [&_a]:text-[hsl(228,45%,44%)] [&_a]:underline [&_a]:decoration-wavy">
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
