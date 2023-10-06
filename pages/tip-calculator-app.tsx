import Head from "next/head";
import Footer from "../components/tip-calculator-app/Footer";
import Header from "../components/tip-calculator-app/Header";
import Main from "../components/tip-calculator-app/Main";
import localFont from "next/font/local";

const _spaceMono = localFont({
  src: "../public/tip-calculator-app/fonts/SpaceMono-Bold.ttf",
  variable: "--font-space-mono",
});

const spaceMono = `${_spaceMono.variable} font-space-mono`;

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function TipCalculator() {
  return (
    <div
      className={`App ${spaceMono} relative min-h-screen bg-tip-neutral-300 pt-[50px] lg:py-[max(calc(100vh-861px),calc(87/1024*100vh))]`}
    >
      <Head>
        <title>Frontend Mentor | Tip calculator app</title>
      </Head>
      <Header />
      <Main />
      <Footer />
      {/* <Slider
        basePath="/tip-calculator-app/design/"
        absolutePath="/tip-calculator-app/design/desktop-design-empty.jpg"
        // absolutePath="/tip-calculator-app/design/active-states.jpg"
      /> */}
    </div>
  );
}
