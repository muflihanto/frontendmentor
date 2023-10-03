import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { karla } from "../utils/fonts/karla";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const Insure = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Insure landing page</title>
      </Head>

      <div className={`App font-karla ${karla.variable}`}>
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

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
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
      <nav>
        <ul className="mt-[2px] flex items-center justify-start gap-[26px] max-md:hidden">
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
    <nav className="absolute left-0 top-20 z-10 h-[calc(100svh-80px)] w-full bg-insure-neutral-300 bg-[url('/insure-landing-page/images/bg-pattern-mobile-nav.svg')] bg-[length:375px_218px] bg-[bottom_0px_center] bg-no-repeat px-6 pt-[32px] lg:hidden">
      <ul className="flex w-full flex-col items-center justify-start gap-[8px]">
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
  return (
    <button onClick={toggle} className="lg:hidden">
      {isOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8"
        >
          <g fill="none" fillRule="evenodd">
            <path
              fill="#FFF"
              stroke="#2C2830"
              strokeWidth="1.5"
              d="M.75.75h30.5v30.5H.75z"
            />
            <g fill="#2C2830">
              <path d="M10.873 9.563l11.314 11.314-1.06 1.06L9.813 10.623z" />
              <path d="M9.813 20.877L21.127 9.563l1.06 1.06-11.314 11.314z" />
            </g>
          </g>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8"
        >
          <g fill="none" fillRule="evenodd">
            <path
              fill="#FFF"
              stroke="#2C2830"
              strokeWidth="1.5"
              d="M.75.75h30.5v30.5H.75z"
            />
            <g fill="#2C2830">
              <path d="M8 10h16v1.5H8zM8 15h16v1.5H8zM8 20h16v1.5H8z" />
            </g>
          </g>
        </svg>
      )}
    </button>
  );
}

function IntroSection() {
  return (
    <>
      <div className="relative flex h-[951px] flex-col items-center justify-center bg-insure-primary-200 px-5 text-insure-neutral-100 max-md:pt-[451px] lg:h-[600px] lg:items-start lg:px-[165px]">
        <div className="absolute left-0 top-0 aspect-[168/165] w-[168px] max-md:translate-y-[451px] lg:bottom-0 lg:top-auto lg:aspect-[195/504] lg:w-[195px] lg:translate-y-[333px]">
          <Image
            src="/insure-landing-page/images/"
            alt="Left Background Intro Section"
            loader={({ src, width }) => {
              if (width > 1023) {
                return src + "bg-pattern-intro-left-desktop.svg";
              }
              return src + "bg-pattern-intro-left-mobile.svg";
            }}
            className="object-contain"
            fill
          />
        </div>
        <div className="absolute left-0 top-0 aspect-[375/451] w-[375px] lg:left-auto lg:right-[165px] lg:top-[105.5px] lg:z-10 lg:aspect-[540/650] lg:w-[540px]">
          <Image
            src="/insure-landing-page/images/"
            loader={({ src, width }) => {
              if (width > 1023) {
                return src + "image-intro-desktop.jpg";
              }
              return src + "image-intro-mobile.jpg";
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
              if (width > 1023) {
                return src + "bg-pattern-intro-right-desktop.svg";
              }
              return src + "bg-pattern-intro-right-mobile.svg";
            }}
            className="object-contain"
            fill
          />
        </div>
      </div>
    </>
  );
}

