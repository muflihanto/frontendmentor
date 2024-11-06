import Head from "next/head";
import Image from "next/image";
import { dmSans } from "../utils/fonts/dmSans";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function BentoGrid() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Bento grid</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] overflow-x-hidden bg-white font-dm-sans ${dmSans.variable}`}
      >
        <Main />
        <Footer />
        {/* <Slider basePath="/bento-grid/design" /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <div className="bg-bento-purple-100/25 grid w-full grid-cols-1 gap-8 px-4 py-[32px]">
      <section className="bg-bento-purple-500 flex h-[290px] w-full flex-col items-center rounded-lg p-6 pt-[40px]">
        <h1 className="text-bento-white text-center text-[45px] font-medium leading-[42px] -tracking-[1.25px]">
          Social Media <span className="text-bento-yellow-500">10x</span>{" "}
          <span className="italic">Faster</span> with AI
        </h1>
        <div className="relative mt-6 aspect-[384/64] w-[192px]">
          <Image
            src="/bento-grid/assets/images/illustration-five-stars.webp"
            alt="Illustration five stars"
            fill
          />
        </div>
        <p className="text-bento-yellow-100 mt-1 text-lg">
          Over 4,000 5-star reviews
        </p>
      </section>
      <section className="bg-bento-white flex h-[163px] w-full flex-col items-center rounded-lg py-4 pl-4 pr-[10px]">
        <div className="relative aspect-[633/134] w-full">
          <Image
            src="/bento-grid/assets/images/illustration-multiple-platforms.webp"
            alt="Illustration Multiple Platforms"
            fill
          />
        </div>
        <h2 className="text-bento-black mt-[16px] text-left text-[26px] font-medium leading-[24px] -tracking-[1.5px]">
          Manage multiple accounts and platforms.
        </h2>
      </section>
      <section className="bg-bento-yellow-500 flex h-[216px] w-full flex-col items-start overflow-hidden rounded-lg p-4 pb-0">
        <h2 className="text-bento-black text-left text-[26px] font-medium leading-[24px] -tracking-[1.5px]">
          Maintain a consistent posting schedule.
        </h2>
        <div className="relative mt-4 aspect-[414/314] w-[208px]">
          <Image
            src="/bento-grid/assets/images/illustration-consistent-schedule.webp"
            alt="Illustration Multiple Platforms"
            fill
          />
        </div>
      </section>
      {/* {`
        Schedule to social media.
        Optimize post timings to publish content at the perfect time for your audience.
        
        Grow followers with non-stop content.

        >56% faster audience growth
        
        Create and schedule content quicker.

        Write your content using AI.
      `} */}
    </div>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-black [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
