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
        className={`App relative h-[2607px] min-h-[100svh] overflow-x-hidden bg-white font-dm-sans md:h-auto ${dmSans.variable}`}
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
    <main className="grid h-full w-full grid-cols-[repeat(1,minmax(0,400px))] place-content-center gap-8 bg-bento-purple-100/25 px-4 pb-[41px] pt-[32px] md:grid-cols-[repeat(2,minmax(0,400px))] md:py-16 lg:grid-cols-[repeat(4,minmax(0,256px))] lg:grid-rows-[324px,247px,247px] lg:pb-[64px] lg:pt-[83px]">
      <h1 className="sr-only">Bento Grid Page</h1>
      <section className="flex h-[290px] w-full flex-col items-center justify-center rounded-[10px] bg-bento-purple-500 p-6 pt-[28px] md:col-span-2 lg:col-start-2 lg:h-full">
        <h2 className="text-center text-[45px] font-medium leading-[42px] -tracking-[1.25px] text-bento-white lg:text-[62px] lg:leading-[58px] lg:-tracking-[3px]">
          Social Media <span className="text-bento-yellow-500">10x</span>{" "}
          <span className="italic">Faster</span> with AI
        </h2>
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
      <section className="flex min-h-[163px] w-full flex-col items-center justify-center rounded-[10px] bg-bento-white py-4 pl-4 pr-[10px] lg:col-start-2 lg:row-start-2 lg:overflow-hidden lg:p-6">
        <div className="relative aspect-[633/134] w-full lg:h-[67px] lg:w-auto lg:shrink-0 lg:self-start">
          <Image
            src="/bento-grid/assets/images/illustration-multiple-platforms.webp"
            alt="Illustration Multiple Platforms"
            fill
          />
        </div>
        <h2 className="mt-[16px] text-left text-[26px] font-medium leading-[24px] -tracking-[1.5px] text-bento-black lg:mt-[20px] lg:text-[32px] lg:leading-[28px] lg:-tracking-[2px]">
          Manage multiple accounts and platforms.
        </h2>
      </section>
      <section className="flex h-[216px] w-full flex-col items-start overflow-hidden rounded-[10px] bg-bento-yellow-500 p-4 pb-0 lg:col-start-3 lg:row-start-2 lg:h-full lg:p-6">
        <h2 className="text-left text-[26px] font-medium leading-[24px] -tracking-[1.5px] text-bento-black lg:text-[32px] lg:leading-[28px] lg:-tracking-[2px]">
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
      <section className="flex min-h-[469px] w-full flex-col items-center justify-center overflow-hidden rounded-[10px] bg-bento-purple-100 p-[18.25px] py-8 lg:row-span-2 lg:items-start lg:p-8">
        <h2 className="text-center text-[26px] font-medium leading-[24px] -tracking-[1.5px] text-bento-black lg:text-left lg:text-[32px] lg:leading-[28px] lg:-tracking-[2px]">
          Schedule to social media.
        </h2>
        <div className="relative mt-6 aspect-[715/638] w-full lg:h-[319px] lg:w-auto lg:self-start">
          <Image
            src="/bento-grid/assets/images/illustration-schedule-posts.webp"
            alt="Illustration Schedule Posts"
            fill
          />
        </div>
        <p className="mt-[23px] px-2 text-center text-lg leading-[1.125] text-bento-black lg:p-0 lg:text-left">
          Optimize post timings to publish content at the perfect time for your
          audience.
        </p>
      </section>
      <section className="flex h-[372px] w-full flex-col items-center justify-center overflow-hidden rounded-[10px] bg-bento-purple-500 p-4 py-[23px] md:col-span-2 md:flex-row lg:col-start-3 lg:row-start-3 lg:h-auto lg:justify-between lg:gap-3 lg:px-6">
        <div className="relative aspect-[456/402] w-[228px] md:w-[300px] lg:w-[228px] lg:shrink-0">
          <Image
            src="/bento-grid/assets/images/illustration-grow-followers.webp"
            alt="Illustration Grow Followers"
            fill
          />
        </div>
        <h2 className="mt-[41px] w-[240px] text-center text-[31px] font-medium leading-[28px] -tracking-[1.5px] text-bento-white md:mt-0 lg:w-auto lg:text-left lg:text-[39px] lg:leading-[36px] lg:-tracking-[1.5px]">
          Grow followers with non-stop content.
        </h2>
      </section>
      <section className="flex h-[215px] w-full flex-col items-start overflow-hidden rounded-[10px] bg-bento-white p-6 pt-[22px] md:h-full lg:col-start-2 lg:row-start-3 lg:pt-[21px]">
        <h2 className="flex items-center text-[46px] font-medium leading-none text-bento-black lg:text-[62px]">
          <span className="-translate-y-[4.5px] lg:-translate-y-[4.9px]">
            {">"}
          </span>
          <span className="-ml-1 -tracking-[1.75px] lg:-ml-1.5 lg:-tracking-[2.5px]">
            56%
          </span>
        </h2>
        <p className="mt-[12px] text-lg leading-[1.125] text-bento-black lg:mt-[14px]">
          faster audience growth
        </p>
        <div className="relative mt-6 aspect-[358/134] h-[67px] lg:mt-[38px]">
          <Image
            src="/bento-grid/assets/images/illustration-audience-growth.webp"
            alt="Illustration Audience Growth"
            fill
          />
        </div>
      </section>
      <div className="grid w-full grid-cols-1 gap-8 md:col-span-2 md:contents md:grid-cols-2 lg:col-span-1 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:grid lg:grid-cols-1">
        <section className="flex h-[234px] w-full flex-col items-start overflow-hidden rounded-[10px] bg-bento-yellow-100 p-8 pr-[30px] lg:col-start-1 lg:row-start-1 lg:h-[415px] lg:justify-center lg:pr-[28px]">
          <h2 className="text-[32px] font-medium leading-[28px] -tracking-[1.8px] text-bento-black lg:text-[39px] lg:leading-[36.5px] lg:-tracking-[3.5px]">
            Create and schedule content{" "}
            <span className="italic text-bento-purple-500">quicker</span>.
          </h2>
          <div className="relative mt-6 aspect-[382/182] h-[90px] lg:mt-[22px] lg:h-[91px]">
            <Image
              src="/bento-grid/assets/images/illustration-create-post.webp"
              alt="Illustration Create Post"
              fill
            />
          </div>
        </section>
        <section className="flex h-[351px] w-full flex-col items-start overflow-hidden rounded-[10px] bg-bento-yellow-500 p-6 md:col-start-2 md:row-start-3 md:h-full lg:col-start-1 lg:row-start-2 lg:h-[434px]">
          <h2 className="text-[32px] font-medium leading-[28px] -tracking-[1.8px] text-bento-black lg:text-[39px] lg:leading-[36px] lg:-tracking-[3.5px]">
            Write your content using AI.
          </h2>
          <div className="relative mt-6 aspect-[440/446] h-[223px] md:h-auto md:w-full lg:mt-auto lg:h-[223px] lg:w-auto">
            <Image
              src="/bento-grid/assets/images/illustration-ai-content.webp"
              alt="Illustration AI Content"
              fill
            />
          </div>
        </section>
      </div>
    </main>
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
