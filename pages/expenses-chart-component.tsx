import Head from "next/head";
import Footer from "../components/expenses-chart-component/Footer";
import Main from "../components/expenses-chart-component/Main";
import { dmSans } from "../utils/fonts/dmSans";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function ExpensesChart() {
  return (
    <div
      className={`${dmSans.variable} App relative flex min-h-screen items-center bg-expenses-neutral-200 py-5 font-dm-sans`}
    >
      <Head>
        <title>Frontend Mentor | Expenses chart component</title>
      </Head>
      <Main />
      <Footer />
      {/* <Slider basePath="/expenses-chart-component/design" /> */}
    </div>
  );
}
