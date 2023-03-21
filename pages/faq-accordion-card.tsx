import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { atom, useAtomValue } from "jotai";

const faqsAtom = atom([
  {
    button: "How many team members can I invite?",
    panel: "You can invite up to 2 additional users on the Free plan. There is no limit on team members for the Premium plan.",
  },
  {
    button: "What is the maximum file upload size?",
    panel: "No more than 2GB. All files in your account must fit your allotted storage space.",
  },
  {
    button: "How do I reset my password?",
    panel: "Click “Forgot password” from the login page or “Change password” from your profile page. A reset link will be emailed to you.",
  },
  {
    button: "Can I cancel my subscription?",
    panel: "es! Send us a message and we’ll process your request no questions asked.",
  },
  {
    button: "Do you provide additional support?",
    panel: "Chat and email support is available 24/7. Phone lines are open during normal business hours.",
  },
]);

export default function FaqAccordionCard() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | FAQ Accordion Card</title>
      </Head>
      <div className="font-kumbh-sans from-faq-accordion-primary-gradient-violet to-faq-accordion-primary-gradient-blue relative flex min-h-[100svh] flex-col items-center bg-gradient-to-b bg-[length:100%_1120px] bg-top pt-[148px] pb-10 max-lg:min-h-[768px]">
        <Main />
        <Footer />
        {/* <Slider basePath="/faq-accordion-card/design" /> */}
      </div>
    </>
  );
}

function Main() {
  const faqs = useAtomValue(faqsAtom);
  return (
    <div className="shadow-faq-accordion-primary-text-blue/60 relative flex flex-col items-center rounded-[22px] bg-white pt-[134px] pb-[48px] shadow-2xl max-lg:w-[calc(min(100vw,375px)-48px)]">
      <div className="absolute top-0 left-1/2 h-[215px] w-[240px] -translate-y-1/2 -translate-x-1/2">
        <Image
          src={"/faq-accordion-card/images/"}
          loader={({ width, src }) => {
            if (width > 1023) {
              return src + "illustration-woman-online-desktop.svg";
            }
            return src + "illustration-woman-online-mobile.svg";
          }}
          alt="Illustration Woman Online"
          fill
          className="z-1 object-contain object-[position:center_calc(100%-35.5px)] pl-[1px] pr-[2px]"
        />
        <Image
          src={"/faq-accordion-card/images/"}
          loader={({ width, src }) => {
            if (width > 1023) {
              return src + "bg-pattern-desktop.svg";
            }
            return src + "bg-pattern-mobile.svg";
          }}
          alt="Background Pattern"
          fill
          className="object-contain object-[position:center_calc(100%-4px)]"
        />
      </div>
      <h1 className="text-faq-accordion-primary-text-blue text-[32px] font-bold leading-none">FAQ</h1>
      <div className="text-faq-accordion-neutral-text-200 divide-faq-accordion-neutral-text-100/20 divide border-b-faq-accordion-neutral-text-100/20 mt-[19px] flex w-full flex-col divide-y border-b px-6 text-[13px] leading-none">
        {faqs.map((faq, index) => {
          return (
            <FaqWrapper
              key={index}
              {...faq}
              isOpen={index === 1}
            />
          );
        })}
      </div>
    </div>
  );
}

function FaqWrapper({ button, panel, isOpen = false }: { button: string; panel: string; isOpen?: boolean }) {
  return (
    <Disclosure
      as="div"
      defaultOpen={isOpen}
    >
      {({ open }) => (
        <>
          <Disclosure.Button className="focus-visible:ring-faq-accordion-primary-gradient-violet flex h-[50px] w-full items-center justify-between py-2 px-[1px] text-left focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 focus-visible:ring-offset-2">
            <span className={`${open ? "text-faq-accordion-primary-text-blue font-bold" : ""} tracking-[.1px]`}>{button}</span>
            <ChevronUpIcon className={`${!open ? "rotate-180 transform" : ""} text-faq-accordion-primary-text-red -mr-1 h-4`} />
          </Disclosure.Button>
          <Disclosure.Panel className="text-faq-accordion-neutral-text-100 -mt-[7px] pr-4 pb-[18px] text-[12px] leading-[18px] tracking-[0.05px]">{panel}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

function Footer() {
  return (
    <footer className="[&_a]:text-faq-accordion-neutral-dividers [&_a]:decoration-faq-accordion-primary-text-red absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by <a href="#">Your Name Here</a>.
    </footer>
  );
}
