import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function MortgageRepaymentCalculator() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Mortgage Repayment Calculator</title>
      </Head>
      <div className="App min-h-[100svh] relative">
        <Main />
        <Footer />
        <Slider basePath="/mortgage-repayment-calculator/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {/* {`
            Mortgage Calculator
            Clear All

            Mortgage Amount

            Mortgage Term

            Interest Rate

            Mortgage Type
            Repayment
            Interest Only

            Calculate Repayments

            <!-- Empty results start -->

            Results shown here

            Complete the form and click “calculate repayments” to see what 
            your monthly repayments would be.

            <!-- Empty results end -->

            <!-- Completed results start -->

            Your results

            Your results are shown below based on the information you provided. 
            To adjust the results, edit the form and click “calculate repayments” again.

            Your monthly repayments

            Total you'll repay over the term

            <!-- Completed results end --> 
      `} */}
    </>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a href="https://github.com/muflihanto" target="_blank" rel="noreferrer">
        Muflihanto
      </a>
      .
    </footer>
  );
}