function WereDifferentSection() {
  return (
    <section className="pb-[140.5px] pt-[140px] lg:mt-[164px] lg:px-[165px] lg:pb-[158px]">
      <hr className="mx-auto w-[150px] border-t-2 border-t-insure-neutral-300/30 lg:mx-0" />
      <h1 className="mx-auto mt-[27px] text-center font-dm-serif-display text-[48px] tracking-[-0.7px] text-insure-neutral-300 lg:mt-[40px] lg:text-left lg:text-[72px]">
        We’re different
      </h1>
      <div className="mt-[68px] flex flex-col items-center gap-[56.5px] px-6 lg:mt-[75px] lg:flex-row lg:justify-between lg:gap-[30px] lg:px-0 lg:[&>div]:flex-1">
        <div className="flex flex-col items-center lg:items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 86 86"
            className="w-[86px]"
          >
            <g fill="none" fillRule="evenodd">
              <circle cx="43" cy="43" r="43" fill="#96A9C6" />
              <path
                fill="#FFF"
                fillRule="nonzero"
                d="M32 59h1.195l21.072-20.146c.276-.356.123-.534-.46-.534H45.11l9.158-10.786c.276-.356.061-.534-.612-.534h-11.67c-.337 0-.613.119-.888.356l-8.515 14.645c-.061.356.122.534.582.534h8.423L32 59z"
              />
            </g>
          </svg>
          <h2 className="mt-[30px] font-dm-serif-display text-[28px] tracking-[-0.5px] text-insure-primary-200">
            Snappy Process
          </h2>
          <p className="mt-[13.5px] px-[2px] text-center leading-[26px] text-insure-neutral-200 lg:px-0 lg:text-left">
            Our application process can be completed in minutes, not hours.
            Don’t get stuck filling in tedious forms.
          </p>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 86 86"
            className="w-[86px]"
          >
            <g fill="none" fillRule="evenodd">
              <circle cx="43" cy="43" r="43" fill="#96A9C6" />
              <path
                fill="#FFF"
                fillRule="nonzero"
                d="M43 27c-8.836 0-16 7.164-16 16s7.164 16 16 16c8.838 0 16-7.164 16-16s-7.162-16-16-16zm4.363 22.178c-.787.883-1.924 1.402-3.41 1.558V53H42.06v-2.252c-2.479-.254-4.012-1.695-4.604-4.32l2.93-.764c.271 1.65 1.17 2.475 2.695 2.475.713 0 1.24-.176 1.576-.53a1.79 1.79 0 00.504-1.279c0-.518-.168-.91-.504-1.176-.336-.267-1.084-.605-2.242-1.015-1.04-.362-1.855-.717-2.441-1.073a4.032 4.032 0 01-1.428-1.48c-.365-.637-.549-1.379-.549-2.223 0-1.107.328-2.105.98-2.992.653-.885 1.68-1.426 3.083-1.623V33h1.894v1.748c2.117.254 3.488 1.451 4.111 3.594l-2.609 1.07c-.51-1.469-1.295-2.203-2.361-2.203-.535 0-.965.164-1.287.492a1.636 1.636 0 00-.487 1.194c0 .476.157.841.47 1.097.31.254.98.569 2.003.946 1.125.41 2.008.798 2.647 1.164a4.16 4.16 0 011.533 1.513c.38.645.572 1.397.572 2.258 0 1.322-.395 2.424-1.182 3.305z"
              />
            </g>
          </svg>
          <h2 className="mt-[30px] font-dm-serif-display text-[28px] tracking-[-0.5px] text-insure-primary-200">
            Affordable Prices
          </h2>
          <p className="mt-[13.5px] px-[2px] text-center leading-[26px] text-insure-neutral-200 lg:px-0 lg:text-left">
            We don’t want you worrying about high monthly costs. Our prices may
            be low, but we still offer the best coverage possible.
          </p>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 86 86"
            className="w-[86px]"
          >
            <g fill="none" fillRule="evenodd">
              <circle cx="43" cy="43" r="43" fill="#96A9C6" />
              <path
                fill="#FFF"
                fillRule="nonzero"
                d="M52.874 49.874l-5.095-2.547c-.48-.24-.779-.724-.779-1.261v-1.804c.122-.149.25-.32.383-.507.661-.933 1.19-1.972 1.576-3.093a2.116 2.116 0 001.241-1.929V36.6c0-.514-.192-1.011-.533-1.4v-2.837c.03-.293.147-2.04-1.116-3.48C47.455 27.633 45.678 27 43.267 27c-2.412 0-4.19.634-5.285 1.883-1.263 1.44-1.145 3.187-1.115 3.48V35.2a2.127 2.127 0 00-.534 1.4v2.133c0 .65.295 1.255.799 1.658.488 1.935 1.51 3.392 1.868 3.86v1.765c0 .516-.282.99-.734 1.237l-4.758 2.596A4.81 4.81 0 0031 54.073V55.8c0 2.531 8.024 3.2 12.267 3.2 4.242 0 12.266-.669 12.266-3.2v-1.623a4.786 4.786 0 00-2.659-4.303z"
              />
            </g>
          </svg>
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
    <nav className="flex flex-col items-center gap-[34px] text-[14px] font-semibold uppercase tracking-[1px] lg:w-full lg:flex-row lg:items-start lg:gap-[30px] [&>div>ul]:flex [&>div>ul]:flex-col [&>div>ul]:items-center [&>div>ul]:gap-[10px] lg:[&>div>ul]:items-start [&>div]:flex [&>div]:flex-col [&>div]:items-center [&>div]:gap-[30px] lg:[&>div]:flex-1 lg:[&>div]:items-start [&_a]:text-insure-neutral-300 [&_h3]:text-insure-neutral-200">
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
    </nav>
  );
}

function Attribution() {
  return (
    <div className="mt-7 text-center text-[11px] [&_a]:font-bold [&_a]:text-[hsl(228,45%,44%)] [&_a]:underline [&_a]:decoration-insure-primary-200 [&_a]:decoration-wavy">
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
      <li>
        <a href="" className="group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 fill-[#837D88] group-hover:fill-insure-primary-200"
          >
            <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
          </svg>
        </a>
      </li>
      <li>
        <a href="" className="group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 20"
            className="w-6 fill-[#837D88] group-hover:fill-insure-primary-200"
          >
            <path d="M24 2.557a9.83 9.83 0 01-2.828.775A4.932 4.932 0 0023.337.608a9.864 9.864 0 01-3.127 1.195A4.916 4.916 0 0016.616.248c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.671 1.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 17.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 2.557z" />
          </svg>
        </a>
      </li>
      <li>
        <a href="" className="group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 fill-[#837D88] group-hover:fill-insure-primary-200"
          >
            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
          </svg>
        </a>
      </li>
      <li>
        <a href="" className="group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 fill-[#837D88] group-hover:fill-insure-primary-200"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </a>
      </li>
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
