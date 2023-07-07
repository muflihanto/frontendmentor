import Head from "next/head";
import Image from "next/image";
import { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps, SVGProps, useEffect, useState } from "react";
import { cn } from "../utils/cn";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useWindowSize } from "usehooks-ts";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

// TODO: - View the optimal layout for the site depending on their device's screen size
// TODO: - See hover states for all interactive elements on the page
// TODO: - See all testimonials in a horizontal slider
// TODO: - Receive an error message when the newsletter sign up `form` is submitted if:
// TODO:   - The `input` field is empty
// TODO:   - The email address is not formatted correctly

export default function ManageLandingPage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Manage landing page</title>
      </Head>
      <div className={"App font-be-vietnam relative min-h-[100svh]"}>
        <Header />
        <Main />
        <Footer />
        {/* <Slider basePath="/manage-landing-page/design" /> */}
      </div>
    </>
  );
}

function Logo({ variant, className, ...props }: { variant: "header" | "footer" } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={cn(`${variant === "header" ? "text-[#242D52]" : "text-manage-neutral-100"}`, className)}
      viewBox="0 0 146 24"
      {...props}
    >
      <use href="/manage-landing-page/images/logo.svg#manage-logo" />
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
    <>
      <button
        className={cn("mb-2 flex w-[25px] items-center justify-center", "relative z-20")}
        onClick={() => {
          setOpen((o) => !o);
        }}
      >
        {open ? (
          <Image
            src={"/manage-landing-page/images/icon-close.svg"}
            alt="Close Button"
            height={22}
            width={21}
          />
        ) : (
          <Image
            src={"/manage-landing-page/images/icon-hamburger.svg"}
            alt="Hamburger Button"
            height={18}
            width={25}
          />
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
        className="fixed left-0 top-0 z-10 flex h-screen w-full origin-top flex-col items-center bg-gradient-to-b from-transparent to-black/60 pt-[103px]"
      >
        <div className={"text-manage-primary-blue flex h-[291px] w-[calc(100%-48px)] max-w-screen-sm flex-col items-center justify-center gap-[31px] rounded bg-white px-[32px] pt-[2px] font-bold [&>a]:leading-none [&>a]:tracking-[-.5px]"}>
          <NavigationLinks />
        </div>
      </motion.div>
    </>
  );
}

function NavigationLinks() {
  return (
    <>
      <a href="">Pricing</a>
      <a href="">Product</a>
      <a href="">About Us</a>
      <a href="">Careers</a>
      <a href="">Community</a>
    </>
  );
}

function Header() {
  return (
    <header className="absolute left-0 top-0 flex h-[105px] w-full items-center justify-between bg-transparent px-6 pt-[3px]">
      <Logo
        variant="header"
        className="h-[18px]"
      />
      <MobileNav />
    </header>
  );
}

function GetStarted({ variant, className, ...props }: { variant: "primary" | "secondary" } & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button
      className={cn(
        variant === "primary" && "bg-manage-primary-red text-manage-neutral-200 shadow-manage-primary-red/30 shadow-lg", // primary variant
        variant === "secondary" && "bg-manage-neutral-100 text-manage-primary-red", // secondary variant
        "flex h-[44px] w-[136px] items-center justify-center rounded-full pt-[1px] text-[12px] font-bold tracking-[.4px]",
        className
      )}
      {...props}
    >
      Get Started
    </button>
  );
}

