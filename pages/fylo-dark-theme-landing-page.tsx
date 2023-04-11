import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { CSSProperties } from "react";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function FyloDarkThemeLandingPage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Fylo landing page with dark theme and features grid</title>
      </Head>
      <div className="App font-open-sans relative min-h-[100svh]">
        <IntroSection />
        <Main />
        <Footer />
        <Slider basePath="/fylo-dark-theme-landing-page/design" />
      </div>
    </>
  );
}

function FyloLogo({ className }: { className: string }) {
  return (
    <div className={`relative aspect-[176/52] ${className}`}>
      <Image
        src="/fylo-dark-theme-landing-page/images/logo.svg"
        fill
        alt="Fylo Logo"
        className="object-contain"
      />
    </div>
  );
}

function IntroSection() {
  return (
    <div
      className="h-[820px] bg-[url('/fylo-dark-theme-landing-page/images/bg-curvy-mobile.svg'),linear-gradient(180deg,theme(colors.fylo-dark.primary.intro),theme(colors.fylo-dark.primary.intro)_var(--bg-color-stop),theme(colors.fylo-dark.primary.main)_var(--bg-color-stop),theme(colors.fylo-dark.primary.main))] bg-[position:top_280px_center,center_center] bg-no-repeat"
      style={
        {
          "--bg-color-stop": "420px",
        } as CSSProperties
      }
    >
      <Header />
      <Hero />
    </div>
  );
}

function Hero() {
  return (
    <div className="flex flex-col items-center px-6 pt-[24px] max-lg:mx-auto max-lg:max-w-screen-sm lg:grid lg:grid-cols-[auto,640px] lg:grid-rows-1 lg:px-[80px] lg:pt-[21px]">
      <div className="relative ml-[1px] aspect-[720/534] w-[calc(100%-23px)] lg:col-start-2 lg:row-start-1 lg:w-full lg:place-self-end">
        <Image
          src="/fylo-dark-theme-landing-page/images/illustration-intro.png"
          alt="Hero Image Illustration"
          className="object-contain"
          fill
        />
      </div>
      <div className="lg:col-start-1 lg:row-start-1 lg:self-start lg:pt-[76px]">
        <h1 className="font-raleway text-fylo-dark-neutral mt-[32px] text-center text-[24px] font-bold leading-[36px] lg:mt-0 lg:text-left lg:text-[40px] lg:leading-[60px]">All your files in one secure location, accessible anywhere.</h1>
        <p className="text-fylo-dark-neutral/75 mt-[15.5px] pl-4 pr-4 text-center text-[14px] lg:mt-[16px] lg:px-0 lg:pr-10 lg:text-left lg:text-[18px] lg:leading-[24px]">Fylo stores all your most important files in one secure location. Access them wherever you need, share and collaborate with friends family, and co-workers.</p>
        <a
          href=""
          className="from-fylo-dark-accent-cyan to-fylo-dark-accent-blue text-fylo-dark-neutral font-raleway mx-auto mt-8 flex h-[48px] w-[240px] flex-col items-center justify-center rounded-full bg-gradient-to-br text-[14px] font-bold"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="flex h-[72px] items-center justify-between px-20 max-lg:px-[max(calc(50vw-320px),24px)] lg:h-[179px]">
      <FyloLogo className="-ml-1 w-20 lg:w-[166px]" />
      <nav>
        <ul className="text-fylo-dark-neutral font-raleway flex items-center gap-[25px] text-[12px] leading-none lg:gap-[58px] lg:text-[16px]">
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

function Main() {
  return (
    <>
      {/* {`
         Access your files, anywhere
       
         The ability to use a smartphone, tablet, or computer to access your account means your 
         files follow you everywhere.
       
         Security you can trust
       
         2-factor authentication and user-controlled encryption are just a couple of the security 
         features we allow to help secure your files.
       
         Real-time collaboration
       
         Securely share files and folders with friends, family and colleagues for live collaboration. 
         No email attachments required.
       
         Store any type of file
       
         Whether you're sharing holidays photos or work documents, Fylo has you covered allowing for all 
         file types to be securely stored and shared.
       
         Stay productive, wherever you are
       
         Never let location be an issue when accessing your files. Fylo has you covered for all of your file 
         storage needs.
       
         Securely share files and folders with friends, family and colleagues for live collaboration. No email 
         attachments required.
       
         See how Fylo works
       
         Fylo has improved our team productivity by an order of magnitude. Since making the switch our team has 
         become a well-oiled collaboration machine.
       
         Satish Patel
         Founder & CEO, Huddle
       
         Fylo has improved our team productivity by an order of magnitude. Since making the switch our team has 
         become a well-oiled collaboration machine.
       
         Bruce McKenzie
         Founder & CEO, Huddle
       
         Fylo has improved our team productivity by an order of magnitude. Since making the switch our team has 
         become a well-oiled collaboration machine.
       
         Iva Boyd
         Founder & CEO, Huddle
       
         Get early access today
       
         It only takes a minute to sign up and our free starter tier is extremely generous. If you have any 
         questions, our support team would be happy to help you.
       
         Get Started For Free
       
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
         dolore magna aliqua
       
         +1-543-123-4567
         example@fylo.com
       
         About Us
         Jobs
         Press
         Blog
       
         Contact Us
         Terms
         Privacy
      `} */}
    </>
  );
}

function Footer() {
  return (
    <footer className="text-fylo-dark-neutral absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
