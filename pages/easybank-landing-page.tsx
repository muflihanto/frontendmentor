import { Popover } from "@headlessui/react";
import Head from "next/head";
import Image from "next/image";
import type { ButtonHTMLAttributes, DetailedHTMLProps, HTMLProps } from "react";
import { twMerge } from "tailwind-merge";
import { useWindowSize } from "usehooks-ts";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

// TODO: - View the optimal layout for the site depending on their device's screen size
// TODO: - See hover states for all interactive elements on the page

export default function EasybankLandingPage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Easybank landing page</title>
      </Head>
      <div className="App relative min-h-[100svh] font-public lg:max-w-[100vw] lg:overflow-hidden">
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
          <div
            className={twMerge(
              "flex items-center gap-[29.5px] justify-self-center pb-[1px] text-[15px] text-easybank-neutral-400 [&>a]:leading-none [&>a]:tracking-[-.5px]",
              "[&>a:hover]:relative [&>a:hover]:text-easybank-primary-blue [&>a:hover]:before:absolute [&>a:hover]:before:bottom-[-33px] [&>a:hover]:before:left-0 [&>a:hover]:before:h-[4px] [&>a:hover]:before:w-full [&>a:hover]:before:bg-gradient-to-r [&>a:hover]:before:from-easybank-primary-green [&>a:hover]:before:to-easybank-primary-cyan [&>a:hover]:before:content-['']",
            )}
          >
            <NavigationLinks />
          </div>
          <RequestInvite className="mt-0 justify-self-end lg:max-w-[164px]" />
        </>
      )}
    </div>
  );
}

function NavigationLinks() {
  return (
    <>
      <a href="">Home</a>
      <a href="">About</a>
      <a href="">Contact</a>
      <a href="">Blog</a>
      <a href="">Careers</a>
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
              <div className="flex w-full flex-col items-center gap-[26px] rounded bg-white p-[32px] pb-[34px] text-[19px] text-easybank-primary-blue [&>a]:leading-none [&>a]:tracking-[-.5px]">
                <NavigationLinks />
              </div>
            </Popover.Panel>
          </>
        );
      }}
    </Popover>
  );
}