function Intro() {
  return (
    <div
      className={clsx(
        "flex w-full flex-col items-center px-[16.5px] pb-[92px] pt-[105px]",
        "bg-[url('/manage-landing-page/images/bg-tablet-pattern.svg'),_url('/manage-landing-page/images/bg-tablet-pattern.svg')] bg-[length:var(--bg-top-size)_var(--bg-top-size),_var(--bg-bottom-size)_var(--bg-bottom-size)] bg-[position:top_-114px_right_-137px,_bottom_0px_right_-184px] bg-no-repeat" //bg
      )}
      style={
        {
          "--bg-top-size": "min(calc(456/375 * 100vw), 814px)",
          "--bg-bottom-size": "min(calc(317/375 * 100vw), 814px)",
        } as CSSProperties
      }
    >
      <div className="relative aspect-[580/525] w-full">
        <Image
          src={"/manage-landing-page/images/illustration-intro.svg"}
          alt="Intro Illustration"
          className="object-contain"
          fill
        />
      </div>
      <div className="mt-[2px] flex flex-col items-center px-[15.5px]">
        <h1 className="text-manage-primary-blue text-center text-[40px] font-bold leading-[1.25] tracking-[-.025em]">Bring everyone together to build better products.</h1>
        <p className="text-manage-neutral-300 mt-[8px] text-center font-light leading-[1.75]">Manage makes it simple for software teams to plan day-to-day tasks while keeping the larger team goals in view.</p>
        <GetStarted
          variant="primary"
          className="mt-[29.5px]"
        />
      </div>
    </div>
  );
}

type SellingPoint = {
  idx: string;
  title: string;
  desc: string;
};

function USP() {
  const [sellingPoints] = useState<SellingPoint[]>([
    {
      idx: "01",
      title: "Track company-wide progress",
      desc: "See how your day-to-day tasks fit into the wider vision. Go from tracking progress at the milestone level all the way done to the smallest of details. Never lose sight of the bigger picture again.",
    },
    {
      idx: "02",
      title: "Advanced built-in reports",
      desc: "Set internal delivery estimates and track progress toward company goals. Our customisable dashboard helps you build out the reports you need to keep key stakeholders informed.",
    },
    {
      idx: "03",
      title: "Everything you need in one place",
      desc: "Stop jumping from one service to another to communicate, store files, track tasks and share documents. Manage offers an all-in-one team productivity solution.",
    },
  ]);
  return (
    <div className="flex flex-col items-center pb-40">
      <div className="px-11 pt-[1px]">
        <h2 className="text-manage-primary-blue text-center text-[30px] font-bold leading-[1.5] tracking-[-.5px]">What’s different about Manage?</h2>
        <p className="text-manage-neutral-300 mt-[13px] text-center text-[14px] leading-[2]">Manage provides all the functionality your team needs, without the complexity. Our software is tailor-made for modern digital product teams.</p>
      </div>
      <div className="mt-[54px] flex w-full flex-col gap-[46px]">
        {sellingPoints.map((sell, index) => {
          return (
            <SellingPoint
              {...sell}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

function SellingPoint({ idx, title, desc }: SellingPoint) {
  return (
    <div className={"w-full pl-4"}>
      <h3 className="text-manage-primary-blue bg-manage-neutral-200 flex h-[39px] items-center gap-[14px] overflow-hidden rounded-l-full font-bold leading-[12px] tracking-[-.25px]">
        <span className="bg-manage-primary-red text-manage-neutral-100 flex h-full w-[67px] items-center justify-center rounded-full pb-1">{idx}</span>
        <span className="pb-1">{title}</span>
      </h3>
      <p className="text-manage-neutral-300 mt-[9px] pr-6 text-[14px] leading-[2]">{desc}</p>
    </div>
  );
}

function Main() {
  return (
    <div>
      <Intro />
      <USP />
      {/* {`

         Get Started
       
                
         
         
         
       
         
         
         
       
         What they’ve said
       
         Anisha Li
         “Manage has supercharged our team’s workflow. The ability to maintain 
         visibility on larger milestones at all times keeps everyone motivated.”
       
         Ali Bravo
         “We have been able to cancel so many other subscriptions since using 
         Manage. There is no more cross-channel confusion and everyone is much 
         more focused.”
       
         Richard Watts
         “Manage allows us to provide structure and process. It keeps us organized 
         and focused. I can’t stop recommending them to everyone I talk to!”
       
         Shanai Gough
         “Their software allows us to track, manage and collaborate on our projects 
         from anywhere. It keeps the whole team in-sync without being intrusive.”
       
         Get Started
       
         Simplify how your team works today.
         Get Started
       
         Home
         Pricing
         Products
         About Us
         Careers
         Community
         Privacy Policy
       
         Updates in your inbox…
         Go
       
         Copyright 2020. All Rights Reserved
      `} */}
    </div>
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
