import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { CSSProperties } from "react";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

/*
 * TODO : Add mobile to desktop responsivity
 * TODO : fix sponsors section layouting
 * TODO : fix desktop supercharge section grid layout
 */

export default function ClipboardLandingPage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Clipboard landing page</title>
      </Head>
      <div className="App font-bai-jamjuree relative flex min-h-[100svh] flex-col items-center">
        <Main />
        <Footer />
        {/* <Slider basePath="/clipboard-landing-page/design" /> */}
      </div>
    </>
  );
}

function CTA({ className = "" }: { className?: string }) {
  return (
    <div className={"flex w-full flex-col gap-6 text-[18px] font-semibold tracking-[.4px] lg:flex-row lg:justify-center lg:gap-4 " + className}>
      <a
        href=""
        className="bg-clipboard-primary-cyan shadow-clipboard-primary-cyan/20 flex h-[56px] items-center justify-center rounded-full border-b-[3px] border-b-[hsl(171,66%,37%)] pt-1 text-white shadow-xl lg:w-[226px]"
      >
        Download for iOS
      </a>
      <a
        href=""
        className="bg-clipboard-primary-blue shadow-clipboard-primary-blue/20 flex h-[56px] items-center justify-center rounded-full border-b-[3px] border-b-[hsl(232,65%,58%)] pt-1 text-white shadow-xl lg:w-[226px]"
      >
        Download for Mac
      </a>
    </div>
  );
}

function HeroSection() {
  return (
    <main className="flex flex-col items-center bg-[url('/clipboard-landing-page/images/bg-header-mobile.png')] bg-[length:100%_auto] bg-no-repeat py-[123px] px-8 lg:bg-[url('/clipboard-landing-page/images/bg-header-desktop.png')] lg:py-[131px]">
      <svg
        className="w-[125px]"
        viewBox="0 0 125 125"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          stroke="#26BBA4"
          strokeWidth="10"
          fill="none"
          fillRule="evenodd"
        >
          <circle
            cx="62.5"
            cy="62.5"
            r="57.5"
          />
          <path
            d="M85.481 85.481c-12.692 12.692-33.27 12.692-45.962 0s-12.692-33.27 0-45.962 33.27-12.692 45.962 0"
            strokeLinecap="round"
          />
        </g>
      </svg>
      <h1 className="text-clipboard-neutral-200 mt-[64px] text-center text-[32px] font-semibold leading-[40px] tracking-[-.5px] lg:mt-[65px] lg:text-[46px] lg:tracking-[-.75px]">A history of everything you copy</h1>
      <p className="text-clipboard-neutral-100 mt-4 text-center leading-[26px] tracking-[.1px] lg:mt-[25px] lg:max-w-[720px] lg:text-[20px] lg:leading-[30px]">Clipboard allows you to track and organize everything you copy. Instantly access your clipboard on all your devices.</p>
      <CTA className="mt-12" />
    </main>
  );
}

