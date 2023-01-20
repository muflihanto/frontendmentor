import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Footer from "../components/interactive-pricing-component/Footer";
import Main from "../components/interactive-pricing-component/Main";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const InteractivePricing: NextPage = () => {
  return (
    <div className="App font-manrope bg-[url('/interactive-pricing-component/images/bg-pattern.svg')] bg-[length:1440px_449px] bg-[left_0px_top_-49px] bg-no-repeat min-h-screen py-[47px] font-medium">
      <Head>
        <title>Frontend Mentor | Interactive pricing component</title>
      </Head>
      <Main />
      <Footer />
      {/* <Slider basePath={"/interactive-pricing-component/design/"} /> */}
    </div>
  );
};

export default InteractivePricing;
