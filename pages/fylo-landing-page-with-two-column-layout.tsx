import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import Image from "next/image";
import { type ComponentProps, type CSSProperties, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "../utils/cn";
import { manrope } from "../utils/fonts/manrope";
import { openSans } from "../utils/fonts/openSans";
import { raleway } from "../utils/fonts/raleway";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const userInput = z.object({
  email: z.string().email({ message: "Please check your email" }),
});

type UserInput = z.infer<typeof userInput>;

export default function FyloLandingPageWithTwoColumnLayout() {
  return (
    <>
      <Head>
        <title>
          Frontend Mentor | Fylo landing page with two column layout
        </title>
      </Head>
      <div
        className={`App relative min-h-[100svh] bg-white font-open-sans ${openSans.variable} ${raleway.variable} ${manrope}`}
      >
        <Header />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/fylo-landing-page-with-two-column-layout/design"
          // absolutePath="/fylo-landing-page-with-two-column-layout/design/active-states.jpg"
        /> */}
      </div>
    </>
  );
}

function FyloLogo({
  className,
  variant,
}: ComponentProps<"svg"> & {
  variant: "header" | "footer";
}) {
  return (
    <svg
      viewBox="0 0 166 49"
      className={cn([
        className,
        variant === "header"
          ? "fill-[#BDBAFA] text-black"
          : "fill-white text-white",
      ])}
    >
      <title>Logo</title>
      <use href="/fylo-landing-page-with-two-column-layout/images/logo.svg#logo" />
    </svg>
  );
}

