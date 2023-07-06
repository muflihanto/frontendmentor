import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

// TODO: - View the optimal layout for the site depending on their device's screen size
// TODO: - See hover states for all interactive elements on the page
// TODO: - See all testimonials in a horizontal slider
// TODO: - Receive an error message when the newsletter sign up `form` is submitted if:
// TODO:   - The `input` field is empty
// TODO:   - The email address is not formatted correctly

export default function ManageLandingPage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Manage landing page</title>
      </Head>
      <div className="App font-be-vietnam-pro relative min-h-[100svh]">
        <Main />
        <Footer />
        <Slider basePath="/manage-landing-page/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
         Pricing
         Product
         About Us
         Careers
         Community
       
         Get Started
       
         Bring everyone together to build better products.
       
         Manage makes it simple for software teams to plan day-to-day 
         tasks while keeping the larger team goals in view.
       
         Get Started
       
         What’s different about Manage?
       
         Manage provides all the functionality your team needs, without 
         the complexity. Our software is tailor-made for modern digital 
         product teams. 
       
         01
         Track company-wide progress
         See how your day-to-day tasks fit into the wider vision. Go from 
         tracking progress at the milestone level all the way done to the 
         smallest of details. Never lose sight of the bigger picture again.
       
         02
         Advanced built-in reports
         Set internal delivery estimates and track progress toward company 
         goals. Our customisable dashboard helps you build out the reports 
         you need to keep key stakeholders informed.
       
         03
         Everything you need in one place
         Stop jumping from one service to another to communicate, store files, 
         track tasks and share documents. Manage offers an all-in-one team 
         productivity solution.
       
         What they’ve said
       
         Anisha Li
         “Manage has supercharged our team’s workflow. The ability to maintain 
         visibility on larger milestones at all times keeps everyone motivated.”
       
         Ali Bravo
         “We have been able to cancel so many other subscriptions since using 
         Manage. There is no more cross-channel confusion and everyone is much 
         more focused.”
       
         Richard Watts
         “Manage allows us to provide structure and process. It keeps us organized 
         and focused. I can’t stop recommending them to everyone I talk to!”
       
         Shanai Gough
         “Their software allows us to track, manage and collaborate on our projects 
         from anywhere. It keeps the whole team in-sync without being intrusive.”
       
         Get Started
       
         Simplify how your team works today.
         Get Started
       
         Home
         Pricing
         Products
         About Us
         Careers
         Community
         Privacy Policy
       
         Updates in your inbox…
         Go
       
         Copyright 2020. All Rights Reserved
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
