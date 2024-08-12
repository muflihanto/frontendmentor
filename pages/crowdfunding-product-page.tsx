import Head from "next/head";
import Header from "../components/crowdfunding-product-page/Header";
import Main from "../components/crowdfunding-product-page/Main";
import { commissioner } from "../utils/fonts/commissioner";
import { useEffect } from "react";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function Crowdfunding() {
  useEffect(() => {
    document.body.style.backgroundColor = "white";
  }, []);

  return (
    <div
      className={`App relative bg-crowdfunding-neutral-100/5 font-commissioner ${commissioner.variable}`}
    >
      <Head>
        <title>Frontend Mentor | Crowdfunding product page</title>
      </Head>
      <Header />
      <Main />
      {/* <Slider
        basePath="/crowdfunding-product-page/design/"
        // absolutePath="/crowdfunding-product-page/design/mobile-menu.jpg"
        // absolutePath="/crowdfunding-product-page/design/active-states-bookmarked.jpg"
        // absolutePath="/crowdfunding-product-page/design/mobile-design-modal-selected.jpg"
        absolutePath="/crowdfunding-product-page/design/active-states-modal-completed.jpg"
      /> */}
    </div>
  );
}
