import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function FaqAccordionCard() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | FAQ Accordion Card</title>
      </Head>
      <div className="font-kumbh-sans from-faq-accordion-primary-gradient-violet to-faq-accordion-primary-gradient-blue relative min-h-[100svh] bg-gradient-to-b bg-[length:100%_1120px] bg-top max-lg:min-h-[768px]">
        <Main />
        <Footer />
        <Slider basePath="/faq-accordion-card/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
        How many team members can I invite?
        You can invite up to 2 additional users on the Free plan. There is no limit on 
        team members for the Premium plan.
      
        What is the maximum file upload size?
        No more than 2GB. All files in your account must fit your allotted storage space.
      
        How do I reset my password?
        Click “Forgot password” from the login page or “Change password” from your profile page.
        A reset link will be emailed to you.
      
        Can I cancel my subscription?
        Yes! Send us a message and we’ll process your request no questions asked.
      
        Do you provide additional support?
        Chat and email support is available 24/7. Phone lines are open during normal business hours.
      `}
    </>
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
