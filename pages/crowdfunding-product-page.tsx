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
      <Footer />
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

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-crowdfunding-neutral-200 [&_a:focus-visible]:rounded-md [&_a:focus-visible]:text-crowdfunding-primary-200 [&_a:focus-visible]:outline [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-crowdtext-crowdfunding-primary-200 [&_a:hover]:text-crowdfunding-primary-200 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a href="https://github.com/muflihanto" target="_blank" rel="noreferrer">
        Muflihanto
      </a>
      .
    </footer>
  );
}
