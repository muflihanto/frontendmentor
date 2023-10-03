import Head from "next/head";
import Footer from "../components/expenses-chart-component/Footer";
import Main from "../components/expenses-chart-component/Main";
import { DM_Sans } from "next/font/google";

const _dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dm-sans",
});

const dmSans = `${_dmSans.variable} font-dm-sans`;

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function ExpensesChart() {
  return (
    <div
      className={`${dmSans} App relative flex min-h-screen items-center bg-expenses-neutral-200 py-5`}
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
