import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

// TODO: - View the optimal layout for the site depending on their device's screen size
// TODO: - See hover states for all interactive elements on the page

export default function EasybankLandingPage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Easybank landing page</title>
      </Head>
      <div className="App font-public relative min-h-[100svh]">
        <Main />
        <Footer />
        <Slider basePath="/easybank-landing-page/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
         Home
         About
         Contact
         Blog
         Careers
       
         Request Invite
       
       
       
         Next generation digital banking
       
         Take your financial life online. Your Easybank account will be a one-stop-shop 
         for spending, saving, budgeting, investing, and much more.
       
         Request Invite
       
       
       
         Why choose Easybank?
       
         We leverage Open Banking to turn your bank account into your financial hub. Control 
         your finances like never before.
       
         Online Banking
         Our modern web and mobile applications allow you to keep track of your finances 
         wherever you are in the world.
       
         Simple Budgeting
         See exactly where your money goes each month. Receive notifications when you’re 
         close to hitting your limits.
       
         Fast Onboarding
         We don’t do branches. Open your account in minutes online and start taking control 
         of your finances right away.
       
         Open API
         Manage your savings, investments, pension, and much more from one account. Tracking 
         your money has never been easier.
       
         
       
         Latest Articles
       
         By Claire Robinson
         Receive money in any currency with no fees
         The world is getting smaller and we’re becoming more mobile. So why should you be 
         forced to only receive money in a single …
       
         By Wilson Hutton
         Treat yourself without worrying about money
         Our simple budgeting feature allows you to separate out your spending and set 
         realistic limits each month. That means you …
       
         By Wilson Hutton
         Take your Easybank card wherever you go
         We want you to enjoy your travels. This is why we don’t charge any fees on purchases 
         while you’re abroad. We’ll even show you …
       
         By Claire Robinson
         Our invite-only Beta accounts are now live!
         After a lot of hard work by the whole team, we’re excited to launch our closed beta. 
         It’s easy to request an invite through the site ...
       
         
       
         About Us
         Contact
         Blog
         Careers
         Support
         Privacy Policy
       
         Request Invite
       
         © Easybank. All Rights Reserved
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
