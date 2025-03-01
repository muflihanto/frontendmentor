import Head from "next/head";
import type { CSSProperties, ComponentProps, ReactElement } from "react";
import { cn } from "../utils/cn";
import { openSans } from "../utils/fonts/openSans";
import { poppins } from "../utils/fonts/poppins";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const HuddleAlternate = () => {
  return (
    <>
      <Head>
        <title>
          Frontend Mentor | Huddle landing page with alternating feature blocks
        </title>
      </Head>
      <div
        className={`App relative font-open-sans ${openSans.variable} ${poppins.variable} bg-white`}
      >
        <Header />
        <main className="contents" aria-label="Huddle landing page">
          <Hero />
          <div className="flex flex-col gap-[40px] bg-white px-[20px] pb-[53px] pt-[59px] lg:px-[103px] lg:pb-[65px] lg:pt-[160px]">
            <Card
              className="pt-[23.5px] lg:pt-1"
              labelId="grow-together"
              reverse
            >
              <GrowIllustration className="w-[236px] lg:mr-[7px] lg:w-[406px] lg:pb-1" />
              <div className="lg:w-[480px]">
                <h2
                  className="mt-[56px] text-center font-poppins text-[20px] font-semibold text-huddle-alternate-neutral-300 lg:mt-0 lg:text-left lg:text-[28px]"
                  id="grow-together"
                >
                  Grow Together
                </h2>
                <p className="mt-[14px] px-[28px] text-center text-[14px] text-huddle-alternate-neutral-200 lg:mt-[12px] lg:px-0 lg:text-left lg:text-[18px]">
                  Generate meaningful discussions with your audience and build a
                  strong, loyal community. Think of the insightful conversations
                  you miss out on with a feedback form.
                </p>
              </div>
            </Card>
            <Card className="pt-[12px] lg:pt-1" labelId="flowing-conversations">
              <FlowIllustration className="w-[242px] lg:w-[417px] lg:pb-[3.75px]" />
              <div className="lg:w-[495px]">
                <h2
                  className="mt-[68px] text-center font-poppins text-[20px] font-semibold text-huddle-alternate-neutral-300 lg:mt-0 lg:text-left lg:text-[28px]"
                  id="flowing-conversations"
                >
                  Flowing Conversations
                </h2>
                <p className="mt-[14px] px-[40px] text-center text-[14px] text-huddle-alternate-neutral-200 lg:mt-[12px] lg:px-0 lg:text-left lg:text-[18px]">
                  You wouldn&lsquo;t paginate a conversation in real life, so
                  why do it online? Our threads have just-in-time loading for a
                  more natural flow.
                </p>
              </div>
            </Card>
            <Card className="pt-[26px] lg:pt-1" labelId="your-users" reverse>
              <UsersIllustration className="w-[245px] lg:w-[420px] lg:pb-[2px]" />
              <div className="lg:w-[480px]">
                <h2
                  className="mt-[61.5px] text-center font-poppins text-[20px] font-semibold text-huddle-alternate-neutral-300 lg:mt-0 lg:text-left lg:text-[28px]"
                  id="your-users"
                >
                  Your Users
                </h2>
                <p className="mt-[14px] px-[44px] text-center text-[14px] text-huddle-alternate-neutral-200 lg:mt-[12px] lg:px-0 lg:text-left lg:text-[18px]">
                  It takes no time at all to integrate Huddle with your
                  app&lsquo;s authentication solution. This means, once signed
                  in to your app, your users can start chatting immediately.
                </p>
              </div>
            </Card>
          </div>
          <div
            className="relative top-[67px] z-[2] mx-auto flex h-[176px] w-[calc(375px-24px)] flex-col items-center justify-center gap-[24px] rounded-[16px] bg-white pt-[3px] font-semibold shadow-[0px_0px_15px_5px_rgba(0,0,0,.05)] lg:top-[96px] lg:h-[280px] lg:w-[800px] lg:gap-[35.5px] lg:pt-[12.5px]"
            role="region"
            aria-labelledby="build-community"
          >
            <h2
              className="text-center font-poppins text-[18px] font-semibold text-huddle-alternate-neutral-300 lg:text-[32px] lg:tracking-[-0.2px]"
              id="build-community"
            >
              Ready To Build Your Community?
            </h2>
            <a
              href=""
              className="flex h-[40px] w-[200px] items-center justify-center rounded-full bg-huddle-alternate-primary text-[10.25px] text-huddle-alternate-neutral-100 shadow-[0px_5px_5px_rgba(0,0,0,.1)] hover:bg-huddle-curve-primary-pink-100 lg:h-[80px] lg:w-[400px] lg:shadow-[0px_10px_10px_rgba(0,0,0,.15)]"
            >
              <span className="text-center lg:text-[20.5px]">
                Get Started For Free
              </span>
            </a>
          </div>
        </main>
        <Footer />
        {/* <Slider
          basePath="/huddle-landing-page-with-alternating-feature-blocks/design/"
          absolutePath="/huddle-landing-page-with-alternating-feature-blocks/design/active-states.jpg"
        /> */}
      </div>
    </>
  );
};

