import { useState } from "react";

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
  const featureList = [
    "Unlimited websites",
    "100% data ownership",
    "Email reports",
  ];
  const [price, setPrice] = useState(3);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="mx-auto mt-[26px] w-[calc(100vw-48px)] rounded-md bg-white py-[33px] text-center shadow-[0px_4px_4px_rgba(0,0,0,.075)] lg:mt-[50px] lg:max-w-[540px] lg:pt-[51px] lg:shadow-[0px_15px_15px_rgba(0,0,0,.075)]">
      <div className="items-center lg:grid lg:grid-cols-[auto_auto] lg:grid-rows-[fit_fit] lg:px-[45px]">
        <h2 className="text-[12px] font-extrabold uppercase tracking-[1.7px] text-pricing-neutral-400 lg:col-start-1 lg:row-start-1 lg:place-self-start lg:self-center lg:text-[14px] lg:tracking-[2px]">
          {priceList[price - 1].views} Pageviews
        </h2>
        <input
          type="range"
          value={price}
          min={1}
          max={5}
          step={1}
          onChange={({ target }) => {
            const val = Number.parseInt(target.value);
            const min = Number.parseInt(target.min);
            const max = Number.parseInt(target.max);
            setPrice(val);
            target.style.backgroundSize = `${
              ((val - min) * 100) / (max - min)
            }% 100%`;
          }}
          aria-valuemin={10000}
          aria-valuemax={1000000}
          aria-valuenow={Number.parseInt(
            priceList[price - 1].views
              .replace("K", "000")
              .replace("M", "000000"),
          )}
          aria-valuetext={`Pageviews: ${priceList[price - 1].views}, Price: $${
            billing === "monthly"
              ? priceList[price - 1].price
              : 0.75 * priceList[price - 1].price
          }.00`}
          aria-label="Adjust pageviews and cost per month"
          className="mx-auto my-10 h-2 w-[calc(100%-48px)] appearance-none rounded-full bg-pricing-neutral-200 bg-gradient-to-r from-pricing-primary-cyan-100 to-pricing-primary-cyan-100 bg-[length:50%_100%] bg-no-repeat thumb:h-10 thumb:w-10 thumb:cursor-pointer thumb:appearance-none thumb:rounded-full thumb:border-none thumb:bg-pricing-primary-cyan-200 thumb:bg-[url('/interactive-pricing-component/images/icon-slider.svg')] thumb:bg-center thumb:bg-no-repeat thumb:shadow-xl thumb:shadow-pricing-primary-cyan-200/60 active:thumb:bg-[hsl(174,67%,41%)] track:appearance-none track:border-none track:bg-transparent track:shadow-none lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mt-[52px] lg:w-[calc(100%-8px)]"
        />
        <div className="flex items-center justify-center gap-[10px] pr-[2px] lg:col-start-2 lg:row-start-1 lg:justify-end lg:gap-[8px] lg:self-center">
          <span className="text-[32px] font-extrabold leading-[32px] tracking-[-0.8px] text-pricing-neutral-500 lg:text-[40px]">
            $
            {billing === "monthly"
              ? priceList[price - 1].price
              : 0.75 * priceList[price - 1].price}
            .00
          </span>
          <span className="text-[14px] text-pricing-neutral-400 lg:pr-[2px] lg:pt-[2px] lg:text-[16px]">
            / month
          </span>
        </div>
      </div>
      {/** biome-ignore lint/a11y/useSemanticElements: Custom switch component requires non-semantic container for layout */}
      <div
        className="grid-row-1 mt-[39px] grid grid-cols-[minmax(0,1fr),44px,minmax(0,1fr)] gap-x-3 lg:mt-[14px] [&_p]:self-center [&_p]:text-[12px] [&_p]:text-pricing-neutral-400"
        aria-label="Billing option switch"
        role="group"
      >
        <p className="place-self-end">Monthly Billing</p>
        <button
          className={`h-[22px] w-[44px] ${
            billing === "monthly"
              ? "justify-start bg-pricing-neutral-300"
              : "justify-end bg-pricing-primary-cyan-200"
          } mt-[1px] flex items-center rounded-full p-1 transition-all before:h-[14px] before:w-[14px] before:rounded-full before:bg-pricing-neutral-50 hover:bg-pricing-primary-cyan-100 active:bg-[hsl(174,67%,41%)]`}
          onClick={() => {
            setBilling((prev) => {
              return prev === "monthly" ? "yearly" : "monthly";
            });
          }}
          type="button"
          role="switch"
          aria-checked={billing === "yearly"}
          tabIndex={0}
          aria-label={`Switch to ${
            billing === "monthly" ? "yearly" : "monthly"
          } billing`}
        />
        {/** biome-ignore lint/a11y/useAriaPropsSupportedByRole: Paragraph requires aria-label for screen reader context */}
        <p
          className="relative flex items-center place-self-start"
          aria-label="Yearly Billing with 25 percent discount"
        >
          Yearly Billing
          <span className="ml-[6px] inline-block rounded-full bg-pricing-primary-red-100 px-2 pb-[3px] pt-[1px] text-[10px] font-extrabold text-pricing-primary-red-200">
            <span className="inline lg:hidden">-</span>
            25% <span className="hidden lg:inline">discount</span>
          </span>
        </p>
      </div>
      <hr className="mb-[23px] mt-[38px] lg:mb-[32px] lg:mt-[40px]" />
      <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:px-[45px]">
        <ul className="flex flex-col gap-2">
          {featureList.map((el, index) => {
            return (
              <li
                key={`${index}-${el}`}
                className="flex items-center justify-center gap-[15px] pr-1 lg:justify-start"
              >
                <span>
                  <svg
                    viewBox="0 0 9 8"
                    className="pointer-events-none mt-[2px] h-2"
                  >
                    <title>Check</title>
                    <use href="/interactive-pricing-component/images/icon-check.svg#icon-check" />
                  </svg>
                </span>
                <span className="font-commissioner text-[12.5px] text-pricing-neutral-400">
                  {el}
                </span>
              </li>
            );
          })}
        </ul>
        <button
          className="mx-auto mt-8 flex h-[41px] w-[170px] items-center justify-center rounded-full bg-pricing-neutral-500 text-[12px] font-extrabold text-pricing-neutral-300/90 hover:text-pricing-neutral-100 lg:m-0"
          type="button"
        >
          Start my trial
        </button>
      </div>
    </div>
  );
};

export default Main;
