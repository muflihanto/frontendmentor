import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
import { leagueSpartan } from "../utils/fonts/leagueSpartan";

const MainContent = dynamic(
  import("../components/calculator-app/MainContent"),
  { ssr: false },
);

// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function CalculatorApp() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Calculator app</title>
      </Head>
      <div className={`App relative min-h-[100svh] ${leagueSpartan.variable}`}>
        <MainContent />
        {/* <Slider
          basePath="/calculator-app/design"
          // absolutePath="/calculator-app/design/mobile-design-theme-1.jpg"
          absolutePath="/calculator-app/design/desktop-design-theme-1.jpg"
        /> */}
      </div>
    </>
  );
}
