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
          `App bg-contact-primary-green-200 relative flex min-h-[100svh] flex-col items-center pt-8 pb-10 ${karla.variable} font-karla`,
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
    <main className="w-[343px] rounded-2xl bg-white px-6 pt-4 pb-6">
      <h1 className="text-contact-neutral-grey-900 text-[32px] font-bold tracking-tight">
        Contact Us
      </h1>
      <form className="flex flex-col mt-[23px] text-contact-neutral-grey-900 gap-[23px]">
        <label className="flex flex-col w-full gap-[9px]">
          <p>
            <span>First Name</span>
            <span className="text-contact-primary-green-600 ml-[9px]">*</span>
          </p>
          <input
            type="text"
            className="h-[51px] border rounded-lg border-contact-neutral-grey-500"
          />
        </label>
        <label className="flex flex-col w-full gap-[9px]">
          <p>
            <span>Last Name</span>
            <span className="text-contact-primary-green-600 ml-[9px]">*</span>
          </p>
          <input
            type="text"
            className="h-[51px] border rounded-lg border-contact-neutral-grey-500"
          />
        </label>
        <label className="flex flex-col w-full gap-[9px]">
          <p>
            <span>Email Address</span>
            <span className="text-contact-primary-green-600 ml-[9px]">*</span>
          </p>
          <input
            type="email"
            className="h-[51px] border rounded-lg border-contact-neutral-grey-500"
          />
        </label>
        <fieldset>
          <legend>
            <span>Query Type</span>
            <span className="text-contact-primary-green-600 ml-[9px]">*</span>
          </legend>
          <div className="flex flex-col mt-[17px] gap-4">
            <label
              htmlFor="general-enquiry"
              className="w-full flex h-[51px] items-center rounded-lg border border-contact-neutral-grey-500 px-[28px] gap-4 text-lg/none group/label cursor-pointer"
            >
              <input
                type="radio"
                name="query"
                id="general-enquiry"
                value="general-enquiry"
                className="accent-contact-primary-green-600 text-9xl scale-[135%]"
              />
              General Enquiry
            </label>
            <label
              htmlFor="support-request"
              className="w-full flex h-[51px] items-center rounded-lg border border-contact-neutral-grey-500 px-[28px] gap-4 text-lg/none group/label cursor-pointer"
            >
              <input
                type="radio"
                name="query"
                id="support-request"
                value="support-request"
                className="accent-contact-primary-green-600 text-9xl scale-[135%]"
              />
              Support Request
            </label>
          </div>
        </fieldset>
        <label className="w-full flex flex-col gap-2 mt-px">
          <p>
            <span>Message</span>
            <span className="text-contact-primary-green-600 ml-[9px]">*</span>
          </p>
          <textarea className="resize-none rounded-lg h-[240px] border border-contact-neutral-grey-500" />
        </label>
        <label className="flex gap-[22px] px-1 mt-4">
          <input
            type="checkbox"
            className="scale-[135%] accent-contact-primary-green-600"
          />
          <p>
            <span>I consent to being contacted by the team</span>
            <span className="text-contact-primary-green-600 ml-[4px]">*</span>
          </p>
        </label>
        <button
          type="submit"
          className="w-full rounded-lg bg-contact-primary-green-600 flex items-center justify-center font-bold text-contact-neutral-white h-[59px] mt-[18px] text-lg pb-0.5"
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
