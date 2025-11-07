import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { inconsolata } from "../utils/fonts/inconsolata";

const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function ConferenceTicketGenerator() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Conference ticket generator</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] overflow-x-hidden bg-white bg-[url('/conference-ticket-generator/assets/images/background-mobile.png')] bg-cover bg-top font-inconsolata md:bg-[url('/conference-ticket-generator/assets/images/background-tablet.png')] lg:bg-[url('/conference-ticket-generator/assets/images/background-desktop.png')] ${inconsolata.variable}`}
      >
        <Main />
        <Footer />
        {/* <Slider
          basePath="/conference-ticket-generator/design"
          absolutePath="/conference-ticket-generator/design/mobile-design-form.jpg"
        /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <main className="flex h-full w-full flex-col items-center px-6 py-[30px] text-[20px] leading-6 text-conference-ticket-generator-neutral-0">
      <Image
        src={"/conference-ticket-generator/assets/images/logo-full.svg"}
        width={209}
        height={30}
        alt="Coding Conf"
        className="scale-[80%]"
      />

      <h1 className="mt-[38px] text-center text-[30px] font-extrabold leading-8 tracking-[-0.035em]">
        Your Journey to Coding Conf 2025 Starts Here!
      </h1>

      <p className="mt-[21px] text-center tracking-tight text-conference-ticket-generator-neutral-300">
        Secure your spot at next year&rsquo;s biggest coding conference.
      </p>

      {/* 
        <!-- Form starts -->

        Upload Avatar
        Drag and drop or click to upload
        Upload your photo (JPG or PNG, max size: 500KB).

        Full Name

        Email Address
        example@email.com

        GitHub Username
        @yourusername

        Generate My Ticket

        <!-- Form ends -->

        <!-- Generated tickets starts -->

        Congrats, <!-- Full Name -->! Your ticket is ready.

        We've emailed your ticket to <!-- Email Address --> and will send updates in the run up to the event.

        Coding Conf
        Jan 31, 2025 / Austin, TX

        <!-- Generated tickets ends -->
      */}
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-black [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
