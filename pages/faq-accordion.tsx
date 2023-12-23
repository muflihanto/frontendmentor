import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
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
        className={`App relative min-h-[100svh] ${workSans.variable} font-work-sans`}
      >
        <Main />
        <Footer />
        <Slider basePath="/faq-accordion/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
         FAQs

         What is Frontend Mentor, and how will it help me?
       
         Frontend Mentor offers realistic coding challenges to help developers improve their 
         frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for 
         all levels and ideal for portfolio building.
       
         Is Frontend Mentor free?
       
         Yes, Frontend Mentor offers both free and premium coding challenges, with the free 
         option providing access to a range of projects suitable for all skill levels.
       
         Can I use Frontend Mentor projects in my portfolio?
       
         Yes, you can use projects completed on Frontend Mentor in your portfolio. It's an excellent
         way to showcase your skills to potential employers!
       
         How can I get help if I'm stuck on a Frontend Mentor challenge?
         
         The best place to get help is inside Frontend Mentor's Discord community. There's a help 
         channel where you can ask questions and seek support from other community members.
      `}
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
