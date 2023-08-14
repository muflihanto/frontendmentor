import Head from "next/head";
import Image from "next/image";
import { ComponentProps, PropsWithChildren, useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useWindowSize } from "usehooks-ts";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

/**
 * TODOS:
 * Build out this landing page, integrate with the [shrtcode API](https://app.shrtco.de/) and get it looking as close to the design as possible.
 * Your users should be able to:
 * - View the optimal layout for the site depending on their device's screen size
 * - Shorten any valid URL
 * - See a list of their shortened links, even after refreshing the browser
 * - Copy the shortened link to their clipboard in a single click
 * - Receive an error message when the `form` is submitted if:
 *    - The `input` field is empty
 */

export default function UrlShorteningApi() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Shortly URL shortening API Challenge</title>
      </Head>
      <div className="App font-poppins relative min-h-[100svh] font-medium">
        <Header />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/url-shortening-api/design"
          // absolutePath="/url-shortening-api/design/mobile-navigation.jpg"
        /> */}
      </div>
    </>
  );
}

function Logo(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 121 33"
      {...props}
      className={cn([
        "w-[121px]", //
        props.className,
      ])}
    >
      <use href="/url-shortening-api/images/logo.svg#shortly-logo" />
    </svg>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  useEffect(() => {
    if (width > 1023) {
      setOpen(false);
    }
  }, [width, setOpen]);

  return (
    <div className="lg:hidden">
      <button
        className={cn([
          "flex w-6 items-center justify-center", //
          "relative z-20",
        ])}
        onClick={() => {
          setOpen((o) => !o);
        }}
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-url-shortening-neutral-200 w-5"
            viewBox="0 0 20 21"
          >
            <g
              fillRule="evenodd"
              fill="currentColor"
            >
              <path d="M2.575.954l16.97 16.97-2.12 2.122L.455 3.076z" />
              <path d="M.454 17.925L17.424.955l2.122 2.12-16.97 16.97z" />
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 21"
            className="text-url-shortening-neutral-200 w-6"
          >
            <g
              fill="currentColor"
              fillRule="evenodd"
            >
              <path d="M0 0h24v3H0zM0 9h24v3H0zM0 18h24v3H0z" />
            </g>
          </svg>
        )}
      </button>

      <motion.div
        animate={{
          opacity: open ? 1 : 0,
          display: "flex",
          transitionEnd: {
            display: open ? "flex" : "none",
          },
        }}
        initial={{ display: "none", opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed left-0 top-0 z-10 flex h-screen w-full origin-top flex-col items-center bg-transparent pt-[96px]"
      >
        <div className={"bg-url-shortening-primary-violet flex h-[383px] w-[calc(100%-48px)] max-w-screen-sm flex-col items-center rounded-xl px-6 pt-[43px] text-[18px] font-bold text-white"}>
          <nav className="flex flex-col items-center gap-[39px] leading-none">
            <NavigationLinks />
          </nav>
          <hr className="border-t-url-shortening-neutral-200/30 mb-5 mt-9 w-full border-t" />
          <div className="grid w-full grid-cols-1 grid-rows-2 items-center gap-[15px]">
            <a
              href=""
              className="flex h-12 w-full items-center justify-center"
            >
              Login
            </a>
            <a
              href=""
              className="bg-url-shortening-primary-cyan flex h-12 w-full items-center justify-center rounded-full text-center"
            >
              Sign Up
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function NavigationLinks() {
  return (
    <>
      <a href="">Features</a>
      <a href="">Pricing</a>
      <a href="">Resources</a>
    </>
  );
}

function LargeNav() {
  return (
    <div className="mb-[6px] ml-[45px] flex h-full w-full items-center justify-between bg-transparent text-[15px] max-lg:hidden">
      <nav className="text-url-shortening-neutral-200 flex items-center gap-[30px] font-bold [&>a:last-child]:ml-[2px]">
        <NavigationLinks />
      </nav>
      <div className="flex items-center gap-[5px] text-[15px] font-bold">
        <a
          href=""
          className="text-url-shortening-neutral-200 flex h-10 w-[105px] items-center justify-center"
        >
          Login
        </a>
        <a
          href=""
          className="bg-url-shortening-primary-cyan flex h-10 w-[105px] items-center justify-center rounded-full pb-[2px] text-center text-white"
        >
          Sign Up
        </a>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="flex h-[96px] w-full items-center justify-between bg-transparent px-6 pt-4 sm:px-14 md:px-20 lg:h-[126px] lg:px-[165px]">
      <Logo className="text-url-shortening-neutral-300 flex-shrink-0 lg:ml-[2px]" />
      <MobileNav />
      <LargeNav />
    </header>
  );
}

function Intro() {
  return (
    <div>
      <div className="mf: relative mx-auto mt-[15px] h-fit w-fit max-w-[100vw] overflow-hidden pl-6">
        <div className="relative aspect-[733/482] h-[327.5px]">
          <Image
            fill
            alt="Illustration Working"
            src="/url-shortening-api/images/illustration-working.svg"
            className="left-0 h-[733px] w-[482px]"
          />
        </div>
      </div>
      <div className="mx-auto mt-9 flex max-w-md flex-col items-center px-6">
        <h1 className="text-url-shortening-neutral-300 text-center text-[42px] font-bold leading-[48px] tracking-[-1px]">More than just shorter links</h1>
        <p className="text-url-shortening-neutral-200 mt-[13px] text-center text-[18px] leading-[30px] tracking-[.1px]">Build your brand’s recognition and get detailed insights on how your links are performing.</p>
        <button className="text-cente bg-url-shortening-primary-cyan mt-[30px] flex h-[56px] w-[198px] items-center justify-center rounded-full text-[20px] font-bold text-white">Get Started</button>
      </div>
    </div>
  );
}

const FormInput = z.object({
  link: z.string().min(1, "Field required").url("Input not valid"),
});
type FormInput = z.infer<typeof FormInput>;

function Shorten() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormInput>({ resolver: zodResolver(FormInput) });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="bg-url-shortening-primary-violet mx-auto h-[160px] w-[calc(100vw-48px)] max-w-md -translate-y-[80px] rounded-[10px] bg-[url('/url-shortening-api/images/bg-shorten-mobile.svg')] bg-right-top bg-no-repeat p-6">
      <input
        type="text"
        className="h-12 w-full rounded-[5px] px-4 pt-[3px]"
        placeholder="Shorten a link here..."
        {...register("link")}
      />
      <button className="bg-url-shortening-primary-cyan mt-4 flex h-12 w-full items-center justify-center rounded-[5px] pb-px text-[18px] font-bold text-white">Shorten It!</button>
    </form>
  );
}

