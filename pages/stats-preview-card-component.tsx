import Head from "next/head";
import Image from "next/image";
import { inter } from "../utils/fonts/inter";
import { lexendDeca } from "../utils/fonts/lexendDeca";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const StatsPreview = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Stats preview card component</title>
      </Head>
      <div
        className={`App relative flex min-h-[100svh] w-screen items-center justify-center bg-stats-preview-primary-blue-200 pb-[88.5px] pt-[88px] font-inter lg:px-10 ${inter.variable} ${lexendDeca.variable}`}
      >
        <Card />
        <Footer />
        {/* <Slider basePath="/stats-preview-card-component/design/" /> */}
      </div>
    </>
  );
};

function Card() {
  return (
    <div className="flex w-full flex-col items-center overflow-hidden rounded-lg bg-stats-preview-primary-blue-100 text-stats-preview-neutral-100 shadow-xl shadow-stats-preview-primary-blue-100/20 max-lg:max-w-[calc(375px-48px)] lg:h-[min(calc(446/540*(50vw-40px)),446px)] lg:w-[1110px] lg:flex-row-reverse">
      <header className="relative aspect-[327/240] w-full text-stats-preview-neutral-100 lg:aspect-[540/446] lg:h-full lg:w-auto">
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-stats-preview-primary-violet mix-blend-multiply" />
        <div className="absolute left-0 top-0 z-20 h-full w-full bg-stats-preview-primary-violet/[.25]" />
        <Image
          src="/stats-preview-card-component/images"
          loader={({ src, width }) =>
            `${src}/image-header-${width > 1023 ? "desktop" : "mobile"}.jpg`
          }
          alt="Business Illustration"
          className="object-contain"
          fill
        />
      </header>
      <MainBody />
    </div>
  );
}

function MainBody() {
  return (
    <main className="px-[30px] pb-[35px] pt-[40px] lg:mt-[9px] lg:flex lg:h-[calc((100%-133px)+60px)] lg:max-h-[calc(446px-71px-62px)] lg:flex-col lg:px-[min(calc(72/1440*100vw),72px)] lg:py-0 lg:pr-[min(calc(120/720*(50vw-40px)),120px)]">
      <h1 className="text-center text-[28px] font-bold leading-[32px] lg:text-left lg:text-[36px] lg:leading-[44px]">
        Get <span className="text-stats-preview-primary-violet">insights</span>{" "}
        that help your business grow.
      </h1>
      <p className="mt-4 text-center text-[15px] leading-[25px] text-stats-preview-neutral-300 lg:my-[25px] lg:text-left">
        Discover the benefits of data analytics and make better decisions
        regarding revenue, customer experience, and overall efficiency.
      </p>
      <ul className="mr-[1px] mt-9 flex flex-col items-center gap-[24px] uppercase lg:mt-auto lg:flex-row lg:gap-[62px] [&_span:first-child]:text-[24px] [&_span:last-child]:font-lexend-deca [&_span:last-child]:text-[13px] [&_span:last-child]:tracking-[.3px] [&_span:last-child]:text-stats-preview-neutral-300">
        <li className="flex flex-col items-center justify-center gap-[1px] lg:items-start">
          <span className="font-bold lowercase">10k+</span>
          <span>companies</span>
        </li>
        <li className="flex flex-col items-center justify-center gap-[1px] lg:items-start">
          <span className="font-bold">314</span>
          <span>templates</span>
        </li>
        <li className="-mt-[1px] flex flex-col items-center justify-center gap-[1px] lg:items-start">
          <span className="font-bold">12m+</span>
          <span>queries</span>
        </li>
      </ul>
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-stats-preview-neutral-100 [&_a]:font-bold [&_a]:text-stats-preview-primary-violet [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
export default StatsPreview;
