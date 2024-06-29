import Head from "next/head";
import Image from "next/image";
import {
  type CSSProperties,
  type ComponentProps,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEventListener, useWindowSize } from "usehooks-ts";
import { cn } from "../utils/cn";
import { leagueSpartan } from "../utils/fonts/leagueSpartan";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

// TODO: - View the optimal layout for the site depending on their device's screen size
// TODO: - Navigate the slider using either their mouse/trackpad or keyboard

type Product = {
  title: string;
  description: string;
  link: string;
  image: {
    desktop: string;
    mobile: string;
  };
};

const products: Product[] = [
  {
    title: "Discover innovative ways to decorate",
    description:
      "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.",
    link: "",
    image: {
      mobile: "mobile-image-hero-1.jpg",
      desktop: "desktop-image-hero-1.jpg",
    },
  },
  {
    title: "We are available all across the globe",
    description:
      "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
    link: "",
    image: {
      mobile: "mobile-image-hero-2.jpg",
      desktop: "desktop-image-hero-2.jpg",
    },
  },
  {
    title: "Manufactured with the best materials",
    description:
      "Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.",
    link: "",
    image: {
      mobile: "mobile-image-hero-3.jpg",
      desktop: "desktop-image-hero-3.jpg",
    },
  },
];
const links = [
  {
    href: "",
    display: "Home",
  },
  {
    href: "",
    display: "Shop",
  },
  {
    href: "",
    display: "About",
  },
  {
    href: "",
    display: "Contact",
  },
];

