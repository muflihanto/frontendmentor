import Head from "next/head";
// import Image from "next/image";
import { karla } from "../utils/fonts/karla";
import { cn } from "../utils/cn";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function ContactForm() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Contact form</title>
      </Head>
      <div
        className={cn(
          `App relative flex min-h-[100svh] flex-col items-center bg-contact-primary-green-200 pb-10 pt-8 ${karla.variable} font-karla`,
          "md:justify-center md:py-16",
          "overflow-x-hidden",
        )}
      >
        <Main />
        <Footer />
        {/* <Slider basePath="/contact-form/design" /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <main
      className={cn(
        "w-[343px] rounded-2xl bg-white px-6 pb-6 pt-4",
        "md:h-[772px] md:w-[736px] md:px-[40px] md:pt-[32px]",
      )}
    >
      <h1 className="text-[32px] font-bold tracking-tight text-contact-neutral-grey-900">
        Contact Us
      </h1>
      <form
        className={cn(
          "mt-[23px] flex flex-col gap-[23px] text-contact-neutral-grey-900",
          "md:grid md:grid-cols-2 md:gap-x-4",
        )}
      >
        <label className="flex w-full flex-col gap-[9px]">
          <p>
            <span>First Name</span>
            <span className="ml-[9px] text-contact-primary-green-600">*</span>
          </p>
          <input
            type="text"
            className="h-[51px] rounded-lg border border-contact-neutral-grey-500 p-3"
          />
        </label>
        <label className="flex w-full flex-col gap-[9px]">
          <p>
            <span>Last Name</span>
            <span className="ml-[9px] text-contact-primary-green-600">*</span>
          </p>
          <input
            type="text"
            className="h-[51px] rounded-lg border border-contact-neutral-grey-500 p-3"
          />
        </label>
        <label className="flex w-full flex-col gap-[9px] md:col-span-2">
          <p>
            <span>Email Address</span>
            <span className="ml-[9px] text-contact-primary-green-600">*</span>
          </p>
          <input
            type="email"
            className="h-[51px] rounded-lg border border-contact-neutral-grey-500 p-3"
          />
        </label>
        <fieldset className="md:col-span-2">
          <legend>
            <span>Query Type</span>
            <span className="ml-[9px] text-contact-primary-green-600">*</span>
          </legend>
          <div className="mt-[17px] flex flex-col gap-4 md:flex-row">
            <label
              htmlFor="general-enquiry"
              className="group/label flex h-[51px] w-full cursor-pointer items-center gap-4 rounded-lg border border-contact-neutral-grey-500 px-[28px] text-lg/none"
            >
              <input
                type="radio"
                name="query"
                id="general-enquiry"
                value="general-enquiry"
                className="scale-[135%] text-9xl accent-contact-primary-green-600"
              />
              General Enquiry
            </label>
            <label
              htmlFor="support-request"
              className="group/label flex h-[51px] w-full cursor-pointer items-center gap-4 rounded-lg border border-contact-neutral-grey-500 px-[28px] text-lg/none"
            >
              <input
                type="radio"
                name="query"
                id="support-request"
                value="support-request"
                className="scale-[135%] text-9xl accent-contact-primary-green-600"
              />
              Support Request
            </label>
          </div>
        </fieldset>
        <label className="mt-px flex w-full flex-col gap-2 md:col-span-2">
          <p>
            <span>Message</span>
            <span className="ml-[9px] text-contact-primary-green-600">*</span>
          </p>
          <textarea className="h-[240px] resize-none rounded-lg border border-contact-neutral-grey-500 md:h-[105px] px-3 py-2" />
        </label>
        <label className="mt-4 flex gap-[22px] px-1 md:col-span-2">
          <input
            type="checkbox"
            className="scale-[135%] accent-contact-primary-green-600"
          />
          <p>
            <span>I consent to being contacted by the team</span>
            <span className="ml-[4px] text-contact-primary-green-600">*</span>
          </p>
        </label>
        <button
          type="submit"
          className="mt-[18px] flex h-[59px] w-full items-center justify-center rounded-lg bg-contact-primary-green-600 pb-0.5 text-lg font-bold text-contact-neutral-white md:col-span-2"
        >
          Submit
        </button>
      </form>
      {/* {`
        This field is required

        This field is required

        Please enter a valid email address
        This field is required
        
        Please select a query type

        This field is required

        To submit this form, please consent to being contacted

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
