import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function FyloDarkThemeLandingPage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Fylo landing page with dark theme and features grid</title>
      </Head>
      <div className="App font-open-sans relative min-h-[100svh]">
        <Main />
        <Footer />
        <Slider basePath="/fylo-dark-theme-landing-page/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
         Features
         Team
         Sign In
       
         All your files in one secure location, accessible anywhere.
       
         Fylo stores all your most important files in one secure location. Access them wherever 
         you need, share and collaborate with friends family, and co-workers.
       
         Get Started
       
         Access your files, anywhere
       
         The ability to use a smartphone, tablet, or computer to access your account means your 
         files follow you everywhere.
       
         Security you can trust
       
         2-factor authentication and user-controlled encryption are just a couple of the security 
         features we allow to help secure your files.
       
         Real-time collaboration
       
         Securely share files and folders with friends, family and colleagues for live collaboration. 
         No email attachments required.
       
         Store any type of file
       
         Whether you're sharing holidays photos or work documents, Fylo has you covered allowing for all 
         file types to be securely stored and shared.
       
         Stay productive, wherever you are
       
         Never let location be an issue when accessing your files. Fylo has you covered for all of your file 
         storage needs.
       
         Securely share files and folders with friends, family and colleagues for live collaboration. No email 
         attachments required.
       
         See how Fylo works
       
         Fylo has improved our team productivity by an order of magnitude. Since making the switch our team has 
         become a well-oiled collaboration machine.
       
         Satish Patel
         Founder & CEO, Huddle
       
         Fylo has improved our team productivity by an order of magnitude. Since making the switch our team has 
         become a well-oiled collaboration machine.
       
         Bruce McKenzie
         Founder & CEO, Huddle
       
         Fylo has improved our team productivity by an order of magnitude. Since making the switch our team has 
         become a well-oiled collaboration machine.
       
         Iva Boyd
         Founder & CEO, Huddle
       
         Get early access today
       
         It only takes a minute to sign up and our free starter tier is extremely generous. If you have any 
         questions, our support team would be happy to help you.
       
         Get Started For Free
       
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
         dolore magna aliqua
       
         +1-543-123-4567
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
