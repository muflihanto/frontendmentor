import Head from "next/head";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

interface Feature {
  storage: string;
  users: number;
  bandwith: string;
  price: number;
}

type Features = {
  [key in Plans]: Feature;
};

type Plans = "basic" | "professional" | "master";

type Payment = "annually" | "monthly";

const PricingComponent = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor - Pricing component with toggle</title>
      </Head>
      <div className="App font-montserrat bg-pricing-toggle-neutral-100 relative bg-[url('/pricing-component-with-toggle/images/bg-top.svg')] bg-[length:375px_658px] bg-[top_-36px_right_-195px] bg-no-repeat pb-[71px] pt-[59px] font-bold lg:bg-[url('/pricing-component-with-toggle/images/bg-top.svg'),url('/pricing-component-with-toggle/images/bg-bottom.svg')] lg:bg-[length:375px_658px,353px_304px] lg:bg-[position:top_right,_left_bottom] lg:pb-[103px] lg:pt-[66px]">
        <Main />
        <Footer />
        {/* <Slider
          basePath="/pricing-component-with-toggle/design/"
          absolutePath="/pricing-component-with-toggle/design/active-states.jpg"
          // absolutePath="/pricing-component-with-toggle/design/mobile-design-annually.jpg"
        /> */}
      </div>
    </>
  );
};

function Header({ mode, toggle }: { mode: Payment; toggle: () => void }) {
  return (
    <header className="flex flex-col items-center pb-[80px] lg:pb-[65px]">
      <h1 className="text-pricing-toggle-neutral-300 text-[32px]">Our Pricing</h1>
      <div className="mt-[35px] grid grid-cols-3 grid-rows-1 items-center justify-items-center gap-x-[15px]">
        <p className="text-pricing-toggle-neutral-200 text-[15px]">Annually</p>
        <button
          className="from-pricing-toggle-primary-gradient-100 to-pricing-toggle-primary-gradient-200 ml-1 mt-[1px] h-[32px] w-[56px] rounded-full bg-gradient-to-r px-[5px] hover:opacity-50"
          onClick={toggle}
        >
          <div className={`bg-pricing-toggle-neutral-100 aspect-square w-6 rounded-full transition-transform ${mode === "monthly" ? "translate-x-[22px]" : ""}`} />
        </button>
        <p className="text-pricing-toggle-neutral-200 ml-[3px] text-[15px]">Monthly</p>
      </div>
    </header>
  );
}

function Main() {
  const [mode, setMode] = useState<Payment>("annually");
  const toggle = () => {
    setMode((prev) => (prev === "annually" ? "monthly" : "annually"));
  };
  const features = useMemo<Features>(() => {
    const priceList = {
      annually: {
        basic: 199.99,
        professional: 249.99,
        master: 399.99,
      },
      monthly: {
        basic: 19.99,
        professional: 24.99,
        master: 39.99,
      },
    };
    return {
      basic: { storage: "500 GB", users: 2, bandwith: "3 GB", price: priceList[mode].basic },
      professional: { storage: "1 TB", users: 5, bandwith: "10 GB", price: priceList[mode].professional },
      master: { storage: "2 TB", users: 10, bandwith: "20 GB", price: priceList[mode].master },
    };
  }, [mode]);
  return (
    <>
      <Header
        mode={mode}
        toggle={toggle}
      />
      <PriceListSection features={features} />
    </>
  );
}

function PriceCard({ plan, features, variant }: { plan: string; features: Feature; variant: "blue" | "white" }) {
  return (
    <div
      className={`shadow-pricing-toggle-neutral-400/10 flex h-[453px] flex-col items-center rounded-xl px-[29px] pt-[31px] shadow-2xl lg:w-[350px] lg:px-8 ${
        variant === "blue" ? "from-pricing-toggle-primary-gradient-100 to-pricing-toggle-primary-gradient-200 text-pricing-toggle-neutral-100 bg-[linear-gradient(150deg,_var(--tw-gradient-stops))] lg:h-[500px] lg:justify-center lg:py-0" : "text-pricing-toggle-neutral-300 bg-white "
      } `}
    >
      <div className="text-[18px] capitalize">{plan}</div>
      <div className={`mt-[5px] flex items-center gap-1 ${variant === "blue" ? "text-pricing-toggle-neutral-100" : "text-pricing-toggle-neutral-400"}`}>
        <span className="mt-[1px] text-[40px]">&#36;</span>
        <span className="text-[72px] tracking-[-2px]">{features.price}</span>
      </div>
      <div className={`mt-[14px] flex w-full flex-col items-center divide-y-[2px] border-y-[2px] pb-[1px] text-[15px] ${variant === "blue" ? "divide-pricing-toggle-primary-gradient-100 border-y-pricing-toggle-primary-gradient-100" : ""}`}>
        <div className="flex h-[52px] w-full items-center justify-center pb-[2px] text-center">{features.storage} Storage</div>
        <div className="flex h-[52px] w-full items-center justify-center pb-[2px] text-center">{features.users} Users Allowed</div>
        <div className="flex h-[52px] w-full items-center justify-center text-center">Send up to {features.bandwith}</div>
      </div>
      <a
        href=""
        className={`mt-[32px] flex h-[44px] w-full items-center justify-center rounded-[6px] text-[13px] uppercase tracking-[1.5px] hover:border-2 ${
          variant === "white"
            ? "hover:border-pricing-toggle-primary-gradient-100 hover:text-pricing-toggle-primary-gradient-200 text-pricing-toggle-neutral-100 from-pricing-toggle-primary-gradient-100 to-pricing-toggle-primary-gradient-200 bg-gradient-to-r hover:from-transparent hover:to-transparent"
            : "text-pricing-toggle-primary-gradient-200 hover:text-pricing-toggle-neutral-100 hover:border-pricing-toggle-neutral-100/50 bg-white hover:bg-transparent "
        }`}
      >
        Learn More
      </a>
    </div>
  );
}

function PriceListSection({ features }: { features: Features }) {
  return (
    <div className="flex flex-col gap-[32.5px] px-6 max-lg:mx-auto max-lg:max-w-md lg:flex-row lg:items-center lg:justify-center lg:gap-0">
      {Object.entries(features).map((el, index) => {
        const plan = el[0] as Plans;
        return (
          <PriceCard
            plan={plan}
            features={features[plan]}
            variant={plan === "professional" ? "blue" : "white"}
            key={index}
          />
        );
      })}
    </div>
  );
}

function Footer() {
  return (
    <div className="[&_a]:text-pricing-toggle-primary-gradient-200 text-pricing-toggle-neutral-400 absolute bottom-2 w-full text-center text-[11px]">
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
        rel="noreferrer"
        target="_blank"
      >
        Muflihanto
      </a>
      .
    </div>
  );
}

export default PricingComponent;
