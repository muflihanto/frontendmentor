import Head from "next/head";
import Footer from "../components/sunnyside-agency-landing-page/Footer";
import Header from "../components/sunnyside-agency-landing-page/Header";
import Main from "../components/sunnyside-agency-landing-page/Main";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function Sunnyside() {
  return (
    <div className="App font-barlow text-sunny-neutral-400 relative h-fit">
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