function Header() {
  return (
    <header className="flex h-[72px] items-center justify-between px-20 max-lg:px-[max(calc(50vw-320px),24px)] lg:h-[179px]">
      <FyloLogo className="w-20 lg:w-[166px]" variant="header" />
      <nav>
        <ul className="flex items-center gap-[25px] font-raleway text-[12px] leading-none text-fylo-landing-primary-blue-200 lg:gap-[58px] lg:text-[16px]">
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

function GetStartedForm({ variant = "hero" }: { variant?: "hero" | "early" }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<UserInput>({ resolver: zodResolver(userInput) });

  const onSubmit = handleSubmit((_data) => {
    // console.log(data);
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const formStyle = {
    hero: {
      form: "mt-[31.75px] lg:mt-[25px] lg:grid-rows-[45px] pl-[14px] pr-[9px] w-full lg:px-0 lg:grid-cols-[320px,200px] lg:gap-x-[18px]",
      input: "text-[12px] px-5 py-[1px] lg:text-[15px] lg:pt-[6px] bg-white",
      button: "-translate-x-[2px] text-[14px]",
      placeholder: "Enter your email...",
      btnText: "Get Started",
      error:
        "lg:absolute lg:top-[49px] lg:tracking-[-0.1px] text-[11px] lg:text-[13px] text-[hsl(343,40%,65%)] max-lg:-mt-1",
    },
    early: {
      form: "mt-[23px] grid-rows-[34px,32px] gap-y-[7px] w-[245px] pr-[3px] lg:gap-[15px] lg:pb-[10px] lg:w-full",
      input:
        "px-2 py-[1px] lg:w-[calc(481/517*100%)] lg:max-w-[480px] lg:px-5 lg:text-[12px] text-fylo-landing-primary-blue-200 text-[12px] bg-white",
      button:
        "text-[10px] w-[calc(100%-2px)] place-self-center h-full lg:w-[200px] lg:place-self-start lg:text-[14px]",
      placeholder: "email@example.com",
      btnText: "Get Started For Free",
      error: "lg:text-[13px] text-[11px] -mt-1 lg:-mt-[13px] lg:-mb-[2px]",
    },
  };

  return (
    <form
      noValidate
      className={cn([
        "grid grid-cols-1 font-raleway",
        !!errors.email && "relative",
        formStyle[variant].form,
        variant === "early" &&
          (errors.email !== undefined
            ? "grid-rows-[40px,12px,40px] lg:mt-[43px] lg:grid-rows-[47px,auto,48px]"
            : "lg:grid-rows-[50px,48px]"),
        variant === "hero" &&
          (errors.email !== undefined
            ? "grid-rows-[40px,auto,40px] gap-y-2"
            : "grid-rows-[repeat(2,40px)] gap-y-4"),
      ])}
      onSubmit={onSubmit}
    >
      <input
        {...register("email")}
        type="email"
        placeholder={formStyle[variant].placeholder}
        className={cn([
          "w-full rounded-sm border placeholder:opacity-50",
          formStyle[variant].input,
          errors.email !== undefined
            ? "border-[hsl(339,28%,73%)] focus-visible:outline focus-visible:outline-transparent"
            : "border-fylo-landing-primary-blue-100",
        ])}
      />
      {errors.email ? (
        <p className={`${formStyle[variant].error} font-open-sans`}>
          {errors.email.message}
        </p>
      ) : null}
      <button
        className={cn([
          "rounded-sm bg-fylo-landing-accent-blue font-bold text-fylo-landing-neutral-100 shadow-md shadow-fylo-landing-primary-blue-200/10 hover:bg-[hsl(221,100%,71%)]",
          formStyle[variant].button,
        ])}
        type="submit"
      >
        {formStyle[variant].btnText}
      </button>
    </form>
  );
}

function Hero() {
  return (
    <div className="flex flex-col items-center px-6 pt-[74px] max-lg:mx-auto max-lg:max-w-screen-sm lg:grid lg:grid-cols-[auto,640px] lg:grid-rows-1 lg:px-[80px] lg:pt-[21px]">
      <div className="relative ml-[1px] aspect-[1132.93/839.14] w-[calc(100%-23px)] lg:col-start-2 lg:row-start-1 lg:w-full lg:place-self-end">
        <Image
          src="/fylo-landing-page-with-two-column-layout/images/illustration-1.svg"
          alt="Hero Image Illustration"
          className="object-contain"
          fill
        />
      </div>
      <div className="lg:col-start-1 lg:row-start-1 lg:self-start lg:pt-[76px]">
        <h1 className="mt-[39px] text-center font-open-sans text-[24px] font-bold leading-[36px] text-fylo-landing-primary-blue-200 lg:mt-0 lg:text-left lg:font-raleway lg:text-[40px] lg:leading-[60px]">
          All your files in one secure location, accessible anywhere.
        </h1>
        <p className="mt-[25px] pl-3 pr-5 text-center text-[14px] text-fylo-landing-primary-blue-200 lg:mt-[16px] lg:px-0 lg:pr-10 lg:text-left lg:text-[18px] lg:leading-[24px]">
          Fylo stores your most important files in one secure location. Access
          them wherever you need, share and collaborate with friends, family,
          and co-workers.
        </p>
        <GetStartedForm />
      </div>
    </div>
  );
}

function ProductiveSection() {
  return (
    <div className="mt-[90px] lg:mt-[164px]">
      <div className="relative aspect-[375/52] w-full lg:aspect-[1440/114]">
        <Image
          src="/fylo-landing-page-with-two-column-layout/images/bg-curve-mobile.svg"
          alt="Curve Bg"
          fill
          className="block object-contain lg:hidden"
          aria-hidden="true"
        />
        <Image
          src="/fylo-landing-page-with-two-column-layout/images/bg-curve-desktop.svg"
          alt="Curve Bg"
          fill
          className="hidden object-contain lg:block"
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col items-center bg-fylo-landing-neutral-100 px-7 pb-[81.5px] lg:grid lg:grid-cols-[auto,540px] lg:grid-rows-1 lg:items-start lg:px-20 lg:pb-[106px] lg:pt-[57px]">
        <div className="relative my-[41px] aspect-[1077.87/813.02] w-full max-lg:max-w-screen-sm lg:col-start-2 lg:my-8 lg:w-full lg:place-self-end lg:self-start">
          <Image
            src="/fylo-landing-page-with-two-column-layout/images/illustration-2.svg"
            alt="Productive Illustration"
            className="object-contain"
            fill
          />
        </div>
        <div className="max-lg:flex max-lg:flex-col max-lg:items-center lg:col-start-1 lg:row-start-1">
          <h2 className="mt-[47px] font-raleway font-bold text-fylo-landing-primary-blue-200 lg:mt-0 lg:text-[40px] lg:tracking-[.1px]">
            Stay productive, wherever you are
          </h2>
          <p className="-ml-2 mt-6 text-[14px] text-fylo-landing-primary-blue-200 max-lg:max-w-screen-sm lg:ml-0 lg:mt-[31px] lg:max-w-[540px] lg:text-[16px] lg:leading-[24px]">
            Never let location be an issue when accessing your files. Fylo has
            you covered for all of your file storage needs.
          </p>
          <p className="-ml-2 mt-4 text-[14px] text-fylo-landing-primary-blue-200 max-lg:max-w-screen-sm lg:ml-0 lg:max-w-[540px] lg:text-[16px] lg:leading-[24px]">
            Securely share files and folders with friends, family and colleagues
            for live collaboration. No email attachments required!
          </p>
          <a
            href=""
            className="group mt-[30px] flex h-[28px] w-fit translate-x-[1px] items-center gap-[7px] border-b border-b-fylo-landing-accent-cyan text-fylo-landing-accent-cyan hover:border-b-[hsl(168,56%,66%)] hover:text-[hsl(168,56%,66%)] lg:mt-[12px] lg:h-[31px] lg:w-fit lg:translate-x-0 lg:gap-[6px]"
          >
            <span className="text-[13px] tracking-[-.5px] lg:text-[16px] lg:tracking-normal">
              See how Fylo works
            </span>
            <svg
              viewBox="0 0 16 16"
              className="w-4 text-[#3DA08F] group-hover:text-[hsl(168,56%,66%)] lg:mt-[4px]"
              aria-hidden="true"
            >
              <use href="/fylo-landing-page-with-two-column-layout/images/icon-arrow.svg#fylo-icon-arrow" />
            </svg>
          </a>
          <Testimony />
        </div>
      </div>
    </div>
  );
}

function Testimony() {
  return (
    <div className="mt-10 flex h-[170px] w-[280px] flex-col items-start rounded bg-white pl-[26px] pr-3 pt-[21px] text-[10px] tracking-[.4px] text-fylo-landing-primary-blue-200 shadow-md shadow-fylo-landing-primary-blue-100/10 lg:mt-[45px] lg:h-[216px] lg:w-[356px] lg:px-[33px] lg:pt-[25px]">
      <svg
        className="-ml-[1px] w-[16px] font-manrope lg:w-[20px]"
        viewBox="0 0 16 12"
        role="graphics-symbol"
        aria-hidden="true"
      >
        <use href="/fylo-landing-page-with-two-column-layout/images/icon-quotes.svg#fylo-icon-quotes" />
      </svg>
      <p className="mt-[6px] leading-[18px] lg:mt-[9px] lg:text-[13px] lg:leading-[23.15px] lg:tracking-[.5px]">
        Fylo has improved our team productivity by an order of magnitude. Since
        making the switch our team has become a well-oiled collaboration
        machine.
      </p>
      <div className="mt-[13px] flex h-6 items-center gap-2 leading-none lg:mt-[19px]">
        <div className="relative aspect-square w-6 overflow-hidden rounded-full lg:w-8">
          <Image
            src="/fylo-landing-page-with-two-column-layout/images/avatar-testimonial.jpg"
            fill
            alt="Kyle Burton Avatar"
          />
        </div>
        <div className="pt-[2px] lg:pt-0">
          <p className="text-[9px] font-bold lg:text-[11px]">Kyle Burton</p>
          <p className="mt-[5px] text-[6px] lg:text-[8px]">
            Founder & CEO, Huddle
          </p>
        </div>
      </div>
    </div>
  );
}

function EarlyAccessSection() {
  return (
    <div className="flex h-[345px] flex-col items-center bg-fylo-landing-primary-blue-100 px-[31px] pt-[52px] text-white lg:grid lg:h-[322px] lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-[240px] lg:px-20 lg:py-0">
      <div className="lg:pt-3">
        <h3 className="pr-[6px] text-center font-raleway text-[18px] font-bold lg:text-left lg:text-[32px]">
          Get early access today
        </h3>
        <p className="mt-[15px] pr-[23px] text-center text-[14px] text-fylo-landing-neutral-100/75 max-lg:max-w-screen-sm lg:mt-[16px] lg:px-0 lg:text-left lg:text-[17px] lg:leading-[24px]">
          It only takes a minute to sign up and our free starter tier is
          extremely generous. If you have any questions, our support team would
          be happy to help you.
        </p>
      </div>
      <GetStartedForm variant="early" />
    </div>
  );
}

function Main() {
  return (
    <main>
      <Hero />
      <ProductiveSection />
      <EarlyAccessSection />
    </main>
  );
}

function SocialIcon() {
  return (
    <div
      className="mt-[50px] flex gap-[11px] self-center lg:ml-[calc(186/1440*100vw)] lg:mt-[2px] lg:self-start"
      style={
        {
          "--icon-diameter-mobile": "27px",
          "--icon-diameter-desktop": "32px",
        } as CSSProperties
      }
    >
      <a
        href=""
        className="group flex h-[--icon-diameter-mobile] w-[--icon-diameter-mobile] items-center justify-center rounded-full border border-fylo-landing-neutral-200 p-[6px] hover:border-fylo-landing-accent-blue lg:h-[--icon-diameter-desktop] lg:w-[--icon-diameter-desktop] lg:p-2"
        aria-label="Fylo on Facebook"
      >
        <FontAwesomeIcon
          icon={faFacebookF}
          className="h-full w-full group-hover:text-fylo-landing-accent-blue"
        />
      </a>
      <a
        href=""
        className="group flex h-[--icon-diameter-mobile] w-[--icon-diameter-mobile] items-center justify-center rounded-full border border-fylo-landing-neutral-200 p-[6px] hover:border-fylo-landing-accent-blue lg:h-[--icon-diameter-desktop] lg:w-[--icon-diameter-desktop] lg:p-2"
        aria-label="Fylo on Twitter"
      >
        <FontAwesomeIcon
          icon={faTwitter}
          className="h-full w-full group-hover:text-fylo-landing-accent-blue"
        />
      </a>
      <a
        href=""
        className="group flex h-[--icon-diameter-mobile] w-[--icon-diameter-mobile] items-center justify-center rounded-full border border-fylo-landing-neutral-200 p-[6px] hover:border-fylo-landing-accent-blue lg:h-[--icon-diameter-desktop] lg:w-[--icon-diameter-desktop] lg:p-2"
        aria-label="Fylo on Instagram"
      >
        <FontAwesomeIcon
          icon={faInstagram}
          className="h-full w-full group-hover:text-fylo-landing-accent-blue"
        />
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative flex h-[682.97px] flex-col bg-fylo-landing-primary-blue-200 pt-[65px] text-white max-lg:px-[max(calc(50vw-320px),39px)] lg:h-fit lg:px-20 lg:pb-[70.02px] lg:pt-[108px]">
      <FyloLogo
        className="w-[176px] lg:aspect-[166/49] lg:h-auto lg:w-[176px]"
        variant="footer"
      />
      <div className="flex flex-col text-fylo-landing-neutral-100 lg:mt-[23px] lg:flex-row lg:justify-start [&_li:hover]:text-fylo-landing-neutral-200/70">
        <div className="mt-[39px] flex flex-col gap-4 px-[2px] lg:mt-0">
          <p className="flex gap-[18px]">
            <svg
              className="mx-[1px] w-[18px]"
              viewBox="0 0 18 18"
              aria-label="Phone"
              role="graphics-symbol"
              aria-hidden="true"
            >
              <title>Phone</title>
              <use href="/fylo-landing-page-with-two-column-layout/images/icon-phone.svg#icon-phone" />
            </svg>
            <span>Phone: +1-543-123-4567</span>
          </p>
          <p className="flex gap-[18px] text-fylo-landing-neutral-200">
            <svg
              viewBox="0 0 20 16"
              className="w-5"
              aria-label="Email"
              role="graphics-symbol"
              aria-hidden="true"
            >
              <use href="/fylo-landing-page-with-two-column-layout/images/icon-email.svg#icon-email" />
            </svg>
            <span>example@fylo.com</span>
          </p>
        </div>
        <div className="mt-[55px] w-full lg:ml-[calc(220/1440*100vw)] lg:mt-0 lg:w-auto">
          <ul
            className="flex flex-col gap-[14px]"
            aria-label="External links 1"
          >
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
        </div>
        <div className="mt-[46px] w-full lg:ml-[calc(200/1440*100vw)] lg:mt-0 lg:w-auto">
          <ul
            className="flex flex-col gap-[14px]"
            aria-label="External links 2"
          >
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
        </div>
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
