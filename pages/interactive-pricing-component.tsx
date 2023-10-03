import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/interactive-pricing-component/Footer";
import Header from "../components/interactive-pricing-component/Header";
import Main from "../components/interactive-pricing-component/Main";
import { commissioner } from "../utils/fonts/commissioner";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const InteractivePricing: NextPage = () => {
  return (
    <div
      className={`App min-h-screen bg-pricing-neutral-100 bg-[url('/interactive-pricing-component/images/bg-pattern.svg')] bg-[length:1440px_449px] bg-[left_0px_top_-49px] bg-no-repeat pb-[22.25px] pt-[47px] font-manrope font-medium lg:bg-left-top lg:py-[62px] ${commissioner.variable}`}
    >
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
