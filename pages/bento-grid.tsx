import Head from "next/head";
import Image from "next/image";
import { dmSans } from "../utils/fonts/dmSans";

import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

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
        <Slider basePath="/bento-grid/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <div className="grid w-full grid-cols-[repeat(1,minmax(0,400px))] place-content-center gap-8 bg-bento-purple-100/25 px-4 py-[32px]">
      <section className="flex h-[290px] w-full flex-col items-center justify-center rounded-lg bg-bento-purple-500 p-6 pt-[28px]">
        <h1 className="text-center text-[45px] font-medium leading-[42px] -tracking-[1.25px] text-bento-white">
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
        <p className="mt-1 text-lg text-bento-yellow-100">
          Over 4,000 5-star reviews
        </p>
      </section>
      <section className="flex min-h-[163px] w-full flex-col items-center justify-center rounded-lg bg-bento-white py-4 pl-4 pr-[10px]">
        <div className="relative aspect-[633/134] w-full">
          <Image
            src="/bento-grid/assets/images/illustration-multiple-platforms.webp"
            alt="Illustration Multiple Platforms"
            fill
          />
        </div>
        <h2 className="mt-[16px] text-left text-[26px] font-medium leading-[24px] -tracking-[1.5px] text-bento-black">
          Manage multiple accounts and platforms.
        </h2>
      </section>
      <section className="flex h-[216px] w-full flex-col items-start overflow-hidden rounded-lg bg-bento-yellow-500 p-4 pb-0">
        <h2 className="text-left text-[26px] font-medium leading-[24px] -tracking-[1.5px] text-bento-black">
          Maintain a consistent posting schedule.
        </h2>
        <div className="relative mt-4 aspect-[414/314] w-[208px]">
          <Image
            src="/bento-grid/assets/images/illustration-consistent-schedule.webp"
            alt="Illustration Consistent Schedule"
            fill
          />
        </div>
      </section>
      <section className="flex min-h-[469px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-bento-purple-100 p-[18.25px] py-8">
        <h2 className="text-center text-[26px] font-medium leading-[24px] -tracking-[1.5px] text-bento-black">
          Schedule to social media.
        </h2>
        <div className="relative mt-6 aspect-[715/638] w-full">
          <Image
            src="/bento-grid/assets/images/illustration-schedule-posts.webp"
            alt="Illustration Schedule Posts"
            fill
          />
        </div>
        <p className="mt-[23px] px-2 text-center text-lg leading-[1.125] text-bento-black">
          Optimize post timings to publish content at the perfect time for your
          audience.
        </p>
      </section>
      <section className="flex h-[372px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-bento-purple-500 p-4 py-[23px]">
        <div className="relative aspect-[456/402] w-[228px]">
          <Image
            src="/bento-grid/assets/images/illustration-grow-followers.webp"
            alt="Illustration Grow Followers"
            fill
          />
        </div>
        <h2 className="mt-[41px] w-[240px] text-center text-[31px] font-medium leading-[28px] -tracking-[1.5px] text-bento-white">
          Grow followers with non-stop content.
        </h2>
      </section>
      <section className="flex h-[215px] w-full flex-col items-start overflow-hidden rounded-lg bg-bento-white p-6 pt-[22px]">
        <h2 className="flex items-center text-[46px] font-medium leading-none text-bento-black">
          <span className="-translate-y-[4.5px]">{">"}</span>
          <span className="-ml-1 -tracking-[1.75px]">56%</span>
        </h2>
        <p className="mt-[12px] text-lg leading-[1.125] text-bento-black">
          faster audience growth
        </p>
        <div className="relative mt-6 aspect-[358/134] h-[68px]">
          <Image
            src="/bento-grid/assets/images/illustration-audience-growth.webp"
            alt="Illustration Audience Growth"
            fill
          />
        </div>
      </section>
      {/* {`
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
