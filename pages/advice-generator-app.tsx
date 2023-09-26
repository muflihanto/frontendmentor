import Head from "next/head";
import Footer from "../components/advice-generator-app/Footer";
import Main from "../components/advice-generator-app/Main";
import { manropeVar } from "../utils/fontLoader";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), {
//   ssr: false,
// });

export default function AdviceGenerator() {
  return (
    <div className={`${manropeVar} font-manrope bg-advice-neutral-300 relative flex h-screen flex-col items-center justify-center text-[28px] font-extrabold lg:pt-0`}>
      <Head>
        <title>Frontend Mentor | Advice generator app</title>
      </Head>
      <Main />
      <Footer />
      {/* <Slider basePath="/advice-generator-app/design" /> */}
    </div>
  );
}
