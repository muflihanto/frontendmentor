import dynamic from "next/dynamic";
import Head from "next/head";
import { createContext, useRef } from "react";
import Footer from "../components/expenses-chart-component/Footer";
import Main from "../components/expenses-chart-component/Main";
import { dmSansVar } from "../utils/fontLoader";
const Slider = dynamic(() => import("../components/Slider"), {
  ssr: false,
});

export const FontContext = createContext();

export default function ExpensesChart(props) {
  const font = useRef(`${dmSansVar} font-dm-sans`);
  return (
    <FontContext.Provider value={font.current}>
      <div className={`${font.current} App relative`}>
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
