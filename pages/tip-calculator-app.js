import dynamic from "next/dynamic";
import Head from "next/head";
import Footer from "../components/tip-calculator-app/Footer";
import Main from "../components/tip-calculator-app/Main";
import { spaceMonoVar } from "../utils/fontLoader";
const Slider = dynamic(() => import("../components/Slider.jsx"), { ssr: false });

export default function TipCalculator(props) {
  return (
    <div className={`${spaceMonoVar} font-space-mono`}>
      <Head>
        <title>Frontend Mentor | Tip calculator app</title>
      </Head>
      <Main />
      <Footer />
      <Slider basePath="/tip-calculator-app/design" />
    </div>
  );
}
