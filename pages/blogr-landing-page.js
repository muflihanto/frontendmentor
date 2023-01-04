import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function Blogr(props) {
  return (
    <div className="w-screen overflow-hidden App lg:bg-blogr-neutral-200/10">
      <Head>
        <title>Frontend Mentor | [Blogr]</title>
      </Head>
      <Header />
      <Main />
      <Footer />
      <Slider
        basePath="/blogr-landing-page/design/"
        // absolutePath="/blogr-landing-page/design/mobile-menu.jpg"
      />
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
    <section className="px-[2px] mt-[76.75px] pt-3 text-center flex flex-col overflow-hidden">
      <h2 className="sr-only">Other Features</h2>
      <div className="mx-auto relative w-[375px] aspect-[203/166]">
        <Image
          src="/blogr-landing-page/images/illustration-laptop-mobile.svg"
          alt="Illustration Laptop"
          className="object-contain scale-[calc(180/135.5)]"
          fill
        />
      </div>
      <div className="mt-[65px] flex-col flex gap-[44px]">
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
    <section
      className="relative rounded-tr-[100px] rounded-bl-[100px] h-[625px] bg-[linear-gradient(150deg,_var(--tw-gradient-stops))] from-blogr-gradient-blue-200 to-blogr-gradient-blue-100 pt-[225.25px] mt-[267px] text-blogr-neutral-100
    before:absolute before:rounded-tr-[100px] before:rounded-bl-[100px] before:top-0 before:bg-[top_-233px_left_50%] before:bg-[length:600px_600px] before:bg-no-repeat before:left-0 before:bg-[url('/blogr-landing-page/images/bg-pattern-circles.svg')] before:w-full before:h-full"
    >
      <header className="mx-auto absolute top-0 -translate-y-[calc(50%-14px)] w-[375px] aspect-[276/290] overflow-hidden">
        <Image
          src="/blogr-landing-page/images/illustration-phones.svg"
          alt="Illustration Phone"
          className="object-contain scale-[calc(301/295*100%)]"
          fill
        />
      </header>
      <h2 className="relative z-10 px-8 text-center text-[40px] font-overpass font-medium -tracking-[1.25px] leading-[50px]">State of the Art Infrastructure</h2>
      <p className="relative z-10 px-8 mt-[18px] tracking-[0.03px] leading-[28px] text-center text-[17px] font-overpass font-light text-blogr-neutral-200">With reliability and speed in mind, worldwide data centers provide the backbone for ultra-fast connectivity. This ensures your site will load instantly, no matter where your readers are, keeping your site competitive.</p>
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
    <section className="lg:relative text-center pt-[99px] lg:pt-[149px] lg:pb-[195px]">
      <h2
        className="text-[28px] font-overpass font-medium -tracking-[0.8px] text-blogr-primary-blue
      lg:text-[40px] lg:-tracking-[1.3px] lg:-translate-x-[2px]"
      >
        Designed for the future
      </h2>
      <div className="flex flex-col pt-[52px] lg:flex-row-reverse lg:pt-0 lg:mt-[104px] lg:items-center lg:gap-[32px] lg:px-[164px]">
        <div className="w-full lg:w-1/2 lg:h-[428px]">
          <div className="mx-auto relative lg:absolute w-[375px] lg:w-[925px] aspect-[203/166] lg:aspect-[925/882] lg:top-[71px] lg:ml-[54px]">
            <Image
              loader={({ width, src }) => {
                if (width > 1023) {
                  return src + "illustration-editor-desktop.svg";
                }
                return src + "illustration-editor-mobile.svg";
              }}
              src="/blogr-landing-page/images/"
              alt="Illustration Editor"
              className="object-contain scale-[calc(331.5/306.65)] lg:scale-100"
              fill
            />
          </div>
        </div>
        <div className="mt-[62px] flex-col flex gap-[43px] lg:gap-[77px] lg:w-1/2 lg:mt-0 lg:-translate-y-1">
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

function Article(props) {
  return (
    <article className="pl-8 pr-6 group lg:text-left lg:px-0">
      <h3 className="text-[28px] font-overpass font-semibold -tracking-[0.2px] text-blogr-primary-blue mx-auto leading-[32px] px-2 lg:px-0">{props.h3}</h3>
      <p className={`font-normal font-overpass text-[17px] leading-[28px] text-blogr-neutral-300/80 lg:text-[16px] lg:tracking-[0.45px] ${props.type === "future" ? "group-first:mt-[15px] mt-[24px] lg:group-first:mt-[26px] lg:mt-[26px]" : "mt-[25px]"}`}>{props.p}</p>
    </article>
  );
}

function Footer() {
  return (
    <footer className="text-[11px] bg-blogr-neutral-400 mt-[95px] flex flex-col justify-center items-center pt-[75px] pb-[76.95px] rounded-tr-[100px] relative">
      <div className="relative w-[102px] aspect-[51/20]">
        <Image
          alt="Blogr Logo"
          src="/blogr-landing-page/images/logo.svg"
          className="object-contain"
          fill
        />
      </div>
      <div className="mt-[76px] flex flex-col justify-start gap-[46px]">
        {navItems.map((el, index) => {
          return (
            <nav key={index}>
              <h3 className="text-center text-[18px] font-medium text-blogr-neutral-100/90 font-ubuntu">{el.parent}</h3>
              <ul className="flex flex-col items-center justify-center mt-[27px] gap-[6px]">
                {el.children.map((el, index) => {
                  return (
                    <li
                      key={index}
                      className="text-[18px] font-normal text-blogr-neutral-200/80 font-ubuntu"
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
      <div className="absolute left-0 w-full text-center text-blogr-neutral-200 font-overpass bottom-3">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
          className="font-bold text-blogr-neutral-100 font-ubuntu hover:underline"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          href="https://github.com/muflihanto"
          target="_blank"
          rel="noreferrer"
          className="font-bold text-blogr-neutral-100 font-ubuntu hover:underline"
        >
          Muflihanto
        </a>
        .
      </div>
    </footer>
  );
}

function CollapsibleNavItems(props) {
  const arrowRed = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="7"
      className="transition-all group-open:rotate-180"
    >
      <path
        fill="none"
        stroke="#FF7B86"
        strokeWidth="2"
        d="M1 1l4 4 4-4"
      />
    </svg>
  );
  const arrowWhite = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="7"
    >
      <path
        fill="none"
        stroke="#FFF"
        strokeWidth="2"
        opacity=".75"
        d="M1 1l4 4 4-4"
      />
    </svg>
  );
  return (
    <details className="group">
      <summary className="font-semibold text-blogr-primary-blue/90 text-[18px] list-none flex items-center justify-center gap-2 focus-visible:outline-none">
        <span className="group-open:text-blogr-primary-blue/75 lg:text-blogr-neutral-100/75 lg:text-[16px] lg:font-ubuntu lg:font-medium">{props.navParent}</span>
        <span className="block lg:hidden">{arrowRed}</span>
        <span className="hidden lg:block">{arrowWhite}</span>
      </summary>
      <ul className="flex flex-col items-center w-full pt-[25px] pb-[21px] font-semibold text-[16px] bg-blogr-neutral-200/25 text-blogr-primary-blue/75 rounded-md mt-[18px] mb-[4px] gap-[16px]">
        {props.navChildren.map((el, index) => {
          return (
            <li key={index}>
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
    <header
      className="bg-[linear-gradient(150deg,_var(--tw-gradient-stops))] from-blogr-gradient-red-100 to-blogr-gradient-red-200 relative flex flex-col justify-center items-center w-screen aspect-[375/600] rounded-bl-[100px] gap-[49px] bg-no-repeat bg-auto h-[600px]
      before:bottom-0 before:left-0 before:bg-[top_-244px_left_-335px] before:absolute before:w-full before:h-full before:z-0 before:rounded-bl-[100px] before:bg-[url('/blogr-landing-page/images/bg-pattern-intro-mobile.svg')]
      before:overflow-hidden
      lg:bg-bottom lg:gap-[104px] lg:bg-[linear-gradient(110deg,_var(--tw-gradient-stops))] lg:justify-end lg:pb-[155px]
      md:before:bg-no-repeat md:before:bg-[top_-1342px_right_-1295px] md:before:bg-[url('/blogr-landing-page/images/bg-pattern-intro-desktop.svg')] 
      "
    >
      <nav
        className="absolute z-20 top-0 w-full bg-transparent flex justify-between items-center px-6 h-[9rem] group
      lg:px-40 lg:h-[7.8rem] lg:mt-[21px] lg:justify-start lg:gap-[54px]"
      >
        <div className="relative w-[82px] h-auto aspect-[51/20] lg:min-w-[102px] lg:mx-[6px]">
          <Image
            src="/blogr-landing-page/images/logo.svg"
            alt="Blogr Logo"
            className="object-contain"
            fill
          />
        </div>
        <button className="relative w-8 h-fit aspect-[4/3] peer/menu lg:hidden group focus-visible:outline-none">
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
          className="absolute flex flex-col top-[125px] rounded-md shadow-[0px_10px_50px_7px_rgba(0,0,0,.25)] py-[31px] left-[calc(50%-2px)] -translate-x-1/2 bg-sunny-neutral-100 w-[calc(100%-52px)] focus-visible:outline-none group-focus-within:visible invisible px-6
          lg:visible lg:bg-transparent lg:flex-row lg:before:hidden lg:shadow-none lg:static lg:left-0 lg:w-full lg:translate-x-0 lg:px-1 lg:gap-[49px lg:justify-between lg:mt-1"
        >
          <ul
            tabIndex={0}
            className="flex flex-col gap-[25px] justify-center items-center lg:flex-row lg:gap-[32px]"
          >
            {navItems.map((el, index) => {
              return (
                <li
                  key={index}
                  className="font-overpass lg:font-medium lg:text-[18px] lg:h-[24px] w-full text-center"
                >
                  <CollapsibleNavItems
                    navChildren={el.children}
                    navParent={el.parent}
                  />
                </li>
              );
            })}
          </ul>
          <div className="block w-full h-0 mt-[20px] border-t-2 border-t-blogr-neutral-200/50 lg:hidden" />
          <div className="flex flex-col items-center justify-center mt-[19px] gap-[8px] lg:flex-row lg:mt-0 lg:gap-[27px] lg:-translate-y-[2px]">
            <a
              href=""
              className="font-semibold font-overpass h-[48px] flex justify-center items-center text-blogr-neutral-300 text-[18px] w-[137px]
              lg:w-fit lg:text-blogr-neutral-100/75 lg:text-[16px] lg:font-ubuntu lg:font-medium lg:pt-1"
            >
              Login
            </a>
            <a
              href=""
              className="ml-[3px] font-medium font-ubuntu bg-gradient-to-r h-[48px] flex justify-center items-center from-blogr-gradient-red-100 to-blogr-gradient-red-200 w-[137px] rounded-full text-blogr-neutral-100 lg:bg-none lg:translate-x-[4px] lg:bg-blogr-neutral-100  lg:text-blogr-primary-red-200 lg:font-bold"
            >
              Sign Up
            </a>
          </div>
        </div>
      </nav>
      <div className="text-center text-blogr-neutral-100 mx-auto px-9 pt-[43px] z-10 lg:pt-[78px]">
        <h1 className="font-overpass text-[35px] leading-[45px] -tracking-[0.7px] font-medium lg:text-[64px] lg:-tracking-[2.2px]">A modern publishing platform</h1>
        <p className="text-[18px] font-overpass font-light text-blogr-neutral-100/75 mt-[15px] leading-[23px] -tracking-[0.1px] lg:mt-[31px] lg:text-[20px]">Grow your audience and build your online brand</p>
        <div className="grid grid-cols-2 px-[6px] gap-4 mt-[46px] lg:mt-[48px] font-bold font-ubuntu h-12 tracking-[0.1px] lg:w-[302px] lg:mx-auto">
          <a
            className="flex items-center justify-center rounded-full text-blogr-primary-red-200 bg-blogr-neutral-100"
            href=""
          >
            Start for Free
          </a>
          <a
            className="flex items-center justify-center bg-transparent border rounded-full"
            href=""
          >
            Learn More
          </a>
        </div>
      </div>
    </header>
  );
}
