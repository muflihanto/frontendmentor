import Head from "next/head";
import Image from "next/image";
import { ubuntu } from "../utils/fonts/ubuntu";
import { overpass } from "../utils/fonts/overpass";
import {
  type Dispatch,
  type SetStateAction,
  useState,
  useEffect,
  useRef,
  type KeyboardEvent,
} from "react";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function Blogr() {
  useEffect(() => {
    document.body.classList.add("bg-white");
  }, []);

  return (
    <div
      className={`App w-screen overflow-hidden lg:bg-blogr-neutral-200/10 ${ubuntu.variable} ${overpass.variable}`}
    >
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
    children: [
      "Overview",
      "Pricing",
      "Marketplace",
      "Features",
      "Integrations",
    ],
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
                return `${src}illustration-laptop-desktop.svg`;
              }
              return `${src}illustration-laptop-mobile.svg`;
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
          return <Article type="other" key={`${index}-${el.h3}`} {...el} />;
        })}
      </div>
    </section>
  );
}

function Infrastructure() {
  return (
    <section className="relative mt-[267px] h-[625px] rounded-bl-[100px] rounded-tr-[100px] bg-[linear-gradient(150deg,_var(--tw-gradient-stops))] from-blogr-gradient-blue-200 to-blogr-gradient-blue-100 pt-[225.25px] text-blogr-neutral-100 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-bl-[100px] before:rounded-tr-[100px] before:bg-[url('/blogr-landing-page/images/bg-pattern-circles.svg')] before:bg-[length:600px_600px] before:bg-[top_-233px_left_50%] before:bg-no-repeat lg:mt-[57px] lg:flex lg:h-[400px] lg:items-center lg:bg-[linear-gradient(120deg,_var(--tw-gradient-stops))] lg:pt-0 lg:before:bg-[length:calc(169*6px)_calc(806/475*600px)] lg:before:bg-[top_-507px_left_-49.75%]">
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
        <h2 className="relative z-10 text-center font-overpass text-[40px] font-medium leading-[50px] -tracking-[1.25px] lg:text-left">
          State of the Art Infrastructure
        </h2>
        <p className="relative z-10 mt-[18px] text-center font-overpass text-[17px] font-light leading-[28px] tracking-[0.03px] text-blogr-neutral-200 lg:text-left">
          With reliability and speed in mind, worldwide data centers provide the
          backbone for ultra-fast connectivity. This ensures your site will load
          instantly, no matter where your readers are, keeping your site
          competitive.
        </p>
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
      <h2 className="font-overpass text-[28px] font-medium -tracking-[0.8px] text-blogr-primary-blue lg:-translate-x-[2px] lg:text-[40px] lg:-tracking-[1.3px]">
        Designed for the future
      </h2>
      <div className="flex flex-col pt-[52px] lg:mt-[104px] lg:flex-row-reverse lg:items-center lg:gap-[32px] lg:px-[164px] lg:pt-0">
        <div className="w-full lg:h-[428px] lg:w-1/2">
          <div className="relative mx-auto aspect-[203/166] w-[375px] lg:absolute lg:top-[71px] lg:ml-[54px] lg:aspect-[925/882] lg:w-[925px]">
            <Image
              loader={({ width, src }) => {
                if (width > 1023) {
                  return `${src}illustration-editor-desktop.svg`;
                }
                return `${src}illustration-editor-mobile.svg`;
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
            return <Article type="future" key={`${index}-${el.h3}`} {...el} />;
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
      <h3 className="mx-auto px-2 font-overpass text-[28px] font-semibold leading-[32px] -tracking-[0.2px] text-blogr-primary-blue lg:px-0">
        {props.h3}
      </h3>
      <p
        className={`font-overpass text-[17px] font-normal leading-[28px] text-blogr-neutral-300/80 lg:mt-[26px] lg:text-[16px] lg:tracking-[0.45px] ${
          props.type === "future"
            ? "mt-[24px] group-first:mt-[15px] lg:group-first:mt-[26px]"
            : "mt-[25px] "
        }`}
      >
        {props.p}
      </p>
    </article>
  );
}

function Footer() {
  return (
    <footer className="relative mt-[95px] flex flex-col items-center justify-center rounded-tr-[100px] bg-blogr-neutral-400 pb-[76.95px] pt-[75px] text-[11px] lg:flex-row lg:items-start lg:justify-between lg:px-[164px] lg:pb-[75px] lg:pt-[70px]">
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
            <nav key={`${index}-${el.parent}`} className="lg:w-1/3">
              <h3 className="text-center font-ubuntu text-[18px] font-medium text-blogr-neutral-100/90 lg:text-left lg:text-[16px]">
                {el.parent}
              </h3>
              <ul className="mt-[27px] flex flex-col items-center justify-center gap-[6px] lg:mt-[30px] lg:items-start lg:gap-[9px]">
                {el.children.map((el, index) => {
                  return (
                    <li
                      key={`${index}-${el}`}
                      className="font-ubuntu text-[18px] font-normal text-blogr-neutral-200/80 hover:underline hover:decoration-2 lg:text-[16px] lg:text-blogr-neutral-200/90"
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
      <div className="absolute bottom-3 left-0 w-full text-center font-overpass text-blogr-neutral-200">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
          className="font-ubuntu font-bold text-blogr-neutral-100 hover:underline"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          href="https://github.com/muflihanto"
          target="_blank"
          rel="noreferrer"
          className="font-ubuntu font-bold text-blogr-neutral-100 hover:underline"
        >
          Muflihanto
        </a>
        .
      </div>
    </footer>
  );
}

type CollapsibleNavItemsProps = {
  navChildren: string[];
  navParent: string;
  id: string;
  isPopUpOpen: boolean;
  setIsPopUpOpen: Dispatch<SetStateAction<boolean>>;
  activePopUp: string | null;
  setActivePopUp: Dispatch<SetStateAction<string | null>>;
};
function CollapsibleNavItems({
  activePopUp,
  id,
  isPopUpOpen,
  navChildren,
  navParent,
  setActivePopUp,
  setIsPopUpOpen,
}: CollapsibleNavItemsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const firstChildAnchorRef = useRef<HTMLAnchorElement | null>(null);
  const closePopUp = () => {
    setIsPopUpOpen(false);
    setActivePopUp(null);
  };
  const openPopUp = () => {
    setActivePopUp(id);
    setIsPopUpOpen(true);
  };

  const onParentKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    const tgt = event.currentTarget;
    const nextSiblingAnchor =
      tgt.parentElement?.nextElementSibling?.querySelector("a");
    const prevSiblingAnchor =
      tgt.parentElement?.previousElementSibling?.querySelector("a");
    const firstSiblingAnchor =
      tgt.parentElement?.parentElement?.firstElementChild?.querySelector("a");
    const lastSiblingAnchor =
      tgt.parentElement?.parentElement?.lastElementChild?.querySelector("a");
    const key = event.key;
    const openAndFocusPopUp = () => {
      openPopUp();
      setTimeout(() => {
        firstChildAnchorRef.current?.focus();
      }, 50);
    };
    let flag = false;

    switch (key) {
      case "Esc":
      case "Escape":
        if (isPopUpOpen) {
          closePopUp();
          flag = true;
        }
        break;

      case "ArrowDown":
      case "Down":
        openAndFocusPopUp();
        flag = true;
        break;

      case "Right":
      case "ArrowRight":
        if (nextSiblingAnchor) {
          nextSiblingAnchor.focus();
        } else {
          firstSiblingAnchor?.focus();
        }
        flag = true;
        break;

      case "Left":
      case "ArrowLeft":
        if (prevSiblingAnchor) {
          prevSiblingAnchor.focus();
        } else {
          lastSiblingAnchor?.focus();
        }
        flag = true;
        break;

      case "Home":
      case "PageUp":
        firstSiblingAnchor?.focus();
        flag = true;
        break;

      case "End":
      case "PageDown":
        lastSiblingAnchor?.focus();
        flag = true;
        break;

      case " ":
      case "Enter":
        if (isPopUpOpen) {
          closePopUp();
        } else {
          openAndFocusPopUp();
        }
        flag = true;
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const onItemKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    const tgt = event.currentTarget;
    const listItemElement = tgt.parentElement;
    const key = event.key;
    const firstAnchor = listItemElement?.parentElement?.parentElement
      ?.querySelector("li")
      ?.querySelector("a");
    const lastAnchor = listItemElement?.parentElement?.parentElement
      ?.querySelector("li:last-child")
      ?.querySelector("a");
    const nextAnchor = listItemElement?.nextElementSibling?.querySelector("a");
    const prevAnchor =
      listItemElement?.previousElementSibling?.querySelector("a");
    const parentAnchor = listItemElement?.parentElement
      ?.previousElementSibling as HTMLAnchorElement | null | undefined;
    let flag = false;

    switch (key) {
      case "Esc":
      case "Escape":
        if (isPopUpOpen) {
          parentAnchor?.focus();
          setIsPopUpOpen(false);
          setActivePopUp(null);
          flag = true;
        }
        break;

      case "Down":
      case "ArrowDown":
        if (nextAnchor) {
          nextAnchor.focus();
        } else {
          firstAnchor?.focus();
        }
        flag = true;
        break;

      case "Up":
      case "ArrowUp":
        if (prevAnchor) {
          prevAnchor.focus();
        } else {
          lastAnchor?.focus();
        }
        flag = true;
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  useEffect(() => {
    setIsExpanded(activePopUp === id);
  }, [activePopUp, id]);

  return (
    <>
      <a
        className="group/menuparent peer flex list-none items-center justify-center gap-2 text-[18px] font-semibold text-blogr-primary-blue/90 hover:cursor-pointer focus-visible:rounded focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-white"
        href={`#${navParent.toLowerCase()}`}
        role="menuitem"
        aria-haspopup={true}
        aria-expanded={isExpanded}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // expanded handled by effect
          if (isPopUpOpen) {
            if (activePopUp === id) {
              closePopUp();
            } else {
              setActivePopUp(id);
            }
          } else {
            openPopUp();
          }
        }}
        onPointerOver={() => {
          if (isPopUpOpen) setActivePopUp(id);
        }}
        onFocus={() => {
          if (isPopUpOpen) setActivePopUp(id);
        }}
        onKeyDown={onParentKeyDown}
      >
        <span className="group-hover/menuparent:font-bold group-hover/menuparent:tracking-[-.2px] group-hover/menuparent:underline group-aria-[expanded=true]/menuparent:text-blogr-primary-blue/75 lg:font-ubuntu lg:text-[16px] lg:font-medium lg:text-blogr-neutral-100/75 lg:group-aria-[expanded=true]/menuparent:text-blogr-neutral-100/75">
          {navParent}
        </span>
        <Image
          src="/blogr-landing-page/images/icon-arrow-dark.svg"
          alt="Red Arrow Icon"
          width={10}
          height={7}
          className="block origin-center transition-all group-aria-[expanded=true]/menuparent:rotate-180 lg:hidden"
        />
        <Image
          src="/blogr-landing-page/images/icon-arrow-light.svg"
          alt="White Arrow Icon"
          width={10}
          height={7}
          className="hidden shrink-0 transition-all group-aria-[expanded=true]/menuparent:rotate-180 lg:block"
        />
      </a>
      <ul
        className="mb-[4px] mt-[18px] flex w-full flex-col items-center gap-[16px] rounded-md bg-blogr-neutral-200/25 pb-[21px] pt-[25px] text-[16px] font-semibold text-blogr-primary-blue/75 peer-aria-[expanded=false]:hidden lg:absolute lg:-left-6 lg:top-[30.5px] lg:w-[166px] lg:items-start lg:gap-[10.5px] lg:rounded-[4px] lg:bg-blogr-neutral-100 lg:px-6 lg:pb-[29px] lg:pt-[29px] lg:font-ubuntu lg:text-[15px] lg:font-medium lg:text-blogr-primary-blue lg:shadow-[0px_20px_25px_15px_rgba(0,0,0,.125)]"
        role="menu"
        aria-label={navParent}
      >
        {navChildren.map((el, index) => {
          return (
            <li key={`${index}-${el}`} className="hover:font-bold">
              <a
                href={`#${el.toLowerCase()}`}
                role="menuitem"
                onKeyDown={onItemKeyDown}
                ref={index === 0 ? firstChildAnchorRef : undefined}
              >
                {el}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function Header() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [activePopUp, setActivePopUp] = useState<string | null>(null);
  const menubarRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const cur = menubarRef.current;

    if (cur) {
      const onOutsideClick = (event: PointerEvent) => {
        if (!cur.contains(event.target as Element)) {
          setIsPopUpOpen(false);
          setActivePopUp(null);
        }
      };

      window.addEventListener("pointerdown", onOutsideClick, true);

      return () => {
        window.removeEventListener("pointerdown", onOutsideClick);
      };
    }
  }, []);

  return (
    <header className="relative flex aspect-[375/600] h-[600px] w-screen flex-col items-center justify-center gap-[49px] rounded-bl-[100px] bg-[linear-gradient(150deg,_var(--tw-gradient-stops))] from-blogr-gradient-red-100 to-blogr-gradient-red-200 bg-auto bg-no-repeat before:absolute before:bottom-0 before:left-0 before:z-0 before:h-full before:w-full before:overflow-hidden before:rounded-bl-[100px] before:bg-[url('/blogr-landing-page/images/bg-pattern-intro-mobile.svg')] before:bg-[top_-244px_left_-335px] md:before:bg-[url('/blogr-landing-page/images/bg-pattern-intro-desktop.svg')] md:before:bg-[top_-1342px_right_-1295px] md:before:bg-no-repeat lg:justify-end lg:gap-[104px] lg:bg-[linear-gradient(110deg,_var(--tw-gradient-stops))] lg:bg-bottom lg:pb-[155px]">
      <nav className="group absolute top-0 z-20 flex h-[9rem] w-full items-center justify-between bg-transparent px-6 lg:mt-[21px] lg:h-[7.8rem] lg:justify-start lg:gap-[54px] lg:px-40">
        <div className="relative aspect-[51/20] h-auto w-[82px] lg:mx-[6px] lg:min-w-[102px]">
          <Image
            src="/blogr-landing-page/images/logo.svg"
            alt="Blogr Logo"
            className="object-contain"
            fill
          />
        </div>
        <button
          className="peer/menu group relative aspect-[4/3] h-fit w-8 focus-visible:outline-none lg:hidden"
          type="button"
          onTouchEnd={(e) => {
            const ctg = e.currentTarget;
            const itemsContainer = ctg.nextElementSibling;
            const active = document.activeElement;
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            if (active?.isEqualNode(ctg) || itemsContainer?.contains(active)) {
              e.preventDefault();
              (active as HTMLElement | null)?.blur();
            }
          }}
        >
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
        <div className="lg:gap-[49px invisible absolute left-[calc(50%-2px)] top-[125px] flex w-[calc(100%-52px)] -translate-x-1/2 flex-col rounded-md bg-sunny-neutral-100 px-6 py-[31px] shadow-[0px_10px_50px_7px_rgba(0,0,0,.25)] focus-visible:outline-none group-focus-within:visible lg:visible lg:static lg:left-0 lg:mt-1 lg:w-full lg:translate-x-0 lg:flex-row lg:justify-between lg:bg-transparent lg:px-1 lg:shadow-none lg:before:hidden">
          <ul
            className="flex flex-col items-center justify-center gap-[25px] lg:flex-row lg:gap-[32px]"
            role="menubar"
            ref={menubarRef}
          >
            {navItems.map((el, index) => {
              return (
                <li
                  key={`${index}-${el.parent}`}
                  className="w-full text-center font-overpass lg:relative lg:h-[24px] lg:text-[18px] lg:font-medium"
                >
                  <CollapsibleNavItems
                    navChildren={el.children}
                    navParent={el.parent}
                    id={`${index}-${el.parent}`}
                    {...{
                      isPopUpOpen,
                      setIsPopUpOpen,
                      activePopUp,
                      setActivePopUp,
                    }}
                  />
                </li>
              );
            })}
          </ul>
          <div className="mt-[20px] block h-0 w-full border-t-2 border-t-blogr-neutral-200/50 lg:hidden" />
          <div className="mt-[19px] flex flex-col items-center justify-center gap-[8px] lg:mt-0 lg:-translate-y-[2px] lg:flex-row lg:gap-[27px]">
            <a
              href=""
              className="flex h-[48px] w-[137px] items-center justify-center font-overpass text-[18px] font-semibold text-blogr-neutral-300 hover:font-bold lg:w-fit lg:pt-1 lg:font-ubuntu lg:text-[16px] lg:font-medium lg:text-blogr-neutral-100/75"
            >
              Login
            </a>
            <a
              href=""
              className="ml-[3px] flex h-[48px] w-[137px] items-center justify-center rounded-full bg-gradient-to-r from-blogr-gradient-red-100 to-blogr-gradient-red-200 font-ubuntu font-medium text-blogr-neutral-100 hover:bg-blogr-primary-red-100 hover:text-blogr-neutral-100 lg:translate-x-[4px] lg:bg-blogr-neutral-100 lg:bg-none lg:font-bold lg:text-blogr-primary-red-200"
            >
              Sign Up
            </a>
          </div>
        </div>
      </nav>
      <div className="z-10 mx-auto px-9 pt-[43px] text-center text-blogr-neutral-100 lg:pt-[78px]">
        <h1 className="font-overpass text-[35px] font-medium leading-[45px] -tracking-[0.7px] lg:text-[64px] lg:-tracking-[2.2px]">
          A modern publishing platform
        </h1>
        <p className="mt-[15px] font-overpass text-[18px] font-light leading-[23px] -tracking-[0.1px] text-blogr-neutral-100/75 lg:mt-[31px] lg:text-[20px]">
          Grow your audience and build your online brand
        </p>
        <div className="mt-[46px] grid h-12 grid-cols-2 gap-4 px-[6px] font-ubuntu font-bold tracking-[0.1px] lg:mx-auto lg:mt-[48px] lg:w-[302px]">
          <a
            className="flex items-center justify-center rounded-full bg-blogr-neutral-100 text-blogr-primary-red-200 hover:bg-blogr-primary-red-100 hover:text-blogr-neutral-100"
            href=""
          >
            Start for Free
          </a>
          <a
            className="flex items-center justify-center rounded-full border bg-transparent hover:bg-blogr-neutral-100 hover:text-blogr-primary-red-100"
            href=""
          >
            Learn More
          </a>
        </div>
      </div>
    </header>
  );
}
