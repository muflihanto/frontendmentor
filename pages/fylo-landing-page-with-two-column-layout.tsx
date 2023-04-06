import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { CSSProperties, useRef, useState } from "react";
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

function FyloLogo({ className, variant }: { className: string; variant: "header" | "footer" }) {
  return (
    <svg
      viewBox="0 0 166 49"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path
          id="a"
          d="M.014.03h93.96v48.29H.015z"
        />
      </defs>
      <g
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M0 14.13v.123l27.95 13.13L56 14.209v-.033L27.95 1 0 14.13zm10.077.062L27.95 5.795l17.877 8.397-17.877 8.396-17.874-8.396zM27.95 32.483L0 19.55v4.784l27.95 12.964L56 24.289v-4.784L27.95 32.483zm0 9.703L0 29.25v4.783L27.95 47 56 33.99v-4.784l-28.05 12.98z"
          fill={variant === "header" ? "#BDBAFA" : "#fff"}
        />
        <g transform="translate(72)">
          <mask
            id="b"
            fill="#fff"
          >
            <use xlinkHref="#a" />
          </mask>
          <path
            d="M87.56 24.152a8.1 8.1 0 0 0-2.161-5.573 7.259 7.259 0 0 0-2.34-1.673 6.864 6.864 0 0 0-2.85-.601c-1.01 0-1.961.2-2.852.601a7.257 7.257 0 0 0-2.34 1.673 8.102 8.102 0 0 0-2.16 5.574 8.102 8.102 0 0 0 2.16 5.573 7.257 7.257 0 0 0 2.34 1.672 6.864 6.864 0 0 0 2.851.602c1.01 0 1.96-.2 2.852-.602a7.259 7.259 0 0 0 2.339-1.672 8.1 8.1 0 0 0 2.16-5.574zm6.415 0c0 1.932-.357 3.723-1.07 5.373a13.098 13.098 0 0 1-2.94 4.28c-1.247 1.205-2.71 2.156-4.388 2.854-1.678.699-3.468 1.048-5.369 1.048-1.9 0-3.683-.349-5.346-1.048a13.863 13.863 0 0 1-4.366-2.876 13.351 13.351 0 0 1-2.94-4.302c-.713-1.65-1.07-3.426-1.07-5.329 0-1.873.364-3.634 1.092-5.284a13.92 13.92 0 0 1 2.962-4.325 13.671 13.671 0 0 1 4.367-2.898 13.552 13.552 0 0 1 5.301-1.048c1.901 0 3.69.35 5.369 1.048 1.678.698 3.14 1.65 4.388 2.854 1.248 1.204 2.228 2.638 2.94 4.302.713 1.665 1.07 3.449 1.07 5.351zM64.258 36.905a8.6 8.6 0 0 1-1.715.58c-.638.148-1.3.222-1.982.222a9.84 9.84 0 0 1-2.74-.379 6.003 6.003 0 0 1-2.295-1.226c-.653-.565-1.173-1.3-1.56-2.207-.385-.907-.578-2-.578-3.277V.029h6.549v29.474c0 1.07.215 1.806.646 2.207.43.401.943.602 1.537.602.742 0 1.455-.223 2.138-.669v5.262zM50.492 11.22L38.908 41.854c-.861 2.289-1.99 3.939-3.386 4.95-1.396 1.01-3.06 1.515-4.99 1.515-.297 0-.623-.022-.98-.066a7.352 7.352 0 0 1-1.025-.201l-2.138-5.975a8.486 8.486 0 0 0 1.56.557c.534.134 1.039.201 1.514.201 1.01 0 1.93-.23 2.762-.691.832-.46 1.47-1.315 1.916-2.564l.891-2.586-9.935-25.773h6.995l5.925 16.588 5.57-16.588h6.905zM23.538 7.342H6.786v8.294h16.529v5.618H6.785v15.784H.015V1.412h23.524v5.93z"
            fill={variant === "header" ? "#000" : "#fff"}
            mask="url(#b)"
          />
        </g>
      </g>
    </svg>
  );
}

