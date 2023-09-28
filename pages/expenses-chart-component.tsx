import Head from "next/head";
import { createContext, useRef } from "react";
import Footer from "../components/expenses-chart-component/Footer";
import Main from "../components/expenses-chart-component/Main";
import { dmSansVar } from "../utils/fontLoader";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export const FontContext = createContext("");

export default function ExpensesChart() {
  const font = useRef(`${dmSansVar} font-dm-sans`);
  return (
    <FontContext.Provider value={font.current}>
      <div className={`${font.current} App bg-expenses-neutral-200 relative flex min-h-screen items-center py-5`}>
        <Head>
          <title>Frontend Mentor | Expenses chart component</title>
        </Head>
        <Main />
        <Footer />
        {/* <Slider basePath="/expenses-chart-component/design" /> */}
      </div>
    </FontContext.Provider>
  );
}