type Feature = {
  icon: string;
  name: string;
  description: string;
};

function Feature({ feat }: { feat: Feature }) {
  return (
    <div className="relative h-[268px] w-[calc(100%-48px)] max-w-sm rounded bg-white px-[28px] pt-[77px] [&:nth-child(2)]:h-[285px]">
      <div className="bg-url-shortening-primary-violet absolute -top-[44px] left-1/2 flex h-[88px] w-[88px] -translate-x-1/2 items-center justify-center rounded-full">
        <div
          className={cn([
            "relative aspect-square w-auto", //
            feat.name === "Fully Customizable" ? "h-12" : "h-10",
          ])}
        >
          <Image
            src={feat.icon}
            alt={feat.name + " icon"}
            fill
            className="object-contain"
          />
        </div>
      </div>
      <h3 className="text-url-shortening-primary-violet text-center text-[22px] font-bold">{feat.name}</h3>
      <p className="text-url-shortening-neutral-200 mt-[14px] text-center leading-[26px] tracking-[-.5px]">{feat.description}</p>
    </div>
  );
}

function Features() {
  const features: Feature[] = [
    {
      icon: "/url-shortening-api/images/icon-brand-recognition.svg",
      name: "Brand Recognition",
      description: "Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.",
    },
    {
      icon: "/url-shortening-api/images/icon-detailed-records.svg",
      name: "Detailed Records",
      description: "Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.",
    },
    {
      icon: "/url-shortening-api/images/icon-fully-customizable.svg",
      name: "Fully Customizable",
      description: "Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.",
    },
  ];

  return (
    <div className="mt-[7px] pb-[79.25px] tracking-[-.2px]">
      <div className="mx-auto max-w-sm px-6">
        <h2 className="text-url-shortening-primary-violet text-center text-[27px] font-bold">Advanced Statistics</h2>
        <p className="text-url-shortening-neutral-200 mt-[18.5px] text-center leading-[28px] tracking-[.15px]">Track how your links are performing across the web with our advanced statistics dashboard.</p>
      </div>
      <div className="relative mt-[90px] flex flex-col items-center gap-[91px]">
        {features.map((feat) => {
          return (
            <Feature
              feat={feat}
              key={feat.name}
            />
          );
        })}
        <div className="bg-url-shortening-primary-cyan absolute left-1/2 top-0 -z-10 h-full w-2 -translate-x-1/2"></div>
      </div>
    </div>
  );
}

function BoostLinks() {
  return (
    <div className="bg-url-shortening-primary-violet flex h-[300px] w-full flex-col items-center justify-center bg-[url('/url-shortening-api/images/bg-boost-mobile.svg')] bg-right bg-no-repeat pt-[7px]">
      <h3 className="text-[28px] font-bold tracking-[-.75px] text-white">Boost your links today</h3>
      <button className="text-cente bg-url-shortening-primary-cyan mt-[16px] flex h-[56px] w-[198px] items-center justify-center rounded-full text-[20px] font-bold text-white">Get Started</button>
    </div>
  );
}