function RequestInvite({
  className,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      {...props}
      className={twMerge(
        "mt-8 flex h-[44px] w-[162px] items-center justify-center rounded-full bg-gradient-to-r from-easybank-primary-green to-easybank-primary-cyan text-[14px] font-bold text-easybank-neutral-100",
        className,
        "hover:relative hover:before:absolute hover:before:left-0 hover:before:top-0 hover:before:h-full hover:before:w-full hover:before:rounded-full hover:before:bg-white/40 hover:before:content-['']",
      )}
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
        <h1 className="text-center text-[39px] font-light leading-[47px] -tracking-[0.1px] text-easybank-primary-blue lg:text-left lg:text-[56px] lg:leading-[64px] lg:tracking-[-.75px]">
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
      <p className="mt-[16px] text-center text-[15px] leading-[25px] tracking-[-.25px] text-easybank-neutral-400 lg:mt-[19px] lg:w-7/12 lg:text-left lg:text-[18px] lg:leading-[28px] lg:tracking-[-.3px]">
        We leverage Open Banking to turn your bank account into your financial
        hub. Control your finances like never before.
      </p>
      <div className="mt-14 flex flex-col items-center gap-8 lg:mt-[71px] lg:grid lg:w-full lg:grid-cols-4 lg:grid-rows-1 lg:items-start lg:gap-[28.5px]">
        {features.map((feature, index) => {
          return <Feature key={index} {...feature} />;
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
}: HTMLProps<HTMLDivElement> & Feature) {
  return (
    <div
      {...props}
      className={twMerge(
        "flex flex-col items-center lg:items-start",
        className,
      )}
    >
      <Icon variant={icon} />
      <h3 className="mt-7 text-[20px] font-light leading-none tracking-[-0.4px] text-easybank-primary-blue lg:mt-[43px] lg:text-left lg:text-[24px]">
        {heading}
      </h3>
      <p className="mt-[20px] text-center text-[15px] leading-[25px] tracking-[-0.25px] text-easybank-neutral-400 lg:mt-7 lg:text-left lg:text-[16px] lg:leading-[26px]">
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
}: HTMLProps<HTMLDivElement> & Article) {
  return (
    <div
      className={twMerge(
        "h-[394px] w-full overflow-hidden rounded-[5px] shadow shadow-easybank-primary-blue/5 max-lg:max-w-screen-sm",
        className,
      )}
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
    <div className="bg-easybank-neutral-200">
      <Intro />
      <Features />
      <LatestArticles />
    </div>
  );
}

function SocialIcons() {
  const socialMedia: { icon: IconVariant; href: string }[] = [
    {
      icon: "facebook",
      href: "",
    },
    {
      icon: "youtube",
      href: "",
    },
    {
      icon: "twitter",
      href: "",
    },
    {
      icon: "pinterest",
      href: "",
    },
    {
      icon: "instagram",
      href: "",
    },
  ];
  return (
    <div className="mt-8 flex items-center gap-[15.5px] lg:mt-auto lg:gap-[12.5px]">
      {socialMedia.map(({ href, icon }) => {
        return (
          <a
            href={href}
            key={icon}
            className="flex h-6 items-center justify-center lg:h-5"
          >
            <Icon
              className="h-6 text-white hover:text-easybank-primary-green lg:h-5"
              variant={icon}
            />
          </a>
        );
      })}
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative bg-easybank-primary-blue pb-[43.5px] pt-[40px] lg:pb-[48px] lg:pt-[48px]">
      <div className="flex flex-col items-center lg:h-[95px] lg:flex-wrap lg:items-start lg:px-[165px]">
        <Logo variant="footer" />
        <SocialIcons />
        <nav className="mt-[37px] lg:-ml-[30px] lg:mt-0 lg:h-full lg:py-[6.5px]">
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
        </nav>
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

// SVG's

function Logo({
  variant,
  ...props
}: HTMLProps<SVGSVGElement> & { variant?: "header" | "footer" }) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={139} height={20}>
      <defs>
        <linearGradient id="a" x1="72.195%" x2="17.503%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#33D35E" />
          <stop offset="100%" stopColor="#2AB6D9" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fill={!variant || variant === "header" ? "#2D314D" : "#FFFFFF"}
          fillRule="nonzero"
          d="M37.754 15.847c2.852 0 5.152-1.622 5.952-4.216h-3.897c-.376.665-1.14 1.066-2.055 1.066-1.237 0-2.065-.674-2.32-1.978h8.44c.051-.352.081-.694.081-1.037 0-3.335-2.537-5.95-6.201-5.95-3.568 0-6.175 2.564-6.175 6.049 0 3.473 2.628 6.066 6.175 6.066zm2.344-7.297h-4.596c.317-1.129 1.11-1.749 2.252-1.749 1.181 0 2 .613 2.344 1.75zm10.946 7.296c1.32 0 2.5-.434 3.43-1.188l.336.804h3.027V4.093h-2.919l-.4.88c-.94-.775-2.135-1.222-3.474-1.222-3.476 0-5.961 2.505-5.961 6.026 0 3.533 2.485 6.07 5.961 6.07zm.524-3.467c-1.467 0-2.545-1.108-2.545-2.593 0-1.475 1.069-2.583 2.545-2.583 1.466 0 2.544 1.108 2.544 2.583 0 1.485-1.078 2.593-2.544 2.593zm13.123 3.467c3.02 0 5.025-1.554 5.025-3.93 0-2.883-2.387-3.256-4.183-3.575-1.08-.193-1.95-.344-1.95-.99 0-.527.422-.838 1.05-.838.71 0 1.197.337 1.197 1.063h3.667c-.044-2.303-1.92-3.843-4.816-3.843-2.912 0-4.854 1.47-4.854 3.75 0 2.757 2.337 3.289 4.1 3.574 1.092.181 1.952.368 1.952 1.024 0 .587-.543.88-1.116.88-.742 0-1.32-.383-1.32-1.214h-3.77c.036 2.463 1.919 4.1 5.018 4.1zm8.1 3.858c2.936 0 4.344-1.257 5.877-4.736l4.764-10.863h-4.206l-2.249 6.263-2.412-6.263H70.31l4.698 10.43c-.53 1.414-.983 1.804-2.48 1.804H71.45v3.365h1.341zm18.504-3.858c3.5 0 5.973-2.515 5.973-6.048S94.796 3.75 91.295 3.75a5.332 5.332 0 00-2.825.784V0H84.6v15.474h2.897l.37-.844c.923.771 2.102 1.216 3.428 1.216zm-.523-3.467c-1.467 0-2.545-1.108-2.545-2.58 0-1.486 1.078-2.594 2.545-2.594 1.466 0 2.544 1.108 2.544 2.593 0 1.473-1.087 2.58-2.544 2.58zm13.598 3.467c1.32 0 2.5-.434 3.43-1.188l.336.804h3.027V4.093h-2.918l-.401.88c-.939-.775-2.135-1.222-3.474-1.222-3.476 0-5.96 2.505-5.96 6.026 0 3.533 2.484 6.07 5.96 6.07zm.524-3.467c-1.467 0-2.545-1.108-2.545-2.593 0-1.475 1.07-2.583 2.545-2.583 1.467 0 2.545 1.108 2.545 2.583 0 1.485-1.078 2.593-2.545 2.593zm12.653 3.095V9.403c0-1.447.702-2.3 1.923-2.3.986 0 1.483.657 1.483 1.98v6.39h3.915V8.543c0-2.897-1.733-4.773-4.373-4.773-1.47 0-2.733.565-3.58 1.508l-.537-1.172h-2.747v11.369h3.916zm13.748 0v-4.808l2.848 4.808h4.616l-3.902-5.95 3.543-5.419h-4.397l-2.708 4.454V0h-3.916v15.474h3.916z"
        />
        <g fill="url(#a)">
          <path d="M10.802 0L0 19.704h5.986L16.789 0z" />
          <path opacity=".5" d="M18.171 0L7.368 19.704h5.986L24.157 0z" />
          <path opacity=".15" d="M25.539 0L14.737 19.704h5.986L31.525 0z" />
        </g>
      </g>
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
}: { variant: IconVariant } & HTMLProps<SVGSVGElement>) {
  switch (variant) {
    case "api":
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width={72}
          height={72}
        >
          <defs>
            <linearGradient id="a" x1="0%" x2="99.58%" y1="0%" y2="99.58%">
              <stop offset="0%" stopColor="#33D35E" />
              <stop offset="100%" stopColor="#2AB6D9" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <circle cx={36} cy={36} r={36} fill="url(#a)" />
            <path
              fill="#FFF"
              fillRule="nonzero"
              d="M26.118 28.339a.586.586 0 111.135.292c-.04.156-.06.317-.06.48V42.89c0 1.058.86 1.919 1.918 1.919H42.89c.163 0 .324-.02.48-.06a.586.586 0 11.292 1.134 3.102 3.102 0 01-.772.098h-1.293v1.767c0 .345.134.67.379.914l3.855 3.855a1.84 1.84 0 012.116.346 1.84 1.84 0 010 2.6c-.358.358-.829.537-1.3.537-.47 0-.941-.18-1.3-.538a1.84 1.84 0 01-.345-2.116l-3.855-3.855a2.448 2.448 0 01-.722-1.743V45.98h-1.333v2.545a.586.586 0 01-1.172 0V45.98h-1.333v9.434a.586.586 0 01-1.172 0V45.98h-1.333v2.545a.586.586 0 01-1.172 0V45.98h-1.333v5.187a1.841 1.841 0 011.253 1.742 1.84 1.84 0 01-1.839 1.838 1.84 1.84 0 01-1.838-1.838c0-.809.525-1.497 1.252-1.742V45.98h-1.293a3.094 3.094 0 01-3.09-3.091v-1.293h-1.768c-.345 0-.67.134-.914.379l-3.854 3.853c.125.251.192.53.192.818 0 .492-.191.953-.538 1.3a1.827 1.827 0 01-1.3.539c-.492 0-.953-.191-1.3-.539a1.827 1.827 0 01-.539-1.3c0-.49.191-.952.538-1.3a1.827 1.827 0 011.3-.538c.29 0 .567.067.819.192l3.853-3.854a2.448 2.448 0 011.743-.722h1.767v-1.333h-2.545a.586.586 0 010-1.172h2.545v-1.333h-9.434a.586.586 0 010-1.172h9.434v-1.333h-2.545a.586.586 0 010-1.172h2.545v-1.333h-5.187a1.841 1.841 0 01-1.742 1.252 1.84 1.84 0 01-1.838-1.838 1.84 1.84 0 011.838-1.839c.809 0 1.497.526 1.742 1.253h5.187v-1.293c0-.261.033-.521.098-.772zm20.528 25.156a.665.665 0 00-.47 1.138.667.667 0 10.47-1.138zM30.99 52.243a.667.667 0 10.002 1.334.667.667 0 00-.002-1.334zM17.838 45.98a.662.662 0 00-.47.195.662.662 0 00-.196.471.662.662 0 00.667.667.662.662 0 00.667-.667.662.662 0 00-.196-.47.662.662 0 00-.472-.196zM36 16c.324 0 .586.262.586.586v9.434h1.333v-2.545a.586.586 0 011.172 0v2.545h1.333v-5.187a1.841 1.841 0 01-1.252-1.742 1.84 1.84 0 011.838-1.838 1.84 1.84 0 011.839 1.838c0 .809-.526 1.497-1.253 1.742v5.187h1.293a3.094 3.094 0 013.09 3.091v1.293h1.768c.345 0 .67-.135.914-.379l3.854-3.853a1.83 1.83 0 01-.192-.818c0-.492.191-.953.539-1.3a1.827 1.827 0 011.3-.539c.49 0 .952.191 1.3.539.347.347.538.809.538 1.3 0 .49-.191.952-.538 1.3a1.827 1.827 0 01-1.3.538 1.83 1.83 0 01-.819-.192l-3.853 3.854a2.448 2.448 0 01-1.743.722H45.98v1.333h2.545a.586.586 0 010 1.172H45.98v1.333h9.434a.586.586 0 110 1.172H45.98v1.333h2.545a.586.586 0 010 1.172H45.98v1.333h5.187a1.841 1.841 0 011.742-1.252 1.84 1.84 0 011.838 1.838 1.84 1.84 0 01-1.838 1.838 1.841 1.841 0 01-1.742-1.252H45.98v1.293a3.1 3.1 0 01-.097.771.586.586 0 11-1.135-.291c.04-.156.06-.317.06-.48V29.11c0-1.058-.861-1.919-1.92-1.919H29.112c-.163 0-.324.02-.48.06a.586.586 0 11-.292-1.134c.251-.065.51-.098.772-.098h1.293v-1.767c0-.345-.134-.67-.379-.914l-3.855-3.855a1.841 1.841 0 01-2.116-.345 1.84 1.84 0 010-2.6 1.84 1.84 0 012.6 0 1.84 1.84 0 01.345 2.116l3.855 3.855c.466.466.722 1.085.722 1.743v1.767h1.333v-2.545a.586.586 0 011.172 0v2.545h1.333v-9.434c0-.324.262-.586.586-.586zm1.761 13.151c1.295 0 2.348.966 2.348 2.152a2 2 0 01-.058.472c1.255.345 2.171 1.406 2.171 2.66 0 .702-.3 1.372-.815 1.878.516.507.815 1.177.815 1.879 0 .955-.544 1.84-1.414 2.344-.087 1.288-1.262 2.313-2.694 2.313A2.796 2.796 0 0136 41.914a2.796 2.796 0 01-2.114.935c-1.488 0-2.7-1.106-2.7-2.465-.876-.579-1.408-1.509-1.408-2.505 0-.655.226-1.27.617-1.777a2.573 2.573 0 01-.617-1.668c0-1.253.916-2.314 2.171-2.66a2 2 0 01-.058-.47c0-1.187 1.053-2.153 2.348-2.153.7 0 1.33.284 1.761.732a2.437 2.437 0 011.761-.732zm0 1.172c-.648 0-1.175.44-1.175.98a.586.586 0 01-1.172 0c0-.54-.527-.98-1.175-.98-.649 0-1.176.44-1.176.98a.87.87 0 00.215.562v.001l.029.037.008.01.013.022a.586.586 0 01-.497.895l-.016-.001c-1.03.006-1.865.724-1.866 1.605 0 .319.112.625.32.886a3.57 3.57 0 011.075-.438.586.586 0 01.262 1.142c-.975.224-1.657.987-1.657 1.855 0 .481.216.942.586 1.292.1-.163.222-.315.362-.455a.586.586 0 11.826.831c-.235.234-.365.531-.365.837 0 .713.686 1.293 1.528 1.293.843 0 1.528-.58 1.528-1.293V39.13c0-.537-.401-1.025-.999-1.212a.586.586 0 01.351-1.118c.234.073.45.175.648.3v-3.254a.586.586 0 011.172 0v.749c.434-.274.96-.434 1.527-.434a.586.586 0 010 1.172c-.842 0-1.527.58-1.527 1.292v3.758c0 .713.685 1.293 1.527 1.293.843 0 1.528-.58 1.528-1.293 0-.538-.401-1.025-.999-1.213a.586.586 0 11.352-1.118 2.63 2.63 0 011.54 1.24c.324-.294.516-.688.516-1.101 0-.554-.337-1.063-.901-1.36a.586.586 0 010-1.037c.564-.298.901-.807.901-1.36 0-.882-.835-1.6-1.865-1.606h-.024a2.118 2.118 0 00-.819.164.586.586 0 11-.455-1.08c.306-.13.628-.21.962-.241a.824.824 0 00.088-.369c0-.54-.528-.98-1.176-.98zm15.148 10.02a.667.667 0 10.001 1.335.667.667 0 000-1.334zm-33.818-10.02a.667.667 0 10.001 1.335.667.667 0 00-.001-1.335zm35.07-5.636a.662.662 0 00-.47.195.662.662 0 00-.196.472.662.662 0 00.667.667c.178 0 .345-.07.47-.196a.662.662 0 00.196-.471.662.662 0 00-.195-.472.662.662 0 00-.471-.195zm-13.15-6.263a.667.667 0 100 1.335.667.667 0 000-1.335zm-15.657-1.252a.667.667 0 10.002 1.333.667.667 0 00-.002-1.333z"
            />
          </g>
        </svg>
      );
    case "budgeting":
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width={72}
          height={72}
        >
          <defs>
            <linearGradient id="a" x1="0%" x2="99.58%" y1="0%" y2="99.58%">
              <stop offset="0%" stopColor="#33D35E" />
              <stop offset="100%" stopColor="#2AB6D9" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <circle cx={36} cy={36} r={36} fill="url(#a)" />
            <path
              fill="#FFF"
              fillRule="nonzero"
              d="M44.633 16a3.096 3.096 0 013.092 3.092v7.57c5.23.286 9.393 4.365 9.393 9.338 0 4.973-4.162 9.052-9.393 9.338v7.57A3.095 3.095 0 0144.633 56H27.099a3.095 3.095 0 01-3.092-3.092v-7.24a.587.587 0 111.174 0v3.522h21.37v-3.852a10.479 10.479 0 01-2.89-.568l-4.383 2.391c-.466.254-1.013-.22-.833-.716l1.308-3.596h-6.705a.592.592 0 01-.415-.172l-4.697-4.696a.593.593 0 01-.172-.415V24.728c0-.324.263-.587.587-.587h15.03c.324 0 .587.263.587.587v2.402c.819-.258 1.685-.419 2.583-.468v-4.478H25.18v20.704a.587.587 0 11-1.174 0V19.092A3.096 3.096 0 0127.099 16zm1.918 34.364H25.18v2.544a1.92 1.92 0 001.918 1.918h17.534a1.92 1.92 0 001.918-1.918v-2.544zm-9.433.705c.325 0 .587.262.587.587v1.878a.587.587 0 01-.587.587h-2.505a.587.587 0 01-.587-.587v-1.878c0-.325.263-.587.587-.587zm-.587 1.174h-1.33v.704h1.33v-.704zM47.138 27.82c-4.856 0-8.806 3.67-8.806 8.18 0 2.217.94 4.293 2.647 5.846.177.16.239.41.157.635l-1.056 2.905 3.251-1.773a.587.587 0 01.49-.034 9.343 9.343 0 003.317.601c4.856 0 8.806-3.67 8.806-8.18s-3.95-8.18-8.806-8.18zm0 1.33c.324 0 .587.264.587.588v1.291h.04a2.469 2.469 0 012.465 2.466v.626a.587.587 0 11-1.174 0v-.626c0-.712-.58-1.291-1.292-1.291h-.94c-.884 0-1.604.72-1.604 1.604 0 .885.72 1.605 1.605 1.605h.626a2.782 2.782 0 012.779 2.779c0 1.44-1.1 2.627-2.505 2.765v1.305a.587.587 0 11-1.174 0v-1.291h-.04a2.469 2.469 0 01-2.465-2.466.587.587 0 111.174 0c0 .712.58 1.291 1.292 1.291h.939c.885 0 1.605-.72 1.605-1.604 0-.885-.72-1.605-1.605-1.605h-.626a2.782 2.782 0 01-2.78-2.779c0-1.44 1.102-2.627 2.506-2.765v-1.305c0-.324.263-.587.587-.587zm-4.345-3.835H28.938v11.663h4.11c.324 0 .587.263.587.588v4.11h5.567c-1.327-1.622-2.044-3.593-2.044-5.676 0-1.112.208-2.18.59-3.17h-6.266a.587.587 0 110-1.174h6.82c.399-.711.893-1.369 1.466-1.957h-2.023a.587.587 0 110-1.174h3.13c.076 0 .148.014.214.04.53-.38 1.1-.71 1.704-.985v-2.265zM32.461 38.153h-2.692l2.692 2.692v-2.692zm3.405-3.366a.587.587 0 110 1.174h-4.384a.587.587 0 110-1.174zm-.626-6.263a.587.587 0 110 1.175h-3.758a.587.587 0 110-1.175zm9.393-11.35H27.099a1.92 1.92 0 00-1.918 1.918v1.918h21.37v-1.918a1.92 1.92 0 00-1.918-1.918zm-7.515 1.33a.587.587 0 110 1.175h-2.505a.587.587 0 110-1.174z"
            />
          </g>
        </svg>
      );
    case "close":
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width={18}
          height={19}
        >
          <g fill="#2D314D" fillRule="evenodd">
            <path d="M.868.661l16.97 16.97-.706.708L.162 1.369z" />
            <path d="M.161 17.632L17.131.662l.708.706-16.97 16.97z" />
          </g>
        </svg>
      );
    case "facebook":
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          className={twMerge("h-5", props.className)}
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.793C0 19.506.494 20 1.104 20h9.58v-7.745H8.076V9.237h2.606V7.01c0-2.583 1.578-3.99 3.883-3.99 1.104 0 2.052.082 2.329.119v2.7h-1.598c-1.254 0-1.496.597-1.496 1.47v1.928h2.989l-.39 3.018h-2.6V20h5.098c.608 0 1.102-.494 1.102-1.104V1.104C20 .494 19.506 0 18.896 0z"
          />
        </svg>
      );
    case "hamburger":
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={11}
        >
          <g fill="#2D314D" fillRule="evenodd">
            <path d="M0 0h24v1H0zM0 5h24v1H0zM0 10h24v1H0z" />
          </g>
        </svg>
      );
    case "instagram":
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          className={twMerge("h-5", props.className)}
          viewBox="0 0 21 20"
        >
          <path
            fill="currentColor"
            d="M10.333 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.976 1.409 4.1 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.058 4.042-.124 2.687-1.386 3.975-4.099 4.099-1.055.048-1.37.058-4.042.058-2.67 0-2.986-.01-4.04-.058-2.717-.124-3.976-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zm0-1.802C7.618 0 7.278.012 6.211.06 2.579.227.56 2.242.394 5.877.345 6.944.334 7.284.334 10s.011 3.057.06 4.123c.166 3.632 2.181 5.65 5.816 5.817 1.068.048 1.408.06 4.123.06 2.716 0 3.057-.012 4.124-.06 3.628-.167 5.651-2.182 5.816-5.817.049-1.066.06-1.407.06-4.123s-.011-3.056-.06-4.122C20.11 2.249 18.093.228 14.458.06 13.39.01 13.049 0 10.333 0zm0 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.339-9.87a1.2 1.2 0 10-.001 2.4 1.2 1.2 0 000-2.4z"
          />
        </svg>
      );
    case "onboarding":
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width={72}
          height={72}
        >
          <defs>
            <linearGradient id="a" x1="0%" x2="99.58%" y1="0%" y2="99.58%">
              <stop offset="0%" stopColor="#33D35E" />
              <stop offset="100%" stopColor="#2AB6D9" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <circle cx={36} cy={36} r={36} fill="url(#a)" />
            <path
              fill="#FFF"
              fillRule="nonzero"
              d="M36 16a4.522 4.522 0 014.516 4.516 4.514 4.514 0 01-1.951 3.713c2.647 1.031 4.532 3.601 4.532 6.61v3.226h-6.452v.645c0 .356.29.645.645.645h1.29c1.068 0 1.936.868 1.936 1.935v1.29a1.938 1.938 0 01-1.935 1.936h-1.153l.69.69-.964 1.59c.047.1.081.2.124.3h6.287a5.146 5.146 0 01-1.759-3.87 5.167 5.167 0 015.162-5.161 5.167 5.167 0 015.161 5.16 5.154 5.154 0 01-1.904 4c3.283.621 5.775 3.507 5.775 6.969V56H41.161v-7.42a.969.969 0 00-.967-.967h-.968v1.15l-1.802.443c-.08.215-.17.43-.269.642l.963 1.59-3.453 3.454-1.59-.963c-.214.1-.428.19-.642.268L31.99 56h-4.883l-.442-1.802a8.519 8.519 0 01-.642-.268l-1.59.962-3.454-3.453.963-1.59a8.632 8.632 0 01-.268-.642l-1.803-.443V43.88l1.803-.443c.079-.214.169-.428.268-.642l-.963-1.59.69-.69h-1.153a1.938 1.938 0 01-1.935-1.935v-1.29c0-1.068.868-1.936 1.935-1.936h1.29a.645.645 0 00.646-.645v-.645H16v-3.226c0-3.009 1.885-5.579 4.532-6.61a4.514 4.514 0 01-1.951-3.713A4.522 4.522 0 0123.097 16a4.522 4.522 0 014.516 4.516 4.514 4.514 0 01-1.952 3.713 7.126 7.126 0 013.887 3.67 7.128 7.128 0 013.887-3.67 4.514 4.514 0 01-1.951-3.713A4.522 4.522 0 0136 16zm12.903 28.387H31.806a.969.969 0 000 1.936h8.388a2.26 2.26 0 012.258 2.258v6.129h9.032v-7.097h1.29v7.097h1.936v-4.516a5.813 5.813 0 00-5.807-5.807zm-17.925-6.452h-2.86l-.37 1.514-.347.11a7.029 7.029 0 00-1.113.465l-.32.167-1.339-.81-2.021 2.022.81 1.338-.168.32a7.08 7.08 0 00-.465 1.114l-.11.346-1.514.372v2.86l1.514.37.109.347c.117.368.273.743.466 1.113l.167.32-.81 1.339 2.021 2.021 1.338-.81.322.168c.37.192.744.349 1.114.466l.344.11.373 1.513h2.86l.37-1.514.346-.109a7.029 7.029 0 001.113-.466l.322-.167 1.338.81 2.021-2.021-.81-1.338.167-.322c.193-.37.35-.744.467-1.114l.11-.344 1.512-.373v-.14H35.21a5.813 5.813 0 01-5.662 4.517 5.813 5.813 0 01-5.806-5.806 5.813 5.813 0 015.806-5.807c1.936 0 3.74.985 4.813 2.581h1.503l-.017-.034-.167-.322.81-1.338-2.022-2.021-1.338.81-.321-.167a7.08 7.08 0 00-1.113-.466l-.346-.11-.372-1.514zm-1.43 3.871a4.522 4.522 0 00-4.516 4.517 4.522 4.522 0 004.516 4.516 4.521 4.521 0 004.327-3.226h-1.371a3.225 3.225 0 11-1.71-4.265 2.234 2.234 0 011.012-.251h.898a4.533 4.533 0 00-3.156-1.29zm0 2.581a1.938 1.938 0 00-1.935 1.936c0 1.067.868 1.935 1.935 1.935.623 0 1.184-.3 1.542-.773a2.253 2.253 0 01-1.542-2.13c0-.337.08-.653.212-.94-.071-.009-.14-.028-.212-.028zm17.42-9.032a3.875 3.875 0 00-3.871 3.87 3.875 3.875 0 003.87 3.872 3.875 3.875 0 003.872-3.871 3.875 3.875 0 00-3.871-3.871zm-11.613-1.29H23.742v.645a1.938 1.938 0 01-1.936 1.935h-1.29a.645.645 0 00-.645.645v1.29c0 .357.289.646.645.646h2.443l1.473-1.472 1.59.962c.213-.1.428-.189.642-.268l.443-1.803h4.883l.443 1.803c.214.08.428.169.642.268l1.59-.962 1.472 1.472h2.444a.645.645 0 00.645-.645v-1.29a.645.645 0 00-.645-.646h-1.29a1.938 1.938 0 01-1.936-1.935v-.645zm-12.258-9.033a5.813 5.813 0 00-5.807 5.807v1.935h1.936v-5.161h1.29v5.161h5.161v-5.161h1.29v5.161h1.936V30.84a5.813 5.813 0 00-5.806-5.807zm12.903 0a5.813 5.813 0 00-5.806 5.807v1.935h1.935v-5.161h1.29v5.161h5.162v-5.161h1.29v5.161h1.935V30.84A5.813 5.813 0 0036 25.032zm15.484-1.29A4.522 4.522 0 0156 28.258a4.522 4.522 0 01-4.516 4.516h-7.097v-4.516a4.522 4.522 0 014.516-4.516zm0 1.29h-2.58a3.23 3.23 0 00-3.227 3.226v3.226h5.807a3.23 3.23 0 003.226-3.226 3.23 3.23 0 00-3.226-3.226zm-3.226 3.871v1.29h-1.29v-1.29h1.29zm2.58 0v1.29h-1.29v-1.29h1.29zm2.581 0v1.29h-1.29v-1.29h1.29zm0-2.58v1.29h-6.451v-1.29h6.451zM23.097 17.29a3.23 3.23 0 00-3.226 3.226 3.23 3.23 0 003.226 3.226 3.23 3.23 0 003.226-3.226 3.23 3.23 0 00-3.226-3.226zm12.903 0a3.23 3.23 0 00-3.226 3.226A3.23 3.23 0 0036 23.742a3.23 3.23 0 003.226-3.226A3.23 3.23 0 0036 17.29z"
            />
          </g>
        </svg>
      );
    case "online":
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width={72}
          height={72}
        >
          <defs>
            <linearGradient id="a" x1="0%" x2="99.58%" y1="0%" y2="99.58%">
              <stop offset="0%" stopColor="#33D35E" />
              <stop offset="100%" stopColor="#2AB6D9" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <circle cx={36} cy={36} r={36} fill="url(#a)" />
            <path
              fill="#FFF"
              fillRule="nonzero"
              d="M45.984 16a3.336 3.336 0 013.332 3.332v3.727l4.11 4.118a8.72 8.72 0 012.553 6.141v21.994a.666.666 0 01-.667.667H43.32a.666.666 0 01-.667-.667V48.84l-.382-.612a9.632 9.632 0 01-.83-8.553L25.799 45.7a3.332 3.332 0 01-4.307-1.91l-2.504-6.502A3.325 3.325 0 0116 33.99V19.332A3.336 3.336 0 0119.332 16zm8.662 33.316h-10.66v5.33h10.66v-5.33zm-7.996 1.332v1.333h-1.332v-1.333h1.332zm3.675-24.69l2.255 5.855a3.332 3.332 0 01-1.91 4.305l-.683.266 2.465 2.466-.942.942-10.618-10.615a2.222 2.222 0 00-3.209 3.073l5.46 5.957c.196.213.232.53.088.78a8.309 8.309 0 00.169 8.534l.289.462h10.957V33.318a7.379 7.379 0 00-2.162-5.198l-2.159-2.163zm-9.798 11.36H29.565v.004l-7.953 3.065 1.124 2.923a1.999 1.999 0 002.584 1.147l16.073-6.195-.866-.944zm-14.658.004h-5.44l.702 1.824 4.738-1.824zm20.115-19.99H19.332a2 2 0 00-2 2V33.99a2 2 0 002 2h19.974l-2.602-2.843a3.555 3.555 0 015.13-4.916l6.104 6.105c.025-.114.04-.23.045-.346V23.582l-.006-.015h.006v-4.235a2 2 0 00-1.999-2zm3.332 9.712v6.946a3.332 3.332 0 01-.282 1.333l1.156-.446a1.999 1.999 0 001.148-2.584l-2.022-5.25zm-27.32 4.281v1.333h-2.664v-1.333h2.665zm11.994 0v1.333h-2.665v-1.333h2.665zm-11.993-3.998v1.333h-2.665v-1.333h2.665zm3.998 0v1.333h-2.666v-1.333h2.666zm3.998 0v1.333h-2.666v-1.333h2.666zm3.997 0v1.333h-2.665v-1.333h2.665zm-10.394-8.662c.957 0 1.732.776 1.732 1.733v3.198c0 .957-.775 1.732-1.732 1.732h-3.198a1.732 1.732 0 01-1.733-1.732v-3.198c0-.957.776-1.733 1.733-1.733zm0 1.333h-3.198a.4.4 0 00-.4.4v.932h1.332v1.333h-1.332v.933c0 .22.179.4.4.4h3.198a.4.4 0 00.4-.4v-.933h-1.333V21.33h1.333v-.932a.4.4 0 00-.4-.4zm21.722-.666v1.998h-1.333v-1.998h1.333zm-2.666 0v1.998H41.32v-1.998h1.332zm-2.665 0v1.998h-1.332v-1.998h1.332zm-2.665 0v1.998h-1.333v-1.998h1.333z"
            />
          </g>
        </svg>
      );
    case "pinterest":
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          className={twMerge("h-5", props.className)}
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            d="M10 0C4.478 0 0 4.477 0 10c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.545 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.522 0 10-4.477 10-10S15.522 0 10 0z"
          />
        </svg>
      );
    case "twitter":
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          className={twMerge(props.className, "h-[21px] lg:h-[18px]")}
          viewBox="0 0 21 18"
        >
          <path
            fill="currentColor"
            d="M20.667 2.797a8.192 8.192 0 01-2.357.646 4.11 4.11 0 001.804-2.27 8.22 8.22 0 01-2.606.996A4.096 4.096 0 0014.513.873c-2.649 0-4.595 2.472-3.997 5.038a11.648 11.648 0 01-8.457-4.287 4.109 4.109 0 001.27 5.478A4.086 4.086 0 011.47 6.59c-.045 1.901 1.317 3.68 3.29 4.075a4.113 4.113 0 01-1.853.07 4.106 4.106 0 003.834 2.85 8.25 8.25 0 01-6.075 1.7 11.616 11.616 0 006.29 1.843c7.618 0 11.922-6.434 11.662-12.205a8.354 8.354 0 002.048-2.124z"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 21 20"
          className={twMerge("h-5", props.className)}
        >
          <path
            fill="currentColor"
            d="M10.333 0c-5.522 0-10 4.478-10 10 0 5.523 4.478 10 10 10 5.523 0 10-4.477 10-10 0-5.522-4.477-10-10-10zm3.701 14.077c-1.752.12-5.653.12-7.402 0C4.735 13.947 4.514 13.018 4.5 10c.014-3.024.237-3.947 2.132-4.077 1.749-.12 5.651-.12 7.402 0 1.898.13 2.118 1.059 2.133 4.077-.015 3.024-.238 3.947-2.133 4.077zM8.667 8.048l4.097 1.949-4.097 1.955V8.048z"
          />
        </svg>
      );
  }
}