export default function RoomHomepage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Room homepage</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] font-league-spartan font-medium ${leagueSpartan.variable}`}
      >
        <Header />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/room-homepage/design"
          absolutePath="/room-homepage/design/desktop-design-slide-1.jpg"
        /> */}
      </div>
    </>
  );
}

function NavigationLink({
  children,
  href,
}: PropsWithChildren<ComponentProps<"a">>) {
  return (
    <li>
      <a
        className={cn([
          "text-[17px] font-bold lowercase leading-none tracking-[-1.25px] text-room-primary-300 lg:font-medium lg:text-room-primary-100", //
          "lg:hover:relative lg:hover:before:absolute lg:hover:before:bottom-[-10px] lg:hover:before:left-1/2 lg:hover:before:h-[2px] lg:hover:before:w-4 lg:hover:before:-translate-x-1/2 lg:hover:before:bg-white",
        ])}
        href={href ?? ""}
      >
        {children}
      </a>
    </li>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="absolute left-0 top-0 z-20 flex h-[110px] w-full items-center px-6 lg:h-[142px] lg:w-auto lg:px-16"
        animate={{
          backgroundColor: menuOpen ? "rgb(255,255,255)" : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.1 }}
      >
        <button
          onClick={() => {
            setMenuOpen((p) => !p);
          }}
          className="lg:hidden"
          type="button"
        >
          {menuOpen ? (
            <svg
              viewBox="0 0 16 16"
              className="ml-[2px] w-4"
              aria-label="Close menu"
              role="graphics-symbol"
            >
              <use href="/room-homepage/images/icon-close.svg#icon-close" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 20 14"
              className="w-5"
              aria-label="Open menu"
              role="graphics-symbol"
            >
              <use href="/room-homepage/images/icon-hamburger.svg#icon-hamburger" />
            </svg>
          )}
        </button>
        <svg
          viewBox="0 0 62 14"
          className="absolute left-1/2 top-1/2 z-0 h-[14px] -translate-x-1/2 -translate-y-1/2 lg:static lg:transform-none"
          aria-labelledby="room-logo-title"
        >
          <title id="room-logo-title">Room Logo</title>
          <use href="/room-homepage/images/logo.svg#room-logo" />
        </svg>
        <AnimatePresence>
          {!menuOpen && width < 1024 ? null : (
            <nav className="relative ml-auto pt-[3px] lg:ml-[56px] lg:pb-[2px] lg:pt-0">
              <ul className="flex gap-8 lg:gap-[33px]">
                {links.map((link) => {
                  return (
                    <NavigationLink key={link.display} href={link.href}>
                      {link.display}
                    </NavigationLink>
                  );
                })}
              </ul>
            </nav>
          )}
        </AnimatePresence>
      </motion.header>
      <AnimatePresence>
        {!!menuOpen && (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0.5 }}
            className="absolute left-0 top-0 z-10 h-screen w-screen bg-room-primary-400/50"
          />
        )}
      </AnimatePresence>
    </>
  );
}

// TODO: add slider accessibility features
function Slide() {
  const [product] = useState(products);
  const [activeProduct, setActiveProduct] = useState(0);

  useEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") {
      setActiveProduct((prev) => {
        return prev === 0 ? 2 : prev - 1;
      });
    } else if (event.key === "ArrowRight") {
      setActiveProduct((prev) => {
        return prev === 2 ? 0 : prev + 1;
      });
    }
  });

  return (
    <div
      className="relative grid h-full grid-cols-1 grid-rows-[var(--height)_auto] lg:h-[calc(534/800*100dvh)] lg:grid-cols-[calc(840/1440*100%)_auto] lg:grid-rows-1"
      style={
        {
          "--height": "calc(360/375*100vw)",
        } as CSSProperties
      }
    >
      <div className="relative aspect-[375/360] w-full lg:aspect-auto lg:h-full lg:w-[calc(840/1440*100vw)]">
        <Image
          src={"/room-homepage/images/"}
          loader={({ src, width }) => {
            return (
              src +
              (width > 1023
                ? product[activeProduct].image.desktop
                : product[activeProduct].image.mobile)
            );
          }}
          className="object-cover"
          fill
          alt={`Product ${activeProduct + 1}`}
        />
      </div>
      <div className="h-[410px] w-full px-8 py-[61px] lg:flex lg:h-full lg:w-auto lg:flex-col lg:justify-center lg:px-[clamp(80px,calc(100/1440*100vw),100px)] lg:py-0 lg:pb-[34px]">
        <h1 className="text-[40px] font-semibold leading-[37px] tracking-[-1.7px] lg:text-[clamp(40px,calc(48/800*100dvh),48px)] lg:leading-[45px] lg:tracking-[-2px]">
          {product[activeProduct].title}
        </h1>
        <p className="mt-[15px] font-medium leading-[22px] tracking-[-.35px] text-room-primary-200 lg:mt-[22px] lg:text-[clamp(15px,calc(16/800*100dvh),16px)]">
          {product[activeProduct].description}
        </p>
        <a
          href={product[activeProduct].link}
          className="group mt-10 flex items-center gap-[18px] text-[15px] uppercase leading-none tracking-[12.5px] text-room-primary-400 hover:text-room-primary-200 lg:mt-[23px] lg:text-[clamp(14px,calc(15/800*100dvh),15px)]"
        >
          Shop Now
          <svg
            className="w-10 text-room-primary-400 group-hover:text-room-primary-200"
            viewBox="0 0 40 12"
            aria-hidden="true"
          >
            <use href="/room-homepage/images/icon-arrow.svg#icon-arrow" />
          </svg>
        </a>
      </div>
      <div className="absolute right-0 top-[calc(var(--height)-56px)] flex h-[56px] w-[112px] lg:bottom-0 lg:left-[calc(840/1440*100vw)] lg:right-auto lg:top-auto lg:h-[80px] lg:w-[160px]">
        <button
          onClick={() => {
            setActiveProduct((prev) => {
              return prev === 0 ? 2 : prev - 1;
            });
          }}
          className="flex h-full w-full items-center justify-center bg-room-primary-400 hover:bg-room-primary-300"
          type="button"
        >
          <svg
            viewBox="0 0 14 24"
            className="pointer-events-auto h-4 stroke-2 lg:h-6 lg:stroke-1"
            aria-label="Previous slide"
            role="graphics-symbol"
          >
            <use href="/room-homepage/images/icon-angle-left.svg#icon-angle-left" />
          </svg>
        </button>
        <button
          onClick={() => {
            setActiveProduct((prev) => {
              return prev === 2 ? 0 : prev + 1;
            });
          }}
          className="flex h-full w-full items-center justify-center bg-room-primary-400 hover:bg-room-primary-300"
          type="button"
        >
          <svg
            viewBox="0 0 14 24"
            className="pointer-events-none h-4 stroke-2 lg:h-6 lg:stroke-1"
            aria-label="Next slide"
            role="graphics-symbol"
          >
            <use href="/room-homepage/images/icon-angle-right.svg#icon-angle-right" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="lg:flex lg:h-[calc(266/800*100dvh)] lg:w-screen lg:items-center">
      <div className="relative aspect-[210/133] w-full lg:h-full lg:w-auto">
        <Image
          src="/room-homepage/images/image-about-dark.jpg"
          alt="About Dark Image"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex h-[303.8px] flex-col justify-center p-8 pt-10 lg:h-full lg:p-12 lg:pt-[54px]">
        <h2 className="text-[15px] font-bold uppercase tracking-[5.2px] lg:text-[clamp(15px,calc(16/800*100vh),16px)] lg:tracking-[6.7px]">
          About our furniture
        </h2>
        <p className="mt-4 leading-[22px] tracking-[-.35px] text-room-primary-200 lg:mt-[11px] lg:text-[clamp(15px,calc(16/800*100vh),16px)] ">
          Our multifunctional collection blends design and function to suit your
          individual taste. Make each room unique, or pick a cohesive theme that
          best express your interests and what inspires you. Find the furniture
          pieces you need, from traditional to contemporary styles or anything
          in between. Product specialists are available to help you create your
          dream space.
        </p>
      </div>
      <div className="relative aspect-[220/133] w-full lg:h-full lg:w-auto">
        <Image
          src="/room-homepage/images/image-about-light.jpg"
          alt="About Light Image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="grid grid-cols-1 grid-rows-[auto,auto] lg:h-screen">
      <Slide />
      <About />
    </div>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-room-primary-300 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a href="https://github.com/muflihanto" target="_blank" rel="noreferrer">
        Muflihanto
      </a>
      .
    </footer>
  );
}
