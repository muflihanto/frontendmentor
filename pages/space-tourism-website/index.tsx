import Head from "next/head";
import Link from "next/link";
import { getLayout } from "../../components/space-tourism-website/Layout";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../../components/Slider"), { ssr: false });

export default function Index() {
  return (
    <>
      <Head>
        <title>Space Tourism Website | Home</title>
      </Head>
      <div className="App bg-space-tourism-black relative min-h-[100svh] bg-[url('/space-tourism-website/assets/home/background-home-mobile.jpg')] p-6 pt-28 text-white">
        <Main />
        {/* <Slider
          basePath=""
          absolutePath="/space-tourism-website/design/mobile-home.jpg"
        /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <div className="font-barlow flex flex-col items-center">
      <div className="flex flex-col items-center space-y-4">
        <h5 className="font-barlow-condensed text-space-tourism-lightblue text-center uppercase leading-[19px] tracking-[2.7px]">So, you want to travel to</h5>
        <h1 className="font-bellefair text-space-tourism-white w-full text-center text-[80px] uppercase leading-[100px]">Space</h1>
        <p className="text-space-tourism-lightblue text-center text-[15px] leading-[25px]">Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!</p>
      </div>

      <Link
        href="/space-tourism-website/destination"
        className="bg-space-tourism-white hover:ring-space-tourism-lightblue/10 mt-[81px] flex aspect-square w-[150px] items-center justify-center rounded-full hover:ring-[50px]"
      >
        <p className="font-bellefair text-space-tourism-black ml-0.5 mt-2 w-[93px] text-center text-[20px] uppercase leading-[23px] tracking-[1.25px]">Explore</p>
      </Link>
    </div>
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
