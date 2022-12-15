import dynamic from "next/dynamic";
import Head from "next/head";
import Main from "../components/time-tracking-dashboard/Main.jsx";
import Footer from "../components/time-tracking-dashboard/Footer.jsx";
const Slider = dynamic(() => import("../components/Slider.jsx"), { ssr: false });
import { rubikVar } from "../utils/fontLoader.js";

export default function TimeTracking() {
  return (
    <div className={`App ${rubikVar} font-rubik min-h-screen relative bg-tracking-neutral-400 text-tracking-neutral-100`}>
      <Head>
        <title>Frontend Mentor | Time tracking dashboard</title>
      </Head>
      <Main />
      <Footer />
      {/* <Slider basePath={"/time-tracking-dashboard/design"} /> */}
    </div>
  );
}
