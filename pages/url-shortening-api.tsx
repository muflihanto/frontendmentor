import Head from "next/head";
import Image from "next/image";
import {
  type ComponentProps,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { cn } from "../utils/cn";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useWindowSize } from "usehooks-ts";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import copy from "copy-to-clipboard";
import { poppins } from "../utils/fonts/poppins";
import { ShortenApiResponse } from "./api/getShortenUrl";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

/**
 * TODOS:
 * Your users should be able to:
 * - View the optimal layout for the site depending on their device's screen size
 */

export default function UrlShorteningApi() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Shortly URL shortening API Challenge</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] bg-white font-poppins font-medium ${poppins.variable}`}
      >
        <Header />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/url-shortening-api/design"
          absolutePath="/url-shortening-api/design/mobile-active-states.jpg"
          // absolutePath="/url-shortening-api/design/desktop-active-states.jpg"
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
      aria-labelledby="shortly-logo-title"
    >
      <title id="shortly-logo-title">Shortly Logo</title>
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
  }, [width]);

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
        type="button"
        id="menubutton"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={open ? "menu" : undefined}
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 text-url-shortening-neutral-200"
            viewBox="0 0 20 21"
            aria-label="Close Menu"
            role="graphics-symbol"
          >
            <g fillRule="evenodd" fill="currentColor">
              <path d="M2.575.954l16.97 16.97-2.12 2.122L.455 3.076z" />
              <path d="M.454 17.925L17.424.955l2.122 2.12-16.97 16.97z" />
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 21"
            className="w-6 text-url-shortening-neutral-200"
            aria-label="Open Menu"
            role="graphics-symbol"
          >
            <g fill="currentColor" fillRule="evenodd">
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
        <div
          className={
            "flex h-[383px] w-[calc(100%-48px)] max-w-screen-sm flex-col items-center rounded-xl bg-url-shortening-primary-violet px-6 pt-[43px] text-[18px] font-bold text-white"
          }
        >
          <nav aria-label="Main menu">
            <NavigationLinks />
          </nav>
          <hr className="mb-5 mt-9 w-full border-t border-t-url-shortening-neutral-200/30" />
          <div className="grid w-full grid-cols-1 grid-rows-2 items-center gap-[15px]">
            <a href="" className="flex h-12 w-full items-center justify-center">
              Login
            </a>
            <a
              href=""
              className="flex h-12 w-full items-center justify-center rounded-full bg-url-shortening-primary-cyan text-center"
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
    <ul
      className="flex flex-col items-center gap-[39px] leading-none lg:contents"
      id="menu"
    >
      <li>
        <a href="">Features</a>
      </li>
      <li>
        <a href="">Pricing</a>
      </li>
      <li>
        <a href="">Resources</a>
      </li>
    </ul>
  );
}

function LargeNav() {
  return (
    <div className="mb-[6px] ml-[45px] flex h-full w-full items-center justify-between bg-transparent text-[15px] max-lg:hidden">
      <nav
        className="flex items-center gap-[30px] font-bold text-url-shortening-neutral-200 [&>a:hover]:text-url-shortening-neutral-400 [&>a:last-child]:ml-[2px]"
        aria-label="Main menu"
      >
        <NavigationLinks />
      </nav>
      <div className="flex items-center gap-[5px] text-[15px] font-bold">
        <div className="flex h-10 w-[105px] items-center justify-center text-url-shortening-neutral-200">
          <a href="" className="hover:text-url-shortening-neutral-400">
            Login
          </a>
        </div>
        <a
          href=""
          className="flex h-10 w-[105px] items-center justify-center rounded-full bg-url-shortening-primary-cyan pb-[2px] text-center text-white hover:bg-[hsl(179,56%,75%)]"
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
      <Logo className="flex-shrink-0 text-url-shortening-neutral-300 lg:ml-[2px]" />
      <MobileNav />
      <LargeNav />
    </header>
  );
}

function Intro() {
  return (
    <div className="lg:mt-[40px] lg:flex lg:w-screen lg:flex-row-reverse lg:justify-between lg:overflow-hidden lg:pl-[165px]">
      <div className="relative mx-auto mt-[15px] h-fit w-fit max-w-[100vw] overflow-hidden pl-6 lg:m-0 lg:w-[610px] lg:p-0">
        <div className="relative aspect-[733/482] h-[327.5px] lg:h-[482px] lg:w-[733px]">
          <Image
            fill
            alt="Illustration Working"
            src="/url-shortening-api/images/illustration-working.svg"
            className="left-0 h-[733px] w-[482px]"
          />
        </div>
      </div>
      <div className="mx-auto mt-9 flex max-w-md flex-col items-center px-6 lg:mx-0 lg:mt-0 lg:w-[560px] lg:max-w-none lg:flex-shrink-0 lg:items-start lg:justify-center lg:px-0 lg:pb-[1px]">
        <h1 className="text-center text-[42px] font-bold leading-[48px] tracking-[-1px] text-url-shortening-neutral-300 lg:text-start lg:text-[80px] lg:leading-[90px] lg:tracking-[-2.225px]">
          More than just shorter links
        </h1>
        <p className="mt-[13px] text-center text-[18px] leading-[30px] tracking-[.1px] text-url-shortening-neutral-200 lg:mt-0 lg:text-start lg:text-[22px] lg:leading-[35px]">
          Build your brand’s recognition and get detailed insights on how your
          links are performing.
        </p>
        <button
          className="mt-[30px] flex h-[56px] w-[198px] items-center justify-center rounded-full bg-url-shortening-primary-cyan text-center text-[20px] font-bold text-white hover:bg-[hsl(179,56%,75%)] lg:mt-[37px] lg:text-start"
          type="button"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

const FormInput = z.object({
  link: z.string().min(1, "Please add a link").url("Please add a link"),
});
type FormInput = z.infer<typeof FormInput>;

const linksAtom = atomWithStorage<ShortenApiResponse[]>("links", []);

function CopyLink({ data }: { data: ShortenApiResponse }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex h-[156px] w-full flex-col rounded-lg bg-white p-0 pt-[11px] lg:h-[72px] lg:flex-row lg:items-center lg:pl-8 lg:pr-6 lg:pt-0 lg:text-[20px]">
      <div className="h-[24px] w-full truncate text-ellipsis px-4 pt-[2px] text-url-shortening-neutral-300 lg:mt-[3px] lg:block lg:h-auto lg:w-auto lg:p-0">
        {data.url}
      </div>
      <hr className="my-[13px] w-full lg:hidden" />
      <a
        className="w-full text-ellipsis px-4 text-url-shortening-primary-cyan lg:ml-auto lg:mt-[3px] lg:w-auto lg:px-0"
        href={data.result_url}
      >
        {data.result_url}
      </a>
      <button
        onClick={() => {
          copy(data.result_url);
          setCopied(true);
        }}
        className={cn([
          "mx-4 mt-[13px] h-10 w-[calc(100%-32px)] rounded text-[15px] font-bold text-white lg:ml-6 lg:mr-0 lg:mt-0 lg:w-[104px]", //
          copied
            ? "bg-url-shortening-primary-violet hover:bg-[hsl(257,17%,50%)]"
            : "bg-url-shortening-primary-cyan hover:bg-[hsl(179,56%,75%)]",
        ])}
        type="button"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

function Shorten() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormInput>({ resolver: zodResolver(FormInput) });

  const [links, setLinks] = useAtom(linksAtom);

  const onSubmit = handleSubmit(async (data) => {
    const response = await fetch("/api/getShortenUrl", {
      method: "POST",
      body: JSON.stringify({ url: data.link }),
    });

    await response.json().then((dat) => {
      const parse = ShortenApiResponse.safeParse(dat);
      if (parse.success) {
        setLinks((p) => [...p, parse.data]);
      } else {
        console.log(parse.error);
      }
    });
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <form
        className={cn([
          "relative mx-auto w-[calc(100vw-48px)] max-w-md -translate-y-[80px] rounded-[10px] bg-url-shortening-primary-violet bg-[url('/url-shortening-api/images/bg-shorten-mobile.svg')] bg-right-top bg-no-repeat p-6 lg:flex lg:h-[168px] lg:max-w-[calc(100vw-330px)] lg:-translate-y-[84px] lg:items-center lg:gap-6 lg:bg-[url('/url-shortening-api/images/bg-shorten-desktop.svg')] lg:px-16 lg:pt-[25px]", //
          errors.link ? "h-[182px]" : "h-[160px]",
        ])}
        onSubmit={onSubmit}
      >
        <input
          type="text"
          className={cn([
            "h-12 w-full rounded-[5px] bg-white pt-[3px] text-url-shortening-neutral-400 lg:h-16 lg:w-full lg:rounded-[11px] lg:px-8 lg:text-[20px]", //
            errors.link
              ? "border-[3px] border-url-shortening-secondary-red px-[13px] text-url-shortening-secondary-red placeholder:text-url-shortening-secondary-red/50"
              : "px-4",
          ])}
          placeholder="Shorten a link here..."
          {...register("link")}
        />
        {errors.link && (
          <p className="text-[12px] italic text-url-shortening-secondary-red max-lg:mb-4 max-lg:mt-[4px] lg:absolute lg:bottom-[22px] lg:left-[64px] lg:text-base">
            {errors.link.message}
          </p>
        )}
        <button
          className="mt-4 flex h-12 w-full items-center justify-center rounded-[5px] bg-url-shortening-primary-cyan pb-px text-[18px] font-bold text-white hover:bg-[hsl(179,56%,75%)] lg:mt-0 lg:h-16 lg:w-[188px] lg:flex-shrink-0 lg:rounded-[11px] lg:text-[20px]"
          type="submit"
        >
          Shorten It!
        </button>
      </form>
      {links.length > 0 && (
        <div className="mt-6 flex w-full -translate-y-[80px] flex-col gap-[23px] px-6 max-lg:-mb-px lg:-translate-y-[84px] lg:gap-4 lg:px-[165px]">
          {links.map((lnk, index) => {
            return <CopyLink key={`${index}-${lnk.result_url}`} data={lnk} />;
          })}
        </div>
      )}
    </>
  );
}

type Feature = {
  icon: string;
  name: string;
  description: string;
};

function Feature({ feat }: { feat: Feature }) {
  return (
    <div className="relative h-[268px] w-[calc(100%-48px)] max-w-sm rounded bg-white px-[28px] pt-[77px] lg:px-[32px] lg:pt-[76px] [&:nth-child(2)]:h-[285px] lg:[&:nth-child(2)]:mt-[44px] lg:[&:nth-child(2)]:h-[268px] lg:[&:nth-child(3)]:mt-[88px]">
      <div className="absolute -top-[44px] left-1/2 flex h-[88px] w-[88px] -translate-x-1/2 items-center justify-center rounded-full bg-url-shortening-primary-violet lg:left-[32px] lg:translate-x-0">
        <div
          className={cn([
            "relative aspect-square w-auto", //
            feat.name === "Fully Customizable" ? "h-12" : "h-10",
          ])}
        >
          <Image
            src={feat.icon}
            alt={`${feat.name} icon`}
            fill
            className="object-contain"
          />
        </div>
      </div>
      <h3 className="text-center text-[22px] font-bold text-url-shortening-primary-violet lg:text-left">
        {feat.name}
      </h3>
      <p className="mt-[14px] text-center leading-[26px] tracking-[-.5px] text-url-shortening-neutral-200 lg:text-left">
        {feat.description}
      </p>
    </div>
  );
}

function Features() {
  const features: Feature[] = [
    {
      icon: "/url-shortening-api/images/icon-brand-recognition.svg",
      name: "Brand Recognition",
      description:
        "Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.",
    },
    {
      icon: "/url-shortening-api/images/icon-detailed-records.svg",
      name: "Detailed Records",
      description:
        "Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.",
    },
    {
      icon: "/url-shortening-api/images/icon-fully-customizable.svg",
      name: "Fully Customizable",
      description:
        "Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.",
    },
  ];

  return (
    <div className="mt-[7px] pb-[79.25px] tracking-[-.2px] lg:mt-[34px] lg:px-[165px] lg:pb-[119px]">
      <div className="mx-auto max-w-sm px-6 lg:max-w-[520px] lg:px-0">
        <h2 className="text-center text-[27px] font-bold text-url-shortening-primary-violet lg:text-[40px] lg:tracking-[-1px]">
          Advanced Statistics
        </h2>
        <p className="mt-[18.5px] text-center leading-[28px] tracking-[.15px] text-url-shortening-neutral-200 lg:mt-[10px] lg:text-[18px] lg:leading-[32px]">
          Track how your links are performing across the web with our advanced
          statistics dashboard.
        </p>
      </div>
      <div className="relative mt-[90px] flex flex-col items-center gap-[91px] lg:mt-[98px] lg:flex-row lg:items-start lg:gap-[30px]">
        {features.map((feat) => {
          return <Feature feat={feat} key={feat.name} />;
        })}
        <div className="absolute left-1/2 top-0 -z-10 h-full w-2 -translate-x-1/2 bg-url-shortening-primary-cyan lg:left-0 lg:top-1/2 lg:h-2 lg:w-full lg:-translate-y-[calc(50%+22px)] lg:translate-x-0" />
      </div>
    </div>
  );
}

function BoostLinks() {
  return (
    <div className="flex h-[300px] w-full flex-col items-center justify-center bg-url-shortening-primary-violet bg-[url('/url-shortening-api/images/bg-boost-mobile.svg')] bg-right bg-no-repeat pt-[7px] lg:h-[250px] lg:bg-[url('/url-shortening-api/images/bg-boost-desktop.svg')] lg:pb-[10px]">
      <h3 className="text-[28px] font-bold tracking-[-.75px] text-white lg:text-[40px] lg:tracking-[-1px]">
        Boost your links today
      </h3>
      <button
        className="text-cente mt-[16px] flex h-[56px] w-[198px] items-center justify-center rounded-full bg-url-shortening-primary-cyan text-[20px] font-bold text-white hover:bg-[hsl(179,56%,75%)] lg:mt-[22px]"
        type="button"
      >
        Get Started
      </button>
    </div>
  );
}

function Main() {
  return (
    <main aria-label="Shortly URL shortening API">
      <Intro />
      <div className="mt-[167.25px] bg-url-shortening-neutral-100/20 lg:mt-[152px]">
        <Shorten />
        <Features />
        <BoostLinks />
      </div>
    </main>
  );
}

function FooterLink({
  children,
  ...props
}: PropsWithChildren<ComponentProps<"a">>) {
  return (
    <li>
      <a
        {...props}
        className="text-[15px] tracking-[-.3px] hover:text-url-shortening-primary-cyan"
      >
        {children}
      </a>
    </li>
  );
}
function FooterLinks({
  children,
  ...props
}: PropsWithChildren<ComponentProps<"ul">>) {
  return (
    <ul
      {...props}
      className={cn([
        "mt-[21px] flex flex-col items-center gap-[9px] text-url-shortening-neutral-100 sm:items-start", //
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
      <a href="" className="text-white hover:text-url-shortening-primary-cyan">
        <svg
          className="pointer-events-none w-6"
          viewBox="0 0 24 24"
          role="graphics-symbol"
          aria-label="Facebook"
        >
          <use href="/url-shortening-api/images/icon-facebook.svg#icon-facebook" />
        </svg>
      </a>
      <a href="" className="text-white hover:text-url-shortening-primary-cyan">
        <svg
          className="pointer-events-none w-6"
          viewBox="0 0 24 20"
          role="graphics-symbol"
          aria-label="Twitter"
        >
          <use href="/url-shortening-api/images/icon-twitter.svg#icon-twitter" />
        </svg>
      </a>
      <a href="" className="text-white hover:text-url-shortening-primary-cyan">
        <svg
          className="pointer-events-none w-6"
          viewBox="0 0 24 24"
          role="graphics-symbol"
          aria-label="Pinterest"
        >
          <use href="/url-shortening-api/images/icon-pinterest.svg#icon-pinterest" />
        </svg>
      </a>
      <a href="" className="text-white hover:text-url-shortening-primary-cyan">
        <svg
          className="pointer-events-none w-6"
          viewBox="0 0 24 24"
          role="graphics-symbol"
          aria-label="Instagram"
        >
          <use href="/url-shortening-api/images/icon-instagram.svg#icon-instagram" />
        </svg>
      </a>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="relative flex h-[776px] w-full flex-col items-center bg-url-shortening-neutral-400 pt-[54px] sm:h-auto sm:pb-[55px] lg:h-[310px] lg:flex-row lg:items-start lg:px-[165px] lg:pt-[71px]">
      <Logo className="text-white lg:-ml-[2px]" />
      <div className="mt-[48px] flex flex-col gap-[38.5px] sm:grid sm:grid-cols-3 sm:grid-rows-1 sm:gap-14 lg:ml-auto lg:mr-[72px] lg:mt-0 lg:gap-[79px]">
        <nav
          className="flex flex-col items-center sm:items-start"
          aria-labelledby="features-title"
        >
          <h4
            className="font-bold tracking-[-.2px] text-white"
            id="features-title"
          >
            Features
          </h4>
          <FooterLinks>
            <FooterLink href="">Link Shortening</FooterLink>
            <FooterLink href="">Branded Links</FooterLink>
            <FooterLink href="">Analytics</FooterLink>
          </FooterLinks>
        </nav>
        <nav
          className="flex flex-col items-center sm:items-start"
          aria-labelledby="resources-title"
        >
          <h4
            className="font-bold tracking-[-.2px] text-white"
            id="resources-title"
          >
            Resources
          </h4>
          <FooterLinks>
            <FooterLink href="">Blog</FooterLink>
            <FooterLink href="">Developers</FooterLink>
            <FooterLink href="">Support</FooterLink>
          </FooterLinks>
        </nav>
        <nav
          className="flex flex-col items-center sm:items-start"
          aria-labelledby="company-title"
        >
          <h4
            className="font-bold tracking-[-.2px] text-white"
            id="company-title"
          >
            Company
          </h4>
          <FooterLinks>
            <FooterLink href="">About</FooterLink>
            <FooterLink href="">Our Team</FooterLink>
            <FooterLink href="">Careers</FooterLink>
            <FooterLink href="">Contact</FooterLink>
          </FooterLinks>
        </nav>
      </div>
      <SNSLinks className="mt-[46px] lg:mt-[2px]" />
      <p className="absolute bottom-3 left-0 w-full text-center text-[11px] text-white lg:px-[165px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
