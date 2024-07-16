import Head from "next/head";
// import Image from "next/image";
import {
  PlusJakartaSans,
  // PlusJakartaSansItalic,
} from "../utils/fonts/plusJakartaSans";
import { cn } from "../utils/cn";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function MortgageRepaymentCalculator() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Mortgage Repayment Calculator</title>
      </Head>
      <div
        className={cn(
          "App relative min-h-[100svh] font-medium",
          PlusJakartaSans.variable,
          "font-plus-jakarta",
          "overflow-x-hidden",
        )}
      >
        <Main />
        <Footer />
        {/* <Slider
          basePath="/mortgage-repayment-calculator/design"
          absolutePath="/mortgage-repayment-calculator/design/mobile-design-completed.jpg"
        /> */}
      </div>
    </>
  );
}

function RadioIndicator() {
  return (
    <div
      className={cn(
        "absolute left-[18px] w-[19px] rounded-full border-2 border-mortgage-neutral-slate-700 aspect-square top-1/2 -translate-y-1/2 flex-col flex items-center justify-center",
        "peer-checked:border-mortgage-primary-lime peer-checked:border-[1.5px] peer-checked:[&>div]:bg-mortgage-primary-lime peer-checked:[&>div]:block",
      )}
    >
      <div className="w-[10px] aspect-square rounded-full hidden" />
    </div>
  );
}

function MortgageForm() {
  return (
    <form className="w-full px-6 py-[31px] pb-8 text-mortgage-neutral-slate-700">
      <h1 className="text-2xl font-bold text-mortgage-neutral-slate-900">
        Mortgage Calculator
      </h1>
      <button className="mt-2 underline" type="reset">
        Clear All
      </button>
      <div className="mt-[23px] flex w-full flex-col gap-[23px]">
        <label htmlFor="" className="relative flex flex-col gap-[11px]">
          <span>Mortgage Amount</span>
          <input
            className="peer h-[50px] w-full rounded border border-mortgage-neutral-slate-500 pl-16 text-sm focus-visible:border-mortgage-primary-lime focus-visible:outline focus-visible:outline-transparent text-mortgage-neutral-slate-900"
            type="text"
          />
          <span className="absolute bottom-0 left-0 flex h-[50px] w-11 flex-col items-center justify-center rounded-l border border-r-0 border-mortgage-neutral-slate-500 bg-mortgage-neutral-slate-100 text-lg font-bold peer-focus-visible:border-mortgage-primary-lime peer-focus-visible:bg-mortgage-primary-lime peer-focus-visible:text-mortgage-neutral-slate-900">
            &pound;
          </span>
        </label>
        <label htmlFor="" className="relative flex flex-col gap-[11px]">
          <span>Mortgage Term</span>
          <input
            className="peer h-[50px] w-full rounded border border-mortgage-neutral-slate-500 p-4 pr-16 text-sm focus-visible:border-mortgage-primary-lime focus-visible:outline focus-visible:outline-transparent text-mortgage-neutral-slate-900"
            type="text"
          />
          <span className="absolute bottom-0 right-0 flex h-[50px] w-20 flex-col items-center justify-center rounded-r border border-l-0 border-mortgage-neutral-slate-500 bg-mortgage-neutral-slate-100 text-lg font-bold peer-focus-visible:border-mortgage-primary-lime peer-focus-visible:bg-mortgage-primary-lime peer-focus-visible:text-mortgage-neutral-slate-900">
            years
          </span>
        </label>
        <label htmlFor="" className="relative flex flex-col gap-[11px]">
          <span>Interest Rate</span>
          <input
            className="peer h-[50px] w-full rounded border border-mortgage-neutral-slate-500 p-4 pr-16 text-sm focus-visible:border-mortgage-primary-lime focus-visible:outline focus-visible:outline-transparent text-mortgage-neutral-slate-900"
            type="text"
          />
          <span className="absolute bottom-0 right-0 flex h-[50px] w-[50px] flex-col items-center justify-center rounded-r border border-l-0 border-mortgage-neutral-slate-500 bg-mortgage-neutral-slate-100 text-lg font-bold peer-focus-visible:border-mortgage-primary-lime peer-focus-visible:bg-mortgage-primary-lime peer-focus-visible:text-mortgage-neutral-slate-900">
            %
          </span>
        </label>
        <fieldset>
          <legend>Mortgage Type</legend>
          <div className="mt-[11px] flex flex-col gap-[10px]">
            <div className="relative w-full md:flex-1">
              <input
                type="radio"
                value="repayment"
                name="mortgageType"
                className="peer hidden"
                id="repayment"
              />
              <RadioIndicator />
              <label
                htmlFor="repayment"
                className={cn(
                  "group/label flex h-[50px] w-full cursor-pointer items-center gap-4 rounded border border-mortgage-neutral-slate-500 pl-[55px] text-lg/none font-bold text-mortgage-neutral-slate-900 hover:border-mortgage-primary-lime",
                  "peer-checked:border-mortgage-primary-lime peer-checked:bg-mortgage-primary-lime/10 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-mortgage-primary-lime",
                )}
              >
                Repayment
              </label>
            </div>
            <div className="relative w-full md:flex-1">
              <input
                type="radio"
                value="interest-only"
                id="interest-only"
                name="mortgageType"
                className="peer hidden"
              />
              <RadioIndicator />
              <label
                htmlFor="interest-only"
                className={cn(
                  "group/label flex h-[50px] w-full cursor-pointer items-center gap-4 rounded border border-mortgage-neutral-slate-500 pl-[55px] text-lg/none font-bold text-mortgage-neutral-slate-900 hover:border-mortgage-primary-lime",
                  "peer-checked:border-mortgage-primary-lime peer-checked:bg-mortgage-primary-lime/10 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-mortgage-primary-lime",
                )}
              >
                Interest Only
              </label>
            </div>
          </div>
        </fieldset>
        <button
          type="submit"
          className="flex h-[56px] w-full items-center justify-center gap-[13px] rounded-full bg-mortgage-primary-lime text-lg/none font-bold text-mortgage-neutral-slate-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="#133041"
              d="M18.75 2.25H5.25a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V3.75a1.5 1.5 0 0 0-1.5-1.5Zm-10.5 16.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 18.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 15a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 15Zm3.75 3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm1.5-5.25a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v3.75Z"
            />
          </svg>
          <span>Calculate Repayments</span>
        </button>
      </div>
    </form>
  );
}

function Results() {
  return (
    <div className="flex flex-col items-center justify-center h-[390px] bg-mortgage-neutral-slate-900 text-mortgage-neutral-white w-full">
      <svg
        aria-hidden="true"
        className="aspect-square w-[192px]"
        viewBox="0 0 192 192"
      >
        <use href="/mortgage-repayment-calculator/assets/images/illustration-empty.svg#illustration-empty" />
      </svg>
      <h2 className="font-bold text-2xl mt-[15px] text-center">
        Results shown here
      </h2>
      <p className="text-center text-mortgage-neutral-slate-300 mt-4">
        Complete the form and click “calculate repayments” to see what your
        monthly repayments would be.
      </p>
    </div>
  );
}

function Main() {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <MortgageForm />
      <Results />
      {/* {`
            <!-- Completed results start -->

            Your results

            Your results are shown below based on the information you provided. 
            To adjust the results, edit the form and click “calculate repayments” again.

            Your monthly repayments

            Total you'll repay over the term

            <!-- Completed results end --> 
      `} */}
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-2 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy text-mortgage-neutral-slate-100">
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
