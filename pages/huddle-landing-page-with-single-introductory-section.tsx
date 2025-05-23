import Head from "next/head";
import Image from "next/image";
import { openSans } from "../utils/fonts/openSans";
import { poppins } from "../utils/fonts/poppins";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function HuddleLandingPageWithSingleIntroductorySection() {
  return (
    <>
      <Head>
        <title>
          Frontend Mentor | Huddle landing page with single introductory section
        </title>
      </Head>
      <div
        className={`App relative flex min-h-[100svh] flex-col items-center bg-huddle-intro-primary-violet bg-[url('/huddle-landing-page-with-single-introductory-section/images/bg-mobile.svg')] bg-contain bg-[position:center_top] bg-no-repeat pb-[40.15px] pt-[32px] font-open-sans lg:bg-[url('/huddle-landing-page-with-single-introductory-section/images/bg-desktop.svg')] lg:bg-[position:center_left] lg:py-[55px] ${openSans.variable} ${poppins.variable}`}
      >
        <Main />
        <Footer />
        {/* <Slider
          basePath="/huddle-landing-page-with-single-introductory-section/design/"
          // absolutePath="/huddle-landing-page-with-single-introductory-section/design/active-states.jpg"
        /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <main
      className="w-[calc(100vw-72px)] max-w-[calc(375px-72px)] lg:w-[calc(100vw-160px)] lg:max-w-[calc(1440px-160px)]"
      aria-labelledby="main-heading"
    >
      <Logo />
      <div className="flex flex-col items-center lg:mt-[92px] lg:grid lg:grid-cols-[calc(696/1440*100vw),auto] lg:grid-rows-1">
        <Mockup />
        <div className="lg:ml-[min(calc(58/1440*100vw),58px)] lg:self-start lg:pr-1 lg:pt-[39px]">
          <h1
            className="text-center font-poppins text-[24px] font-semibold text-white lg:text-left lg:text-[40px]"
            id="main-heading"
          >
            Build The Community Your Fans Will Love
          </h1>
          <p className="mt-[13px] text-center text-white/75 lg:mt-[20px] lg:text-left lg:text-[18px]">
            Huddle re-imagines the way we build communities. You have a voice,
            but so does your audience. Create connections with your users as you
            engage in genuine discussion.
          </p>
          <a
            href=""
            className="mx-auto mt-6 flex h-[40px] w-[200px] items-center justify-center rounded-full bg-white pt-[2.2px] font-poppins text-[12px] text-huddle-intro-primary-violet shadow-md shadow-gray-800/40 hover:bg-huddle-intro-primary-magenta hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:ml-0 lg:h-[56px] lg:pt-0 lg:text-[18px]"
          >
            Register
          </a>
        </div>
      </div>
      <SocialMedia />
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 z-20 w-full text-center text-[11px] text-white lg:bottom-10 lg:px-20 lg:text-left lg:text-[13px] [&_a:hover]:text-white [&_a:hover]:decoration-white [&_a]:font-bold [&_a]:text-huddle-intro-primary-magenta [&_a]:underline [&_a]:decoration-white/50 [&_a]:decoration-wavy">
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

function SocialMedia() {
  return (
    <div className="mt-[64px] flex items-center justify-center gap-[10px] place-self-center lg:absolute lg:bottom-[40px] lg:right-[80px] lg:z-40 lg:mt-0 lg:gap-[16px] lg:place-self-start [&_a:hover]:border-huddle-intro-primary-magenta [&_a]:flex [&_a]:aspect-square [&_a]:w-[28px] [&_a]:items-center [&_a]:justify-center [&_a]:rounded-full [&_a]:border lg:[&_a]:w-10">
      <a href="" className="group">
        <svg
          className="h-[14px] text-white group-hover:text-huddle-intro-primary-magenta lg:h-[18.5px]"
          aria-label="Facebook"
          role="graphics-symbol"
        >
          <use href="/huddle-landing-page-with-alternating-feature-blocks/images/icon-facebook.svg#icon-facebook" />
        </svg>
      </a>
      <a href="" className="group">
        <svg
          className="h-[13px] text-white group-hover:text-huddle-intro-primary-magenta lg:h-[17px]"
          aria-label="Twitter"
          role="graphics-symbol"
        >
          <use href="/huddle-landing-page-with-alternating-feature-blocks/images/icon-twitter.svg#icon-twitter" />
        </svg>
      </a>
      <a href="" className="group">
        <svg
          className="h-[15px] text-white group-hover:text-huddle-intro-primary-magenta lg:h-[20px]"
          aria-label="Instagram"
          role="graphics-symbol"
        >
          <use href="/huddle-landing-page-with-alternating-feature-blocks/images/icon-instagram.svg#icon-instagram" />
        </svg>
      </a>
    </div>
  );
}

function Mockup() {
  return (
    <div className="relative mx-[.75px] my-[60px] aspect-[709/506] w-[301px] lg:m-0 lg:w-[calc(696/1440*100vw)] lg:origin-center lg:scale-[calc(696/683.25)]">
      <Image
        src="/huddle-landing-page-with-single-introductory-section/images/illustration-mockups.svg"
        alt="Huddle Illustration Mockup"
        title="Huddle Illustration Mockup"
        fill
        className="object-contain"
      />
    </div>
  );
}

function Logo() {
  return (
    <div className="relative -ml-[2px] aspect-[198/49] w-[128px] lg:w-[200px] lg:scale-[calc(200/186)]">
      <Image
        src="/huddle-landing-page-with-single-introductory-section/images/logo.svg"
        alt="Huddle Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
