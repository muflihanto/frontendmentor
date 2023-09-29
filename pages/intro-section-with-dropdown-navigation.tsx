import Head from "next/head";
import Footer from "../components/intro-section-with-dropdown-navigation/Footer";
import Header from "../components/intro-section-with-dropdown-navigation/Header";
import Hero from "../components/intro-section-with-dropdown-navigation/Hero";
import Main from "../components/intro-section-with-dropdown-navigation/Main";
import { epilogueVar } from "../utils/fontLoader";
import { createContext } from "react";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export const FontContext = createContext("");

export default function IntroDropdown() {
  return (
    <FontContext.Provider value={`${epilogueVar} font-epilogue`}>
      <div
        id="intro-with-dropdown"
        className={`${epilogueVar} font-epilogue lg:bg-introdrop-neutral-100 relative mx-auto min-h-screen max-w-screen-sm pb-16 lg:max-w-full`}
      >
        <Head>
          <title>Frontend Mentor | Intro section with dropdown navigation</title>
        </Head>
        <Header />
        <div className="flex flex-col lg:flex-row-reverse lg:gap-32 lg:py-[46px] lg:pl-[164px] lg:pr-[130px]">
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
