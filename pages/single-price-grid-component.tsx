import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function SinglePriceGrid() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Single Price Grid Component</title>
      </Head>
      <div className="App font-karla bg-single-price-neutral-100 relative flex min-h-[100svh] w-screen flex-col items-center justify-center py-[72px]">
        <Main />
        <Footer />
        {/* <Slider basePath="/single-price-grid-component/design/" /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <div className="shadow-single-price-primary-cyan/20 grid w-[calc(100vw-64px)] max-w-[calc(375px-64px)] grid-cols-1 grid-rows-[repeat(3,auto)] overflow-hidden rounded shadow-xl lg:h-[475px] lg:w-[635px] lg:max-w-none lg:grid-cols-2 lg:grid-rows-[216px,auto] lg:rounded-[8px]">
      <div className="h-[267px] bg-white px-6 pt-[29px] leading-none tracking-[-0.2px] lg:col-span-2 lg:h-auto lg:px-[40px] lg:pt-[42px]">
        <h1 className="text-single-price-primary-cyan text-[20px] font-bold lg:text-[24px]">Join our community</h1>
        <p className="text-single-price-primary-yellow mt-[26px] text-[15px] font-bold leading-[20px] lg:mt-[27px] lg:text-[18px]">30-day, hassle-free money back guarantee</p>
        <p className="text-single-price-neutral-200 mt-[16px] text-[14px] leading-[26px] tracking-[-0.15px] lg:mt-[11px] lg:text-[16px]">Gain access to our full library of tutorials along with expert code reviews. Perfect for any developers who are serious about honing their skills.</p>
      </div>
      <div className="bg-single-price-primary-cyan flex h-[228px] flex-col px-6 pt-[26px] pb-6 leading-none tracking-[-0.2px] lg:h-auto lg:px-[40px] lg:pt-[42px] lg:pb-[39px]">
        <h2 className="text-[18px] font-bold text-white">Monthly Subscription</h2>
        <p className="mt-[21px] flex items-center gap-3 lg:mt-[22px]">
          <span className="text-[32px] font-bold text-white">&#36;29</span>
          <span className="text-single-price-neutral-100/60">per month</span>
        </p>
        <p className="text-single-price-neutral-100/90 mt-[11px] tracking-[-0.15px]">Full access for less than &#36;1 a day</p>
        <a
          href=""
          className="bg-single-price-primary-yellow focus-visible:outline-single-price-primary-yellow mt-auto flex h-12 items-center justify-center rounded font-bold text-white/75 shadow-lg shadow-black/10 hover:bg-[hsl(71,73%,48%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Sign Up
        </a>
      </div>
      <div className="bg-single-price-primary-cyan/80 flex h-[227px] flex-col px-6 pt-[26px] pb-[27px] leading-none tracking-[-0.2px] lg:h-auto lg:px-[40px] lg:py-[42px]">
        <h2 className="text-[18px] font-bold text-white">Why Us</h2>
        <ul className="mt-auto flex flex-col gap-[6px] [&>li]:text-[14px] [&>li]:text-white/60">
          <li>Tutorials by industry experts</li>
          <li>Peer &amp; expert code review</li>
          <li>Coding exercises</li>
          <li>Access to our GitHub repos</li>
          <li>Community forum</li>
          <li>Flashcard decks</li>
          <li>New videos every week</li>
        </ul>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="[&_a]:text-single-price-primary-cyan [&_a]:decoration-single-price-primary-yellow absolute bottom-3 z-20 w-full text-center text-[11px] lg:text-[13px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-wavy">
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
