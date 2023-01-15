import dynamic from "next/dynamic";
import Head from "next/head";
import Header from "../components/crowdfunding-product-page/Header";
import Main from "../components/crowdfunding-product-page/Main";
// import Image from "next/image";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function Crowdfunding(props) {
  return (
    <div className="relative App font-commissioner bg-crowdfunding-neutral-100/5">
      <Head>
        <title>Frontend Mentor | Crowdfunding product page</title>
      </Head>
      <Header />
      <Main />
      {/* <Slider
        basePath="/crowdfunding-product-page/design/"
        absolutePath="/crowdfunding-product-page/design/mobile-menu.jpg"
        // absolutePath="/crowdfunding-product-page/design/mobile-design-modal-selected.jpg"
        // absolutePath="/crowdfunding-product-page/design/mobile-design-modal-completed.jpg"
      /> */}
    </div>
  );
}
