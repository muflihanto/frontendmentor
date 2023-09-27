import Head from "next/head";
import Image from "next/image";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function Blogr() {
  return (
    <div className="App lg:bg-blogr-neutral-200/10 w-screen overflow-hidden">
      <Head>
        <title>Frontend Mentor | [Blogr]</title>
      </Head>
      <Header />
      <Main />
      <Footer />
      {/* <Slider
        basePath="/blogr-landing-page/design/"
        absolutePath="/blogr-landing-page/design/active-states.jpg"
        // absolutePath="/blogr-landing-page/design/mobile-menu.jpg"
      /> */}
    </div>
  );
}

function Main() {
  return (
    <div>
      <Future />
      <Infrastructure />
      <OtherFeatures />
    </div>
  );
}

const navItems = [
  {
    parent: "Product",
    children: ["Overview", "Pricing", "Marketplace", "Features", "Integrations"],
  },
  {
    parent: "Company",
    children: ["About", "Team", "Blog", "Careers"],
  },
  {
    parent: "Connect",
    children: ["Contact", "Newsletter", "LinkedIn"],
  },
];

function OtherFeatures() {
  const articles = [
    {
      h3: "Free, open, simple",
      p: "Blogr is a free and open source application backed by a large community of helpful developers. It supports features such as code syntax highlighting, RSS feeds, social media integration, third-party commenting tools, and works seamlessly with Google Analytics. The architecture is clean and is relatively easy to learn.",
    },
    {
      h3: "Powerful tooling",
      p: "Batteries included. We built a simple and straightforward CLI tool that makes customization and deployment a breeze, but capable of producing even the most complicated sites.",
    },
  ];
  return (
    <section className="mt-[88.75px] flex flex-col text-center lg:mb-[193px] lg:mt-[232px] lg:h-[600px] lg:flex-row lg:items-center">
      <h2 className="sr-only">Other Features</h2>
      <header className="relative h-[372px] w-full lg:h-full lg:w-1/2">
        <div className="absolute left-[1px] top-0 aspect-[203/166] w-[375px] lg:w-[974px] lg:-translate-x-[280px] lg:-translate-y-[121px]">
          <Image
            loader={({ width, src }) => {
              if (width > 1023) {
                return src + "illustration-laptop-desktop.svg";
              }
              return src + "illustration-laptop-mobile.svg";
            }}
            src="/blogr-landing-page/images/"
            alt="Illustration Laptop"
            className="scale-[calc(180/135.5)] object-contain lg:transform-none"
            fill
          />
        </div>
      </header>
      <div className="mt-0 flex flex-col gap-[44px] lg:-mt-9 lg:w-1/2 lg:gap-[77px] lg:pl-[15px] lg:pr-40">
        {articles.map((el, index) => {
          return (
            <Article
              type="other"
              key={index}
              {...el}
            />
          );
        })}
      </div>
    </section>
  );
}

function Infrastructure() {
  return (
    <section className="from-blogr-gradient-blue-200 to-blogr-gradient-blue-100 text-blogr-neutral-100 relative mt-[267px] h-[625px] rounded-bl-[100px] rounded-tr-[100px] bg-[linear-gradient(150deg,_var(--tw-gradient-stops))] pt-[225.25px] before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-bl-[100px] before:rounded-tr-[100px] before:bg-[url('/blogr-landing-page/images/bg-pattern-circles.svg')] before:bg-[length:600px_600px] before:bg-[top_-233px_left_50%] before:bg-no-repeat lg:mt-[57px] lg:flex lg:h-[400px] lg:items-center lg:bg-[linear-gradient(120deg,_var(--tw-gradient-stops))] lg:pt-0 lg:before:bg-[length:calc(169*6px)_calc(806/475*600px)] lg:before:bg-[top_-507px_left_-49.75%]">
      <header className="lg:relative lg:h-full lg:w-1/2">
        <div className="absolute top-0 mx-auto aspect-[276/290] w-[375px] -translate-y-[calc(50%-14px)] lg:right-0 lg:w-[calc(212/144*375px)] lg:-translate-x-[7.7%] lg:-translate-y-[calc(12%)]">
          <Image
            src="/blogr-landing-page/images/illustration-phones.svg"
            alt="Illustration Phone"
            className="scale-[calc(301/295*100%)] object-contain lg:scale-100"
            fill
          />
        </div>
      </header>
      <div className="px-8 lg:w-1/2 lg:pl-4 lg:pr-40 lg:pt-[10px]">
        <h2 className="font-overpass relative z-10 text-center text-[40px] font-medium leading-[50px] -tracking-[1.25px] lg:text-left">State of the Art Infrastructure</h2>
        <p className="font-overpass text-blogr-neutral-200 relative z-10 mt-[18px] text-center text-[17px] font-light leading-[28px] tracking-[0.03px] lg:text-left">With reliability and speed in mind, worldwide data centers provide the backbone for ultra-fast connectivity. This ensures your site will load instantly, no matter where your readers are, keeping your site competitive.</p>
      </div>
    </section>
  );
}