function Main() {
  return (
    <div>
      <Intro />
      <div className="bg-url-shortening-neutral-100/20 mt-[167.25px]">
        <Shorten />
        <Features />
        <BoostLinks />
      </div>
      {/* {`
         Features
         Pricing
         Resources
       
         Login
         Sign Up
       
         More than just shorter links
       
         Build your brand’s recognition and get detailed insights 
         on how your links are performing.
       
         Get Started
         
         Shorten a link here...
       
         Shorten It!
       
         Advanced Statistics
       
         Track how your links are performing across the web with our 
         advanced statistics dashboard.
       
         Brand Recognition
       
         Boost your brand recognition with each click. Generic links don’t 
         mean a thing. Branded links help instil confidence in your content.
       
         Detailed Records
       
         Gain insights into who is clicking your links. Knowing when and where 
         people engage with your content helps inform better decisions.
       
         Fully Customizable
       
         Improve brand awareness and content discoverability through customizable 
         links, supercharging audience engagement.
       
         Boost your links today
       
         Get Started
       
         Features
       
         Link Shortening
         Branded Links
         Analytics
       
         Resources
       
         Blog
         Developers
         Support
       
         Company
       
         About
         Our Team
         Careers
         Contact
      `} */}
    </div>
  );
}

function FooterLink({ children, ...props }: PropsWithChildren<ComponentProps<"a">>) {
  return (
    <li>
      <a
        {...props}
        className="text-[15px] tracking-[-.3px]"
      >
        {children}
      </a>
    </li>
  );
}
function FooterLinks({ children, ...props }: PropsWithChildren<ComponentProps<"ul">>) {
  return (
    <ul
      {...props}
      className={cn([
        "text-url-shortening-neutral-100 mt-[21px] flex flex-col items-center gap-[9px] sm:items-start", //
        props.className,
      ])}
    >
      {children}
    </ul>
  );
}

function SNSLinks({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      {...props}
      className={cn([
        "flex items-center gap-6", //
        className,
      ])}
    >
      <a
        href=""
        className="hover:text-url-shortening-primary-cyan text-white"
      >
        <svg
          className="w-6"
          viewBox="0 0 24 24"
        >
          <use href="/url-shortening-api/images/icon-facebook.svg#icon-facebook" />
        </svg>
      </a>
      <a
        href=""
        className="hover:text-url-shortening-primary-cyan text-white"
      >
        <svg
          className="w-6"
          viewBox="0 0 24 20"
        >
          <use href="/url-shortening-api/images/icon-twitter.svg#icon-twitter" />
        </svg>
      </a>
      <a
        href=""
        className="hover:text-url-shortening-primary-cyan text-white"
      >
        <svg
          className="w-6"
          viewBox="0 0 24 24"
        >
          <use href="/url-shortening-api/images/icon-pinterest.svg#icon-pinterest" />
        </svg>
      </a>
      <a
        href=""
        className="hover:text-url-shortening-primary-cyan text-white"
      >
        <svg
          className="w-6"
          viewBox="0 0 24 24"
        >
          <use href="/url-shortening-api/images/icon-instagram.svg#icon-instagram" />
        </svg>
      </a>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-url-shortening-neutral-400 relative flex h-[776px] w-full flex-col items-center pt-[54px] sm:h-auto sm:pb-[55px]">
      <Logo className="text-white" />
      <div className="mt-[48px] flex flex-col gap-[38.5px] sm:grid sm:grid-cols-3 sm:grid-rows-1 sm:gap-14">
        <nav className="flex flex-col items-center sm:items-start">
          <h4 className="font-bold tracking-[-.2px] text-white">Features</h4>
          <FooterLinks>
            <FooterLink href="">Link Shortening</FooterLink>
            <FooterLink href="">Branded Links</FooterLink>
            <FooterLink href="">Analytics</FooterLink>
          </FooterLinks>
        </nav>
        <nav className="flex flex-col items-center sm:items-start">
          <h4 className="font-bold tracking-[-.2px] text-white">Resources</h4>
          <FooterLinks>
            <FooterLink href="">Blog</FooterLink>
            <FooterLink href="">Developers</FooterLink>
            <FooterLink href="">Support</FooterLink>
          </FooterLinks>
        </nav>
        <nav className="flex flex-col items-center sm:items-start">
          <h4 className="font-bold tracking-[-.2px] text-white">Company</h4>
          <FooterLinks>
            <FooterLink href="">About</FooterLink>
            <FooterLink href="">Our Team</FooterLink>
            <FooterLink href="">Careers</FooterLink>
            <FooterLink href="">Contact</FooterLink>
          </FooterLinks>
        </nav>
      </div>
      <SNSLinks className="mt-[46px]" />
      <p className="absolute bottom-3 w-full text-center text-[11px] text-white [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
