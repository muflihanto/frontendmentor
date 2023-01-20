import { useEffect, useState } from "react";

const priceList: { views: string; price: number }[] = [
  {
    views: "10K",
    price: 8,
  },
  {
    views: "50K",
    price: 12,
  },
  {
    views: "100K",
    price: 16,
  },
  {
    views: "500K",
    price: 24,
  },
  {
    views: "1M",
    price: 36,
  },
];

const Main: React.FC = () => {
  return (
    <>
      <Header />
      <Card />
      {`
        
      `}
    </>
  );
};

const Header: React.FC = () => {
  return (
    <header className="text-center bg-[url('/interactive-pricing-component/images/pattern-circles.svg')] bg-[center_top_calc(50%+2px)] bg-no-repeat py-[40px]">
      <h1 className="font-extrabold text-[20px] text-pricing-neutral-500">Simple, traffic-based pricing</h1>
      <p className="text-[13px] font-medium text-pricing-neutral-400 mt-2">Sign-up for our 30-day trial.</p>
      <p className="text-[13px] font-medium text-pricing-neutral-400 mt-1">No credit card required.</p>
    </header>
  );
};

const Card: React.FC = () => {
  const featureList = ["Unlimited websites", "100% data ownership", "Email reports"];
  const [price, setPrice] = useState(3);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  return (
    <div className="bg-white shadow-[0px_4px_4px_rgba(0,0,0,.075)] mx-auto w-[calc(100vw-48px)] rounded-md text-center mt-[26px] py-[33px]">
      <div>
        <h2 className="uppercase text-[12px] tracking-[1.7px] font-extrabold text-pricing-neutral-400">{priceList[price - 1].views} Pageviews</h2>
        <input
          type="range"
          value={price}
          min={1}
          max={5}
          step={1}
          onChange={({ target }) => {
            setPrice(parseInt(target.value));
            target.style.backgroundSize = ((parseInt(target.value) - parseInt(target.min)) * 100) / (parseInt(target.max) - parseInt(target.min)) + "% 100%";
          }}
          className="mx-auto w-[calc(100%-48px)] thumb:bg-[url('/interactive-pricing-component/images/icon-slider.svg')] thumb:bg-no-repeat thumb:bg-center thumb:bg-pricing-primary-cyan-200 thumb:border-none thumb:w-10 thumb:h-10 thumb:shadow-pricing-primary-cyan-200/60 thumb:shadow-xl thumb:cursor-pointer active:thumb:bg-[hsl(174,67%,41%)] thumb:appearance-none thumb:rounded-full bg-gradient-to-r from-pricing-primary-cyan-100 to-pricing-primary-cyan-100 bg-no-repeat rounded-full h-2 my-10 appearance-none track:bg-transparent track:appearance-none track:border-none track:shadow-none bg-pricing-neutral-200"
        />
        <div className="flex items-center justify-center gap-[10px] pr-[2px]">
          <span className="font-extrabold text-[32px] leading-[32px] tracking-[-0.8px] text-pricing-neutral-500">${billing === "monthly" ? priceList[price - 1].price : 0.75 * priceList[price - 1].price}.00</span>
          <span className="text-pricing-neutral-400 text-[14px]">/ month</span>
        </div>
        <div className="grid grid-row-1 grid-cols-[minmax(0,1fr),44px,minmax(0,1fr)] mt-[39px] gap-x-3 [&_p]:text-[12px] [&_p]:self-center [&_p]:text-pricing-neutral-400">
          <p className="place-self-end">Monthly Billing</p>
          <button
            className={`w-[44px] h-[22px] ${billing === "monthly" ? "bg-pricing-neutral-300 justify-start" : "bg-pricing-primary-cyan-200 justify-end"} rounded-full flex items-center p-1 before:w-[14px] before:h-[14px] before:rounded-full before:bg-pricing-neutral-50 active:bg-[hsl(174,67%,41%)] hover:bg-pricing-primary-cyan-100 transition-all mt-[1px]`}
            onClick={() => {
              setBilling((prev) => {
                return prev === "monthly" ? "yearly" : "monthly";
              });
            }}
          />
          <p className="relative flex items-center place-self-start">
            Yearly Billing
            <span className="bg-pricing-primary-red-100 text-pricing-primary-red-200/75 text-[10px] ml-[6px] inline-block px-2 rounded-full font-bold pb-[3px] pt-[1px]">-25%</span>
          </p>
        </div>
      </div>
      <hr className="mt-[38px] mb-[23px]" />
      <div>
        <ul className="flex flex-col gap-2">
          {featureList.map((el, index) => {
            return (
              <li
                key={index}
                className="flex items-center justify-center gap-[15px] pr-1"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="8"
                    className="mt-[2px]"
                  >
                    <path
                      fill="none"
                      stroke="#10D8C4"
                      strokeWidth="2"
                      d="M1 4.134l1.907 1.908L7.949 1"
                    />
                  </svg>
                </span>
                <span className="text-[12.5px] text-pricing-neutral-400 font-commissioner">{el}</span>
              </li>
            );
          })}
        </ul>
        <button className="mx-auto w-[170px] bg-pricing-neutral-500 text-pricing-neutral-300 text-[12px] font-extrabold flex items-center justify-center rounded-full h-[41px] mt-8 hover:text-pricing-neutral-100">Start my trial</button>
      </div>
    </div>
  );
};

export default Main;
