import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function Blogr(props) {
  return (
    <div className="App">
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
      {`
        Company

        About
        Team
        Blog
        Careers
        
        Login
        Sign Up

        State of the Art Infrastructure
        With reliability and speed in mind, worldwide data centers provide the backbone for ultra-fast connectivity. 
        This ensures your site will load instantly, no matter where your readers are, keeping your site competitive.

        Free, open, simple
        Blogr is a free and open source application backed by a large community of helpful developers. It supports 
        features such as code syntax highlighting, RSS feeds, social media integration, third-party commenting tools, 
        and works seamlessly with Google Analytics. The architecture is clean and is relatively easy to learn.

        Powerful tooling
        Batteries included. We built a simple and straightforward CLI tool that makes customization and deployment a breeze, but
        capable of producing even the most complicated sites.

        Product

        Overview
        Pricing
        Marketplace
        Features
        Integrations

        Company

        About
        Team
        Blog
        Careers

        Connect
        
        Contact
        Newsletter
        LinkedIn
      `}
    </div>
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
    <section className="text-center mt-[99px]">
      <h2 className="text-[28px] font-overpass font-medium -tracking-[0.8px] text-blogr-primary-blue">Designed for the future</h2>
      <div className="flex flex-col mt-[52px]">
        <div className="mx-auto relative w-[375px] aspect-[203/166]">
          <Image
            src="/blogr-landing-page/images/illustration-editor-mobile.svg"
            alt="Illustration Mobile"
            className="object-contain scale-[calc(331.5/306.65)]"
            fill
          />
        </div>
        <div className="mt-[62px] flex-col flex gap-[43px]">
          {articles.map((el, index) => {
            return (
              <FutureArticle
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

function FutureArticle(props) {
  return (
    <article className="pl-8 pr-6 group">
      <h3 className="text-[28px] font-overpass font-semibold -tracking-[0.2px] text-blogr-primary-blue mx-auto leading-[32px] px-2">{props.h3}</h3>
      <p className="mt-[15px] font-light font-overpass text-[17px] leading-[28px] text-blogr-primary-blue group-[:nth-child(2)]:mt-[24px]">{props.p}</p>
    </article>
  );
}

function Footer() {
  return (
    <footer className="text-[11px]">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
        className="text-[hsl(228,45%,44%)]"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        href="#"
        className="text-[hsl(228,45%,44%)]"
      >
        Your Name Here
      </a>
      .
    </footer>
  );
}

function Header() {
  return (
    <header
      className="bg-[url('/blogr-landing-page/images/bg-pattern-intro-mobile.svg')] lg:bg-[url('/blogr-landing-page/images/bg-pattern-intro-desktop.svg')] bg-[top_-244px_left_-335px] relative flex flex-col justify-center items-center w-full aaspect-[375/600] rounded-bl-[100px] gap-[49px] bg-no-repeat bg-auto h-[600px]
    lg:aspect-auto lg:w-screen lg:h-screen lg:bg-contain lg:bg-bottom lg:gap-[104px] lg:pb-[123px] lg:font-black overflow-hidden before:absolute before:w-full before:h-full before:-z-10 before:bg-[linear-gradient(150deg,_var(--tw-gradient-stops))] before:from-blogr-gradient-red-100 before:to-blogr-gradient-red-200"
    >
      <nav className="absolute z-10 top-0 w-full bg-transparent flex justify-between items-center px-6 h-[9rem] group lg:px-10 lg:h-[7.8rem]">
        <div className="relative w-[82px] h-auto aspect-[51/20] lg:w-[170px]">
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
        <ul
          tabIndex={0}
          className="absolute top-[125px] rounded-md shadow-xl py-[31px] left-[calc(50%-2px)] -translate-x-1/2 bg-sunny-neutral-100 w-[calc(100%-52px)] flex flex-col gap-[25px] justify-center items-center focus-visible:outline-none group-focus-within:visible invisible px-5
          lg:visible lg:bg-transparent lg:flex-row lg:before:hidden lg:static lg:left-0 lg:w-fit lg:translate-x-0 lg:px-1 lg:gap-[49px]"
        >
          <li className="font-overpass lg:font-medium lg:text-[18px] lg:h-[24px] w-full text-center">
            <details className="group">
              <summary className="font-semibold text-blogr-neutral-400 text-[18px] list-none flex items-center justify-center gap-2 focus-visible:outline-none">
                <span>Product</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="7"
                    className="transition-all group-open:rotate-180"
                  >
                    <path
                      fill="none"
                      stroke="#FF7B86"
                      stroke-width="2"
                      d="M1 1l4 4 4-4"
                    />
                  </svg>
                </span>
              </summary>
            </details>
          </li>
          <li className="font-overpass lg:font-medium lg:text-[18px] lg:h-[24px] w-full text-center">
            <details className="group">
              <summary className="font-semibold text-blogr-neutral-400 text-[18px] list-none flex items-center justify-center gap-2 focus-visible:outline-none">
                <span>Company</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="7"
                    className="transition-all group-open:rotate-180"
                  >
                    <path
                      fill="none"
                      stroke="#FF7B86"
                      stroke-width="2"
                      d="M1 1l4 4 4-4"
                    />
                  </svg>
                </span>
              </summary>
            </details>
          </li>
          <li className="font-overpass lg:font-medium lg:text-[18px] lg:h-[24px] w-full text-center">
            <details className="group">
              <summary className="font-semibold text-blogr-neutral-400 text-[18px] list-none flex items-center justify-center gap-2 focus-visible:outline-none">
                <span className="group-open:text-blogr-neutral-300">Connect</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="7"
                    className="transition-all group-open:rotate-180"
                  >
                    <path
                      fill="none"
                      stroke="#FF7B86"
                      stroke-width="2"
                      d="M1 1l4 4 4-4"
                    />
                  </svg>
                </span>
              </summary>
              <ul className="flex flex-col items-center w-full pt-[25px] pb-[21px] font-semibold text-[16px] bg-blogr-neutral-200/25 text-blogr-neutral-300/90 rounded-md my-[18px] gap-[16px]">
                <li>
                  <a href="">Contact</a>
                </li>
                <li>
                  <a href="">Newsletter</a>
                </li>
                <li>
                  <a href="">LinkedIn</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
      <div className="text-center text-blogr-neutral-100 mx-auto px-9 pt-[43px]">
        <h1 className="font-overpass text-[35px] leading-[45px] -tracking-[0.7px] font-medium">A modern publishing platform</h1>
        <p className="text-[18px] font-overpass font-light text-blogr-neutral-100/75 mt-[15px] leading-[23px] -tracking-[0.1px]">Grow your audience and build your online brand</p>
        <div className="grid grid-cols-2 px-[6px] gap-4 mt-[46px] font-bold font-ubuntu h-12 tracking-[0.1px]">
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
