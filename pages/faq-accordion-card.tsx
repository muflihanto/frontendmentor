import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { atom, useAtomValue } from "jotai";
import Head from "next/head";
import Image from "next/image";
import { kumbhSans } from "../utils/fonts/kumbhSans";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const faqsAtom = atom([
  {
    button: "How many team members can I invite?",
    panel:
      "You can invite up to 2 additional users on the Free plan. There is no limit on team members for the Premium plan.",
  },
  {
    button: "What is the maximum file upload size?",
    panel:
      "No more than 2GB. All files in your account must fit your allotted storage space.",
  },
  {
    button: "How do I reset my password?",
    panel:
      "Click “Forgot password” from the login page or “Change password” from your profile page. A reset link will be emailed to you.",
  },
  {
    button: "Can I cancel my subscription?",
    panel:
      "es! Send us a message and we’ll process your request no questions asked.",
  },
  {
    button: "Do you provide additional support?",
    panel:
      "Chat and email support is available 24/7. Phone lines are open during normal business hours.",
  },
]);

export default function FaqAccordionCard() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | FAQ Accordion Card</title>
      </Head>
      <div
        className={`relative flex min-h-[100svh] flex-col items-center bg-gradient-to-b from-faq-accordion-primary-gradient-violet to-faq-accordion-primary-gradient-blue bg-[length:100%_1120px] bg-top pb-10 pt-[148px] font-kumbh-sans max-lg:min-h-[768px] lg:justify-center lg:bg-cover lg:py-10 ${kumbhSans.variable}`}
      >
        <Main />
        <Footer />
        {/* <Slider
          basePath="/faq-accordion-card/design"
          absolutePath="/faq-accordion-card/design/active-states.jpg"
        /> */}
      </div>
    </>
  );
}

function Main() {
  const faqs = useAtomValue(faqsAtom);
  return (
    <main
      className="relative flex w-[920px] flex-col items-center rounded-[22px] bg-white pb-[48px] pt-[134px] shadow-2xl shadow-faq-accordion-primary-text-blue/60 max-lg:w-[calc(min(100vw,375px)-48px)] lg:relative lg:mb-[2px] lg:ml-10 lg:grid lg:h-[510px] lg:grid-cols-[476px,auto] lg:grid-rows-1 lg:rounded-l-[24px] lg:py-0"
      aria-labelledby="main-heading"
    >
      <div className="absolute left-1/2 top-0 h-[215px] w-[240px] -translate-x-1/2 -translate-y-1/2 lg:relative lg:left-0 lg:grid lg:h-full lg:w-full lg:-translate-x-[85px] lg:translate-y-0">
        <div className="h-full w-full lg:relative lg:w-[391px] lg:place-self-end lg:overflow-hidden">
          <Image
            src={"/faq-accordion-card/images/"}
            loader={({ width, src }) => {
              if (width > 1023) {
                return `${src}illustration-woman-online-desktop.svg`;
              }
              return `${src}illustration-woman-online-mobile.svg`;
            }}
            alt="Illustration Woman Online"
            fill
            className="z-10 object-contain object-[center_calc(100%-35.5px)] pl-[1px] pr-[2px] lg:w-[475px] lg:origin-right lg:scale-[calc(476/391)] lg:object-[center_calc(48%+.5px)] lg:px-[1.5px]"
          />
          <Image
            src={"/faq-accordion-card/images/"}
            loader={({ width, src }) => {
              if (width > 1023) {
                return `${src}bg-pattern-desktop.svg`;
              }
              return `${src}bg-pattern-mobile.svg`;
            }}
            alt="Background Pattern"
            fill
            className="object-contain object-[center_calc(100%-4px)] lg:origin-right lg:scale-[calc(967.5/391)] lg:object-[center_calc(26%)] lg:pr-[.5px]"
          />
        </div>
      </div>
      <div className="w-full px-6 lg:w-[366px] lg:self-start lg:px-0 lg:pt-[68px]">
        <h1
          className="text-[32px] font-bold leading-none text-faq-accordion-primary-text-blue max-lg:text-center"
          id="main-heading"
        >
          FAQ
        </h1>
        <div className="divide mt-[19px] flex w-full flex-col divide-y divide-faq-accordion-neutral-text-100/20 border-b border-b-faq-accordion-neutral-text-100/20 text-[13px] leading-none text-faq-accordion-neutral-text-200 lg:mt-[25px] lg:max-h-[350px] lg:overflow-y-scroll lg:pr-4">
          {faqs.map((faq, index) => {
            return (
              <FaqWrapper
                key={`${index}-${faq.button}`}
                {...faq}
                isOpen={index === 1}
              />
            );
          })}
          <div className="absolute hidden aspect-[191/184] w-[191px] lg:-left-[92px] lg:top-[calc(40%+1px)] lg:z-20 lg:block lg:transition-all lg:peer-hover:-translate-x-[20%] lg:peer-active:scale-90 lg:peer-active:duration-75">
            <Image
              src="/faq-accordion-card/images/illustration-box-desktop.svg"
              className="object-contain"
              alt="Box Illustration"
              fill
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function FaqWrapper({
  button,
  panel,
  isOpen = false,
}: {
  button: string;
  panel: string;
  isOpen?: boolean;
}) {
  return (
    <Disclosure as="div" defaultOpen={isOpen} className="group peer">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex h-[50px] w-full items-center justify-between px-[1px] py-2 text-left focus:outline-none focus-visible:ring focus-visible:ring-faq-accordion-primary-gradient-violet focus-visible:ring-opacity-75 focus-visible:ring-offset-2 group-hover:text-faq-accordion-primary-text-red">
            <span
              className={`${
                open ? "font-bold text-faq-accordion-primary-text-blue" : ""
              } tracking-[.1px] lg:text-[14px]`}
            >
              {button}
            </span>
            <ChevronUpIcon
              className={`${
                !open ? "rotate-180 transform" : ""
              } -mr-1 h-4 text-faq-accordion-primary-text-red transition-all duration-150 lg:mr-3`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="-mt-[7px] pb-[18px] pr-4 text-[12px] leading-[18px] tracking-[0.05px] text-faq-accordion-neutral-text-100">
            {panel}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] font-medium text-faq-accordion-primary-text-blue [&_a]:font-bold [&_a]:text-faq-accordion-neutral-dividers [&_a]:underline [&_a]:decoration-faq-accordion-primary-text-red [&_a]:decoration-wavy">
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
