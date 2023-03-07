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
      <div className="App font-red-hat-display bg-order-summary-primary-100 relative flex h-[100svh] w-screen items-center justify-center bg-[url('/order-summary-component/images/pattern-background-mobile.svg')] bg-no-repeat font-medium lg:bg-[url('/order-summary-component/images/pattern-background-desktop.svg')]">
        <Main />
        <Footer />
        {/* <Slider basePath="/order-summary-component/design/" /> */}
      </div>
    </>
  );
};

function Main() {
  return (
    <div className="shadow-order-summary-neutral-200/30 h-[567px] max-w-[calc(375px-48px)] overflow-hidden rounded-[20px] bg-white shadow-2xl">
      <header className="relative aspect-[45/22] w-full">
        <Image
          src="/order-summary-component/images/illustration-hero.svg"
          alt="Illustration"
          fill
          className="object-contain"
        />
      </header>
      <main className="flex flex-col items-center px-6 py-[30px]">
        <h1 className="text-order-summary-neutral-300 text-center text-[22px] font-black">Order Summary</h1>
        <p className="text-order-summary-neutral-200 mt-[15px] text-center max-lg:px-3 max-lg:text-[15px] max-lg:leading-[25px]">You can now listen to millions of songs, audiobooks, and podcasts on any device anywhere you like!</p>
        <div className="bg-order-summary-neutral-100 mt-6 flex h-20 w-full items-center rounded-xl p-4">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-12"
            >
              <g
                fill="none"
                fill-rule="evenodd"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="24"
                  fill="#DFE6FB"
                />
                <path
                  fill="#717FA6"
                  fill-rule="nonzero"
                  d="M32.574 15.198a.81.81 0 00-.646-.19L20.581 16.63a.81.81 0 00-.696.803V26.934a3.232 3.232 0 00-1.632-.44A3.257 3.257 0 0015 29.747 3.257 3.257 0 0018.253 33a3.257 3.257 0 003.253-3.253v-8.37l9.726-1.39v5.327a3.232 3.232 0 00-1.631-.441 3.257 3.257 0 00-3.254 3.253 3.257 3.257 0 003.254 3.253 3.257 3.257 0 003.253-3.253V15.81a.81.81 0 00-.28-.613z"
                />
              </g>
            </svg>
          </span>
          <p className="ml-5 flex flex-col">
            <span className="text-order-summary-neutral-300 text-[14px] font-black">Annual Plan</span>
            <span className="text-order-summary-neutral-200 text-[14.5px]">$59.99/year</span>
          </p>
          <span className="text-order-summary-primary-200 ml-auto text-[13px] font-bold underline decoration-2 underline-offset-1">Change</span>
        </div>
        <div className="mt-6 grid w-full grid-cols-1 grid-rows-[repeat(2,50px)] flex-col place-items-center items-center gap-y-[9px]">
          <a
            href=""
            className="bg-order-summary-primary-200 text-order-summary-neutral-100 shadow-order-summary-neutral-200/30 flex h-[50px] w-full items-center justify-center rounded-xl text-[15px] font-black shadow-xl"
          >
            Proceed to Payment
          </a>
          <a
            href=""
            className="text-order-summary-neutral-200 text-[15px] font-black"
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

export default OrderSummary;
