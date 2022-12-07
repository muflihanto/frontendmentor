import Head from "next/head";
import Footer from "../components/expenses-chart-component/Footer";
import Main from "../components/expenses-chart-component/Main";

export default function ExpensesChart(props) {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Expenses chart component</title>
      </Head>
      <Main />
      <Footer />
    </>
  );
}
