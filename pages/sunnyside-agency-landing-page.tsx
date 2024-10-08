import Head from "next/head";
import Footer from "../components/sunnyside-agency-landing-page/Footer";
import Header from "../components/sunnyside-agency-landing-page/Header";
import Main from "../components/sunnyside-agency-landing-page/Main";
import { barlow } from "../utils/fonts/barlow";
import { fraunces } from "../utils/fonts/fraunces";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function Sunnyside() {
  return (
    <div
      className={`App relative h-fit bg-white font-barlow text-sunny-neutral-400 ${barlow.variable} ${fraunces.variable}`}
    >
      <Head>
        <title>Frontend Mentor | Sunnyside agency landing page</title>
      </Head>
      <Header />
      <Main />
      <Footer />
      {/* <Slider
        basePath="/sunnyside-agency-landing-page/design"
        // absolutePath="/sunnyside-agency-landing-page/design/mobile-menu.jpg"
      /> */}
    </div>
  );
}
