import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Footer from "../components/interactive-pricing-component/Footer";
import Header from "../components/interactive-pricing-component/Header";
import Main from "../components/interactive-pricing-component/Main";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const InteractivePricing: NextPage = () => {
  return (
    <div className="App font-manrope bg-[url('/interactive-pricing-component/images/bg-pattern.svg')] bg-[length:1440px_449px] bg-[left_0px_top_-49px] lg:bg-left-top bg-no-repeat min-h-screen pt-[47px] pb-[22.25px] font-medium bg-pricing-neutral-100 lg:py-[62px]">
      <Head>
        <title>Frontend Mentor | Interactive pricing component</title>
      </Head>
      <Header />
      <Main />
      <Footer />
      {/* <Slider basePath={"/interactive-pricing-component/design/"} /> */}
    </div>
  );
};

export default InteractivePricing;
