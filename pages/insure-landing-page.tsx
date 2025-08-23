import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { dmSerifDisplay } from "../utils/fonts/dmSerifDisplay";
import { karla } from "../utils/fonts/karla";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const Insure = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Insure landing page</title>
      </Head>

      <div
        className={`App bg-white font-karla ${karla.variable} ${dmSerifDisplay.variable}`}
      >
        <Header />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/insure-landing-page/design/"
          // absolutePath="/insure-landing-page/design/active-states.jpg"
        /> */}
      </div>
    </>
  );
};

const getScreenType = (val: number) => (val > 1023 ? "desktop" : "mobile");

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      if (isOpen) {
        body.style.overflow = "hidden";
        window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
      }

      return () => {
        body.style.overflow = "auto";
      };
    }
  }, [isOpen]);
  return (
    <header className="relative flex h-20 justify-between px-6 lg:z-20 lg:items-center lg:bg-white lg:px-[165px]">
      <div className="relative aspect-[112/18] w-[112px] lg:ml-[3px]">
        <Image
          src="/insure-landing-page/images/logo.svg"
          fill
          className="object-contain"
          alt="insure logo"
        />
      </div>
      <nav aria-label="Main menu" className="max-md:hidden">
        <ul className="mt-[2px] flex items-center justify-start gap-[26px]">
          <li>
            <a
              className="flex h-[40px] items-center text-[14px] font-bold uppercase tracking-[0.75px] text-insure-neutral-200 hover:text-insure-neutral-300"
              href=""
            >
              How we work
            </a>
          </li>
          <li>
            <a
              className="flex h-[40px] items-center text-[14px] font-bold uppercase tracking-[0.75px] text-insure-neutral-200 hover:text-insure-neutral-300"
              href=""
            >
              Blog
            </a>
          </li>
          <li>
            <a
              className="flex h-[40px] items-center text-[14px] font-bold uppercase tracking-[0.75px] text-insure-neutral-200 hover:text-insure-neutral-300"
              href=""
            >
              Account
            </a>
          </li>
          <li>
            <a
              className="ml-[7px] flex h-[40px] w-[146px] items-center justify-center border-2 border-insure-neutral-300 text-[14px] font-bold uppercase tracking-[1px] text-insure-neutral-300 hover:bg-insure-neutral-300 hover:text-insure-neutral-100"
              href=""
            >
              View plans
            </a>
          </li>
        </ul>
      </nav>
      <MobileNavButton isOpen={isOpen} toggle={toggle} />
      {isOpen ? <MobileNav /> : null}
    </header>
  );
}

function MobileNav() {
  return (
    <nav
      className="absolute left-0 top-20 z-10 h-[calc(100svh-80px)] w-full bg-insure-neutral-300 bg-[url('/insure-landing-page/images/bg-pattern-mobile-nav.svg')] bg-[length:375px_218px] bg-[bottom_0px_center] bg-no-repeat px-6 pt-[32px] lg:hidden"
      aria-label="Main menu"
    >
      <ul
        className="flex w-full flex-col items-center justify-start gap-[8px]"
        id="mobilemenu"
      >
        <li>
          <a
            className="flex h-[56px] items-center text-[20px] font-bold uppercase tracking-[1.5px] text-insure-neutral-100"
            href=""
          >
            How we work
          </a>
        </li>
        <li>
          <a
            className="flex h-[56px] items-center text-[20px] font-bold uppercase tracking-[1.5px] text-insure-neutral-100"
            href=""
          >
            Blog
          </a>
        </li>
        <li>
          <a
            className="flex h-[56px] items-center text-[20px] font-bold uppercase tracking-[1.5px] text-insure-neutral-100"
            href=""
          >
            Account
          </a>
        </li>
        <li className="mt-2 w-full">
          <a
            className="flex h-[56px] w-full items-center justify-center border-2 border-insure-neutral-100 pt-1 text-[20px] font-bold uppercase tracking-[1.5px] text-insure-neutral-100"
            href=""
          >
            View plans
          </a>
        </li>
      </ul>
    </nav>
  );
}

