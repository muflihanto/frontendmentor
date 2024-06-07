import Head from "next/head";
import { lexendDeca } from "../utils/fonts/lexendDeca";
import { bigShouldersDisplay } from "../utils/fonts/bigShouldersDisplay";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const TriColumnPreview = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | 3-column preview card component</title>
      </Head>
      <div
        className={`App relative flex min-h-[100svh] items-center justify-center bg-3-column-neutral-200 py-[88px] font-lexend-deca lg:pb-[calc(46/800*100vh)] lg:pt-[calc(88/800*100vh)] ${lexendDeca.variable} ${bigShouldersDisplay.variable}`}
      >
        <Cards />
        <Footer />
        {/* <Slider
          basePath="/3-column-preview-card-component/design/"
          absolutePath="/3-column-preview-card-component/design/active-states.jpg"
        /> */}
      </div>
    </>
  );
};

function Cards() {
  return (
    <div className="grid h-[calc(3*442px)] w-[calc(100%-48px)] max-w-[calc(375px-48px)] grid-cols-1 grid-rows-3 overflow-hidden rounded-lg lg:h-[500px] lg:max-w-[calc(3*307px)] lg:grid-cols-3 lg:grid-rows-1">
      <Main />
    </div>
  );
}

function Main() {
  return (
    <>
      <div className="flex flex-col bg-3-column-primary-orange px-[48px] py-[48px]">
        <Icons variant="sedans" />
        <h2 className="mt-[29px] font-big-shoulders-display text-[40px] font-bold uppercase text-3-column-neutral-200">
          Sedans
        </h2>
        <p className="mt-[19px] text-[15px] leading-[25px] text-3-column-neutral-100">
          Choose a sedan for its affordability and excellent fuel economy. Ideal
          for cruising in the city or on your next road trip.
        </p>
        <LearnMore />
      </div>
      <div className="flex flex-col bg-3-column-primary-cyan-100 px-[48px] py-[48px]">
        <Icons variant="suvs" />
        <h2 className="mt-[29px] font-big-shoulders-display text-[40px] font-bold uppercase text-3-column-neutral-200">
          SUVs
        </h2>
        <p className="mt-[19px] text-[15px] leading-[25px] text-3-column-neutral-100">
          Take an SUV for its spacious interior, power, and versatility. Perfect
          for your next family vacation and off-road adventures.
        </p>
        <LearnMore />
      </div>
      <div className="flex flex-col bg-3-column-primary-cyan-200 px-[48px] py-[48px]">
        <Icons variant="luxury" />
        <h2 className="mt-[29px] font-big-shoulders-display text-[40px] font-bold uppercase text-3-column-neutral-200">
          Luxury
        </h2>
        <p className="mt-[19px] text-[15px] leading-[25px] text-3-column-neutral-100">
          Cruise in the best car brands without the bloated prices. Enjoy the
          enhanced comfort of a luxury rental and arrive in style.
        </p>
        <LearnMore />
      </div>
    </>
  );
}

function LearnMore({ href = "" }: { href?: string }) {
  return (
    <a
      href={href}
      className="group relative ml-[1px] mt-auto inline-block h-[48px] w-[146px] overflow-hidden rounded-full bg-inherit hover:outline hover:outline-[2px] hover:outline-offset-[-2px] hover:outline-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <span className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-3-column-neutral-200 pb-[1px] pr-[1px] text-center text-[15px] leading-none text-black mix-blend-screen group-hover:bg-transparent group-hover:text-white">
        Learn More
      </span>
    </a>
  );
}

function Icons({ variant }: { variant: "sedans" | "luxury" | "suvs" }) {
  return (
    <svg className="ml-[1px] h-10 w-[64px]" viewBox="0 0 64 40">
      <title>{variant}</title>
      <use
        href={`/3-column-preview-card-component/images/icon-${variant}.svg#icon-${variant}`}
      />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:text-indigo-500 [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

export default TriColumnPreview;
