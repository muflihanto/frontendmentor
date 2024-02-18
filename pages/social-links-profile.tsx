import Head from "next/head";
import Image from "next/image";
import { inter } from "../utils/fonts/inter";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function SocialLinksProfile() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Social links profile</title>
      </Head>
      <div
        className={`App bg-social-links-netural-400 relative flex min-h-[100svh] flex-col items-center justify-center ${inter.className} py-16 font-inter`}
      >
        <Main />
        <Footer />
        {/* <Slider basePath="/social-links-profile/design" /> */}
      </div>
    </>
  );
}

function Main() {
  const links = [
    {
      name: "GitHub",
      href: "",
    },
    {
      name: "Frontend Mentor",
      href: "",
    },
    {
      name: "LinkedIn",
      href: "",
    },
    {
      name: "Twitter",
      href: "",
    },
    {
      name: "Instagram",
      href: "",
    },
  ];
  return (
    <main className="bg-social-links-netural-300 -mt-px flex h-[579px] w-[calc(100vw-48px)] max-w-[384px] flex-col items-center rounded-xl p-6 lg:h-[611px] lg:p-10">
      <div className="relative aspect-square w-[88px] overflow-hidden rounded-full">
        <Image
          src="/social-links-profile/assets/images/avatar-jessica.jpeg"
          className="absolute object-contain"
          alt="Jessica Randall's Avatar"
          fill
        />
      </div>
      <h1 className="text-social-links-netural-100 mt-[26px] text-center text-2xl font-semibold">
        Jessica Randall
      </h1>
      <p className="text-social-links-primary mt-1.5 text-center text-sm font-bold">
        London, United Kingdom
      </p>
      <p className="text-social-links-netural-100/[0.7] mt-[25px] text-center text-sm font-medium tracking-[-.05px]">
        &quot;Front-end developer and avid reader.&quot;
      </p>
      <ul className="mt-[25px] flex w-full flex-col gap-4">
        {links.map((el) => {
          return (
            <li
              key={el.name}
              className="bg-social-links-netural-200 text-social-links-netural-100 flex h-[45px] w-full items-center justify-center rounded-lg text-sm font-bold"
            >
              <a href={el.href}>{el.name}</a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

function Footer() {
  return (
    <footer className="text-social-links-netural-100 absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
