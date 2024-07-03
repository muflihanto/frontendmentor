import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
import { karla } from "../utils/fonts/karla";
import { cn } from "../utils/cn";
const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function ContactForm() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Contact form</title>
      </Head>
      <div
        className={cn(
          `App bg-contact-primary-green-200 relative flex min-h-[100svh] flex-col items-center py-8 ${karla.variable} font-karla`,
          "overflow-x-hidden ",
        )}
      >
        <Main />
        <Footer />
        <Slider basePath="/contact-form/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <main className="w-[343px] rounded-2xl bg-white px-6 py-4">
      <h1 className="text-contact-neutral-grey-900 text-[32px] font-bold tracking-tight">
        Contact Us
      </h1>
      {/* {`
        First Name
        This field is required

        Last Name
        This field is required

        Email Address
        Please enter a valid email address
        This field is required

        Query Type
        General Enquiry
        Support Request
        Please select a query type

        Message
        This field is required

        I consent to being contacted by the team
        To submit this form, please consent to being contacted

        Submit

        Message Sent!
        Thanks for completing the form. We'll be in touch soon!
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
