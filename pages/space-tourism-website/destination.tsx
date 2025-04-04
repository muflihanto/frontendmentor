import Head from "next/head";
import { getLayout } from "../../components/space-tourism-website/Layout";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../../components/SliderTs"), { ssr: false });
import _data from "../../components/space-tourism-website/data.json";
import { type KeyboardEvent, useState } from "react";
import Image from "next/image";
import { cn } from "../../utils/cn";
const data = _data.destinations;

const tabType = ["Moon", "Mars", "Europa", "Titan"] as const;
type Tab = (typeof tabType)[number];

export default function Tech() {
  const [tab, setTab] = useState<Tab>("Moon");
  const destination = data.find((d) => d.name === tab);

  const onItemKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const tab = event.currentTarget;
    const parent = tab.parentElement;
    const tablist = parent?.parentElement;
    const key = event.key;
    const allTabs = tablist?.querySelectorAll("button");
    const firstTab = allTabs?.[0];
    const lastTab = allTabs?.[allTabs.length - 1];
    const nextTab = parent?.nextElementSibling?.querySelector("button");
    const prevTab = parent?.previousElementSibling?.querySelector("button");

    let flag = false;

    switch (key) {
      case "Right":
      case "ArrowRight":
        if (nextTab) {
          nextTab.focus();
        } else {
          firstTab?.focus();
        }
        flag = true;
        break;

      case "Left":
      case "ArrowLeft":
        if (prevTab) {
          prevTab.focus();
        } else {
          lastTab?.focus();
        }
        flag = true;
        break;

      case "Home":
      case "PageUp":
        firstTab?.focus();
        flag = true;
        break;

      case "End":
      case "PageDown":
        lastTab?.focus();
        flag = true;
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  return (
    <>
      <Head>
        <title>Space Tourism Website | Destination</title>
      </Head>

      <main
        className="flex flex-col items-center bg-space-tourism-black bg-[url('/space-tourism-website/assets/destination/background-destination-mobile.jpg')] bg-[length:100vw_auto] px-6 pb-[58px] pt-[88px] text-space-tourism-white md:bg-[url('/space-tourism-website/assets/destination/background-destination-tablet.jpg')] md:px-[38.5px] md:pb-[61px] md:pt-[136px] lg:w-full lg:bg-[url('/space-tourism-website/assets/destination/background-destination-desktop.jpg')] lg:bg-cover lg:px-0 lg:pb-[112px] lg:pt-[176px]"
        aria-label="Destination page"
      >
        <h1
          className="uppercase leading-[19px] tracking-[2.7px] text-space-tourism-white md:self-start md:text-[20px] md:leading-6 md:tracking-[3.38px] lg:ml-[166.5px] lg:mt-[36px] lg:text-[28px] lg:leading-[34px] lg:tracking-[4.72px]"
          id="destination"
        >
          <span className="mr-[16px] font-bold opacity-25 lg:mr-6">01</span>Pick
          your destination
        </h1>

        <div
          className="flex flex-col items-center lg:mt-16 lg:flex lg:h-[478px] lg:w-full lg:flex-row lg:items-start lg:justify-between lg:pl-[230px] lg:pr-[163px]"
          role="tabpanel"
          id="tabpanel"
          aria-labelledby={`tab-${tab.toLowerCase()}`}
        >
          <div className="relative mt-8 aspect-square w-[170px] md:mt-[60px] md:w-[300px] lg:w-[445px] lg:self-end">
            <Image
              src={`${destination?.images.png}`}
              alt={`Image ${destination?.name}`}
              fill
            />
          </div>

          <div className="flex flex-col items-center lg:w-[445px] lg:items-start lg:self-start">
            <ul
              className="mt-[26px] flex h-[28px] items-start gap-[26px] md:mt-[53px] md:h-[34px] md:gap-[33px] lg:mt-0"
              role="tablist"
              aria-labelledby="destination"
            >
              {tabType.map((t) => {
                return (
                  <li key={t} role="none">
                    <button
                      onClick={() => {
                        setTab(t);
                      }}
                      className={cn([
                        "group relative text-[14px] uppercase leading-[17px] tracking-[2.36px] md:text-base md:leading-[19px] md:tracking-[2.7px]", // base
                        tab === t
                          ? "text-space-tourism-white"
                          : "text-space-tourism-lightblue",
                      ])}
                      type="button"
                      role="tab"
                      id={`tab-${t.toLowerCase()}`}
                      aria-controls="tabpanel"
                      aria-selected={t === tab}
                      onKeyDown={onItemKeyDown}
                    >
                      {t}
                      <div
                        className={cn([
                          "absolute left-1/2 top-[25px] h-[3px] w-full -translate-x-[52%] bg-white md:top-[31px]", // base
                          tab === t
                            ? "opacity-100"
                            : "origin-center scale-0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-50",
                        ])}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <h2 className="mt-5 font-bellefair text-[56px] uppercase leading-[64px] md:mt-8 md:text-[80px] md:leading-[92px] lg:mt-[37px] lg:text-[100px] lg:leading-[115px]">
              {destination?.name}
            </h2>

            <p className="mt-px max-w-lg text-center font-barlow text-[15px] leading-[25px] text-space-tourism-lightblue md:mt-[7px] md:w-[550px] md:max-w-4xl md:text-base md:leading-[28px] lg:mt-[14px] lg:w-full lg:text-start lg:text-[18px] lg:leading-8">
              {destination?.description}
            </p>

            <hr className="my-8 w-full border-t border-t-[#383B4B] md:mb-0 md:mt-[50px] md:w-[573px] lg:mt-[54px] lg:w-full" />

            <div className="md:flex md:h-[90px] md:items-end md:gap-[11px] md:pb-px md:pl-1.5 lg:grid lg:w-full lg:grid-cols-2 lg:grid-rows-1 lg:items-end lg:pl-0 lg:pr-3">
              <div className="flex h-[61px] w-[216px] flex-col items-center uppercase md:w-[216px] lg:w-fit lg:items-start">
                <h3 className="text-[14px] leading-[17px] tracking-[2.36px] text-space-tourism-lightblue">
                  Avg. distance
                </h3>
                <h4 className="mt-3 font-bellefair text-[28px] leading-[32px] text-space-tourism-white">
                  {destination?.distance}
                </h4>
              </div>

              <div className="mt-8 flex h-[61px] w-[216px] flex-col items-center uppercase md:mt-0 md:w-[223px] lg:w-fit lg:items-start">
                <h3 className="text-[14px] leading-[17px] tracking-[2.36px] text-space-tourism-lightblue">
                  Est. travel time
                </h3>
                <h4 className="mt-3 font-bellefair text-[28px] leading-[32px] text-space-tourism-white">
                  {destination?.travel}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <Slider
        // absolutePath="/space-tourism-website/design/mobile-home.jpg"
        // absolutePath="/space-tourism-website/design/tablet-destination-a.jpg"
        absolutePath="/space-tourism-website/design/desktop-destination-a.jpg"
      /> */}
    </>
  );
}

Tech.getLayout = getLayout;
