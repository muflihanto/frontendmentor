import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

// TODO: - Add their email and submit the form
// TODO: - See a success message with their email after successfully submitting the form
// TODO: - See form validation messages if:
// TODO:   - The field is left empty
// TODO:   - The email address is not formatted correctly
// TODO: - View the optimal layout for the interface depending on their device's screen size
// TODO: - See hover and focus states for all interactive elements on the page

export default function NewsletterSignUpWithSuccessMessage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Newsletter sign-up form with success message</title>
      </Head>
      <div className="App font-roboto relative min-h-[100dvh]">
        <Main />
        <Footer />
        <Slider basePath="/newsletter-sign-up-with-success-message/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
         <!-- Sign-up form start -->

         Stay updated!
       
         Join 60,000+ product managers receiving monthly updates on:
       
         Product discovery and building what matters
         Measuring to ensure updates are a success
         And much more!
       
         Email address
         email@company.com
       
         Subscribe to monthly newsletter
       
         <!-- Sign-up form end -->
       
         <!-- Success message start -->
       
         Thanks for subscribing!
       
         A confirmation email has been sent to ash@loremcompany.com. 
         Please open it and click the button inside to confirm your subscription.
       
         Dismiss message
       
         <!-- Success message end -->
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
