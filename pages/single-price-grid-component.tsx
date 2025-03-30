import Head from "next/head";
import { karla } from "../utils/fonts/karla";
// import Image from "next/image";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function SinglePriceGrid() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Single Price Grid Component</title>
      </Head>
      <div
        className={`App relative flex min-h-[100svh] w-screen flex-col items-center justify-center bg-single-price-neutral-100 py-[72px] font-karla ${karla.variable}`}
      >
        <Main />
        <Footer />
        {/* <Slider basePath="/single-price-grid-component/design/" /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <main
      className="grid w-[calc(100vw-64px)] max-w-[calc(375px-64px)] grid-cols-1 grid-rows-[repeat(3,auto)] overflow-hidden rounded shadow-xl shadow-single-price-primary-cyan/20 lg:h-[475px] lg:w-[635px] lg:max-w-none lg:grid-cols-2 lg:grid-rows-[216px,auto] lg:rounded-[8px]"
      aria-labelledby="title"
    >
      <section
        className="h-[267px] bg-white px-6 pt-[29px] leading-none tracking-[-0.2px] lg:col-span-2 lg:h-auto lg:px-[40px] lg:pt-[42px]"
        aria-labelledby="title"
      >
        <h1
          className="text-[20px] font-bold text-single-price-primary-cyan lg:text-[24px]"
          id="title"
        >
          Join our community
        </h1>
        <p className="mt-[26px] text-[15px] font-bold leading-[20px] text-single-price-primary-yellow lg:mt-[27px] lg:text-[18px]">
          30-day, hassle-free money back guarantee
        </p>
        <p className="mt-[16px] text-[14px] leading-[26px] tracking-[-0.15px] text-single-price-neutral-200 lg:mt-[11px] lg:text-[16px]">
          Gain access to our full library of tutorials along with expert code
          reviews. Perfect for any developers who are serious about honing their
          skills.
        </p>
      </section>
      <section
        className="flex h-[228px] flex-col bg-single-price-primary-cyan px-6 pb-6 pt-[26px] leading-none tracking-[-0.2px] lg:h-auto lg:px-[40px] lg:pb-[39px] lg:pt-[42px]"
        aria-labelledby="subs"
      >
        <h2 className="text-[18px] font-bold text-white" id="subs">
          Monthly Subscription
        </h2>
        <p className="mt-[21px] flex items-center gap-3 lg:mt-[22px]">
          <span className="text-[32px] font-bold text-white">&#36;29</span>
          <span className="text-single-price-neutral-100/60">per month</span>
        </p>
        <p className="mt-[11px] tracking-[-0.15px] text-single-price-neutral-100/90">
          Full access for less than &#36;1 a day
        </p>
        <a
          href=""
          className="mt-auto flex h-12 items-center justify-center rounded bg-single-price-primary-yellow font-bold text-white/75 shadow-lg shadow-black/10 hover:bg-[hsl(71,73%,48%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-single-price-primary-yellow"
        >
          Sign Up
        </a>
      </section>
      <section
        className="flex h-[227px] flex-col bg-single-price-primary-cyan/80 px-6 pb-[27px] pt-[26px] leading-none tracking-[-0.2px] lg:h-auto lg:px-[40px] lg:py-[42px]"
        aria-labelledby="why-us"
      >
        <h2 className="text-[18px] font-bold text-white" id="why-us">
          Why Us
        </h2>
        <ul className="mt-auto flex flex-col gap-[6px] [&>li]:text-[14px] [&>li]:text-white/60">
          <li>Tutorials by industry experts</li>
          <li>Peer &amp; expert code review</li>
          <li>Coding exercises</li>
          <li>Access to our GitHub repos</li>
          <li>Community forum</li>
          <li>Flashcard decks</li>
          <li>New videos every week</li>
        </ul>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 z-20 w-full text-center text-[11px] text-single-price-primary-cyan lg:text-[13px] [&_a]:font-bold [&_a]:text-single-price-primary-cyan [&_a]:underline [&_a]:decoration-single-price-primary-yellow [&_a]:decoration-wavy">
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