function SnippetSection() {
  return (
    <section className="flex flex-col items-center px-[31px] py-[37px] lg:py-[24px] lg:px-0">
      <h2 className="text-clipboard-neutral-200 text-center text-[28px] font-semibold leading-[35px] tracking-[-.5px] lg:text-[36px] lg:tracking-[-.6px]">Keep track of your snippets</h2>
      <p className="text-clipboard-neutral-100 mt-[16px] text-center leading-[26px] tracking-[.1px] lg:mt-6 lg:max-w-[720px] lg:text-[18px] lg:leading-[30px]">Clipboard instantly stores any item you copy in the cloud, meaning you can access your snippets immediately on all your devices. Our Mac and iOS apps will help you organize everything.</p>
      <div className="lg:mt-[80px] lg:grid lg:h-[572px] lg:w-full lg:grid-cols-2 lg:grid-rows-1">
        <div className="relative mt-[65px] mb-[53px] aspect-[752/572] w-full lg:mt-0 lg:h-full lg:w-auto lg:justify-self-end">
          <Image
            src="/clipboard-landing-page/images/image-computer.png"
            alt="Computer Illustration"
            className="object-contain"
            fill
          />
        </div>
        <div className="flex flex-col gap-[45px] lg:ml-[110px] lg:mt-[65px] lg:max-w-[340px] lg:gap-[53px] lg:self-start">
          <article>
            <h3 className="text-clipboard-neutral-200 text-center text-[24px] font-semibold tracking-[-.3px] lg:text-left lg:tracking-[-.4px]">Quick Search</h3>
            <p className="text-clipboard-neutral-100 mt-[7px] text-center leading-[26px] tracking-[.1px] lg:mt-[5px] lg:text-left lg:leading-[30px]">Easily search your snippets by content, category, web address, application, and more.</p>
          </article>
          <article>
            <h3 className="text-clipboard-neutral-200 text-center text-[24px] font-semibold tracking-[-.3px] lg:text-left lg:tracking-[-.4px]">iCloud Sync</h3>
            <p className="text-clipboard-neutral-100 mt-[7px] text-center leading-[26px] tracking-[.1px] lg:mt-[5px] lg:text-left lg:leading-[30px]">Instantly saves and syncs snippets across all your devices.</p>
          </article>
          <article>
            <h3 className="text-clipboard-neutral-200 text-center text-[24px] font-semibold tracking-[-.3px] lg:text-left lg:tracking-[-.4px]">Complete History</h3>
            <p className="text-clipboard-neutral-100 mt-[7px] text-center leading-[26px] tracking-[.1px] lg:mt-[5px] lg:text-left lg:leading-[30px]">Retrieve any snippets from the first moment you started using the app.</p>
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
      <h2 className="text-clipboard-neutral-200 px-[calc(32px-var(--section-padding))] text-center text-[28px] font-semibold leading-[35px] tracking-[-.5px] lg:text-[36px] lg:tracking-[-.6px]">Access Clipboard Anywhere</h2>
      <p className="text-clipboard-neutral-100 mt-[16px] px-[calc(32px-var(--section-padding))] text-center leading-[26px] tracking-[.1px] lg:mt-[25px] lg:max-w-[720px] lg:text-[18px] lg:leading-[30px]">Whether you’re on the go, or at your computer, you can access all your Clipboard snippets in a few simple clicks.</p>
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
    <section className="px-8 pt-[95px] pb-[25px] lg:flex lg:flex-col lg:items-center lg:pt-[76px]">
      <h2 className="text-clipboard-neutral-200 px-[calc(32px-var(--section-padding))] text-center text-[28px] font-semibold leading-[35px] tracking-[-.5px] lg:text-[36px] lg:tracking-[-.6px]">Supercharge your workflow</h2>
      <p className="text-clipboard-neutral-100 mt-[11px] px-[calc(32px-var(--section-padding))] text-center leading-[26px] tracking-[.1px] lg:mt-6 lg:max-w-[720px] lg:text-[18px] lg:leading-[30px]">We’ve got the tools to boost your productivity.</p>
      <div className="my-[90px] flex flex-col items-center gap-[52.5px] lg:mt-[72px] lg:grid lg:grid-cols-[repeat(3,348px)] lg:grid-rows-1 lg:items-start lg:gap-[32px]">
        <article className="flex flex-col items-center">
          <div className="flex h-10 items-center justify-center">
            <Image
              src="/clipboard-landing-page/images/icon-blacklist.svg"
              alt="Icon Blacklist"
              width={44}
              height={40}
            />
          </div>
          <h3 className="text-clipboard-neutral-200 mt-[37px] text-center text-[24px] font-semibold tracking-[-.3px]">Create blacklists</h3>
          <p className="text-clipboard-neutral-100 mt-[15px] text-center leading-[26px] tracking-[.1px] lg:mt-[13px] lg:leading-[30px]">Ensure sensitive information never makes its way to your clipboard by excluding certain sources.</p>
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
          <h3 className="text-clipboard-neutral-200 mt-[37px] text-center text-[24px] font-semibold tracking-[-.3px]">Plain text snippets</h3>
          <p className="text-clipboard-neutral-100 mt-[15px] text-center leading-[26px] tracking-[.1px] lg:mt-[13px] lg:leading-[30px]">Remove unwanted formatting from copied text for a consistent look.</p>
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
          <h3 className="text-clipboard-neutral-200 mt-[37px] text-center text-[24px] font-semibold tracking-[-.3px]">Sneak preview</h3>
          <p className="text-clipboard-neutral-100 mt-[15px] text-center leading-[26px] tracking-[.1px] lg:mt-[13px] lg:leading-[30px]">Quick preview of all snippets on your Clipboard for easy access.</p>
        </article>
      </div>
    </section>
  );
}

