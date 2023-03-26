import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { Fragment, useEffect } from "react";
import { Transition } from "@headlessui/react";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

type Post = {
  title: string;
  body: string;
  href: string;
};

type PostWithImage = Post & {
  image: {
    src: string;
    alt: string;
  };
};

const mobileMenuAtom = atom(false);
const navLinkAtom = atom([
  {
    href: "",
    body: "Home",
  },
  {
    href: "",
    body: "New",
  },
  {
    href: "",
    body: "Popular",
  },
  {
    href: "",
    body: "Trending",
  },
  {
    href: "",
    body: "Categories",
  },
]);
const newPostAtom = atom<Post[]>([
  {
    title: "Hydrogen VS Electric Cars",
    body: "Will hydrogen-fueled cars ever catch up to EVs?",
    href: "",
  },
  {
    title: "The Downsides of AI Artistry",
    body: "What are the possible adverse effects of on-demand AI image generation?",
    href: "",
  },
  {
    title: "Is VC Funding Drying Up?",
    body: "Private funding by VC firms is down 50% YOY. We take a look at what that means.",
    href: "",
  },
]);
const popularPostAtom = atom<PostWithImage[]>([
  {
    title: "Reviving Retro PCs",
    body: "What happens when old PCs are given modern upgrades?",
    href: "",
    image: {
      src: "image-retro-pcs.jpg",
      alt: "Retro PC Illustration",
    },
  },
  {
    title: "Top 10 Laptops of 2022",
    body: "Our best picks for various needs and budgets.",
    href: "",
    image: {
      src: "image-top-laptops.jpg",
      alt: "Top Laptops Illustration",
    },
  },
  {
    title: "The Growth of Gaming",
    body: "How the pandemic has sparked fresh opportunities.",
    href: "",
    image: {
      src: "image-gaming-growth.jpg",
      alt: "Gaming Controller",
    },
  },
]);

export default function NewsHomepage() {
  const isMenuOpen = useAtomValue(mobileMenuAtom);
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);
  return (
    <>
      <Head>
        <title>Frontend Mentor | News homepage</title>
      </Head>
      <div className="App font-inter relative min-h-[100svh] pb-20 lg:pb-32">
        <Header />
        <Sections />
        <Footer />
        {/* <Slider
          basePath="/news-homepage/design"
          absolutePath="/news-homepage/design/active-states.jpg"
        /> */}
        <MobileMenu />
      </div>
    </>
  );
}

function Header() {
  const setMenuOpen = useSetAtom(mobileMenuAtom);

  return (
    <header className="flex h-[88px] items-center justify-between px-4 pb-1 lg:h-[184px] lg:py-0 lg:px-[min(calc(50vw-472px),165px)] lg:pt-[34px]">
      <div className="relative aspect-[65/40] h-[28px] lg:h-10">
        <Image
          src="/news-homepage/assets/images/logo.svg"
          alt="Company Logo"
          fill
          className="object-contain"
        />
      </div>
      <button
        onClick={() => setMenuOpen(true)}
        className={`hidden max-lg:block`}
      >
        <svg
          viewBox="0 0 40 17"
          className="w-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="#00001A"
            fillRule="evenodd"
          >
            <path d="M0 0h40v3H0zM0 7h40v3H0zM0 14h40v3H0z" />
            <path d="M0 0h40v3H0z" />
          </g>
        </svg>
      </button>
      <DesktopNav />
    </header>
  );
}

function NavLinks() {
  const navLinks = useAtomValue(navLinkAtom);
  return (
    <>
      {navLinks.map((link, index) => {
        return (
          <li
            key={index}
            className="flex h-7 items-center text-[18px] lg:text-[16px]"
          >
            <a
              href={link.href}
              className="focus-visible:outline-news-homepage-primary-red hover:text-news-homepage-primary-red lg:text-news-homepage-neutral-300 w-full rounded px-[5px] focus-visible:outline focus-visible:outline-2 lg:px-0"
            >
              {link.body}
            </a>
          </li>
        );
      })}
    </>
  );
}

function DesktopNav() {
  return (
    <nav className="hidden lg:block">
      <ul className="flex flex-row gap-[38.5px]">
        <NavLinks />
      </ul>
    </nav>
  );
}

