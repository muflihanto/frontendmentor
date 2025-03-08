import Head from "next/head";
import Footer from "../components/intro-section-with-dropdown-navigation/Footer";
import Header from "../components/intro-section-with-dropdown-navigation/Header";
import Hero from "../components/intro-section-with-dropdown-navigation/Hero";
import Main from "../components/intro-section-with-dropdown-navigation/Main";
import { epilogue } from "../utils/fonts/epilogue";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function IntroDropdown() {
  return (
    <div
      className={`${epilogue} relative mx-auto min-h-screen max-w-screen-sm bg-introdrop-neutral-100 pb-16 font-epilogue lg:max-w-full`}
    >
      <Head>
        <title>Frontend Mentor | Intro section with dropdown navigation</title>
      </Head>
      <Header />
      <main
        className="flex flex-col lg:flex-row-reverse lg:gap-32 lg:py-[46px] lg:pl-[164px] lg:pr-[130px]"
        aria-labelledby="main-heading"
      >
        <Hero />
        <Main />
      </main>
      <Footer />
      {/* <Slider
          basePath="/intro-section-with-dropdown-navigation/design"
          // absolutePath="/intro-section-with-dropdown-navigation/design/mobile-menu-expanded.jpg"
          // absolutePath="/intro-section-with-dropdown-navigation/design/mobile-menu-collapsed.jpg"
          // active={true}
        /> */}
    </div>
  );
}
