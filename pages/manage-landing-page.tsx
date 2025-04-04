import Head from "next/head";
import Image from "next/image";
import {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type DetailedHTMLProps,
  type HTMLProps,
  type SVGProps,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { cn } from "../utils/cn";
import clsx from "clsx";
import { motion, useScroll } from "framer-motion";
import { useWindowSize } from "usehooks-ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { beVietnam } from "../utils/fonts/beVietnam";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

// TODO: - View the optimal layout for the site depending on their device's screen size

export default function ManageLandingPage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Manage landing page</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] bg-white font-be-vietnam ${beVietnam.variable}`}
      >
        <Header />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/manage-landing-page/design"
          absolutePath="/manage-landing-page/design/active-states.jpg"
        /> */}
      </div>
    </>
  );
}

function Logo({
  variant,
  className,
  ...props
}: { variant: "header" | "footer" } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={cn(
        `${
          variant === "header" ? "text-[#242D52]" : "text-manage-neutral-100"
        }`,
        className,
      )}
      viewBox="0 0 146 24"
      {...props}
    >
      <title>Logo</title>
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
  }, [width]);

  return (
    <div className="lg:hidden">
      <button
        className={cn(
          "mb-2 flex w-[25px] items-center justify-center",
          "relative z-20",
        )}
        onClick={() => {
          setOpen((o) => !o);
        }}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={open ? "menu" : undefined}
      >
        {open ? (
          <Image
            src={"/manage-landing-page/images/icon-close.svg"}
            alt="Close menu"
            height={22}
            width={21}
          />
        ) : (
          <Image
            src={"/manage-landing-page/images/icon-hamburger.svg"}
            alt="Open menu"
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
        <nav
          className={
            "flex h-[291px] w-[calc(100%-48px)] max-w-screen-sm flex-col items-center justify-center gap-[23px] rounded bg-white px-[32px] font-bold text-manage-primary-blue [&_a]:leading-none [&_a]:tracking-[-.35px]"
          }
          aria-label="Main menu"
        >
          <NavigationLinks id="menu" />
        </nav>
      </motion.div>
    </div>
  );
}

function NavigationLinks({ id }: { id?: string }) {
  return (
    <ul className="contents" id={id}>
      <li>
        <a href="">Pricing</a>
      </li>
      <li>
        <a href="">Product</a>
      </li>
      <li>
        <a href="">About Us</a>
      </li>
      <li>
        <a href="">Careers</a>
      </li>
      <li>
        <a href="">Community</a>
      </li>
    </ul>
  );
}

function Header() {
  return (
    <header className="absolute left-0 top-0 flex h-[105px] w-full items-center justify-between bg-transparent px-6 pt-[3px] sm:px-16 md:px-24 lg:h-[155px] lg:justify-between lg:px-32 lg:pt-0 xl:px-[165px]">
      <Logo variant="header" className="h-[18px] lg:mt-[14px] lg:h-[24px]" />
      <nav
        aria-label="Main menu"
        className="mr-[10px] gap-[35px] text-[12.5px] font-medium text-manage-primary-blue max-lg:hidden lg:mt-[4px] lg:flex lg:place-self-center [&_a:hover]:opacity-50"
      >
        <NavigationLinks />
      </nav>
      <GetStarted
        variant="primary"
        className="max-lg:hidden lg:place-self-end lg:self-center"
      />
      <MobileNav />
    </header>
  );
}

function GetStarted({
  variant,
  className,
  ...props
}: { variant: "primary" | "secondary" } & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      className={cn(
        variant === "primary" &&
          "bg-manage-primary-red text-manage-neutral-200 shadow-lg shadow-manage-primary-red/30", // primary variant
        variant === "secondary" &&
          "bg-manage-neutral-100 pb-[2px] text-manage-primary-red shadow-lg shadow-manage-neutral-400/10 hover:text-manage-primary-red/50 lg:pb-1", // secondary variant
        "flex h-[44px] w-[136px] items-center justify-center rounded-full pt-[1px] text-[12px] font-bold tracking-[.4px]",
        variant === "primary" &&
          "hover:relative hover:overflow-hidden hover:before:absolute hover:before:left-0 hover:before:top-0 hover:before:h-full hover:before:w-full hover:before:bg-white/30", // hover overlay
        className,
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
        "bg-[url('/manage-landing-page/images/bg-tablet-pattern.svg'),_url('/manage-landing-page/images/bg-tablet-pattern.svg')] bg-[length:var(--bg-top-size)_var(--bg-top-size),_var(--bg-bottom-size)_var(--bg-bottom-size)] bg-[position:top_-114px_right_-137px,_bottom_0px_right_-184px] bg-no-repeat", //bg
        "lg:bg-[url('/manage-landing-page/images/bg-tablet-pattern.svg')] lg:bg-[length:813.6px_813.6px] lg:bg-[top_-154px_right_-146px]", // large-bg
        "lg:grid lg:h-[800px] lg:grid-cols-[auto_minmax(40%,540px)] lg:grid-rows-1 lg:px-32 lg:pb-[31px] lg:pt-[155px] xl:grid-cols-[auto_540px] xl:px-[165px]", // large veiwport
      )}
      style={
        {
          "--bg-top-size": "min(calc(456/375 * 100vw), 814px)",
          "--bg-bottom-size": "min(calc(317/375 * 100vw), 814px)",
        } as CSSProperties
      }
    >
      <div className="relative aspect-[580/525] w-full max-lg:max-w-[480px] lg:col-start-2 lg:row-start-1 lg:mt-0.5">
        <Image
          src={"/manage-landing-page/images/illustration-intro.svg"}
          alt="Intro Illustration"
          className="object-contain lg:translate-y-[calc(10/525*100%)] lg:scale-[calc(580/540*100%)]"
          fill
          priority
        />
      </div>
      <div className="mt-[2px] flex flex-col items-center px-[15.5px] max-lg:max-w-screen-sm lg:col-start-1 lg:row-start-1 lg:items-start lg:px-0 lg:pr-8">
        <h1
          className="text-center text-[40px] font-bold leading-[1.25] tracking-[-.025em] text-manage-primary-blue lg:text-left lg:text-[56px] lg:leading-[1.14] lg:tracking-[-.02em]"
          id="main-heading"
        >
          Bring everyone together to build better products.
        </h1>
        <p className="mt-[8px] text-center font-light leading-[1.75] text-manage-neutral-300 lg:mt-[34px] lg:max-w-[340px] lg:text-left lg:leading-[1.6]">
          Manage makes it simple for software teams to plan day-to-day tasks
          while keeping the larger team goals in view.
        </p>
        <GetStarted variant="primary" className="mt-[29.5px] lg:mt-[42px]" />
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
    <div className="mb-[16.5px] flex flex-col items-center max-lg:px-[calc(50vw-320px)] lg:mt-[37px] lg:flex-row lg:items-start lg:px-[165px]">
      <div className="px-11 pt-[1px] lg:flex-1 lg:px-0">
        <h2 className="text-center text-[30px] font-bold leading-[1.5] tracking-[-.5px] text-manage-primary-blue lg:text-left lg:text-[39px] lg:leading-[1.1] lg:tracking-[-.2px]">
          What’s different about Manage?
        </h2>
        <p className="mt-[13px] text-center text-[14px] leading-[2] text-manage-neutral-300 lg:mt-8 lg:max-w-[340px] lg:text-left lg:text-base lg:leading-[1.625]">
          Manage provides all the functionality your team needs, without the
          complexity. Our software is tailor-made for modern digital product
          teams.
        </p>
      </div>
      <div className="mt-[54px] flex w-full flex-col gap-[46px] lg:mt-0 lg:flex-1 lg:gap-[41.5px]">
        {sellingPoints.map((sell) => {
          return <SellingPoint {...sell} key={sell.idx} />;
        })}
      </div>
    </div>
  );
}

function SellingPoint({ idx, title, desc }: SellingPoint) {
  return (
    <div className={"-ml-[1px] w-full pl-4"}>
      <h3 className="flex h-[39px] items-center gap-[14px] overflow-hidden rounded-l-full bg-manage-neutral-200 font-bold leading-[12px] tracking-[-.25px] text-manage-primary-blue sm:gap-7 sm:bg-transparent">
        <span className="flex h-full w-[67px] items-center justify-center rounded-full bg-manage-primary-red pb-1 text-manage-neutral-100">
          {idx}
        </span>
        <span className="pb-1">{title}</span>
      </h3>
      <p className="mt-[8.5px] pb-[.5px] pr-6 text-[14px] leading-[2] text-manage-neutral-300 sm:px-0 sm:pl-[calc(67px+28px)] sm:text-base sm:leading-[1.6]">
        {desc}
      </p>
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
      testimony:
        "Manage has supercharged our team’s workflow. The ability to maintain visibility on larger milestones at all times keeps everyone motivated.",
    },
    {
      avatar: "/manage-landing-page/images/avatar-ali.png",
      name: "Ali Bravo",
      testimony:
        "We have been able to cancel so many other subscriptions since using Manage. There is no more cross-channel confusion and everyone is much more focused.",
    },
    {
      avatar: "/manage-landing-page/images/avatar-richard.png",
      name: "Richard Watts",
      testimony:
        "Manage allows us to provide structure and process. It keeps us organized and focused. I can’t stop recommending them to everyone I talk to!",
    },
    {
      avatar: "/manage-landing-page/images/avatar-shanai.png",
      name: "Shanai Gough",
      testimony:
        "Their software allows us to track, manage and collaborate on our projects from anywhere. It keeps the whole team in-sync without being intrusive.",
    },
  ]);

  const carouselRef = useRef<null | HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: carouselRef,
  });

  const { width } = useWindowSize();

  const [active, setActive] = useState(0);
  const [panInfo, setPanInfo] = useState<number>();

  const onClick = useCallback((idx: number) => {
    if (carouselRef.current) {
      const { scrollWidth } = carouselRef.current;
      carouselRef.current.scrollTo((idx / 4) * scrollWidth, 0);
    }
  }, []);

  useEffect(() => {
    if (width > 640) {
      carouselRef.current?.scrollTo(539, 0);
    } else {
      onClick(1);
    }
  }, [width, onClick]);

  return (
    <div className="flex flex-col items-center pb-[41.93px] pt-[42.5px] lg:pb-[180px] lg:pt-[125px]">
      <h2 className="text-center text-[32px] font-bold leading-[1.5] tracking-[-.7px] text-manage-primary-blue lg:text-[40px]">
        What they’ve said
      </h2>
      <div className="flex h-[425px] w-full max-w-[100vw] flex-col items-center justify-center overflow-hidden px-[18px] pt-[16px] sm:h-auto sm:justify-start sm:px-0 sm:pb-12 sm:pt-[64px]">
        <motion.div
          className={cn([
            "flex w-full items-center gap-8 overflow-x-auto overflow-y-visible pb-6 pt-10 scrollbar-hidden sm:px-[var(--padding-inline)] sm:pb-0", // base
            panInfo === undefined
              ? "snap-x snap-mandatory scroll-smooth" // stop scrolling
              : "snap-none snap-normal scroll-auto", // scrolling
          ])}
          ref={carouselRef}
          onMouseDown={() => {
            setPanInfo(carouselRef.current?.scrollLeft);
          }}
          onPan={(_, info) => {
            panInfo !== undefined &&
              carouselRef.current &&
              carouselRef.current.scrollTo(panInfo - info.offset.x, 0);
          }}
          onMouseUp={() => {
            setPanInfo(undefined);
          }}
          style={
            {
              "--padding-inline":
                width > 640 ? `${(width - 539) / 2}px` : "0px",
            } as CSSProperties
          }
          onScroll={() => {
            setActive(Math.floor(scrollXProgress.get() * 4));
          }}
          tabIndex={0}
        >
          {testimonials.map((testi) => {
            return <Testimonial testimony={testi} key={testi.name} />;
          })}
        </motion.div>
        <div className="relative flex h-4 items-start justify-center gap-1 pt-[2px] lg:hidden">
          {testimonials.map((testi, index) => {
            return (
              <button
                className={cn(
                  [
                    "aspect-square w-2 rounded-full border border-manage-primary-red",
                  ],
                  active === index && "bg-manage-primary-red",
                )}
                onClick={() => {
                  onClick(index);
                }}
                key={testi.name}
                type="button"
              />
            );
          })}
        </div>
      </div>
      <GetStarted variant="primary" />
    </div>
  );
}

function Testimonial({
  testimony: { avatar, name, testimony: testi },
  className,
}: {
  testimony: Testimonial;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-[248px] w-full flex-col items-center justify-start space-y-[24px] bg-manage-neutral-100 pl-[22px] pr-[25px] sm:h-[220px] sm:space-y-[23px] sm:px-[41px]",
        "min-w-[calc(100vw-32px)] max-w-[539px] shrink-0 origin-[0%] cursor-grab select-none snap-start scroll-ml-0 sm:min-w-0 sm:snap-center",
        className,
      )}
    >
      <div className="relative -mt-9 aspect-square w-[72px] overflow-hidden rounded-full">
        <Image
          src={avatar}
          fill
          sizes="100vw"
          alt={`${name}'s avatar`}
          className="object-contain"
        />
      </div>
      <h3 className="font-bold tracking-[-.25px] text-manage-primary-blue">
        {name}
      </h3>
      <blockquote>
        <p className="-mt-[5px] text-center text-[14px] leading-[26px] text-manage-neutral-300 sm:text-base sm:leading-[26.5px]">
          &ldquo;{testi}&rdquo;
        </p>
      </blockquote>
    </div>
  );
}

