import Head from "next/head";
import Footer from "../components/tip-calculator-app/Footer";
import Header from "../components/tip-calculator-app/Header";
import localFont from "next/font/local";
import dynamic from "next/dynamic";

const _spaceMono = localFont({
  src: "../public/tip-calculator-app/fonts/SpaceMono-Bold.ttf",
  variable: "--font-space-mono",
});

const spaceMono = `${_spaceMono.variable} font-space-mono`;

// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const Main = dynamic(() => import("../components/tip-calculator-app/Main"), {
  ssr: false,
  loading: () => {
    return (
      <main className="contents" aria-label="Loading main content">
        <div className="mt-[40px] h-full animate-pulse rounded-t-[25px] bg-tip-neutral-100 lg:mx-auto lg:mt-[calc(87/1024*100vh)] lg:h-[480px] lg:max-w-screen-md lg:rounded-[25px] xl:max-w-[calc(23/36*100vw)]" />
      </main>
    );
  },
});

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
