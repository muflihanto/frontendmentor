import dynamic from "next/dynamic";
import Head from "next/head";
import Footer from "../components/advice-generator-app/Footer";
import Main from "../components/advice-generator-app/Main";
import { manropeVar } from "../utils/fontLoader";
const Slider = dynamic(() => import("../components/Slider.jsx"), {
  ssr: false,
});
export default function AdviceGenerator() {
  return (
    <div className={`${manropeVar} font-manrope font-extrabold text-[28px] bg-advice-neutral-300 flex flex-col h-screen justify-center items-center relative`}>
      <Head>
        <title>Frontend Mentor | Advice generator app</title>
      </Head>
      <Main />
      <Footer />
      <Slider basePath="/advice-generator-app/design" />
    </div>
  );
}