function MobileMenu() {
  const [isMenuOpen, setMenuOpen] = useAtom(mobileMenuAtom);
  return (
    <Transition
      show={isMenuOpen}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="bg-news-homepage-neutral-400/50 absolute top-0 left-0 h-screen w-screen">
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="absolute right-0 top-0 h-full w-[68.25%] bg-white">
            <button
              onClick={() => setMenuOpen(false)}
              className={`absolute right-[20px] top-[27px]`}
            >
              <svg
                className="w-8"
                viewBox="0 0 32 31"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  fill="#00001A"
                  fillRule="evenodd"
                >
                  <path d="m2.919.297 28.284 28.284-2.122 2.122L.797 2.419z" />
                  <path d="M.797 28.581 29.081.297l2.122 2.122L2.919 30.703z" />
                </g>
              </svg>
            </button>
            <nav className="absolute top-[142px] w-full px-5">
              <ul className="flex flex-col gap-5">
                <NavLinks />
              </ul>
            </nav>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}

function Sections() {
  return (
    <div className="px-4 lg:grid lg:grid-cols-3 lg:grid-rows-[fit-content(512px),auto] lg:gap-x-[30px] lg:gap-y-[71px] lg:px-[min(calc(50vw-472px),165px)]">
      <MainSection />
      <NewPostSection />
      <PopularPostSection />
    </div>
  );
}

function MainSection() {
  return (
    <div className="lg:col-span-2 lg:grid lg:grid-cols-1 lg:grid-rows-[auto_182px] lg:gap-[30px]">
      <header className="relative aspect-[686/600] w-full lg:aspect-auto lg:h-full">
        <Image
          src="/news-homepage/assets/images"
          loader={({ src, width }) => {
            return `${src}/image-web-3-${width > 1023 ? "desktop" : "mobile"}.jpg`;
          }}
          alt="Web 3.0 Illustration"
          fill
          className="lg:object-cover"
        />
      </header>
      <main className="lg:grid lg:grid-cols-2 lg:grid-rows-[auto,auto] lg:gap-x-7">
        <h1 className="text-news-homepage-neutral-400 mt-6 text-[40px] font-extrabold leading-none lg:row-span-2 lg:m-0 lg:self-center lg:pb-[4px] lg:text-[56px]">The Bright Future of Web 3.0?</h1>
        <p className="text-news-homepage-neutral-300 mt-4 text-[15px] leading-[26px] lg:mt-0 lg:leading-[24px] lg:tracking-[.05px]">We dive into the next evolution of the web that claims to put the power of the platforms back into the hands of the people. But is it really fulfilling its promise?</p>
        <a
          href=""
          className="bg-news-homepage-primary-red text-news-homepage-neutral-100 hover:bg-news-homepage-neutral-400 mt-6 flex h-[48px] w-[185px] items-center justify-center text-[14px] font-bold uppercase tracking-[4.25px] lg:mb-[1px] lg:self-end"
        >
          Read more
        </a>
      </main>
    </div>
  );
}

function NewPostSection() {
  const newPosts = useAtomValue(newPostAtom);
  return (
    <section className="bg-news-homepage-neutral-400 mt-16 w-full px-[21px] py-[25px] lg:mt-0 lg:px-[24px] lg:pt-[32px] lg:pb-[33px]">
      <h2 className="text-news-homepage-primary-orange text-[32px] font-bold leading-none lg:text-[40px]">New</h2>
      <ul className="divide-news-homepage-neutral-300 text-news-homepage-neutral-100 mt-[31px] flex flex-col lg:mt-[30px]">
        {newPosts.map(({ body, title, href }, index) => {
          return (
            <Fragment key={index}>
              <li className="flex flex-col justify-center">
                <h3 className="text-[20px] font-bold tracking-[.15px]">
                  <a
                    href={href}
                    className="hover:text-news-homepage-primary-orange"
                  >
                    {title}
                  </a>
                </h3>
                <p className="text-news-homepage-neutral-200 mt-1 text-[15px] leading-[26px] tracking-[.05px] opacity-75 lg:mt-[5px] lg:opacity-90">{body}</p>
              </li>
              {index !== newPosts.length - 1 ? <hr className="border-t-news-homepage-neutral-300 mt-[30px] mb-[28px] w-full lg:mb-[27px]" /> : null}
            </Fragment>
          );
        })}
      </ul>
    </section>
  );
}

function PopularPostSection() {
  const popularPosts = useAtomValue(popularPostAtom);
  return (
    <section className="lg:col-span-3">
      <h2 className="sr-only">Popular</h2>
      <ul className="mt-16 grid grid-cols-1 grid-rows-3 gap-[32px] lg:mt-0 lg:grid-cols-3 lg:grid-rows-1 lg:gap-[30px]">
        {popularPosts.map(({ body, title, href, image }, index) => {
          return (
            <li
              key={index}
              className="grid grid-cols-[100px,auto] grid-rows-1 items-center gap-x-6 lg:h-[fit-content(127px)]"
            >
              <div className="relative h-[129px] w-[100px] lg:aspect-[200/254] lg:h-full">
                <Image
                  src={"/news-homepage/assets/images/" + image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="pb-[1px] lg:flex lg:h-full lg:flex-col lg:self-start">
                <h3 className="text-news-homepage-neutral-200 text-[32px] font-bold leading-none lg:-mt-[1px]">{`0${index + 1}`}</h3>
                <h4 className="mt-[10px] text-[18px] font-extrabold lg:mt-[11px]">
                  <a
                    href={href}
                    className="hover:text-news-homepage-primary-red"
                  >
                    {title}
                  </a>
                </h4>
                <p className="text-news-homepage-neutral-300 mt-[6px] text-[15px] leading-[26px] lg:-mb-[1px] lg:mt-auto">{body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
