import Head from "next/head";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function MultiStepForm() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Multi-step form</title>
      </Head>
      <div className="App font-ubuntu relative min-h-[100svh]">
        <Main />
        <Footer />
        <Slider absolutePath="/multi-step-form/design/mobile-design-step-1.jpg" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {/* {`
         <!-- Sidebar start -->

         Step 1
         Your info
       
         Step 2
         Select plan
       
         Step 3
         Add-ons
       
         Step 4
         Summary
       
         <!-- Sidebar end -->
       
         <!-- Step 1 start -->
       
         Personal info
         Please provide your name, email address, and phone number.
       
         Name
         e.g. Stephen King
       
         Email Address
         e.g. stephenking@lorem.com
       
         Phone Number
         e.g. +1 234 567 890
       
         Next Step
       
         <!-- Step 1 end -->
       
         <!-- Step 2 start -->
       
         Select your plan
         You have the option of monthly or yearly billing.
       
         Arcade
         $9/mo
       
         Advanced
         $12/mo
       
         Pro
         $15/mo
       
         Monthly
         Yearly
       
         Go Back
         Next Step
       
         <!-- Step 2 end -->
       
         <!-- Step 3 start -->
       
         Pick add-ons
         Add-ons help enhance your gaming experience.
       
         Online service
         Access to multiplayer games
         +$1/mo
       
         Larger storage
         Extra 1TB of cloud save
         +$2/mo
       
         Customizable Profile
         Custom theme on your profile
         +$2/mo
       
         Go Back
         Next Step
       
         <!-- Step 3 end -->
       
         <!-- Step 4 start -->
       
         Finishing up
         Double-check everything looks OK before confirming.
       
         <!-- Dynamically add subscription and add-on selections here -->
       
         Total (per month/year)
       
         Go Back
         Confirm
       
         <!-- Step 4 end -->
       
         <!-- Step 5 start -->
       
         Thank you!
       
         Thanks for confirming your subscription! We hope you have fun 
         using our platform. If you ever need support, please feel free 
         to email us at support@loremgaming.com.
       
         <!-- Step 5 end -->
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
