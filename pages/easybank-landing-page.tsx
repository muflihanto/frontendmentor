import { Popover } from "@headlessui/react";
import Head from "next/head";
import Image from "next/image";
import type { ComponentProps } from "react";
import { useWindowSize } from "usehooks-ts";
import { publicSans } from "../utils/fonts/publicSans";
import { cn } from "../utils/cn";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

// TODO: - View the optimal layout for the site depending on their device's screen size

export default function EasybankLandingPage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Easybank landing page</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] font-public lg:max-w-[100vw] lg:overflow-hidden ${publicSans.variable}`}
      >
        <Header />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/easybank-landing-page/design"
          absolutePath="/easybank-landing-page/design/active-states.jpg"
        /> */}
      </div>
    </>
  );
}

function Header() {
  const { width } = useWindowSize();
  return (
    <div className="relative z-10 flex h-16 w-full items-center justify-between bg-easybank-neutral-100 px-6 lg:grid lg:h-20 lg:grid-cols-3 lg:grid-rows-1 lg:px-[165px]">
      <Logo className="lg:mt-[6px]" />
      {width < 1024 ? (
        <MobileMenuButton />
      ) : (
        <>
          <nav className="justify-self-center" aria-label="Easybank">
            <ul
              className={cn([
                "flex items-center gap-[29.5px] justify-self-center pb-[1px] text-[15px] text-easybank-neutral-400 [&>a]:leading-none [&>a]:tracking-[-.5px]",
                "[&>a:hover]:relative [&>a:hover]:text-easybank-primary-blue [&>a:hover]:before:absolute [&>a:hover]:before:bottom-[-33px] [&>a:hover]:before:left-0 [&>a:hover]:before:h-[4px] [&>a:hover]:before:w-full [&>a:hover]:before:bg-gradient-to-r [&>a:hover]:before:from-easybank-primary-green [&>a:hover]:before:to-easybank-primary-cyan [&>a:hover]:before:content-['']",
              ])}
            >
              <NavigationLinks />
            </ul>
          </nav>
          <RequestInvite className="mt-0 justify-self-end lg:max-w-[164px]" />
        </>
      )}
    </div>
  );
}

function NavigationLinks() {
  return (
    <>
      <li>
        <a href="">Home</a>
      </li>
      <li>
        <a href="">About</a>
      </li>
      <li>
        <a href="">Contact</a>
      </li>
      <li>
        <a href="">Blog</a>
      </li>
      <li>
        <a href="">Careers</a>
      </li>
    </>
  );
}

function MobileMenuButton() {
  return (
    <Popover>
      {({ open }) => {
        return (
          <>
            <Popover.Button className="flex h-6 w-6 items-center justify-center">
              {open ? <Icon variant="close" /> : <Icon variant="hamburger" />}
            </Popover.Button>
            <Popover.Panel className="absolute left-0 top-16 h-[600px] w-full bg-gradient-to-b from-easybank-primary-blue to-transparent p-[24px]">
              <nav aria-label="Easybank">
                <ul className="flex w-full flex-col items-center gap-[26px] rounded bg-white p-[32px] pb-[34px] text-[19px] text-easybank-primary-blue [&>a]:leading-none [&>a]:tracking-[-.5px]">
                  <NavigationLinks />
                </ul>
              </nav>
            </Popover.Panel>
          </>
        );
      }}
    </Popover>
  );
}

function RequestInvite({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={cn([
        "mt-8 flex h-[44px] w-[162px] items-center justify-center rounded-full bg-gradient-to-r from-easybank-primary-green to-easybank-primary-cyan text-[14px] font-bold text-easybank-neutral-100",
        className,
        "hover:relative hover:before:absolute hover:before:left-0 hover:before:top-0 hover:before:h-full hover:before:w-full hover:before:rounded-full hover:before:bg-white/40 hover:before:content-['']",
      ])}
    >
      Request Invite
    </button>
  );
}

function Intro() {
  return (
    <div className="lg:flex lg:h-[656px] lg:w-screen lg:flex-row-reverse lg:justify-stretch lg:gap-[68px]">
      <div className="relative z-0 h-[350px] -translate-y-[64px] bg-[url('/easybank-landing-page/images/bg-intro-mobile.svg')] bg-cover bg-[center_bottom_calc(-73/375*100vw)] bg-no-repeat lg:h-full lg:w-full lg:translate-y-0 lg:bg-[url('/easybank-landing-page/images/bg-intro-desktop.svg')] lg:bg-[length:1271px_1034px] lg:bg-[bottom_-118px_left_-48px]">
        <div className="absolute -bottom-[12px] left-1/2 aspect-[767/939] w-[calc(375px-32px)] -translate-x-[calc(50%+1px)] lg:bottom-[-160.75px] lg:left-0 lg:w-[767px] lg:translate-x-[17.1%]">
          <Image
            src="/easybank-landing-page/images/image-mockups.png"
            alt="Mockup"
            className="object-cover"
            fill
          />
        </div>
      </div>
      <div className="mt-[-28px] flex w-full flex-col items-center pb-[88px] lg:ml-[165px] lg:mt-0 lg:w-[440px] lg:min-w-[440px] lg:items-start lg:self-center lg:py-0">
        <h1
          className="text-center text-[39px] font-light leading-[47px] -tracking-[0.1px] text-easybank-primary-blue lg:text-left lg:text-[56px] lg:leading-[64px] lg:tracking-[-.75px]"
          id="main-heading"
        >
          Next generation digital banking
        </h1>
        <p className="mt-[16px] max-w-[320px] text-center text-[15px] leading-[25px] tracking-[-.2px] text-easybank-neutral-400 lg:mt-6 lg:max-w-none lg:text-left lg:text-[18px] lg:leading-[28px] lg:tracking-[-.3px]">
          Take your financial life online. Your Easybank account will be a
          one-stop-shop for spending, saving, budgeting, investing, and much
          more.
        </p>
        <RequestInvite className="lg:mt-9" />
      </div>
    </div>
  );
}

type Feature = { icon: IconVariant; heading: string; description: string };

function Features() {
  const features: Feature[] = [
    {
      icon: "online",
      heading: "Online Banking",
      description:
        "Our modern web and mobile applications allow you to keep track of your finances wherever you are in the world.",
    },
    {
      icon: "budgeting",
      heading: "Simple Budgeting",
      description:
        "See exactly where your money goes each month. Receive notifications when you’re close to hitting your limits.",
    },
    {
      icon: "onboarding",
      heading: "Fast Onboarding",
      description:
        "We don’t do branches. Open your account in minutes online and start taking control of your finances right away.",
    },
    {
      icon: "api",
      heading: "Open API",
      description:
        "Manage your savings, investments, pension, and much more from one account. Tracking your money has never been easier.",
    },
  ];
  return (
    <div className="flex flex-col items-center bg-easybank-neutral-300 px-[24px] py-[64px] lg:w-full lg:items-start lg:px-[165px] lg:pb-[100px] lg:pt-[98px]">
      <h2 className="text-center text-[32px] font-light leading-[37px] tracking-[-.5px] text-easybank-primary-blue lg:w-1/2 lg:text-left lg:text-[40px] lg:leading-normal lg:tracking-[-.75px]">
        Why choose Easybank?
      </h2>
      <p className="mt-[16px] text-center text-[15px] leading-[25px] tracking-[-.25px] text-easybank-neutral-400 max-lg:max-w-96 lg:mt-[19px] lg:w-7/12 lg:text-left lg:text-[18px] lg:leading-[28px] lg:tracking-[-.3px]">
        We leverage Open Banking to turn your bank account into your financial
        hub. Control your finances like never before.
      </p>
      <div className="mt-14 flex flex-col items-center gap-8 lg:mt-[71px] lg:grid lg:w-full lg:grid-cols-4 lg:grid-rows-1 lg:items-start lg:gap-[28.5px]">
        {features.map((feature, index) => {
          return <Feature key={`${index}-${feature.heading}`} {...feature} />;
        })}
      </div>
    </div>
  );
}

function Feature({
  icon,
  heading,
  description,
  className,
  ...props
}: ComponentProps<"div"> & Feature) {
  return (
    <div
      {...props}
      className={cn(["flex flex-col items-center lg:items-start", className])}
    >
      <Icon variant={icon} />
      <h3 className="mt-7 text-[20px] font-light leading-none tracking-[-0.4px] text-easybank-primary-blue lg:mt-[43px] lg:text-left lg:text-[24px]">
        {heading}
      </h3>
      <p className="mt-[20px] text-center text-[15px] leading-[25px] tracking-[-0.25px] text-easybank-neutral-400 max-lg:max-w-96 lg:mt-7 lg:text-left lg:text-[16px] lg:leading-[26px]">
        {description}
      </p>
    </div>
  );
}

type Article = {
  author: string;
  title: string;
  summary: string;
  cover: string;
};

function LatestArticles() {
  const articles: Article[] = [
    {
      author: "Claire Robinson",
      title: "Receive money in any currency with no fees",
      summary:
        "The world is getting smaller and we’re becoming more mobile. So why should you be forced to only receive money in a single",
      cover: "/easybank-landing-page/images/image-currency.jpg",
    },
    {
      author: "Wilson Hutton",
      title: "Treat yourself without worrying about money",
      summary:
        "Our simple budgeting feature allows you to separate out your spending and set realistic limits each month. That means you",
      cover: "/easybank-landing-page/images/image-restaurant.jpg",
    },
    {
      author: "Wilson Hutton",
      title: "Take your Easybank card wherever you go",
      summary:
        "We want you to enjoy your travels. This is why we don’t charge any fees on purchases while you’re abroad. We’ll even show you",
      cover: "/easybank-landing-page/images/image-plane.jpg",
    },
    {
      author: "Claire Robinson",
      title: "Our invite-only Beta accounts are now live!",
      summary:
        "After a lot of hard work by the whole team, we’re excited to launch our closed beta. It’s easy to request an invite through the site",
      cover: "/easybank-landing-page/images/image-confetti.jpg",
    },
  ];
  return (
    <div className="flex w-full flex-col items-center px-[24px] py-[88px] pb-[89px] lg:items-start lg:px-[165px] lg:pb-[81px] lg:pt-[94px]">
      <h2 className="text-center text-[32px] font-light leading-[37px] tracking-[-.3px] text-easybank-primary-blue lg:w-fit lg:text-left lg:text-[40px] lg:tracking-[-.4px]">
        Latest Articles
      </h2>
      <div className="mt-8 flex w-full flex-col items-center gap-[25px] lg:mt-[54px] lg:grid lg:grid-cols-4 lg:grid-rows-1 lg:gap-[30px]">
        {articles.map((article) => {
          return <Article key={article.title} {...article} />;
        })}
      </div>
    </div>
  );
}

function Article({
  author,
  cover,
  summary,
  title,
  className,
  ...props
}: ComponentProps<"div"> & Article) {
  return (
    <div
      className={cn([
        "h-[394px] w-full overflow-hidden rounded-[5px] shadow shadow-easybank-primary-blue/5 max-lg:max-w-screen-sm",
        className,
      ])}
      {...props}
    >
      <div className="relative h-[200px] w-full">
        <Image
          className="object-cover"
          src={cover}
          alt={`${title} illustration`}
          fill
        />
      </div>
      <div className="h-full w-full bg-easybank-neutral-100 px-[31px] py-[29px] text-easybank-neutral-400 lg:px-[24px] lg:pt-[29.5px]">
        <p className="text-[10px] leading-none tracking-[-.2px]">By {author}</p>
        <h3 className="mt-[12px] leading-[20px] tracking-[-.35px] text-easybank-primary-blue hover:text-easybank-primary-green">
          <a href="">{title}</a>
        </h3>
        <p className="mt-[8px] text-[13px] leading-[18px] tracking-[-.25px]">
          {summary} ...
        </p>
      </div>
    </div>
  );
}

function Main() {
  return (
    <main className="bg-easybank-neutral-200" aria-labelledby="main-heading">
      <Intro />
      <Features />
      <LatestArticles />
    </main>
  );
}

function SocialIcons() {
  const socialMedia: { icon: IconVariant; href?: string }[] = [
    { icon: "facebook" },
    { icon: "youtube" },
    { icon: "twitter" },
    { icon: "pinterest" },
    { icon: "instagram" },
  ];
  return (
    <ul className="mt-8 flex items-center gap-[15.5px] lg:mt-auto lg:gap-[12.5px]">
      {socialMedia.map(({ href, icon }) => {
        return (
          <li key={icon}>
            <a
              href={href ?? ""}
              className="flex h-6 items-center justify-center lg:h-5"
            >
              <Icon
                className="h-6 text-white hover:text-easybank-primary-green lg:h-5"
                variant={icon}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function Footer() {
  return (
    <footer className="relative bg-easybank-primary-blue pb-[43.5px] pt-[40px] lg:pb-[48px] lg:pt-[48px]">
      <div className="flex flex-col items-center lg:h-[95px] lg:flex-wrap lg:items-start lg:px-[165px]">
        <Logo variant="footer" />
        <SocialIcons />
        <div className="mt-[37px] lg:-ml-[30px] lg:mt-0 lg:h-full lg:py-[6.5px]">
          <ul className="flex flex-col items-center gap-[19px] text-[15px] leading-none tracking-[-.25px] text-easybank-neutral-300 lg:grid lg:h-full lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-3 lg:gap-x-[calc(96/1440*100vw)] [&_a:hover]:text-easybank-primary-green">
            <li>
              <a href="">About Us</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
            <li>
              <a href="">Blog</a>
            </li>
            <li>
              <a href="">Careers</a>
            </li>
            <li>
              <a href="">Support</a>
            </li>
            <li>
              <a href="">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <RequestInvite className="mt-[38px] lg:ml-auto lg:mt-[1px]" />
        <p className="mt-[25px] text-[15px] tracking-[-.25px] text-easybank-neutral-400 lg:ml-auto lg:mt-[26px]">
          © Easybank. All Rights Reserved
        </p>
      </div>
      <div className="absolute bottom-3 w-full text-center text-[11px] text-easybank-neutral-100 lg:px-[165px] lg:text-right [&_a:hover]:text-easybank-primary-green [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*                                     SVGs                                   */
/* -------------------------------------------------------------------------- */

function Logo({
  variant,
  className,
  ...props
}: ComponentProps<"svg"> & { variant?: "header" | "footer" }) {
  return (
    <svg
      {...props}
      viewBox="0 0 139 20"
      className={cn([
        "h-5",
        variant === "footer" ? "text-white" : "text-[#2D314D]",
        className,
      ])}
    >
      <title>Easybank Logo</title>
      <use href="/easybank-landing-page/images/logo.svg#easybank-logo" />
    </svg>
  );
}

type IconVariant =
  | "api"
  | "budgeting"
  | "close"
  | "facebook"
  | "hamburger"
  | "instagram"
  | "onboarding"
  | "online"
  | "pinterest"
  | "twitter"
  | "youtube";

function Icon({
  variant,
  ...props
}: { variant: IconVariant } & ComponentProps<"svg">) {
  let variantProps: ComponentProps<"svg">;

  switch (variant) {
    case "api":
    case "budgeting":
    case "onboarding":
    case "online":
      variantProps = {
        width: 72,
        height: 72,
      };
      break;
    case "close":
      variantProps = {
        width: 18,
        height: 19,
      };
      break;
    case "hamburger":
      variantProps = {
        width: 24,
        height: 11,
      };
      break;
    case "facebook":
    case "pinterest":
      variantProps = {
        className: cn(["h-5", props.className]),
        viewBox: "0 0 20 20",
      };
      break;
    case "instagram":
    case "youtube":
      variantProps = {
        className: cn(["h-5", props.className]),
        viewBox: "0 0 21 20",
      };
      break;
    case "twitter":
      variantProps = {
        className: cn([props.className, "h-[21px] lg:h-[18px]"]),
        viewBox: "0 0 21 18",
      };
      break;
  }

  return (
    <svg
      {...props}
      {...variantProps}
      role="graphics-symbol"
      aria-label={`Easybank on ${variant[0].toUpperCase()}${variant.slice(1)}`}
    >
      <use
        href={`/easybank-landing-page/images/icon-${variant}.svg#icon-${variant}`}
      />
    </svg>
  );
}
