import Head from "next/head";
import Image from "next/image";
import type { CSSProperties } from "react";
import { baiJamjuree } from "../utils/fonts/baiJamjuree";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function ClipboardLandingPage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Clipboard landing page</title>
      </Head>
      <div
        className={`App relative flex min-h-[100svh] flex-col items-center bg-white font-bai-jamjuree ${baiJamjuree.variable}`}
      >
        <Main />
        <Footer />
        {/* <Slider
          basePath="/clipboard-landing-page/design"
          absolutePath="/clipboard-landing-page/design/active-states.jpg"
        /> */}
      </div>
    </>
  );
}

function CTA({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex w-full flex-col gap-6 text-[18px] font-semibold tracking-[.4px] lg:flex-row lg:justify-center lg:gap-4 ${className}`}
    >
      <a
        href=""
        className="flex h-[56px] items-center justify-center rounded-full border-b-[3px] border-b-[hsl(171,66%,37%)] bg-clipboard-primary-cyan pt-1 text-white shadow-xl shadow-clipboard-primary-cyan/20 hover:border-opacity-40 hover:bg-clipboard-primary-cyan/75 lg:w-[226px]"
      >
        Download for iOS
      </a>
      <a
        href=""
        className="flex h-[56px] items-center justify-center rounded-full border-b-[3px] border-b-[hsl(232,65%,58%)] bg-clipboard-primary-blue pt-1 text-white shadow-xl shadow-clipboard-primary-blue/20 hover:border-opacity-40 hover:bg-clipboard-primary-blue/75 lg:w-[226px]"
      >
        Download for Mac
      </a>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="flex flex-col items-center bg-[url('/clipboard-landing-page/images/bg-header-mobile.png')] bg-[length:100%_auto] bg-no-repeat px-8 py-[123px] lg:bg-[url('/clipboard-landing-page/images/bg-header-desktop.png')] lg:py-[131px]">
      <svg
        className="w-[125px]"
        viewBox="0 0 125 125"
        aria-labelledby="clipboard-logo-title"
      >
        <title id="clipboard-logo-title">Clipboard Logo</title>
        <use href="/clipboard-landing-page/images/logo.svg#clipboard-logo" />
      </svg>
      <h1
        className="mt-[64px] text-center text-[32px] font-semibold leading-[40px] tracking-[-.5px] text-clipboard-neutral-200 lg:mt-[65px] lg:text-[46px] lg:tracking-[-.75px]"
        id="main-heading"
      >
        A history of everything you copy
      </h1>
      <p className="mt-4 text-center leading-[26px] tracking-[.1px] text-clipboard-neutral-100 lg:mt-[25px] lg:max-w-[720px] lg:text-[20px] lg:leading-[30px]">
        Clipboard allows you to track and organize everything you copy.
        Instantly access your clipboard on all your devices.
      </p>
      <CTA className="mt-12" />
    </section>
  );
}

function SnippetSection() {
  return (
    <section className="flex flex-col items-center px-[31px] py-[37px] lg:px-0 lg:py-[24px]">
      <h2 className="text-center text-[28px] font-semibold leading-[35px] tracking-[-.5px] text-clipboard-neutral-200 lg:text-[36px] lg:tracking-[-.6px]">
        Keep track of your snippets
      </h2>
      <p className="mt-[16px] text-center leading-[26px] tracking-[.1px] text-clipboard-neutral-100 lg:mt-6 lg:max-w-[720px] lg:text-[18px] lg:leading-[30px]">
        Clipboard instantly stores any item you copy in the cloud, meaning you
        can access your snippets immediately on all your devices. Our Mac and
        iOS apps will help you organize everything.
      </p>
      <div className="lg:mt-[80px] lg:grid lg:h-[572px] lg:w-full lg:grid-cols-2 lg:grid-rows-1">
        <div className="relative mb-[53px] mt-[65px] aspect-[752/572] w-full lg:mt-0 lg:h-full lg:w-auto lg:justify-self-end">
          <Image
            src="/clipboard-landing-page/images/image-computer.png"
            alt="Computer Illustration"
            className="object-contain"
            fill
          />
        </div>
        <div className="flex flex-col gap-[45px] lg:ml-[110px] lg:mt-[65px] lg:max-w-[340px] lg:gap-[53px] lg:self-start">
          <article>
            <h3 className="text-center text-[24px] font-semibold tracking-[-.3px] text-clipboard-neutral-200 lg:text-left lg:tracking-[-.4px]">
              Quick Search
            </h3>
            <p className="mt-[7px] text-center leading-[26px] tracking-[.1px] text-clipboard-neutral-100 lg:mt-[5px] lg:text-left lg:leading-[30px]">
              Easily search your snippets by content, category, web address,
              application, and more.
            </p>
          </article>
          <article>
            <h3 className="text-center text-[24px] font-semibold tracking-[-.3px] text-clipboard-neutral-200 lg:text-left lg:tracking-[-.4px]">
              iCloud Sync
            </h3>
            <p className="mt-[7px] text-center leading-[26px] tracking-[.1px] text-clipboard-neutral-100 lg:mt-[5px] lg:text-left lg:leading-[30px]">
              Instantly saves and syncs snippets across all your devices.
            </p>
          </article>
          <article>
            <h3 className="text-center text-[24px] font-semibold tracking-[-.3px] text-clipboard-neutral-200 lg:text-left lg:tracking-[-.4px]">
              Complete History
            </h3>
            <p className="mt-[7px] text-center leading-[26px] tracking-[.1px] text-clipboard-neutral-100 lg:mt-[5px] lg:text-left lg:leading-[30px]">
              Retrieve any snippets from the first moment you started using the
              app.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function AccessAnywhereSection() {
  return (
    <section
      className="px-[--section-padding] pt-[148px] lg:flex lg:flex-col lg:items-center lg:pt-[131px]"
      style={
        {
          "--section-padding": "13px",
        } as CSSProperties
      }
    >
      <h2 className="px-[calc(32px-var(--section-padding))] text-center text-[28px] font-semibold leading-[35px] tracking-[-.5px] text-clipboard-neutral-200 lg:text-[36px] lg:tracking-[-.6px]">
        Access Clipboard Anywhere
      </h2>
      <p className="mt-[16px] px-[calc(32px-var(--section-padding))] text-center leading-[26px] tracking-[.1px] text-clipboard-neutral-100 lg:mt-[25px] lg:max-w-[720px] lg:text-[18px] lg:leading-[30px]">
        Whether you’re on the go, or at your computer, you can access all your
        Clipboard snippets in a few simple clicks.
      </p>
      <div className="relative mt-[60px] aspect-[905/575] w-full translate-x-[1px] drop-shadow-[0_60px_20px_theme(colors.clipboard.neutral.200/.075)] lg:mt-[99px] lg:w-[905px] lg:translate-x-0 lg:drop-shadow-[0_20px_20px_theme(colors.clipboard.neutral.200/.075)]">
        <Image
          src="/clipboard-landing-page/images/image-devices.png"
          alt="Devices Illustration"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
}

function SuperchargeWorkflow() {
  return (
    <section className="px-8 pb-[25px] pt-[95px] lg:flex lg:flex-col lg:items-center lg:pt-[76px]">
      <h2 className="px-[calc(32px-var(--section-padding))] text-center text-[28px] font-semibold leading-[35px] tracking-[-.5px] text-clipboard-neutral-200 lg:text-[36px] lg:tracking-[-.6px]">
        Supercharge your workflow
      </h2>
      <p className="mt-[11px] px-[calc(32px-var(--section-padding))] text-center leading-[26px] tracking-[.1px] text-clipboard-neutral-100 lg:mt-6 lg:max-w-[720px] lg:text-[18px] lg:leading-[30px]">
        We’ve got the tools to boost your productivity.
      </p>
      <div className="my-[90px] flex flex-col items-center gap-[52.5px] md:flex-wrap lg:mt-[72px] lg:grid lg:grid-cols-[repeat(3,minmax(200px,348px))] lg:grid-rows-1 lg:items-start lg:gap-[32px]">
        <article className="flex flex-col items-center">
          <div className="flex h-10 items-center justify-center">
            <Image
              src="/clipboard-landing-page/images/icon-blacklist.svg"
              alt="Icon Blacklist"
              width={44}
              height={40}
            />
          </div>
          <h3 className="mt-[37px] text-center text-[24px] font-semibold tracking-[-.3px] text-clipboard-neutral-200">
            Create blacklists
          </h3>
          <p className="mt-[15px] text-center leading-[26px] tracking-[.1px] text-clipboard-neutral-100 lg:mt-[13px] lg:leading-[30px]">
            Ensure sensitive information never makes its way to your clipboard
            by excluding certain sources.
          </p>
        </article>
        <article className="flex flex-col items-center">
          <div className="flex h-10 items-center justify-center">
            <Image
              src="/clipboard-landing-page/images/icon-text.svg"
              alt="Icon Text"
              width={36}
              height={32}
            />
          </div>
          <h3 className="mt-[37px] text-center text-[24px] font-semibold tracking-[-.3px] text-clipboard-neutral-200">
            Plain text snippets
          </h3>
          <p className="mt-[15px] text-center leading-[26px] tracking-[.1px] text-clipboard-neutral-100 lg:mt-[13px] lg:leading-[30px]">
            Remove unwanted formatting from copied text for a consistent look.
          </p>
        </article>
        <article className="flex flex-col items-center">
          <div className="flex h-10 items-center justify-center">
            <Image
              src="/clipboard-landing-page/images/icon-preview.svg"
              alt="Icon Preview"
              width={50}
              height={32}
            />
          </div>
          <h3 className="mt-[37px] text-center text-[24px] font-semibold tracking-[-.3px] text-clipboard-neutral-200">
            Sneak preview
          </h3>
          <p className="mt-[15px] text-center leading-[26px] tracking-[.1px] text-clipboard-neutral-100 lg:mt-[13px] lg:leading-[30px]">
            Quick preview of all snippets on your Clipboard for easy access.
          </p>
        </article>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section className="flex flex-col items-center justify-between py-4 lg:mx-auto lg:mt-[27px] lg:h-auto lg:flex-row lg:flex-wrap lg:justify-center lg:gap-12 xl:w-[calc(100vw-330px)] xl:justify-between">
      <h2 className="sr-only">Clipboard Clients</h2>
      <div className="relative aspect-[165/49] h-[41px] lg:h-[49px]">
        <Image
          src="/clipboard-landing-page/images/logo-google.png"
          alt="Google Logo"
          fill
        />
      </div>
      <div className="relative mt-[66px] aspect-[139/51] h-[42.5px] lg:mt-0 lg:h-[51px]">
        <Image
          src="/clipboard-landing-page/images/logo-ibm.png"
          alt="IBM Logo"
          fill
        />
      </div>
      <div className="relative mt-[70px] aspect-[161/35] h-[29px] lg:mt-0 lg:h-[35px]">
        <Image
          src="/clipboard-landing-page/images/logo-microsoft.png"
          alt="Microsoft Logo"
          fill
        />
      </div>
      <div className="relative mt-[63px] aspect-[135/56] h-[47px] lg:mt-0 lg:h-[56px]">
        <Image
          src="/clipboard-landing-page/images/logo-hp.png"
          alt="HP Logo"
          fill
        />
      </div>
      <div className="relative mt-[56px] aspect-[125/30] h-[25px] lg:mt-0 lg:h-[30px]">
        <Image
          src="/clipboard-landing-page/images/logo-vector-graphics.png"
          alt="Vector Graphics Logo"
          fill
        />
      </div>
    </section>
  );
}

function Available() {
  return (
    <section className="px-[32px] py-[154px] lg:flex lg:flex-col lg:items-center lg:pb-[134px] lg:pt-[147px]">
      <h2 className="text-center text-[28px] font-semibold leading-[35px] tracking-[-.5px] text-clipboard-neutral-200 lg:text-[36px]">
        Clipboard for iOS and Mac OS
      </h2>
      <p className="mt-[16px] text-center leading-[26px] tracking-[.1px] text-clipboard-neutral-100 lg:mt-[25px] lg:max-w-[720px] lg:text-[18px] lg:leading-[30px]">
        Available for free on the App Store. Download for Mac or iOS, sync with
        iCloud and you’re ready to start adding to your clipboard.
      </p>
      <CTA className="mt-[46px] lg:mt-[47px]" />
    </section>
  );
}

function Main() {
  return (
    <main
      className="w-full max-w-screen-sm lg:max-w-none"
      aria-labelledby="main-heading"
    >
      <HeroSection />
      <SnippetSection />
      <AccessAnywhereSection />
      <SuperchargeWorkflow />
      <Clients />
      <Available />
    </main>
  );
}

function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`mb-0.5 flex items-center gap-10 lg:gap-6 ${className}`}>
      <a
        href=""
        className="text-clipboard-neutral-200 hover:text-clipboard-primary-cyan"
      >
        <svg className="w-6" viewBox="0 0 24 24">
          <title>Facebook</title>
          <use href="/clipboard-landing-page/images/icon-facebook.svg#icon-facebook" />
        </svg>
      </a>
      <a
        href=""
        className="text-clipboard-neutral-200 hover:text-clipboard-primary-cyan"
      >
        <svg className="w-6" viewBox="0 0 24 20">
          <title>Twitter</title>
          <use href="/clipboard-landing-page/images/icon-twitter.svg#icon-twitter" />
        </svg>
      </a>
      <a
        href=""
        className="text-clipboard-neutral-200 hover:text-clipboard-primary-cyan"
      >
        <svg className="w-6" viewBox="0 0 24 24">
          <title>Instagram</title>
          <use href="/clipboard-landing-page/images/icon-instagram.svg#icon-instagram" />
        </svg>
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative mt-[16px] h-[500.18px] w-full max-w-screen-sm bg-clipboard-neutral-100/10 py-[52px] lg:h-auto lg:max-w-none lg:px-[165px] lg:pb-[25px] lg:pt-[44px]">
      <div className="flex flex-col items-center lg:flex-row lg:items-start">
        <Image
          src="/clipboard-landing-page/images/logo.svg"
          width={55}
          height={55}
          alt="Clipboard Company Logo"
        />
        <nav className="mt-[42px] text-center text-[18px] text-clipboard-neutral-200 lg:ml-[min(calc(30px+(100vw-1024px)*(105/416)),135px)] lg:mt-0 lg:pt-[1px]">
          <ul className="flex flex-col items-center gap-[23px] lg:h-[80px] lg:flex-wrap lg:items-start lg:gap-6 lg:gap-x-[min(calc(70/1440*100vw),70px)] lg:leading-none lg:[&>li]:w-[120px] lg:[&>li]:text-left">
            <li>
              <a href="" className="hover:text-clipboard-primary-cyan">
                FAQs
              </a>
            </li>
            <li>
              <a href="" className="hover:text-clipboard-primary-cyan">
                Contact Us
              </a>
            </li>
            <li>
              <a href="" className="hover:text-clipboard-primary-cyan">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="" className="hover:text-clipboard-primary-cyan">
                Press Kit
              </a>
            </li>
            <li>
              <a href="" className="hover:text-clipboard-primary-cyan">
                Install Guide
              </a>
            </li>
          </ul>
        </nav>
        <SocialIcons className="mt-[49px] lg:ml-auto lg:mt-0 lg:self-center lg:pb-[18px]" />
      </div>
      <p className="absolute bottom-3 left-0 w-full text-center text-[11px] text-clipboard-neutral-200 lg:bottom-8 lg:px-[165px] lg:text-right [&_a:hover]:text-clipboard-primary-cyan [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
