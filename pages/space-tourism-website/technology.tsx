import Head from "next/head";
import { getLayout } from "../../components/space-tourism-website/Layout";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../../components/SliderTs"), { ssr: false });
import _data from "../../components/space-tourism-website/data.json";
import { useState } from "react";
import Image from "next/image";
import { cn } from "../../utils/cn";
const data = _data.technology;

export default function Tech() {
  const [techIndex, setTechIndex] = useState<number>(0);
  const tech = data[techIndex];

  return (
    <>
      <Head>
        <title>Space Tourism Website | Technology</title>
      </Head>

      <div
        className="flex min-h-[max(710px,100vh)] flex-col items-center bg-[url('/space-tourism-website/assets/technology/background-technology-mobile.jpg')] bg-cover bg-no-repeat pb-[58px] pt-[88px] text-space-tourism-white bg-blend-screen md:min-h-[1024px] md:bg-[url('/space-tourism-website/assets/technology/background-technology-tablet.jpg')] md:pt-[136px] lg:grid lg:min-h-[900px] lg:grid-cols-[80px_470px_auto] lg:grid-rows-[34px_527px] lg:items-start lg:gap-x-20 lg:gap-y-[26px] lg:overflow-hidden lg:bg-[url('/space-tourism-website/assets/technology/background-technology-desktop.jpg')] lg:pb-0 lg:pl-[min(166.5px,calc(166.5/1440*100vw))] lg:pt-[212px]"
        role="tabpanel"
        id="tabpanel"
        aria-labelledby={`tab-${techIndex + 1}`}
      >
        <h5
          className="uppercase leading-[19px] tracking-[2.7px] text-space-tourism-white md:self-start md:px-[38.5px] md:text-[20px] md:leading-6 md:tracking-[3.38px] lg:col-span-3 lg:px-0 lg:text-[28px] lg:leading-[34px] lg:tracking-[4.72px]"
          id="technology"
        >
          <span className="mr-[14px] font-bold opacity-25 lg:mr-5">03</span>
          Space launch 101
        </h5>

        <div className="mt-8 flex w-full flex-col md:mt-[60px] lg:col-start-3 lg:row-start-2 lg:mt-0 lg:h-full lg:w-auto lg:place-self-end">
          <div className="relative h-[170px] w-full md:h-[310px] lg:aspect-[515/527] lg:h-full lg:w-[515px]">
            <Image
              src={"/space-tourism-website/assets/technology/"}
              className="object-cover"
              fill
              loader={({ width }) => {
                return width > 1023
                  ? tech.images.portrait
                  : width > 767
                    ? tech.images.landscape
                    : tech.images.mobile;
              }}
              alt={tech.name}
            />
          </div>
        </div>

        <ul
          className="mt-[34px] flex items-center gap-4 font-bellefair md:mt-14 lg:col-start-1 lg:row-start-2 lg:mt-[111px] lg:flex-col lg:gap-8"
          role="tablist"
          aria-labelledby="technology"
        >
          {Array.from(Array(3).keys()).map((idx) => {
            return (
              <li key={idx} role="none">
                <button
                  onClick={() => setTechIndex(idx)}
                  className={cn([
                    "flex aspect-square w-10 items-center justify-center rounded-full tabular-nums leading-[18px] tracking-[1px] md:w-[60px] md:text-[24px] md:leading-[28px] md:tracking-[1.5px] lg:w-20 lg:text-[32px] lg:leading-[37px] lg:tracking-[2px]", //
                    idx === techIndex
                      ? "bg-white text-space-tourism-black"
                      : "border border-white/25 text-space-tourism-white hover:border-white",
                  ])}
                  type="button"
                  role="tab"
                  id={`tab-${idx + 1}`}
                  aria-selected={idx === techIndex}
                >
                  {idx + 1}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-[26px] flex w-[327px] flex-col items-center md:mt-11 md:w-[458px] lg:col-start-2 lg:row-start-2 lg:mt-[111px] lg:w-full lg:items-start">
          <h6 className="text-[14px] leading-[17px] tracking-[2.36px] text-space-tourism-lightblue md:text-base md:leading-[19px] md:tracking-[2.7px]">
            THE TERMINOLOGY…
          </h6>
          <h3 className="mt-[9px] font-bellefair text-[24px] uppercase leading-[28px] text-space-tourism-white md:mt-4 md:text-[40px] md:leading-[46px] lg:mt-[11px] lg:text-[56px] lg:leading-[64px]">
            {tech.name}
          </h3>
          <p className="mt-4 text-center font-barlow text-[15px] leading-[25px] text-space-tourism-lightblue md:text-base md:leading-[28px] lg:mt-[17px] lg:w-[444px] lg:text-left lg:text-[18px] lg:leading-[32px]">
            {tech.description}
          </p>
        </div>
      </div>

      {/* <Slider
        // absolutePath="/space-tourism-website/design/mobile-technology-a.jpg"
        // absolutePath={"/space-tourism-website/design/tablet-technology-a.jpg"}
        absolutePath="/space-tourism-website/design/desktop-technology-c.jpg"
      /> */}
    </>
  );
}

Tech.getLayout = getLayout;