function Sponsors() {
  return (
    <div className="flex h-[471px] flex-col items-center justify-between py-4 lg:mt-[27px] lg:h-auto lg:flex-row lg:px-[165px]">
      <div className="relative aspect-[165/49] h-[41px] lg:h-[49px]">
        <Image
          src="/clipboard-landing-page/images/logo-google.png"
          fill
          className="object-contain"
          alt="Google Logo"
        />
      </div>
      <div className="relative aspect-[139/51] h-[42.5px] lg:h-[51px]">
        <Image
          src="/clipboard-landing-page/images/logo-ibm.png"
          fill
          className="object-contain"
          alt="IBM Logo"
        />
      </div>
      <div className="relative aspect-[161/35] h-[30px] lg:h-[35px]">
        <Image
          src="/clipboard-landing-page/images/logo-microsoft.png"
          fill
          className="object-contain"
          alt="Microsoft Logo"
        />
      </div>
      <div className="relative aspect-[135/56] h-[47px] lg:h-[56px]">
        <Image
          src="/clipboard-landing-page/images/logo-hp.png"
          fill
          className="object-contain"
          alt="HP Logo"
        />
      </div>
      <div className="relative aspect-[125/30] h-[25px] lg:h-[30px]">
        <Image
          src="/clipboard-landing-page/images/logo-vector-graphics.png"
          fill
          className="object-contain"
          alt="Vector Graphics Logo"
        />
      </div>
    </div>
  );
}

function Available() {
  return (
    <section className="px-[32px] py-[154px] lg:flex lg:flex-col lg:items-center lg:pt-[147px] lg:pb-[134px]">
      <h2 className="text-clipboard-neutral-200 text-center text-[28px] font-semibold leading-[35px] tracking-[-.5px] lg:text-[36px]">Clipboard for iOS and Mac OS</h2>
      <p className="text-clipboard-neutral-100 mt-[16px] text-center leading-[26px] tracking-[.1px] lg:mt-[25px] lg:max-w-[720px] lg:text-[18px] lg:leading-[30px]">Available for free on the App Store. Download for Mac or iOS, sync with iCloud and you’re ready to start adding to your clipboard.</p>
      <CTA className="mt-[46px] lg:mt-[47px]" />
    </section>
  );
}

function Main() {
  return (
    <div className="w-full max-w-screen-sm lg:max-w-none">
      <HeroSection />
      <SnippetSection />
      <AccessAnywhereSection />
      <SuperchargeWorkflow />
      <Sponsors />
      <Available />
    </div>
  );
}

function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-10 lg:gap-6 ${className}`}>
      <svg
        className="w-6"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"
          fill="#4C545C"
          fillRule="nonzero"
        />
      </svg>
      <svg
        className="w-6"
        viewBox="0 0 24 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 2.557a9.83 9.83 0 01-2.828.775A4.932 4.932 0 0023.337.608a9.864 9.864 0 01-3.127 1.195A4.916 4.916 0 0016.616.248c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.671 1.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 17.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 2.557z"
          fill="#4C545C"
          fill-rule="nonzero"
        />
      </svg>
      <svg
        className="w-6"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
          fill="#4C545C"
          fill-rule="nonzero"
        />
      </svg>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-clipboard-neutral-100/10 relative mt-[16px] h-[500.18px] w-full max-w-screen-sm py-[52px] lg:h-auto lg:max-w-none lg:px-[165px] lg:pt-[44px] lg:pb-[25px]">
      <div className="flex flex-col items-center lg:flex-row lg:items-start">
        <Image
          src="/clipboard-landing-page/images/logo.svg"
          width={55}
          height={55}
          alt="Clipboard Company Logo"
        />
        <nav className="text-clipboard-neutral-200 mt-[42px] text-center text-[18px] lg:ml-[min(calc(30px+(100vw-1024px)*(105/416)),135px)] lg:mt-0 lg:pt-[1px]">
          <ul className="flex flex-col items-center gap-[23px] lg:h-[80px] lg:flex-wrap lg:items-start lg:gap-6 lg:gap-x-[min(calc(70/1440*100vw),70px)] lg:leading-none lg:[&>li]:w-[120px] lg:[&>li]:text-left">
            <li>
              <a href="">FAQs</a>
            </li>
            <li>
              <a href="">Contact Us</a>
            </li>
            <li>
              <a href="">Privacy Policy</a>
            </li>
            <li>
              <a href="">Press Kit</a>
            </li>
            <li>
              <a href="">Install Guide</a>
            </li>
          </ul>
        </nav>
        <SocialIcons className="mt-[49px] lg:ml-auto lg:mt-0 lg:self-center lg:pb-[18px]" />
      </div>
      <p className="absolute bottom-3 left-0 w-full text-center text-[11px] lg:bottom-8 lg:px-[165px] lg:text-right [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
