import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function InteractiveCardDetailsForm() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Interactive card details form</title>
      </Head>
      <div className="App font-space-grotesk relative min-h-[100svh] font-medium">
        <Main />
        <Footer />
        <Slider basePath="/interactive-card-details-form/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
         0000 0000 0000 0000
         Jane Appleseed
         00/00
       
         000
       
         Cardholder Name
         e.g. Jane Appleseed
       
         Card Number
         e.g. 1234 5678 9123 0000
       
         Exp. Date (MM/YY)
         MM
         YY
       
         CVC
         e.g. 123
       
         Confirm

         <!-- Completed state start -->

         Thank you!
         We've added your card details
         Continue
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