function Header() {
  return (
    <header className="flex h-[72px] items-center justify-between px-6">
      <FyloLogo
        className="w-20"
        variant="header"
      />
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

// TODO: Add Form Submit Handler and Error State
function GetStartedForm({ variant = "hero" }: { variant?: "hero" | "early" }) {
  // const formStyle = useRef({
  // });

  const [formStyle] = useState({
    hero: {
      form: "mt-[31.75px] grid-rows-[repeat(2,40px)] pl-[14px] pr-[9px] gap-y-4 w-full",
      input: "text-[12px] px-5 py-[1px] ",
      button: "-translate-x-[2px] text-[14px]",
      placeholder: "Enter your email...",
      btnText: "Get Started",
    },
    early: {
      form: "mt-[23px] grid-rows-[34px,32px] gap-y-[7px] w-[245px] pr-[3px]",
      input: "text-[10px] px-2 py-[1px]",
      button: "text-[10px] w-[calc(100%-2px)] place-self-center h-full",
      placeholder: "email@example.com",
      btnText: "Get Started For Free",
    },
  });

  return (
    <form
      noValidate
      className={`font-raleway grid grid-cols-1 ${formStyle[variant].form}`}
    >
      <input
        type="email"
        placeholder={formStyle[variant].placeholder}
        className={`border-fylo-landing-primary-blue-100 w-full rounded-sm border placeholder:opacity-50 ${formStyle[variant].input}`}
      />
      <button className={`bg-fylo-landing-accent-blue text-fylo-landing-neutral-100 shadow-fylo-landing-primary-blue-200/10 rounded-sm font-bold shadow-md ${formStyle[variant].button}`}>{formStyle[variant].btnText}</button>
    </form>
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
      <GetStartedForm />
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
      <div className="bg-fylo-landing-neutral-100 flex flex-col items-center px-7 pb-[81.5px]">
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

function EarlyAccessSection() {
  return (
    <div className="bg-fylo-landing-primary-blue-100 flex h-[345px] flex-col items-center px-[31px] pt-[52px] text-white">
      <h2 className="font-raleway pr-[6px] text-center text-[18px] font-bold">Get early access today</h2>
      <p className="text-fylo-landing-neutral-100/75 mt-[15px] pr-[23px] text-center text-[14px]">It only takes a minute to sign up and our free starter tier is extremely generous. If you have any questions, our support team would be happy to help you.</p>
      <GetStartedForm variant="early" />
    </div>
  );
}

function Main() {
  return (
    <>
      <Hero />
      <ProductiveSection />
      <EarlyAccessSection />
    </>
  );
}

function SocialIcon() {
  return (
    <div className="mt-[50px] flex gap-[11px] self-center">
      <a
        href=""
        className="border-fylo-landing-neutral-200 hover:border-fylo-landing-accent-blue group flex h-[27px] w-[27px] items-center justify-center rounded-full border p-[6px]"
      >
        <FontAwesomeIcon
          icon={faFacebookF}
          className="group-hover:text-fylo-landing-accent-blue h-full w-full"
        />
      </a>
      <a
        href=""
        className="border-fylo-landing-neutral-200 hover:border-fylo-landing-accent-blue group flex h-[27px] w-[27px] items-center justify-center rounded-full border p-[6px]"
      >
        <FontAwesomeIcon
          icon={faTwitter}
          className="group-hover:text-fylo-landing-accent-blue h-full w-full"
        />
      </a>
      <a
        href=""
        className="border-fylo-landing-neutral-200 hover:border-fylo-landing-accent-blue group flex h-[27px] w-[27px] items-center justify-center rounded-full border p-[6px]"
      >
        <FontAwesomeIcon
          icon={faInstagram}
          className="group-hover:text-fylo-landing-accent-blue h-full w-full"
        />
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-fylo-landing-primary-blue-200 relative flex h-[682.97px] flex-col px-[39px] pt-[65px] text-white">
      <FyloLogo
        className="w-[176px]"
        variant="footer"
      />
      <div className="text-fylo-landing-neutral-200 flex flex-col">
        <div className="mt-[39px] flex flex-col gap-4 px-[2px]">
          <p className="flex gap-[18px]">
            <svg
              className="mx-[1px] w-[18px]"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 12.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H1C.4 0 0 .4 0 1c0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM16 9h2c0-5-4-9-9-9v2c3.9 0 7 3.1 7 7zm-4 0h2c0-2.8-2.2-5-5-5v2c1.7 0 3 1.3 3 3z"
                fill="#FFF"
                fillRule="evenodd"
              />
            </svg>
            <span>Phone: +1-543-123-4567</span>
          </p>
          <p className="text-fylo-landing-neutral-200 flex gap-[18px]">
            <svg
              viewBox="0 0 20 16"
              className="w-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 0H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 14h-2V5.2L10 9 4 5.2V14H2V2h1.2L10 6.2 16.8 2H18v12z"
                fill="#FFF"
                fillRule="evenodd"
              />
            </svg>
            <span>example@fylo.com</span>
          </p>
        </div>
        <nav className="mt-[55px] w-full ">
          <ul className="flex flex-col gap-[14px]">
            <li>
              <a href="">About Us</a>
            </li>
            <li>
              <a href="">Jobs</a>
            </li>
            <li>
              <a href="">Press</a>
            </li>
            <li>
              <a href="">Blog</a>
            </li>
          </ul>
        </nav>
        <nav className="mt-[46px] w-full ">
          <ul className="flex flex-col gap-[14px]">
            <li>
              <a href="">Contact Us</a>
            </li>
            <li>
              <a href="">Terms</a>
            </li>
            <li>
              <a href="">Privacy</a>
            </li>
          </ul>
        </nav>
        <SocialIcon />
      </div>
      <p className="absolute bottom-3 left-0 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
