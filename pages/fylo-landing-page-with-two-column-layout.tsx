import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function FyloLandingPageWithTwoColumnLayout() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Fylo landing page with two column layout</title>
      </Head>
      <div className="App font-open-sans relative min-h-[100svh]">
        <Header />
        <Main />
        <Footer />
        <Slider basePath="/fylo-landing-page-with-two-column-layout/design" />
      </div>
    </>
  );
}

function Header() {
  return (
    <header className="flex h-[72px] items-center justify-between px-6">
      <div className="relative aspect-[166/49] w-20">
        <Image
          src="/fylo-landing-page-with-two-column-layout/images/logo.svg"
          alt="Fylo Logo"
          className="object-contain"
          fill
        />
      </div>
      <nav>
        <ul className="text-fylo-landing-primary-blue-200 font-raleway flex items-center gap-[25px] text-[12px] leading-none">
          <li>
            <a href="">Features</a>
          </li>
          <li>
            <a href="">Team</a>
          </li>
          <li>
            <a href="">Sign In</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <div className="flex flex-col items-center px-6 pt-[74px]">
      <div className="relative ml-[1px] aspect-[1132.93/839.14] w-[calc(100%-23px)]">
        <Image
          src="/fylo-landing-page-with-two-column-layout/images/illustration-1.svg"
          alt="Hero Image Illustration"
          className="object-contain"
          fill
        />
      </div>
      <h1 className="font-open-sans text-fylo-landing-primary-blue-200 mt-[39px] text-center text-[24px] font-bold leading-[36px]">All your files in one secure location, accessible anywhere.</h1>
      <p className="text-fylo-landing-primary-blue-200 mt-[25px] pl-3 pr-5 text-center text-[14px]">Fylo stores your most important files in one secure location. Access them wherever you need, share and collaborate with friends, family, and co-workers.</p>
      <form
        noValidate
        className="font-raleway mt-[31.75px] grid w-full grid-cols-1 grid-rows-[repeat(2,40px)] gap-y-4 pl-[14px] pr-[9px]"
      >
        <input
          type="emaiil"
          placeholder="Enter your email..."
          className=" border-fylo-landing-primary-blue-100 w-full rounded-sm border px-5 py-[1px] text-[12px] placeholder:opacity-50"
        />
        <button className="bg-fylo-landing-accent-blue text-fylo-landing-neutral-100 shadow-fylo-landing-primary-blue-200/10 -translate-x-[2px] rounded-sm text-[14px] font-bold shadow-md">Get Started</button>
      </form>
    </div>
  );
}

function Main() {
  return (
    <>
      <Hero />
      {`
         Stay productive, wherever you are
       
         Never let location be an issue when accessing your files. Fylo has you 
         covered for all of your file storage needs.
       
         Securely share files and folders with friends, family and colleagues for 
         live collaboration. No email attachments required!
       
         See how Fylo works
       
         Fylo has improved our team productivity by an order of magnitude. Since 
         making the switch our team has become a well-oiled collaboration machine.
       
         Kyle Burton
         Founder & CEO, Huddle
       
         Get early access today
       
         It only takes a minute to sign up and our free starter tier is extremely generous. 
         If you have any questions, our support team would be happy to help you.
       
         Get Started For Free
       
         Phone: +1-543-123-4567
         example@fylo.com
       
         About Us
         Jobs
         Press
         Blog
       
         Contact Us
         Terms
         Privacy
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
