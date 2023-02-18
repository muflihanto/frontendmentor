import Head from "next/head";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const Insure = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Insure landing page</title>
      </Head>

      <div className="App font-karla">
        <Main />
        <Footer />
        <Slider basePath="/insure-landing-page/design/" />
      </div>
    </>
  );
};

function Main() {
  return (
    <>
      {`How we work
        Blog
        Account
        View plans
      
        Humanizing your insurance.
      
        Get your life insurance coverage easier and faster. We blend our expertise 
        and technology to help you find the plan that’s right for you. Ensure you 
        and your loved ones are protected.
      
        View plans
      
        We’re different
      
        Snappy Process
      
        Our application process can be completed in minutes, not hours. Don’t get 
        stuck filling in tedious forms.
      
        Affordable Prices
      
        We don’t want you worrying about high monthly costs. Our prices may be low, 
        but we still offer the best coverage possible.
      
        People First
      
        Our plans aren’t full of conditions and clauses to prevent payouts. We make 
        sure you’re covered when you need it.
      
        Find out more about how we work
      
        How we work
      
        Our company
      
        How we work
        Why Insure?
        View plans
        Reviews
      
        Help me
      
        FAQ
        Terms of use
        Privacy policy
        Cookies
      
        Contact
      
        Sales
        Support
        Live chat
      
        Others
      
        Careers
        Press
        Licenses
      `}
    </>
  );
}

function Footer() {
  return (
    <footer className="text-center text-[11px] [&_a]:text-[hsl(228,45%,44%)]">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by <a href="#">Your Name Here</a>.
    </footer>
  );
}

export default Insure;
