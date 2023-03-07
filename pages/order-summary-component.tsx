import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const OrderSummary = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Order summary card</title>
      </Head>
      <div className="App font-red-hat-display relative h-[100svh] w-screen font-medium">
        <Main />
        <Footer />
        <Slider basePath="/order-summary-component/design/" />
      </div>
    </>
  );
};

function Main() {
  return (
    <>
      {`
        Order Summary

        You can now listen to millions of songs, audiobooks, and podcasts on any 
        device anywhere you like!

        Annual Plan
        $59.99/year

        Change

        Proceed to Payment
        Cancel Order
      `}
    </>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:text-[hsl(228,45%,44%)] [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

export default OrderSummary;
