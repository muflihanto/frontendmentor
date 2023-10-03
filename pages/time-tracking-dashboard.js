import Head from "next/head";
import Main from "../components/time-tracking-dashboard/Main";
import Footer from "../components/time-tracking-dashboard/Footer";
import localFont from "next/font/local";

const _rubik = localFont({
  src: "../public/time-tracking-dashboard/fonts/Rubik-VariableFont_wght.ttf",
  variable: "--font-rubik",
});

const rubik = `${_rubik.variable} font-rubik`;

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function TimeTracking() {
  return (
    <div
      className={`${rubik} App relative min-h-screen bg-tracking-neutral-400 text-tracking-neutral-100 lg:flex lg:items-center`}
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
