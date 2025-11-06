import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";

const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function ConferenceTicketGenerator() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Conference ticket generator</title>
      </Head>
      <div className="App relative min-h-[100svh] overflow-x-hidden bg-white">
        <Main />
        <Footer />
        <Slider
          basePath="/conference-ticket-generator/design"
          absolutePath="/conference-ticket-generator/design/mobile-design-form.jpg"
        />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
        <!-- Form starts -->

        Your Journey to Coding Conf 2025 Starts Here!

        Secure your spot at next year's biggest coding conference.

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
      `}
    </>
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