function Simplify() {
  return (
    <div className="flex h-[405px] flex-col items-center justify-center bg-manage-primary-red bg-[url('/manage-landing-page/images/bg-simplify-section-mobile.svg')] bg-left bg-no-repeat p-8 pt-[34px] lg:h-[220px] lg:flex-row lg:justify-between lg:bg-[url('/manage-landing-page/images/bg-simplify-section-desktop.svg')] lg:bg-[top_-140px_left_255px] lg:px-[165px]">
      <h2 className="text-center text-[40px] font-bold leading-[1.25] tracking-[-.9px] text-manage-neutral-100 lg:mb-2 lg:max-w-[440px] lg:text-left lg:leading-[1.1]">
        Simplify how your team works today.
      </h2>
      <GetStarted
        variant="secondary"
        className="mt-[28px] pt-1 lg:-mr-0.5 lg:mb-[1px] lg:mt-0"
      />
    </div>
  );
}

function Main() {
  return (
    <main aria-labelledby="main-heading">
      <Intro />
      <USP />
      <Testimonials />
      <Simplify />
    </main>
  );
}

type IconVariant =
  | "facebook"
  | "instagram"
  | "twitter"
  | "pinterest"
  | "youtube";

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
      aria-label={variant[0].toUpperCase() + variant.slice(1)}
      role="graphics-symbol"
    >
      <use href={`/manage-landing-page/images/icon-${variant}.svg#icon`} />
    </svg>
  );
}

