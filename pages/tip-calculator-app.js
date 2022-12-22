import dynamic from "next/dynamic";
import Head from "next/head";
import Footer from "../components/tip-calculator-app/Footer";
import Header from "../components/tip-calculator-app/Header";
import Main from "../components/tip-calculator-app/Main";
import { spaceMonoVar } from "../utils/fontLoader";
const Slider = dynamic(() => import("../components/Slider.jsx"), { ssr: false });

export default function TipCalculator(props) {
  return (
    <div className={`App ${spaceMonoVar} font-space-mono bg-tip-neutral-300 pt-[50px] relative min-h-screen lg:pt-[163px]`}>
      <Head>
        <title>Frontend Mentor | Tip calculator app</title>
      </Head>
      <Header />
      <Main />
      <Footer />
      {/* <Slider basePath="/tip-calculator-app/design" /> */}
      <Slider absolutePath="/tip-calculator-app/design/desktop-design-empty.jpg" />
    </div>
  );
}
