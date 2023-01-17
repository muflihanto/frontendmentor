import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Footer from "../components/interactive-pricing-component/Footer";
import Main from "../components/interactive-pricing-component/Main";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const InteractivePricing: NextPage = () => {
  return (
    <div className="App font-manrope">
      <Head>
        <title>Frontend Mentor | Interactive pricing component</title>
      </Head>
      <Main />
      <Footer />
      <Slider basePath={"/interactive-pricing-component/design/"} />
    </div>
  );
};

export default InteractivePricing;
