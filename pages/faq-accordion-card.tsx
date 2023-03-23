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
      <div className="font-kumbh-sans from-faq-accordion-primary-gradient-violet to-faq-accordion-primary-gradient-blue relative flex min-h-[100svh] flex-col items-center bg-gradient-to-b bg-[length:100%_1120px] bg-top pt-[148px] pb-10 max-lg:min-h-[768px] lg:justify-center lg:bg-cover lg:py-10">
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
    <div className="shadow-faq-accordion-primary-text-blue/60 relative flex w-[920px] flex-col items-center rounded-[22px] bg-white pt-[134px] pb-[48px] shadow-2xl max-lg:w-[calc(min(100vw,375px)-48px)] lg:relative lg:ml-10 lg:mb-[2px] lg:grid lg:h-[510px] lg:grid-cols-[476px,auto] lg:grid-rows-1 lg:rounded-l-[24px] lg:py-0">
      <div className="absolute top-0 left-1/2 h-[215px] w-[240px] -translate-y-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:grid lg:h-full lg:w-full lg:translate-y-0 lg:-translate-x-[85px]">
        <div className="h-full w-full lg:relative lg:w-[391px] lg:place-self-end lg:overflow-hidden">
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
            className="z-10 object-contain object-[center_calc(100%-35.5px)] pl-[1px] pr-[2px] lg:w-[475px] lg:origin-right lg:scale-[calc(476/391)] lg:object-[position:center_calc(48%+.5px)] lg:px-[1.5px]"
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
            className="object-contain object-[center_calc(100%-4px)] lg:origin-right lg:scale-[calc(967.5/391)] lg:object-[center_calc(26%)] lg:pr-[.5px]"
          />
        </div>
      </div>
      <main className="px-6 lg:w-[366px] lg:self-start lg:px-0 lg:pt-[68px]">
        <h1 className="text-faq-accordion-primary-text-blue text-[32px] font-bold leading-none max-lg:text-center">FAQ</h1>
        <div className="text-faq-accordion-neutral-text-200 divide-faq-accordion-neutral-text-100/20 divide border-b-faq-accordion-neutral-text-100/20 mt-[19px] flex w-full flex-col divide-y border-b text-[13px] leading-none lg:mt-[25px] lg:max-h-[350px] lg:overflow-y-scroll lg:pr-4">
          {faqs.map((faq, index) => {
            return (
              <FaqWrapper
                key={index}
                {...faq}
                isOpen={index === 1}
              />
            );
          })}
          <div className="absolute hidden aspect-[191/184] w-[191px] lg:top-[calc(40%+1px)] lg:-left-[92px] lg:z-20 lg:block lg:transition-all lg:peer-hover:-translate-x-[20%] lg:peer-active:scale-90 lg:peer-active:duration-75">
            <Image
              src="/faq-accordion-card/images/illustration-box-desktop.svg"
              className="object-contain"
              alt="Box Illustration"
              fill
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function FaqWrapper({ button, panel, isOpen = false }: { button: string; panel: string; isOpen?: boolean }) {
  return (
    <Disclosure
      as="div"
      defaultOpen={isOpen}
      className="group peer"
    >
      {({ open }) => (
        <>
          <Disclosure.Button className="focus-visible:ring-faq-accordion-primary-gradient-violet group-hover:text-faq-accordion-primary-text-red flex h-[50px] w-full items-center justify-between py-2 px-[1px] text-left focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 focus-visible:ring-offset-2">
            <span className={`${open ? "text-faq-accordion-primary-text-blue font-bold" : ""} tracking-[.1px] lg:text-[14px]`}>{button}</span>
            <ChevronUpIcon className={`${!open ? "rotate-180 transform" : ""} text-faq-accordion-primary-text-red -mr-1 h-4 transition-all duration-150 lg:mr-3`} />
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
