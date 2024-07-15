import Head from "next/head";
// import Image from "next/image";
import {
  PlusJakartaSans,
  // PlusJakartaSansItalic,
} from "../utils/fonts/plusJakartaSans";
import { cn } from "../utils/cn";
import { CalculatorIcon } from "@heroicons/react/20/solid";

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
          absolutePath="/mortgage-repayment-calculator/design/mobile-design-empty.jpg"
        /> */}
      </div>
    </>
  );
}

function MortgageForm() {
  return (
    <form className="w-full px-6 py-[31px] text-mortgage-neutral-slate-700">
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
                className={cn(
                  "peer absolute left-5 top-1/2 -translate-y-1/2 scale-[140%] text-9xl text-mortgage-primary-lime/10 accent-mortgage-primary-lime",
                  "focus-visible:outline focus-visible:outline-transparent",
                )}
                id="repayment"
              />
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
                className={cn(
                  "peer absolute left-5 top-1/2 -translate-y-1/2 scale-[140%] text-9xl text-mortgage-primary-lime/10 accent-mortgage-primary-lime",
                  "focus-visible:outline focus-visible:outline-transparent",
                )}
              />
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
          <CalculatorIcon className="h-[22px] text-mortgage-neutral-slate-900" />
          <span>Calculate Repayments</span>
        </button>
      </div>
    </form>
  );
}

function Main() {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <MortgageForm />
      {/* {`
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
    </main>
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
