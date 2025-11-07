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

function Ornament() {
  return (
    <div className="absolute left-0 top-0 z-10 h-full w-full overflow-hidden">
      <div className="absolute -left-[22px] -top-8 aspect-square h-[109px]">
        <Image
          src="/conference-ticket-generator/assets/images/pattern-circle.svg"
          fill
          className="object-contain"
          alt="Pattern circle"
          aria-hidden="true"
        />
      </div>
      <div className="absolute -right-[46px] top-[548px] aspect-square h-[108px]">
        <Image
          src="/conference-ticket-generator/assets/images/pattern-circle.svg"
          fill
          className="object-contain"
          alt="Pattern circle bottom"
          aria-hidden="true"
        />
      </div>
      <div className="absolute left-1/2 top-0 z-10 aspect-[1459/1024] w-[264%] -translate-x-[calc(50%+28px)]">
        <Image
          src="/conference-ticket-generator/assets/images/pattern-lines.svg"
          fill
          className="object-contain"
          alt="Pattern lines"
          aria-hidden="true"
        />
      </div>
      <div className="absolute right-0 top-6 aspect-[446/208] h-[52px]">
        <Image
          src="/conference-ticket-generator/assets/images/pattern-squiggly-line-top.svg"
          fill
          className="object-contain"
          alt="Pattern squiggly line top"
          aria-hidden="true"
        />
      </div>
      <div className="absolute bottom-0 left-0 aspect-[760/530] h-[210px] lg:hidden">
        <Image
          src="/conference-ticket-generator/assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg"
          fill
          className="object-contain"
          alt="Pattern squiggly line bottom tablet"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function Main() {
  return (
    <main className="z-20 flex h-full w-full flex-col items-center px-6 py-[30px] text-[20px] leading-6 text-conference-ticket-generator-neutral-0">
      <Ornament />

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
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-conference-ticket-generator-neutral-0 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
