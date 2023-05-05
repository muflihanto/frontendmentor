import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function ResultsSummaryComponent() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Results summary component</title>
      </Head>
      <div className="App font-hanken-grotesk relative min-h-[100svh] font-medium">
        <Main />
        <Footer />
        {/* <Slider basePath="/results-summary-component/design" /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <div>
      <div className="from-result-summary-gradients-background-100 to-result-summary-gradients-background-200 text-result-summary-neutral-100 flex h-[356px] w-full flex-col items-center rounded-b-[32px] bg-gradient-to-b py-[22px]">
        <h1 className="text-[18px]">Your Result</h1>
        <div className="from-result-summary-gradients-circle-100 to-result-summary-gradients-circle-200 mt-[22px] flex aspect-square h-[140px] flex-col items-center justify-center rounded-full bg-gradient-to-b pt-[13px]">
          <div className="text-[55px] font-extrabold leading-none">76</div>
          <div className="text-result-summary-neutral-300/75 mt-[6px]">of 100</div>
        </div>
        <h2 className="mt-[21px] pr-1 text-[24px] font-extrabold">Great</h2>
        <div className="text-result-summary-neutral-300 mt-[5px] w-[280px] text-center leading-[22px]">You scored higher than 65% of the people who have taken these tests.</div>
      </div>
      <div className="px-[max(30px,calc(50vw-240px))] pt-[22px] pb-[30px]">
        <h2 className="text-result-summary-neutral-400 px-[2px] text-[18px] font-bold">Summary</h2>
        <ul className="mt-[22px] flex flex-col gap-4">
          <li className="bg-result-summary-primary-red/5 flex h-[56px] w-full items-center rounded-md px-[16px] pb-[2px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="#F55"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="M10.833 8.333V2.5l-6.666 9.167h5V17.5l6.666-9.167h-5Z"
              />
            </svg>
            <p className="text-result-summary-primary-red ml-3">Reaction</p>
            <div className="text-result-summary-neutral-400/50 ml-auto font-bold">
              <span className="text-result-summary-neutral-400 mr-[4px]">80</span> / 100
            </div>
          </li>
          <li className="bg-result-summary-primary-yellow/5 flex h-[56px] w-full items-center rounded-md px-[16px] pb-[2px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              fill="none"
              viewBox="0 0 20 20"
              className="translate-y-[1px]"
            >
              <path
                stroke="#FFB21E"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="M5.833 11.667a2.5 2.5 0 1 0 .834 4.858"
              />
              <path
                stroke="#FFB21E"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="M3.553 13.004a3.333 3.333 0 0 1-.728-5.53m.025-.067a2.083 2.083 0 0 1 2.983-2.824m.199.054A2.083 2.083 0 1 1 10 3.75v12.917a1.667 1.667 0 0 1-3.333 0M10 5.833a2.5 2.5 0 0 0 2.5 2.5m1.667 3.334a2.5 2.5 0 1 1-.834 4.858"
              />
              <path
                stroke="#FFB21E"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="M16.447 13.004a3.334 3.334 0 0 0 .728-5.53m-.025-.067a2.083 2.083 0 0 0-2.983-2.824M10 3.75a2.085 2.085 0 0 1 2.538-2.033 2.084 2.084 0 0 1 1.43 2.92m-.635 12.03a1.667 1.667 0 0 1-3.333 0"
              />
            </svg>
            <p className="text-result-summary-primary-yellow ml-3">Memory</p>
            <div className="text-result-summary-neutral-400/50 ml-auto font-bold">
              <span className="text-result-summary-neutral-400 mr-[4px]">92</span> / 100
            </div>
          </li>
          <li className="bg-result-summary-primary-teal/5 flex h-[56px] w-full items-center rounded-md px-[16px] pb-[2px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              fill="none"
              viewBox="0 0 20 20"
              className="translate-y-[1px]"
            >
              <path
                stroke="#00BB8F"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="M7.5 10h5M10 18.333A8.333 8.333 0 1 0 1.667 10c0 1.518.406 2.942 1.115 4.167l-.699 3.75 3.75-.699A8.295 8.295 0 0 0 10 18.333Z"
              />
            </svg>
            <p className="text-result-summary-primary-teal ml-3">Verbal</p>
            <div className="text-result-summary-neutral-400/50 ml-auto font-bold">
              <span className="text-result-summary-neutral-400 mr-[4px]">61</span> / 100
            </div>
          </li>
          <li className="bg-result-summary-primary-blue/5 flex h-[56px] w-full items-center rounded-md px-[16px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="#1125D6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="M10 11.667a1.667 1.667 0 1 0 0-3.334 1.667 1.667 0 0 0 0 3.334Z"
              />
              <path
                stroke="#1125D6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="M17.5 10c-1.574 2.492-4.402 5-7.5 5s-5.926-2.508-7.5-5C4.416 7.632 6.66 5 10 5s5.584 2.632 7.5 5Z"
              />
            </svg>
            <p className="text-result-summary-primary-blue ml-3">Visual</p>
            <div className="text-result-summary-neutral-400/50 ml-auto pb-[1px] font-bold">
              <span className="text-result-summary-neutral-400 mr-[4px]">72</span> / 100
            </div>
          </li>
        </ul>
        <button className="text-result-summary-neutral-100 bg-result-summary-neutral-400 mt-6 flex h-[56px] w-full items-center justify-center rounded-full text-[18px] font-bold">Continue</button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-2 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        href="https://github.com/muflihanto"
        target="_blank"
        rel="noreferrer"
      >
        Muflihanto
      </a>
      .
    </footer>
  );
}
