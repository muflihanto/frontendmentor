import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
const MainContent = dynamic(import("../components/calculator-app/MainContent"), { ssr: false });
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function CalculatorApp() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Calculator app</title>
      </Head>
      <div className="App relative min-h-[100svh]">
        <MainContent />
        <Slider
          basePath="/calculator-app/design"
          absolutePath="/calculator-app/design/mobile-design-theme-1.jpg"
        />
      </div>
    </>
  );
}
