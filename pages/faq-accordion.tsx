import Head from "next/head";
import Image from "next/image";
import { workSans } from "../utils/fonts/workSans";
import { useState, type KeyboardEvent } from "react";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

/**
 * TODO: Navigate the questions and hide/show answers using keyboard navigation alone
 * TODO: See focus states for all interactive elements on the page
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
      <header className="h-[232px] w-full bg-[url('/faq-accordion/assets/images/background-pattern-mobile.svg')] bg-cover bg-no-repeat lg:h-[320px] lg:bg-[url('/faq-accordion/assets/images/background-pattern-desktop.svg')]" />
      <div className="relative flex w-full -translate-y-[90px] flex-col items-center px-6 lg:-translate-y-[152px]">
        <section className="w-full max-w-[600px] rounded-lg bg-faq-100 px-6 py-[28px] shadow-xl shadow-faq-300/10 lg:rounded-2xl lg:px-10 lg:py-[44px] lg:shadow-2xl lg:shadow-faq-300/[25%]">
          <h1 className="flex items-center gap-[23px] text-[32px] font-bold leading-none text-faq-400 lg:text-[56px]">
            <span className="relative inline-block aspect-[40/41] w-[25px] lg:w-10">
              <Image
                src={"/faq-accordion/assets/images/icon-star.svg"}
                fill
                alt="Star Icon"
              />
            </span>
            FAQs
          </h1>
          <div className="mt-[27px] flex flex-col divide-y text-[14px] lg:mt-[37px]">
            {faqs.map((faq, index) => {
              return (
                <Accordion
                  {...faq}
                  key={`${index}-${faq.question}`}
                  defaultOpen={index === 0}
                />
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}

function Accordion({
  question,
  answer,
  defaultOpen,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const onItemKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const summary = event.currentTarget;
    const detailsElement = summary.parentElement;
    const groupElement = detailsElement?.parentElement;
    const key = event.key;
    const allSummary = groupElement?.parentElement?.querySelectorAll("summary");
    const firstSummary = allSummary?.[0];
    const lastSummary = allSummary?.[allSummary.length - 1];
    const nextSummary =
      groupElement?.nextElementSibling?.querySelector("summary");
    const prevSummary =
      groupElement?.previousElementSibling?.querySelector("summary");

    let flag = false;

    switch (key) {
      case "Down":
      case "ArrowDown":
        if (nextSummary) {
          nextSummary.focus();
        } else {
          firstSummary?.focus();
        }
        flag = true;
        break;

      case "Up":
      case "ArrowUp":
        if (prevSummary) {
          prevSummary.focus();
        } else {
          lastSummary?.focus();
        }
        flag = true;
        break;

      case "Home":
      case "PageUp":
        firstSummary?.focus();
        flag = true;
        break;

      case "End":
      case "PageDown":
        lastSummary?.focus();
        flag = true;
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };
  const id = question.toLowerCase().slice(0, 10).trim().replaceAll(" ", "-");
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="group/faqs">
      <details
        className="group/detail peer [&::-webkit-details-marker]:hidden"
        open={open}
        onToggle={() => setOpen((o) => !o)}
        aria-controls={`answer-${id}`}
        id={`question-${id}`}
      >
        <summary
          className="group/summary block cursor-pointer list-none focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-[#AD28EB]"
          onKeyDown={onItemKeyDown}
          aria-expanded={open}
        >
          <h2 className="relative mb-6 mt-5 flex items-center justify-between gap-6 text-base/[19px] font-semibold text-faq-400 [transition:_margin_100ms_200ms_ease-out] hover:text-[#AD28EB] group-first/faqs:mt-0 group-last/faqs:mb-0 group-open/detail:transition-none group-last/faqs:group-open/detail:mb-[22px] group-focus-visible/summary:text-[#AD28EB] lg:mt-6 lg:text-lg/[24px] lg:group-last/faqs:group-open/detail:mb-6">
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
        role="region"
        className="mt-0 max-h-0 overflow-hidden text-faq-300 [transition:_max-height_200ms_ease-out,_margin_200ms_200ms_ease-out] peer-open:mb-[21px] peer-open:mt-0.5 peer-open:max-h-80 peer-open:[transition:_max-height_500ms_ease-out] group-last/faqs:peer-open:mb-0 lg:text-base/[24px] lg:peer-open:mb-[23px] lg:peer-open:mt-[-1px]"
        id={`answer-${id}`}
        aria-labelledby={`question-${id}`}
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
