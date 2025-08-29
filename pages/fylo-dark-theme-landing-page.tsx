import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import Image from "next/image";
import type { ComponentProps, CSSProperties } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "../utils/cn";
import { openSans } from "../utils/fonts/openSans";
import { raleway } from "../utils/fonts/raleway";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function FyloDarkThemeLandingPage() {
  return (
    <>
      <Head>
        <title>
          Frontend Mentor | Fylo landing page with dark theme and features grid
        </title>
      </Head>
      <div
        className={`App relative min-h-[100svh] font-open-sans ${openSans.variable} ${raleway.variable}`}
      >
        <IntroSection />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/fylo-dark-theme-landing-page/design"
          // absolutePath="/fylo-dark-theme-landing-page/design/active-states.jpg"
        /> */}
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
    <header
      className="h-[700px] bg-[url('/fylo-dark-theme-landing-page/images/bg-curvy-mobile.svg'),linear-gradient(180deg,theme(colors.fylo-dark.primary.intro),theme(colors.fylo-dark.primary.intro)_var(--bg-color-stop),theme(colors.fylo-dark.primary.main)_var(--bg-color-stop),theme(colors.fylo-dark.primary.main))] bg-[position:top_280px_center,center_center] bg-no-repeat lg:h-[1266px] lg:bg-fylo-dark-primary-intro lg:bg-[url('/fylo-dark-theme-landing-page/images/bg-curvy-desktop.svg')] lg:bg-[length:100%_auto] lg:bg-[bottom_-30px_center]"
      style={
        {
          "--bg-color-stop": "420px",
        } as CSSProperties
      }
    >
      <Header />
      <Hero />
    </header>
  );
}

