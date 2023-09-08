import Head from "next/head";
import Image from "next/image";
import { CSSProperties, ComponentProps, PropsWithChildren, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowSize } from "usehooks-ts";
import { cn } from "../utils/cn";
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
    description: "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.",
    link: "",
    image: {
      mobile: "mobile-image-hero-1.jpg",
      desktop: "desktop-image-hero-1.jpg",
    },
  },
  {
    title: "We are available all across the globe",
    description: "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
    link: "",
    image: {
      mobile: "mobile-image-hero-2.jpg",
      desktop: "desktop-image-hero-2.jpg",
    },
  },
  {
    title: "Manufactured with the best materials",
    description: "Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.",
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
      <div className="App font-league-spartan relative min-h-[100svh] font-medium">
        <Header />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/room-homepage/design"
          absolutePath="/room-homepage/design/active-states.jpg"
        /> */}
      </div>
    </>
  );
}

function NavigationLink({ children, href }: PropsWithChildren<ComponentProps<"a">>) {
  return (
    <li>
      <a
        className={cn([
          "text-room-primary-300 lg:text-room-primary-100 text-[17px] font-bold lowercase leading-none tracking-[-1.25px] lg:font-medium", //
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
        className={`absolute left-0 top-0 z-20 flex h-[110px] w-full items-center px-6 lg:h-[142px] lg:w-auto lg:px-16`}
        animate={{ backgroundColor: menuOpen ? "rgb(255,255,255)" : "rgba(0,0,0,0)" }}
        transition={{ duration: 0.1 }}
      >
        <button
          onClick={() => {
            setMenuOpen((p) => !p);
          }}
          className="lg:hidden"
        >
          {menuOpen ? (
            <svg
              viewBox="0 0 16 16"
              className="ml-[2px] w-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.364.222l1.414 1.414L9.414 8l6.364 6.364-1.414 1.414L8 9.414l-6.364 6.364-1.414-1.414L6.586 8 .222 1.636 1.636.222 8 6.586 14.364.222z"
                fill="#000"
                fillRule="evenodd"
                opacity=".201"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 20 14"
              className="w-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 12v2H0v-2h20zm0-6v2H0V6h20zm0-6v2H0V0h20z"
                fill="#FFF"
                fillRule="evenodd"
              />
            </svg>
          )}
        </button>
        <svg
          viewBox="0 0 62 14"
          className="absolute left-1/2 top-1/2 z-0 h-[14px] -translate-x-1/2 -translate-y-1/2 lg:static lg:transform-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.988 12.672v-7.32c0-.48.142-.928.426-1.344a3.36 3.36 0 011.11-1.02c.456-.264.94-.396 1.452-.396.296 0 .618.048.966.144.348.096.654.224.918.384L9.096.588A4.277 4.277 0 007.998.162 5.115 5.115 0 006.744 0c-.776 0-1.488.186-2.136.558-.648.372-1.188.91-1.62 1.614V.384H0v12.288h2.988zm13.472.384c1.328 0 2.526-.276 3.594-.828a6.406 6.406 0 002.532-2.304c.62-.984.93-2.116.93-3.396 0-1.288-.31-2.422-.93-3.402A6.421 6.421 0 0020.054.828C18.986.276 17.788 0 16.46 0c-1.336 0-2.536.276-3.6.828a6.476 6.476 0 00-2.532 2.298c-.624.98-.936 2.114-.936 3.402 0 1.28.312 2.412.936 3.396a6.45 6.45 0 002.538 2.304c1.068.552 2.266.828 3.594.828zm0-2.568c-.744 0-1.416-.17-2.016-.51a3.729 3.729 0 01-1.416-1.404c-.344-.596-.516-1.278-.516-2.046 0-.776.172-1.462.516-2.058a3.686 3.686 0 011.416-1.398c.6-.336 1.272-.504 2.016-.504.752 0 1.426.168 2.022.504a3.698 3.698 0 011.41 1.398c.344.596.516 1.282.516 2.058 0 .768-.172 1.45-.516 2.046a3.741 3.741 0 01-1.41 1.404c-.596.34-1.27.51-2.022.51zm15.704 2.568c1.328 0 2.526-.276 3.594-.828a6.406 6.406 0 002.532-2.304c.62-.984.93-2.116.93-3.396 0-1.288-.31-2.422-.93-3.402A6.421 6.421 0 0035.758.828C34.69.276 33.492 0 32.164 0c-1.336 0-2.536.276-3.6.828a6.476 6.476 0 00-2.532 2.298c-.624.98-.936 2.114-.936 3.402 0 1.28.312 2.412.936 3.396a6.45 6.45 0 002.538 2.304c1.068.552 2.266.828 3.594.828zm0-2.568c-.744 0-1.416-.17-2.016-.51a3.729 3.729 0 01-1.416-1.404c-.344-.596-.516-1.278-.516-2.046 0-.776.172-1.462.516-2.058a3.686 3.686 0 011.416-1.398c.6-.336 1.272-.504 2.016-.504.752 0 1.426.168 2.022.504a3.698 3.698 0 011.41 1.398c.344.596.516 1.282.516 2.058 0 .768-.172 1.45-.516 2.046a3.741 3.741 0 01-1.41 1.404c-.596.34-1.27.51-2.022.51zm12.608 2.184V4.896c0-.44.126-.85.378-1.23s.596-.686 1.032-.918c.436-.232.93-.348 1.482-.348.8 0 1.432.258 1.896.774.464.516.696 1.206.696 2.07v7.428h2.988V4.908c0-.44.124-.852.372-1.236a2.717 2.717 0 011.02-.924c.432-.232.92-.348 1.464-.348.8 0 1.438.266 1.914.798s.714 1.254.714 2.166v7.308h2.988V4.548c0-.952-.198-1.766-.594-2.442a4.051 4.051 0 00-1.62-1.56C58.818.182 58.036 0 57.156 0c-.928 0-1.744.21-2.448.63-.704.42-1.332 1.022-1.884 1.806-.312-.744-.846-1.336-1.602-1.776C50.466.22 49.604 0 48.636 0c-.752 0-1.442.152-2.07.456-.628.304-1.226.772-1.794 1.404V.384h-2.988v12.288h2.988z"
            fill="#FFF"
            fillRule="nonzero"
          />
        </svg>
        <AnimatePresence>
          {(!!menuOpen || width > 1023) && (
            <nav className="relative ml-auto pt-[3px] lg:ml-[56px] lg:pb-[2px] lg:pt-0">
              <ul className="flex gap-8 lg:gap-[33px]">
                {links.map((link) => {
                  return (
                    <NavigationLink
                      key={link.display}
                      href={link.href}
                    >
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
            className="bg-room-primary-400/50 absolute left-0 top-0 z-10 h-screen w-screen"
          />
        )}
      </AnimatePresence>
    </>
  );
}

function Slide() {
  const [product] = useState(products);
  const [activeProduct, setActiveProduct] = useState(0);

  return (
    <div
      className="relative grid h-full grid-cols-1 grid-rows-[var(--height)_auto] lg:h-[calc(100dvh-266px)] lg:grid-cols-[calc((100dvh-266px)/534*840)_auto] lg:grid-rows-1"
      style={
        {
          "--height": "calc(360/375*100vw)",
        } as CSSProperties
      }
    >
      <div className="relative aspect-[375/360] w-full lg:aspect-[840/534] lg:h-full lg:w-auto">
        <Image
          src={"/room-homepage/images/"}
          loader={({ src, width }) => {
            return src + (width > 1023 ? product[activeProduct].image.desktop : product[activeProduct].image.mobile);
          }}
          className="object-cover"
          fill
          alt={`Product ${activeProduct + 1}`}
        />
      </div>
      <div className="h-[410px] w-full px-8 py-[61px] lg:h-full lg:w-auto lg:p-[100px] lg:pt-[calc(120/800*100dvh)]">
        <h1 className="text-[40px] font-semibold leading-[37px] tracking-[-1.7px] lg:text-[48px] lg:leading-[45px] lg:tracking-[-2px]">{product[activeProduct].title}</h1>
        <p className="text-room-primary-200 mt-[15px] font-medium leading-[22px] tracking-[-.35px] lg:mt-[22px]">{product[activeProduct].description}</p>
        <a
          href={product[activeProduct].link}
          className="text-room-primary-400 hover:text-room-primary-200 group mt-10 flex items-center gap-[18px] text-[15px] uppercase leading-none tracking-[12.5px] lg:mt-[23px]"
        >
          Shop Now
          <svg
            className="fill-room-primary-400 group-hover:fill-room-primary-200 w-10"
            viewBox="0 0 40 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.05 0l5.481 5.527h.008v.008L40 6l-.461.465v.063l-.062-.001L34.049 12l-.662-.668 4.765-4.805H0v-1h38.206l-4.82-4.86L34.05 0z"
              fillRule="nonzero"
            />
          </svg>
        </a>
      </div>
      <div className="absolute right-0 top-[calc(var(--height)-56px)] flex h-[56px] w-[112px] lg:bottom-0 lg:left-[calc((100dvh-266px)/534*840)] lg:right-auto lg:top-auto lg:h-[80px] lg:w-[160px]">
        <button
          onClick={() => {
            setActiveProduct((prev) => {
              return prev === 0 ? 2 : prev - 1;
            });
          }}
          className="bg-room-primary-400 hover:bg-room-primary-300 flex h-full w-full items-center justify-center"
        >
          <svg
            viewBox="0 0 14 24"
            className="h-4 stroke-2 lg:h-6 lg:stroke-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 0L1 12l12 12"
              stroke="#FFF"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            setActiveProduct((prev) => {
              return prev === 2 ? 0 : prev + 1;
            });
          }}
          className="bg-room-primary-400 hover:bg-room-primary-300 flex h-full w-full items-center justify-center"
        >
          <svg
            viewBox="0 0 14 24"
            className="h-4 stroke-2 lg:h-6 lg:stroke-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 0l12 12L1 24"
              stroke="#FFF"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="lg:flex lg:h-[266px] lg:w-screen lg:items-center">
      <div className="relative aspect-[210/133] w-full lg:h-full lg:w-auto">
        <Image
          src="/room-homepage/images/image-about-dark.jpg"
          alt="About Dark Image"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex h-[303.8px] flex-col justify-center p-8 pt-10 lg:h-full lg:p-12 lg:pt-[54px]">
        <h2 className="text-[15px] font-bold uppercase tracking-[5.2px] lg:text-[16px] lg:tracking-[6.7px]">About our furniture</h2>
        <p className="text-room-primary-200 mt-4 leading-[22px] tracking-[-.35px] lg:mt-[11px]">
          Our multifunctional collection blends design and function to suit your individual taste. Make each room unique, or pick a cohesive theme that best express your interests and what inspires you. Find the furniture pieces you need, from traditional to contemporary styles or anything in between. Product specialists are available to help you create your dream space.
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
    <footer className="text-room-primary-300 absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
