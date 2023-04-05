import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { CSSProperties } from "react";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function FyloLandingPageWithTwoColumnLayout() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Fylo landing page with two column layout</title>
      </Head>
      <div className="App font-open-sans relative min-h-[100svh]">
        <Header />
        <Main />
        <Footer />
        {/* <Slider basePath="/fylo-landing-page-with-two-column-layout/design" /> */}
      </div>
    </>
  );
}

function Header() {
  return (
    <header className="flex h-[72px] items-center justify-between px-6">
      <div className="relative aspect-[166/49] w-20">
        <Image
          src="/fylo-landing-page-with-two-column-layout/images/logo.svg"
          alt="Fylo Logo"
          className="object-contain"
          fill
        />
      </div>
      <nav>
        <ul className="text-fylo-landing-primary-blue-200 font-raleway flex items-center gap-[25px] text-[12px] leading-none">
          <li>
            <a href="">Features</a>
          </li>
          <li>
            <a href="">Team</a>
          </li>
          <li>
            <a href="">Sign In</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <div className="flex flex-col items-center px-6 pt-[74px]">
      <div className="relative ml-[1px] aspect-[1132.93/839.14] w-[calc(100%-23px)]">
        <Image
          src="/fylo-landing-page-with-two-column-layout/images/illustration-1.svg"
          alt="Hero Image Illustration"
          className="object-contain"
          fill
        />
      </div>
      <h1 className="font-open-sans text-fylo-landing-primary-blue-200 mt-[39px] text-center text-[24px] font-bold leading-[36px]">All your files in one secure location, accessible anywhere.</h1>
      <p className="text-fylo-landing-primary-blue-200 mt-[25px] pl-3 pr-5 text-center text-[14px]">Fylo stores your most important files in one secure location. Access them wherever you need, share and collaborate with friends, family, and co-workers.</p>
      <form
        noValidate
        className="font-raleway mt-[31.75px] grid w-full grid-cols-1 grid-rows-[repeat(2,40px)] gap-y-4 pl-[14px] pr-[9px]"
      >
        <input
          type="emaiil"
          placeholder="Enter your email..."
          className=" border-fylo-landing-primary-blue-100 w-full rounded-sm border px-5 py-[1px] text-[12px] placeholder:opacity-50"
        />
        <button className="bg-fylo-landing-accent-blue text-fylo-landing-neutral-100 shadow-fylo-landing-primary-blue-200/10 -translate-x-[2px] rounded-sm text-[14px] font-bold shadow-md">Get Started</button>
      </form>
    </div>
  );
}

function ProductiveSection() {
  return (
    <div className="mt-[90px]">
      <div>
        <svg
          viewBox="0 0 375 52"
          className="block w-full lg:hidden"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <path
              id="a"
              d="M0 0h375v53H0z"
            />
          </defs>
          <g
            fill="none"
            fillRule="evenodd"
          >
            <mask
              id="b"
              fill="#fff"
            >
              <use xlinkHref="#a" />
            </mask>
            <path
              d="M0 33.395C83.021 11.132 145.521 0 187.5 0 229.479 0 291.979 11.132 375 33.395V961H0V33.395z"
              fill="#F8F8FE"
              mask="url(#b)"
            />
          </g>
        </svg>
        <svg
          viewBox="0 0 1440 114"
          className="hidden w-full lg:block"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <path
              id="a"
              d="M0 0h1440v114H0z"
            />
          </defs>
          <g
            fill="none"
            fillRule="evenodd"
          >
            <mask
              id="b"
              fill="#fff"
            >
              <use xlinkHref="#a" />
            </mask>
            <path
              d="M0 72.728C318.801 24.243 558.801 0 720 0c161.199 0 401.199 24.243 720 72.728v765.146H0V72.728z"
              fill="#F8F8FE"
              mask="url(#b)"
            />
          </g>
        </svg>
      </div>
      <div className="bg-fylo-landing-neutral-100 flex flex-col items-center px-7 pb-[81px]">
        <div className="relative my-[41px] aspect-[1077.87/813.02] w-full">
          <Image
            src="/fylo-landing-page-with-two-column-layout/images/illustration-2.svg"
            alt="Productive Illustration"
            className="object-contain"
            fill
          />
        </div>
        <h2 className="font-raleway text-fylo-landing-primary-blue-200 mt-[47px] font-bold">Stay productive, wherever you are</h2>
        <p className="text-fylo-landing-primary-blue-100 mt-6 -ml-2 text-[14px]">Never let location be an issue when accessing your files. Fylo has you covered for all of your file storage needs.</p>
        <p className="text-fylo-landing-primary-blue-100 mt-4 -ml-2 text-[14px]">Securely share files and folders with friends, family and colleagues for live collaboration. No email attachments required!</p>
        <a
          href=""
          className="text-fylo-landing-accent-cyan border-b-fylo-landing-accent-cyan mt-[30px] flex h-[28px] translate-x-[1px] items-center gap-[7px] border-b"
        >
          <span className="text-[13px] tracking-[-.5px]">See how Fylo works</span>
          <span className="relative aspect-square w-4">
            <Image
              src="/fylo-landing-page-with-two-column-layout/images/icon-arrow.svg"
              alt="Icon Arrow"
              fill
              className="object-contain"
            />
          </span>
        </a>
        <Testimony />
      </div>
    </div>
  );
}

function Testimony() {
  return (
    <div className="mt-10 flex h-[170px] w-[280px] flex-col items-start rounded bg-white pt-[21px] pl-[26px] pr-3 text-[10px] tracking-[.4px] shadow-md">
      <svg
        className="w-[11px]"
        viewBox="0 0 13 12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          transform="translate(-34 -25)"
          fill="#07043B"
          fillRule="evenodd"
          fontFamily="Helvetica"
          fontSize="45"
        >
          <tspan
            x="33"
            y="56"
          >
            “
          </tspan>
        </text>
      </svg>
      <p className="mt-2 leading-[18px]">Fylo has improved our team productivity by an order of magnitude. Since making the switch our team has become a well-oiled collaboration machine.</p>
      <div className="mt-[13px] flex h-6 items-center gap-2 leading-none">
        <div className="relative aspect-square w-6 overflow-hidden rounded-full">
          <Image
            src="/fylo-landing-page-with-two-column-layout/images/avatar-testimonial.jpg"
            fill
            alt="Kyle Burton Avatar"
          />
        </div>
        <div className="pt-[2px]">
          <p className="text-[9px] font-bold">Kyle Burton</p>
          <p className="mt-[5px] text-[6px]">Founder & CEO, Huddle</p>
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <>
      <Hero />
      <ProductiveSection />
      {`            
         Get early access today
       
         It only takes a minute to sign up and our free starter tier is extremely generous. 
         If you have any questions, our support team would be happy to help you.
       
         Get Started For Free
       
         Phone: +1-543-123-4567
         example@fylo.com
       
         About Us
         Jobs
         Press
         Blog
       
         Contact Us
         Terms
         Privacy
      `}
    </>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