function Hero() {
  return (
    <div className="mx-auto flex flex-col items-center px-6 pt-[24px] max-lg:max-w-screen-sm lg:w-[720px] lg:px-0 lg:pt-[2px]">
      <div className="relative ml-[1px] aspect-[720/534] w-[calc(100%-23px)] sm:w-[calc(100%-64px)] sm:max-w-lg lg:w-[720px] lg:max-w-none">
        <Image
          src="/fylo-dark-theme-landing-page/images/illustration-intro.png"
          alt="Hero Image Illustration"
          className="object-contain"
          fill
        />
      </div>
      <div className="lg:col-start-1 lg:row-start-1 lg:self-start lg:pt-[35px]">
        <h1 className="mt-[32px] text-center font-raleway text-[24px] font-bold leading-[36px] text-fylo-dark-neutral lg:mt-0 lg:text-[40px] lg:leading-[60px]">
          All your files in one secure location, accessible anywhere.
        </h1>
        <p className="mt-[15.5px] pl-4 pr-4 text-center text-[14px] text-fylo-dark-neutral/75 lg:mt-[33px] lg:px-14 lg:text-[20px] lg:leading-[30px]">
          Fylo stores all your most important files in one secure location.
          Access them wherever you need, share and collaborate with friends
          family, and co-workers.
        </p>
        <a
          href=""
          className="mx-auto mt-8 flex h-[48px] w-[240px] flex-col items-center justify-center rounded-full bg-gradient-to-br from-fylo-dark-accent-cyan to-fylo-dark-accent-blue font-raleway text-[14px] font-bold text-fylo-dark-neutral hover:to-fylo-dark-accent-cyan lg:h-[56px] lg:w-[280px] lg:text-[16px]"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex h-[72px] items-center justify-between px-20 max-lg:px-[max(calc(50vw-320px),24px)] sm:h-[96px] md:h-[128px] lg:h-[198px]">
      <FyloLogo className="-ml-1 w-20 lg:ml-0 lg:w-[176px]" />
      <nav>
        <ul className="flex items-center gap-[25px] font-raleway text-[12px] leading-none text-fylo-dark-neutral lg:gap-[58px] lg:text-[16px]">
          <li className="opacity-75 hover:underline hover:opacity-100">
            <a href="">Features</a>
          </li>
          <li className="opacity-75 hover:underline hover:opacity-100">
            <a href="">Team</a>
          </li>
          <li className="opacity-75 hover:underline hover:opacity-100">
            <a href="">Sign In</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function Features() {
  return (
    <div className="grid grid-cols-1 grid-rows-[repeat(4,280px)] gap-y-0 pt-[26px] text-fylo-dark-neutral sm:mx-auto sm:max-w-lg md:mx-6 md:max-w-none md:grid-cols-2 md:grid-rows-2 md:gap-x-8 md:gap-y-8 md:pt-24 lg:mx-auto lg:w-[940px] lg:gap-x-[114px] lg:gap-y-20 lg:pt-0">
      <div className="flex flex-col items-center justify-center px-7 pb-[1px] lg:justify-start lg:px-8">
        <IconAccessAnywhere className="h-[60px] lg:h-[84px] lg:pt-[6px]" />
        <h2 className="mt-8 text-center font-raleway text-[17px] font-bold tracking-[.5px] lg:mt-[26px] lg:text-[19px]">
          Access your files, anywhere
        </h2>
        <p className="mt-[8px] text-center text-[14px] opacity-90 lg:mt-[6px] lg:pr-[4px]">
          The ability to use a smartphone, tablet, or computer to access your
          account means your files follow you everywhere.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center px-7 pb-2 lg:justify-start lg:px-0 lg:pr-[30px]">
        <IconSecurity className="lg:h-[88px]" />
        <h2 className="mt-7 text-center font-raleway text-[17px] font-bold tracking-[.5px] lg:mt-[21px] lg:text-[19px]">
          Security you can trust
        </h2>
        <p className="mt-[7px] text-center text-[14px] opacity-90 lg:mt-[6px]">
          2-factor authentication and user-controlled encryption are just a
          couple of the security features we allow to help secure your files.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center px-7 pb-[2px] lg:justify-start lg:px-4 lg:pl-[26px]">
        <IconCollaboration className="lg:mt-[7px] lg:h-[71px]" />
        <h2 className="mt-[35px] text-center font-raleway text-[17px] font-bold tracking-[.5px] lg:mt-[30px] lg:text-[19px]">
          Real-time collaboration
        </h2>
        <p className="mt-[7px] text-center text-[14px] opacity-90 lg:mt-[6px]">
          Securely share files and folders with friends, family and colleagues
          for live collaboration. No email attachments required.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center px-7 pb-[2px] lg:justify-start lg:px-5 lg:pr-[30px]">
        <IconAnyFile className="lg:mt-[10px] lg:h-[66px]" />
        <h2 className="mt-[38px] text-center font-raleway text-[17px] font-bold tracking-[.5px] lg:mt-[32px] lg:text-[19px]">
          Store any type of file
        </h2>
        <p className="mt-[7px] text-center text-[14px] opacity-90 lg:mt-[6px]">
          Whether you&apos;re sharing holidays photos or work documents, Fylo
          has you covered allowing for all file types to be securely stored and
          shared.
        </p>
      </div>
    </div>
  );
}

function Productive() {
  return (
    <div className="mt-[111px] px-7 text-fylo-dark-neutral lg:mt-[127px] lg:grid lg:grid-cols-[min(calc(50%),615px),auto] lg:grid-rows-1 lg:items-center lg:gap-[57px] lg:px-[105px]">
      <div className="relative mx-auto aspect-[615/465] w-[calc(100%-16px)] max-w-sm md:w-full md:max-w-lg lg:max-w-none">
        <Image
          src="/fylo-dark-theme-landing-page/images/illustration-stay-productive.png"
          alt="Productive Illustration"
          fill
          className="object-contain"
        />
      </div>
      <div className="w-full max-w-sm max-lg:mx-auto md:max-w-lg lg:max-w-none">
        <h2 className="mt-[46px] px-1 font-raleway text-[18px] font-bold tracking-[.075px] lg:w-96 lg:px-0 lg:text-[40px] lg:leading-[50px]">
          Stay productive, wherever you are
        </h2>
        <p className="mt-[15px] text-[14px] opacity-90 lg:mt-[19px] lg:text-[16px] lg:opacity-80">
          Never let location be an issue when accessing your files. Fylo has you
          covered for all of your file storage needs.
        </p>
        <p className="mt-4 text-[14px] opacity-90 lg:text-[16px] lg:opacity-80">
          Securely share files and folders with friends, family and colleagues
          for live collaboration. No email attachments required.
        </p>
        <a
          href=""
          className="group mt-3 flex w-fit gap-[6px] border-b border-b-fylo-dark-accent-cyan py-[4px] text-fylo-dark-accent-cyan hover:border-b-fylo-dark-neutral lg:mt-[20px] lg:py-[3px]"
        >
          <span className="text-[12px] group-hover:text-fylo-dark-neutral lg:text-[16px]">
            See how Fylo works
          </span>
          <svg
            className="w-4 text-[#62E0D9] group-hover:text-white"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <use href="/fylo-dark-theme-landing-page/images/icon-arrow.svg#icon-arrow" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// TODO: make responsive width from mobile -> desktop
function Testimonials() {
  return (
    <div className="relative mx-auto mt-[170px] pl-12 pr-[47px] max-lg:max-w-[480px] lg:mt-[178px] lg:w-fit lg:px-0 min-[1280px]:w-[1160px]">
      <div className="absolute -top-4 z-10 ml-[5px] aspect-[55/45] w-[22px] lg:-top-9 lg:-ml-2 lg:w-[55px]">
        <Image
          fill
          className="object-contain"
          src="/fylo-dark-theme-landing-page/images/bg-quotes.png"
          alt="Quote Background"
        />
      </div>
      <div className="relative z-20 flex w-full flex-col gap-6 lg:grid lg:h-[440px] lg:grid-cols-[400px,400px] lg:grid-rows-2 lg:gap-10 min-[1280px]:h-[200px] min-[1280px]:grid-cols-3 min-[1280px]:grid-rows-1 min-[1280px]:gap-10">
        <div className="h-40 w-full rounded bg-fylo-dark-primary-testimonial px-5 pt-6 text-[10px] text-fylo-dark-neutral/[.85] lg:h-full lg:px-[26px] lg:pt-[39px] lg:shadow-lg lg:shadow-fylo-dark-primary-testimonial/30">
          <p className="leading-[18px] lg:text-[15px] lg:leading-[21px]">
            Fylo has improved our team productivity by an order of magnitude.
            Since making the switch our team has become a well-oiled
            collaboration machine.
          </p>
          <div className="mt-[17px] flex items-center gap-2 text-[10px] leading-none lg:mt-6">
            <div className="relative aspect-square h-6 w-6 overflow-hidden rounded-full">
              <Image
                fill
                className="object-contain"
                src="/fylo-dark-theme-landing-page/images/profile-1.jpg"
                alt="Satish Patel Avatar"
              />
            </div>
            <p className="flex flex-col gap-[7px] pt-[1px]">
              <span className="text-[10px] font-bold tracking-[.5px]">
                Satish Patel
              </span>
              <span className="text-[7px] tracking-[.5px]">
                Founder & CEO, Huddle
              </span>
            </p>
          </div>
        </div>
        <div className="h-40 w-full rounded bg-fylo-dark-primary-testimonial px-5 pt-6 text-[10px] text-fylo-dark-neutral/[.85] lg:h-full lg:px-[26px] lg:pt-[39px] lg:shadow-lg lg:shadow-fylo-dark-primary-testimonial/30">
          <p className="leading-[18px] lg:text-[15px] lg:leading-[21px]">
            Fylo has improved our team productivity by an order of magnitude.
            Since making the switch our team has become a well-oiled
            collaboration machine.
          </p>
          <div className="mt-[17px] flex items-center gap-2 text-[10px] leading-none lg:mt-6">
            <div className="relative aspect-square h-6 w-6 overflow-hidden rounded-full">
              <Image
                fill
                className="object-contain"
                src="/fylo-dark-theme-landing-page/images/profile-2.jpg"
                alt="Bruce McKenzie Avatar"
              />
            </div>
            <p className="flex flex-col gap-[7px] pt-[1px]">
              <span className="text-[10px] font-bold tracking-[.5px]">
                Bruce McKenzie
              </span>
              <span className="text-[7px] tracking-[.5px]">
                Founder & CEO, Huddle
              </span>
            </p>
          </div>
        </div>
        <div className="h-40 w-full rounded bg-fylo-dark-primary-testimonial px-5 pt-6 text-[10px] text-fylo-dark-neutral/[.85] lg:col-span-2 lg:h-full lg:w-[400px] lg:place-self-center lg:px-[26px] lg:pt-[39px] lg:shadow-lg lg:shadow-fylo-dark-primary-testimonial/30 min-[1280px]:col-span-1">
          <p className="leading-[18px] lg:text-[15px] lg:leading-[21px]">
            Fylo has improved our team productivity by an order of magnitude.
            Since making the switch our team has become a well-oiled
            collaboration machine.
          </p>
          <div className="mt-[17px] flex items-center gap-2 text-[10px] leading-none lg:mt-6">
            <div className="relative aspect-square h-6 w-6 overflow-hidden rounded-full">
              <Image
                fill
                className="object-contain"
                src="/fylo-dark-theme-landing-page/images/profile-3.jpg"
                alt="Iva Boyd Avatar"
              />
            </div>
            <p className="flex flex-col gap-[7px] pt-[1px]">
              <span className="text-[10px] font-bold tracking-[.5px]">
                Iva Boyd
              </span>
              <span className="text-[7px] tracking-[.5px]">
                Founder & CEO, Huddle
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type InputSchema = z.infer<typeof inputSchema>;

function GetEarlyAccess() {
  const {
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    register,
    reset,
  } = useForm<InputSchema>({
    resolver: zodResolver(inputSchema),
  });

  const onSubmit = handleSubmit((_data) => {
    // console.log(data);
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="relative z-10 mx-auto -mt-[16.1px] flex h-[353px] w-[335px] translate-y-[176.1px] flex-col items-center rounded-md bg-[hsl(217,28%,15%)] pl-7 pr-[27px] pt-[38px] text-fylo-dark-neutral shadow-lg shadow-fylo-dark-primary-footer lg:h-[274px] lg:w-[862px] lg:translate-y-[218px] lg:pl-[77px] lg:pr-[76px] lg:pt-[40px]">
      <h2 className="text-center font-raleway text-[18px] font-bold lg:text-[32px]">
        Get early access today
      </h2>
      <p className="mt-[15px] text-center text-[14px] opacity-[.85] lg:mt-[17px] lg:px-6">
        It only takes a minute to sign up and our free starter tier is extremely
        generous. If you have any questions, our support team would be happy to
        help you.
      </p>
      <form
        noValidate
        className={`mt-8 grid w-full grid-cols-1 grid-rows-[repeat(2,48px)] lg:mt-[38px] lg:grid-cols-[480px,auto] lg:grid-rows-[48px] lg:gap-[29px] ${
          errors.email ? "relative gap-7" : "gap-6"
        }`}
        onSubmit={onSubmit}
      >
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="email@example.com"
          className="w-full rounded-full bg-fylo-dark-neutral px-7 pt-1 text-[10px] text-fylo-dark-primary-footer placeholder:opacity-60 lg:px-[38px] lg:pt-[2px] lg:text-[12px]"
        />
        {!!errors.email && (
          <p className="absolute left-[38px] top-[52px] text-[10px] font-bold text-fylo-dark-accent-red">
            {errors.email.message}
          </p>
        )}
        <button
          className="flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-fylo-dark-accent-cyan to-fylo-dark-accent-blue font-raleway text-[14px] font-bold text-fylo-dark-neutral hover:to-fylo-dark-accent-cyan lg:pb-[2px]"
          type="submit"
        >
          Get Started For Free
        </button>
      </form>
    </div>
  );
}

function Main() {
  return (
    <main
      className="[2790px] h-auto bg-fylo-dark-primary-main lg:pb-[102px]"
      aria-label="Fylo Landing Page"
    >
      <Features />
      <Productive />
      <Testimonials />
      <GetEarlyAccess />
    </main>
  );
}

function SocialIcon() {
  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: Social media links container requires aria-label for screen reader context
    <div
      className="mt-[79px] flex gap-[11px] self-center lg:ml-auto lg:mt-0 lg:self-start"
      style={
        {
          "--icon-diameter-mobile": "27px",
          "--icon-diameter-desktop": "32px",
        } as CSSProperties
      }
      aria-label="Social Media Links"
    >
      <a
        href=""
        className="group flex h-[--icon-diameter-mobile] w-[--icon-diameter-mobile] items-center justify-center rounded-full border border-fylo-landing-neutral-200 p-[6px] hover:border-fylo-dark-accent-cyan lg:h-[--icon-diameter-desktop] lg:w-[--icon-diameter-desktop] lg:p-2"
      >
        <FontAwesomeIcon
          icon={faFacebookF}
          aria-label="Facebook"
          role="graphics-symbol"
          aria-hidden="false"
          className="h-full w-full group-hover:text-fylo-dark-accent-cyan"
        />
      </a>
      <a
        href=""
        className="group flex h-[--icon-diameter-mobile] w-[--icon-diameter-mobile] items-center justify-center rounded-full border border-fylo-landing-neutral-200 p-[6px] hover:border-fylo-dark-accent-cyan lg:h-[--icon-diameter-desktop] lg:w-[--icon-diameter-desktop] lg:p-2"
      >
        <FontAwesomeIcon
          icon={faTwitter}
          aria-label="Twitter"
          role="graphics-symbol"
          aria-hidden="false"
          className="h-full w-full group-hover:text-fylo-dark-accent-cyan"
        />
      </a>
      <a
        href=""
        className="group flex h-[--icon-diameter-mobile] w-[--icon-diameter-mobile] items-center justify-center rounded-full border border-fylo-landing-neutral-200 p-[5.5px] hover:border-fylo-dark-accent-cyan lg:h-[--icon-diameter-desktop] lg:w-[--icon-diameter-desktop] lg:p-2"
      >
        <FontAwesomeIcon
          icon={faInstagram}
          aria-label="Instagram"
          role="graphics-symbol"
          aria-hidden="false"
          className="h-full w-full group-hover:text-fylo-dark-accent-cyan"
        />
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative h-[1029px] bg-fylo-dark-primary-footer px-[28px] pt-[249px] sm:px-10 md:px-20 lg:h-[514px] lg:pl-[120px] lg:pr-[82px] lg:pt-[200px]">
      <FyloLogo className="ml-[11px] h-[52px] lg:ml-0" />
      {/* Active states design
      <FyloLogo className="ml-[11px] h-[52px] lg:ml-0 lg:h-[32px]" /> */}
      <div className="mt-[40px] flex flex-col text-fylo-dark-neutral/80 lg:mt-[32px] lg:flex-row">
        <div className="flex w-full flex-col lg:h-[72px] lg:w-auto lg:flex-wrap">
          <p className="grid grid-cols-[20px,auto] grid-rows-1 gap-[20px] lg:mr-[min(calc(62/1440*100vw),62px)] lg:w-[min(calc(400/1440*100vw),400px)] lg:text-[16px]">
            <IconLocation />
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </span>
          </p>
          <p className="mt-4 grid grid-cols-[20px,auto] grid-rows-1 items-center gap-[19px] lg:mt-0 lg:gap-[24px]">
            <IconPhone />
            <span className="text-[14px] lg:pb-[2px]">+1-543-123-4567</span>
          </p>
          <p className="mt-[19px] grid grid-cols-[20px,auto] grid-rows-1 items-center gap-[19px] lg:mt-[17px] lg:gap-[24px]">
            <IconEmail />
            <span className="text-[14px]">example@fylo.com</span>
          </p>
        </div>
        <div className="mt-[82px] lg:-mt-[1px] lg:ml-[min(calc(314/1440*100vw),314px)]">
          <ul className="flex flex-col gap-[14px]">
            <li className="w-fit hover:font-bold hover:tracking-[-.6px] hover:text-fylo-dark-neutral">
              <a href="">About Us</a>
            </li>
            <li className="w-fit hover:font-bold hover:tracking-[-.6px] hover:text-fylo-dark-neutral">
              <a href="">Jobs</a>
            </li>
            <li className="w-fit hover:font-bold hover:tracking-[-.6px] hover:text-fylo-dark-neutral">
              <a href="">Press</a>
            </li>
            <li className="w-fit hover:font-bold hover:tracking-[-.6px] hover:text-fylo-dark-neutral">
              <a href="">Blog</a>
            </li>
          </ul>
        </div>
        <div className="mr-8 mt-[46px] lg:-mt-[1px] lg:ml-[min(calc(80/1440*100vw),80px)]">
          <ul className="flex flex-col gap-[14px]">
            <li className="w-fit hover:font-bold hover:tracking-[-.6px] hover:text-fylo-dark-neutral">
              <a href="">Contact Us</a>
            </li>
            <li className="w-fit hover:font-bold hover:tracking-[-.6px] hover:text-fylo-dark-neutral">
              <a href="">Terms</a>
            </li>
            <li className="w-fit hover:font-bold hover:tracking-[-.6px] hover:text-fylo-dark-neutral">
              <a href="">Privacy</a>
            </li>
          </ul>
        </div>
        <SocialIcon />
      </div>
      <p className="absolute bottom-3 left-0 w-full text-center text-[11px] text-fylo-dark-neutral [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

/* -------------------------------------------------------------------------- */
/*                                    Icons                                   */
/* -------------------------------------------------------------------------- */

function IconAccessAnywhere({ className }: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 83 78"
      className={cn(["w-[83px]", className])}
      role="graphics-symbol"
      aria-label="Access Anywhere"
    >
      <use href="/fylo-dark-theme-landing-page/images/icon-access-anywhere.svg#icon-access-anywhere" />
    </svg>
  );
}

function IconSecurity({ className }: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 70 88"
      className={cn(["w-[68px]", className])}
      role="graphics-symbol"
      aria-label="Security"
    >
      <use href="/fylo-dark-theme-landing-page/images/icon-security.svg#icon-security" />
    </svg>
  );
}

function IconCollaboration({ className }: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 86 71"
      className={cn(["h-[55px]", className])}
      role="graphics-symbol"
      aria-label="Collaboration"
    >
      <use href="/fylo-dark-theme-landing-page/images/icon-collaboration.svg#icon-collaboration" />
    </svg>
  );
}

function IconAnyFile({ className }: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 91 65"
      className={cn(["h-[51px]", className])}
      role="graphics-symbol"
      aria-label="Any File"
    >
      <use href="/fylo-dark-theme-landing-page/images/icon-any-file.svg#icon-any-file" />
    </svg>
  );
}

function IconLocation() {
  return (
    <svg
      viewBox="0 0 13 18"
      className="w-[13px] pt-2"
      role="graphics-symbol"
      aria-label="Location"
    >
      <use href="/fylo-dark-theme-landing-page/images/icon-location.svg#icon-location" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg
      viewBox="0 0 18 18"
      className="mb-[2px] ml-[3px] w-[13px] lg:ml-0 lg:mt-[3px] lg:w-[18px]"
      role="graphics-symbol"
      aria-label="Phone"
    >
      <use href="/fylo-dark-theme-landing-page/images/icon-phone.svg#icon-phone" />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg
      viewBox="0 0 20 16"
      className="ml-[2px] mt-[3px] w-5 lg:ml-0"
      role="graphics-symbol"
      aria-label="Email"
    >
      <use href="/fylo-dark-theme-landing-page/images/icon-email.svg#icon-email" />
    </svg>
  );
}
