import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { workSans } from "../utils/fonts/workSans";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

/**
 * TODO: Hide/Show the answer to a question when the question is clicked
 * TODO: Navigate the questions and hide/show answers using keyboard navigation alone
 * TODO: View the optimal layout for the interface depending on their device's screen size
 * TODO: See hover and focus states for all interactive elements on the page
 */

export default function FaqAccordion() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | FAQ Accordion</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] bg-faq-200 ${workSans.variable} font-work-sans`}
      >
        <Main />
        <Footer />
        {/* <Slider basePath="/faq-accordion/design" /> */}
      </div>
    </>
  );
}

const faqs = [
  {
    question: "What is Frontend Mentor, and how will it help me?",
    answer:
      "Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for all levels and ideal for portfolio building.",
  },
  {
    question: "Is Frontend Mentor free?",
    answer:
      "Yes, Frontend Mentor offers both free and premium coding challenges, with the free option providing access to a range of projects suitable for all skill levels.",
  },
  {
    question: "Can I use Frontend Mentor projects in my portfolio?",
    answer:
      "Yes, you can use projects completed on Frontend Mentor in your portfolio. It's an excellent way to showcase your skills to potential employers!",
  },
  {
    question: "How can I get help if I'm stuck on a Frontend Mentor challenge?",
    answer:
      "The best place to get help is inside Frontend Mentor's Discord community. There's a help channel where you can ask questions and seek support from other community members.",
  },
];

function Main() {
  return (
    <>
      <header className="h-[232px] w-full bg-[url('/faq-accordion/assets/images/background-pattern-mobile.svg')] bg-cover bg-no-repeat" />
      <div className="relative flex w-full -translate-y-[90px] flex-col items-center px-6">
        <section className="w-full rounded-lg bg-faq-100 px-6 py-[28px] shadow-xl shadow-faq-300/10">
          <h1 className="flex items-center gap-[23px] text-[32px] font-bold leading-none text-faq-400">
            <span className="relative inline-block aspect-[40/41] h-[25px]">
              <Image
                src={"/faq-accordion/assets/images/icon-star.svg"}
                fill
                alt="Star Icon"
              />
            </span>
            FAQs
          </h1>
          <div className="mt-[27px] flex flex-col divide-y text-[14px]">
            {faqs.map((faq) => {
              return <Accordion {...faq} key={faq.question} />;
            })}
          </div>
        </section>
      </div>
    </>
  );
}

function Accordion({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="group/faqs">
      <details className="group/detail peer overflow-hidden [&::-webkit-details-marker]:hidden">
        <summary className="block cursor-pointer list-none">
          <h2
            role="term"
            className="relative mb-5 mt-5 flex items-center justify-between gap-6 text-base/[19px] font-semibold text-faq-400 [transition:_margin_100ms_200ms_ease-out] group-first/faqs:mt-0 group-last/faqs:mb-0 group-open/detail:transition-none group-last/faqs:group-open/detail:mb-[22px]"
          >
            {question}
            <span className="relative aspect-[30/31] w-[30px] shrink-0">
              <Image
                src="/faq-accordion/assets/images/icon-minus.svg"
                fill
                className="invisible z-10 opacity-60 transition-opacity duration-200 group-open/detail:visible group-open/detail:z-20 group-open/detail:opacity-100"
                alt="Icon Minus"
              />
              <Image
                src="/faq-accordion/assets/images/icon-plus.svg"
                fill
                className="visible z-20 opacity-100 transition-opacity duration-200 group-open/detail:invisible group-open/detail:z-10 group-open/detail:opacity-60"
                alt="Icon Plus"
              />
            </span>
          </h2>
        </summary>
      </details>
      <div
        role="definition"
        className="mt-0 max-h-0 overflow-hidden text-faq-300 [transition:_max-height_200ms_ease-out,_margin_200ms_200ms_ease-out] peer-open:mb-[21px] peer-open:mt-0.5 peer-open:max-h-80 peer-open:[transition:_max-height_500ms_ease-out] group-last/faqs:peer-open:mb-0"
      >
        {answer}
      </div>
    </div>
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
