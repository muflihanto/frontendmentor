import Head from "next/head";
import Image from "next/image";
import { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps, HTMLProps, SVGProps, useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import clsx from "clsx";
import { motion, useScroll } from "framer-motion";
import { useWindowSize } from "usehooks-ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
        variant === "secondary" && "bg-manage-neutral-100 text-manage-primary-red shadow-manage-neutral-400/10 pb-[2px] shadow-lg", // secondary variant
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
    <div className="mb-[16.5px] flex flex-col items-center">
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
      <p className="text-manage-neutral-300 mt-[8.5px] pb-[.5px] pr-6 text-[14px] leading-[2]">{desc}</p>
    </div>
  );
}

type Testimonial = {
  avatar: string;
  name: string;
  testimony: string;
};

function Testimonials() {
  const [testimonials] = useState<Testimonial[]>([
    {
      avatar: "/manage-landing-page/images/avatar-anisha.png",
      name: "Anisha Li",
      testimony: "Manage has supercharged our team’s workflow. The ability to maintain visibility on larger milestones at all times keeps everyone motivated.",
    },
    {
      avatar: "/manage-landing-page/images/avatar-ali.png",
      name: "Ali Bravo",
      testimony: "We have been able to cancel so many other subscriptions since using Manage. There is no more cross-channel confusion and everyone is much more focused.",
    },
    {
      avatar: "/manage-landing-page/images/avatar-richard.png",
      name: "Richard Watts",
      testimony: "Manage allows us to provide structure and process. It keeps us organized and focused. I can’t stop recommending them to everyone I talk to!",
    },
    {
      avatar: "/manage-landing-page/images/avatar-shanai.png",
      name: "Shanai Gough",
      testimony: "Their software allows us to track, manage and collaborate on our projects from anywhere. It keeps the whole team in-sync without being intrusive.",
    },
  ]);

  const carouselRef = useRef<null | HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: carouselRef,
  });

  const [active, setActive] = useState(1);

  const onClick = (idx: number) => {
    if (!!carouselRef.current) {
      const { scrollWidth } = carouselRef.current;
      carouselRef.current.scrollTo(((idx - 1) / 4) * scrollWidth, 0);
    }
  };

  return (
    <div className="flex flex-col items-center pb-[41.93px] pt-[42.5px]">
      <h2 className="text-manage-primary-blue text-center text-[32px] font-bold leading-[1.5] tracking-[-.7px]">What they’ve said</h2>
      <div className="flex h-[425px] w-full max-w-[100vw] flex-col items-center justify-center overflow-hidden px-[18px] pt-[16px]">
        <div
          className="scrollbar-hidden flex w-full snap-x items-center gap-12 overflow-x-auto overflow-y-visible scroll-smooth pb-6 pt-10"
          ref={carouselRef}
          onScroll={() => {
            setActive(Math.floor(scrollXProgress.get() * 4) + 1);
          }}
        >
          {testimonials.map((testi) => {
            return (
              <Testimonial
                className="min-w-[calc(100vw-32px)] shrink-0 origin-[0%] select-none snap-start scroll-ml-0"
                testimony={testi}
                key={testi.name}
              />
            );
          })}
        </div>
        <div className="relative flex h-4 items-start justify-center gap-1 pt-[2px]">
          {[1, 2, 3, 4].map((index) => {
            return (
              <button
                className={cn(["border-manage-primary-red aspect-square w-2 rounded-full border"], active === index && "bg-manage-primary-red")}
                onClick={() => {
                  onClick(index);
                }}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <GetStarted variant="primary" />
    </div>
  );
}

function Testimonial({ testimony: { avatar, name, testimony: testi }, className }: { testimony: Testimonial; className?: string }) {
  return (
    <div className={cn("bg-manage-neutral-100 flex h-[248px] w-full flex-col items-center justify-start space-y-[24px] pl-[22px] pr-[25px]", className)}>
      <div className="relative -mt-9 aspect-square w-[72px] overflow-hidden rounded-full">
        <Image
          src={avatar}
          fill
          alt={`${name}'s avatar`}
          className="object-contain"
        />
      </div>
      <h3 className="text-manage-primary-blue font-bold tracking-[-.25px]">{name}</h3>
      <blockquote>
        <p className="text-manage-neutral-300 -mt-[5px] text-center text-[14px] leading-[26px]">&ldquo;{testi}&rdquo;</p>
      </blockquote>
    </div>
  );
}

function Simplify() {
  return (
    <div className="bg-manage-primary-red flex h-[405px] flex-col items-center justify-center bg-[url('/manage-landing-page/images/bg-simplify-section-mobile.svg')] bg-left bg-no-repeat p-8 pt-[34px]">
      <h2 className="text-manage-neutral-100 text-center text-[40px] font-bold leading-[1.25] tracking-[-.9px]">Simplify how your team works today.</h2>
      <GetStarted
        variant="secondary"
        className="mt-[28px] pt-1"
      />
    </div>
  );
}

function Main() {
  return (
    <div>
      <Intro />
      <USP />
      <Testimonials />
      <Simplify />
    </div>
  );
}

type IconVariant = "facebook" | "instagram" | "twitter" | "pinterest" | "youtube";

function Icon({ variant }: { variant: IconVariant }) {
  const [viewboxes] = useState<{
    [k in IconVariant]: string;
  }>({
    facebook: "0 0 20 20",
    pinterest: "0 0 20 20",
    instagram: "0 0 21 20",
    youtube: "0 0 21 20",
    twitter: "0 0 21 18",
  });

  return (
    <svg
      className="flex aspect-square h-full items-center justify-center"
      viewBox={viewboxes[variant]}
    >
      <use href={`/manage-landing-page/images/icon-${variant}.svg#icon`} />
    </svg>
  );
}

function SocialIcons({ className }: HTMLProps<HTMLDivElement>) {
  return (
    <div className={cn("flex", className)}>
      {(["facebook", "youtube", "twitter", "pinterest", "instagram"] as IconVariant[]).map((sns) => {
        return (
          <a
            href=""
            key={sns}
            className="text-manage-neutral-100 hover:text-manage-primary-red h-full"
          >
            <Icon variant={sns} />
          </a>
        );
      })}
    </div>
  );
}

const zUserInput = z.object({
  email: z.string().min(1, "Email should not be empty").email("Please insert a valid email"),
});

type UserInput = z.infer<typeof zUserInput>;

function Footer() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<UserInput>({
    resolver: zodResolver(zUserInput),
  });

  const onSubmit = handleSubmit(({ email }) => {
    console.log(email);
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      console.log("success");
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <footer className="bg-manage-neutral-400 relative flex h-[537px] flex-col items-center gap-[50px] px-6 pt-[51px]">
      <form
        onSubmit={onSubmit}
        className="relative grid h-[44px] w-full grid-cols-[auto_80px] justify-stretch gap-[8px]"
      >
        <input
          type="text"
          {...register("email")}
          placeholder="Updates in your inbox…"
          className="focus-visible:outline-manage-primary-red h-full rounded-full p-1 px-6 pb-[6px] text-[13px] font-medium tracking-[-.1px] focus-visible:outline focus-visible:outline-2"
        />
        <button className="bg-manage-primary-red text-manage-neutral-100 flex h-full w-20 items-center justify-center rounded-full pb-[2px] text-[13px] font-bold uppercase">Go</button>
        {!!errors.email && <p className="absolute left-6 top-12 text-[13px] italic text-red-500">{errors.email.message}</p>}
      </form>

      <nav className="text-manage-neutral-200 grid grid-flow-col grid-cols-2 grid-rows-4 gap-x-[75px] gap-y-[12.5px] pl-[13px] pt-[4px] text-[15px] tracking-[-.25px]">
        <a href="">Home</a>
        <a href="">Pricing</a>
        <a href="">Products</a>
        <a href="">About Us</a>
        <a href="">Careers</a>
        <a href="">Community</a>
        <a href="">Privacy Policy</a>
      </nav>

      <SocialIcons className="h-8 gap-[34px]" />

      <div className="mr-0.5 pt-1">
        <Logo
          variant="footer"
          className="h-[26px]"
        />
      </div>

      <p className="text-manage-neutral-300 text-center text-[13px] tracking-[-.25px]">Copyright 2020. All Rights Reserved</p>

      <p className="text-manage-neutral-300 absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