function SocialIcons({ className }: HTMLProps<HTMLDivElement>) {
  return (
    <div className={cn("flex", className)}>
      {(
        [
          "facebook",
          "youtube",
          "twitter",
          "pinterest",
          "instagram",
        ] as IconVariant[]
      ).map((sns) => {
        return (
          <a
            href=""
            key={sns}
            className="h-full text-manage-neutral-100 hover:text-manage-primary-red"
          >
            <Icon variant={sns} />
          </a>
        );
      })}
    </div>
  );
}

const zUserInput = z.object({
  email: z
    .string()
    .min(1, "Email should not be empty")
    .email("Please insert a valid email"),
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
  const navLinks = [
    "Home",
    "Pricing",
    "Products",
    "About Us",
    "Careers",
    "Community",
    "Privacy Policy",
  ];

  useEffect(() => {
    if (isSubmitSuccessful) {
      console.log("success");
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <footer className="relative flex h-[537px] flex-col items-center gap-[50px] bg-manage-neutral-400 px-6 pt-[51px] lg:grid lg:h-[calc(128px+122.3px)] lg:grid-cols-[155px_auto_272px] lg:grid-rows-2 lg:items-start lg:gap-x-0 lg:px-[171px] lg:pb-[61.3px] lg:pr-[165px] lg:pt-[62px]">
      <form
        onSubmit={onSubmit}
        className="relative grid h-[44px] w-full grid-cols-[auto_80px] justify-stretch gap-[8px] lg:col-start-3 lg:row-start-1 lg:mt-[3px] lg:grid-cols-[auto_64px] lg:justify-self-end"
      >
        <input
          type="text"
          {...register("email")}
          placeholder="Updates in your inbox…"
          className={cn(
            "h-full w-full rounded-full bg-white p-1 px-6 pb-[6px] text-[13px] font-medium tracking-[-.1px] text-manage-primary-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-manage-primary-red lg:px-4",
            errors.email &&
              "border border-red-500 text-red-500 focus-visible:outline-red-500",
          )}
        />
        <button
          className={clsx(
            "flex h-full w-full items-center justify-center rounded-full bg-manage-primary-red pb-[2px] text-[13px] font-bold uppercase text-manage-neutral-100 lg:normal-case",
            "hover:relative hover:overflow-hidden hover:before:absolute hover:before:left-0 hover:before:top-0 hover:before:h-full hover:before:w-full hover:before:bg-white/30",
          )}
          type="submit"
        >
          Go
        </button>
        {!!errors.email && (
          <p className="absolute left-6 top-12 text-[13px] italic text-red-500/75 lg:left-4 lg:text-[9px] lg:tracking-[.3px]">
            {errors.email.message}
          </p>
        )}
      </form>

      <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:max-w-[720px] lg:place-content-between">
        <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 gap-x-[75px] gap-y-[12.5px] pl-[13px] pt-[4px] text-[15px] tracking-[-.25px] text-manage-neutral-200 lg:gap-x-[18px] lg:py-0 lg:pl-[min(calc(100vw-1024px+16px),124px)]">
          {navLinks.map((link, index) => {
            return (
              <li key={`${index}-${link}`}>
                <a href="" className="hover:text-manage-primary-red">
                  {link}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <SocialIcons className="h-8 gap-[34px] lg:col-start-1 lg:row-start-2 lg:h-[20px] lg:justify-between lg:gap-0 lg:self-end lg:pr-px" />

      <div className="mr-0.5 pt-1 lg:col-start-1 lg:row-start-1 lg:pt-0">
        <Logo variant="footer" className="h-[26px] lg:h-6" />
      </div>

      <p className="text-center text-[13px] tracking-[-.25px] text-manage-neutral-300 lg:col-start-3 lg:row-start-2 lg:self-end lg:text-right">
        Copyright 2020. All Rights Reserved
      </p>

      <p className="absolute bottom-3 w-full text-center text-[11px] text-manage-neutral-300 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
