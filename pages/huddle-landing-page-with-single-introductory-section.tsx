import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function HuddleLandingPageWithSingleIntroductorySection() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Huddle landing page with single introductory section</title>
      </Head>
      <div className="App font-open-sans relative min-h-[100svh]">
        <Main />
        <Footer />
        <Slider basePath="/huddle-landing-page-with-single-introductory-section/design/" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
        Build The Community Your Fans Will Love

        Huddle re-imagines the way we build communities. You have a voice, but so does your audience. 
        Create connections with your users as you engage in genuine discussion. 

        Register
      `}
    </>
  );
}

function Footer() {
  return (
    <p className="[&_a]:text-huddle-intro-primary-magenta [&_a]:decoration-huddle-intro-primary-magenta absolute bottom-3 z-20 w-full text-center text-[11px] lg:text-[13px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by <a href="#">Your Name Here</a>.
    </p>
  );
}
