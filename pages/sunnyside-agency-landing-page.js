import dynamic from "next/dynamic";
import Head from "next/head";
import Footer from "../components/sunnyside-agency-landing-page/Footer";
import Header from "../components/sunnyside-agency-landing-page/Header";
import Main from "../components/sunnyside-agency-landing-page/Main";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function Sunnyside(props) {
  return (
    <div className="App font-barlow h-fit relative text-sunny-neutral-400">
      <Head>
        <title>Frontend Mentor | Sunnyside agency landing page</title>
      </Head>
      <Header />
      <Main />
      <Footer />
      {/* <Slider
        basePath="/sunnyside-agency-landing-page/design"
        absolutePath="/sunnyside-agency-landing-page/design/mobile-menu.jpg"
      /> */}
    </div>
  );
}
