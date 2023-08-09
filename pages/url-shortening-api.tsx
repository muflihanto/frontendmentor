import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

/**
 * TODOS:
 * Build out this landing page, integrate with the [shrtcode API](https://app.shrtco.de/) and get it looking as close to the design as possible.
 * Your users should be able to:
 * - View the optimal layout for the site depending on their device's screen size
 * - Shorten any valid URL
 * - See a list of their shortened links, even after refreshing the browser
 * - Copy the shortened link to their clipboard in a single click
 * - Receive an error message when the `form` is submitted if:
 *    - The `input` field is empty
 */

export default function UrlShorteningApi() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Shortly URL shortening API Challenge</title>
      </Head>
      <div className="App font-poppins relative min-h-[100svh]">
        <Main />
        <Footer />
        <Slider basePath="/url-shortening-api/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {/* {`
         Features
         Pricing
         Resources
       
         Login
         Sign Up
       
         More than just shorter links
       
         Build your brand’s recognition and get detailed insights 
         on how your links are performing.
       
         Get Started
         
         Shorten a link here...
       
         Shorten It!
       
         Advanced Statistics
       
         Track how your links are performing across the web with our 
         advanced statistics dashboard.
       
         Brand Recognition
       
         Boost your brand recognition with each click. Generic links don’t 
         mean a thing. Branded links help instil confidence in your content.
       
         Detailed Records
       
         Gain insights into who is clicking your links. Knowing when and where 
         people engage with your content helps inform better decisions.
       
         Fully Customizable
       
         Improve brand awareness and content discoverability through customizable 
         links, supercharging audience engagement.
       
         Boost your links today
       
         Get Started
       
         Features
       
         Link Shortening
         Branded Links
         Analytics
       
         Resources
       
         Blog
         Developers
         Support
       
         Company
       
         About
         Our Team
         Careers
         Contact
      `} */}
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
