import Head from "next/head";
import Image from "next/image";
import { redHatDisplay } from "../utils/fonts/redHatDisplay";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const OrderSummary = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Order summary card</title>
      </Head>
      <div
        className={`App relative flex min-h-[100svh] w-screen items-center justify-center bg-order-summary-primary-100 bg-[url('/order-summary-component/images/pattern-background-mobile.svg')] bg-[length:100%_auto] bg-no-repeat font-red-hat-display font-medium max-lg:py-[50px] lg:bg-[url('/order-summary-component/images/pattern-background-desktop.svg')] lg:py-[calc(102/900*100vh)] ${redHatDisplay.variable}`}
      >
        <Main />
        <Footer />
        {/* <Slider
          basePath="/order-summary-component/design/"
          absolutePath="/order-summary-component/design/active-states.jpg"
        /> */}
      </div>
    </>
  );
};

function Main() {
  return (
    <div className="h-[567px] w-[calc(100%-48px)] max-w-[calc(375px-48px)] overflow-hidden rounded-[20px] bg-white shadow-2xl shadow-order-summary-neutral-200/30 lg:h-[697px] lg:max-w-[450px]">
      <header className="relative aspect-[45/22] w-full">
        <Image
          src="/order-summary-component/images/illustration-hero.svg"
          alt="Illustration"
          fill
          className="object-contain"
        />
      </header>
      <main className="flex flex-col items-center px-6 py-[30px] lg:px-12 lg:py-[43px]">
        <h1 className="text-center text-[22px] font-black text-order-summary-neutral-300 lg:text-[28px]">
          Order Summary
        </h1>
        <p className="mt-[15px] text-center text-order-summary-neutral-200 max-lg:px-3 max-lg:text-[15px] max-lg:leading-[25px] lg:mt-[14px] lg:px-6 lg:text-base lg:leading-[26px]">
          You can now listen to millions of songs, audiobooks, and podcasts on
          any device anywhere you like!
        </p>
        <div className="mt-6 flex h-20 w-full items-center rounded-xl bg-order-summary-neutral-100 p-4 lg:mt-5 lg:h-[98px] lg:px-6 lg:py-0 lg:pb-[1px]">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-12"
            >
              <g fill="none" fillRule="evenodd">
                <circle cx="24" cy="24" r="24" fill="#DFE6FB" />
                <path
                  fill="#717FA6"
                  fillRule="nonzero"
                  d="M32.574 15.198a.81.81 0 00-.646-.19L20.581 16.63a.81.81 0 00-.696.803V26.934a3.232 3.232 0 00-1.632-.44A3.257 3.257 0 0015 29.747 3.257 3.257 0 0018.253 33a3.257 3.257 0 003.253-3.253v-8.37l9.726-1.39v5.327a3.232 3.232 0 00-1.631-.441 3.257 3.257 0 00-3.254 3.253 3.257 3.257 0 003.254 3.253 3.257 3.257 0 003.253-3.253V15.81a.81.81 0 00-.28-.613z"
                />
              </g>
            </svg>
          </span>
          <p className="ml-5 flex flex-col lg:gap-[3px]">
            <span className="text-[14px] font-black text-order-summary-neutral-300 lg:text-[16px]">
              Annual Plan
            </span>
            <span className="text-[14.5px] text-order-summary-neutral-200 lg:text-[16.5px]">
              $59.99/year
            </span>
          </p>
          <span className="ml-auto text-[13px] font-bold text-order-summary-primary-200 underline decoration-2 underline-offset-1 hover:text-[hsl(245,83%,68%)] hover:no-underline lg:text-[14px]">
            <a href="">Change</a>
          </span>
        </div>
        <div className="mt-6 grid w-full grid-cols-1 grid-rows-[repeat(2,50px)] flex-col place-items-center items-center gap-y-[9px] lg:mt-[31.5px] lg:gap-y-[17px]">
          <a
            href=""
            className="flex h-[50px] w-full items-center justify-center rounded-xl bg-order-summary-primary-200 text-[15px] font-black text-order-summary-neutral-100 shadow-xl shadow-order-summary-neutral-200/30 hover:bg-[hsl(245,83%,68%)]"
          >
            Proceed to Payment
          </a>
          <a
            href=""
            className="text-[15px] font-black text-order-summary-neutral-200 hover:text-order-summary-neutral-300"
          >
            Cancel Order
          </a>
        </div>
      </main>
    </div>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:text-[hsl(228,45%,44%)] [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a href="https://github.com/muflihanto" target="_blank" rel="noreferrer">
        Muflihanto
      </a>
      .
    </footer>
  );
}

export default OrderSummary;
