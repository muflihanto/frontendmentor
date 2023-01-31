import dynamic from "next/dynamic";
import Head from "next/head";
import Footer from "../components/intro-section-with-dropdown-navigation/Footer";
import Header from "../components/intro-section-with-dropdown-navigation/Header";
import Hero from "../components/intro-section-with-dropdown-navigation/Hero";
import Main from "../components/intro-section-with-dropdown-navigation/Main";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });
import { epilogueVar } from "../utils/fontLoader";
import { createContext } from "react";

export const FontContext = createContext();

export default function IntroDropdown() {
  return (
    <FontContext.Provider value={`${epilogueVar} font-epilogue`}>
      <div
        id="intro-with-dropdown"
        className={`${epilogueVar} font-epilogue min-h-screen pb-16 max-w-screen-sm mx-auto lg:max-w-full lg:bg-introdrop-neutral-100 relative`}
      >
        <Head>
          <title>Frontend Mentor | Intro section with dropdown navigation</title>
        </Head>
        <Header />
        <div className="flex flex-col lg:flex-row-reverse lg:pr-[130px] lg:pl-[164px] lg:py-[46px] lg:gap-32">
          <Hero />
          <Main />
        </div>
        <Footer />
        {/* <Slider
          basePath="/intro-section-with-dropdown-navigation/design"
          // absolutePath="/intro-section-with-dropdown-navigation/design/mobile-menu-expanded.jpg"
          // absolutePath="/intro-section-with-dropdown-navigation/design/mobile-menu-collapsed.jpg"
          // active={true}
        /> */}
      </div>
    </FontContext.Provider>
  );
}