function Future() {
  const articles = [
    {
      h3: "Introducing an extensible editor",
      p: "Blogr features an exceedingly intuitive interface which lets you focus on one thing: creating content. The editor supports management of multiple blogs and allows easy manipulation of embeds such as images, videos, and Markdown. Extensibility with plugins and themes provide easy ways to add functionality or change the looks of a blog.",
    },
    {
      h3: "Robust content management",
      p: "Flexible content management enables users to easily move through posts. Increase the usability of your blog by adding customized categories, sections, format, or flow. With this functionality, you’re in full control.",
    },
  ];
  return (
    <section className="pt-[99px] text-center lg:relative lg:pb-[195px] lg:pt-[149px]">
      <h2 className="font-overpass text-blogr-primary-blue text-[28px] font-medium -tracking-[0.8px] lg:-translate-x-[2px] lg:text-[40px] lg:-tracking-[1.3px]">Designed for the future</h2>
      <div className="flex flex-col pt-[52px] lg:mt-[104px] lg:flex-row-reverse lg:items-center lg:gap-[32px] lg:px-[164px] lg:pt-0">
        <div className="w-full lg:h-[428px] lg:w-1/2">
          <div className="relative mx-auto aspect-[203/166] w-[375px] lg:absolute lg:top-[71px] lg:ml-[54px] lg:aspect-[925/882] lg:w-[925px]">
            <Image
              loader={({ width, src }) => {
                if (width > 1023) {
                  return src + "illustration-editor-desktop.svg";
                }
                return src + "illustration-editor-mobile.svg";
              }}
              src="/blogr-landing-page/images/"
              alt="Illustration Editor"
              className="scale-[calc(331.5/306.65)] object-contain lg:scale-100"
              fill
            />
          </div>
        </div>
        <div className="mt-[62px] flex flex-col gap-[43px] lg:mt-0 lg:w-1/2 lg:-translate-y-1 lg:gap-[77px]">
          {articles.map((el, index) => {
            return (
              <Article
                type="future"
                key={index}
                {...el}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

type ArticleProps = { h3: string; type: "future" | "other"; p: string };
function Article(props: ArticleProps) {
  return (
    <article className="group pl-8 pr-6 lg:px-0 lg:text-left">
      <h3 className="font-overpass text-blogr-primary-blue mx-auto px-2 text-[28px] font-semibold leading-[32px] -tracking-[0.2px] lg:px-0">{props.h3}</h3>
      <p className={`font-overpass text-blogr-neutral-300/80 text-[17px] font-normal leading-[28px] lg:mt-[26px] lg:text-[16px] lg:tracking-[0.45px] ${props.type === "future" ? "mt-[24px] group-first:mt-[15px] lg:group-first:mt-[26px]" : "mt-[25px] "}`}>{props.p}</p>
    </article>
  );
}

function Footer() {
  return (
    <footer className="bg-blogr-neutral-400 relative mt-[95px] flex flex-col items-center justify-center rounded-tr-[100px] pb-[76.95px] pt-[75px] text-[11px] lg:flex-row lg:items-start lg:justify-between lg:px-[164px] lg:pb-[75px] lg:pt-[70px]">
      <div className="relative aspect-[51/20] w-[102px]">
        <Image
          alt="Blogr Logo"
          src="/blogr-landing-page/images/logo.svg"
          className="object-contain"
          fill
        />
      </div>
      <div className="mt-[76px] flex flex-col justify-start gap-[46px] lg:mt-0 lg:w-[74.25%] lg:flex-row lg:pr-[20px] lg:pt-1 lg:-tracking-[0.4px]">
        {navItems.map((el, index) => {
          return (
            <nav
              key={index}
              className="lg:w-1/3"
            >
              <h3 className="text-blogr-neutral-100/90 font-ubuntu text-center text-[18px] font-medium lg:text-left lg:text-[16px]">{el.parent}</h3>
              <ul className="mt-[27px] flex flex-col items-center justify-center gap-[6px] lg:mt-[30px] lg:items-start lg:gap-[9px]">
                {el.children.map((el, index) => {
                  return (
                    <li
                      key={index}
                      className="text-blogr-neutral-200/80 lg:text-blogr-neutral-200/90 font-ubuntu text-[18px] font-normal hover:underline hover:decoration-2 lg:text-[16px]"
                    >
                      <a href="">{el}</a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          );
        })}
      </div>
      <div className="text-blogr-neutral-200 font-overpass absolute bottom-3 left-0 w-full text-center">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
          className="text-blogr-neutral-100 font-ubuntu font-bold hover:underline"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          href="https://github.com/muflihanto"
          target="_blank"
          rel="noreferrer"
          className="text-blogr-neutral-100 font-ubuntu font-bold hover:underline"
        >
          Muflihanto
        </a>
        .
      </div>
    </footer>
  );
}

type CollapsibleNavItemsProps = { navChildren: string[]; navParent: string };
function CollapsibleNavItems(props: CollapsibleNavItemsProps) {
  return (
    <details className="group/details lg:relative">
      <summary className="text-blogr-primary-blue/90 group/summary flex list-none items-center justify-center gap-2 text-[18px] font-semibold hover:cursor-pointer focus-visible:outline-none">
        <span className="group-open/details:text-blogr-primary-blue/75 lg:group-open/details:text-blogr-neutral-100/75 lg:text-blogr-neutral-100/75 lg:font-ubuntu group-hover/summary:font-bold group-hover/summary:tracking-[-.2px] group-hover/summary:underline lg:text-[16px] lg:font-medium">{props.navParent}</span>
        <Image
          src="/blogr-landing-page/images/icon-arrow-dark.svg"
          alt="Red Arrow Icon"
          width={10}
          height={7}
          className="block origin-center transition-all group-open/details:rotate-180 lg:hidden"
        />
        <Image
          src="/blogr-landing-page/images/icon-arrow-light.svg"
          alt="White Arrow Icon"
          width={10}
          height={7}
          className="hidden shrink-0 transition-all group-open/details:rotate-180 lg:block"
        />
      </summary>
      <ul className="bg-blogr-neutral-200/25 text-blogr-primary-blue/75 lg:text-blogr-primary-blue lg:font-ubuntu lg:bg-blogr-neutral-100 mb-[4px] mt-[18px] flex w-full flex-col items-center gap-[16px] rounded-md pb-[21px] pt-[25px] text-[16px] font-semibold lg:absolute lg:-left-6 lg:top-[30.5px] lg:w-[166px] lg:items-start lg:gap-[10.5px] lg:rounded-[4px] lg:px-6 lg:pb-[29px] lg:pt-[29px] lg:text-[15px] lg:font-medium lg:shadow-[0px_20px_25px_15px_rgba(0,0,0,.125)]">
        {props.navChildren.map((el, index) => {
          return (
            <li
              key={index}
              className="hover:font-bold"
            >
              <a href="">{el}</a>
            </li>
          );
        })}
      </ul>
    </details>
  );
}

function Header() {
  return (
    <header className="from-blogr-gradient-red-100 to-blogr-gradient-red-200 relative flex aspect-[375/600] h-[600px] w-screen flex-col items-center justify-center gap-[49px] rounded-bl-[100px] bg-[linear-gradient(150deg,_var(--tw-gradient-stops))] bg-auto bg-no-repeat before:absolute before:bottom-0 before:left-0 before:z-0 before:h-full before:w-full before:overflow-hidden before:rounded-bl-[100px] before:bg-[url('/blogr-landing-page/images/bg-pattern-intro-mobile.svg')] before:bg-[top_-244px_left_-335px] md:before:bg-[url('/blogr-landing-page/images/bg-pattern-intro-desktop.svg')] md:before:bg-[top_-1342px_right_-1295px] md:before:bg-no-repeat lg:justify-end lg:gap-[104px] lg:bg-[linear-gradient(110deg,_var(--tw-gradient-stops))] lg:bg-bottom lg:pb-[155px]">
      <nav className="group absolute top-0 z-20 flex h-[9rem] w-full items-center justify-between bg-transparent px-6 lg:mt-[21px] lg:h-[7.8rem] lg:justify-start lg:gap-[54px] lg:px-40">
        <div className="relative aspect-[51/20] h-auto w-[82px] lg:mx-[6px] lg:min-w-[102px]">
          <Image
            src="/blogr-landing-page/images/logo.svg"
            alt="Blogr Logo"
            className="object-contain"
            fill
          />
        </div>
        <button className="peer/menu group relative aspect-[4/3] h-fit w-8 focus-visible:outline-none lg:hidden">
          <Image
            src="/blogr-landing-page/images/icon-hamburger.svg"
            alt="Menu"
            className="visible object-contain group-focus-within:invisible"
            fill
          />
          <Image
            src="/blogr-landing-page/images/icon-close.svg"
            alt="Menu"
            className="invisible object-contain group-focus-within:visible"
            fill
          />
        </button>
        <div
          tabIndex={0}
          className="bg-sunny-neutral-100 lg:gap-[49px invisible absolute left-[calc(50%-2px)] top-[125px] flex w-[calc(100%-52px)] -translate-x-1/2 flex-col rounded-md px-6 py-[31px] shadow-[0px_10px_50px_7px_rgba(0,0,0,.25)] focus-visible:outline-none group-focus-within:visible lg:visible lg:static lg:left-0 lg:mt-1 lg:w-full lg:translate-x-0 lg:flex-row lg:justify-between lg:bg-transparent lg:px-1 lg:shadow-none lg:before:hidden"
        >
          <ul
            tabIndex={0}
            className="flex flex-col items-center justify-center gap-[25px] lg:flex-row lg:gap-[32px]"
          >
            {navItems.map((el, index) => {
              return (
                <li
                  key={index}
                  className="font-overpass w-full text-center lg:h-[24px] lg:text-[18px] lg:font-medium"
                >
                  <CollapsibleNavItems
                    navChildren={el.children}
                    navParent={el.parent}
                  />
                </li>
              );
            })}
          </ul>
          <div className="border-t-blogr-neutral-200/50 mt-[20px] block h-0 w-full border-t-2 lg:hidden" />
          <div className="mt-[19px] flex flex-col items-center justify-center gap-[8px] lg:mt-0 lg:-translate-y-[2px] lg:flex-row lg:gap-[27px]">
            <a
              href=""
              className="font-overpass text-blogr-neutral-300 lg:text-blogr-neutral-100/75 lg:font-ubuntu flex h-[48px] w-[137px] items-center justify-center text-[18px] font-semibold hover:font-bold lg:w-fit lg:pt-1 lg:text-[16px] lg:font-medium"
            >
              Login
            </a>
            <a
              href=""
              className="font-ubuntu from-blogr-gradient-red-100 to-blogr-gradient-red-200 text-blogr-neutral-100 lg:bg-blogr-neutral-100 lg:text-blogr-primary-red-200 hover:text-blogr-neutral-100 hover:bg-blogr-primary-red-100 ml-[3px] flex h-[48px] w-[137px] items-center justify-center rounded-full bg-gradient-to-r font-medium lg:translate-x-[4px] lg:bg-none lg:font-bold"
            >
              Sign Up
            </a>
          </div>
        </div>
      </nav>
      <div className="text-blogr-neutral-100 z-10 mx-auto px-9 pt-[43px] text-center lg:pt-[78px]">
        <h1 className="font-overpass text-[35px] font-medium leading-[45px] -tracking-[0.7px] lg:text-[64px] lg:-tracking-[2.2px]">A modern publishing platform</h1>
        <p className="font-overpass text-blogr-neutral-100/75 mt-[15px] text-[18px] font-light leading-[23px] -tracking-[0.1px] lg:mt-[31px] lg:text-[20px]">Grow your audience and build your online brand</p>
        <div className="font-ubuntu mt-[46px] grid h-12 grid-cols-2 gap-4 px-[6px] font-bold tracking-[0.1px] lg:mx-auto lg:mt-[48px] lg:w-[302px]">
          <a
            className="text-blogr-primary-red-200 bg-blogr-neutral-100 hover:text-blogr-neutral-100 hover:bg-blogr-primary-red-100 flex items-center justify-center rounded-full"
            href=""
          >
            Start for Free
          </a>
          <a
            className="hover:bg-blogr-neutral-100 hover:text-blogr-primary-red-100 flex items-center justify-center rounded-full border bg-transparent"
            href=""
          >
            Learn More
          </a>
        </div>
      </div>
    </header>
  );
}
