import Head from "next/head";
import Main from "../components/time-tracking-dashboard/Main";
import Footer from "../components/time-tracking-dashboard/Footer";
import { rubik } from "../utils/fonts/rubik";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function TimeTracking() {
  return (
    <div
      className={`${rubik.variable} App relative min-h-screen bg-tracking-neutral-400 font-rubik text-tracking-neutral-100 lg:flex lg:items-center`}
    >
      <Head>
        <title>Frontend Mentor | Time tracking dashboard</title>
      </Head>
      <Main />
      <Footer />
      {/* <Slider
        basePath={"/time-tracking-dashboard/design"}
        // active={true}
      /> */}
    </div>
  );
}