export default HuddleAlternate;

function Header() {
  return (
    <header className="absolute left-0 top-0 flex w-full items-center justify-between px-[16px] py-6 lg:px-20 lg:py-[48px]">
      <Logo className="h-[17px] lg:h-[32px]" />
      <a
        href=""
        className="flex h-6 w-[96px] items-center justify-center rounded-full bg-white font-bold text-huddle-alternate-neutral-300 shadow-[0px_0px_10px_rgba(0,0,0,.15)] hover:text-opacity-50 hover:shadow-[0px_0px_10px_rgba(0,0,0,.1)] lg:h-[48px] lg:w-[200px]"
      >
        <span className="pb-[2px] text-[10px] leading-none tracking-[0.1px] lg:pb-[4px] lg:text-[14px]">
          Try it Free
        </span>
      </a>
    </header>
  );
}

function Hero() {
  return (
    <div
      className="flex h-[718px] flex-col items-center justify-center bg-[hsl(191,89%,96%)] bg-no-repeat px-[26px] pt-[96px] max-md:bg-[url('/huddle-landing-page-with-alternating-feature-blocks/images/bg-hero-mobile.svg')] lg:grid lg:h-[721px] lg:grid-cols-[minmax(0,auto),calc(693/1440*100vw)] lg:grid-rows-1 lg:bg-[url('/huddle-landing-page-with-alternating-feature-blocks/images/bg-hero-desktop.svg')] lg:pl-20 lg:pr-[84px] lg:pt-[107px]"
      role="region"
      aria-labelledby="hero-heading"
    >
      <div className="lg:mt-[5px] lg:pr-[68px]">
        <h1
          className="text-center font-poppins text-[24px] font-semibold leading-[36px] text-huddle-alternate-neutral-300 lg:text-left lg:text-[40px] lg:leading-normal lg:-tracking-[0.2px]"
          id="hero-heading"
        >
          Build The Community Your Fans Will Love
        </h1>
        <p className="mt-[21px] px-2 text-center font-open-sans text-[16px] text-huddle-curve-neutral-700 lg:mt-[28px] lg:p-0 lg:text-left lg:text-[18px]">
          Huddle re-imagines the way we build communities. You have a voice, but
          so does your audience. Create connections with your users as you
          engage in genuine discussion.{" "}
        </p>
        <a
          href=""
          className="mx-auto mt-[32px] flex h-10 w-[240px] items-center justify-center rounded-full bg-huddle-curve-primary-pink-200 pb-[3px] text-[12px] font-bold text-huddle-curve-neutral-100 hover:bg-huddle-curve-primary-pink-100 lg:mx-0 lg:mt-[32px] lg:h-[56px] lg:w-[280px] lg:text-[14px]"
        >
          Get Started For Free
        </a>
      </div>
      <HeroImage className="mt-[53px] lg:self-start" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="h-[851px] bg-huddle-alternate-neutral-300 px-4 pt-[138px] text-huddle-curve-neutral-100 lg:h-[560px] lg:pl-[120px] lg:pr-[82px] lg:pt-[191.5px]">
      <Logo className="h-[27px] lg:h-[39px]" white />
      <div className="grid grid-rows-[repeat(3,minmax(0,auto))] gap-y-[0px] lg:mt-[39px] lg:grid-cols-[repeat(4,minmax(0,auto))] lg:grid-rows-1 lg:gap-[78px]">
        <div className="max-md:row-start-1 lg:w-[370px]">
          <p className="mt-[24px] grid grid-flow-col-dense justify-items-start lg:mt-0">
            <svg
              className="mr-[5px] w-[13px] pt-[8px]"
              viewBox="0 0 13 18"
              role="graphics-symbol"
              aria-label="Location"
            >
              <use href="/huddle-landing-page-with-alternating-feature-blocks/images/icon-location.svg#icon-location" />
            </svg>
            <span className="ml-[21px] pr-[4px] text-[15px] leading-[24px] tracking-[0.6px] lg:text-[16px] lg:tracking-[0px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </span>
          </p>
          <p className="mt-[24px] flex items-center justify-start">
            <svg
              className="ml-[3px] w-[18px]"
              viewBox="0 0 18 18"
              role="graphics-symbol"
              aria-label="Phone"
            >
              <use href="/huddle-landing-page-with-alternating-feature-blocks/images/icon-phone.svg#icon-phone" />
            </svg>
            <span className="ml-[18px] text-[15px] leading-[24px] tracking-[0.6px] lg:text-[16px] lg:tracking-[0px]">
              +1-543-123-4567
            </span>
          </p>
          <p className="mt-[24px] flex items-center justify-start">
            <svg
              className="ml-[2px] w-5"
              viewBox="0 0 20 16"
              role="graphics-symbol"
              aria-label="Email"
            >
              <use href="/huddle-landing-page-with-alternating-feature-blocks/images/icon-email.svg#icon-email" />
            </svg>
            <span className="ml-[19px] text-[15px] leading-[24px] tracking-[0.6px] lg:text-[16px] lg:tracking-[0px]">
              example@huddle.com
            </span>
          </p>
        </div>
        <ul className="mt-[56px] flex flex-col gap-4 lg:col-span-2 lg:mt-0 lg:h-[120px] lg:flex-wrap [&_a:hover]:underline [&_a:hover]:underline-offset-2 [&_a]:text-[18px] lg:[&_li]:w-[208px]">
          <li>
            <a href="">About Us</a>
          </li>
          <li>
            <a href="">What We Do</a>
          </li>
          <li>
            <a href="">FAQ</a>
          </li>
          <li>
            <a href="">Career</a>
          </li>
          <li>
            <a href="">Blog</a>
          </li>
          <li>
            <a href="">Contact Us</a>
          </li>
        </ul>
        <div className="flex flex-col items-center gap-[25px] lg:h-[227px] lg:items-start lg:justify-between lg:place-self-end">
          <SocialIcons />
          <p className="font-poppins text-[11px] lg:text-[12px] lg:-tracking-[0.1px]">
            &copy; Copyright 2018 Huddle. All rights reserved.
          </p>
        </div>
      </div>
      <p className="absolute bottom-2 left-0 w-full text-center text-[11px] text-huddle-curve-neutral-100 lg:bottom-8 lg:px-[120px] lg:text-[13px] [&_a]:font-bold [&_a]:text-huddle-curve-primary-pink-100 [&_a]:underline [&_a]:decoration-wavy">
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

function SocialIcons() {
  return (
    <div className="mt-[52px] flex items-center justify-start gap-[12px] place-self-center lg:mt-0 lg:gap-[12px] lg:place-self-start [&_a:hover]:border-huddle-alternate-primary [&_a]:flex [&_a]:aspect-square [&_a]:h-[31px] [&_a]:w-[31px] [&_a]:items-center [&_a]:justify-center [&_a]:rounded-full [&_a]:border [&_svg]:h-[15px]">
      <a href="" className="group">
        <svg
          className="text-white group-hover:text-huddle-alternate-primary"
          role="graphics-symbol"
          aria-label="Facebook"
        >
          <use href="/huddle-landing-page-with-alternating-feature-blocks/images/icon-facebook.svg#icon-facebook" />
        </svg>
      </a>
      <a href="" className="group">
        <svg
          className="text-white group-hover:text-huddle-alternate-primary"
          viewBox="0 0 512 512"
          role="graphics-symbol"
          aria-label="Twitter"
        >
          <use href="/huddle-landing-page-with-alternating-feature-blocks/images/icon-twitter.svg#icon-twitter" />
        </svg>
      </a>
      <a href="" className="group">
        <svg
          className="text-white group-hover:text-huddle-alternate-primary"
          viewBox="0 0 448 512"
          role="graphics-symbol"
          aria-label="Instagram"
        >
          <use href="/huddle-landing-page-with-alternating-feature-blocks/images/icon-instagram.svg#icon-instagram" />
        </svg>
      </a>
    </div>
  );
}

function Logo({ className, white }: { className: string; white?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 39"
      style={
        {
          "--logo-icon": white ? "#FFFFFF" : "#FF52C1",
          "--logo-text": white ? "#FFFFFF" : "#00252E",
        } as CSSProperties
      }
      aria-labelledby={`logo-huddle${white ? "-white" : ""}-title`}
    >
      <title id={`logo-huddle${white ? "-white" : ""}-title`}>
        Huddle Logo
      </title>
      <use href="/huddle-landing-page-with-curved-sections/images/logo.svg#huddle-logo" />
    </svg>
  );
}

function HeroImage({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ScreenMockups className="w-full" />
    </div>
  );
}

function ScreenMockups({ className = "" }: ComponentProps<"svg">) {
  return (
    <svg
      className={className}
      viewBox="0 0 1035 739"
      aria-labelledby="screen-mockup-title"
    >
      <title id="screen-mockup-title">Screen Mockups</title>
      <use href="/huddle-landing-page-with-curved-sections/images/screen-mockups.svg#screen-mockups" />
    </svg>
  );
}

function Card({
  children,
  className,
  reverse,
  labelId,
}: {
  children: ReactElement | ReactElement[];
  className?: string;
  reverse?: boolean;
  labelId: string;
}) {
  return (
    <div
      className={cn([
        "flex h-[488px] w-full flex-col items-center justify-center rounded-[16px] bg-white shadow-[0px_0px_15px_5px_rgba(0,0,0,.05)] lg:h-[440px] lg:justify-between", //
        reverse
          ? "lg:flex-row-reverse lg:pl-[120px] lg:pr-[27px]"
          : "lg:flex-row lg:pl-[122px] lg:pr-[33px]",
        className,
      ])}
      aria-labelledby={labelId}
      role="region"
    >
      {children}
    </div>
  );
}

function GrowIllustration({ className }: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 1023.46 837.84"
      className={className}
      aria-labelledby="illustration-grow-together-title"
    >
      <title id="illustration-grow-together-title">
        Illustration Grow Together
      </title>
      <use href="/huddle-landing-page-with-curved-sections/images/illustration-grow-together.svg#illustration-grow-together" />
    </svg>
  );
}

function FlowIllustration({ className }: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 1125.12 800.94"
      className={className}
      aria-labelledby="illustration-flowing-conversations-title"
    >
      <title id="illustration-flowing-conversations-title">
        Illustration Flowing Conversations
      </title>
      <use href="/huddle-landing-page-with-curved-sections/images/illustration-flowing-conversation.svg#illustration-flowing-conversation" />
    </svg>
  );
}

function UsersIllustration({ className }: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 1077.87 813.02"
      className={className}
      aria-labelledby="illustration-your-users-title"
    >
      <title id="illustration-your-users-title">Illustration Your Users</title>
      <use href="/huddle-landing-page-with-curved-sections/images/illustration-your-users.svg#illustration-your-users" />
    </svg>
  );
}
