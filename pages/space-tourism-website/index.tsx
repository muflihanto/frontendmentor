import Head from "next/head";
import Link from "next/link";
import { getLayout } from "../../components/space-tourism-website/Layout";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../../components/SliderTs"), { ssr: false });

export default function Index() {
  return (
    <>
      <Head>
        <title>Space Tourism Website | Home</title>
      </Head>
      <div className="App relative min-h-[100svh] bg-space-tourism-black bg-[url('/space-tourism-website/assets/home/background-home-mobile.jpg')] bg-cover p-6 pt-28 text-white md:min-h-[1024px] md:bg-[url('/space-tourism-website/assets/home/background-home-tablet.jpg')] md:pt-[202px] lg:flex lg:min-h-screen lg:flex-col lg:justify-end lg:bg-[url('/space-tourism-website/assets/home/background-home-desktop.jpg')] lg:px-0 lg:pb-[min(max(calc(100vh-600px),60px),131px)] lg:pt-[176px]">
        <Main />
        {/* <Slider
          basePath=""
          // absolutePath="/space-tourism-website/design/mobile-home.jpg"
          absolutePath="/space-tourism-website/design/desktop-home.jpg"
        /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <main
      className="flex flex-col items-center font-barlow lg:flex-row lg:items-end lg:justify-between lg:px-[min(12vw,165px)]"
      aria-label="Homepage"
    >
      <div className="flex flex-col items-center space-y-4 md:space-y-6 lg:items-start lg:space-y-6 lg:[&>*]:text-left">
        <h5 className="text-center font-barlow-condensed uppercase leading-[19px] tracking-[2.7px] text-space-tourism-lightblue md:ml-1 md:text-xl md:leading-6 md:tracking-[3.38px] lg:ml-0 lg:text-[28px] lg:leading-[34px] lg:tracking-[4.72px]">
          So, you want to travel to
        </h5>
        <h1 className="w-full text-center font-bellefair text-[80px] uppercase leading-[100px] text-space-tourism-white md:mr-1 md:text-[150px] md:leading-[150px] lg:leading-[172px]">
          Space
        </h1>
        <p className="max-w-md text-center text-[15px] leading-[25px] text-space-tourism-lightblue md:w-[444px] md:translate-y-[-1px] md:text-base md:leading-[28px] lg:w-[450px] lg:text-[18px] lg:leading-[32px]">
          Let’s face it; if you want to go to space, you might as well genuinely
          go to outer space and not hover kind of on the edge of it. Well sit
          back, and relax because we’ll give you a truly out of this world
          experience!
        </p>
      </div>

      <Link
        href="/space-tourism-website/destination"
        className="mt-[81px] flex aspect-square w-[150px] items-center justify-center rounded-full bg-space-tourism-white transition-all duration-200 hover:ring-[50px] hover:ring-space-tourism-lightblue/10 md:mt-[156px] md:w-[242px] md:hover:ring-[75px] lg:mt-0 lg:w-[274px] lg:hover:ring-[88px]"
      >
        <p className="ml-0.5 mt-2 w-[93px] text-center font-bellefair text-[20px] uppercase leading-[23px] tracking-[1.25px] text-space-tourism-black md:mt-0 md:w-auto md:text-[32px] md:leading-[37px] md:tracking-[2px]">
          Explore
        </p>
      </Link>
    </main>
  );
}

Index.getLayout = getLayout;

// function Footer() {
//   return (
//     <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
//       Challenge by{" "}
//       <a
//         href="https://www.frontendmentor.io?ref=challenge"
//         target="_blank"
//         rel="noreferrer"
//       >
//         Frontend Mentor
//       </a>
//       . Coded by{" "}
//       <a
//         href="https://github.com/muflihanto"
//         target="_blank"
//         rel="noreferrer"
//       >
//         Muflihanto
//       </a>
//       .
//     </footer>
//   );
// }