function MobileNavButton({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  const name = isOpen ? "close" : "hamburger";
  return (
    <button
      onClick={toggle}
      className="lg:hidden"
      type="button"
      id="menubutton"
      aria-haspopup="true"
      aria-controls={isOpen ? "mobilemenu" : undefined}
      aria-expanded={isOpen}
    >
      <svg
        viewBox="0 0 32 32"
        className="w-8"
        role="graphics-symbol"
        aria-label={isOpen ? "Close main menu" : "Open main menu"}
      >
        <use
          href={`/insure-landing-page/images/icon-${name}.svg#icon-${name}`}
        />
      </svg>
    </button>
  );
}

function IntroSection() {
  return (
    <div className="relative flex h-[951px] flex-col items-center justify-center bg-insure-primary-200 px-5 text-insure-neutral-100 max-md:pt-[451px] lg:h-[600px] lg:items-start lg:px-[165px]">
      <div className="absolute left-0 top-0 aspect-[168/165] w-[168px] max-md:translate-y-[451px] lg:bottom-0 lg:top-auto lg:aspect-[195/504] lg:w-[195px] lg:translate-y-[333px]">
        <Image
          src="/insure-landing-page/images/"
          alt="Left Background Intro Section"
          loader={({ src, width }) => {
            return `${src}bg-pattern-intro-left-${getScreenType(width)}.svg`;
          }}
          className="object-contain"
          fill
        />
      </div>
      <div className="absolute left-0 top-0 aspect-[375/451] w-[375px] lg:left-auto lg:right-[165px] lg:top-[105.5px] lg:z-10 lg:aspect-[540/650] lg:w-[540px]">
        <Image
          src="/insure-landing-page/images/"
          loader={({ src, width }) => {
            return `${src}image-intro-${getScreenType(width)}.jpg`;
          }}
          alt="Happy Family of 4 Holding Each Other's Hands"
          className="object-contain"
          fill
        />
      </div>
      <div className="relative flex flex-col items-center justify-start lg:w-[calc(100%-540px)] lg:items-start lg:pb-[22px] lg:pr-4">
        <hr className="block w-[150px] border-t border-t-insure-neutral-100 max-md:hidden" />
        <h1 className="text-center font-dm-serif-display text-[48px] leading-none tracking-[-0.75px] lg:mt-[62px] lg:pr-8 lg:text-left lg:text-[72px] lg:leading-[64px] lg:tracking-[-1px]">
          Humanizing your insurance.
        </h1>
        <p className="mt-[15px] px-2 text-center leading-[26px] text-insure-neutral-100/75 lg:mt-[28px] lg:pl-0 lg:pr-2 lg:text-left lg:tracking-[0.05px]">
          Get your life insurance coverage easier and faster. We blend our
          expertise and technology to help you find the plan that’s right for
          you. Ensure you and your loved ones are protected.
        </p>
        <a
          href=""
          className="mt-[33px] flex h-[40px] w-[146px] items-center justify-center border-2 border-insure-neutral-100/75 pt-[1px] font-karla text-[14px] font-bold uppercase tracking-[1px] text-insure-neutral-100/75 hover:bg-insure-neutral-100 hover:text-insure-primary-200 lg:mt-[31px]"
        >
          View plans
        </a>
      </div>
      <div className="absolute bottom-0 right-0 aspect-[124/330] w-[124px] translate-y-[176px] lg:bottom-auto lg:top-0 lg:z-10 lg:aspect-[436/593] lg:w-[436px] lg:-translate-y-[80px]">
        <Image
          src="/insure-landing-page/images/"
          alt="Lower Background Intro Section"
          loader={({ src, width }) => {
            return `${src}bg-pattern-intro-right-${getScreenType(width)}.svg`;
          }}
          className="object-contain"
          fill
        />
      </div>
    </div>
  );
}

function WereDifferentSection() {
  return (
    <section className="bg-white pb-[140.5px] pt-[140px] lg:mt-[164px] lg:px-[165px] lg:pb-[158px]">
      <hr className="mx-auto w-[150px] border-t-2 border-t-insure-neutral-300/30 lg:mx-0" />
      <h1 className="mx-auto mt-[27px] text-center font-dm-serif-display text-[48px] tracking-[-0.7px] text-insure-neutral-300 lg:mt-[40px] lg:text-left lg:text-[72px]">
        We’re different
      </h1>
      <div className="mt-[68px] flex flex-col items-center gap-[56.5px] px-6 lg:mt-[75px] lg:flex-row lg:justify-between lg:gap-[30px] lg:px-0 lg:[&>div]:flex-1">
        <div className="flex flex-col items-center lg:items-start">
          <WereDifferentSectionIcon type="snappy-process" />
          <h2 className="mt-[30px] font-dm-serif-display text-[28px] tracking-[-0.5px] text-insure-primary-200">
            Snappy Process
          </h2>
          <p className="mt-[13.5px] px-[2px] text-center leading-[26px] text-insure-neutral-200 lg:px-0 lg:text-left">
            Our application process can be completed in minutes, not hours.
            Don’t get stuck filling in tedious forms.
          </p>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <WereDifferentSectionIcon type="affordable-prices" />
          <h2 className="mt-[30px] font-dm-serif-display text-[28px] tracking-[-0.5px] text-insure-primary-200">
            Affordable Prices
          </h2>
          <p className="mt-[13.5px] px-[2px] text-center leading-[26px] text-insure-neutral-200 lg:px-0 lg:text-left">
            We don’t want you worrying about high monthly costs. Our prices may
            be low, but we still offer the best coverage possible.
          </p>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <WereDifferentSectionIcon type="people-first" />
          <h2 className="mt-[30px] font-dm-serif-display text-[28px] tracking-[-0.5px] text-insure-primary-200">
            People First
          </h2>
          <p className="mt-[13.5px] px-[2px] text-center leading-[26px] text-insure-neutral-200 lg:px-0 lg:text-left">
            Our plans aren’t full of conditions and clauses to prevent payouts.
            We make sure you’re covered when you need it.
          </p>
        </div>
      </div>
    </section>
  );
}

type WereDifferentSectionProps = {
  type: "snappy-process" | "affordable-prices" | "people-first";
};
function WereDifferentSectionIcon({ type }: WereDifferentSectionProps) {
  return (
    <svg
      viewBox="0 0 86 86"
      className="w-[86px]"
      role="graphics-symbol"
      aria-label={type
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ")}
    >
      <use href={`/insure-landing-page/images/icon-${type}.svg#icon-${type}`} />
    </svg>
  );
}

function HowWeWork() {
  return (
    <div className="mx-auto flex h-[344px] w-[calc(100vw-48px)] flex-col items-center justify-center bg-insure-primary-200 bg-[url('/insure-landing-page/images/bg-pattern-how-we-work-mobile.svg')] bg-[length:176px_317px] bg-[top_0px_right_0px] bg-no-repeat text-insure-neutral-100 lg:h-[250px] lg:w-[calc(100vw-330px)] lg:flex-row lg:items-center lg:justify-between lg:bg-[url('/insure-landing-page/images/bg-pattern-how-we-work-desktop.svg')] lg:bg-[length:434px_250px] lg:px-20">
      <h2 className="text-center font-dm-serif-display text-[40px] leading-none tracking-[-0.5px] lg:mt-[2px] lg:w-[475px] lg:text-left lg:text-[55px] lg:leading-[56px] lg:tracking-[-0.25px]">
        Find out more about how we work
      </h2>
      <a
        href=""
        className="mt-[40px] flex h-[40px] w-[160px] items-center justify-center border-2 pt-[1px] text-center text-[14px] font-bold uppercase tracking-[1px] hover:bg-insure-neutral-100 hover:text-insure-primary-200 lg:mt-0"
      >
        How we work
      </a>
    </div>
  );
}

function Main() {
  return (
    <main className="relative">
      <h1 className="sr-only">Insure Landing Page</h1>
      <IntroSection />
      <WereDifferentSection />
      <HowWeWork />
    </main>
  );
}

function FooterNav() {
  return (
    <div className="flex flex-col items-center gap-[34px] text-[14px] font-semibold uppercase tracking-[1px] lg:w-full lg:flex-row lg:items-start lg:gap-[30px] [&>div>ul]:flex [&>div>ul]:flex-col [&>div>ul]:items-center [&>div>ul]:gap-[10px] lg:[&>div>ul]:items-start [&>div]:flex [&>div]:flex-col [&>div]:items-center [&>div]:gap-[30px] lg:[&>div]:flex-1 lg:[&>div]:items-start [&_a]:text-insure-neutral-300 [&_h3]:text-insure-neutral-200">
      <div>
        <h3>Our company</h3>
        <ul>
          <li>
            <a href="" className="hover:underline">
              How we work
            </a>
          </li>
          <li>
            <a href="" className="hover:underline">
              Why Insure?
            </a>
          </li>
          <li>
            <a href="" className="hover:underline">
              Check Price
            </a>
          </li>
          <li>
            <a href="" className="hover:underline">
              Reviews
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3>Help me</h3>
        <ul>
          <li>
            <a href="" className="hover:underline">
              FAQ
            </a>
          </li>
          <li>
            <a href="" className="hover:underline">
              Terms of use
            </a>
          </li>
          <li>
            <a href="" className="hover:underline">
              Privacy policy
            </a>
          </li>
          <li>
            <a href="" className="hover:underline">
              Cookies
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3>Contact</h3>
        <ul>
          <li>
            <a href="" className="hover:underline">
              Sales
            </a>
          </li>
          <li>
            <a href="" className="hover:underline">
              Support
            </a>
          </li>
          <li>
            <a href="" className="hover:underline">
              Live chat
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3>Others</h3>
        <ul>
          <li>
            <a href="" className="hover:underline">
              Careers
            </a>
          </li>
          <li>
            <a href="" className="hover:underline">
              Press
            </a>
          </li>
          <li>
            <a href="" className="hover:underline">
              Licenses
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Attribution() {
  return (
    <div className="mt-7 text-center text-[11px] text-insure-primary-200 [&_a]:font-bold [&_a]:text-[hsl(228,45%,44%)] [&_a]:underline [&_a]:decoration-insure-primary-200 [&_a]:decoration-wavy">
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
    </div>
  );
}

function SocialMediaIcons() {
  return (
    <ul className="mt-8 flex items-center gap-4 lg:mt-0">
      {(["facebook", "twitter", "pinterest", "instagram"] as const).map(
        (el) => {
          return (
            <li key={el}>
              <a href="" className="group">
                <svg
                  viewBox={`0 0 24 ${el === "twitter" ? 20 : 24}`}
                  className="w-6 fill-[#837D88] group-hover:fill-insure-primary-200"
                  aria-label={el.charAt(0).toUpperCase() + el.slice(1)}
                  role="graphics-symbol"
                >
                  <use
                    href={`/insure-landing-page/images/icon-${el}.svg#icon-${el}`}
                  />
                </svg>
              </a>
            </li>
          );
        },
      )}
    </ul>
  );
}

function Footer() {
  return (
    <footer className="mt-[140px] flex h-[1025px] flex-col items-center bg-insure-neutral-100 bg-[url('/insure-landing-page/images/bg-pattern-footer-mobile.svg')] bg-[length:374px_173px] bg-[top_center] bg-no-repeat pt-[88px] lg:mt-[150px] lg:h-[393.5px] lg:bg-[url('/insure-landing-page/images/bg-pattern-footer-desktop.svg')] lg:bg-[length:528px_231px] lg:bg-[top_left] lg:px-[165px] lg:pt-[64px]">
      <div className="flex flex-col items-center lg:w-full lg:flex-row lg:justify-between">
        <div className="relative aspect-[112/18] w-[112px]">
          <Image
            src="/insure-landing-page/images/logo.svg"
            fill
            className="object-contain"
            alt="insure logo"
          />
        </div>
        <SocialMediaIcons />
      </div>
      <hr className="mb-[37px] mt-10 w-[calc(100vw-48px)] border-t border-t-insure-neutral-200/30 lg:mb-[45px] lg:mt-[33px] lg:w-[100%]" />
      <FooterNav />
      <Attribution />
    </footer>
  );
}

export default Insure;
